import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://taguchi338.com"),
  title: {
    default:
      "岩手のホームページ制作・リニューアル｜10〜20万円から | 田口侑生 - AIエンジニア",
    template: "%s | 岩手のホームページ制作 田口侑生",
  },
  description:
    "岩手拠点のAIエンジニアによるホームページ制作。SEO対策・スマホ最適化込みで10〜20万円から、最短2週間で公開。リニューアル・採用サイト・LPもAIで低コスト短納期。地域の中小企業・個人事業主を支援します。",
  keywords: [
    "岩手 ホームページ制作",
    "岩手 ホームページ作成",
    "岩手 Web制作",
    "岩手 ホームページ リニューアル",
    "ホームページ制作 10万円",
    "ホームページ制作 20万円",
    "岩手 SEO対策",
    "岩手 LP制作",
    "盛岡 ホームページ制作",
    "AIエンジニア",
    "DXコンサルタント",
    "業務自動化",
    "アプリ開発",
    "田口侑生",
    "Yuki Taguchi",
  ],
  authors: [{ name: "田口 侑生", url: "https://taguchi338.com" }],
  creator: "田口 侑生",
  publisher: "田口 侑生",
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "https://taguchi338.com",
    siteName: "田口 侑生 | 岩手のホームページ制作",
    title:
      "岩手のホームページ制作・リニューアル｜10〜20万円から | 田口侑生",
    description:
      "岩手拠点。SEO対策込みのホームページ制作が10〜20万円から、最短2週間で公開。AI活用で低コスト・短納期。リニューアルも対応。",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "岩手のホームページ制作 - 田口 侑生",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "岩手のホームページ制作・リニューアル｜10〜20万円から",
    description:
      "岩手拠点。SEO対策込みで10〜20万円から、最短2週間で公開。AI活用で低コスト・短納期。",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://taguchi338.com",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // google: "ここにGoogle Search ConsoleのHTML確認コードを貼り付け",
  },
};

function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://taguchi338.com/#website",
        url: "https://taguchi338.com",
        name: "田口 侑生 | 岩手のホームページ制作",
        description:
          "岩手拠点。SEO対策込みのホームページ制作が10〜20万円から、最短2週間で公開。AI活用で低コスト・短納期。",
        publisher: { "@id": "https://taguchi338.com/#person" },
        inLanguage: "ja",
        potentialAction: {
          "@type": "SearchAction",
          target: "https://taguchi338.com/?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Person",
        "@id": "https://taguchi338.com/#person",
        name: "田口 侑生",
        alternateName: "Yuki Taguchi",
        url: "https://taguchi338.com",
        jobTitle: "AIエンジニア & DXコンサルタント",
        description:
          "岩手を拠点に、AIを活用したホームページ制作・業務自動化・アプリ開発を低コスト・短期間で提供。",
        knowsAbout: [
          "ホームページ制作",
          "Webサイト リニューアル",
          "SEO対策",
          "AI開発",
          "DX支援",
          "業務自動化",
          "アプリ開発",
        ],
        address: {
          "@type": "PostalAddress",
          addressLocality: "盛岡市",
          addressRegion: "岩手県",
          addressCountry: "JP",
        },
        sameAs: [],
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://taguchi338.com/#localbusiness",
        name: "田口 侑生 ホームページ制作・AI開発",
        image: "https://taguchi338.com/og-image.png",
        url: "https://taguchi338.com",
        telephone: "",
        priceRange: "¥¥",
        description:
          "岩手のホームページ制作・リニューアル。SEO対策込み10〜20万円から、最短2週間で公開。AI活用で低コスト・短納期。",
        address: {
          "@type": "PostalAddress",
          addressLocality: "盛岡市",
          addressRegion: "岩手県",
          addressCountry: "JP",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 39.7036,
          longitude: 141.1527,
        },
        areaServed: [
          { "@type": "State", name: "岩手県" },
          { "@type": "Country", name: "日本" },
        ],
        founder: { "@id": "https://taguchi338.com/#person" },
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://taguchi338.com/#service",
        name: "岩手のホームページ制作 - 田口 侑生",
        provider: { "@id": "https://taguchi338.com/#person" },
        areaServed: [
          { "@type": "State", name: "岩手県" },
          { "@type": "Country", name: "日本" },
        ],
        priceRange: "¥100,000 〜 ¥200,000",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "サービス一覧",
          itemListElement: [
            {
              "@type": "Offer",
              priceCurrency: "JPY",
              price: "100000",
              eligibleQuantity: { "@type": "QuantitativeValue", minValue: 100000, maxValue: 200000, unitText: "JPY" },
              itemOffered: {
                "@type": "Service",
                name: "ホームページ制作・リニューアル（10〜20万円プラン）",
                description:
                  "岩手の中小企業・個人事業主向け。SEO対策・スマホ最適化・構造化データ標準装備で10〜20万円から、最短2週間で公開。",
                areaServed: "岩手県",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "業務自動化・DX支援",
                description:
                  "AIによるメール自動返信、SaaS連携、ペーパーレス化など業務効率化を支援。",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "アプリ・システム開発",
                description:
                  "No-codeとAIを組み合わせたオーダーメイドのシステム・アプリ開発。",
              },
            },
          ],
        },
      },
      {
        "@type": "FAQPage",
        "@id": "https://taguchi338.com/#faq",
        mainEntity: [
          {
            "@type": "Question",
            name: "岩手でホームページ制作を依頼するといくらかかりますか？",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "当方では、SEO対策・スマホ最適化込みのホームページを10〜20万円から制作しています。ページ数や機能により変動しますが、簡易LPなら10万円、コーポレートサイトなら20万円が目安です。",
            },
          },
          {
            "@type": "Question",
            name: "ホームページのリニューアルもお願いできますか？",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "はい、リニューアル案件も多数対応しています。既存サイトの分析から、デザイン刷新、SEO再設計、CMS導入まで一貫して対応可能です。岩手県内のお客様を中心に承っています。",
            },
          },
          {
            "@type": "Question",
            name: "納期はどのくらいですか？",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "AI活用により、シンプルなLPなら最短2週間、コーポレートサイトでも最短1ヶ月で公開可能です。",
            },
          },
          {
            "@type": "Question",
            name: "SEO対策はどこまで含まれていますか？",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "構造化データ（JSON-LD）、メタタグ最適化、サイトマップ自動生成、Core Web Vitals最適化、ローカルSEO（Googleビジネスプロフィール連携）まで全プラン標準装備です。AI検索（Google AI Overview）への対応も行います。",
            },
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="scroll-smooth">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Manrope:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <JsonLd />
      </head>
      <body>{children}</body>
    </html>
  );
}
