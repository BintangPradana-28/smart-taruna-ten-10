import type { EventSummary } from "../components/kegiatan-card";

// WHY one shared dataset instead of separate arrays per page: Beranda's
// preview and the full /kegiatan listing must reference the exact same
// events, or a card shown on the homepage could 404 when clicked
// because the detail page reads from a different, out-of-sync array.
// Delete this whole file the moment queries.ts talks to Prisma for
// real — the functions below are named and shaped so that swap only
// touches this file, never the pages that call them.

export interface EventDetail extends EventSummary {
  description: string;
  bannerNote: string;
  endAt: Date;
  quota: number | null;
  status: "DRAFT" | "PUBLISHED" | "ONGOING" | "COMPLETED" | "CANCELLED";
}

export const EVENTS: EventDetail[] = [
  {
    slug: "kerja-bakti-agustus",
    title: "Kerja Bakti Bersih Lingkungan",
    description:
      "Kegiatan bersih-bersih rutin di area RW 05, mencakup selokan, taman, dan pos ronda. Terbuka untuk semua warga, tidak perlu jadi anggota terdaftar untuk ikut.",
    startAt: new Date("2026-08-02T07:00:00+07:00"),
    endAt: new Date("2026-08-02T10:00:00+07:00"),
    location: "Balai Warga RW 05",
    quota: 40,
    isRegistrationOpen: true,
    status: "PUBLISHED",
    bannerNote: "Bawa sarung tangan dan alat kebersihan sendiri kalau ada.",
  },
  {
    slug: "malam-tirakatan-hut-ri",
    title: "Malam Tirakatan HUT RI ke-81",
    description:
      "Renungan malam menjelang HUT Kemerdekaan RI, diisi doa bersama, pembacaan sejarah singkat, dan pemotongan tumpeng oleh pengurus.",
    startAt: new Date("2026-08-16T19:30:00+07:00"),
    endAt: new Date("2026-08-16T21:30:00+07:00"),
    location: "Lapangan RW 05",
    quota: null,
    isRegistrationOpen: true,
    status: "PUBLISHED",
    bannerNote: "Terbuka untuk umum, tidak perlu daftar — datang saja.",
  },
  {
    slug: "pelatihan-digital-marketing-umkm",
    title: "Pelatihan Digital Marketing untuk UMKM Warga",
    description:
      "Workshop dasar promosi online: foto produk dengan HP, dasar Instagram/WhatsApp Business, dan tips harga jual. Ditujukan untuk pelaku UMKM di lingkungan RW 05.",
    startAt: new Date("2026-08-23T09:00:00+07:00"),
    endAt: new Date("2026-08-23T12:00:00+07:00"),
    location: "Aula Kelurahan",
    quota: 25,
    isRegistrationOpen: false,
    status: "PUBLISHED",
    bannerNote: "Pendaftaran akan dibuka 2 minggu sebelum acara.",
  },
  {
    slug: "gotong-royong-juni",
    title: "Gotong Royong Perbaikan Pos Ronda",
    description:
      "Perbaikan atap dan pengecatan ulang pos ronda RW 05 yang rusak akibat hujan deras bulan lalu.",
    startAt: new Date("2026-06-14T07:00:00+07:00"),
    endAt: new Date("2026-06-14T12:00:00+07:00"),
    location: "Pos Ronda RW 05",
    quota: null,
    isRegistrationOpen: false,
    status: "COMPLETED",
    bannerNote: "Kegiatan sudah selesai — lihat dokumentasinya di Galeri.",
  },
  {
    slug: "buka-puasa-bersama-2026",
    title: "Buka Puasa Bersama Warga",
    description:
      "Acara buka puasa bersama seluruh warga RW 05, diisi dengan tausiyah singkat dan pembagian takjil.",
    startAt: new Date("2026-03-15T17:30:00+07:00"),
    endAt: new Date("2026-03-15T19:30:00+07:00"),
    location: "Masjid Al-Ikhlas",
    quota: null,
    isRegistrationOpen: false,
    status: "COMPLETED",
    bannerNote: "Kegiatan sudah selesai — lihat dokumentasinya di Galeri.",
  },
];

export function getEventBySlug(slug: string): EventDetail | undefined {
  return EVENTS.find((event) => event.slug === slug);
}

export function getUpcomingEvents(): EventDetail[] {
  return EVENTS.filter(
    (event) => event.status !== "COMPLETED" && event.status !== "CANCELLED",
  );
}

export function getCompletedEvents(): EventDetail[] {
  return EVENTS.filter((event) => event.status === "COMPLETED");
}
