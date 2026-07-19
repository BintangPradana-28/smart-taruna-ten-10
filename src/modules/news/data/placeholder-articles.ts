import type {
  ArticleSummary,
  CategorySummary,
} from "../components/article-card";

// WHY one shared dataset instead of separate arrays on Beranda and
// /berita: same reasoning as placeholder-events.ts — an article
// featured on the homepage must resolve to the same article the full
// listing and detail pages know about, or a homepage card would 404
// when clicked.

export interface ArticleDetail extends ArticleSummary {
  content: string[];
  authorName: string;
}

export const CATEGORIES: CategorySummary[] = [
  { slug: "transparansi", name: "Transparansi" },
  { slug: "organisasi", name: "Organisasi" },
  { slug: "prestasi", name: "Prestasi" },
  { slug: "pengumuman", name: "Pengumuman" },
];

const TRANSPARANSI = CATEGORIES[0];
const ORGANISASI = CATEGORIES[1];
const PRESTASI = CATEGORIES[2];
const PENGUMUMAN = CATEGORIES[3];

export const ARTICLES: ArticleDetail[] = [
  {
    slug: "laporan-donasi-triwulan-2",
    title: "Laporan Transparansi Donasi Triwulan II 2026",
    excerpt:
      "Rincian penggunaan dana donasi warga selama April–Juni, mulai dari renovasi pos ronda hingga bantuan sembako.",
    coverUrl: null,
    category: TRANSPARANSI,
    publishedAt: new Date("2026-07-05T10:00:00+07:00"),
    authorName: "Dewi Lestari (Bendahara)",
    content: [
      "Selama periode April–Juni 2026, Smart Taruna Ten menerima total donasi sebesar Rp 8.450.000 dari 62 donatur, baik melalui QRIS maupun transfer bank langsung.",
      "Dana tersebut telah digunakan untuk renovasi atap pos ronda RW 05 (Rp 3.200.000), pembelian sembako untuk 15 keluarga terdampak (Rp 3.750.000), dan operasional kegiatan kerja bakti (Rp 950.000). Sisa saldo Rp 550.000 dibawa ke triwulan berikutnya.",
      "Bukti transaksi dan nota pembelian tersedia untuk diperiksa langsung oleh warga yang berminat — silakan hubungi bendahara melalui kontak yang tercantum di halaman Kontak.",
      "Pengurus mengucapkan terima kasih kepada seluruh donatur atas kepercayaan yang diberikan. Transparansi seperti ini akan terus dilaporkan setiap triwulan.",
    ],
  },
  {
    slug: "pengurus-baru-periode-2026-2028",
    title: "Serah Terima Pengurus Karang Taruna Periode 2026–2028",
    excerpt:
      "Struktur organisasi baru resmi dilantik, membawa sejumlah program kerja segar untuk dua tahun ke depan.",
    coverUrl: null,
    category: ORGANISASI,
    publishedAt: new Date("2026-06-28T14:00:00+07:00"),
    authorName: "Andi Wijaya (Sekretaris)",
    content: [
      "Serah terima kepengurusan Smart Taruna Ten periode 2026–2028 berlangsung di Balai Warga RW 05, disaksikan oleh Ketua RW dan perwakilan warga.",
      "Kepengurusan baru dipimpin oleh Budi Santoso sebagai Ketua, didampingi Siti Rahayu sebagai Wakil Ketua. Susunan lengkap dapat dilihat di halaman Tentang Kami.",
      "Beberapa program kerja yang akan difokuskan pada periode ini antara lain: digitalisasi pencatatan kegiatan, pelatihan keterampilan untuk UMKM warga, dan peningkatan frekuensi kerja bakti lingkungan.",
    ],
  },
  {
    slug: "juara-lomba-voli-antar-rw",
    title: "Tim Voli Juara 1 Turnamen Antar-RW",
    excerpt:
      "Latihan rutin dua bulan terakhir membuahkan hasil di turnamen tahunan tingkat kelurahan.",
    coverUrl: null,
    category: PRESTASI,
    publishedAt: new Date("2026-06-20T08:00:00+07:00"),
    authorName: "Rian Pratama (Koordinator Kegiatan)",
    content: [
      "Tim voli Smart Taruna Ten berhasil meraih juara 1 pada Turnamen Voli Antar-RW tingkat kelurahan yang berlangsung selama tiga hari.",
      "Kemenangan ini merupakan hasil dari latihan rutin dua kali seminggu yang konsisten dijalani sejak April lalu. Tim akan mewakili kelurahan pada turnamen tingkat kecamatan bulan depan.",
      "Pengurus mengapresiasi semangat para pemuda yang tetap meluangkan waktu berlatih di tengah kesibukan kuliah dan bekerja.",
    ],
  },
  {
    slug: "pendaftaran-pelatihan-umkm-dibuka",
    title: "Pendaftaran Pelatihan UMKM Dibuka, Kuota Terbatas",
    excerpt:
      "Workshop digital marketing untuk pelaku UMKM warga RW 05, kuota terbatas 25 peserta.",
    coverUrl: null,
    category: PENGUMUMAN,
    publishedAt: new Date("2026-08-05T09:00:00+07:00"),
    authorName: "Maya Putri (Koordinator Humas)",
    content: [
      "Pendaftaran untuk Pelatihan Digital Marketing untuk UMKM Warga resmi dibuka mulai hari ini. Kegiatan akan berlangsung pada 23 Agustus 2026 di Aula Kelurahan.",
      "Materi yang akan disampaikan meliputi cara memotret produk dengan HP, dasar promosi lewat Instagram dan WhatsApp Business, hingga tips menentukan harga jual yang kompetitif.",
      "Kuota terbatas untuk 25 peserta. Pendaftaran dapat dilakukan melalui halaman Kegiatan setelah masuk ke akun anggota.",
    ],
  },
  {
    slug: "jadwal-ronda-agustus-2026",
    title: "Jadwal Ronda Malam Bulan Agustus",
    excerpt:
      "Pembagian jadwal ronda malam warga RW 05 untuk bulan Agustus 2026.",
    coverUrl: null,
    category: PENGUMUMAN,
    publishedAt: new Date("2026-07-30T16:00:00+07:00"),
    authorName: "Andi Wijaya (Sekretaris)",
    content: [
      "Berikut pembagian jadwal ronda malam warga RW 05 untuk bulan Agustus 2026, dibagi per RT dan disusun bergiliran setiap minggu.",
      "Jadwal lengkap ditempel di papan pengumuman balai warga dan juga dibagikan melalui grup WhatsApp masing-masing RT. Warga yang berhalangan hadir diharap menginformasikan ke ketua RT untuk pengaturan gantian.",
    ],
  },
  {
    slug: "penghargaan-lingkungan-bersih-kecamatan",
    title:
      "Karang Taruna RW 05 Raih Penghargaan Lingkungan Bersih Tingkat Kecamatan",
    excerpt:
      "Konsistensi kerja bakti rutin membuahkan pengakuan resmi dari pihak kecamatan.",
    coverUrl: null,
    category: PRESTASI,
    publishedAt: new Date("2026-05-10T11:00:00+07:00"),
    authorName: "Budi Santoso (Ketua)",
    content: [
      "Smart Taruna Ten menerima penghargaan Lingkungan Bersih Tingkat Kecamatan atas konsistensi kegiatan kerja bakti yang berjalan rutin sepanjang tahun 2025–2026.",
      "Penghargaan diserahkan langsung oleh Camat setempat dalam acara peringatan Hari Lingkungan Hidup. Pengurus berharap pencapaian ini memotivasi warga untuk terus menjaga kebersihan lingkungan bersama-sama.",
    ],
  },
];

export function getArticles(): ArticleDetail[] {
  return [...ARTICLES].sort(
    (a, b) => b.publishedAt.getTime() - a.publishedAt.getTime(),
  );
}

export function getFeaturedArticles(count: number): ArticleDetail[] {
  return getArticles().slice(0, count);
}

export function getArticleBySlug(slug: string): ArticleDetail | undefined {
  return ARTICLES.find((article) => article.slug === slug);
}

export function getArticlesByCategory(categorySlug: string): ArticleDetail[] {
  return getArticles().filter(
    (article) => article.category.slug === categorySlug,
  );
}

export function getCategoryBySlug(slug: string): CategorySummary | undefined {
  return CATEGORIES.find((category) => category.slug === slug);
}
