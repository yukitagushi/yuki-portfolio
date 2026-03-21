"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/20">
      <nav className="flex justify-between items-center w-full px-8 py-4 max-w-7xl mx-auto">
        <Link
          href="/"
          className="text-xl font-bold tracking-tighter text-slate-900 font-headline"
        >
          Yuki Taguchi
        </Link>
        <div className="hidden md:flex items-center space-x-10">
          <div className="flex space-x-8 font-headline tracking-tight text-sm font-medium">
            <a
              className="text-slate-600 hover:text-blue-700 transition-colors duration-300"
              href="/#services"
            >
              Services
            </a>
            <a
              className="text-slate-600 hover:text-blue-700 transition-colors duration-300"
              href="/#pricing"
            >
              Pricing
            </a>
            <a
              className="text-slate-600 hover:text-blue-700 transition-colors duration-300"
              href="/#works"
            >
              Works
            </a>
            <a
              className="text-slate-600 hover:text-blue-700 transition-colors duration-300"
              href="/#contact"
            >
              Contact
            </a>
          </div>
          <a
            className="bg-on-surface text-on-primary px-6 py-2.5 text-sm font-medium transition-opacity active:opacity-70"
            href="/#contact"
          >
            無料相談する
          </a>
        </div>
        {/* Mobile Menu */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="メニューを開く"
        >
          <span className="material-symbols-outlined">
            {mobileOpen ? "close" : "menu"}
          </span>
        </button>
      </nav>
      {mobileOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-slate-200/20 px-8 py-6 space-y-4">
          <a
            href="/#services"
            className="block font-headline text-sm font-medium text-slate-600"
            onClick={() => setMobileOpen(false)}
          >
            Services
          </a>
          <a
            href="/#pricing"
            className="block font-headline text-sm font-medium text-slate-600"
            onClick={() => setMobileOpen(false)}
          >
            Pricing
          </a>
          <a
            href="/#works"
            className="block font-headline text-sm font-medium text-slate-600"
            onClick={() => setMobileOpen(false)}
          >
            Works
          </a>
          <a
            href="/#contact"
            className="block font-headline text-sm font-medium text-slate-600"
            onClick={() => setMobileOpen(false)}
          >
            Contact
          </a>
          <a
            href="/#contact"
            className="block bg-on-surface text-on-primary px-6 py-2.5 text-sm font-medium text-center"
            onClick={() => setMobileOpen(false)}
          >
            無料相談する
          </a>
        </div>
      )}
    </header>
  );
}
