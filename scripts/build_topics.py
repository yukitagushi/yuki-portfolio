#!/usr/bin/env python3
"""Build the service and guide pages from reviewed content using the standard library."""

import json
import re
from pathlib import Path

from site_common import BASE, breadcrumbs, contact_cta, esc, page


ROOT = Path(__file__).resolve().parent.parent
CONTENT = ROOT / "content" / "topics.json"
AUTHOR = {
    "@type": "Person",
    "@id": BASE + "/#person",
    "name": "田口侑生",
    "alternateName": "Yuki Taguchi",
    "url": BASE + "/about.html",
}


def validate_content(data):
    """Catch missing records or anchors before overwriting generated files."""
    expected_services = {
        "ai-agent", "ai-video", "video-editing", "training-video", "manual-to-video"
    }
    expected_guides = {"ai-agent-guide", "ai-video-guide", "manual-video-guide"}
    for kind, expected in (("services", expected_services), ("guides", expected_guides)):
        records = data[kind]
        slugs = [record["slug"] for record in records]
        if set(slugs) != expected or len(slugs) != len(expected):
            raise ValueError(f"Unexpected or duplicate {kind} slugs: {slugs}")
        for record in records:
            reserved = {"overview", "faq", "pricing", "related-works", "related-guides", "related-services", "sources"}
            identifiers = [section["id"] for section in record["sections"]]
            if len(set(identifiers)) != len(identifiers):
                raise ValueError(f"Duplicate section ID in {record['slug']}")
            if any(not re.fullmatch(r"[a-z0-9-]+", value) or value in reserved for value in identifiers):
                raise ValueError(f"Invalid or reserved section ID in {record['slug']}")
    for service in data["services"]:
        if not set(service["relatedGuides"]).issubset(expected_guides):
            raise ValueError(f"Unknown related guide in {service['slug']}")
    for guide in data["guides"]:
        if not set(guide["relatedServices"]).issubset(expected_services):
            raise ValueError(f"Unknown related service in {guide['slug']}")


def author_line():
    return '<a class="author-line" href="/about.html">執筆・制作：田口侑生 / Yuki Taguchi <span aria-hidden="true">↗</span></a>'


def toc(entries):
    links = "".join(f'<li><a href="#{esc(identifier)}">{esc(title)}</a></li>' for identifier, title in entries)
    return '<aside class="toc"><nav aria-labelledby="toc-title"><strong id="toc-title">このページの内容</strong><ol>' + links + '</ol></nav></aside>'


def section_open(identifier, title, css_class=""):
    class_attr = f' class="{esc(css_class)}"' if css_class else ""
    return f'<section id="{esc(identifier)}"{class_attr} aria-labelledby="heading-{esc(identifier)}"><h2 id="heading-{esc(identifier)}">{esc(title)}</h2>'


def render_sections(record):
    rendered = []
    for section in record["sections"]:
        rendered.append(section_open(section["id"], section["title"]))
        rendered.extend(f'<p>{esc(paragraph)}</p>' for paragraph in section["paragraphs"])
        if section.get("bullets"):
            rendered.append("<ul>" + "".join(f'<li>{esc(item)}</li>' for item in section["bullets"]) + "</ul>")
        if section.get("links"):
            rendered.append(link_list((item["url"], item["title"]) for item in section["links"]))
        if section.get("code"):
            identifier = f'prompt-{record["slug"]}-{section["id"]}'
            rendered.append(
                '<div class="code-block">'
                f'<button type="button" class="copy-button" data-copy="{esc(identifier)}" aria-label="指示テンプレートをコピー">コピー</button>'
                f'<pre><code id="{esc(identifier)}">{esc(section["code"])}</code></pre>'
                '<span class="copy-status" role="status" aria-live="polite"></span></div>'
            )
        rendered.append("</section>")
    return "".join(rendered)


def render_faq(record):
    items = "".join(
        f'<details><summary>{esc(item["question"])}</summary><p>{esc(item["answer"])}</p></details>'
        for item in record["faq"]
    )
    return section_open("faq", "よくある質問", "faq-list") + items + "</section>"


def link_list(items):
    return '<ul class="related-links">' + "".join(
        f'<li><a href="{esc(url)}">{esc(title)} <span aria-hidden="true">↗</span></a></li>'
        for url, title in items
    ) + "</ul>"


def detail_body(record, category, crumb_markup, entries, article):
    return (
        '<div class="wide">' + crumb_markup
        + '<header class="detail-hero">'
        + f'<p class="section-label">{esc(category)}</p><h1>{esc(record["title"])}</h1>'
        + f'<p class="detail-lead">{esc(record["lead"])}</p>' + author_line()
        + '</header><div class="reading-layout">' + toc(entries)
        + '<article class="article-body">' + article + '</article></div>'
        + contact_cta() + '</div>'
    )


