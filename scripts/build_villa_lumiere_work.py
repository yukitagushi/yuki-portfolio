#!/usr/bin/env python3
"""Build the approved VILLA LUMIÈRE portfolio video page and video sitemap."""

from pathlib import Path

from site_common import BASE, breadcrumbs, contact_cta, page
from video_sitemap import write as write_video_sitemap


ROOT = Path(__file__).resolve().parents[1]
PATH = "/works/villa-lumiere-3d-walkthrough.html"
VIDEO_URL = BASE + "/uploads/videos/villa-lumiere-3d-walkthrough.mp4"
POSTER_URL = BASE + "/uploads/videos/villa-lumiere-3d-walkthrough-poster.jpg"
TITLE = "Blenderで制作した3D住宅・建築PRウォークスルー"
DESCRIPTION = "Blenderで制作した架空の邸宅「VILLA LUMIÈRE」の3D建築・室内PRウォークスルー動画。実在の販売物件ではありません。"
PUBLISHED_AT = "2026-09-16T00:00:00+09:00"


def build_page():
    crumb_schema, crumb_markup = breadcrumbs([
        ("ホーム", "/"), ("制作実績", "/works.html"), ("3D建築・室内PR動画", PATH),
    ])
    video_schema = {
        "@context": "https://schema.org",
        "@type": "VideoObject",
        "@id": BASE + PATH + "#video",
        "name": TITLE,
        "description": DESCRIPTION,
        "thumbnailUrl": POSTER_URL,
        "uploadDate": PUBLISHED_AT,
        "duration": "PT1M4S",
        "contentUrl": VIDEO_URL,
        "url": BASE + PATH,
        "inLanguage": "ja-JP",
        "isFamilyFriendly": True,
        "creator": {"@id": BASE + "/#person", "name": "田口侑生", "alternateName": "Yuki Taguchi"},
        "mainEntityOfPage": {"@type": "WebPage", "@id": BASE + PATH},
    }
    work_schema = {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        "@id": BASE + PATH + "#work",
        "name": TITLE,
        "description": DESCRIPTION,
        "url": BASE + PATH,
        "image": POSTER_URL,
        "datePublished": PUBLISHED_AT,
        "creator": {"@id": BASE + "/#person"},
        "about": ["3D建築ビジュアライゼーション", "不動産PR動画", "Blender"],
    }
    body = f'''<div class="wide video-work-page">{crumb_markup}
<header class="detail-hero"><p class="section-label">WORK SAMPLE</p><h1>{TITLE}</h1><p class="detail-lead">架空の邸宅「VILLA LUMIÈRE」を巡る、3D建築・室内PR動画の制作サンプルです。</p><a class="author-line" href="/about.html">制作：田口侑生 / Yuki Taguchi <span aria-hidden="true">↗</span></a></header>
<div class="reading-layout"><aside class="toc"><nav aria-labelledby="toc-title"><strong id="toc-title">このページの内容</strong><ol><li><a href="#video">動画を再生する</a></li><li><a href="#sample">制作サンプルについて</a></li><li><a href="#use">不動産・建築・宿泊施設での活用</a></li><li><a href="#request">制作依頼・レクチャー</a></li></ol></nav></aside><article class="article-body">
<figure class="portfolio-video" id="video"><video controls playsinline preload="metadata" poster="/uploads/videos/villa-lumiere-3d-walkthrough-poster.jpg" width="1280" height="720" aria-describedby="villa-lumiere-caption"><source src="/uploads/videos/villa-lumiere-3d-walkthrough.mp4" type="video/mp4"><p>お使いのブラウザでは動画を再生できません。<a href="/uploads/videos/villa-lumiere-3d-walkthrough.mp4">動画ファイルを開く</a></p></video><figcaption id="villa-lumiere-caption"><strong>制作サンプル：</strong>{DESCRIPTION}</figcaption></figure>
<p class="video-fact-note">この映像は、実在する販売物件の内覧事例や施工実績ではありません。実在物件を扱う制作では、図面・素材・表記の確認をもとに、実物とCGで表現する範囲を事前にすり合わせます。</p>
<section id="sample" aria-labelledby="heading-sample"><h2 id="heading-sample">制作サンプルについて</h2><p>Blenderを使い、玄関、室内、寝室、プールサイドまでを連続して見せる3Dウォークスルーとして制作しました。物件そのものを紹介する映像ではなく、完成前の空間や建築の印象をどのように映像で伝えられるかを示すポートフォリオ用のサンプルです。</p><p>画面内の「架空の建築 / 3Dウォークスルー」という表記のとおり、場所・販売条件・建物仕様を伝える用途には使いません。</p></section>
<section id="use" aria-labelledby="heading-use"><h2 id="heading-use">不動産・建築・宿泊施設で、映像にできること</h2><p>不動産の物件紹介、モデルルーム、リノベーション後のイメージ、ホテル・旅館の客室や館内紹介、建築のコンセプト説明などでは、写真だけでは伝えにくい移動感や空間のつながりを3D内覧動画で補える場合があります。動画の目的、見せたい範囲、実物素材の有無を整理してから、構成と表現を決めます。</p><p>正確な間取り、設備、仕様、所在地などが判断材料になる場合は、図面や確認済み素材をもとに制作します。内観写真や図面だけで確認できない部分は推測で補わず、追加資料またはイメージ表現として分けます。</p></section>
<section id="request" aria-labelledby="heading-request"><h2 id="heading-request">制作依頼と、自社で作れるようになるレクチャー</h2><p>不動産会社・建築会社・ホテル・旅館などの宿泊施設向けに、3D室内・内覧・館内PR動画の制作を相談できます。また、Blenderを使って自社で制作・更新できるように、目的や制作環境に合わせたレクチャーも検討できます。</p><p>初回相談では、動画の用途、物件・施設の状態、図面や内観写真など用意できる資料、公開先、制作を依頼したい範囲か自社で習得したい範囲かを確認します。</p><a class="btn btn-dark" href="/services/real-estate-3d-video.html#hospitality">不動産・ホテル・旅館向け3D内覧動画の制作・レクチャーを見る <span aria-hidden="true">→</span></a></section>
</article></div>{contact_cta()}</div>'''
    return page(
        TITLE, DESCRIPTION, PATH, body, [video_schema, work_schema, crumb_schema], article=True,
        og_image=POSTER_URL,
        og_image_alt="Blenderで制作した架空の邸宅「VILLA LUMIÈRE」の3D建築・室内PRウォークスルー動画の一場面",
    )


def main():
    (ROOT / PATH.lstrip("/")).write_text(build_page() + "\n", encoding="utf-8")
    write_video_sitemap(ROOT)
    print("Built VILLA LUMIÈRE video work page and video sitemap.")


if __name__ == "__main__":
    main()
