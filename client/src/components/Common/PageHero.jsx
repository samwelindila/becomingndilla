import { motion } from "framer-motion";

export default function PageHero({ label, title, text }) {
  return (
    <section className="relative overflow-hidden pb-8 pt-24 md:pb-10 md:pt-28">
      <div className="pointer-events-none absolute -top-24 right-0 h-[260px] w-[260px] rounded-full bg-[var(--accent-soft)] blur-3xl" />

      <div className="container relative mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <span className="section-label">
            <span className="h-px w-6 bg-[var(--accent)]" />
            {label}
          </span>
          <h1 className="mt-2.5 text-2xl leading-tight md:text-4xl">{title}</h1>
          {text && <p className="mt-2 text-sm md:text-base">{text}</p>}
        </motion.div>
      </div>
    </section>
  );
}