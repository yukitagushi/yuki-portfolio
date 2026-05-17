import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type WorkData = {
  title: string;
  category: string;
  categoryLabel: string;
  year: string;
  client: string;
  description: string;
  challenge: string;
  solution: string;
  results: string[];
  techStack: string[];
  image?: string;
  imageAlt?: string;
  images?: { src: string; alt: string }[];
  liveUrl?: string;
};

const works: Record<string, WorkData> = {
  "auto-repair-shop": {
    title: "整備工場 コーポレートサイト制作",
    category: "Homepage",
    categoryLabel: "ホームページ制作",
    year: "2025",
    client: "非公開（自動車整備・林業クレーン架装業）",
    description:
      "自動車整備工場のホームページを新規制作しました。地域密着型ビジネスの信頼感と専門性を最大限に引き出すモダンなデザインを採用。SEO対策を徹底し、地域検索からの集客を強化するサイト設計を行いました。",
    challenge:
      "整備工場の持つ専門性と信頼感を、Webサイトを通じて効果的に伝えること。地域のお客様に確実にリーチするためのローカルSEO戦略が求められていました。",
    solution:
      "モダンでクリーンなデザインを軸に、整備工場のサービス内容と実績を分かりやすく伝えるビジュアル設計を実施。構造化データ（JSON-LD）の実装やモバイルファースト設計、Core Web Vitalsの最適化など、テクニカルSEOを徹底しました。AIを活用した開発プロセスにより、高品質なサイトを短期間で納品。",
    results: [
      "モダンで信頼感のあるホームページの公開",
      "ローカルSEO最適化による地域検索上位表示を実現",
      "モバイルレスポンシブ対応で全デバイスからのアクセスに最適化",
      "高速なページ表示速度（Core Web Vitals最適化）",
    ],
    techStack: ["Next.js", "Tailwind CSS", "Vercel", "SEO最適化", "構造化データ"],
    image: "/works-auto-repair.png",
    imageAlt: "整備工場ホームページのデザインプレビュー",
  },
  "zukin-note": {
    title: "片頭痛の記録・振り返りアプリ（自社プロダクト）",
    category: "Web App",
    categoryLabel: "Webアプリ開発",
    year: "2026",
    client: "自社プロダクト",
    description:
      "片頭痛持ちの方が、発作のタイミング・強さ・トリガー（食事・睡眠・気圧）を簡単に記録し、後から振り返れるWebアプリ。スマホでサッと記録し、医師との相談時にもデータを見せられる「片頭痛ダイアリー」として活用できます。AIによる傾向分析機能も搭載予定。",
    challenge:
      "片頭痛の発作は突然起こり、紙のノートではすぐに記録できない。既存の頭痛アプリは入力項目が多すぎて続かない、というユーザーの声が多くありました。「辛い時でも30秒で記録できる」設計が必須でした。",
    solution:
      "ワンタップで記録開始、トリガーは選択式、メモは任意。スマホファーストのUIで、寝込んでいても片手で操作できるレイアウトに最適化。Next.js + Supabase + Vercelで構築し、認証・データ保存・PWA対応まで実装。管理画面も同時提供。",
    results: [
      "発作から30秒以内に記録完了できるUI設計",
      "気圧・睡眠・食事などのトリガーを構造化して保存",
      "月次・週次の振り返りビューで傾向を可視化",
      "PWA対応でスマホからアプリ感覚で使える",
    ],
    techStack: ["Next.js", "Supabase", "Vercel", "PWA", "TypeScript", "Tailwind CSS"],
    image: "/works-zukin-note-1.png",
    imageAlt: "片頭痛記録アプリのトップ画面（つらい時ほどさっと残せる）",
    images: [
      {
        src: "/works-zukin-note-1.png",
        alt: "片頭痛記録アプリのトップ画面（つらい時ほどさっと残せる）",
      },
      {
        src: "/works-zukin-note-2.png",
        alt: "片頭痛記録アプリの傾向分析画面（AIアナウンス・上位トリガー候補）",
      },
    ],
  },
  "auto-accounting": {
    title: "自動車整備業向け会計管理システム",
    category: "System Development",
    categoryLabel: "業務システム開発",
    year: "2026",
    client: "非公開（自動車整備業）",
    description:
      "自動車整備工場の現場で発生する「請求」「会計」「勤怠」「出入庫」「入金確認」を1つのダッシュボードに集約する業務システム。現場でバラバラに使われていたExcel・紙・複数SaaSを統合し、整備士・事務・経営者が同じ画面を見て会話できる状態を作りました。レシート撮影からの仕訳自動化、車検登録・見積・請求の連動、未回収アラートなど、整備業特有のワークフローに最適化しています。",
    challenge:
      "整備業は「車検・整備の現場」「請求書発行」「会計仕訳」「社員の出退勤」「部品の出入庫」「入金消込」が別々のツールで管理され、月末の経理処理に膨大な手間がかかっていました。さらに「どの請求がまだ入金されていないのか」を即座に把握できず、未回収が常時発生。現場の負担を減らしつつ経営判断にも使えるダッシュボードが必要でした。",
    solution:
      "整備業特化型のSaaSとして、請求・会計・勤怠・出入庫・入金消込を1つのデータ基盤に統合。レシート撮影からAIが仕訳候補を自動生成し、見積→車検登録→請求→入金の流れを1クリックで連動。ダッシュボードで「今月の実売上」「未払い請求」「未回収」「振替伝票件数」がリアルタイム可視化され、入金されていない請求が一目でわかる設計に。クイックアクション（新規仕訳/レシート読取り/見積書/請求書/車検登録）を常時表示し、現場の操作回数を最小化しています。",
    results: [
      "請求・会計・勤怠・出入庫・入金消込を1ダッシュボードで一元管理",
      "レシート撮影→AI仕訳自動生成で経理工数を大幅削減",
      "未回収・未払い請求がダッシュボードで即可視化、回収漏れを抑制",
      "見積・車検登録・請求書発行を連携させ二重入力をゼロに",
      "月次売上推移・カテゴリ別売上のスマート分析で経営判断を高速化",
    ],
    techStack: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "Tailwind CSS",
      "AI OCR（レシート読取り）",
      "Vercel",
    ],
    image: "/works-auto-accounting.png",
    imageAlt: "自動車整備業向け会計管理システムのダッシュボード画面",
  },
  "welfare-matching": {
    title: "福祉マッチングアプリ（Bubble）",
    category: "No-code App",
    categoryLabel: "ノーコード開発",
    year: "2025",
    client: "非公開（介護・福祉領域）",
    description:
      "ケアマネージャーと介護事業所をつなぐマッチングアプリ。利用者条件を入力するだけで条件に合う事業所を簡単に見つけられ、アプリ内チャット・安心の決済まで1サービスで完結します。Bubbleを用いたノーコード開発で、要件確定から本番リリースまでを短期間・低コストで実現しました。",
    challenge:
      "ケアマネージャーは利用者ごとに条件に合う介護事業所を探す必要があるが、地域 × サービス種別 × 空き状況の組み合わせが複雑で、電話・FAXで1件ずつ確認する非効率な運用が常態化。事業者側も問い合わせ対応に追われ、ケア業務が圧迫されていました。スピード重視で仮説検証を回せるMVPが必要でした。",
    solution:
      "Bubbleでフロント／管理画面／DB／ワークフロー／決済連携を一括構築。「事業所検索」「マッチング」「アプリ内チャット」「安心の決済」の4機能を軸に、ケアマネ向け・事業者向けで導線を分離。事業者は「事業者として登録する」、利用者・ケアマネは「無料ではじめる」から即利用開始できる設計に。プロトタイプから本番までを通常開発の数分の一の工数でリリースしました。",
    results: [
      "Bubbleで要件定義→本番リリースまでを短期間で達成",
      "事業所探しを「電話複数件→アプリ内検索」に置換",
      "アプリ内チャットで事業者-ケアマネのコミュニケーションを一元化",
      "決済システム連携で報酬のやり取りまでアプリ内で完結",
    ],
    techStack: ["Bubble"],
    image: "/works-welfare-matching.png",
    imageAlt: "ケアマネージャーと介護事業所をつなぐ福祉マッチングアプリのトップ画面",
    images: [
      {
        src: "/works-welfare-matching.png",
        alt: "ケアマネージャーと介護事業所をつなぐ福祉マッチングアプリのトップ画面",
      },
    ],
  },
  "ec-site": {
    title: "ECサイト構築",
    category: "EC Site",
    categoryLabel: "ECサイト制作",
    year: "2025",
    client: "非公開（D2C・物販事業者）",
    description:
      "商品カタログ・カート・決済・在庫管理・受注通知までを1つのECサイトに集約。デザインカスタマイズの自由度とSEO最適化を両立し、スマホ購入動線とリピート購入を最大化する設計で構築しました。",
    challenge:
      "汎用ECプラットフォームをそのまま使うとブランドの世界観を表現しきれず、コンバージョンが頭打ちになる。一方でフルスクラッチは予算的にも工期的にも厳しい、というジレンマを抱えていました。",
    solution:
      "Bubbleでフロント／商品DB／カート／決済／受注管理／管理画面までを一括構築。ノーコードゆえの圧倒的なスピード感で、ブランド世界観に合うデザイン・スマホファーストの購入動線・カゴ落ち対策まで標準装備しました。要件確定から本番リリースまでを短期間で実現し、運用開始後の改善サイクルも高速に回せる構成です。",
    results: [
      "ブランド世界観に合った独自デザインのEC公開",
      "スマホ購入動線をファーストビューに集約し離脱を抑制",
      "在庫・受注・配送通知の管理画面を運用しやすく整理",
      "Bubbleによるノーコード開発で短期リリース＆運用改善サイクルを高速化",
    ],
    techStack: ["Bubble"],
    image: "/works-ec-site-2.png",
    imageAlt: "D2Cブランド向けECサイトのキービジュアル",
    images: [
      {
        src: "/works-ec-site-2.png",
        alt: "D2Cブランド向けECサイトのキービジュアル",
      },
      {
        src: "/works-ec-site-1.png",
        alt: "ECサイトのモバイルメニュー画面",
      },
    ],
  },
  "internal-rag": {
    title: "社内RAGシステム",
    category: "AI System",
    categoryLabel: "AIシステム開発",
    year: "2026",
    client: "非公開（社内業務効率化）",
    description:
      "社内ドキュメント・マニュアル・議事録などをベクトル化し、自然言語で問い合わせができる検索/Q&Aシステム。「あの資料どこだっけ？」「過去の判断はどうだった？」を秒で解決し、社内ナレッジを再利用可能な資産に変えます。",
    challenge:
      "情報がドライブ・Slack・Notion・PDFなど複数の場所に散在し、必要なときに必要な情報へたどり着けない。新人オンボーディングや問い合わせ対応で、ベテラン社員に同じ質問が繰り返し届くという課題がありました。",
    solution:
      "社内ドキュメントを定期的にクロール・チャンク分割・ベクトル化し、ベクトルDBに格納。ユーザーの質問に対して関連箇所を検索→LLMで自然言語回答を生成するRAGパイプラインを構築。回答には必ず出典元リンクを付与し、ハルシネーションを抑制。権限管理で部門別・役職別の閲覧制御にも対応。",
    results: [
      "社内ドキュメント検索の所要時間を大幅短縮",
      "オンボーディングQ&Aの90%以上をAIが一次回答",
      "出典リンク付き回答で情報の信頼性を担保",
      "権限管理で機密情報の漏えいリスクを最小化",
    ],
    techStack: [
      "Python",
      "OpenAI / Claude API",
      "LangChain",
      "ベクトルDB（pgvector等）",
      "Next.js",
      "Vercel",
    ],
  },
  "grant-recommender": {
    title: "補助金レコメンドシステム",
    category: "AI System",
    categoryLabel: "AIシステム開発",
    year: "2025",
    client: "非公開（中小企業支援領域）",
    description:
      "事業内容・業種・規模・所在地などを入力すると、AIが該当する補助金・助成金候補を自動でレコメンドするシステム。国・自治体・民間が提供する膨大な制度の中から、その事業者にとって本当に取りに行ける補助金を絞り込みます。",
    challenge:
      "補助金制度は数百種類あり、要件・公募期間・採択率がバラバラで、中小事業者が独力で適切な制度を見つけるのは事実上不可能。一方で支援者（士業・コンサル）も全制度を網羅するのは難しいという二重の課題がありました。",
    solution:
      "補助金データをスクレイピング/API取得で常時最新化し、業種・規模・目的・地域などの条件で構造化。入力された事業プロファイルとマッチ度を計算し、上位候補に対してAIが「採択されやすい申請のポイント」「必要書類リスト」までセットで提案する設計にしました。",
    results: [
      "100種類以上の補助金から数十秒で候補を提示",
      "業種・地域・目的にマッチした採択可能性の高い制度を優先表示",
      "申請のポイント・必要書類までAIが自動生成",
      "士業・経営コンサル向けにホワイトラベル提供も可能",
    ],
    techStack: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "OpenAI / Claude API",
      "スクレイピング基盤",
    ],
  },
  "video-pipeline": {
    title: "動画自動生成パイプライン",
    category: "DX Support",
    categoryLabel: "DX支援",
    year: "2025",
    client: "非公開（コンテンツ制作・研修事業）",
    description:
      "テーマやスライドPDFを投入するだけで、台本生成 → AI音声合成 → 画像/動画素材生成 → タイムライン合成 → mp4書き出し までを完全自動化するパイプライン。研修動画・サービス紹介動画・SNSショート動画など、フォーマット別のテンプレートに対応。",
    challenge:
      "動画コンテンツの需要が増える一方、台本・ナレーション・素材集め・編集に膨大な工数がかかり、内製も外注も負担が大きい。継続的に大量本数を出すには、人手の編集ループを断ち切るパイプラインが必要でした。",
    solution:
      "Claude/GPTで台本生成 → Fish Audio/ElevenLabsで日本語TTS → Nano Banana等で画像生成 → Remotionでアニメーション付き合成 → ffmpegで結合・BGMミキシング、という工程を1コマンドで通すパイプラインを構築。フォーマット（横型/縦型/研修/プロモ）ごとにテンプレート化し、テーマを変えるだけで量産可能に。",
    results: [
      "1本2〜30分尺の動画を最短数分〜数十分で自動生成",
      "台本・音声・画像・編集をすべてAIで完結",
      "横型/縦型/研修/プロモなど用途別テンプレート化",
      "ナレーション同期・BGMループ・フェード・キャプション焼付まで自動",
    ],
    techStack: [
      "Python",
      "Remotion",
      "ffmpeg",
      "Claude / GPT API",
      "Fish Audio / ElevenLabs",
      "画像生成AI",
    ],
  },
  "order-management": {
    title: "受発注管理システム",
    category: "System Development",
    categoryLabel: "システム開発",
    year: "2024",
    client: "非公開",
    description:
      "企業の受発注業務を一元管理するカスタムシステムを開発。手作業によるミスを削減し、業務効率を大幅に改善しました。",
    challenge:
      "Excelベースの受発注管理による入力ミスの頻発、データの二重管理、リアルタイムな在庫状況の把握が困難という課題を解決する必要がありました。",
    solution:
      "No-codeプラットフォームとAIを組み合わせたハイブリッド開発を採用。受注から発注、在庫管理までをワンストップで管理できるシステムを、従来の数分の一のコストと期間で構築。リアルタイムダッシュボードで経営判断をサポート。",
    results: [
      "受発注業務の処理時間を70%削減",
      "入力ミスをほぼゼロに",
      "リアルタイムな在庫・売上状況の可視化",
      "開発コストを従来見積もりの1/3に抑制",
    ],
    techStack: ["React", "Node.js", "PostgreSQL", "REST API", "ダッシュボード"],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCvxoPVD2HwbU_t_CO77bJziSaCjIYNr-_2CXPeUKDsLuOhQSws2C6ald-9pYgaEUJJivK-_ae9oO4lKTiaX_ZeY-wbFVVwhrD508o7mciuS_e52-d7wOmhRfSOtMrRE3ZouCtbhwETAAXcnj6o8_D2aNM61CFYUkMd5SpU5DzJAPTSnx9CiBi0qWK_Z_UvQhTqG4jweUNIddY_h4iVhP_5dZ3cPFpP_s3Wt1NvAJOWZIgzADLCc5XhozrJx-HZvBc51QbS-353EI4",
    imageAlt: "受発注管理システムのダッシュボード画面",
  },
};

