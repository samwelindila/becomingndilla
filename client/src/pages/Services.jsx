import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Globe,
  ShoppingCart,
  BrainCircuit,
  Palette,
  Network,
  Cable,
  Target,
  Megaphone,
  Clapperboard,
  Smartphone,
  Camera,
  Share2,
  MessageCircle,
  Check,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

import PageHero from "../components/Common/PageHero";
import CallToAction from "../components/home/CallToAction";
import useContent from "../hooks/useContent";
import {
  profile,
  services as fallbackServices,
  serviceCategories,
} from "../data/content";

const whatsappNumber = String(
  profile.whatsapp || profile.phone || ""
).replace(/[^\d]/g, "");

const icons = {
  code: Globe,            // websites and web apps
  cart: ShoppingCart,     // online stores
  brain: BrainCircuit,    // AI and machine learning
  design: Palette,        // graphic and brand design
  network: Network,       // networking
  strategy: Target,       // brand strategy
  marketing: Megaphone,   // digital marketing
  video: Clapperboard,    // video and content

  // extra keys you can use for new services
  app: Smartphone,
  fiber: Cable,
  social: Share2,
  photo: Camera,
  dev: Code2,
};

const categoryColors = {
  Technology: {
    text: "text-sky-700",
    bg: "bg-sky-50",
    border: "border-sky-200",
    line: "#0284c7",
  },
  Design: {
    text: "text-violet-700",
    bg: "bg-violet-50",
    border: "border-violet-200",
    line: "#7c3aed",
  },
  Marketing: {
    text: "text-orange-700",
    bg: "bg-orange-50",
    border: "border-orange-200",
    line: "#ea580c",
  },
  Content: {
    text: "text-rose-700",
    bg: "bg-rose-50",
    border: "border-rose-200",
    line: "#e11d48",
  },
};

const formatPrice = (service) => {
  if (service.price === undefined || service.price === null) {
    return "Request a quote";
  }

  if (service.price === 0) return "Free";

  const amount = `TZS ${new Intl.NumberFormat("en-US").format(service.price)}`;

  return service.priceNote ? `${service.priceNote} ${amount}` : amount;
};

const createWhatsAppLink = (service) => {
  const message = [
    "Hello Ndilla,",
    "",
    `I am interested in your ${service.title} service.`,
    "",
    "I would like to know more about the service, pricing, and how we can get started.",
  ].join("\n");

  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
};

const processSteps = [
  {
    number: "01",
    title: "Tell me what you need",
    description: "Share your idea, business challenge, or project requirements.",
  },
  {
    number: "02",
    title: "Discuss the approach",
    description: "We discuss the scope, timeline, deliverables, and quotation.",
  },
  {
    number: "03",
    title: "Let's get to work",
    description: "Once we agree, I begin working on the solution.",
  },
];

