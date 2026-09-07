"""Render only user-selected work videos; an empty list keeps the existing artwork."""
from site_common import esc
from video_catalog import load_catalog, validate_catalog


def render_reel(videos=None):
    if videos is None:
        videos = load_catalog()
    else:
        videos = validate_catalog({'videos': videos})
    if not videos:
        return '', False
    slides, selectors = [], []
    for index, item in enumerate(videos):
        title = esc(item['title'])
        src = esc(item.get('previewSrc', item['src']))
        poster = esc(item['poster'])
        href = esc(item['href'])
        width, height = int(item['width']), int(item['height'])
        if width <= 0 or height <= 0:
            raise ValueError('Video width and height must be positive')
        first = index == 0
        slides.append(f'''<div class="reel-slide{' is-portrait' if height > width else ''}{' is-active' if first else ''}" data-title="{title}" data-href="{href}" aria-hidden="{'false' if first else 'true'}">
<img class="reel-backdrop" src="{poster}" width="{width}" height="{height}" alt="" aria-hidden="true" {'fetchpriority="high"' if first else 'loading="lazy"'}>
<img class="reel-poster" src="{poster}" width="{width}" height="{height}" alt="{title}のワンシーン" {'fetchpriority="high"' if first else 'loading="lazy"'}>
<video muted playsinline preload="none" data-src="{src}" poster="{poster}" width="{width}" height="{height}" aria-label="{title}（無音プレビュー）" tabindex="-1"></video></div>''')
        selectors.append(f'<button type="button" data-reel-select="{index}" aria-label="作品{index+1}：{title}" aria-pressed="{str(first).lower()}"><span>{index+1:02}</span><i aria-hidden="true"></i></button>')
    first = videos[0]
    return f'''<div class="hero-reel" data-hero-reel role="region" aria-roledescription="カルーセル" aria-label="AI動画の制作実績">
<div class="reel-slides">{''.join(slides)}</div>
<div class="reel-meta wide"><div class="reel-caption"><div class="reel-work"><span class="reel-count" data-reel-count>01 / {len(videos):02}</span><a data-reel-link href="{esc(first['href'])}" aria-label="{esc(first['title'])}の全編を見る">{esc(first['title'])}<span aria-hidden="true"> ↗</span></a></div>
<div class="reel-controls" hidden><button type="button" data-reel-prev aria-label="前の作品へ">←</button><button type="button" data-reel-toggle aria-label="動画を再生"><span data-reel-toggle-label>再生</span></button><button type="button" data-reel-next aria-label="次の作品へ">→</button></div></div>
<div class="reel-selectors" hidden>{''.join(selectors)}</div><p class="reel-status" data-reel-status role="status"></p></div>
</div><script src="/assets/hero-reel.js" defer></script>''', True
