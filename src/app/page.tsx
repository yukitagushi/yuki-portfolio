import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex flex-col justify-end pt-20 px-8 pb-20 overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-black">
            <img
              alt="モダンなオフィスでAIを活用して業務を行うビジネスシーン"
              className="absolute inset-0 w-full h-full object-cover opacity-60"
              src="/hero-bg.png"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-lowest via-transparent to-transparent" />
          </div>
          <div className="max-w-7xl mx-auto w-full space-y-8 relative z-10">
            <span className="inline-block text-tertiary font-headline font-bold text-sm tracking-[0.2em] uppercase bg-white/60 backdrop-blur-sm px-2 py-1">
              AI Engineering &amp; DX Strategy
            </span>
            <h1 className="text-5xl md:text-7xl font-headline font-bold text-white leading-[1.1] tracking-tight">
              AIの力で、ビジネスの
              <br />
              <span className="text-sky-300">&quot;めんどくさい&quot;</span>
              を解決する。
            </h1>
            <p className="text-on-surface-variant text-lg md:text-xl max-w-xl leading-relaxed font-medium bg-white/20 backdrop-blur-[2px] rounded-sm p-2 -ml-2">
              ホームページ作成からアプリ開発、業務自動化まで。AIと最新テクノロジーで、コストを抑え、最短で届けます。
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                className="bg-on-surface text-on-primary px-10 py-5 text-center font-bold tracking-wide transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-on-surface/5 flex items-center justify-center gap-3"
                href="#contact"
              >
                無料相談する
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
              <a
                className="border border-outline-variant/20 bg-white/60 backdrop-blur-sm px-10 py-5 text-center font-bold hover:bg-white/80 transition-colors"
                href="#works"
              >
                制作実績を見る
              </a>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-32 px-8 bg-surface-low">
          <div className="max-w-7xl mx-auto">
            <div className="mb-20">
              <p className="text-tertiary font-headline font-bold text-sm tracking-widest uppercase mb-4">
                Values
              </p>
              <h2 className="text-4xl md:text-5xl font-headline font-bold tracking-tight">
                選ばれる3つの理由
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <article className="bg-surface-lowest p-10 group hover:translate-y-[-8px] transition-all duration-500 border border-outline-variant/10">
                <div className="w-14 h-14 bg-surface rounded-full flex items-center justify-center mb-8 transition-colors group-hover:bg-tertiary/5">
                  <span className="material-symbols-outlined text-tertiary text-3xl">payments</span>
                </div>
                <h3 className="text-xl font-bold mb-4 font-headline">圧倒的なコスト削減</h3>
                <p className="text-on-surface-variant leading-relaxed text-sm">
                  AI活用により、従来の制作費用から大幅にコストを削減。中小企業でも手の届く価格でプロ品質を提供します。
                </p>
              </article>
              <article className="bg-surface-lowest p-10 group hover:translate-y-[-8px] transition-all duration-500 border border-outline-variant/10">
                <div className="w-14 h-14 bg-surface rounded-full flex items-center justify-center mb-8 transition-colors group-hover:bg-tertiary/5">
                  <span className="material-symbols-outlined text-tertiary text-3xl">speed</span>
                </div>
                <h3 className="text-xl font-bold mb-4 font-headline">最短納期で納品</h3>
                <p className="text-on-surface-variant leading-relaxed text-sm">
                  AIによる開発効率化で、ホームページなら最短数日、アプリも驚きのスピードで納品可能です。
                </p>
              </article>
              <article className="bg-surface-lowest p-10 group hover:translate-y-[-8px] transition-all duration-500 border border-outline-variant/10">
                <div className="w-14 h-14 bg-surface rounded-full flex items-center justify-center mb-8 transition-colors group-hover:bg-tertiary/5">
                  <span className="material-symbols-outlined text-tertiary text-3xl">neurology</span>
                </div>
                <h3 className="text-xl font-bold mb-4 font-headline">AI導入の現場経験</h3>
                <p className="text-on-surface-variant leading-relaxed text-sm">
                  AI導入企業の役員として培った実務経験を活かし、本当に使えるソリューションを提案します。
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* Service Section */}
        <section className="py-32 px-8 bg-surface-lowest" id="services">
          <div className="max-w-7xl mx-auto">
            <div className="mb-24 text-center">
              <h2 className="text-4xl md:text-5xl font-headline font-bold mb-4 tracking-tight">Service</h2>
              <p className="text-tertiary font-headline font-medium tracking-[0.3em] uppercase">提供サービス</p>
            </div>

            {/* Service 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
              <div className="order-2 lg:order-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container rounded-full text-[10px] font-bold tracking-widest uppercase mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-tertiary" /> Web Design
                </div>
                <h3 className="text-3xl font-headline font-bold mb-6">ホームページ制作・リニューアル</h3>
                <p className="text-on-surface-variant leading-relaxed mb-8">
                  美容室、クリニック、飲食店など、地域に根ざしたビジネスの強みを最大化します。モバイルファースト設計とSEO対策を標準装備し、低コスト・短期間での公開を実現。
                </p>
                <ul className="space-y-4 text-sm font-medium">
                  <li className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-tertiary text-lg">check_circle</span>
                    集客に強いSEO設計
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-tertiary text-lg">check_circle</span>
                    スマホ最適化（レスポンシブ）
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-tertiary text-lg">check_circle</span>
                    運用コストを抑えたCMS導入
                  </li>
                </ul>
              </div>
              <div className="order-1 lg:order-2 bg-surface-low p-1 rounded-xl">
                <img alt="ホームページ制作サービスのプレビュー - モダンなWebデザイン" className="rounded-lg shadow-2xl" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3U5QR1G9NbdrAL-FIpYR2ew_yePyq4P9G-ZaA3_sCfHR8k0T8SOPy8hvzafy1i2BKcVo0Dql6BqGogf643kQVYEKGKsTp0lhCFGaqgBDowOcEqP_1HqwRNUJLUk3yakuixsG0SBBiTOy87o0UpXEwTUC3VsWTwIpkkKbA0sDFraC_EXBGqfQNtI9MRaTgYv0rZ2qs1lpSlaWiJ8OqYTI8_8GptDz2W1y5lAgtjE7WxMWE9JkC3OjlvRjHeEN3qb7M0D1ofsZ2YE8" />
              </div>
            </div>

            {/* Service 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
              <div className="bg-surface-low p-1 rounded-xl">
                <img alt="業務自動化ダッシュボード - DX支援サービス" className="rounded-lg shadow-2xl" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCnUJgIPwzQyDsl2yDWr7mcTrShvv48OxErZ_MORMRvRThr47xyRoawYgPc-axPunodzEAfDafsNNXKIDP6fsmLWh9Z2hV4Sj_M1YZAeNH3slqTsUgeDZjqN4URU0OIk8bTov-x5_fPvyGQuHwkJD3fTA0Za_L9YUqdJ1dmWtxr79NhuG_VhbSFf0c2Ta_-E35YrE4daon03OaVXs11i3F4HzOoUtD4ckgTXgsXdw3B8H8GTuscEAbjTlYdU5yXLrnCzdiuFU_LdMw" />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container rounded-full text-[10px] font-bold tracking-widest uppercase mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-tertiary" /> DX &amp; Automation
                </div>
                <h3 className="text-3xl font-headline font-bold mb-6">業務自動化・DX支援</h3>
                <p className="text-on-surface-variant leading-relaxed mb-8">
                  請求書発行、メール返信、予約管理など、日々のルーチンワークをAIで自動化。人的ミスを減らし、本来集中すべき業務に時間を使える環境を構築します。
                </p>
                <ul className="space-y-4 text-sm font-medium">
                  <li className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-tertiary text-lg">check_circle</span>
                    AIによるメール・問い合わせ自動返信
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-tertiary text-lg">check_circle</span>
                    各種SaaS（Slack/LINE/Notion等）連携
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-tertiary text-lg">check_circle</span>
                    ペーパーレス・請求管理自動化
                  </li>
                </ul>
              </div>
            </div>

            {/* Service 3 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container rounded-full text-[10px] font-bold tracking-widest uppercase mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-tertiary" /> Custom Dev
                </div>
                <h3 className="text-3xl font-headline font-bold mb-6">アプリ・システム開発</h3>
                <p className="text-on-surface-variant leading-relaxed mb-8">
                  在庫管理、シフト管理、顧客管理など、既存ツールでは解決できない課題をオーダーメイドで開発。No-codeとAIを組み合わせることで、従来の数分の一のコストで提供可能です。
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-surface p-4 border border-outline-variant/10">
                    <span className="block text-xs font-bold text-slate-400 mb-2 uppercase">Tech</span>
                    <span className="text-sm font-medium">No-code x AI Integration</span>
                  </div>
                  <div className="bg-surface p-4 border border-outline-variant/10">
                    <span className="block text-xs font-bold text-slate-400 mb-2 uppercase">Lead Time</span>
                    <span className="text-sm font-medium">Min. 2 Weeks</span>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2 bg-surface-low p-1 rounded-xl">
                <img alt="システム開発のコード画面 - アプリ・システム開発サービス" className="rounded-lg shadow-2xl" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0qxKhq1ls3nHOkuhmUxDzfAe8XcAfmMDxxtQPjmP7qobLhrsNACqqf4c63oZD3I6QEQt6VK2n6yHaVUPgwTwQXtuB4s86-oTJc0DLz54Mq3-IDPKfuMFjdp6n8gVjFoEnLxwriNxRtxOY4V4u3xW-3rAxbhvR-U0oqzqK22W_8rLwzO3MvD2XkBCHpmH-bns5hm70Ay5fVBttxDmWwnEGvSqPHehP364Ix1NfiNd9QJDiuW3j6zjXXw-eL4fBVCUUNsJec7ytOLo" />
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-32 px-8 bg-surface" id="pricing">
          <div className="max-w-7xl mx-auto">
            <div className="mb-20 text-center">
              <h2 className="text-4xl md:text-5xl font-headline font-bold mb-4 tracking-tight">Pricing Plans</h2>
              <p className="text-tertiary font-headline font-medium tracking-[0.3em] uppercase">料金プラン</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
              {/* Starter Plan */}
              <div className="bg-surface-lowest p-10 flex flex-col border border-outline-variant/10">
                <div className="mb-8">
                  <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-2 block">Entry Level</span>
                  <h3 className="text-2xl font-bold font-headline mb-4">Starter Plan</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold font-headline">30</span>
                    <span className="text-sm font-bold">万円〜</span>
                  </div>
                </div>
                <div className="mb-10 flex-grow">
                  <p className="text-sm text-on-surface-variant mb-6 font-medium">個人事業主や店舗の方向け。まずはWebでの顔を整えたい方に。</p>
                  <ul className="space-y-4 text-sm">
                    <li className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-tertiary text-lg">check</span>
                      LP・ホームページ制作
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-tertiary text-lg">check</span>
                      スマホ・SEO最適化
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-tertiary text-lg">check</span>
                      納期：最短2週間
                    </li>
                  </ul>
                </div>
                <a href="#contact" className="w-full py-4 border border-on-surface text-center font-bold text-sm hover:bg-surface-low transition-colors uppercase tracking-widest block">
                  Get Started
                </a>
              </div>

              {/* Standard Plan (Recommended) */}
              <div className="bg-on-surface p-10 flex flex-col border border-on-surface relative lg:scale-105 shadow-2xl shadow-on-surface/20">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-tertiary text-white px-4 py-1 text-[10px] font-bold tracking-widest uppercase">
                  Most Recommended
                </div>
                <div className="mb-8">
                  <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-2 block">Best Value</span>
                  <h3 className="text-2xl font-bold font-headline mb-4 text-white">Standard Plan</h3>
                  <div className="flex items-baseline gap-1 text-white">
                    <span className="text-3xl font-bold font-headline">50</span>
                    <span className="text-sm font-bold">万円〜</span>
                  </div>
                </div>
                <div className="mb-10 flex-grow text-white/80">
                  <p className="text-sm mb-6 font-medium text-white/90">中小企業のDX化向け。AIを活用して業務の自動化も並行して進めます。</p>
                  <ul className="space-y-4 text-sm">
                    <li className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-tertiary text-lg">check</span>
                      高機能サイト + 業務自動化
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-tertiary text-lg">check</span>
                      AIチャットボット導入
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-tertiary text-lg">check</span>
                      納期：最短1ヶ月
                    </li>
                  </ul>
                </div>
                <a href="#contact" className="w-full py-4 bg-white text-on-surface text-center font-bold text-sm hover:bg-slate-100 transition-colors uppercase tracking-widest block">
                  Select Plan
                </a>
              </div>

              {/* Growth Plan */}
              <div className="bg-surface-lowest p-10 flex flex-col border border-outline-variant/10">
                <div className="mb-8">
                  <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-2 block">Scalable Systems</span>
                  <h3 className="text-2xl font-bold font-headline mb-4">Growth Plan</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold font-headline">80</span>
                    <span className="text-sm font-bold">万円〜</span>
                  </div>
                </div>
                <div className="mb-10 flex-grow">
                  <p className="text-sm text-on-surface-variant mb-6 font-medium">独自のシステム開発が必要な方向け。AIを中核に据えた開発を行います。</p>
                  <ul className="space-y-4 text-sm">
                    <li className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-tertiary text-lg">check</span>
                      フルオーダーシステム開発
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-tertiary text-lg">check</span>
                      既存ツールとのAPI連携
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-tertiary text-lg">check</span>
                      納期：2ヶ月〜
                    </li>
                  </ul>
                </div>
                <a href="#contact" className="w-full py-4 border border-on-surface text-center font-bold text-sm hover:bg-surface-low transition-colors uppercase tracking-widest block">
                  Contact Us
                </a>
              </div>
            </div>

            {/* Footer: Common Strengths + Why AI */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 pt-16 border-t border-outline-variant/20">
              <div>
                <h4 className="text-xs font-bold tracking-widest uppercase text-tertiary mb-6">Common Strengths</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                  <div className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-tertiary text-base mt-0.5">done_all</span>
                    <span className="text-sm font-medium">全プラン レスポンシブ対応</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-tertiary text-base mt-0.5">done_all</span>
                    <span className="text-sm font-medium">納品後の1ヶ月無料サポート</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-tertiary text-base mt-0.5">done_all</span>
                    <span className="text-sm font-medium">SEO基本設定・高速化</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-tertiary text-base mt-0.5">done_all</span>
                    <span className="text-sm font-medium">操作マニュアルの提供</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-xs font-bold tracking-widest uppercase text-tertiary mb-6">Why AI?</h4>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  AIを活用することで、従来の開発フローで発生していた「手作業によるコーディング時間」や「定型的な設計作業」を大幅に圧縮できます。その結果、市場価格よりも低コストで、かつスピーディーな納品が可能になりました。浮いたコストは、デザインの質やビジネスの戦略立案に充てることが可能です。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Works Section */}
        <section className="py-32 px-8 bg-surface-lowest" id="works">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-headline font-bold mb-4 tracking-tight">Works</h2>
                <p className="text-tertiary font-headline font-medium tracking-[0.3em] uppercase">制作実績</p>
              </div>
              <div className="flex gap-4">
                <span className="text-xs font-headline font-bold tracking-widest uppercase border-b-2 border-tertiary pb-1">All Projects</span>
                <span className="text-xs font-headline font-bold tracking-widest uppercase text-slate-400 hover:text-on-surface cursor-pointer pb-1 transition-colors">Web App</span>
                <span className="text-xs font-headline font-bold tracking-widest uppercase text-slate-400 hover:text-on-surface cursor-pointer pb-1 transition-colors">DX Support</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
              {/* Featured Work 1 - Auto Repair Shop */}
              <Link href="/works/auto-repair-shop" className="group cursor-pointer block">
                <div className="aspect-[16/10] overflow-hidden mb-6 bg-surface border border-outline-variant/10">
                  <img
                    alt="整備工場ホームページ制作実績"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    src="/rig-techs-screenshot.png"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-bold tracking-widest text-tertiary uppercase mb-2 block">Homepage</span>
                  <h3 className="text-2xl font-bold font-headline mb-4">整備工場 ホームページ作成</h3>
                  <span className="inline-flex items-center gap-2 text-xs font-bold group-hover:gap-4 transition-all">
                    Read Case Study <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </span>
                </div>
              </Link>

              {/* Featured Work 2 */}
              <Link href="/works/order-management" className="group cursor-pointer block">
                <div className="aspect-[16/10] overflow-hidden mb-6 bg-surface border border-outline-variant/10">
                  <img
                    alt="受発注管理システムの画面 - システム開発実績"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvxoPVD2HwbU_t_CO77bJziSaCjIYNr-_2CXPeUKDsLuOhQSws2C6ald-9pYgaEUJJivK-_ae9oO4lKTiaX_ZeY-wbFVVwhrD508o7mciuS_e52-d7wOmhRfSOtMrRE3ZouCtbhwETAAXcnj6o8_D2aNM61CFYUkMd5SpU5DzJAPTSnx9CiBi0qWK_Z_UvQhTqG4jweUNIddY_h4iVhP_5dZ3cPFpP_s3Wt1NvAJOWZIgzADLCc5XhozrJx-HZvBc51QbS-353EI4"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-bold tracking-widest text-tertiary uppercase mb-2 block">System Development</span>
                  <h3 className="text-2xl font-bold font-headline mb-4">受発注管理システム</h3>
                  <span className="inline-flex items-center gap-2 text-xs font-bold group-hover:gap-4 transition-all">
                    Read Case Study <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </span>
                </div>
              </Link>
            </div>

            {/* Projects List Table */}
            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-outline-variant/20">
                    <th className="text-left py-6 px-4 text-[10px] font-bold tracking-widest text-slate-400 uppercase">Project Title</th>
                    <th className="text-left py-6 px-4 text-[10px] font-bold tracking-widest text-slate-400 uppercase">Category</th>
                    <th className="text-left py-6 px-4 text-[10px] font-bold tracking-widest text-slate-400 uppercase">Year</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  <tr className="group hover:bg-surface-lowest transition-colors">
                    <td className="py-6 px-4 font-bold">整備工場 ホームページ作成</td>
                    <td className="py-6 px-4 text-sm text-on-surface-variant">Homepage</td>
                    <td className="py-6 px-4 text-sm text-on-surface-variant font-headline">2025</td>
                  </tr>
                  <tr className="group hover:bg-surface-lowest transition-colors">
                    <td className="py-6 px-4 font-bold">案件管理システム</td>
                    <td className="py-6 px-4 text-sm text-on-surface-variant">System Dev</td>
                    <td className="py-6 px-4 text-sm text-on-surface-variant font-headline">2024</td>
                  </tr>
                  <tr className="group hover:bg-surface-lowest transition-colors">
                    <td className="py-6 px-4 font-bold">会計管理システム</td>
                    <td className="py-6 px-4 text-sm text-on-surface-variant">System Dev</td>
                    <td className="py-6 px-4 text-sm text-on-surface-variant font-headline">2023</td>
                  </tr>
                  <tr className="group hover:bg-surface-lowest transition-colors">
                    <td className="py-6 px-4 font-bold">社内システムのデジタル化</td>
                    <td className="py-6 px-4 text-sm text-on-surface-variant">DX Support</td>
                    <td className="py-6 px-4 text-sm text-on-surface-variant font-headline">2023</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-32 px-8 bg-surface-lowest" id="contact">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
            <div>
              <h2 className="text-4xl md:text-5xl font-headline font-bold mb-8 tracking-tight">
                お気軽にご相談ください！
              </h2>
              <p className="text-xl text-on-surface-variant leading-relaxed mb-12">
                あなたのビジョンを一緒に実現させましょう。課題のヒアリングから最適なテクノロジーの選定まで、丁寧に伴走いたします。
              </p>
              <div className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-surface-low rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-tertiary">mail</span>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Email</div>
                    <div className="text-lg font-headline font-bold">yuu338@taguchi0308.com</div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-surface-low rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-tertiary">location_on</span>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Base</div>
                    <div className="text-lg font-headline font-bold">Tokyo, Japan</div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <form action="https://formsubmit.co/yuu338@taguchi0308.com" method="POST" className="space-y-8">
                <input type="hidden" name="_subject" value="【ポートフォリオ】新しいお問い合わせ" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_next" value="https://portfolio-lm2wky4g7-yuki-taguchis-projects.vercel.app/#contact" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Name</label>
                    <input name="name" required className="w-full bg-transparent border-0 border-b border-outline-variant/20 px-0 py-3 focus:ring-0 focus:border-tertiary transition-colors placeholder:text-slate-300 outline-none" placeholder="山田 太郎" type="text" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Email</label>
                    <input name="email" required className="w-full bg-transparent border-0 border-b border-outline-variant/20 px-0 py-3 focus:ring-0 focus:border-tertiary transition-colors placeholder:text-slate-300 outline-none" placeholder="example@mail.com" type="email" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Company</label>
                  <input name="company" className="w-full bg-transparent border-0 border-b border-outline-variant/20 px-0 py-3 focus:ring-0 focus:border-tertiary transition-colors placeholder:text-slate-300 outline-none" placeholder="株式会社〇〇" type="text" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Investment Range</label>
                  <select name="budget" className="w-full bg-transparent border-0 border-b border-outline-variant/20 px-0 py-3 focus:ring-0 focus:border-tertiary transition-colors outline-none">
                    <option>予算感を選択してください</option>
                    <option>~ 50万円</option>
                    <option>50万円 ~ 150万円</option>
                    <option>150万円 ~ 300万円</option>
                    <option>300万円 ~</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Project Description</label>
                  <textarea name="message" required className="w-full bg-transparent border-0 border-b border-outline-variant/20 px-0 py-3 focus:ring-0 focus:border-tertiary transition-colors placeholder:text-slate-300 resize-none outline-none" placeholder="ご相談内容をご記入ください" rows={4} />
                </div>
                <button className="w-full bg-on-surface text-on-primary py-5 font-bold tracking-widest uppercase transition-all hover:bg-slate-800 active:scale-95 shadow-lg shadow-on-surface/10" type="submit">
                  送信する
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
