import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Code2,
  BrainCircuit,
  Network,
  Cable,
  Palette,
  Megaphone,
  Video,
  Headset,
  Rocket,
  Compass,
} from "lucide-react";

// Photo settings
// If you have a cutout with a transparent background, save it as
// client/public/ndilla.png, set PHOTO to "/ndilla.png" and IS_CUTOUT to true.
const PHOTO = "/ndilla.jpg";
const IS_CUTOUT = false;

// Edge fade that blends the photo into the page (no frame)
const fade = IS_CUTOUT
  ? "linear-gradient(to bottom, #000 78%, transparent 100%)"
  : "radial-gradient(ellipse 72% 72% at 50% 46%, #000 52%, transparent 100%)";

// Fonts: Sora (headings), Inter (body), JetBrains Mono (labels)
const FONT_HEAD = "'Sora', system-ui, sans-serif";
const FONT_BODY = "'Inter', system-ui, sans-serif";

// Skills, arranged as a professional grid. Edit text freely.
const SKILLS = [
  {
    title: "Full-Stack Web Development",
    text: "Fast, secure and scalable web applications, from database to interface.",
    Icon: Code2,
    color: "#0ea5e9",
  },
  {
    title: "AI & Machine Learning",
    text: "Intelligent, data-driven features and prediction models for real business problems.",
    Icon: BrainCircuit,
    color: "#8b5cf6",
  },
  {
    title: "Network Engineering",
    text: "Reliable network setup, configuration, maintenance and technical support.",
    Icon: Network,
    color: "#0d9488",
  },
  {
    title: "Fiber Internet Installation",
    text: "Professional fiber connections and customer equipment configuration.",
    Icon: Cable,
    color: "#2563eb",
  },
  {
    title: "Graphic & Brand Design",
    text: "Logos, visuals and identities that look polished and memorable.",
    Icon: Palette,
    color: "#ec4899",
  },
  {
    title: "Brand Strategy & Marketing",
    text: "Positioning and campaigns that turn attention into customers.",
    Icon: Megaphone,
    color: "#e11d48",
  },
  {
    title: "Content Creation",
    text: "Engaging video, photo and social content that tells your story.",
    Icon: Video,
    color: "#f59e0b",
  },
  {
    title: "Customer Support",
    text: "Clear communication and dependable service that keeps clients happy.",
    Icon: Headset,
    color: "#16a34a",
  },
  {
    title: "Entrepreneurship",
    text: "Building and launching ventures from first idea to real customers.",
    Icon: Rocket,
    color: "#f97316",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const headline = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18 } },
};

