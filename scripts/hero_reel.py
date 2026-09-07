"""Render only user-selected work videos; an empty list keeps the existing artwork."""
import json
from pathlib import Path
from urllib.parse import urlsplit, unquote
from site_common import esc

ROOT = Path(__file__).resolve().parents[1]


def asset_url(value, label, suffixes):
    url = urlsplit(value)
    if url.scheme == 'https' and url.netloc:
        return value
    if url.scheme or url.netloc or not value.startswith('/'):
        raise ValueError(f'{label}: expected a local absolute URL or HTTPS URL')
    path = (ROOT / unquote(url.path).lstrip('/')).resolve()
    if not path.is_relative_to(ROOT) or not path.is_file():
        raise ValueError(f'{label}: missing published asset {value}')
    if path.suffix.lower() not in suffixes:
        raise ValueError(f'{label}: unsupported format {path.suffix}')
    return value


def render_reel(videos=None):
    if videos is None:
        videos = json.loads((ROOT / 'content/hero-videos.json').read_text())['videos']
    if not videos:
        return '', False
    slides, selectors = [], []
    for index, item in enumerate(videos):
        title = esc(item['title'])
        src = esc(asset_url(item['src'], 'video', {'.mp4', '.webm'}))
        poster = esc(asset_url(item['poster'], 'poster', {'.jpg', '.jpeg', '.png', '.webp', '.avif'}))
        href = esc(asset_url(item['href'], 'work page', {'.html'}))
        width, height = int(item['width']), int(item['height'])
        if width <= 0 or height <= 0:
            raise ValueError('Video width and height must be positive')
        first = index == 0
        slides.append(f'''<div class="reel-slide{' is-active' if first else ''}" data-title="{title}" data-href="{href}" aria-hidden="{'false' if first else 'true'}">
<img class="reel-poster" src="{poster}" width="{width}" height="{height}" alt="{title}のワンシーン" {'fetchpriority="high"' if first else 'loading="lazy"'}>
<video muted playsinline preload="none" data-src="{src}" poster="{poster}" width="{width}" height="{height}" aria-label="{title}（無音プレビュー）" tabindex="-1"></video></div>''')
        selectors.append(f'<button type="button" data-reel-select="{index}" aria-label="作品{index+1}：{title}" aria-pressed="{str(first).lower()}"><span>{index+1:02}</span><i aria-hidden="true"></i></button>')
    first = videos[0]
    return f'''<div class="hero-reel" data-hero-reel role="region" aria-roledescription="カルーセル" aria-label="AI動画の制作実績">
<div class="reel-slides">{''.join(slides)}</div>
<div class="reel-caption"><div class="reel-work"><span class="reel-count" data-reel-count>01 / {len(videos):02}</span><a data-reel-link href="{esc(first['href'])}">{esc(first['title'])}<span aria-hidden="true"> ↗</span></a></div>
<div class="reel-controls" hidden><button type="button" data-reel-prev aria-label="前の作品へ">←</button><button type="button" data-reel-toggle aria-label="動画を再生"><span data-reel-toggle-label>再生</span></button><button type="button" data-reel-next aria-label="次の作品へ">→</button></div></div>
<div class="reel-selectors" hidden>{''.join(selectors)}</div><p class="reel-status" data-reel-status role="status"></p>
</div><script src="/assets/hero-reel.js" defer></script>''', True
