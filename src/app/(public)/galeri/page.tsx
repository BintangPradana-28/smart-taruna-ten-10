import type { Metadata } from "next";
import Link from "next/link";
import { ImageOff } from "lucide-react";
import { getAlbums } from "@/modules/gallery/data/placeholder-albums";

export const metadata: Metadata = {
  title: "Galeri — Smart Taruna Ten",
  description: "Dokumentasi foto kegiatan Karang Taruna.",
};

export default function GaleriPage() {
  const albums = getAlbums();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <header>
        <h1 className="font-serif text-4xl font-bold text-foreground sm:text-5xl">
          Galeri
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Dokumentasi setiap kegiatan, supaya yang nggak sempat datang tetap
          bisa lihat keseruannya.
        </p>
      </header>

      {albums.length === 0 ? (
        <p className="mt-10 rounded-lg border border-dashed border-border p-8 text-center text-muted-foreground">
          Belum ada album foto yang diunggah. Dokumentasi kegiatan akan
          tampil di sini.
        </p>
      ) : (
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {albums.map((album) => (
            <li key={album.slug}>
              <Link
                href={`/galeri/${album.slug}`}
                className="block overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-primary"
              >
                <div className="flex aspect-video items-center justify-center overflow-hidden bg-muted text-muted-foreground">
                  {album.coverUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element -- see components/shared/avatar.tsx
                    <img
                      src={album.coverUrl}
                      alt={album.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <ImageOff className="h-8 w-8" aria-hidden="true" />
                  )}
                </div>
                <div className="p-4">
                  <h2 className="font-semibold text-foreground">
                    {album.title}
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {album.photoCount} foto
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
