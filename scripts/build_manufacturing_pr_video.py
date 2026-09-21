#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Build the manufacturing PR video landing page from reviewed source content."""

from datetime import datetime
import json
from pathlib import Path

from site_common import BASE, breadcrumbs, esc, page
from video_sitemap import write as write_video_sitemap


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "content" / "manufacturing-pr-video.json"


def load_record():
    record = json.loads(SOURCE.read_text(encoding="utf-8"))
    required = {
        "path", "title", "description", "serviceName", "videoName", "videoDescription",
        "videoPath", "posterPath", "duration", "durationSeconds", "width", "height", "publicationDate",
    }
    if set(record) != required:
        raise ValueError(f"Unexpected manufacturing source fields: {sorted(set(record) ^ required)}")
    if record["duration"] != "PT34.5S" or record["durationSeconds"] != 34.5:
        raise ValueError("Manufacturing sample duration must remain PT34.5S / 34.5 seconds")
    published = record["publicationDate"]
    if published is not None:
        parsed = datetime.fromisoformat(published)
        if parsed.tzinfo is None:
            raise ValueError("publicationDate must include a timezone")
    for key in ("videoPath", "posterPath"):
        if not (ROOT / record[key].lstrip("/")).is_file():
            raise FileNotFoundError(record[key])
    return record


