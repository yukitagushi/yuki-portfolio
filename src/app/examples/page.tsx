import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title:
    "10〜20万円のホームページ制作例｜盛岡・岩手のWeb制作",
  description:
    "盛岡・岩手で10〜20万円から作れる業種別ホームページの制作例。福祉施設、行政書士事務所、エアコン業者、財団系など、実際にAIで制作したサイトを公開中。新規制作・リニューアルともに最短2週間で公開可能です。",
  keywords: [
    "盛岡 ホームページ制作 例",
    "岩手 ホームページ作成 例",
    "ホームページ 10万円 20万円",
    "福祉 ホームページ制作",
    "行政書士 ホームページ",
    "エアコン業者 ホームページ",
    "財団 ホームページ",
    "業種別 ホームページ サンプル",
  ],
  alternates: {
    canonical: "https://yukitaguchi.com/examples",
  },
  openGraph: {
    title: "10〜20万円のホームページ制作例｜盛岡・岩手のWeb制作",
    description:
      "業種別の実制作例を公開中。福祉・行政書士・エアコン・財団など、10〜20万円から最短2週間で公開できます。",
    url: "https://yukitaguchi.com/examples",
    type: "website",
    images: [
      {
        url: "/examples/aircon.png",
        width: 1200,
        height: 630,
        alt: "ホームページ制作例 - 盛岡・岩手のWeb制作",
      },
    ],
  },
};

type Example = {
  slug: string;
  industry: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  priceRange: string;
  image: string;
  imageAlt: string;
  liveUrl: string;
  accent: string;
};

const examples: Example[] = [
  {
    slug: "fukushi",
    industry: "福祉・介護施設",
    title: "コスモスの里｜グループホーム",
    subtitle: "自宅のように安心して暮らせる場所",
    description:
      "高齢者向けグループホームのコーポレートサイト。施設の温かみと安心感を伝えるやわらかな配色と、家族目線で読める情報設計。問い合わせ・見学申し込みまでの導線をシンプルに整えました。",
    features: [
      "施設紹介・1日の過ごし方のストーリーテリング",
      "ご家族向けFAQ・料金表",
      "見学申し込みフォーム",
      "アクセス・採用情報",
    ],
    priceRange: "10〜15万円",
    image: "/examples/fukushi.png",
    imageAlt: "福祉施設（グループホーム）のホームページ制作例",
    liveUrl: "https://cosmos-no-sato-brown.vercel.app/",
    accent: "from-amber-50 to-orange-50",
  },
  {
    slug: "gyoseishoshi",
    industry: "行政書士事務所",
    title: "行政書士事務所｜想いを形に",
    subtitle: "確かな未来を綴る、士業サイトの定番設計",
    description:
      "士業特有の信頼感・専門性を伝えるクラシカルなデザイン。業務内容（相続・許認可・在留資格など）、費用、相談の流れをわかりやすく構造化。問い合わせフォームから初回相談予約まで一気通貫。",
    features: [
      "業務内容ごとの専用ページ",
      "料金・相談の流れの可視化",
      "事務所紹介・代表プロフィール",
      "問い合わせ・電話タップで予約",
    ],
    priceRange: "12〜18万円",
    image: "/examples/gyoseishoshi.png",
    imageAlt: "行政書士事務所のホームページ制作例",
    liveUrl: "https://public-tan-three.vercel.app/",
    accent: "from-slate-50 to-stone-50",
  },
  {
    slug: "aircon",
    industry: "エアコン業者",
    title: "PureAir Solutions｜エアコンクリーニング",
    subtitle: "プロのエアコンクリーニングを最短予約",
    description:
      "ハウスクリーニング・エアコン洗浄業者向けのサービスサイト。料金プラン（家庭用・業務用）、対応エリア、施工事例、Web予約フォームまでを1サイトに集約。地域検索からの問い合わせを最大化する設計。",
    features: [
      "サービス別の料金プラン表",
      "施工事例・Before / After",
      "対応エリア・出張範囲の明示",
      "Web予約・LINE問い合わせ",
    ],
    priceRange: "10〜15万円",
    image: "/examples/aircon.png",
    imageAlt: "エアコン業者のホームページ制作例",
    liveUrl: "https://pureair-solutions.vercel.app/",
    accent: "from-sky-50 to-cyan-50",
  },
  {
    slug: "zaidan",
    industry: "財団・社団法人",
    title: "AWAA｜Asia Well-Aging Association",
    subtitle: "国際的な活動を発信する財団サイト",
    description:
      "アジア圏のウェルエイジングを推進する一般社団法人のオフィシャルサイト。活動報告・メンバー紹介・寄付/会員募集など、財団系に必要な要素を網羅。多言語対応も視野に入れた構造設計。",
    features: [
      "団体概要・ミッション・活動報告",
      "理事・会員紹介",
      "寄付・会員募集フォーム",
      "ニュース・お知らせCMS",
    ],
    priceRange: "15〜20万円",
    image: "/examples/zaidan.png",
    imageAlt: "財団・社団法人のホームページ制作例",
    liveUrl: "https://awaa-site.vercel.app/",
    accent: "from-emerald-50 to-teal-50",
  },
];

