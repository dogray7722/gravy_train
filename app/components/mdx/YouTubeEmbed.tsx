interface YouTubeEmbedProps {
  id: string;
  title?: string;
  caption?: string;
}

export default function YouTubeEmbed({ id, title, caption }: YouTubeEmbedProps) {
  return (
    <figure className="my-10">
      <div className="w-full aspect-video">
        <iframe
          src={`https://www.youtube.com/embed/${id}`}
          title={title ?? "YouTube video"}
          allowFullScreen
          className="w-full h-full"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-[0.8125rem] text-ink-muted italic leading-[1.6]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
