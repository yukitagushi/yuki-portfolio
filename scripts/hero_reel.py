"""Render silent background clips with readable, independent HTML typography."""
from site_common import esc
from video_catalog import load_catalog, validate_catalog


def render_reel(videos=None):
    if videos is None:
        videos = load_catalog()
    else:
        videos = validate_catalog({'videos': videos})
    if not videos:
        return '', False
    slides, progress = [], []
    for index, item in enumerate(videos):
        src = esc(item['src'])
        poster = esc(item['poster'])
        width, height = int(item['width']), int(item['height'])
        if width <= 0 or height <= 0:
            raise ValueError('Video width and height must be positive')
        first = index == 0
        layout = esc(item.get('mobileLayout', 'standard'))
        slides.append(f'''<div class="reel-slide{' is-portrait' if height > width else ''}{' is-active' if first else ''}" data-mobile-layout="{layout}" style="--reel-media-ratio: {width} / {height}">
<img class="reel-backdrop" src="{poster}" width="{width}" height="{height}" alt="" aria-hidden="true" {'fetchpriority="high"' if first else 'loading="lazy"'}>
<img class="reel-poster" src="{poster}" width="{width}" height="{height}" alt="" {'fetchpriority="high"' if first else 'loading="lazy"'}>
<video muted playsinline preload="none" data-src="{src}" poster="{poster}" width="{width}" height="{height}" tabindex="-1" disablepictureinpicture disableremoteplayback></video></div>''')
        progress.append(f'''<span class="reel-progress-item{' is-active' if first else ''}" data-reel-progress="{index}"><i></i></span>''')
    initial_layout = esc(videos[0].get('mobileLayout', 'standard'))
    wide_height = max((100 * item['height'] / item['width'] for item in videos if item.get('mobileLayout') == 'wide'), default=0)
    return f'''<div class="hero-reel" data-hero-reel data-reel-layout="{initial_layout}" style="--reel-mobile-wide-height: {wide_height:g}vw">
<div class="reel-slides" aria-hidden="true">{''.join(slides)}</div>
<div class="reel-overlay"><a class="hero-brand" href="/" aria-label="Yuki Taguchi ホーム">Yuki Taguchi</a><p class="reel-eyebrow">SELECTED WORKS / 制作実績</p><div class="reel-headline"><h1><span>つくるを、</span><span>もっと自由に。</span></h1><p>AI広告動画の制作と、仕事の自動化。</p></div></div>
<div class="reel-controls" hidden><span class="reel-count" data-reel-count aria-hidden="true">01 / {len(videos):02}</span><div class="reel-progress" aria-hidden="true">{''.join(progress)}</div><button type="button" data-reel-toggle aria-label="背景の動きを再開"><span data-reel-toggle-label>再開</span><span class="reel-pause-icon" aria-hidden="true">Ⅱ</span><span class="reel-resume-icon" aria-hidden="true">↻</span></button></div>
<p class="reel-status" data-reel-status role="status"></p>
</div><script src="/assets/hero-reel.js?v=mobile-reel-2" defer></script>''', True
