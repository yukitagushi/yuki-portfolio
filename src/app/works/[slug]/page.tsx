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
  image: string;
  imageAlt: string;
};

const works: Record<string, WorkData> = {
  "auto-repair-shop": {
    title: "整備工場 ホームページ作成",
    category: "Homepage",
    categoryLabel: "ホームページ制作",
    year: "2025",
    client: "非公開（自動車整備工場）",
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
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCiBFbPblrOjYtbgW7WoOAvkIdaGtsEusffoytb3eO3algp8jYP4V2ddGVneBnob6CRJTjqVOXtS8ZR5XKeFHWPMzhdmHmeI3EISt0GzN1oFI_mlHckfKTLTs-7zWgGiv4RSYC2kMPcIL9Euu4Ovh23TbEICBhSy5J5l-uw9UPPbjNAx3IqrFD8CUXO6cWU_-ipJ2_Ycq9jtGeRhu2Xfxx9kKFBTBg8Z1HxeshLL1_re4VloPLA3qD_ZCc7B09BT7lWKj7fJu_oVgc",
    imageAlt: "整備工場ホームページのデザインプレビュー",
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

  return {
    title: `${work.title} - 制作実績`,
    description: work.description,
    openGraph: {
      title: `${work.title} | 田口 侑生 制作実績`,
      description: work.description,
      images: [{ url: work.image, width: 1200, height: 630, alt: work.imageAlt }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${work.title} | 田口 侑生 制作実績`,
      description: work.description,
      images: [work.image],
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
      url: "https://yukitaguchi.com",
    },
    genre: work.categoryLabel,
    keywords: work.techStack.join(", "),
    image: work.image,
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
        <section className="px-8 pb-20 bg-surface-lowest">
          <div className="max-w-5xl mx-auto">
            <div className="aspect-[16/9] overflow-hidden border border-outline-variant/10 bg-surface">
              <img
                alt={work.imageAlt}
                className="w-full h-full object-cover"
                src={work.image}
              />
            </div>
          </div>
        </section>

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
                <div className="mt-10 pt-8 border-t border-outline-variant/10">
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
