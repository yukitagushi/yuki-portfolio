#!/usr/bin/env python3
"""Validate background-video sources without modifying files or making requests.

The catalogue controls the homepage background sequence, not watch pages.
Local media must exist in a published directory.
HTTPS media URLs are checked for safe syntax and an expected file extension;
their availability and playback must be checked in the browser.
"""

import argparse
import json
from pathlib import Path, PurePosixPath
import re
import sys
import unicodedata
from urllib.parse import unquote, urlsplit

from check_site import AUTHORING_ROOTS, EXCLUDED


ROOT = Path(__file__).resolve().parents[1]
REQUIRED = {"title", "src", "poster", "width", "height"}
OPTIONAL = {"slug", "mobileLayout"}
MOBILE_LAYOUTS = {"standard", "wide", "captioned"}
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


def published_url(value, label, *, root, suffixes):
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
    if PurePosixPath(decoded).suffix.lower() not in suffixes:
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
        if not target.is_file() or target.stat().st_size == 0:
            raise ValueError(f"{label}: missing or empty published asset {value}")
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
        for field, suffixes in (("src", VIDEO_FORMATS), ("poster", IMAGE_FORMATS)):
            result[field] = published_url(item[field], f"{label}.{field}", root=root, suffixes=suffixes)
        for field in ("width", "height"):
            if type(item[field]) is not int or item[field] <= 0:
                raise ValueError(f"{label}.{field}: expected a positive integer")
        if "mobileLayout" in item:
            layout = item["mobileLayout"]
            if not isinstance(layout, str) or layout not in MOBILE_LAYOUTS:
                raise ValueError(f"{label}.mobileLayout: expected standard, wide or captioned")
            if layout == "wide" and item["width"] <= item["height"]:
                raise ValueError(f"{label}.mobileLayout: wide requires a landscape video")
        if "slug" in item:
            slug = item["slug"]
            if not isinstance(slug, str) or not re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", slug):
                raise ValueError(f"{label}.slug: use lowercase letters, numbers and single hyphens")
            if slug in slugs:
                raise ValueError(f"{label}.slug: duplicate {slug}")
            slugs.add(slug)
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
        print(f"Background-video catalogue is valid: {len(videos)} clips in display order.")
        return 0
    except (OSError, UnicodeError, ValueError) as exc:
        print(f"ERROR {exc}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    sys.exit(main())
