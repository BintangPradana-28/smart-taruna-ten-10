"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, ImageOff, X } from "lucide-react";
import type { PhotoSummary } from "@/modules/gallery/data/placeholder-albums";

interface PhotoLightboxProps {
  photos: PhotoSummary[];
}

// WHY this whole grid + lightbox lives in one client component
// instead of plain <a href> thumbnails: "Lihat Gambar" was asked for
// as its own sitemap feature, not just an album grid — a real in-page
// viewer with keyboard navigation is what that implies. Only the
// open/closed state and keyboard handling actually need the client
// boundary; the grid markup itself would be just as cheap server-side.
export function PhotoLightbox({ photos }: PhotoLightboxProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);

  const showPrevious = useCallback(() => {
    setOpenIndex((current) =>
      current === null ? null : (current - 1 + photos.length) % photos.length,
    );
  }, [photos.length]);

  const showNext = useCallback(() => {
    setOpenIndex((current) =>
      current === null ? null : (current + 1) % photos.length,
    );
  }, [photos.length]);

  // WHY a window keydown listener instead of relying on button focus:
  // once the lightbox is open, arrow/escape keys should work no
  // matter which element currently has focus — that's the behavior
  // people expect from any photo viewer.
  useEffect(() => {
    if (openIndex === null) return;

    function handleKeyDown(keyboardEvent: KeyboardEvent) {
      if (keyboardEvent.key === "Escape") close();
      if (keyboardEvent.key === "ArrowLeft") showPrevious();
      if (keyboardEvent.key === "ArrowRight") showNext();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [openIndex, close, showPrevious, showNext]);

  // WHY lock body scroll while open: without this, scrolling the page
  // behind a fixed full-screen overlay is a common source of
  // disorientation, especially on mobile where the gesture is the
  // same one used to swipe between photos.
  useEffect(() => {
    if (openIndex === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [openIndex]);

  const activePhoto = openIndex !== null ? photos[openIndex] : null;

  return (
    <>
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {photos.map((photo, index) => (
          <li key={photo.id}>
            <button
              type="button"
              onClick={() => setOpenIndex(index)}
              className="group block aspect-square w-full overflow-hidden rounded-lg border border-border bg-muted"
            >
              {photo.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element -- see components/shared/avatar.tsx for why plain img is used here
                <img
                  src={photo.imageUrl}
                  alt={photo.caption ?? ""}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
              ) : (
                <span className="flex h-full w-full flex-col items-center justify-center gap-2 text-muted-foreground">
                  <ImageOff className="h-6 w-6" aria-hidden="true" />
                  <span className="sr-only">Foto belum diunggah</span>
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>

      {activePhoto ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activePhoto.caption ?? "Tampilan foto"}
          onClick={close}
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/90 p-4"
        >
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              close();
            }}
            className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-background/90 text-foreground"
          >
            <span className="sr-only">Tutup</span>
            <X className="h-5 w-5" aria-hidden="true" />
          </button>

          {photos.length > 1 ? (
            <>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  showPrevious();
                }}
                className="absolute left-4 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-background/90 text-foreground"
              >
                <span className="sr-only">Foto sebelumnya</span>
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  showNext();
                }}
                className="absolute right-4 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-background/90 text-foreground"
              >
                <span className="sr-only">Foto berikutnya</span>
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </>
          ) : null}

          <div
            className="max-h-[80vh] max-w-3xl"
            onClick={(event) => event.stopPropagation()}
          >
            {activePhoto.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={activePhoto.imageUrl}
                alt={activePhoto.caption ?? ""}
                className="max-h-[80vh] w-full rounded-lg object-contain"
              />
            ) : (
              <div className="flex h-64 w-80 flex-col items-center justify-center gap-3 rounded-lg bg-background text-muted-foreground">
                <ImageOff className="h-10 w-10" aria-hidden="true" />
                <p className="text-sm">Foto belum diunggah</p>
              </div>
            )}
            {activePhoto.caption ? (
              <p className="mt-3 text-center text-sm text-background">
                {activePhoto.caption}
              </p>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
