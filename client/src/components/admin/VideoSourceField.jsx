import { useState } from "react";
import VideoPlayer from "../blog/VideoPlayer";
import { getVideoData } from "../../utils/blog";

const CLOUD = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export default function VideoSourceField({ value, onChange, vertical, onVerticalChange }) {
  const [mode, setMode] = useState("upload"); // "upload" | "link"
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const video = value ? getVideoData({ videoUrl: value }) : null;

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");
    setUploading(true);

    try {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", PRESET);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD}/video/upload`,
        { method: "POST", body: data }
      );
      const json = await res.json();

      if (!res.ok || !json.secure_url) {
        throw new Error(json.error?.message || "Upload failed");
      }

      onChange(json.secure_url);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        {[
          ["upload", "Upload video file"],
          ["link", "Paste link (YouTube / Instagram)"],
        ].map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => setMode(key)}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium ${
              mode === key ? "bg-black text-white" : "bg-white text-gray-600"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {mode === "upload" ? (
        <div>
          <input
            type="file"
            accept="video/mp4,video/webm,video/quicktime"
            onChange={handleFile}
            disabled={uploading}
            className="block w-full text-sm"
          />
          {uploading && <p className="mt-2 text-sm text-gray-500">Uploading video...</p>}
        </div>
      ) : (
        <input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://www.youtube.com/watch?v=... or https://www.instagram.com/reel/..."
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
        />
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={!!vertical}
          onChange={(e) => onVerticalChange(e.target.checked)}
        />
        Vertical video (reel / 9:16)
      </label>

      {value && !video && (
        <p className="text-sm text-red-600">Invalid or unsupported link.</p>
      )}

      {video && <VideoPlayer video={video} title="Preview" vertical={vertical} />}
    </div>
  );
}