import InstagramEmbed from "./InstagramEmbed";

export default function VideoPlayer({
  video,
  title,
  vertical = false,
}) {
  if (!video) return null;

  const wrapper = vertical
    ? "mx-auto aspect-[9/16] w-full max-w-[360px]"
    : "aspect-video w-full";

  const container = `${wrapper} overflow-hidden rounded-2xl bg-black shadow-lg`;

  // YouTube player
  if (video.kind === "youtube") {
    return (
      <div className={container}>
        <iframe
          className="h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${video.id}`}
          title={title || "YouTube video"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    );
  }

  // Instagram Reel or post
  if (video.kind === "instagram") {
    const type = video.type || "reel";
    const url =
      video.url || `https://www.instagram.com/${type}/${video.id}/`;

    return <InstagramEmbed url={url} title={title} />;
  }

  // Direct MP4, WebM or Cloudinary video
  if (video.kind === "file") {
    return (
      <div className={container}>
        <video
          className="h-full w-full object-contain"
          src={video.src}
          poster={video.poster || undefined}
          controls
          playsInline
          preload="metadata"
        >
          Your browser does not support HTML video.
        </video>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
      This video URL is invalid or unsupported. Please check the video link.
    </div>
  );
}