def build_service(record, services, guides):
    path = f'/services/{record["slug"]}.html'
    crumb_schema, crumb_markup = breadcrumbs([
        ("ホーム", "/"), ("サービス", "/#services"), (record["shortTitle"], path)
    ])
    entries = [("overview", "サービスの概要")]
    entries.extend((section["id"], section["title"]) for section in record["sections"])
    entries.extend([("faq", "よくある質問"), ("pricing", "料金・お見積もり")])

    article = '<div class="answer-box" id="overview"><h2>サービスの概要</h2><p>' + esc(record["answer"]) + '</p></div>'
    article += render_sections(record) + render_faq(record)
    article += section_open("pricing", "料金・お見積もり")
    article += f'<p class="price-note">{esc(record["priceNote"])}</p></section>'

    if record["relatedWorks"]:
        entries.append(("related-works", "関連する制作実績"))
        article += section_open("related-works", "関連する制作実績")
        article += link_list((item["url"], item["title"]) for item in record["relatedWorks"]) + "</section>"

    if record["relatedGuides"]:
        entries.append(("related-guides", "進め方を知る"))
        article += section_open("related-guides", "進め方を知る")
        article += link_list((f'/guides/{slug}.html', guides[slug]["title"]) for slug in record["relatedGuides"]) + "</section>"

    entries.append(("related-services", "ほかのサービス"))
    article += section_open("related-services", "ほかのサービス")
    article += link_list(
        (f'/services/{slug}.html', item["shortTitle"])
        for slug, item in services.items() if slug != record["slug"]
    ) + "</section>"

    schema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": BASE + path + "#service",
        "name": record["title"],
        "serviceType": record["title"],
        "description": record["description"],
        "url": BASE + path,
        "provider": AUTHOR if record["slug"] == "ai-video" else {"@id": BASE + "/#person"},
        "areaServed": {"@type": "Country", "name": "Japan"},
    }
    body = detail_body(record, "SERVICES", crumb_markup, entries, article)
    return path, page(record["title"], record["description"], path, body, [schema, crumb_schema])


def build_guide(record, services):
    path = f'/guides/{record["slug"]}.html'
    crumb_schema, crumb_markup = breadcrumbs([
        ("ホーム", "/"), ("AI活用ガイド", "/guides.html"), (record["title"], path)
    ])
    entries = [(section["id"], section["title"]) for section in record["sections"]]
    entries.extend([("faq", "よくある質問"), ("related-services", "このテーマを相談する"), ("sources", "参考にした公式資料")])
    article = render_sections(record) + render_faq(record)
    article += section_open("related-services", "このテーマを相談する")
    article += link_list((f'/services/{slug}.html', services[slug]["title"]) for slug in record["relatedServices"]) + "</section>"
    article += section_open("sources", "参考にした公式資料")
    article += '<p>本文で紹介した技術や考え方は、以下の公式資料を参照しています。具体的な制作手順や指示例は、このガイドで提案する進め方です。</p><ol class="sources-list">'
    article += "".join(f'<li><a href="{esc(source["url"])}">{esc(source["title"])}</a></li>' for source in record["sources"])
    article += "</ol></section>"

    schema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "@id": BASE + path + "#article",
        "headline": record["title"],
        "description": record["description"],
        "url": BASE + path,
        "inLanguage": "ja-JP",
        "author": AUTHOR,
        "publisher": {"@id": BASE + "/#person"},
        "mainEntityOfPage": {"@type": "WebPage", "@id": BASE + path},
        "citation": [source["url"] for source in record["sources"]],
    }
    body = detail_body(record, "GUIDE", crumb_markup, entries, article)
    return path, page(record["title"], record["description"], path, body, [schema, crumb_schema], article=True)


def build_guide_index(guides):
    path = "/guides.html"
    title = "AI活用ガイド｜AIエージェント・広告動画・マニュアル動画化"
    description = "AIエージェントの使い方、AIを使った広告動画の作成、紙マニュアルからの動画生成を具体的な手順で解説。仕事に使える指示テンプレートと確認ポイントをまとめています。"
    crumb_schema, crumb_markup = breadcrumbs([("ホーム", "/"), ("AI活用ガイド", path)])
    rows = "".join(
        f'<a class="guide-row" href="/guides/{esc(guide["slug"])}.html">'
        f'<small aria-hidden="true">{index:02d}</small><div><h2>{esc(guide["title"])}</h2>'
        f'<p>{esc(guide["description"])}</p></div><span class="guide-arrow" aria-hidden="true">↗</span></a>'
        for index, guide in enumerate(guides, start=1)
    )
    body = (
        '<div class="wide">' + crumb_markup + '</div>'
        + '<section class="wide section-pad"><p class="section-label">GUIDES</p>'
        + '<h1>AI活用ガイド</h1>'
        + '<p class="detail-lead">使い方がわかると、仕事は変えられる。<br>AIエージェント、広告動画、マニュアルの動画化を、具体的な手順から。</p>'
        + author_line() + '<div class="guide-list">' + rows + '</div></section>'
        + '<div class="wide">' + contact_cta() + '</div>'
    )
    listing = {
        "@type": "ItemList",
        "numberOfItems": len(guides),
        "itemListElement": [
            {"@type": "ListItem", "position": index, "name": guide["title"], "url": BASE + f'/guides/{guide["slug"]}.html'}
            for index, guide in enumerate(guides, start=1)
        ],
    }
    schema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "@id": BASE + path,
        "url": BASE + path,
        "name": "AI活用ガイド",
        "description": description,
        "inLanguage": "ja-JP",
        "mainEntity": listing,
    }
    return path, page(title, description, path, body, [schema, crumb_schema])


def main():
    data = json.loads(CONTENT.read_text(encoding="utf-8"))
    validate_content(data)
    services = {record["slug"]: record for record in data["services"]}
    guides = {record["slug"]: record for record in data["guides"]}
    pages = [build_service(record, services, guides) for record in services.values()]
    pages.extend(build_guide(record, services) for record in guides.values())
    pages.append(build_guide_index(list(guides.values())))
    for path, rendered in pages:
        destination = ROOT / path.lstrip("/")
        destination.parent.mkdir(parents=True, exist_ok=True)
        destination.write_text(rendered + "\n", encoding="utf-8")
    print(f"Generated {len(services)} services, {len(guides)} guides, and the guide index.")


if __name__ == "__main__":
    main()
