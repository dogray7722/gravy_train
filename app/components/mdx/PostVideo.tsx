interface PostVideoProps {
  src: string;
  caption?: string;
  poster?: string;
  autoplay?: boolean;
}

export default function PostVideo({ src, caption, poster, autoplay = false }: PostVideoProps) {
  return (
    <figure className="my-10">
      <video
        src={src}
        poster={poster}
        controls={!autoplay}
        autoPlay={autoplay}
        muted={autoplay}
        loop={autoplay}
        playsInline
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
