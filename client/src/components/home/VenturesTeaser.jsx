import { Link } from "react-router-dom";
import {
  ArrowRight,
  Shirt,
  Users,
  Flame,
  Code2,
  Smartphone,
  Sparkles,
  Droplet,
} from "lucide-react";
import SectionHeader from "../Common/SectionHeader";
import Reveal from "../Common/Reveal";
import useContent from "../../hooks/useContent";
import { ventures as fallbackVentures } from "../../data/content";

// Custom maize (corn cob) icon, since lucide has no exact maize icon.
function Maize({ size = 24, strokeWidth = 2, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2c3 2 4 6 4 9s-1 6-4 8c-3-2-4-5-4-8s1-7 4-9z" />
      <path d="M12 4v13" />
      <path d="M9 8h6M8.5 12h7M9 16h6" />
      <path d="M12 22c-4 0-7-3-7-7 3 0 5 1 7 4" />
      <path d="M12 22c4 0 7-3 7-7-3 0-5 1-7 4" />
    </svg>
  );
}

// Visual identity per venture, matched by keywords in the venture name.
const visuals = [
  { match: ["vibe"], Icon: Shirt, gradient: "from-emerald-400 via-green-500 to-teal-600" },
  { match: ["brand"], Icon: Users, gradient: "from-orange-400 via-pink-500 to-rose-600" },
  { match: ["level"], Icon: Flame, gradient: "from-violet-500 via-purple-500 to-fuchsia-600" },
  { match: ["ndilla"], Icon: Code2, gradient: "from-sky-400 via-blue-500 to-indigo-600" },
  { match: ["mona", "soap"], Icon: Droplet, gradient: "from-cyan-300 via-sky-400 to-blue-600" },
  { match: ["agri", "agro", "farm"], Icon: Maize, gradient: "from-yellow-300 via-amber-400 to-lime-600" },
  { match: ["simu"], Icon: Smartphone, gradient: "from-amber-400 via-orange-500 to-red-500" },
];

const fallback = {
  Icon: Sparkles,
  gradient: "from-cyan-400 via-blue-500 to-purple-600",
};

function getVisual(name = "") {
  const n = name.toLowerCase();
  return visuals.find((v) => v.match.some((k) => n.includes(k))) || fallback;
}

export default function VenturesTeaser() {
  // Loads from the API; shows content.js data if the server is unreachable
  const { data: ventures } = useContent("/ventures", fallbackVentures);

  return (
    <section className="section section-soft !py-8 md:!py-12">
      <div className="container">
        {/* Same width wrapper as the cards, so the left edges line up */}
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <SectionHeader
              label="Ventures"
              title="Businesses I'm building"
              text="Each venture has its own identity, and all of them connect back here."
            />

            {/* Desktop/tablet only: button beside the header */}
            <div className="mb-8 hidden md:block">
              <Link to="/ventures" className="btn-outline !px-4 !py-2 !text-sm">
                Explore ventures <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>

        <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-3 lg:gap-5">
          {ventures.map((v, i) => {
            const { Icon, gradient } = getVisual(v.name);
            return (
              <Reveal key={v.slug || v.name} delay={i * 0.08}>
                <div className="card flex h-full items-start justify-between gap-3 p-4">
                  <div className="min-w-0">
                    <span className="tag !text-[11px]">{v.status}</span>
                    <h3 className="mt-3 text-base leading-snug">{v.name}</h3>
                    <p className="mt-1 text-xs font-medium text-[var(--accent)]">{v.type}</p>
                  </div>

                  {/* Right side: uploaded image if there is one, otherwise the colorful themed tile */}
                  {v.image ? (
                    <img
                      src={v.image}
                      alt={v.name}
                      loading="lazy"
                      className="h-16 w-16 shrink-0 rounded-xl object-cover shadow-md"
                    />
                  ) : (
                    <div
                      className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} text-white shadow-md`}
                    >
                      <Icon size={28} strokeWidth={2} />
                    </div>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Mobile only: button at the bottom, below the cards */}
        <div className="mt-6 flex justify-center md:hidden">
          <Link to="/ventures" className="btn-outline !px-4 !py-2 !text-sm">
            Explore ventures <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}