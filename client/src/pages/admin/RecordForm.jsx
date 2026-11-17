import { useEffect, useState } from "react";
import {
  Loader2,
  Upload,
  FileText,
  Code2,
  Rocket,
  Briefcase,
  ShoppingBag,
  Quote,
  Image as ImageIcon,
} from "lucide-react";

import {
  posts,
  projects,
  ventures,
  services,
  products,
  testimonials,
  portfolio,
  postCategories,
  serviceCategories,
  portfolioCategories,
} from "../../data/content";

import api from "../../lib/api";
import { authConfig } from "../../lib/adminAuth";
import VideoPlayer from "../../components/blog/VideoPlayer";
import { getVideoData } from "../../utils/blog";

// ---------- FIELD CONFIGURATION ----------

const HIDDEN = new Set(["_id", "__v", "id", "createdAt", "updatedAt"]);

const LONG = new Set([
  "description",
  "text",
  "excerpt",
  "content",
  "quote",
  "problem",
  "result",
  "body",
]);

const IMAGE = /^(image|thumbnail|thumb|cover|logo|photo|poster)$/i;

export const inputCls =
  "w-full rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-sm text-[var(--navy)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20";

const CLOUD = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
// ---------- HELPERS ----------

const isObj = (v) => v !== null && typeof v === "object" && !Array.isArray(v);

const isStringArray = (v) =>
  Array.isArray(v) && v.every((x) => typeof x === "string");

const labelOf = (k) =>
  k.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());

export function blankFrom(sample) {
  if (Array.isArray(sample)) return [];

  if (isObj(sample)) {
    return Object.fromEntries(
      Object.entries(sample).map(([k, v]) => [k, blankFrom(v)])
    );
  }

  if (typeof sample === "boolean") return false;

  return "";
}

const allBlank = (o) =>
  Object.values(o).every((v) =>
    typeof v === "string"
      ? v.trim() === ""
      : Array.isArray(v)
        ? v.length === 0
        : false
  );

// Prepare the record before sending it to the backend.
export function prepareForSave(value, sample, isNew) {
  const walk = (v, s) => {
    if (Array.isArray(v)) {
      return isStringArray(v) ? v.map((x) => x.trim()).filter(Boolean) : v;
    }

    if (!isObj(v)) return v;

    const out = {};

    for (const [k, val] of Object.entries(v)) {
      if (HIDDEN.has(k)) continue;

      const sampleVal = s?.[k];

      if (isObj(val)) {
        const nested = walk(val, sampleVal);

        if (allBlank(nested)) continue;

        out[k] = nested;
      } else if (val === "" && typeof sampleVal === "number") {
        out[k] = null;
      } else {
        out[k] = walk(val, sampleVal);
      }
    }

    return out;
  };

  const body = walk(value, sample);

  if (isNew && body.slug === "") {
    delete body.slug;
  }

  return body;
}

const setIn = (obj, path, val) => {
  if (path.length === 0) return val;

  const [head, ...rest] = path;

  return {
    ...obj,
    [head]: setIn(obj?.[head] ?? {}, rest, val),
  };
};

function kindOf(value, sample) {
  const probe = value === "" || value == null ? sample : value;

  if (typeof probe === "boolean") return "bool";
  if (typeof probe === "number") return "number";
  if (Array.isArray(probe)) {
    return isStringArray(probe) ? "lines" : "json";
  }
  if (isObj(probe)) return "object";

  return "text";
}

// ---------- IMAGE FIELD ----------

