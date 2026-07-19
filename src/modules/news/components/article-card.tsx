import Link from "next/link";
import { ImageOff } from "lucide-react";

export interface CategorySummary {
  slug: string;
  name: string;
}

export interface ArticleSummary {
  slug: string;
  title: string;
  excerpt: string;
  coverUrl: string | null;
  category: CategorySummary;
  publishedAt: Date;
}

export function formatArticleDate(date: Date): string {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

interface ArticleCardProps {
  article: ArticleSummary;
}

// WHY the category badge here is a <span>, not a nested <Link>: the
// whole card is already a link to the article. An <a> inside another
// <a> is invalid HTML and behaves unpredictably across browsers —
// category filtering gets its own dedicated links on the listing page
// instead of living inside every card.
export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link
      href={`/berita/${article.slug}`}
      className="block h-full overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-primary"
    >
      <div className="flex aspect-video items-center justify-center overflow-hidden bg-muted text-muted-foreground">
        {article.coverUrl ? (
          // eslint-disable-next-line @next/next/no-img-element -- see components/shared/avatar.tsx
          <img
            src={article.coverUrl}
            alt={article.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <ImageOff className="h-8 w-8" aria-hidden="true" />
        )}
      </div>
      <div className="p-6">
        <span className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
          {article.category.name}
        </span>
        <h3 className="mt-3 text-lg font-semibold text-foreground">
          {article.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
          {article.excerpt}
        </p>
        <p className="mt-3 text-xs text-muted-foreground">
          {formatArticleDate(article.publishedAt)}
        </p>
      </div>
    </Link>
  );
}
