import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center px-8 bg-surface-lowest pt-20">
        <div className="text-center">
          <h1 className="text-8xl font-headline font-bold text-on-surface mb-4">404</h1>
          <p className="text-xl text-on-surface-variant mb-8">
            ページが見つかりませんでした
          </p>
          <Link
            href="/"
            className="inline-block bg-on-surface text-on-primary px-8 py-4 font-bold tracking-wide transition-all hover:scale-[1.02] active:scale-95"
          >
            トップページに戻る
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
