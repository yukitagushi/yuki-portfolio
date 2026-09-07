"""Build the homepage, profile and 404 from the shared static site system."""
from pathlib import Path
import json
from site_common import BASE, page, esc, breadcrumbs
from hero_reel import render_reel

ROOT = Path(__file__).resolve().parents[1]
topics = json.loads((ROOT/'content/topics.json').read_text())
service_rows = [
    ('ai-video','AI広告動画の制作','企画・台本・生成・編集まで。SNSに届く動画を。','AI VIDEO'),
    ('video-editing','AIによる自動動画編集','字幕・カット・整音の繰り返しを、仕組み化。','VIDEO EDITING'),
    ('training-video','社内・研修動画の自動生成','研修資料から、伝わるナレーション付き動画へ。','TRAINING'),
    ('manual-to-video','紙のマニュアルを動画化','紙・PDFの手順書を、見てわかる教材へ。','MANUAL'),
    ('ai-agent','AIエージェントの導入・活用','使い方の整理から、仕事に合わせた実装まで。','AI AGENT'),
]
rows = ''.join(f'<a class="service-line" href="/services/{slug}.html"><span class="row-no">{i+1:02}</span><h3>{title}</h3><p>{desc}</p><span class="row-category">{cat}</span><span class="row-arrow" aria-hidden="true">→</span></a>' for i,(slug,title,desc,cat) in enumerate(service_rows))
guide_titles = ['AIエージェントの使い方','AI広告動画の作り方','紙マニュアルを動画化する手順']
guide_rows = ''.join(f'<a class="guide-row" href="/guides/{g["slug"]}.html"><span class="row-no">{i+1:02}</span><div><h3>{guide_titles[i]}</h3><p>{esc(g["description"])}</p></div><span class="row-arrow" aria-hidden="true">→</span></a>' for i,g in enumerate(topics['guides']))
steps = [('相談','今の課題や、作りたいものを伺います。資料がなくても大丈夫です。'),('設計・見積もり','構成・自動化の範囲・費用・納期を整理し、着手前に確認します。'),('制作・確認','台本や試作を見ながら進行。内容と表現を、人の目で確かめます。'),('納品・運用','納品形式と更新方法を共有。継続的な制作や運用も相談できます。')]
step_rows = ''.join(f'<li><span class="row-no">{i+1:02}</span><h3>{title}</h3><p>{desc}</p></li>' for i,(title,desc) in enumerate(steps))
form=(ROOT/'content/contact-form.html').read_text()
hero_media, has_reel = render_reel()
if not has_reel:
    hero_media = '<figure class="hero-art"><img src="/uploads/creative-paper-sky.webp" width="1448" height="1086" fetchpriority="high" alt="青い紙の造形にコーラルと黄色の紙を組み合わせた、制作をテーマにしたビジュアル"></figure>'
