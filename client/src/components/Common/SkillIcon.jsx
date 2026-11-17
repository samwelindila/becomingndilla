import { useState } from "react";
import {
  SiJavascript, SiHtml5, SiReact, SiTailwindcss, SiFramer, SiVite,
  SiNodedotjs, SiExpress, SiMongodb, SiCloudinary, SiTensorflow,
  SiGit, SiGithub, SiInstagram, SiDji,
} from "react-icons/si";
import { FaCss3Alt } from "react-icons/fa";
import {
  Clapperboard, Scissors, Film, Mic, ScanFace, CircleDot,
  Cable, Network, Router, Wrench,
  PenTool, Shapes, LayoutGrid, Sparkles, Target, Megaphone, Lightbulb, TrendingUp,
} from "lucide-react";

// Official brand logos on a clean white tile, in their brand colours
const brand = {
  javascript: [SiJavascript, "#F7DF1E"],
  html: [SiHtml5, "#E34F26"],
  css: [FaCss3Alt, "#1572B6"],
  react: [SiReact, "#61DAFB"],
  reactnative: [SiReact, "#61DAFB"],
  tailwind: [SiTailwindcss, "#06B6D4"],
  framer: [SiFramer, "#0055FF"],
  vite: [SiVite, "#646CFF"],
  node: [SiNodedotjs, "#339933"],
  express: [SiExpress, "#111827"],
  mongodb: [SiMongodb, "#47A248"],
  cloudinary: [SiCloudinary, "#3448C5"],
  tensorflow: [SiTensorflow, "#FF6F00"],
  git: [SiGit, "#F05032"],
  github: [SiGithub, "#181717"],
};

// Colourful tiles: white icon on a brand-style gradient
const tile = {
  // Content creation apps and gear
  instagram: [SiInstagram, "linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)"],
  videoleap: [Clapperboard, "linear-gradient(135deg,#7c3aed,#ec4899)"],
  capcut: [Scissors, "linear-gradient(135deg,#111827,#374151)"],
  inshot: [Film, "linear-gradient(135deg,#f43f5e,#fb7185)"],
  dji: [SiDji, "linear-gradient(135deg,#111827,#475569)"],
  ringlight: [CircleDot, "linear-gradient(135deg,#f59e0b,#f97316)"],
  tripod: [ScanFace, "linear-gradient(135deg,#0ea5e9,#6366f1)"],
  mic: [Mic, "linear-gradient(135deg,#475569,#0f172a)"],

  // Graphic design
  design: [PenTool, "linear-gradient(135deg,#6366f1,#8b5cf6)"],
  logo: [Shapes, "linear-gradient(135deg,#f59e0b,#ef4444)"],
  social: [LayoutGrid, "linear-gradient(135deg,#ec4899,#f43f5e)"],
  brand: [Sparkles, "linear-gradient(135deg,#8b5cf6,#d946ef)"],

  // Marketing and strategy
  strategy: [Target, "linear-gradient(135deg,#0ea5e9,#2563eb)"],
  marketing: [Megaphone, "linear-gradient(135deg,#f97316,#e11d48)"],
  content: [Lightbulb, "linear-gradient(135deg,#eab308,#f97316)"],
  growth: [TrendingUp, "linear-gradient(135deg,#10b981,#0d9488)"],

  // Networking
  fiber: [Cable, "linear-gradient(135deg,#2563eb,#4f46e5)"],
  network: [Network, "linear-gradient(135deg,#0d9488,#0ea5e9)"],
  router: [Router, "linear-gradient(135deg,#475569,#1e293b)"],
  troubleshoot: [Wrench, "linear-gradient(135deg,#f59e0b,#d97706)"],
};

// Design apps drawn as lettered tiles, like their real app icons.
// Use icon: "photoshop" or icon: "canva" in content.js.
// (Or set image: "/skills/photoshop.png" to use the official logo file.)
const letters = {
  photoshop: { text: "Ps", bg: "#001E36", color: "#31A8FF", ring: "#31A8FF" },
  canva: {
    text: "Canva",
    bg: "linear-gradient(135deg,#00C4CC 0%,#4F6BED 55%,#7D2AE8 100%)",
    color: "#fff",
    cls: "text-[13px] italic tracking-tight",
  },
};

export default function SkillIcon({ name, image, alt }) {
  const [failed, setFailed] = useState(false);
  const box =
    "flex h-14 w-14 shrink-0 items-center justify-center rounded-xl shadow-sm transition-transform duration-300 group-hover:scale-105";

  // Your own logo file wins if provided and it loads
  if (image && !failed) {
    return (
      <div className={`${box} bg-white p-2 ring-1 ring-[var(--border)]`}>
        <img
          src={image}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-contain"
        />
      </div>
    );
  }

  if (brand[name]) {
    const [Icon, color] = brand[name];
    return (
      <div className={`${box} bg-white ring-1 ring-[var(--border)]`}>
        <Icon size={28} color={color} aria-hidden="true" />
      </div>
    );
  }

  if (letters[name]) {
    const { text, bg, color, ring, cls } = letters[name];
    return (
      <div
        className={`${box} ring-1 ring-inset ring-white/20`}
        style={{ background: bg, boxShadow: ring ? `inset 0 0 0 2px ${ring}` : undefined }}
        aria-hidden="true"
      >
        <span
          className={`font-extrabold leading-none ${cls || "text-xl"}`}
          style={{ color }}
        >
          {text}
        </span>
      </div>
    );
  }

  const [Icon, bg] = tile[name] || [Wrench, "linear-gradient(135deg,#0ea5e9,#2563eb)"];
  return (
    <div className={`${box} ring-1 ring-inset ring-white/20`} style={{ background: bg }}>
      <Icon size={24} color="#fff" strokeWidth={1.8} aria-hidden="true" />
    </div>
  );
}