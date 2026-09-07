#!/usr/bin/env python3
"""Generate the static site's sitemap from published HTML canonical URLs.

No third-party dependencies, network access, dates, or automated scheduling.
Use --check to verify the existing sitemap without changing it.
"""

import argparse
from pathlib import Path
import sys
from urllib.parse import unquote, urlsplit, urlunsplit
import xml.etree.ElementTree as ET

from check_site import Page, PageParser, discover


NAMESPACE = "http://www.sitemaps.org/schemas/sitemap/0.9"


def collect_urls(root, site_url):
    origin = urlsplit(site_url)
    urls = {}
    for path in discover(root):
        if path.suffix.lower() != ".html":
            continue
        page = Page(path)
        parser = PageParser(page)
        parser.feed(path.read_text(encoding="utf-8"))
        parser.close()
        if path.name == "404.html" or page.noindex:
            continue
        name = path.relative_to(root).as_posix()
        if len(page.canonicals) != 1:
            raise ValueError(f"{name}: expected one canonical URL")
        canonical = urlsplit(page.canonicals[0])
        if canonical.scheme != "https" or canonical.netloc.lower() != origin.netloc.lower() or canonical.query or canonical.fragment:
            raise ValueError(f"{name}: canonical must be an absolute HTTPS URL on this site, without query or fragment")
        target = (root / unquote(canonical.path).lstrip("/")).resolve()
        if target.is_dir():
            target /= "index.html"
        if target != path:
            raise ValueError(f"{name}: canonical must resolve to this HTML page")
        url = urlunsplit((canonical.scheme, canonical.netloc.lower(), canonical.path or "/", "", ""))
        if url in urls:
            raise ValueError(f"{name}: canonical already used by {urls[url]}")
        urls[url] = name
    if not urls:
        raise ValueError("No indexable HTML pages found")
    return sorted(urls)


def render(urls):
    ET.register_namespace("", NAMESPACE)
    sitemap = ET.Element(f"{{{NAMESPACE}}}urlset")
    for location in urls:
        entry = ET.SubElement(sitemap, f"{{{NAMESPACE}}}url")
        ET.SubElement(entry, f"{{{NAMESPACE}}}loc").text = location
    ET.indent(sitemap, space="  ")
    return ET.tostring(sitemap, encoding="utf-8", xml_declaration=True) + b"\n"


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--root", type=Path, default=Path(__file__).resolve().parents[1])
    parser.add_argument("--site-url", default="https://taguchi338.com")
    parser.add_argument("--check", action="store_true", help="Fail if sitemap.xml differs; do not write files")
    args = parser.parse_args()
    root = args.root.resolve()
    origin = urlsplit(args.site_url)
    if not root.is_dir():
        parser.error("--root must be an existing directory")
    if origin.scheme != "https" or not origin.netloc or origin.path not in {"", "/"} or origin.query or origin.fragment:
        parser.error("--site-url must be an HTTPS origin without a path, query or fragment")
    try:
        urls = collect_urls(root, args.site_url)
        expected = render(urls)
        target = root / "sitemap.xml"
        if args.check:
            if not target.is_file() or target.read_bytes() != expected:
                print("ERROR sitemap.xml differs from published canonical pages. Run python3 scripts/build_sitemap.py.", file=sys.stderr)
                return 1
            print(f"Sitemap is current: {len(urls)} canonical pages.")
        else:
            target.write_bytes(expected)
            print(f"Wrote sitemap.xml with {len(urls)} canonical pages; lastmod omitted.")
    except (OSError, UnicodeError, ValueError) as exc:
        print(f"ERROR {exc}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
