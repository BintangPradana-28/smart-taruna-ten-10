import type { Metadata } from "next";
import { EventCard } from "@/modules/events/components/kegiatan-card";
import {
  getUpcomingEvents,
  getCompletedEvents,
} from "@/modules/events/data/placeholder-events";

export const metadata: Metadata = {
  title: "Kegiatan & Acara — Smart Taruna Ten",
  description:
    "Daftar kegiatan Karang Taruna yang akan datang dan yang sudah berlangsung.",
};

// WHY two static sections instead of a mendatang/selesai toggle: a
// client-side tab needs "use client" and JS to work at all. Rendering
// both sections up front costs nothing on a slow connection (it's
// still plain HTML) and never leaves a visitor wondering where the
// other events went if their JS is slow to load or fails.
export default function KegiatanPage() {
  const upcomingEvents = getUpcomingEvents();
  const completedEvents = getCompletedEvents();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <header>
        <h1 className="font-serif text-4xl font-bold text-foreground sm:text-5xl">
          Kegiatan & Acara
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Semua kegiatan Karang Taruna, dari yang masih bisa diikuti sampai
          yang sudah berlalu — supaya siapa pun bisa lihat apa yang
          benar-benar terjadi di lapangan.
        </p>
      </header>

      <section aria-labelledby="kegiatan-mendatang-heading" className="mt-12">
        <h2
          id="kegiatan-mendatang-heading"
          className="text-2xl font-semibold text-foreground"
        >
          Mendatang
        </h2>
        {upcomingEvents.length === 0 ? (
          <p className="mt-6 rounded-lg border border-dashed border-border p-8 text-center text-muted-foreground">
            Belum ada kegiatan mendatang yang dijadwalkan. Pantau terus
            halaman ini.
          </p>
        ) : (
          <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {upcomingEvents.map((event) => (
              <li key={event.slug}>
                <EventCard event={event} />
              </li>
            ))}
          </ul>
        )}
      </section>

      {completedEvents.length > 0 ? (
        <section aria-labelledby="kegiatan-selesai-heading" className="mt-16">
          <h2
            id="kegiatan-selesai-heading"
            className="text-2xl font-semibold text-foreground"
          >
            Sudah Berlangsung
          </h2>
          <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {completedEvents.map((event) => (
              <li key={event.slug}>
                <EventCard event={event} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
