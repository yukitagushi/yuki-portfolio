import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://yukitaguchi.com"),
  title: {
    default: "田口 侑生 | AIエンジニア & DXコンサルタント - ホームページ制作・業務自動化・アプリ開発",
    template: "%s | 田口 侑生 - AIエンジニア",
  },
  description:
    "AIエンジニア田口侑生のポートフォリオサイト。AIとSEOに特化したホームページ制作で地域のビジネスを支援。岩手県盛岡市拠点。ホームページ制作、業務自動化・DX支援を提供します。",
  keywords: [
    "AIエンジニア",
    "DXコンサルタント",
    "ホームページ制作",
    "業務自動化",
    "アプリ開発",
    "AI開発",
    "DX支援",
    "田口侑生",
    "Yuki Taguchi",
    "岩手",
    "盛岡",
    "Web制作",
    "システム開発",
    "SEO対策",
    "低コスト",
    "短期間納品",
  ],
  authors: [{ name: "田口 侑生", url: "https://yukitaguchi.com" }],
  creator: "田口 侑生",
  publisher: "田口 侑生",
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "https://yukitaguchi.com",
    siteName: "田口 侑生 | AIエンジニア & DXコンサルタント",
    title: "田口 侑生 | AIエンジニア & DXコンサルタント - ホームページ制作・業務自動化・アプリ開発",
    description:
      "AIの力でビジネスの「めんどくさい」を解決。ホームページ制作、業務自動化・DX支援、アプリ・システム開発を低コスト・短期間で提供。",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "田口 侑生 - AIエンジニア & DXコンサルタント",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "田口 侑生 | AIエンジニア & DXコンサルタント",
    description:
      "AIの力でビジネスの「めんどくさい」を解決。ホームページ制作、業務自動化、アプリ開発。",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://yukitaguchi.com",
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
};

function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://yukitaguchi.com/#website",
        url: "https://yukitaguchi.com",
        name: "田口 侑生 | AIエンジニア & DXコンサルタント",
        description:
          "AIの力でビジネスの「めんどくさい」を解決。ホームページ制作、業務自動化・DX支援、アプリ・システム開発。",
        publisher: { "@id": "https://yukitaguchi.com/#person" },
        inLanguage: "ja",
      },
      {
        "@type": "Person",
        "@id": "https://yukitaguchi.com/#person",
        name: "田口 侑生",
        alternateName: "Yuki Taguchi",
        url: "https://yukitaguchi.com",
        jobTitle: "AIエンジニア & DXコンサルタント",
        description:
          "AI導入企業の役員経験を活かし、ホームページ制作・業務自動化・アプリ開発を低コスト・短期間で提供するAIエンジニア。",
        knowsAbout: [
          "AI Engineering",
          "DX Consulting",
          "Web Development",
          "Business Automation",
          "App Development",
          "SEO",
          "No-code Development",
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
        "@type": "ProfessionalService",
        "@id": "https://yukitaguchi.com/#service",
        name: "田口 侑生 - AI開発 & DX支援",
        provider: { "@id": "https://yukitaguchi.com/#person" },
        areaServed: {
          "@type": "Country",
          name: "Japan",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "サービス一覧",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "ホームページ制作・リニューアル",
                description:
                  "SEO対策済み、モバイルファースト設計のホームページを低コスト・短期間で制作。",
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
