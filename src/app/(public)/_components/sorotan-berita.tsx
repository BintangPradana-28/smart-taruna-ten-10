import Link from "next/link";
import {
  ArticleCard,
  type ArticleSummary,
} from "@/modules/news/components/article-card";

interface SorotanBeritaProps {
  articles: ArticleSummary[];
}

export function SorotanBerita({ articles }: SorotanBeritaProps) {
  return (
    <section
      aria-labelledby="sorotan-berita-heading"
      className="px-6 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2
            id="sorotan-berita-heading"
            className="font-serif text-3xl font-bold text-foreground sm:text-4xl"
          >
            Sorotan Berita
          </h2>
          <Link
            href="/berita"
            className="text-sm font-semibold text-primary hover:underline"
          >
            Baca semua berita →
          </Link>
        </div>

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
    </section>
  );
}
