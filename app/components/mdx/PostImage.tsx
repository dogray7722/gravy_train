interface PostImageProps {
  src: string;
  alt?: string;
  caption?: string;
  wide?: boolean;
}

export default function PostImage({ src, alt, caption, wide }: PostImageProps) {
  return (
    <figure className={wide ? "-mx-6 my-10" : "my-10"}>
      <img
        src={src}
        alt={alt ?? ""}
        className="w-full border border-(--ink-border-soft)"
      />
      {caption && (
        <figcaption className="mt-3 text-center text-[0.8125rem] text-ink-muted italic leading-[1.6]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
