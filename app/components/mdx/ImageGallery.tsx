"use client";

import { useState, useEffect, useCallback } from "react";

interface GalleryImage {
  src: string;
  alt?: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  caption?: string;
  columns?: 2 | 3;
}

export default function ImageGallery({ images, caption, columns = 2 }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);

  const prev = useCallback(() =>
    setActiveIndex((i) => (i !== null ? (i - 1 + images.length) % images.length : null)),
    [images.length]
  );

  const next = useCallback(() =>
    setActiveIndex((i) => (i !== null ? (i + 1) % images.length : null)),
    [images.length]
  );

  useEffect(() => {
    if (activeIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [activeIndex, close, prev, next]);

  const active = activeIndex !== null ? images[activeIndex] : null;

  return (
    <>
      <figure className="my-10">
        <div className={columns === 3 ? "grid grid-cols-3 gap-[0.5rem]" : "grid grid-cols-2 gap-[0.5rem]"}>
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              aria-label={`View full size${img.alt ? `: ${img.alt}` : ""}`}
              className="overflow-hidden border border-(--ink-border-soft) focus:outline-none focus-visible:ring-1 focus-visible:ring-ink-gold"
            >
              <img
                src={img.src}
                alt={img.alt ?? ""}
                className="w-full aspect-square object-cover transition-transform duration-300 ease-out hover:scale-110"
              />
            </button>
          ))}
        </div>
        {caption && (
          <figcaption className="mt-3 text-center text-[0.8125rem] text-ink-muted italic leading-[1.6]">
            {caption}
          </figcaption>
        )}
      </figure>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.alt ?? "Image lightbox"}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85"
          onClick={close}
        >
          {/* Close */}
          <button
            aria-label="Close"
            onClick={close}
            className="absolute top-4 right-5 text-ink-gold hover:text-ink-text text-[2rem] leading-none transition-colors cursor-pointer"
          >
            ×
          </button>

          {/* Prev */}
          {images.length > 1 && (
            <button
              aria-label="Previous image"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-gold hover:text-ink-text text-[2rem] leading-none transition-colors cursor-pointer px-2"
            >
              ‹
            </button>
          )}

          {/* Image */}
          <div
            className="flex flex-col items-center gap-3 px-16"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={active.src}
              alt={active.alt ?? ""}
              className="max-h-[85vh] max-w-[85vw] object-contain"
            />
            {active.alt && (
              <p className="text-ink-warm italic text-[0.85rem] text-center">
                {active.alt}
              </p>
            )}
          </div>

          {/* Next */}
          {images.length > 1 && (
            <button
              aria-label="Next image"
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-gold hover:text-ink-text text-[2rem] leading-none transition-colors cursor-pointer px-2"
            >
              ›
            </button>
          )}
        </div>
      )}
    </>
  );
}