function ImageField({ value, onChange }) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const upload = async (file) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErr("Please select a valid image file.");
      return;
    }

    setBusy(true);
    setErr("");

    try {
      const fd = new FormData();
      fd.append("image", file);

      const res = await api.post("/upload", fd, authConfig());

      const url = res.data?.url || res.data?.secure_url || res.data?.image;

      if (!url) {
        throw new Error("The server did not return an image URL.");
      }

      onChange(url);
    } catch (error) {
      console.error("Image upload error:", error);

      setErr(
        error.response?.data?.message ||
          error.message ||
          "Image upload failed."
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex items-start gap-3">
      <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--bg-soft)]">
        {value ? (
          <img
            src={value}
            alt="Image preview"
            className="h-full w-full object-cover"
            onError={() => setErr("Image preview could not be loaded.")}
          />
        ) : (
          <ImageIcon size={26} className="text-slate-400" />
        )}
      </div>

      <div className="min-w-0 flex-1 space-y-2">
        <input
          type="url"
          className={inputCls}
          value={value || ""}
          onChange={(e) => {
            setErr("");
            onChange(e.target.value);
          }}
          placeholder="Paste an image URL or upload an image"
        />

        <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-[var(--border)] bg-white px-3 py-1.5 text-xs font-semibold text-[var(--navy)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]">
          {busy ? (
            <Loader2 size={13} className="animate-spin" />
          ) : (
            <Upload size={13} />
          )}

          {busy ? "Uploading..." : "Upload image"}

          <input
            type="file"
            accept="image/*"
            hidden
            disabled={busy}
            onChange={(e) => {
              upload(e.target.files?.[0]);
              e.target.value = "";
            }}
          />
        </label>

        {err && <p className="text-xs text-red-600">{err}</p>}

        {value && (
          <button
            type="button"
            onClick={() => {
              onChange("");
              setErr("");
            }}
            className="block text-xs font-medium text-red-600 hover:underline"
          >
            Remove image
          </button>
        )}
      </div>
    </div>
  );
}

// ---------- VIDEO FIELD ----------

