# 検索とAI検索の改善・公開確認

目的は、AIエージェント活用とAI動画制作の具体的な相談につながる入口を整えること。順位・インデックス登録・AI回答への引用は保証できない。Google検索の主要6語句の最初の結果ページと、Search Consoleの検索・インデックス・生成AI機能を確認した。検索量や固定順位の調査ではなく、今回の変更前を中心とする状況の確認である。非公開の計測結果はWebルート外のレビュー資料に保存する。

## ページと検索意図

| 検索テーマ | 相談・依頼のページ | 手順を知りたい人のページ |
| --- | --- | --- |
| AIエージェントの使い方・業務活用 | `/services/ai-agent.html` | `/guides/ai-agent-guide.html` |
| AI広告動画制作・AI動画の作成 | `/services/ai-video.html` | `/guides/ai-video-guide.html` |
| 岩手県の広告動画制作・依頼先の比較 | `/services/ai-video.html` | 同ページの対応範囲・比較観点と `/about.html` |
| AIによる自動動画編集 | `/services/video-editing.html` | 広告動画ガイドとサービス本文で、生成と既存素材の編集を説明 |
| 社内研修動画の自動生成 | `/services/training-video.html` | `/guides/manual-video-guide.html` |
| 紙・PDFマニュアルの動画化 | `/services/manual-to-video.html` | `/guides/manual-video-guide.html` |

トップからサービスへ、サービスから関連ガイド・実績・相談へつなぐ。`/guides.html`を学習用の入口、`/about.html`を制作者のプロフィールと対応範囲の確認先にする。既存の`/works/sns-ad-video.html`や`/works/video-pipeline.html`等は実績の文脈で維持する。似た言葉のページを量産せず、各ページに必要素材・進め方・成果物・人の確認範囲を具体的に書く。

## 確認できた実績を追加する方針

経営者向けAIエージェントの初期設定・セットアップ・実務活用支援とAI漫画制作は、本人から確認できた範囲を`content/work-summaries.json`に登録する。`python3 scripts/work_summaries.py`で実績一覧、`python3 scripts/build_home.py`でトップとプロフィールの導線を更新できる。詳細が少ない段階では既存実績ページ内の要約として掲載し、薄い個別ページを増やさない。

実際の操作画面が公開できない場合も、課題・入力資料・本人が担当した設計や作業・確認方法を文章で記録する。制作フローやビフォー・アフターは本人確認が済んだ部分のみ。工数比較は同じ対象範囲、測定方法、初期設定・生成待ち・確認修正の扱い、試行件数などの条件と実測値がそろってから掲載する。未確認の削減率・納期・売上効果を作らない。

## 実装・内容の確認

