import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  EVENTS,
  getEventBySlug,
} from "@/modules/events/data/placeholder-events";
import { formatEventDate } from "@/modules/events/components/kegiatan-card";

interface EventDetailPageProps {
  params: Promise<{ slug: string }>;
}

// WHY generateStaticParams here: with a known, finite list of events,
// pre-rendering every detail page at build time means visitors get a
// page served straight from the CDN edge instead of waiting on a
// server render — the performance goal from day one of this project.
export function generateStaticParams() {
  return EVENTS.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({
  params,
}: EventDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    return { title: "Kegiatan Tidak Ditemukan — Smart Taruna Ten" };
  }

  return {
    title: `${event.title} — Smart Taruna Ten`,
    description: event.description,
  };
}

const STATUS_LABEL: Record<string, string> = {
  DRAFT: "Draf",
  PUBLISHED: "Akan Datang",
  ONGOING: "Sedang Berlangsung",
  COMPLETED: "Sudah Selesai",
  CANCELLED: "Dibatalkan",
};

export default async function EventDetailPage({
  params,
}: EventDetailPageProps) {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  // WHY notFound() instead of a manual "not found" render: it lets
  // Next.js serve the real not-found.tsx boundary with a proper 404
  // status code, which matters for SEO and for anything downstream
  // that checks response codes.
  if (!event) {
    notFound();
  }

  const isPast = event.status === "COMPLETED" || event.status === "CANCELLED";

  return (
    <article className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
      <Link
        href="/kegiatan"
        className="text-sm font-semibold text-primary hover:underline"
      >
        ← Kembali ke semua kegiatan
      </Link>

      <span className="mt-6 inline-block rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
        {STATUS_LABEL[event.status]}
      </span>

      <h1 className="mt-4 font-serif text-3xl font-bold text-foreground sm:text-4xl">
        {event.title}
      </h1>

      <dl className="mt-6 grid gap-3 border-y border-border py-6 sm:grid-cols-2">
        <div>
          <dt className="text-sm text-muted-foreground">Tanggal</dt>
          <dd className="text-base font-medium text-foreground">
            {formatEventDate(event.startAt)}
          </dd>
        </div>
        <div>
          <dt className="text-sm text-muted-foreground">Lokasi</dt>
          <dd className="text-base font-medium text-foreground">
            {event.location}
          </dd>
        </div>
        {event.quota !== null ? (
          <div>
            <dt className="text-sm text-muted-foreground">Kuota</dt>
            <dd className="text-base font-medium text-foreground">
              {event.quota} orang
            </dd>
          </div>
        ) : null}
      </dl>

      <p className="mt-6 text-lg leading-relaxed text-foreground">
        {event.description}
      </p>

      <p className="mt-4 text-sm text-muted-foreground">{event.bannerNote}</p>

      {!isPast ? (
        <div className="mt-10">
          {event.isRegistrationOpen ? (
            // WHY this links to /masuk instead of a registration form
            // directly: Pendaftaran Acara needs a logged-in anggota
            // record to attach the registration to — that flow lands
            // in Fase 3 once auth exists. Linking here now instead of
            // building a form with nowhere real to submit avoids
            // shipping something that looks functional but silently
            // isn't.
            <Link
              href={`/masuk?redirect=/kegiatan/${event.slug}`}
              className="inline-flex min-h-12 items-center justify-center rounded-lg bg-primary px-8 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Masuk untuk Mendaftar
            </Link>
          ) : (
            <p className="rounded-lg border border-dashed border-border p-4 text-sm text-muted-foreground">
              Pendaftaran untuk kegiatan ini belum dibuka.
            </p>
          )}
        </div>
      ) : null}
    </article>
  );
}
