import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArticleCard } from "@/modules/news/components/article-card";
import {
  CATEGORIES,
  getArticlesByCategory,
  getCategoryBySlug,
} from "@/modules/news/data/placeholder-articles";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return { title: "Kategori Tidak Ditemukan — Smart Taruna Ten" };
  }

  return {
    title: `Berita ${category.name} — Smart Taruna Ten`,
    description: `Kumpulan berita dengan kategori ${category.name}.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const articles = getArticlesByCategory(slug);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <Link
        href="/berita"
        className="text-sm font-semibold text-primary hover:underline"
      >
        ← Semua berita
      </Link>

      <header className="mt-4">
        <h1 className="font-serif text-4xl font-bold text-foreground sm:text-5xl">
          {category.name}
        </h1>
      </header>

      <nav
        aria-label="Filter kategori berita"
        className="mt-8 flex flex-wrap gap-2"
      >
        <Link
          href="/berita"
          className="rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary"
        >
          Semua
        </Link>
        {CATEGORIES.map((cat) =>
          cat.slug === slug ? (
            <span
              key={cat.slug}
              className="rounded-full border border-primary bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
            >
              {cat.name}
            </span>
          ) : (
            <Link
              key={cat.slug}
              href={`/berita/kategori/${cat.slug}`}
              className="rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary"
            >
              {cat.name}
            </Link>
          ),
        )}
      </nav>

      {articles.length === 0 ? (
        <p className="mt-10 rounded-lg border border-dashed border-border p-8 text-center text-muted-foreground">
          Belum ada berita di kategori ini.
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
