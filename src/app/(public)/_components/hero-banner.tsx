import Link from "next/link";

interface HeroAction {
  label: string;
  href: string;
}

interface HeroBannerProps {
  statusTicker: string;
  headline: string;
  emphasizedPhrase: string;
  subheadline: string;
  primaryAction: HeroAction;
  secondaryAction: HeroAction;
}

// WHY this hero has no photo and no stats-grid: KarTar Hub's audience
// includes visitors on slow connections and older devices, so the
// opening view is built entirely from type and color — zero extra
// image bytes. A "big number, small label" stat grid was considered
// and dropped in favor of folding the same numbers into the ticker
// line below, which keeps the trust signal without another generic
// dashboard block.
export function HeroBanner({
  statusTicker,
  headline,
  emphasizedPhrase,
  subheadline,
  primaryAction,
  secondaryAction,
}: HeroBannerProps) {
  return (
    <section
      aria-label="Perkenalan KarTar Hub"
      className="relative overflow-hidden bg-background px-6 py-20 sm:py-28"
    >
      {/* WHY an abstract shard instead of a literal torch icon: Karang
         Taruna's own emblem is a torch (obor). Referencing its shape
         without drawing it literally keeps the mark from reading as
         clip-art while still carrying the reference for anyone who
         recognizes it. Purely decorative, so it's hidden from AT. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-12 top-6 h-56 w-56 bg-secondary opacity-50 [clip-path:polygon(35%_0%,_65%_0%,_100%_55%,_50%_100%,_0%_55%)] sm:-right-16 sm:top-10 sm:h-96 sm:w-96"
      />

      <div className="relative mx-auto max-w-4xl">
        {/* WHY monospace for the ticker: it's the one line on the page
           meant to read as live/operational data rather than
           marketing copy, so a data-readout typeface earns its place
           here instead of being pure decoration. */}
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {statusTicker}
        </p>

        <h1 className="mt-6 text-balance font-serif text-5xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-7xl">
          {headline}{" "}
          <span className="inline-block -rotate-2 bg-primary px-3 py-1 text-primary-foreground">
            {emphasizedPhrase}
          </span>
        </h1>

        <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
          {subheadline}
        </p>

        {/* WHY min-h-12 (48px): the most common tap-target failure on
           community sites is buttons sized for a mouse cursor. 48px is
           the accessibility-guideline floor for a reliable tap on the
           phones most anggota actually browse from. */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            href={primaryAction.href}
            className="inline-flex min-h-12 items-center justify-center rounded-lg bg-primary px-8 text-base font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
          >
            {primaryAction.label}
          </Link>
          <Link
            href={secondaryAction.href}
            className="inline-flex min-h-12 items-center justify-center rounded-lg border border-border bg-card px-8 text-base font-semibold text-foreground transition-colors hover:bg-muted"
          >
            {secondaryAction.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
