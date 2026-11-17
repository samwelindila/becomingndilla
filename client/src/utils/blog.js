// Safe date parsing
export const toDate = (value) => {
  if (!value) return null;

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

// Format dates
export const formatDate = (value) => {
  const date = toDate(value);

  return date
    ? date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";
};

// Sort posts: newest first
export const sortPosts = (posts = []) => {
  return [...posts].sort((a, b) => {
    return (
      (toDate(b.date)?.getTime() || 0) -
      (toDate(a.date)?.getTime() || 0)
    );
  });
};

// Check whether a post is a video
export const isVideo = (post) => {
  return String(post?.type || "").toLowerCase() === "video";
};

// Safely parse URL
const parseUrl = (value) => {
  if (!value || typeof value !== "string") return null;

  try {
    const cleaned = value.trim();

    return new URL(
      /^https?:\/\//i.test(cleaned) ? cleaned : `https://${cleaned}`
    );
  } catch {
    return null;
  }
};

// Normalize hostname
const normalizeHost = (hostname) => {
  return hostname.toLowerCase().replace(/^www\./, "");
};

// Extract YouTube ID
export const youtubeId = (url = "") => {
  const parsed = parseUrl(String(url));
  if (!parsed) return null;

  const host = normalizeHost(parsed.hostname);

  let id = null;

  if (host === "youtu.be") {
    id = parsed.pathname.split("/").filter(Boolean)[0];
  } else if (
    ["youtube.com", "m.youtube.com", "youtube-nocookie.com"].includes(host)
  ) {
    id =
      parsed.searchParams.get("v") ||
      parsed.pathname.match(/^\/(?:embed|shorts|live)\/([^/?]+)/)?.[1];
  }

  return id && /^[A-Za-z0-9_-]{11}$/.test(id) ? id : null;
};

// Extract Instagram Reel / post / IGTV information
export const instagramVideo = (url = "") => {
  const parsed = parseUrl(String(url));
  if (!parsed) return null;

  const host = normalizeHost(parsed.hostname);

  if (!["instagram.com", "m.instagram.com", "instagr.am"].includes(host)) {
    return null;
  }

  // /share/... links are redirects and cannot be embedded
  if (parsed.pathname.split("/").filter(Boolean)[0] === "share") return null;

  // /reel/ID, /reels/ID, /p/ID, /tv/ID and /username/reel/ID
  const match = parsed.pathname.match(
    /^\/(?:[A-Za-z0-9._]+\/)?(reel|reels|p|tv)\/([A-Za-z0-9_-]+)/
  );

  if (!match) return null;

  const type = match[1] === "reels" ? "reel" : match[1];

  return {
    kind: "instagram",
    type,
    id: match[2],
    url: `https://www.instagram.com/${type}/${match[2]}/`,
  };
};

// Convert video URL into player data
export const getVideoData = (post) => {
  if (!post) return null;

  if (post.video && typeof post.video === "object" && post.video.kind) {
    return post.video;
  }

  const rawUrl =
    post.videoUrl ||
    (typeof post.video === "string" ? post.video : "") ||
    post.url ||
    "";

  const url = String(rawUrl).trim();

  if (!url) return null;

  // YouTube
  const youtube = youtubeId(url);

  if (youtube) {
    return { kind: "youtube", id: youtube };
  }

  // Instagram
  const instagram = instagramVideo(url);

  if (instagram) return instagram;

  // Direct video files and Cloudinary videos
  const parsed = parseUrl(url);

  if (parsed) {
    const path = parsed.pathname.toLowerCase();

    const isVideoFile = /\.(mp4|webm|ogg|mov|m4v)$/i.test(path);

    const isCloudinaryVideo =
      parsed.hostname.toLowerCase().includes("cloudinary.com") &&
      path.includes("/video/upload/");

    if (isVideoFile || isCloudinaryVideo) {
      return {
        kind: "file",
        src: url,
        poster: post.image || post.thumbnail || "",
      };
    }
  }

  return null;
};

// Get post thumbnail
export const getThumb = (post) => {
  const uploaded =
    post?.image || post?.thumbnail || post?.cover || post?.thumb;

  if (uploaded) return uploaded;

  const id = youtubeId(
    post?.videoUrl ||
      (typeof post?.video === "string" ? post.video : "") ||
      post?.url
  );

  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : "";
};

// Alias
export const postCover = getThumb;

// Calculate reading time
export const readingTime = (content = "") => {
  const words = String(content).trim().split(/\s+/).filter(Boolean).length;

  const minutes = Math.ceil(words / 200);

  return `${Math.max(1, minutes)} min read`;
};