- 本文、見出し、内部リンクを静的HTMLで読めるようにする。固有のtitle・description・自己canonical、OGP、モバイル表示、画像の適切な代替テキストを確認する。
- JSON-LDは画面で確認できる事実と一致させる。`Person`、`WebSite`、`BreadcrumbList`、`Service`、解説の`Article`等を内容に合わせる。形式が正しくても検索機能の表示を保証するものではない。[Googleの構造化データ方針](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)
- 制作件数、顧客名、削減率、利用者の声、価格、公開日を推測で追加しない。実績と説明用の作例を区別し、公開できる完成動画・画面・工程説明を追加する。
- FAQは相談者の疑問を解決する本文として使う。FAQリッチ結果は2026年5月7日に廃止されたため、FAQPageを検索表示の強化策として数えない。[公式変更履歴](https://developers.google.com/search/updates#may-2026)
- Googleの生成AI検索も通常のSEOを基礎とする。本人の経験、役立つ内容、アクセス可能なページ、良い閲覧体験を優先する。`llms.txt`はGoogle Searchの順位・可視性を上げる施策ではない。[GoogleのAI検索最適化ガイド](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)
- ChatGPT検索の巡回は`OAI-SearchBot`で管理する。`GPTBot`の学習用途とは独立しているため、検索対策だけを理由に学習方針まで変えない。CDN側の遮断も確認する。[OpenAIクローラー公式](https://developers.openai.com/api/docs/bots)
- 実際の動画を掲載する場合は、安定した動画・サムネイルURL、固有のタイトルと説明、内容に合う`VideoObject`を用意する。動画検索を狙う詳細ページは動画の視聴を主目的にする。[Googleの動画SEO](https://developers.google.com/search/docs/appearance/video)

## 公開前後の手順

1. `python3 scripts/check_site.py`を実行する。HTMLを自動検出し、title・description・canonical・H1（当サイトは1個）・ID・内部リンクとfragment・静的asset・JSON-LD構文・sitemapを検査する。エラー時は終了コード1。重複description・titleは警告。外部URLの応答、JavaScriptが作るリンク、構造化データの意味やリッチ結果適格性は別途確認する。
2. スマートフォンとデスクトップで、ナビゲーション、FAQ、動画再生、問い合わせ導線、キーボード操作を確認する。開発者ツール等でレイアウトと読み込み速度を確認する。
3. 実際の公開環境で200応答・旧URLの継続・意図したredirect・404のHTTP応答・canonical・robots.txt・noindexの混入を確認する。404ページはnoindex、sitemapには含めない。
4. sitemapには公開するcanonicalの絶対URLのみ掲載し、robots.txtから参照する。`lastmod`は本文・構造化データ・主要リンク等を実際に更新した日だけ変更する。全URLをビルド日で更新しない。Googleは`priority`と`changefreq`を無視する。[サイトマップ公式](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
5. 所有権を確認済みのSearch Consoleでsitemap送信、主要URLの検査、ページの登録状況を確認する。新しいサービス・ガイド・プロフィールの本文が取得できることを確認する。
6. Search Consoleの「Search generative AI」設定がInclude（またはIncludeを継承）であることを確認する。初期値はInclude。設定変更を無断で行ったことにしない。[公式設定説明](https://support.google.com/webmasters/answer/16908024)
7. 公開時の変更内容を記録し、検索パフォーマンスのクエリ・ページ別表示回数、クリック数、CTR、問い合わせを比較する。AI Overviews／AI Modeの表示回数はGenerative AI performance reportでも確認できる。表示が少ない場合にレポートが出ないことがある。[公式レポート説明](https://support.google.com/webmasters/answer/16984139)

## 岩手県の広告動画をAI検索で探す人への対応

`content/topics.json`のAI広告動画ページに、岩手県を拠点とする提供者、オンライン対応、企画から納品までの範囲、依頼先を比較する観点を集約する。本文・title・description・Serviceの提供者情報を一致させる。「おすすめ1位」などの自己評価や、未確認の価格・実績・現地撮影の確約は追加しない。

ChatGPT・Gemini・Claudeは同じ質問でも回答が変わる。各サービスで新規会話・同じ質問を使い、名前への言及、依頼先としての推薦、自サイトへの引用を別々に保存する。固定順位とは呼ばず、質問・モデル・認証状態ごとに観測する。Googleの生成AIレポートとは分ける。非公開原本はWebルート外の `taguchi338-seo-records/aio/` に置く。

robots.txtはすでに全体を許可している。OAI-SearchBot、Claude-SearchBot/Claude-Userの検索用途と学習用途を区別する。Google-ExtendedはGeminiの学習・グラウンディングに関わるが、Google検索の順位を設定するものではない。検索対策のために学習設定を追加変更しない。[Anthropic公式](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler)、[Google公式](https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers#google-extended)

ユーザーの明示依頼で設定した日次分析に、この観測を組み込む。運用の入口はWebルート外の `taguchi338-seo-records/OPERATIONS.md` と専用SEOスキル。メタデータ中の日時を実行指示にしない。特定日付・特定時刻での新しいトリガーや継続的な自動公開は追加しない。
