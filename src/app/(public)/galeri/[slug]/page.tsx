import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PhotoLightbox } from "@/modules/gallery/components/photo-lightbox";
import {
  ALBUMS,
  getAlbumBySlug,
} from "@/modules/gallery/data/placeholder-albums";

interface AlbumDetailPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return ALBUMS.map((album) => ({ slug: album.slug }));
}

export async function generateMetadata({
  params,
}: AlbumDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const album = getAlbumBySlug(slug);

  if (!album) {
    return { title: "Album Tidak Ditemukan — Smart Taruna Ten" };
  }

  return {
    title: `${album.title} — Galeri — Smart Taruna Ten`,
    description: album.description ?? undefined,
  };
}

export default async function AlbumDetailPage({
  params,
}: AlbumDetailPageProps) {
  const { slug } = await params;
  const album = getAlbumBySlug(slug);

  if (!album) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
      <Link
        href="/galeri"
        className="text-sm font-semibold text-primary hover:underline"
      >
        ← Kembali ke semua album
      </Link>

      <h1 className="mt-4 font-serif text-3xl font-bold text-foreground sm:text-4xl">
        {album.title}
      </h1>
      {album.description ? (
        <p className="mt-2 text-muted-foreground">{album.description}</p>
      ) : null}

      <div className="mt-8">
        <PhotoLightbox photos={album.photos} />
      </div>
    </div>
  );
}
