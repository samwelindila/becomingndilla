import { useState } from "react";
import SectionHeader from "../Common/SectionHeader";
import Reveal from "../Common/Reveal";

// Pillar images stored in client/public/pillars/
const pillars = [
  {
    title: "Technology",
    icon: "tech",
    subtitle: "Building solutions. Creating possibilities.",
    text: "Technology is where ideas become practical solutions. I explore software development, web applications, artificial intelligence, and digital innovation to solve real-world problems. Through programming and continuous learning, I aim to build meaningful digital products and useful systems that make everyday experiences better.",
  },
  {
    title: "Entrepreneurship",
    icon: "biz",
    subtitle: "Turning ideas into opportunities.",
    text: "Entrepreneurship is about seeing possibilities, taking initiative, and building something valuable from the ground up. My interests include business development, startups, innovation, and investment. Through ventures such as NdillaTech and MonaSoap, I document the experience of building businesses, learning from challenges, and turning ideas into real opportunities.",
  },
  {
    title: "Content Creation",
    icon: "content",
    subtitle: "Sharing the journey. Inspiring growth.",
    text: "Content creation is my way of sharing experiences, ideas, lessons, and perspectives with the world. Through lifestyle content, storytelling, technology tutorials, and personal development, I document the process of learning, building, failing, and becoming better. My goal is to create content that adds value, encourages action, and inspires others to pursue their own journeys of growth.",
  },
];

// "position" decides which part stays visible when the image is cropped
// (e.g. "center", "left", "right", "center 30%").
const images = {
  tech: { src: "/pillars/tech.jpg", position: "center" },
  biz: { src: "/pillars/business.jpg", position: "center" },
  content: { src: "/pillars/content.jpg", position: "center" },
};

function CardImage({ image, alt }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-[var(--navy)] to-[var(--accent)]">
      {!failed && (
        <img
          src={image.src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          style={{ objectPosition: image.position }}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      )}
    </div>
  );
}

export default function Pillars() {
  return (
    <section className="section section-soft !py-10 md:!py-16">
      <div className="container">
        <div className="mx-auto max-w-5xl">
          <SectionHeader
            label="Three pillars"
            title="One person, three connected identities"
            text="I believe growth happens when creativity, innovation, and ambition come together. My journey is built around three connected pillars that represent who I am, what I do, and the impact I want to create."
          />
        </div>

        <div className="mx-auto mt-8 grid max-w-5xl items-stretch gap-5 md:grid-cols-3">
          {pillars.map((p, i) => {
            const image = images[p.icon];

            return (
              <Reveal key={p.title} delay={i * 0.08}>
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  {/* Image: portrait on every screen size */}
                  <div className="relative aspect-[4/5] w-full shrink-0 overflow-hidden">
                    <CardImage image={image} alt={p.title} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-5 sm:p-6">
                    <div className="mb-3 h-1 w-10 rounded-full bg-[var(--accent)]" />

                    <h3 className="text-xl font-bold text-[var(--navy)]">
                      {p.title}
                    </h3>

                    <p className="mt-2 text-sm font-semibold leading-relaxed text-[var(--accent)]">
                      {p.subtitle}
                    </p>

                    <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">
                      {p.text}
                    </p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}