body=f'''<section class="home-hero wide{' has-reel' if has_reel else ''}">
<div class="hero-copy"><h1><span>つくるを、</span><span class="accent-text">もっと自由に。</span></h1>
<div class="hero-details"><p>AI広告動画の制作から、日々の仕事の自動化まで。<br>アイデアを、<span class="warm-underline">ちゃんと使える</span>かたちにします。</p>
<div class="hero-actions"><a class="btn btn-dark" href="#contact">制作・自動化を相談する <span aria-hidden="true">→</span></a><a class="hero-work-link" href="/works.html">制作実績を見る <span aria-hidden="true">↗</span></a></div><p class="hero-signature">田口侑生 / 岩手を拠点に、全国オンライン対応</p></div></div>
{hero_media}
</section>
<div class="wide"><div class="creative-strip"><span>VIDEO / AUTOMATION / DEVELOPMENT</span><span aria-hidden="true"></span></div></div>
<section class="wide section-pad" id="services"><p class="section-label">01 / SERVICES</p><h2 class="headline">つくりたいものから、<span class="understroke">選ぶ。</span></h2><p class="section-intro">AIの使い方から、制作と自動化の仕組みまで。</p><div class="service-lines">{rows}</div>
<div class="other-services"><p>ホームページ制作・アプリ開発も対応しています。</p><div><a href="/industries.html">ホームページ制作 <span aria-hidden="true">↗</span></a><a href="/services/app-development.html">アプリ開発 <span aria-hidden="true">↗</span></a><a href="/services/automation.html">業務自動化・DX <span aria-hidden="true">↗</span></a></div></div></section>
<section class="wide section-pad" id="works"><div class="section-heading"><div><p class="section-label">02 / WORKS</p><h2 class="headline">つくったものが、<br class="only-mobile">いちばんの説明。</h2></div><a class="text-link" href="/works.html">実績をすべて見る <span aria-hidden="true">↗</span></a></div>
<div class="featured-works"><a class="featured-work" href="/works/sns-ad-video.html"><div class="work-picture"><img src="/uploads/sns_ad_video_banner.webp" width="1536" height="1024" loading="lazy" alt="AI広告動画制作の紹介ビジュアル"><span>実績の詳細を見る ↗</span></div><div class="work-caption"><small>AI VIDEO</small><h3>SNS向けAI広告動画制作</h3><p>企画・台本・生成・編集をつなぎ、縦型の広告クリエイティブを制作。</p></div></a>
<a class="featured-work" href="/works/video-pipeline.html"><div class="work-picture workflow-picture"><div class="flow-art" aria-label="台本から音声・映像・字幕を経て確認・納品へ進む制作フロー"><span>台本<small>構成・原稿</small></span><b aria-hidden="true">→</b><span>AI生成<small>音声・映像</small></span><b aria-hidden="true">→</b><span>編集<small>字幕・同期</small></span><b aria-hidden="true">→</b><span>確認<small>仕上げ・納品</small></span></div><span>実装事例を見る ↗</span></div><div class="work-caption"><small>AUTOMATION</small><h3>動画自動生成パイプライン</h3><p>台本・音声・画像・編集を連携させ、動画づくりを繰り返し使える仕組みに。</p></div></a></div></section>
<section class="guide-band section-pad" id="guides"><div class="wide"><p class="section-label">03 / GUIDE</p><h2 class="headline">AIを、仕事にするための読みもの。</h2><div class="guide-list">{guide_rows}</div><a class="text-link" href="/guides.html">AI活用ガイドをすべて読む <span aria-hidden="true">↗</span></a></div></section>
<section class="wide section-pad" id="process"><p class="section-label">04 / FLOW</p><h2 class="headline">ご相談から、運用まで。</h2><ol class="process-list">{step_rows}</ol></section>
<section class="wide section-pad faq-section" id="faq"><p class="section-label">05 / FAQ</p><h2 class="headline">よくあるご質問</h2><div class="home-faq">
<details id="pricing"><summary>料金と納期は？</summary><p>AI動画制作・動画編集の自動化・AIエージェント導入は、動画の長さ・本数・素材の状態・連携する業務に応じた個別見積もりです。着手前に費用と納期をお伝えします。ホームページ制作は10〜20万円・最短2週間が目安です。この料金は動画制作やAI導入には適用されません。</p><a class="text-link" href="/industries.html">ホームページ制作の作例・料金を見る →</a></details>
<details><summary>全国から依頼できますか？</summary><p>はい。岩手県を拠点に、オンラインで全国のご相談に対応しています。資料の共有から打ち合わせ、確認、納品までオンラインで進められます。</p></details>
<details><summary>AIで作った動画は、確認なしで自動公開されますか？</summary><p>制作の一部を自動化しても、台本・固有名詞・字幕・音声・映像は確認します。特に研修や作業手順は、内容を理解している担当者と照合してから完成させます。公開の方法や承認者も事前に決めます。</p></details>
<details><summary>紙やPDFしかなくても相談できますか？</summary><p>はい。原稿の読み取りから、工程の整理、台本、ナレーション付き動画までご相談いただけます。図や写真で補う必要がある箇所は、制作前に整理します。</p><a class="text-link" href="/services/manual-to-video.html">紙マニュアルの動画化について →</a></details>
</div></section>
<section class="contact-band" id="contact"><div class="wide"><p class="section-label">06 / CONTACT</p><h2>その作業、AIと動画で<br>変えてみませんか。</h2><p>まだアイデアの段階でも、お気軽にご相談ください。</p><a class="btn btn-lime" href="#contact-form">無料相談する <span aria-hidden="true">→</span></a></div></section>
<section class="wide section-pad contact-content" id="contact-form"><div><h2 class="headline">まずは、お話を聞かせてください。</h2><p>作りたい動画、減らしたい作業、いま困っていること。<br>箇条書きのメモからでも大丈夫です。</p><a class="email-link" href="mailto:30.sc350@gmail.com">30.sc350@gmail.com <span aria-hidden="true">↗</span></a><p class="small-note">メールアプリから直接ご連絡いただけます。<br>ご相談内容に応じて制作方法とお見積もりをご案内します。</p><div class="profile-mini"><img src="/uploads/creator_avatar.png" width="64" height="64" loading="lazy" alt="Yuki Taguchiのプロフィールイラスト"><div><a href="/about.html">田口侑生 / Yuki Taguchi ↗</a><small>AIエンジニア・動画制作 / 岩手県</small></div></div></div><div><noscript><p>フォームにはJavaScriptが必要です。上記メールアドレスからご連絡ください。</p></noscript>{form}</div></section>'''
person={'@type':'Person','@id':BASE+'/#person','name':'田口侑生','alternateName':'Yuki Taguchi','url':BASE+'/about.html','image':BASE+'/uploads/creator_avatar.png','jobTitle':'AIエンジニア・動画制作者','description':'岩手県を拠点にAI動画制作、業務自動化、Web・アプリ開発を行う。オンラインで全国対応。','sameAs':['https://github.com/yukitagushi'],'knowsAbout':['AIエージェント','AI広告動画制作','動画編集自動化','研修動画制作','動画マニュアル','業務自動化']}
schemas=[{'@context':'https://schema.org','@graph':[person,{'@type':'WebSite','@id':BASE+'/#website','name':'Yuki Taguchi','url':BASE+'/','inLanguage':'ja','publisher':{'@id':BASE+'/#person'}},{'@type':'WebPage','@id':BASE+'/#webpage','url':BASE+'/','name':'AI動画制作とAIエージェント活用','isPartOf':{'@id':BASE+'/#website'},'about':{'@id':BASE+'/#person'}}]}]
(ROOT/'index.html').write_text(page('AI広告動画制作・AIエージェント活用・動画編集の自動化','AI広告動画の制作、AI自動動画編集、社内研修動画の自動生成、紙マニュアルの動画化を支援。AIエージェントの使い方から業務への導入まで、岩手のAIエンジニア田口侑生がオンラインで全国対応。実績と実践ガイドを掲載。','/',body,schemas))