const word = {
  hidden: { y: "110%", opacity: 0 },
  show: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

// Key words in the intro: subtle emphasis
function Hl({ children }) {
  return <span className="font-semibold text-[var(--navy)]">{children}</span>;
}

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden pb-10 pt-24 md:pb-14 md:pt-28"
      style={{ fontFamily: FONT_BODY }}
    >
      {/* Fonts + animations used by this section */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500;600&family=Sora:wght@600;700;800&display=swap');

        @keyframes hGradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes hUnderline {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        .h-grad-text {
          background-size: 200% 200%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: hGradient 8s ease-in-out infinite;
        }

        /* ---- Hero buttons ----
           Colors are forced here so global link styles can't override them.
           Hover / pressed / keyboard-focus fill with var(--accent),
           the same color as the active underline in the navbar. */
        .h-btn {
          white-space: nowrap;
          text-decoration: none;
          transition: transform 0.3s ease, box-shadow 0.3s ease,
            background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
        }
        .h-btn:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 2px;
        }

        .h-btn-primary,
        .h-btn-primary:visited {
          background-color: #0f172a;
          color: #ffffff !important;
          border: 1px solid #0f172a;
        }
        .h-btn-primary:hover,
        .h-btn-primary:active,
        .h-btn-primary:focus-visible {
          background-color: var(--accent);
          border-color: var(--accent);
          color: #ffffff !important;
          box-shadow: 0 10px 24px -8px color-mix(in srgb, var(--accent) 60%, transparent);
        }

        .h-btn-secondary,
        .h-btn-secondary:visited {
          background-color: #ffffff;
          color: #0f172a !important;
          border: 1px solid #cbd5e1;
        }
        .h-btn-secondary:hover,
        .h-btn-secondary:active,
        .h-btn-secondary:focus-visible {
          background-color: var(--accent);
          border-color: var(--accent);
          color: #ffffff !important;
          box-shadow: 0 10px 24px -8px color-mix(in srgb, var(--accent) 60%, transparent);
        }

        @media (prefers-reduced-motion: reduce) {
          .h-grad-text { animation: none; }
        }
      `}</style>

      {/* Elegant background: faint dot pattern + one soft glow (tablet/desktop only) */}
      <div className="pointer-events-none absolute inset-0 hidden md:block">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(15,23,42,0.07) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 60% at 50% 35%, #000 30%, transparent 100%)",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 50% 35%, #000 30%, transparent 100%)",
          }}
        />
        <motion.div
          className="absolute -top-32 right-[8%] h-[360px] w-[360px] rounded-full bg-sky-200/30 blur-3xl"
          animate={{ y: [0, 18, 0], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container relative">
        {/* Same width wrapper as the skill cards, so the left edges line up */}
        <div className="mx-auto max-w-5xl">
          {/* Top: photo first on mobile, text first on desktop */}
          <div className="grid items-center gap-6 lg:grid-cols-[1.2fr_1fr] lg:gap-10">
            {/* Text: left aligned, starts at the same left edge as the cards */}
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="order-2 text-left lg:order-1"
            >
              {/* Headline: visible on PC/tablet only (kept for screen readers on mobile) */}
              <motion.h1
                variants={headline}
                className="sr-only text-[2.6rem] font-extrabold leading-[1.08] tracking-tight md:not-sr-only md:block md:text-6xl"
                style={{ fontFamily: FONT_HEAD, letterSpacing: "-0.03em" }}
              >
                <span className="inline-block overflow-hidden pb-1 align-bottom">
                  <motion.span variants={word} className="inline-block text-[var(--navy)]">
                    Becoming
                  </motion.span>
                </span>{" "}
                <span className="inline-block overflow-hidden pb-2 align-bottom">
                  <motion.span variants={word} className="relative inline-block">
                    <span
                      className="h-grad-text inline-block"
                      style={{
                        backgroundImage:
                          "linear-gradient(90deg, #0ea5e9, #6366f1, #0ea5e9)",
                      }}
                    >
                      Ndilla
                    </span>
                    {/* underline draws in */}
                    <span
                      className="absolute -bottom-0.5 left-0 h-[4px] w-full origin-left rounded-full"
                      style={{
                        backgroundImage: "linear-gradient(90deg, #0ea5e9, #6366f1)",
                        animation: "hUnderline 0.9s 1s cubic-bezier(0.22,1,0.36,1) both",
                      }}
                    />
                  </motion.span>
                </span>
              </motion.h1>

              {/* Intro */}
              <motion.p
                variants={item}
                className="max-w-xl text-[15px] leading-[1.8] text-[var(--text-muted)] md:mt-6 md:text-base"
              >
                I'm a <Hl>developer</Hl>, <Hl>creative</Hl>, and <Hl>entrepreneur</Hl> driven by
                ideas and the desire to build something meaningful. I explore the intersection of{" "}
                <Hl>technology</Hl>, <Hl>design</Hl>, <Hl>branding</Hl>, and{" "}
                <Hl>content creation</Hl>, turning concepts into digital products, creative
                experiences, and business opportunities. Here, I share my work, growth, and
                journey of becoming more.
              </motion.p>

              {/* Buttons: one row on mobile (each takes half), natural width from sm up */}
              <motion.div
                variants={item}
                className="mt-7 flex flex-nowrap justify-start gap-2 sm:gap-3"
              >
                <Link
                  to="/projects"
                  className="h-btn h-btn-primary group inline-flex flex-1 items-center justify-center gap-1.5 rounded-full px-3 py-2.5 text-[12.5px] font-semibold shadow-md shadow-slate-900/20 active:scale-[0.97] sm:flex-none sm:gap-2 sm:px-6 sm:py-3 sm:text-sm"
                  style={{ fontFamily: FONT_HEAD }}
                >
                  View my work
                  <ArrowRight
                    size={14}
                    className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  to="/journey"
                  className="h-btn h-btn-secondary group inline-flex flex-1 items-center justify-center gap-1.5 rounded-full px-3 py-2.5 text-[12.5px] font-semibold active:scale-[0.97] sm:flex-none sm:gap-2 sm:px-6 sm:py-3 sm:text-sm"
                  style={{ fontFamily: FONT_HEAD }}
                >
                  <Compass
                    size={14}
                    className="shrink-0 transition-transform duration-500 group-hover:rotate-180"
                  />
                  Follow my journey
                </Link>
              </motion.div>
            </motion.div>

            {/* Photo (first on mobile, second on desktop): no frame, edges fade into the page */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.25, ease: "easeOut" }}
              className="relative order-1 mx-auto w-full max-w-[260px] sm:max-w-[340px] lg:order-2"
            >
              {/* one soft light behind the photo: desktop/tablet only */}
              <motion.div
                className="absolute inset-x-6 inset-y-10 hidden rounded-full bg-gradient-to-br from-sky-200/50 to-indigo-200/40 blur-3xl md:block"
                animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.06, 1] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* the photo gently floats */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                <img
                  src={PHOTO}
                  alt="Ndilla Samweli"
                  className="aspect-[4/5] w-full object-cover object-top"
                  style={{ WebkitMaskImage: fade, maskImage: fade }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}