function VideoField({ value, onChange, vertical }) {
  const [mode, setMode] = useState("link"); // "link" | "upload"
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const video = value ? getVideoData({ videoUrl: value }) : null;

  const upload = async (file) => {
    if (!file) return;

    if (!file.type.startsWith("video/")) {
      setErr("Please select a valid video file.");
      return;
    }

    if (!CLOUD || !PRESET) {
      setErr("Cloudinary env variables are missing.");
      return;
    }

    setBusy(true);
    setErr("");

    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("upload_preset", PRESET);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD}/video/upload`,
        { method: "POST", body: fd }
      );
      const json = await res.json();

      if (!res.ok || !json.secure_url) {
        throw new Error(json.error?.message || "Video upload failed.");
      }

      onChange(json.secure_url);
    } catch (error) {
      setErr(error.message || "Video upload failed.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {[
          ["link", "Paste link (YouTube / Instagram)"],
          ["upload", "Upload video file"],
        ].map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => setMode(key)}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
              mode === key
                ? "border-[var(--navy)] bg-[var(--navy)] text-white"
                : "border-[var(--border)] bg-white text-[var(--text-muted)]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {mode === "link" ? (
        <input
          type="url"
          className={inputCls}
          value={value || ""}
          onChange={(e) => {
            setErr("");
            onChange(e.target.value);
          }}
          placeholder="https://www.instagram.com/reel/XXXX/ or a YouTube link"
        />
      ) : (
        <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-[var(--border)] bg-white px-3 py-1.5 text-xs font-semibold text-[var(--navy)] hover:border-[var(--accent)] hover:text-[var(--accent)]">
          {busy ? (
            <Loader2 size={13} className="animate-spin" />
          ) : (
            <Upload size={13} />
          )}
          {busy ? "Uploading video..." : "Choose video file"}
          <input
            type="file"
            accept="video/*"
            hidden
            disabled={busy}
            onChange={(e) => {
              upload(e.target.files?.[0]);
              e.target.value = "";
            }}
          />
        </label>
      )}

      {err && <p className="text-xs text-red-600">{err}</p>}

      {value && !video && (
        <p className="text-xs text-red-600">
          Invalid or unsupported link. Copy the URL from the browser address
          bar.
        </p>
      )}

      {video && (
        <div>
          <VideoPlayer video={video} title="Preview" vertical={!!vertical} />
          <button
            type="button"
            onClick={() => onChange("")}
            className="mt-2 text-xs font-medium text-red-600 hover:underline"
          >
            Remove video
          </button>
        </div>
      )}
    </div>
  );
}

// ---------- TEXT LIST FIELD ----------

function LinesField({ value, onChange }) {
  const [text, setText] = useState(() =>
    Array.isArray(value) ? value.join("\n") : ""
  );

  useEffect(() => {
    setText(Array.isArray(value) ? value.join("\n") : "");
  }, [value]);

  return (
    <textarea
      rows={4}
      className={inputCls}
      value={text}
      onChange={(e) => {
        setText(e.target.value);
        onChange(e.target.value.split("\n"));
      }}
    />
  );
}

// ---------- JSON FIELD ----------

function JsonField({ value, onChange }) {
  const [text, setText] = useState(() =>
    JSON.stringify(value ?? [], null, 2)
  );

  const [err, setErr] = useState("");

  useEffect(() => {
    setText(JSON.stringify(value ?? [], null, 2));
    setErr("");
  }, [value]);

  return (
    <>
      <textarea
        rows={6}
        className={`${inputCls} font-mono text-xs`}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={() => {
          try {
            onChange(JSON.parse(text));
            setErr("");
          } catch {
            setErr("This is not valid JSON yet.");
          }
        }}
      />

      {err && <p className="mt-1 text-xs text-red-600">{err}</p>}
    </>
  );
}

// ---------- RECURSIVE FORM FIELDS ----------

function Fields({ data, sample, path, onSet, selects, isNew }) {
  const atRoot = path.length === 0;
  const isVideoPost = data.type === "video";

  const keys = Object.keys(data).filter((k) => {
    if (HIDDEN.has(k)) return false;
    if (isNew && k === "slug" && atRoot) return false;

    // Video fields only appear when the post type is "video"
    if (atRoot && (k === "videoUrl" || k === "vertical") && !isVideoPost) {
      return false;
    }

    // Hide the old empty { kind, id } video object
    if (atRoot && k === "video" && isObj(data[k]) && allBlank(data[k])) {
      return false;
    }

    return true;
  });

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {keys.map((k) => {
        const value = data[k];
        const s = sample?.[k];
        const p = [...path, k];

        const kind = kindOf(value, s);
        const options = atRoot ? selects?.[k] : undefined;

        const isLong =
          LONG.has(k) || (typeof value === "string" && value.length > 90);

        const isImage = IMAGE.test(k);
        const isVideoUrl = k === "videoUrl" && atRoot;

        const wide =
          kind === "lines" ||
          kind === "json" ||
          kind === "object" ||
          isImage ||
          isVideoUrl ||
          isLong;

        let control;

        if (isImage) {
          control = (
            <ImageField value={value} onChange={(v) => onSet(p, v)} />
          );
        } else if (isVideoUrl) {
          control = (
            <VideoField
              value={value}
              vertical={data.vertical}
              onChange={(v) => onSet(p, v)}
            />
          );
        } else if (kind === "object") {
          control = (
            <Fields
              data={isObj(value) ? value : blankFrom(s)}
              sample={s}
              path={p}
              onSet={onSet}
              selects={undefined}
              isNew={isNew}
            />
          );
        } else if (kind === "bool") {
          control = (
            <input
              type="checkbox"
              checked={!!value}
              onChange={(e) => onSet(p, e.target.checked)}
              className="h-4 w-4 accent-[var(--accent)]"
            />
          );
        } else if (kind === "number") {
          control = (
            <input
              type="number"
              min="0"
              className={inputCls}
              value={value ?? ""}
              onChange={(e) =>
                onSet(
                  p,
                  e.target.value === "" ? "" : Number(e.target.value)
                )
              }
            />
          );
        } else if (kind === "lines") {
          control = <LinesField value={value} onChange={(v) => onSet(p, v)} />;
        } else if (kind === "json") {
          control = <JsonField value={value} onChange={(v) => onSet(p, v)} />;
        } else if (options) {
          const list =
            options.includes(value) || !value ? options : [value, ...options];

          control = (
            <select
              className={inputCls}
              value={value || ""}
              onChange={(e) => onSet(p, e.target.value)}
            >
              <option value="">Select...</option>

              {list.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          );
        } else if (k === "date") {
          control = (
            <input
              type="date"
              className={inputCls}
              value={String(value || "").slice(0, 10)}
              onChange={(e) => onSet(p, e.target.value)}
            />
          );
        } else if (isLong) {
          control = (
            <textarea
              rows={k === "content" ? 12 : 4}
              className={inputCls}
              value={value ?? ""}
              onChange={(e) => onSet(p, e.target.value)}
            />
          );
        } else {
          control = (
            <input
              className={inputCls}
              value={value ?? ""}
              readOnly={k === "slug"}
              onChange={(e) => onSet(p, e.target.value)}
            />
          );
        }

        return (
          <div key={p.join(".")} className={wide ? "sm:col-span-2" : ""}>
            <label className="mb-1 block text-xs font-semibold text-[var(--navy)]">
              {k === "vertical" && atRoot
                ? "Vertical video (reel / 9:16)"
                : k === "videoUrl" && atRoot
                  ? "Video"
                  : labelOf(k)}

              {kind === "lines" && (
                <span className="ml-1.5 font-normal text-[var(--text-muted)]">
                  one item per line
                </span>
              )}
            </label>

            {control}
          </div>
        );
      })}
    </div>
  );
}

// ---------- MAIN RECORD FORM ----------

export default function RecordForm({
  value,
  sample,
  selects,
  isNew,
  onChange,
}) {
  // Old posts saved before video support get the new fields automatically
  const data =
    isObj(value) && "type" in value && !("videoUrl" in value)
      ? { videoUrl: "", vertical: false, ...value }
      : value;

  const set = (path, v) => onChange(setIn(data, path, v));

  return (
    <Fields
      data={data}
      sample={sample}
      path={[]}
      onSet={set}
      selects={selects}
      isNew={isNew}
    />
  );
}

// ---------- ADMIN RESOURCE CONFIGURATION ----------

export const resources = [
  {
    key: "posts",
    label: "Posts",
    singular: "post",
    icon: FileText,
    path: "/posts",
    titleKey: "title",
    subKey: "category",

    template: {
      title: "",
      type: "article",
      category: "",
      date: "",
      excerpt: "",
      image: "",
      content: "",
      videoUrl: "",
      vertical: false,
    },

    selects: {
      type: ["article", "video"],
      category: postCategories.filter((c) => c !== "All" && c !== "Videos"),
    },
  },

  {
    key: "projects",
    label: "Projects",
    singular: "project",
    icon: Code2,
    path: "/projects",
    titleKey: "title",
    subKey: "category",
    template: projects[0],

    selects: {
      status: ["Planning", "Building", "MVP", "In development", "Live"],
    },
  },

  {
    key: "ventures",
    label: "Ventures",
    singular: "venture",
    icon: Rocket,
    path: "/ventures",
    titleKey: "name",
    subKey: "type",
    template: ventures[0],

    selects: {
      status: ["Active", "Planned"],
    },
  },

  {
    key: "services",
    label: "Services",
    singular: "service",
    icon: Briefcase,
    path: "/services",
    titleKey: "title",
    subKey: "category",
    template: services[0],

    selects: {
      category: serviceCategories.filter((c) => c !== "All"),
    },
  },

  {
    key: "products",
    label: "Products",
    singular: "product",
    icon: ShoppingBag,
    path: "/products",
    titleKey: "title",
    subKey: "type",

    template: {
      ...(products[0] || {}),
      title: "",
      slug: "",
      type: "Product",
      description: "",
      price: 0,
      image: "",
      badge: "",
      order: 0,
      published: true,
    },

    selects: {
      type: ["Course", "E-book", "Product"],
    },
  },

  {
    key: "portfolio",
    label: "Portfolio",
    singular: "portfolio item",
    icon: ImageIcon,
    path: "/portfolio",
    titleKey: "title",
    subKey: "category",
    template: portfolio[0],

    selects: {
      category: portfolioCategories.filter((c) => c !== "All"),
    },
  },

  {
    key: "testimonials",
    label: "Testimonials",
    singular: "testimonial",
    icon: Quote,
    path: "/testimonials",
    titleKey: "name",
    subKey: "role",
    template: testimonials[0],

    selects: {},
  },
];