#!/usr/bin/env python3
"""Validate the shared video catalogue without modifying files or making requests.

Local media must exist in a published directory. Work pages may be generated
from this catalogue, so check_site.py checks their existence after the build.
HTTPS media URLs are checked for safe syntax and an expected file extension;
their availability and playback must be checked in the browser.
"""

import argparse
from datetime import date, datetime
import json
import math
from pathlib import Path, PurePosixPath
import re
import sys
import unicodedata
from urllib.parse import unquote, urlsplit

from check_site import AUTHORING_ROOTS, EXCLUDED


ROOT = Path(__file__).resolve().parents[1]
REQUIRED = {"title", "src", "poster", "href", "width", "height"}
OPTIONAL = {"slug", "description", "durationSeconds", "uploadDate", "previewSrc"}
VIDEO_FORMATS = {".mp4", ".webm"}
IMAGE_FORMATS = {".jpg", ".jpeg", ".png", ".webp", ".avif"}


def plain_text(value, label, maximum):
    if not isinstance(value, str) or not value.strip():
        raise ValueError(f"{label}: expected non-empty text")
    value = value.strip()
    if len(value) > maximum or "<" in value or ">" in value:
        raise ValueError(f"{label}: expected plain text of at most {maximum} characters")
    if any(unicodedata.category(char) in {"Cc", "Cs"} for char in value):
        raise ValueError(f"{label}: control characters are not allowed")
    return value


def published_url(value, label, *, root, suffixes=None, must_exist=False):
    if not isinstance(value, str) or not value or any(char.isspace() for char in value):
        raise ValueError(f"{label}: expected a URL without whitespace")
    if "\\" in value or any(unicodedata.category(char) in {"Cc", "Cs"} for char in value):
        raise ValueError(f"{label}: unsafe URL characters")
    try:
        url = urlsplit(value)
        # Accessing these properties also catches malformed hosts and ports.
        hostname, _port = url.hostname, url.port
    except ValueError as exc:
        raise ValueError(f"{label}: malformed URL") from exc
    if url.scheme:
        if url.scheme != "https" or not hostname or url.username or url.password:
            raise ValueError(f"{label}: expected HTTPS without embedded credentials")
    elif url.netloc or not value.startswith("/") or value.startswith("//"):
        raise ValueError(f"{label}: expected a local absolute URL or HTTPS URL")
    decoded = unquote(url.path)
    if "\\" in decoded or any(unicodedata.category(char) in {"Cc", "Cs"} for char in decoded):
        raise ValueError(f"{label}: unsafe encoded path")
    if suffixes and PurePosixPath(decoded).suffix.lower() not in suffixes:
        raise ValueError(f"{label}: expected one of {', '.join(sorted(suffixes))}")
    if not url.scheme:
        parts = decoded.lstrip("/").split("/")
        if any(part in {".", ".."} or part.startswith(".") for part in parts):
            raise ValueError(f"{label}: hidden files and path traversal are not allowed")
        if parts[0] in AUTHORING_ROOTS or any(part in EXCLUDED for part in parts):
            raise ValueError(f"{label}: path is excluded from publication")
        root = Path(root).resolve()
        target = (root / decoded.lstrip("/")).resolve()
        if not target.is_relative_to(root):
            raise ValueError(f"{label}: path escapes the published site")
        # A symlink cannot expose an unpublished authoring directory either.
        resolved_parts = target.relative_to(root).parts
        if resolved_parts and (resolved_parts[0] in AUTHORING_ROOTS or
                               any(part.startswith(".") or part in EXCLUDED for part in resolved_parts)):
            raise ValueError(f"{label}: path resolves to an unpublished file")
        if must_exist and (not target.is_file() or target.stat().st_size == 0):
            raise ValueError(f"{label}: missing or empty published asset {value}")
        if not must_exist and decoded != "/" and PurePosixPath(decoded).suffix.lower() != ".html":
            raise ValueError(f"{label}: local work links must point to an HTML page")
    return value


