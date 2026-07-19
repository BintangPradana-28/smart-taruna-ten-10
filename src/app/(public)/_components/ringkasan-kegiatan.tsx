import Link from "next/link";
import {
  EventCard,
  type EventSummary,
} from "@/modules/events/components/kegiatan-card";

interface RingkasanKegiatanProps {
  events: EventSummary[];
}

export function RingkasanKegiatan({ events }: RingkasanKegiatanProps) {
  return (
    <section
      aria-labelledby="ringkasan-kegiatan-heading"
      className="border-t border-border bg-muted/30 px-6 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2
            id="ringkasan-kegiatan-heading"
            className="font-serif text-3xl font-bold text-foreground sm:text-4xl"
          >
            Kegiatan Mendatang
          </h2>
          <Link
            href="/kegiatan"
            className="text-sm font-semibold text-primary hover:underline"
          >
            Lihat semua kegiatan →
          </Link>
        </div>

        {events.length === 0 ? (
          <p className="mt-10 rounded-lg border border-dashed border-border p-8 text-center text-muted-foreground">
            Belum ada kegiatan yang dijadwalkan minggu ini. Pantau terus
            halaman ini — pengurus rutin menambahkan kegiatan baru.
          </p>
        ) : (
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <li key={event.slug}>
                <EventCard event={event} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
