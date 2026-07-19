import { HeroBanner } from "./_components/hero-banner";
import { RingkasanKegiatan } from "./_components/ringkasan-kegiatan";
import { SorotanBerita } from "./_components/sorotan-berita";

// CATATAN: semua data di bawah (ticker, daftarKegiatan, daftarBerita)
// masih contoh/placeholder berbentuk sama seperti model Prisma asli
// (Event, Article) — begitu Fase 2 selesai, tinggal ganti array
// statis ini dengan hasil query, tanpa ubah komponennya.
export default function BerandaPage() {
  return (
    <>
      <HeroBanner
        statusTicker="SMART TARUNA TEN · 32 KEGIATAN AKTIF · 150+ ANGGOTA"
        headline="Karang Taruna yang Lebih"
        emphasizedPhrase="Terbuka."
        subheadline="Kegiatan, berita, dan donasi yang bisa diikuti siapa saja — dari pengurus, anggota, sampai warga yang cuma mau tahu ada apa minggu ini."
        primaryAction={{ label: "Lihat Kegiatan", href: "/kegiatan" }}
        secondaryAction={{ label: "Tentang Kami", href: "/tentang-kami" }}
      />
      <RingkasanKegiatan
        daftarKegiatan={[
          {
            slug: "kerja-bakti-agustus",
            title: "Kerja Bakti Bersih Lingkungan",
            startAt: new Date("2026-08-02T07:00:00+07:00"),
            location: "Balai Warga RW 05",
            isPendaftaranDibuka: true,
          },
          {
            slug: "malam-tirakatan-hut-ri",
            title: "Malam Tirakatan HUT RI ke-81",
            startAt: new Date("2026-08-16T19:30:00+07:00"),
            location: "Lapangan RW 05",
            isPendaftaranDibuka: true,
          },
          {
            slug: "pelatihan-digital-marketing-umkm",
            title: "Pelatihan Digital Marketing untuk UMKM Warga",
            startAt: new Date("2026-08-23T09:00:00+07:00"),
            location: "Aula Kelurahan",
            isPendaftaranDibuka: false,
          },
        ]}
      />
      <SorotanBerita
        daftarBerita={[
          {
            slug: "laporan-donasi-triwulan-2",
            title: "Laporan Transparansi Donasi Triwulan II 2026",
            excerpt:
              "Rincian penggunaan dana donasi warga selama April–Juni, mulai dari renovasi pos ronda hingga bantuan sembako.",
            category: "Transparansi",
            publishedAt: new Date("2026-07-05T10:00:00+07:00"),
          },
          {
            slug: "pengurus-baru-periode-2026-2028",
            title: "Serah Terima Pengurus Karang Taruna Periode 2026–2028",
            excerpt:
              "Struktur organisasi baru resmi dilantik, membawa sejumlah program kerja segar untuk dua tahun ke depan.",
            category: "Organisasi",
            publishedAt: new Date("2026-06-28T14:00:00+07:00"),
          },
          {
            slug: "juara-lomba-voli-antar-rw",
            title: "Tim Voli Juara 1 Turnamen Antar-RW",
            excerpt:
              "Latihan rutin dua bulan terakhir membuahkan hasil di turnamen tahunan tingkat kelurahan.",
            category: "Prestasi",
            publishedAt: new Date("2026-06-20T08:00:00+07:00"),
          },
        ]}
      />
    </>
  );
}