def build(record):
    path = record["path"]
    video_url = BASE + record["videoPath"]
    poster_url = BASE + record["posterPath"]
    crumb_schema, crumb_markup = breadcrumbs([
        ("ホーム", "/"),
        ("サービス", "/#services"),
        (record["serviceName"], path),
    ])
    service_schema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": BASE + path + "#service",
        "name": record["serviceName"],
        "serviceType": "製造業向けPR動画制作",
        "description": record["description"],
        "url": BASE + path,
        "provider": {"@id": BASE + "/#person", "@type": "Person", "name": "田口侑生", "alternateName": "Yuki Taguchi"},
        "areaServed": {"@type": "Country", "name": "Japan"},
        "audience": {"@type": "Audience", "audienceType": "製造業の広報・採用・営業・展示会担当者"},
        "offers": {
            "@type": "Offer",
            "priceCurrency": "JPY",
            "description": "税別10万円から（税込11万円から）。最終見積もりは動画の尺、支給素材、制作範囲により決まります。",
            "priceSpecification": {
                "@type": "UnitPriceSpecification",
                "minPrice": 100000,
                "priceCurrency": "JPY",
                "valueAddedTaxIncluded": False,
            },
        },
    }
    video_schema = {
        "@context": "https://schema.org",
        "@type": "VideoObject",
        "@id": BASE + path + "#sample-video",
        "name": record["videoName"],
        "description": record["videoDescription"],
        "thumbnailUrl": poster_url,
        "contentUrl": video_url,
        "duration": record["duration"],
        "width": record["width"],
        "height": record["height"],
        "inLanguage": "ja-JP",
        "isFamilyFriendly": True,
        "creator": {"@id": BASE + "/#person", "name": "田口侑生", "alternateName": "Yuki Taguchi"},
        "mainEntityOfPage": {"@type": "WebPage", "@id": BASE + path},
    }
    if record["publicationDate"]:
        video_schema["uploadDate"] = record["publicationDate"]

    body = f'''<div class="wide manufacturing-page">{crumb_markup}
<div class="manufacturing-showcase"><header class="manufacturing-hero"><p class="section-label">MANUFACTURING / AI PR VIDEO</p><h1>{esc(record["title"].split("｜", 1)[0])}</h1><p class="manufacturing-hero__lead"><strong>AI映像で、技術と暮らしをつなぐ。</strong><br>製品や加工技術の先にある価値を、見た人がイメージできる物語へ。映像からBGMまでAIで制作し、目的に合う動画を提案します。</p><a class="author-line" href="/about.html">制作：田口侑生 / Yuki Taguchi <span aria-hidden="true">↗</span></a><div class="manufacturing-quick-cta" aria-label="料金と相談"><p><strong>税別10万円〜</strong><span>税込11万円〜</span></p><a class="btn btn-dark" href="/#contact-form">製造業向けPR動画を相談する <span aria-hidden="true">→</span></a></div></header>
<figure class="manufacturing-player" id="sample"><video controls playsinline preload="metadata" poster="{esc(record["posterPath"])}" width="{record["width"]}" height="{record["height"]}" aria-label="製造業向けPR動画の自主制作サンプル" aria-describedby="manufacturing-sample-caption"><source src="{esc(record["videoPath"])}" type="video/mp4"><p>お使いのブラウザでは動画を再生できません。<a href="{esc(record["videoPath"])}">動画ファイルを開く</a></p></video><figcaption id="manufacturing-sample-caption"><strong>自主制作サンプル：</strong>BGMを含め、映像全体をAIで制作した約35秒の音声付き動画です。<ul class="manufacturing-player__facts" aria-label="動画の仕様"><li>自主制作サンプル</li><li>約35秒</li><li>16:9・1280×720</li><li>音声付き・AI BGM</li></ul></figcaption></figure></div>
<p class="manufacturing-disclosure"><strong>自主制作によるAI生成のイメージ映像です。受託案件の実績紹介ではありません。</strong>画面に登場する工場、設備、製品、人物はAIで生成した表現です。実際の設備・製品を紹介する際は、提供資料と確認済みの情報を照合して制作します。</p>
<div class="manufacturing-content">
<section id="story" aria-labelledby="heading-story"><h2 id="heading-story">金属部品から、その先の暮らしまでを一本の物語に</h2><p>サンプルでは、技術者が金属部品を確かめる場面から、加工、精密部品、街、車いすを利用する人の暮らし、職人へと視点をつなぎます。製造現場そのものだけでなく、技術が社会や生活にどう関わるかを伝える構成例です。</p><p>終盤の「精度で、暮らしをつなぐ。」まで、製造業の技術と暮らしの接点を約35秒で描いています。PR動画で考えられる物語の見せ方を示す自主制作サンプルです。</p><div class="manufacturing-story-grid"><article><small>01 / PRECISION</small><h3>技術と精度</h3><p>部品の確認や加工のイメージから、ものづくりの丁寧さを伝えます。</p></article><article><small>02 / CONNECTION</small><h3>製品のその先</h3><p>精密部品から街や暮らしへ視点を移し、技術の役割を描きます。</p></article><article><small>03 / PEOPLE</small><h3>人へ届く価値</h3><p>職人の姿と生活場面をつなぎ、企業が届けたい価値を印象に残します。</p></article></div></section>
<section id="uses" aria-labelledby="heading-uses"><h2 id="heading-uses">製造業の広報・採用・営業で、動画にできること</h2><p>同じ会社でも、伝える相手によって必要な構成は変わります。会社や技術を初めて知る人には全体像を、製品を検討する人には特徴や用途を、採用候補者には仕事と人を中心に構成できます。</p><div class="manufacturing-use-grid"><article><small>COMPANY / PRODUCT</small><h3>会社紹介・製品PR</h3><p>技術、製品、企業姿勢を整理し、Webサイトや営業資料と一緒に使える紹介動画へ。</p></article><article><small>RECRUIT</small><h3>採用・仕事紹介</h3><p>働く人、仕事の流れ、ものづくりの魅力を、応募者に届く順序で伝える動画へ。</p></article><article><small>EXHIBITION / SALES</small><h3>展示会・営業</h3><p>限られた時間で、製品の特徴や相談の入口を伝える説明・ループ動画へ。</p></article></div></section>
<section id="production" aria-labelledby="heading-production"><h2 id="heading-production">確認できる事実とAI表現を分けて制作します</h2><p>実際の企業・製品を紹介する場合は、会社案内、製品写真、仕様書、ロゴ、確認済みの原稿などをもとに構成します。形状、数値、工程、安全上の表現など、正確さが必要な情報は推測で補わず、担当者の確認を受けて仕上げます。</p><p>実物を見せる必要がある場面には、支給写真や撮影素材を使う方法も検討します。AI生成は、コンセプトを表すイメージや実写素材を補う場面など、目的と事実性に合わせて使う範囲を決めます。</p><ol class="manufacturing-process"><li><strong>目的と視聴者を整理</strong><br>会社紹介、製品PR、採用、展示会など、動画を見た後に伝えたいことを確認します。</li><li><strong>資料と制作範囲を確認</strong><br>製品・設備の写真、仕様、原稿、ロゴ、既存映像など、使える素材を整理します。</li><li><strong>構成・AI素材・編集</strong><br>台本と見せ方を決め、AI映像やBGMを含む必要な素材を制作して編集します。</li><li><strong>事実確認と納品</strong><br>固有名詞、数値、字幕、映像表現、音のバランスを確認し、用途に合う形式で仕上げます。</li></ol></section>
<section id="pricing" aria-labelledby="heading-pricing"><h2 id="heading-pricing">料金</h2><div class="manufacturing-price"><p class="manufacturing-price__amount">税別10万円〜<small>税込11万円〜</small></p><div><p>最終のお見積もりは、動画の尺、支給素材の状態、AIで制作する素材、編集・確認などの制作範囲によって決まります。</p><p>相談時に目的と用意できる資料を伺い、必要な工程と費用を着手前にご案内します。</p></div></div></section>
<section id="faq" class="manufacturing-faq" aria-labelledby="heading-faq"><h2 id="heading-faq">よくある質問</h2><details><summary>映像もBGMもAIで制作していますか？</summary><p>はい。この自主制作サンプルは、工場、設備、部品、人物などの映像からBGMまでAIで制作しています。</p></details><details><summary>製品PRや会社紹介にも使えますか？</summary><p>はい。製品の特徴、技術、企業姿勢など、誰に何を伝えたいかを整理して構成を検討できます。実際の製品の形状や仕様は、支給資料と担当者の確認をもとに扱います。</p></details><details><summary>採用動画や展示会用の動画も相談できますか？</summary><p>相談できます。採用では仕事や人、展示会では短時間で伝えたい特徴など、用途に合わせて必要な場面と構成を決めます。制作内容は資料と使用環境を確認してご案内します。</p></details><details><summary>相談時に用意するものはありますか？</summary><p>会社案内、製品・設備の写真、仕様、ロゴ、既存動画、伝えたい文章などがあれば共有してください。資料がそろっていない場合も、動画の目的と確認が必要な情報から整理できます。</p></details></section>
<section id="related" aria-labelledby="heading-related"><h2 id="heading-related">関連する動画制作</h2><p>製造業以外の広告動画や、既存素材を使った編集、自動化を含む制作も相談できます。</p><div class="manufacturing-related"><a href="/services/ai-video.html">AI広告動画制作を見る <span aria-hidden="true">↗</span></a><a href="/services/video-editing.html">AI自動動画編集を見る <span aria-hidden="true">↗</span></a><a href="/works/video-pipeline.html">動画自動生成パイプラインを見る <span aria-hidden="true">↗</span></a></div></section>
</div></div>'''
    return page(
        record["title"], record["description"], path, body,
        [service_schema, video_schema, crumb_schema],
        og_image=poster_url,
        og_image_alt="製造業向けAI PR動画の自主制作サンプルの一場面",
        og_image_width=record["width"],
        og_image_height=record["height"],
        stylesheets=("/assets/manufacturing-pr-video.css?v=1",),
    )


def main():
    record = load_record()
    target = ROOT / record["path"].lstrip("/")
    target.write_text(build(record) + "\n", encoding="utf-8")
    write_video_sitemap(ROOT)
    if record["publicationDate"] is None:
        print("Built manufacturing PR video page; publicationDate remains unset and video sitemap retains published entries only.")
    else:
        print("Built manufacturing PR video page and video sitemap with publicationDate.")


if __name__ == "__main__":
    main()
