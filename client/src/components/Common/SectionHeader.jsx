import Reveal from "./Reveal";

export default function SectionHeader({ label, title, text, center = false }) {
  return (
    <Reveal className={`mb-5 max-w-xl ${center ? "mx-auto text-center" : ""}`}>
      <span className={`section-label ${center ? "justify-center" : ""}`}>
        <span className="h-px w-6 bg-[var(--accent)]" />
        {label}
      </span>
      <h2 className="mt-2.5 text-2xl leading-tight md:text-3xl">{title}</h2>
      {text && <p className="mt-2 text-sm md:text-base">{text}</p>}
    </Reveal>
  );
}