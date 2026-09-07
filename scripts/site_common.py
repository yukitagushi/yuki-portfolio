"""Shared, build-time HTML for the static portfolio. No runtime dependencies."""
import html
import json

BASE = 'https://taguchi338.com'
NAME = 'Yuki Taguchi'

def esc(value):
    return html.escape(str(value), quote=True)

def ld(data):
    return '<script type="application/ld+json">' + json.dumps(data, ensure_ascii=False).replace('<', '\\u003c') + '</script>'

def header(overlay=False):
    links = [('/#services', 'サービス'), ('/works.html', '実績'), ('/guides.html', 'AI活用ガイド'), ('/about.html', 'プロフィール')]
    items = ''.join(f'<a href="{url}">{label}</a>' for url, label in links)
    brand = '' if overlay else '<a class="brand" href="/" aria-label="Yuki Taguchi ホーム"><span class="brand-name">Yuki Taguchi</span></a>'
    return f'''<a class="skip-link" href="#main">本文へスキップ</a>
<header class="nav site-nav{' nav--overlay' if overlay else ''}"><div class="wide nav-inner">{brand}
<button class="menu-btn" type="button" aria-expanded="false" aria-controls="siteMenu" aria-haspopup="dialog" aria-label="メニューを開く" hidden><span class="menu-line" aria-hidden="true"></span><span class="menu-line" aria-hidden="true"></span></button>
</div></header>
<dialog class="site-menu menu-panel" id="siteMenu" aria-label="サイトメニュー"><div class="menu-top"><a class="menu-brand" href="/">Yuki Taguchi</a><button class="menu-close" type="button" aria-label="メニューを閉じる"><span class="menu-line" aria-hidden="true"></span><span class="menu-line" aria-hidden="true"></span></button></div><nav class="menu-links" aria-label="メインナビゲーション">{items}<a class="menu-contact" href="/#contact">無料相談 <span aria-hidden="true">↗</span></a></nav></dialog>
<noscript><nav class="no-script-navigation" aria-label="メインナビゲーション">{items}<a href="/#contact">無料相談</a></nav></noscript>'''

def footer():
    return '''<footer class="site-footer"><div class="wide"><div class="footer-top">
<a class="brand" href="/"><span><strong>Yuki Taguchi</strong><small>岩手から、全国へ。</small></span></a>
<nav aria-label="フッターナビゲーション"><a href="/#services">サービス</a><a href="/works.html">実績</a><a href="/guides.html">AI活用ガイド</a><a href="/about.html">プロフィール</a><a href="/#contact">お問い合わせ</a></nav></div>
<div class="footer-services"><a href="/services/ai-agent.html">AIエージェント活用</a><a href="/services/ai-video.html">AI広告動画制作</a><a href="/services/video-editing.html">AI自動動画編集</a><a href="/services/training-video.html">研修動画の自動生成</a><a href="/services/manual-to-video.html">紙マニュアルの動画化</a><a href="/industries.html">ホームページ制作</a><a href="/services/app-development.html">アプリ開発</a><a href="/services/ai-influencer.html">AIインフルエンサー</a></div>
<div class="footer-bottom"><span>© Yuki Taguchi</span><span>AI Video &amp; Automation · Iwate, Japan</span></div></div></footer>'''

def head(title, description, path, schemas=(), article=False, noindex=False):
    url = BASE + path
    image = BASE + '/uploads/ogp_ai_portfolio.jpg'
    return f'''<!doctype html><html lang="ja"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>{esc(title)} | Yuki Taguchi（田口侑生）</title>
<meta name="description" content="{esc(description)}"><meta name="author" content="田口侑生 / Yuki Taguchi">
<meta name="robots" content="{'noindex,follow' if noindex else 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'}">
<link rel="canonical" href="{url}">
<meta property="og:type" content="{'article' if article else 'website'}"><meta property="og:title" content="{esc(title)} | Yuki Taguchi"><meta property="og:description" content="{esc(description)}"><meta property="og:url" content="{url}"><meta property="og:image" content="{image}"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="Yuki Taguchi — AI Video &amp; Automation"><meta property="og:locale" content="ja_JP"><meta property="og:site_name" content="Yuki Taguchi">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="{esc(title)} | Yuki Taguchi"><meta name="twitter:description" content="{esc(description)}"><meta name="twitter:image" content="{image}">
<meta name="theme-color" content="#82d3ef"><link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="/assets/site.css?v=menu-3"><script src="/assets/site.js?v=menu-3" defer></script>
{''.join(ld(s) for s in schemas)}</head>'''

def breadcrumbs(items):
    data = {'@context':'https://schema.org','@type':'BreadcrumbList','itemListElement':[{'@type':'ListItem','position':i+1,'name':name,'item':BASE+url} for i,(name,url) in enumerate(items)]}
    markup = '<nav class="breadcrumbs" aria-label="パンくずリスト">' + ' <span aria-hidden="true">/</span> '.join(f'<a href="{url}">{esc(name)}</a>' if i<len(items)-1 else f'<span aria-current="page">{esc(name)}</span>' for i,(name,url) in enumerate(items)) + '</nav>'
    return data, markup

def contact_cta():
    return '''<aside class="small-cta"><h2>あなたの仕事に合わせて、考えます。</h2><p>資料や作りたいものが決まっていなくても大丈夫です。まずは課題をお聞かせください。</p><a class="btn btn-dark" href="/#contact">無料相談する <span aria-hidden="true">→</span></a></aside>'''

def page(title, description, path, body, schemas=(), article=False, noindex=False):
    overlay = path == '/' and 'data-hero-reel' in body
    body_class = 'refresh home-page' if overlay else 'refresh'
    return head(title, description, path, schemas, article, noindex) + f'<body class="{body_class}">' + header(overlay) + '<main id="main">' + body + '</main>' + footer() + '</body></html>'