export async function generateStaticParams() {
  return Object.keys(works).map((slug) => ({ slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const work = works[slug];

  if (!work) {
    return { title: "Not Found" };
  }

  const ogImage = work.image ?? "/og-image.png";
  const ogImageAlt = work.imageAlt ?? `${work.title} - 田口 侑生 制作実績`;

  return {
    title: `${work.title} - 制作実績`,
    description: work.description,
    openGraph: {
      title: `${work.title} | 田口 侑生 制作実績`,
      description: work.description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: ogImageAlt }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${work.title} | 田口 侑生 制作実績`,
      description: work.description,
      images: [ogImage],
    },
  };
}

export default async function WorkDetailPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const work = works[slug];

  if (!work) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: work.title,
    description: work.description,
    dateCreated: work.year,
    creator: {
      "@type": "Person",
      name: "田口 侑生",
      url: "https://taguchi338.com",
    },
    genre: work.categoryLabel,
    keywords: work.techStack.join(", "),
    ...(work.image ? { image: work.image } : {}),
  };

  return (
    <>
      <Header />
      <main className="pt-24">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Hero */}
        <section className="px-8 py-20 bg-surface-lowest">
          <div className="max-w-5xl mx-auto">
            <Link
              href="/#works"
              className="inline-flex items-center gap-2 text-sm text-on-surface-variant hover:text-tertiary transition-colors mb-12"
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              Back to Works
            </Link>
            <div className="mb-8">
              <span className="text-[10px] font-bold tracking-widest text-tertiary uppercase mb-4 block">
                {work.category}
              </span>
              <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tight mb-6">
                {work.title}
              </h1>
              <div className="flex flex-wrap gap-6 text-sm text-on-surface-variant">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                    Client
                  </span>
                  <span className="font-medium">{work.client}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                    Year
                  </span>
                  <span className="font-medium">{work.year}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                    Category
                  </span>
                  <span className="font-medium">{work.categoryLabel}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Image */}
        {(work.images && work.images.length > 0) || work.image ? (
          <section className="px-8 pb-20 bg-surface-lowest">
            <div className="max-w-5xl mx-auto">
              {work.images && work.images.length > 0 ? (
                <div
                  className={`grid gap-6 md:gap-8 ${
                    work.images.length >= 2
                      ? "grid-cols-1 sm:grid-cols-2"
                      : "grid-cols-1 max-w-md mx-auto"
                  }`}
                >
                  {work.images.map((img) => (
                    <div
                      key={img.src}
                      className="border border-outline-variant/10 bg-surface flex items-center justify-center p-6 sm:p-8"
                    >
                      <img
                        alt={img.alt}
                        className="w-full h-auto max-h-[720px] object-contain"
                        src={img.src}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="aspect-[16/9] overflow-hidden border border-outline-variant/10 bg-surface">
                  <img
                    alt={work.imageAlt}
                    className="w-full h-full object-cover"
                    src={work.image}
                  />
                </div>
              )}
            </div>
          </section>
        ) : null}

        {/* Content */}
        <section className="px-8 py-20 bg-surface-low">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="text-2xl font-headline font-bold mb-4">Overview</h2>
                <p className="text-on-surface-variant leading-relaxed">
                  {work.description}
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-headline font-bold mb-4">Challenge</h2>
                <p className="text-on-surface-variant leading-relaxed">
                  {work.challenge}
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-headline font-bold mb-4">Solution</h2>
                <p className="text-on-surface-variant leading-relaxed">
                  {work.solution}
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-headline font-bold mb-4">Results</h2>
                <ul className="space-y-3">
                  {work.results.map((result, i) => (
                    <li key={i} className="flex items-start gap-3 text-on-surface-variant">
                      <span className="material-symbols-outlined text-tertiary text-lg mt-0.5">
                        check_circle
                      </span>
                      {result}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <div className="bg-surface-lowest p-8 border border-outline-variant/10 sticky top-28">
                <h3 className="text-sm font-headline font-bold uppercase tracking-widest text-slate-400 mb-4">
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {work.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-surface-low text-sm font-medium border border-outline-variant/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                {work.liveUrl && (
                  <div className="mt-10 pt-8 border-t border-outline-variant/10">
                    <a
                      href={work.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full items-center justify-center gap-2 border border-on-surface py-4 text-center font-bold tracking-widest uppercase text-sm transition-all hover:bg-surface-low active:scale-95"
                    >
                      公開サイトを見る
                      <span className="material-symbols-outlined text-sm">open_in_new</span>
                    </a>
                  </div>
                )}
                <div className="mt-4">
                  <a
                    href="/#contact"
                    className="block w-full bg-on-surface text-on-primary py-4 text-center font-bold tracking-widest uppercase text-sm transition-all hover:bg-slate-800 active:scale-95"
                  >
                    相談する
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-8 py-20 bg-surface-lowest">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-headline font-bold mb-6 tracking-tight">
              同じような課題をお持ちですか？
            </h2>
            <p className="text-on-surface-variant mb-10 leading-relaxed">
              まずはお気軽にご相談ください。課題のヒアリングから最適な解決策の提案まで、丁寧に対応いたします。
            </p>
            <a
              href="/#contact"
              className="inline-block bg-on-surface text-on-primary px-10 py-5 font-bold tracking-wide transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-on-surface/5"
            >
              無料相談する
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
