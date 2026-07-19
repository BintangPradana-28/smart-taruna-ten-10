import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ImageOff } from "lucide-react";
import {
  ARTICLES,
  getArticleBySlug,
} from "@/modules/news/data/placeholder-articles";
import { formatArticleDate } from "@/modules/news/components/article-card";

interface ArticleDetailPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: ArticleDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return { title: "Berita Tidak Ditemukan — Smart Taruna Ten" };
  }

  return {
    title: `${article.title} — Smart Taruna Ten`,
    description: article.excerpt,
  };
}

export default async function ArticleDetailPage({
  params,
}: ArticleDetailPageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
      <Link
        href="/berita"
        className="text-sm font-semibold text-primary hover:underline"
      >
        ← Kembali ke semua berita
      </Link>

      <Link
        href={`/berita/kategori/${article.category.slug}`}
        className="mt-6 inline-block rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground hover:opacity-80"
      >
        {article.category.name}
      </Link>

      <h1 className="mt-4 font-serif text-3xl font-bold text-foreground sm:text-4xl">
        {article.title}
      </h1>

      <p className="mt-3 text-sm text-muted-foreground">
        {article.authorName} · {formatArticleDate(article.publishedAt)}
      </p>

      <div className="mt-8 flex aspect-video items-center justify-center overflow-hidden rounded-lg bg-muted text-muted-foreground">
        {article.coverUrl ? (
          // eslint-disable-next-line @next/next/no-img-element -- see components/shared/avatar.tsx
          <img
            src={article.coverUrl}
            alt={article.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <ImageOff className="h-10 w-10" aria-hidden="true" />
        )}
      </div>

      <div className="mt-8 space-y-4">
        {article.content.map((paragraph, index) => (
          <p
            key={index}
            className="text-lg leading-relaxed text-foreground"
          >
            {paragraph}
          </p>
        ))}
      </div>
    </article>
  );
}
