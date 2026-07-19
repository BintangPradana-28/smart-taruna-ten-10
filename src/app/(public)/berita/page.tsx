import type { Metadata } from "next";
import Link from "next/link";
import { ArticleCard } from "@/modules/news/components/article-card";
import {
  CATEGORIES,
  getArticles,
} from "@/modules/news/data/placeholder-articles";

export const metadata: Metadata = {
  title: "Berita & Artikel — Smart Taruna Ten",
  description:
    "Pengumuman resmi, laporan transparansi, dan liputan kegiatan Karang Taruna.",
};

export default function BeritaPage() {
  const articles = getArticles();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <header>
        <h1 className="font-serif text-4xl font-bold text-foreground sm:text-5xl">
          Berita & Artikel
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Pengumuman resmi, laporan transparansi, dan liputan kegiatan —
          supaya semua warga tahu apa yang sedang terjadi.
        </p>
      </header>

      <nav
        aria-label="Filter kategori berita"
        className="mt-8 flex flex-wrap gap-2"
      >
        <span className="rounded-full border border-primary bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
          Semua
        </span>
        {CATEGORIES.map((category) => (
          <Link
            key={category.slug}
            href={`/berita/kategori/${category.slug}`}
            className="rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary"
          >
            {category.name}
          </Link>
        ))}
      </nav>

      {articles.length === 0 ? (
        <p className="mt-10 rounded-lg border border-dashed border-border p-8 text-center text-muted-foreground">
          Belum ada berita yang diterbitkan. Tulisan pertama akan tampil di
          sini begitu pengurus mempublikasikannya.
        </p>
      ) : (
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <li key={article.slug}>
              <ArticleCard article={article} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