function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "10〜20万円のホームページ制作例",
    description:
      "盛岡・岩手で制作した業種別ホームページの作例一覧。10〜20万円から、最短2週間で公開可能。",
    itemListElement: examples.map((ex, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "CreativeWork",
        name: ex.title,
        description: ex.description,
        url: ex.liveUrl,
        image: `https://yukitaguchi.com${ex.image}`,
        genre: ex.industry,
      },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function ExamplesPage() {
  return (
    <>
      <Header />
      <JsonLd />
      <main className="pt-24">
        {/* Hero */}
        <section className="px-8 py-20 md:py-28 bg-gradient-to-br from-surface-lowest via-surface to-surface-low">
          <div className="max-w-7xl mx-auto">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-on-surface-variant hover:text-tertiary transition-colors mb-12"
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              Back to Home
            </Link>
            <p className="text-tertiary font-headline font-bold text-sm tracking-[0.3em] uppercase mb-6">
              Pricing Examples
            </p>
            <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tight leading-[1.1] mb-8">
              10〜20万円で作れる
              <br />
              業種別ホームページ制作例
            </h1>
            <p className="text-lg md:text-xl text-on-surface-variant leading-relaxed max-w-3xl">
              盛岡・岩手で実際に制作した、業種別のホームページ作例をご紹介します。SEO対策・スマホ最適化・構造化データ標準装備で、新規制作・リニューアルともに<strong className="text-on-surface">10〜20万円から、最短2週間</strong>で公開可能です。
            </p>

            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "最低価格", value: "10万円〜" },
                { label: "最短納期", value: "2週間" },
                { label: "対応エリア", value: "盛岡・岩手・全国" },
                { label: "SEO対策", value: "全プラン込み" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-surface-lowest border border-outline-variant/10 p-5"
                >
                  <div className="text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-2">
                    {stat.label}
                  </div>
                  <div className="text-lg md:text-xl font-bold font-headline">
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Examples Grid */}
        <section className="px-8 py-20 md:py-28 bg-surface-lowest">
          <div className="max-w-7xl mx-auto space-y-32">
            {examples.map((ex, i) => (
              <article
                key={ex.slug}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
              >
                <div
                  className={`order-1 ${i % 2 === 1 ? "lg:order-2" : "lg:order-1"} bg-gradient-to-br ${ex.accent} p-1`}
                >
                  <div className="aspect-[16/10] overflow-hidden bg-white">
                    <img
                      src={ex.image}
                      alt={ex.imageAlt}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>
                <div
                  className={`order-2 ${i % 2 === 1 ? "lg:order-1" : "lg:order-2"}`}
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container rounded-full text-[10px] font-bold tracking-widest uppercase mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-tertiary" />
                    {ex.industry}
                  </div>
                  <h2 className="text-3xl md:text-4xl font-headline font-bold tracking-tight mb-3">
                    {ex.title}
                  </h2>
                  <p className="text-tertiary font-medium mb-6">{ex.subtitle}</p>
                  <p className="text-on-surface-variant leading-relaxed mb-8">
                    {ex.description}
                  </p>

                  <div className="mb-8">
                    <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-3">
                      主な構成
                    </p>
                    <ul className="space-y-2">
                      {ex.features.map((f) => (
                        <li key={f} className="flex items-start gap-3 text-sm">
                          <span className="material-symbols-outlined text-tertiary text-base mt-0.5">
                            check_circle
                          </span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap items-center gap-6 mb-8">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                        想定価格
                      </span>
                      <span className="text-2xl font-bold font-headline">
                        {ex.priceRange}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <a
                      href={ex.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-on-surface text-on-primary px-6 py-4 font-bold text-sm tracking-widest uppercase transition-all hover:bg-slate-800 active:scale-95"
                    >
                      公開サイトを見る
                      <span className="material-symbols-outlined text-sm">open_in_new</span>
                    </a>
                    <a
                      href="/#contact"
                      className="inline-flex items-center justify-center gap-2 border border-on-surface px-6 py-4 font-bold text-sm tracking-widest uppercase transition-all hover:bg-surface-low active:scale-95"
                    >
                      この業種で相談する
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Plan Detail */}
        <section className="px-8 py-20 md:py-28 bg-surface">
          <div className="max-w-5xl mx-auto">
            <p className="text-tertiary font-headline font-bold text-sm tracking-[0.3em] uppercase mb-4 text-center">
              What&apos;s Included
            </p>
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-center tracking-tight mb-16">
              10〜20万円プランの中身
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  icon: "design_services",
                  title: "デザイン・構成",
                  items: [
                    "業種に合わせたオリジナルデザイン",
                    "5〜8ページ構成（TOP / サービス / 実績 / 会社概要 / 問い合わせ など）",
                    "スマホ最適化（レスポンシブ）",
                    "問い合わせフォーム標準装備",
                  ],
                },
                {
                  icon: "search",
                  title: "SEO・AEO対策",
                  items: [
                    "メタタグ・OGP最適化",
                    "構造化データ（JSON-LD）実装",
                    "sitemap.xml / robots.txt 自動生成",
                    "Googleビジネスプロフィール連携",
                    "AI検索（Google AI Overview）対応",
                  ],
                },
                {
                  icon: "speed",
                  title: "速度・品質",
                  items: [
                    "Core Web Vitals 最適化",
                    "画像自動最適化",
                    "HTTPS / CDN配信（Vercel）",
                    "アクセシビリティ配慮",
                  ],
                },
                {
                  icon: "support_agent",
                  title: "公開後サポート",
                  items: [
                    "1ヶ月の無料サポート",
                    "操作マニュアル提供",
                    "保守・更新プラン（月額制）も対応",
                    "リニューアル後の旧サイト切替もお任せ",
                  ],
                },
              ].map((block) => (
                <div
                  key={block.title}
                  className="bg-surface-lowest p-8 border border-outline-variant/10"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <span className="material-symbols-outlined text-tertiary text-3xl">
                      {block.icon}
                    </span>
                    <h3 className="text-xl font-bold font-headline">
                      {block.title}
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {block.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-sm text-on-surface-variant"
                      >
                        <span className="material-symbols-outlined text-tertiary text-base mt-0.5">
                          check
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-8 py-20 md:py-28 bg-on-surface text-on-primary">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-headline font-bold tracking-tight mb-6 leading-tight">
              盛岡・岩手で
              <br />
              ホームページを作るなら。
            </h2>
            <p className="text-lg text-white/70 leading-relaxed mb-12 max-w-2xl mx-auto">
              新規制作・リニューアルともに、まずはお気軽にご相談ください。
              業種・規模・ご予算をうかがった上で、最適なプランをご提案します。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/#contact"
                className="inline-flex items-center justify-center gap-3 bg-white text-on-surface px-10 py-5 font-bold tracking-wide transition-all hover:scale-[1.02] active:scale-95"
              >
                無料相談する
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
              <a
                href="/#pricing"
                className="inline-flex items-center justify-center gap-3 border border-white/20 px-10 py-5 font-bold tracking-wide transition-all hover:bg-white/10 active:scale-95"
              >
                料金プランを見る
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
