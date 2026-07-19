import Link from "next/link";

interface FooterLink {
  label: string;
  href: string;
}

const FOOTER_LINKS: FooterLink[] = [
  { label: "Kegiatan", href: "/kegiatan" },
  { label: "Berita", href: "/berita" },
  { label: "Galeri", href: "/galeri" },
  { label: "Tentang Kami", href: "/tentang-kami" },
  { label: "Donasi", href: "/donasi" },
];

export function Footer() {
  // WHY computed at render time instead of hardcoded: a hardcoded
  // year is the classic footer bug that goes stale the moment the
  // calendar turns and nobody remembers to touch this file again.
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 sm:grid-cols-3">
        <div>
          <p className="flex items-center gap-2 font-serif text-lg font-bold text-foreground">
            <span aria-hidden="true" className="h-3 w-3 bg-primary" />
            Smart Taruna Ten
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Wadah digital Karang Taruna untuk kegiatan, berita, dan donasi
            yang terbuka bagi siapa saja.
          </p>
        </div>

        <nav aria-label="Tautan footer">
          <p className="text-sm font-semibold text-foreground">Navigasi</p>
          <ul className="mt-4 space-y-2">
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-sm font-semibold text-foreground">Kontak</p>
          {/* WHY a mailto link instead of a form: the footer is
             reference material, not the place to collect input —
             opening the visitor's own email app is the lowest-
             friction option here. */}
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              <a href="mailto:halo@smarttarunaten.id" className="hover:text-primary">
                halo@smarttarunaten.id
              </a>
            </li>
            <li>Balai Warga, Jakarta</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border px-6 py-6">
        <p className="mx-auto max-w-6xl text-xs text-muted-foreground">
          © {currentYear} Smart Taruna Ten. Dikelola swadaya oleh pengurus
          dan anggota.
        </p>
      </div>
    </footer>
  );
}
