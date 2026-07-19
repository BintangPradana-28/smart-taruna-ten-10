"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "Beranda", href: "/" },
  { label: "Kegiatan", href: "/kegiatan" },
  { label: "Berita", href: "/berita" },
  { label: "Galeri", href: "/galeri" },
  { label: "Tentang Kami", href: "/tentang-kami" },
  { label: "Donasi", href: "/donasi" },
];

// WHY this is the one component marked "use client": the mobile menu
// toggle is genuine interactive state that only exists in the
// browser. Every other component on this site defaults to a Server
// Component — this is a deliberate exception, not the starting point.
export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-serif text-lg font-bold text-foreground"
        >
          <span aria-hidden="true" className="h-3 w-3 bg-primary" />
          Smart Taruna Ten
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/masuk"
            className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Masuk
          </Link>
        </div>

        {/* WHY aria-expanded + aria-controls here: a toggle button
           with no state exposed to assistive tech leaves screen-reader
           users guessing whether the menu opened at all. */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-expanded={isMenuOpen}
          aria-controls="menu-mobile-kartar"
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border md:hidden"
        >
          <span className="sr-only">
            {isMenuOpen ? "Tutup menu" : "Buka menu"}
          </span>
          {isMenuOpen ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </div>

      {isMenuOpen ? (
        <ul
          id="menu-mobile-kartar"
          className="flex flex-col gap-1 border-t border-border px-6 py-4 md:hidden"
        >
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="block rounded-lg px-3 py-3 text-base font-medium text-foreground/80 hover:bg-muted hover:text-primary"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/masuk"
              onClick={() => setIsMenuOpen(false)}
              className="mt-2 block rounded-lg bg-primary px-3 py-3 text-center text-base font-semibold text-primary-foreground"
            >
              Masuk
            </Link>
          </li>
        </ul>
      ) : null}
    </header>
  );
}
