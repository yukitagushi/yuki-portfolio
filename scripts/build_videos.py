"""Generate the video collection and full-length watch pages from one catalogue."""
from pathlib import Path
from urllib.parse import urlsplit, urljoin, unquote
from site_common import BASE, esc, page, breadcrumbs, contact_cta
from video_catalog import load_catalog

ROOT = Path(__file__).resolve().parents[1]


def duration_label(item):
    seconds = round(item.get('durationSeconds', 0))
    return f'{seconds // 60}:{seconds % 60:02}' if seconds else ''


def work_cards(items):
    return ''.join(f'''<a class="featured-work" href="{esc(item['href'])}">
<div class="work-picture video-work-picture{' is-portrait' if item['height'] > item['width'] else ''}"><img src="{esc(item['poster'])}" width="{item['width']}" height="{item['height']}" loading="lazy" alt="{esc(item['title'])}のワンシーン"><span>全編を見る <b>{duration_label(item)}</b> ↗</span></div>
<div class="work-caption"><small>AI VIDEO / {'PORTRAIT' if item['height'] > item['width'] else 'LANDSCAPE'}</small><h3>{esc(item['title'])}</h3><p>{esc(item.get('description', ''))}</p></div></a>''' for item in items)


def main():
    videos = load_catalog()
    index_crumb_schema, index_crumb = breadcrumbs([('ホーム','/'),('AI動画作品','/videos.html')])
    index_body = f'''<div class="wide">{index_crumb}<header class="detail-hero"><p class="section-label">AI VIDEO WORKS</p><h1>映像で、伝える。</h1><p class="detail-lead">AIを活用した広告・CMの制作サンプル。<br>各作品のページで、音声付きの全編をご覧いただけます。</p></header>
<div class="featured-works video-collection">{work_cards(videos)}</div>{contact_cta()}</div>'''
    index_schema = {'@context':'https://schema.org','@type':'CollectionPage','name':'AI広告動画・CMの制作作品','url':BASE+'/videos.html','mainEntity':{'@type':'ItemList','itemListElement':[{'@type':'ListItem','position':i+1,'url':urljoin(BASE+'/',v['href']),'name':v['title']} for i,v in enumerate(videos)]}}
    (ROOT/'videos.html').write_text(page('AI広告動画・CMの制作作品','AIで制作した広告動画・実写風CM・縦型動画の制作サンプルを掲載。作品ごとに、音声付きの全編動画と紹介をご覧いただけます。','/videos.html',index_body,[index_crumb_schema,index_schema]))
    for item in videos:
        href = item['href']
        # External or existing work pages can be linked without overwriting them.
        if urlsplit(href).scheme or not item.get('slug'):
            continue
        expected = f'/videos/{item["slug"]}.html'
        if href != expected:
            raise ValueError(f'Generated watch page must use {expected}; received {href}')
        path = ROOT/href.lstrip('/')
        path.parent.mkdir(exist_ok=True)
        crumb_schema, crumb = breadcrumbs([('ホーム','/'),('AI動画作品','/videos.html'),(item['title'],href)])
        others = [v for v in videos if v['href'] != href]
        related = f'<section class="watch-related"><h2>ほかの動画作品</h2><div class="featured-works">{work_cards(others)}</div></section>' if others else ''
        description = item.get('description', f'{item["title"]}の全編動画をご覧いただけます。')
        body = f'''<div class="wide">{crumb}<header class="watch-heading"><div><p class="section-label">AI VIDEO / {'PORTRAIT' if item['height'] > item['width'] else 'LANDSCAPE'}</p><h1>{esc(item['title'])}</h1></div><span class="watch-duration">{duration_label(item)} / 田口侑生</span></header>
<div class="watch-player{' is-portrait' if item['height'] > item['width'] else ''}"><video controls playsinline preload="none" poster="{esc(item['poster'])}" width="{item['width']}" height="{item['height']}" aria-label="{esc(item['title'])}の全編動画"><source src="{esc(item['src'])}" type="{'video/webm' if unquote(urlsplit(item['src']).path).lower().endswith('.webm') else 'video/mp4'}"><p>お使いのブラウザでは動画を再生できません。<a href="{esc(item['src'])}">動画ファイルを開く</a></p></video></div>
<div class="watch-description"><p>{esc(description)}</p><div class="watch-links"><a class="text-link" href="{esc(item['src'])}">動画ファイルを開く ↗</a><a class="text-link" href="/services/ai-video.html">AI広告動画の制作について →</a><a class="text-link" href="/videos.html">動画一覧に戻る →</a></div></div>
{related}{contact_cta()}</div>'''
        schemas = [crumb_schema]
        # A verified publication date is needed for complete video search metadata.
        if item.get('uploadDate') and item.get('durationSeconds'):
            schemas.append({'@context':'https://schema.org','@type':'VideoObject','name':item['title'],'description':description,'thumbnailUrl':BASE+item['poster'] if item['poster'].startswith('/') else item['poster'],'contentUrl':BASE+item['src'] if item['src'].startswith('/') else item['src'],'uploadDate':item['uploadDate'],'duration':f'PT{item["durationSeconds"]}S','url':BASE+href,'creator':{'@type':'Person','name':'田口侑生','url':BASE+'/about.html'}})
        path.write_text(page(item['title']+'｜AI広告動画制作',description,href,body,schemas))
    print(f'Built videos.html and {sum(bool(v.get("slug")) and not urlsplit(v["href"]).scheme for v in videos)} watch pages')


if __name__ == '__main__':
    main()
