import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200/50">
      <div className="w-full py-12 px-8 flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto space-y-4 md:space-y-0">
        <Link
          href="/"
          className="text-lg font-bold text-slate-900 font-headline"
        >
          Yuki Taguchi
        </Link>
        <div className="flex space-x-8 font-body text-xs tracking-widest uppercase font-medium">
          <a
            className="text-slate-500 hover:text-blue-700 transition-colors"
            href="/#services"
          >
            Services
          </a>
          <a
            className="text-slate-500 hover:text-blue-700 transition-colors"
            href="/#works"
          >
            Works
          </a>
          <a
            className="text-slate-500 hover:text-blue-700 transition-colors"
            href="/#contact"
          >
            Contact
          </a>
        </div>
        <div className="text-slate-500 font-body text-xs tracking-widest uppercase">
          &copy; {new Date().getFullYear()} Yuki Taguchi. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