crumb_schema,crumb=breadcrumbs([('ホーム','/'),('プロフィール','/about.html')])
profile=f'''<div class="wide">{crumb}<header class="detail-hero profile-hero"><div><p class="section-label">PROFILE</p><h1>つくる人も、<br>見える仕事を。</h1><p class="detail-lead">田口侑生 / Yuki Taguchi<br>AIエンジニア・動画制作 / 岩手県</p></div><img src="/uploads/creator_avatar.png" width="160" height="160" alt="Yuki Taguchiのプロフィールイラスト"></header><div class="profile-body article-body"><section><h2>AIを、実際に使える仕組みに。</h2><p>岩手県を拠点に、AIを活用した動画制作、業務の自動化、ホームページ・アプリ開発に取り組んでいます。AI動画生成と人の編集を組み合わせた広告動画から、繰り返し使える動画生成の仕組みまで、目的に合わせて設計・制作します。</p><p>オンラインで全国のご相談に対応しています。はじめに課題と制作範囲を整理し、途中の確認を重ねながら仕上げます。</p></section><section><h2>公開している制作・開発実績</h2><ul><li><a href="/works/sns-ad-video.html">SNS向けAI広告動画制作</a></li><li><a href="/works/video-pipeline.html">動画自動生成パイプライン</a></li><li><a href="/works/internal-rag.html">社内RAGシステム</a></li><li><a href="/works/auto-accounting.html">自動車整備業向け会計管理システム</a></li></ul><p>各ページで、課題・対応内容・使用技術をご紹介しています。</p></section><section><h2>このサイトのAI活用ガイドについて</h2><p>ガイドでは、業務でAIを使うための考え方、制作手順、指示文の例を整理しています。技術の説明は公式資料を確認し、参照先を記事内に掲載しています。提案する手順は、利用環境や資料の状態に合わせて調整することを前提としています。</p><a class="text-link" href="/guides.html">AI活用ガイドを読む →</a></section><section><h2>お問い合わせ・関連リンク</h2><p><a href="mailto:30.sc350@gmail.com">30.sc350@gmail.com</a><br><a href="https://github.com/yukitagushi">GitHub / yukitagushi ↗</a></p><a class="btn btn-dark" href="/#contact">制作・自動化を相談する →</a></section></div></div>'''
(ROOT/'about.html').write_text(page('プロフィール・制作方針','田口侑生（Yuki Taguchi）のプロフィール。岩手を拠点にAI動画制作、業務自動化、Web・アプリ開発に対応。公開実績、制作方針、AI活用ガイドの編集方針、お問い合わせ先。','/about.html',profile,[crumb_schema,{'@context':'https://schema.org','@type':'ProfilePage','mainEntity':person}]))
(ROOT/'404.html').write_text(page('ページが見つかりません','お探しのページが見つかりませんでした。サービスや制作実績の一覧からご確認ください。','/404.html','<div class="wide section-pad not-found"><p class="section-label">404</p><h1>ページが見つかりません。</h1><p>URLが変わったか、ページが存在しない可能性があります。</p><a class="btn btn-dark" href="/">トップページへ →</a><a class="text-link" href="/guides.html">AI活用ガイドを見る</a></div>',noindex=True))
print('Built index.html, about.html and 404.html')