export default function Services() {
  // Loads from the API; shows content.js data if the server is unreachable
  const { data: services } = useContent("/services", fallbackServices);

  const [active, setActive] = useState("All");

  const shown =
    active === "All"
      ? services
      : services.filter((service) => service.category === active);

  return (
    <>
      <PageHero
        label="Services"
        title="Digital skills. Practical solutions."
        text="I help businesses, entrepreneurs, and individuals turn ideas into useful digital products, stronger brands, and better online experiences."
      />

      <section className="section !pt-4 md:!pt-6">
        <div className="container mx-auto max-w-5xl">
          {/* Introduction */}
          <div className="mb-9 flex flex-col gap-4 border-b border-[var(--border)] pb-7 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--accent)]">
                What I can do
              </span>

              <h2 className="mt-2 text-2xl font-bold tracking-tight text-[var(--navy)] md:text-3xl">
                Services built around real needs.
              </h2>

              <p className="mt-3 text-sm leading-7 text-[var(--text-muted)] md:text-base">
                My work combines technology, creativity, and business
                thinking. Whether you need a website, a visual identity,
                technical support, or content for your brand, let's discuss
                how I can help.
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2 text-sm text-[var(--text-muted)]">
              <Sparkles size={16} className="text-[var(--accent)]" />
              <span>{services.length} service offerings</span>
            </div>
          </div>

          {/* Service filters */}
          <div className="mb-7">
            <div
              className="flex flex-wrap gap-2"
              role="group"
              aria-label="Filter services by category"
            >
              {serviceCategories.map((category) => {
                const selected = active === category;

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActive(category)}
                    aria-pressed={selected}
                    className={`rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] ${
                      selected
                        ? "border-[var(--navy)] bg-[var(--navy)] text-white"
                        : "border-[var(--border)] bg-white text-[var(--text-muted)] hover:border-[var(--navy)] hover:text-[var(--navy)]"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Service cards */}
          <motion.div
            layout
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {shown.map((service, index) => {
                const Icon = icons[service.icon] || Code2;
                const colors =
                  categoryColors[service.category] ||
                  categoryColors.Technology;

                return (
                  <motion.article
                    key={service.slug || service.title}
                    layout
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{
                      duration: 0.25,
                      delay: (index % 3) * 0.04,
                    }}
                    className="group flex h-full flex-col overflow-hidden rounded-xl border border-[var(--border)] bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent)] hover:shadow-lg"
                  >
                    <div className="flex flex-1 flex-col p-5">
                      {/* Card top */}
                      <div className="flex items-center justify-between gap-3">
                        <div
                          className={`flex h-11 w-11 items-center justify-center rounded-lg ${colors.bg} ${colors.text}`}
                        >
                          <Icon size={21} strokeWidth={1.8} />
                        </div>

                        {service.badge && (
                          <span className="rounded-full border border-[var(--border)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                            {service.badge}
                          </span>
                        )}
                      </div>

                      {/* Category and title */}
                      <span
                        className={`mt-5 text-[10px] font-bold uppercase tracking-[0.16em] ${colors.text}`}
                      >
                        {service.category}
                      </span>

                      <h3 className="mt-2 text-lg font-bold leading-snug text-[var(--navy)]">
                        {service.title}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
                        {service.description}
                      </p>

                      {/* Deliverables */}
                      <div className="mt-5 flex-1 border-t border-[var(--border)] pt-4">
                        <p className="mb-3 text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                          What this includes
                        </p>

                        <ul className="space-y-2.5">
                          {(service.includes || []).map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-2.5 text-[13px] leading-5 text-[var(--navy)]"
                            >
                              <Check
                                size={14}
                                className={`mt-0.5 shrink-0 ${colors.text}`}
                                strokeWidth={2.5}
                              />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Card footer */}
                    <div className="flex items-center justify-between gap-3 border-t border-[var(--border)] bg-[var(--bg-soft)]/60 px-5 py-4">
                      <div className="min-w-0">
                        <span className="block text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">
                          Investment
                        </span>
                        <span className="mt-1 block text-sm font-bold text-[var(--navy)]">
                          {formatPrice(service)}
                        </span>
                      </div>

                      <a
                        href={
                          whatsappNumber
                            ? createWhatsAppLink(service)
                            : undefined
                        }
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Request ${service.title} on WhatsApp`}
                        aria-disabled={!whatsappNumber}
                        className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-[var(--navy)] px-3.5 py-2.5 text-xs font-semibold !text-white transition hover:bg-[var(--accent)] active:scale-95"
                      >
                        <MessageCircle size={14} />
                        Discuss
                        <ArrowUpRight size={13} />
                      </a>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {/* Empty state */}
          {shown.length === 0 && (
            <div className="rounded-xl border border-dashed border-[var(--border)] px-5 py-12 text-center">
              <p className="font-semibold text-[var(--navy)]">
                No services in this category yet.
              </p>
              <button
                type="button"
                onClick={() => setActive("All")}
                className="mt-3 text-sm font-semibold text-[var(--accent)] hover:underline"
              >
                View all services
              </button>
            </div>
          )}

          {/* How the process works */}
          <div className="mt-16 border-t border-[var(--border)] pt-10">
            <div className="max-w-xl">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--accent)]">
                Working together
              </span>

              <h2 className="mt-2 text-2xl font-bold tracking-tight text-[var(--navy)]">
                From the first conversation to delivery.
              </h2>

              <p className="mt-3 text-sm leading-6 text-[var(--text-muted)]">
                Every project starts with understanding what you want to
                achieve. The process stays clear, collaborative, and focused
                on the result.
              </p>
            </div>

            <div className="mt-7 grid gap-6 sm:grid-cols-3">
              {processSteps.map((step) => (
                <div
                  key={step.number}
                  className="border-l-2 border-[var(--accent)] pl-4"
                >
                  <span className="text-xs font-bold tracking-wider text-[var(--accent)]">
                    {step.number}
                  </span>

                  <h3 className="mt-2 text-base font-bold text-[var(--navy)]">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

     
    </>
  );
}