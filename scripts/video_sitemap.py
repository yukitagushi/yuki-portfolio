"""Render the video sitemap from published, reviewable video page records."""

import json
from pathlib import Path
import xml.etree.ElementTree as ET

from site_common import BASE


def records(root: Path):
    entries = [
        {
            "path": "/works/villa-lumiere-3d-walkthrough.html",
            "thumbnail": "/uploads/videos/villa-lumiere-3d-walkthrough-poster.jpg",
            "title": "Blenderで制作した3D住宅・建築PRウォークスルー",
            "description": "Blenderで制作した架空の邸宅「VILLA LUMIÈRE」の3D建築・室内PRウォークスルー動画。実在の販売物件ではありません。",
            "content": "/uploads/videos/villa-lumiere-3d-walkthrough.mp4",
            "duration": 64,
            "publicationDate": "2026-09-16T00:00:00+09:00",
        }
    ]
    manufacturing_source = root / "content" / "manufacturing-pr-video.json"
    if manufacturing_source.is_file():
        item = json.loads(manufacturing_source.read_text(encoding="utf-8"))
        if item.get("publicationDate"):
            entries.append(
                {
                    "path": item["path"],
                    "thumbnail": item["posterPath"],
                    "title": item["videoName"],
                    "description": item["videoDescription"],
                    "content": item["videoPath"],
                    "duration": item["durationSeconds"],
                    "publicationDate": item["publicationDate"],
                }
            )
    return entries


def render(root: Path):
    namespace = "http://www.sitemaps.org/schemas/sitemap/0.9"
    video_namespace = "http://www.google.com/schemas/sitemap-video/1.1"
    ET.register_namespace("", namespace)
    ET.register_namespace("video", video_namespace)
    urlset = ET.Element(f"{{{namespace}}}urlset")
    for item in records(root):
        url = ET.SubElement(urlset, f"{{{namespace}}}url")
        ET.SubElement(url, f"{{{namespace}}}loc").text = BASE + item["path"]
        video = ET.SubElement(url, f"{{{video_namespace}}}video")
        ET.SubElement(video, f"{{{video_namespace}}}thumbnail_loc").text = BASE + item["thumbnail"]
        ET.SubElement(video, f"{{{video_namespace}}}title").text = item["title"]
        ET.SubElement(video, f"{{{video_namespace}}}description").text = item["description"]
        ET.SubElement(video, f"{{{video_namespace}}}content_loc").text = BASE + item["content"]
        # Google video sitemaps require whole seconds; VideoObject keeps the exact PT34.5S duration.
        ET.SubElement(video, f"{{{video_namespace}}}duration").text = str(int(float(item["duration"]) + 0.5))
        ET.SubElement(video, f"{{{video_namespace}}}publication_date").text = item["publicationDate"]
    ET.indent(urlset, space="  ")
    return ET.tostring(urlset, encoding="utf-8", xml_declaration=True) + b"\n"


def write(root: Path):
    (root / "video-sitemap.xml").write_bytes(render(root))
