import { useEffect, useRef, useState } from "react";

let scriptPromise = null;

function loadInstagramScript() {
  if (window.instgrm?.Embeds) return Promise.resolve(window.instgrm);
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    script.onload = () =>
      window.instgrm?.Embeds
        ? resolve(window.instgrm)
        : reject(new Error("instgrm missing"));
    script.onerror = () => reject(new Error("embed.js blocked"));
    document.body.appendChild(script);
  }).catch((err) => {
    scriptPromise = null; // allow a retry next time
    throw err;
  });

  return scriptPromise;
}

export default function InstagramEmbed({ url, title }) {
  const ref = useRef(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let cancelled = false;
    setFailed(false);

    el.innerHTML = `<blockquote class="instagram-media" data-instgrm-permalink="${url}?utm_source=ig_embed&utm_campaign=loading" data-instgrm-version="14" style="background:#fff;border:0;border-radius:12px;margin:0;max-width:540px;min-width:280px;width:100%;"></blockquote>`;

    loadInstagramScript()
      .then((ig) => {
        if (!cancelled) ig.Embeds.process();
      })
      .catch((err) => {
        console.error("Instagram embed failed:", err);
        if (!cancelled) setFailed(true);
      });

    // If nothing turned into an iframe after 6s, show the fallback
    const timer = setTimeout(() => {
      if (!cancelled && !el.querySelector("iframe")) setFailed(true);
    }, 6000);

    return () => {
      cancelled = true;
      clearTimeout(timer);
      el.innerHTML = "";
    };
  }, [url]);

  const embedSrc = `${url.replace(/\/?$/, "/")}embed/`;

  return (
    <div className="mx-auto w-full max-w-[400px]">
      <div ref={ref} />

      {failed && (
        <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
          <iframe
            className="block h-[600px] w-full"
            src={embedSrc}
            title={title || "Instagram video"}
            scrolling="no"
            frameBorder="0"
            allowFullScreen
          />
        </div>
      )}

      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 block text-center text-xs text-gray-500 hover:underline"
      >
        Open on Instagram
      </a>
    </div>
  );
}