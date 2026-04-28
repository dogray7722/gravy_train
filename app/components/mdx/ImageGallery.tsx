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
  return (
    <figure className="my-10">
      <div className={columns === 3 ? "grid grid-cols-3 gap-[0.5rem]" : "grid grid-cols-2 gap-[0.5rem]"}>
        {images.map((img, i) => (
          <img
            key={i}
            src={img.src}
            alt={img.alt ?? ""}
            className="w-full aspect-square object-cover border border-(--ink-border-soft)"
          />
        ))}
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-[0.8125rem] text-ink-muted italic leading-[1.6]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
