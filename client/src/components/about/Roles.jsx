import {
  Code2,
  BrainCircuit,
  Network,
  Cable,
  Palette,
  Megaphone,
  Video,
  Headset,
  Rocket,
} from "lucide-react";
import SectionHeader from "../Common/SectionHeader";
import Reveal from "../Common/Reveal";

// Same skills as the home page hero. Edit text freely.
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

export default function Roles() {
  return (
    <section className="section section-soft !py-8 md:!py-12">
      <div className="container mx-auto max-w-5xl">
        <SectionHeader
          label="What I do"
          title="Skills & expertise"
          text="Technology, design and business, combined to build things that work and grow."
        />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-5">
          {SKILLS.map(({ title, text, Icon, color }, i) => (
            <Reveal key={title} delay={(i % 3) * 0.08} className="h-full">
              <div className="card group flex h-full gap-4 bg-white p-4 transition-[border-color,box-shadow] duration-300 hover:border-[var(--accent)] hover:shadow-md sm:p-5">
                {/* soft tinted icon tile */}
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105 sm:h-12 sm:w-12"
                  style={{ backgroundColor: `${color}1a`, color }}
                >
                  <Icon size={22} />
                </div>

                <div className="min-w-0">
                  <h3 className="text-[15px] font-semibold leading-snug text-[var(--navy)]">
                    {title}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-[var(--text-muted)]">
                    {text}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}