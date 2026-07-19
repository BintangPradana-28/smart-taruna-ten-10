export interface PhotoSummary {
  id: string;
  imageUrl: string | null;
  caption: string | null;
}

export interface AlbumSummary {
  slug: string;
  title: string;
  description: string | null;
  coverUrl: string | null;
  photoCount: number;
}

export interface AlbumDetail extends AlbumSummary {
  photos: PhotoSummary[];
}

// WHY imageUrl/coverUrl are null on every placeholder entry instead of
// pointing at a stock-photo service: a real gallery needs a real image
// host (Prisma Postgres doesn't store binaries — this will be S3,
// Vercel Blob, or Cloudinary once that decision is made). Linking to a
// third-party photo service now would mean deleting a working-looking
// integration later instead of just adding one when it's real. The
// listing grid and lightbox both already render a graceful fallback
// when these are null.
export const ALBUMS: AlbumDetail[] = [
  {
    slug: "kerja-bakti-agustus-2026",
    title: "Kerja Bakti Bersih Lingkungan",
    description: "Dokumentasi kerja bakti rutin RW 05, Agustus 2026.",
    coverUrl: null,
    photoCount: 4,
    photos: [
      {
        id: "1",
        imageUrl: null,
        caption: "Warga bergotong royong membersihkan selokan",
      },
      {
        id: "2",
        imageUrl: null,
        caption: "Pembagian alat kebersihan oleh pengurus",
      },
      { id: "3", imageUrl: null, caption: "Pengecatan ulang pos ronda" },
      { id: "4", imageUrl: null, caption: "Foto bersama seusai kegiatan" },
    ],
  },
  {
    slug: "gotong-royong-pos-ronda-juni-2026",
    title: "Gotong Royong Perbaikan Pos Ronda",
    description: "Perbaikan atap dan pengecatan pos ronda, Juni 2026.",
    coverUrl: null,
    photoCount: 3,
    photos: [
      {
        id: "5",
        imageUrl: null,
        caption: "Kondisi pos ronda sebelum diperbaiki",
      },
      { id: "6", imageUrl: null, caption: "Proses perbaikan atap" },
      { id: "7", imageUrl: null, caption: "Hasil akhir pos ronda" },
    ],
  },
  {
    slug: "buka-puasa-bersama-2026",
    title: "Buka Puasa Bersama Warga",
    description: "Dokumentasi acara buka puasa bersama, Maret 2026.",
    coverUrl: null,
    photoCount: 3,
    photos: [
      { id: "8", imageUrl: null, caption: "Persiapan takjil oleh anggota" },
      {
        id: "9",
        imageUrl: null,
        caption: "Tausiyah singkat sebelum berbuka",
      },
      { id: "10", imageUrl: null, caption: "Suasana buka puasa bersama" },
    ],
  },
];

export function getAlbums(): AlbumSummary[] {
  return ALBUMS.map(({ photos, ...summary }) => ({
    ...summary,
    photoCount: photos.length,
  }));
}

export function getAlbumBySlug(slug: string): AlbumDetail | undefined {
  return ALBUMS.find((album) => album.slug === slug);
}
