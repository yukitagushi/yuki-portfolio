#!/usr/bin/env python3
"""Offline checks for this static site. No dependencies or network requests.

Usage: python3 scripts/check_site.py [--root PATH] [--site-url https://example.com]
Exit codes: 0 = no errors (warnings allowed), 1 = errors, 2 = invalid arguments.
"""

import argparse
from collections import Counter, defaultdict
from dataclasses import dataclass, field
from html.parser import HTMLParser
import json
import os
from pathlib import Path
import re
import sys
from urllib.parse import unquote, urljoin, urlsplit, urlunsplit
import xml.etree.ElementTree as ET


EXCLUDED = {"node_modules", "vendor", "venv", "env", "__pycache__", "coverage", "build", "dist", "out"}
# These authoring directories are excluded from deployment by .vercelignore.
AUTHORING_ROOTS = {"docs", "scripts", "content"}
CSS_URL = re.compile(r"url\(\s*(?:\"([^\"]*)\"|'([^']*)'|([^)]*?))\s*\)", re.I)
CSS_IMPORT = re.compile(r"@import\s+[\"']([^\"']+)[\"']", re.I)


def css_urls(value):
    value = re.sub(r"/\*.*?\*/", "", value, flags=re.S)
    for match in CSS_URL.finditer(value):
        yield next(part for part in match.groups() if part is not None).strip()
    yield from CSS_IMPORT.findall(value)


def srcset_urls(value):
    """Read URL tokens without treating commas inside a data URL as separators."""
    remaining = value.lstrip(" ,\t\r\n")
    while remaining:
        match = re.match(r"\S+", remaining)
        token = match.group(0)
        remaining = remaining[len(token):]
        if token.endswith(","):
            yield token.rstrip(",")
        else:
            yield token
            comma = remaining.find(",")
            remaining = remaining[comma + 1:] if comma >= 0 else ""
        remaining = remaining.lstrip(" ,\t\r\n")


@dataclass
class Page:
    path: Path
    titles: list = field(default_factory=list)
    descriptions: list = field(default_factory=list)
    canonicals: list = field(default_factory=list)
    ids: list = field(default_factory=list)
    anchors: set = field(default_factory=set)
    refs: list = field(default_factory=list)
    jsonld: list = field(default_factory=list)
    h1_count: int = 0
    noindex: bool = False
    base_href: str = ""
    canonical: str = ""


class PageParser(HTMLParser):
    def __init__(self, page):
        super().__init__(convert_charrefs=True)
        self.page = page
        self.capture = None
        self.buffer = []
        self.line = 0

    def handle_starttag(self, tag, attrs):
        values = dict(attrs)
        line = self.getpos()[0]
        page = self.page
        if values.get("id"):
            page.ids.append(values["id"])
        if tag == "a" and values.get("name"):
            page.anchors.add(values["name"])
        if tag == "h1":
            page.h1_count += 1
        if tag == "base" and values.get("href"):
            page.base_href = values["href"]
        if tag == "meta":
            name = (values.get("name") or "").lower()
            content = values.get("content") or ""
            if name == "description":
                page.descriptions.append(content.strip())
            if name in {"robots", "googlebot"} and "noindex" in re.split(r"[\s,]+", content.lower()):
                page.noindex = True
            if name in {"twitter:image", "twitter:image:src"} or values.get("property") in {"og:image", "og:image:url", "og:video", "og:video:url"}:
                page.refs.append((content, line, "meta asset"))
        if tag == "link":
            rel = set((values.get("rel") or "").lower().split())
            if "canonical" in rel:
                page.canonicals.append((values.get("href") or "").strip())
            elif values.get("href") and not rel.intersection({"preconnect", "dns-prefetch"}):
                page.refs.append((values["href"], line, "link href"))
        if tag in {"a", "area"} and "href" in values:
            page.refs.append((values["href"] or "", line, "href"))
        for attr in ("src", "poster"):
            if values.get(attr):
                page.refs.append((values[attr], line, attr))
        if tag == "object" and values.get("data"):
            page.refs.append((values["data"], line, "object data"))
        if values.get("srcset"):
            page.refs.extend((url, line, "srcset") for url in srcset_urls(values["srcset"]))
        if values.get("style"):
            page.refs.extend((url, line, "style asset") for url in css_urls(values["style"]))
        if tag == "title" or tag == "style" or (tag == "script" and (values.get("type") or "").lower() == "application/ld+json"):
            self.capture = tag
            self.buffer = []
            self.line = line

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        self.handle_endtag(tag)

    def handle_data(self, data):
        if self.capture:
            self.buffer.append(data)

    def handle_endtag(self, tag):
        if tag != self.capture:
            return
        value = "".join(self.buffer).strip()
        if tag == "title":
            self.page.titles.append(value)
        elif tag == "script":
            self.page.jsonld.append((value, self.line))
        else:
            self.page.refs.extend((url, self.line, "style asset") for url in css_urls(value))
        self.capture = None
        self.buffer = []