def validate_catalog(data, *, root=ROOT):
    """Return validated copies in display order; reject mistakes before building."""
    if not isinstance(data, dict) or set(data) != {"videos"} or not isinstance(data["videos"], list):
        raise ValueError('Catalogue must be an object containing a "videos" array')
    videos, slugs = [], set()
    for index, item in enumerate(data["videos"]):
        label = f"videos[{index}]"
        if not isinstance(item, dict):
            raise ValueError(f"{label}: expected an object")
        missing, unknown = REQUIRED - item.keys(), item.keys() - REQUIRED - OPTIONAL
        if missing:
            raise ValueError(f"{label}: missing {', '.join(sorted(missing))}")
        if unknown:
            raise ValueError(f"{label}: unknown fields {', '.join(sorted(unknown))}")
        result = dict(item)
        result["title"] = plain_text(item["title"], f"{label}.title", 160)
        for field, suffixes in (("src", VIDEO_FORMATS), ("poster", IMAGE_FORMATS), ("previewSrc", VIDEO_FORMATS)):
            if field in item:
                result[field] = published_url(item[field], f"{label}.{field}", root=root, suffixes=suffixes, must_exist=True)
        result["href"] = published_url(item["href"], f"{label}.href", root=root)
        for field in ("width", "height"):
            if type(item[field]) is not int or item[field] <= 0:
                raise ValueError(f"{label}.{field}: expected a positive integer")
        if "slug" in item:
            slug = item["slug"]
            if not isinstance(slug, str) or not re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", slug):
                raise ValueError(f"{label}.slug: use lowercase letters, numbers and single hyphens")
            if slug in slugs:
                raise ValueError(f"{label}.slug: duplicate {slug}")
            slugs.add(slug)
            if not urlsplit(item["href"]).scheme and item["href"] != f"/videos/{slug}.html":
                raise ValueError(f"{label}.href: generated watch page must use /videos/{slug}.html; omit slug to link an existing page")
        if "description" in item:
            result["description"] = plain_text(item["description"], f"{label}.description", 1200)
        if "durationSeconds" in item:
            seconds = item["durationSeconds"]
            if type(seconds) not in {int, float} or not math.isfinite(seconds) or seconds <= 0:
                raise ValueError(f"{label}.durationSeconds: expected a positive finite number")
        if "uploadDate" in item:
            value = item["uploadDate"]
            try:
                if not isinstance(value, str):
                    raise ValueError()
                if re.fullmatch(r"\d{4}-\d{2}-\d{2}", value):
                    date.fromisoformat(value)
                elif re.fullmatch(r"\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})", value):
                    datetime.fromisoformat(value.replace("Z", "+00:00"))
                else:
                    raise ValueError()
            except ValueError as exc:
                raise ValueError(f"{label}.uploadDate: expected a verified ISO date or timestamp with timezone") from exc
        videos.append(result)
    return videos


def unique_object(pairs):
    result = {}
    for key, value in pairs:
        if key in result:
            raise ValueError(f"Duplicate JSON field: {key}")
        result[key] = value
    return result


def reject_constant(value):
    raise ValueError(f"Invalid JSON constant: {value}")


def load_catalog(path=None, *, root=ROOT):
    path = Path(path) if path is not None else Path(root) / "content/hero-videos.json"
    data = json.loads(path.read_text(encoding="utf-8"), object_pairs_hook=unique_object, parse_constant=reject_constant)
    return validate_catalog(data, root=root)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--root", type=Path, default=ROOT)
    parser.add_argument("--catalog", type=Path, help="Defaults to ROOT/content/hero-videos.json")
    args = parser.parse_args()
    try:
        videos = load_catalog(args.catalog, root=args.root)
        print(f"Video catalogue is valid: {len(videos)} works in display order.")
        return 0
    except (OSError, UnicodeError, ValueError) as exc:
        print(f"ERROR {exc}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    sys.exit(main())