def discover(root):
    for directory, dirs, files in os.walk(root):
        ignored = EXCLUDED | (AUTHORING_ROOTS if Path(directory) == root else set())
        dirs[:] = sorted(name for name in dirs if not name.startswith(".") and name not in ignored)
        for name in sorted(files):
            if not name.startswith("."):
                yield Path(directory) / name


def reject_constant(value):
    raise ValueError(f"non-JSON constant {value}")


def audit(root, site_url):
    errors, warnings = [], []
    files = list(discover(root))
    pages = {}
    site = urlsplit(site_url)

    def label(path):
        return path.relative_to(root).as_posix()

    def page_url(path):
        return urljoin(site_url + "/", label(path))

    def local_target(reference, source, base_href=""):
        target = urlsplit(urljoin(urljoin(page_url(source), base_href), reference.strip()))
        if target.scheme not in {"http", "https"} or target.netloc.lower() != site.netloc.lower():
            return None, ""
        raw_path = unquote(target.path)
        if "\x00" in raw_path or "\\" in raw_path:
            raise ValueError("invalid local path")
        path = (root / raw_path.lstrip("/")).resolve()
        if not path.is_relative_to(root):
            raise ValueError("local reference escapes site root")
        if path.is_dir():
            path /= "index.html"
        return path, unquote(target.fragment).split(":~:", 1)[0]

    for path in files:
        if path.suffix.lower() != ".html":
            continue
        page = Page(path)
        pages[path] = page
        try:
            parser = PageParser(page)
            parser.feed(path.read_text(encoding="utf-8"))
            parser.close()
            if parser.capture in {"title", "script"}:
                errors.append(f"{label(path)}: unclosed {parser.capture} element")
        except (OSError, UnicodeError, ValueError) as exc:
            errors.append(f"{label(path)}: cannot parse HTML: {exc}")

    if not pages:
        errors.append("No HTML pages found")
    canonical_pages = defaultdict(list)
    descriptions = defaultdict(list)
    titles = defaultdict(list)
    for path, page in pages.items():
        name = label(path)
        excluded = path.name == "404.html" or page.noindex
        for kind, values in (("title", page.titles), ("description", page.descriptions)):
            if len(values) != 1 or not values[0]:
                errors.append(f"{name}: expected one nonempty {kind}; found {len(values)}")
        if page.h1_count != 1:
            errors.append(f"{name}: site convention requires one H1; found {page.h1_count}")
        for value, count in Counter(page.ids).items():
            if count > 1:
                errors.append(f"{name}: duplicate id {value!r} ({count} times)")
        if path.name == "404.html" and not page.noindex:
            errors.append(f"{name}: error page must contain noindex")
        if len(page.canonicals) > 1 or (not excluded and len(page.canonicals) != 1):
            errors.append(f"{name}: expected one canonical; found {len(page.canonicals)}")
        for canonical in page.canonicals:
            try:
                parsed = urlsplit(canonical)
                if parsed.scheme != "https" or parsed.netloc.lower() != site.netloc.lower() or parsed.query or parsed.fragment:
                    raise ValueError("must be an absolute HTTPS URL on the site, without query or fragment")
                target, _ = local_target(canonical, path)
                if target != path:
                    raise ValueError("must resolve to this page")
                page.canonical = urlunsplit((parsed.scheme, parsed.netloc.lower(), parsed.path or "/", "", ""))
                if not excluded:
                    canonical_pages[page.canonical].append(name)
            except ValueError as exc:
                errors.append(f"{name}: invalid canonical {canonical!r}: {exc}")
        for content, line in page.jsonld:
            try:
                data = json.loads(content, parse_constant=reject_constant)
                if not isinstance(data, (dict, list)):
                    raise ValueError("JSON-LD must be an object or array")
            except (ValueError, json.JSONDecodeError) as exc:
                errors.append(f"{name}:{line}: invalid JSON-LD: {exc}")
        if page.descriptions and page.descriptions[0] and not excluded:
            descriptions[page.descriptions[0]].append(name)
        if page.titles and page.titles[0] and not excluded:
            titles[page.titles[0]].append(name)
    for value, names in canonical_pages.items():
        if len(names) > 1:
            errors.append(f"Duplicate canonical {value}: {', '.join(names)}")
    for kind, groups in (("description", descriptions), ("title", titles)):
        for names in groups.values():
            if len(names) > 1:
                warnings.append(f"Duplicate {kind}: {', '.join(names)}")

    ref_count = 0

    def check_ref(reference, source, line, kind, base_href=""):
        nonlocal ref_count
        try:
            target, fragment = local_target(reference, source, base_href)
            if target is None:
                return
            ref_count += 1
            if not target.is_file():
                errors.append(f"{label(source)}:{line}: broken {kind} {reference!r}")
            elif fragment and target.suffix.lower() == ".html":
                if target not in pages:
                    warnings.append(f"{label(source)}:{line}: fragment target was not scanned: {reference!r}")
                elif fragment != "top" and fragment not in set(pages[target].ids) | pages[target].anchors:
                    errors.append(f"{label(source)}:{line}: missing fragment {reference!r}")
        except ValueError as exc:
            errors.append(f"{label(source)}:{line}: invalid {kind} {reference!r}: {exc}")

    for page in pages.values():
        for reference, line, kind in page.refs:
            check_ref(reference, page.path, line, kind, page.base_href)
    for path in files:
        if path.suffix.lower() == ".css":
            try:
                for reference in css_urls(path.read_text(encoding="utf-8")):
                    check_ref(reference, path, 1, "CSS asset")
            except (OSError, UnicodeError) as exc:
                errors.append(f"{label(path)}: cannot read stylesheet: {exc}")

    sitemap = root / "sitemap.xml"
    try:
        tree = ET.parse(sitemap)
        namespace = "{http://www.sitemaps.org/schemas/sitemap/0.9}"
        if tree.getroot().tag != namespace + "urlset":
            raise ValueError("expected sitemap urlset with sitemap.org namespace")
        locations = []
        for entry in tree.getroot().findall(namespace + "url"):
            locs = entry.findall(namespace + "loc")
            if len(locs) != 1 or not (locs[0].text or "").strip():
                errors.append("sitemap.xml: each url must have one nonempty loc")
                continue
            location = locs[0].text.strip()
            locations.append(location)
            if location not in canonical_pages:
                errors.append(f"sitemap.xml: URL is not a canonical indexable HTML page: {location}")
        for location, count in Counter(locations).items():
            if count > 1:
                errors.append(f"sitemap.xml: duplicate URL {location}")
        for location in sorted(set(canonical_pages) - set(locations)):
            errors.append(f"sitemap.xml: missing canonical page {location}")
    except (OSError, ET.ParseError, ValueError) as exc:
        errors.append(f"sitemap.xml: {exc}")

    for message in sorted(set(warnings)):
        print(f"WARN  {message}")
    for message in sorted(set(errors)):
        print(f"ERROR {message}")
    print(f"Checked {len(pages)} HTML pages and {ref_count} local references: {len(set(errors))} errors, {len(set(warnings))} warnings.")
    print("Offline audit only: HTTP status, redirects, robots/CDN access, rendered layout and schema eligibility require separate verification.")
    return 1 if errors else 0


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--root", type=Path, default=Path(__file__).resolve().parents[1])
    parser.add_argument("--site-url", default="https://taguchi338.com")
    args = parser.parse_args()
    root = args.root.resolve()
    parsed = urlsplit(args.site_url)
    if not root.is_dir():
        parser.error("--root must be an existing directory")
    if parsed.scheme != "https" or not parsed.netloc or parsed.path not in {"", "/"} or parsed.query or parsed.fragment:
        parser.error("--site-url must be an HTTPS origin without a path, query or fragment")
    return audit(root, args.site_url.rstrip("/"))


if __name__ == "__main__":
    sys.exit(main())
