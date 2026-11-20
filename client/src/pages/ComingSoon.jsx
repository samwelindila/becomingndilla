import { motion } from "framer-motion";

const NAVY = "#0b1b33";
const BLUE = "#38bdf8";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18, delayChildren: 0.2 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const letter = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const Letters = ({ text, color }) =>
  text.split("").map((ch, i) => (
    <motion.span
      key={i}
      variants={letter}
      style={{ display: "inline-block", color }}
    >
      {ch}
    </motion.span>
  ));

export default function ComingSoon() {
  return (
    <main
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center"
      style={{ background: NAVY }}
    >
      {/* Floating glow orbs */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full blur-3xl"
        style={{ background: BLUE, opacity: 0.18 }}
        animate={{ x: [0, 60, 0], y: [0, 40, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -right-24 h-[28rem] w-[28rem] rounded-full blur-3xl"
        style={{ background: "#6366f1", opacity: 0.18 }}
        animate={{ x: [0, -50, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col items-center"
      >
        <h1 className="text-5xl font-bold sm:text-7xl" style={{ lineHeight: 1.1 }}>
          <Letters text="Becoming" color="#ffffff" />
          <Letters text="Ndilla" color={BLUE} />
        </h1>

        <motion.p
          variants={fadeUp}
          className="mt-6 text-3xl font-semibold sm:text-4xl"
          style={{ color: BLUE }}
        >
          <motion.span
            animate={{ opacity: [1, 0.55, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            Coming Soon
          </motion.span>
        </motion.p>

        <motion.p
          variants={fadeUp}
          className="mt-4 max-w-md text-sm sm:text-base"
          style={{ color: "#cbd5e1" }}
        >
          Tunafanya kazi kuboresha uzoefu wako. Tutarudi hivi karibuni na
          mabadiliko makubwa — kaa karibu!
        </motion.p>

        {/* Animated progress bar */}
        <motion.div
          variants={fadeUp}
          className="mt-8 h-1.5 w-56 overflow-hidden rounded-full"
          style={{ background: "rgba(255,255,255,0.12)" }}
        >
          <motion.div
            className="h-full w-1/3 rounded-full"
            style={{ background: BLUE }}
            animate={{ x: ["-100%", "300%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Maintenance badge with pulsing dot */}
        <motion.span
          variants={fadeUp}
          className="mt-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs uppercase tracking-widest"
          style={{ color: "#e2e8f0", border: "1px solid rgba(255,255,255,0.3)" }}
        >
          <motion.span
            className="h-2 w-2 rounded-full"
            style={{ background: BLUE }}
            animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          />
          Maintenance Mode
        </motion.span>
      </motion.div>

      <motion.p
        className="absolute bottom-6 z-10 text-xs"
        style={{ color: "#94a3b8" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
      >
        © {new Date().getFullYear()} BecomingNdilla. All rights reserved.
      </motion.p>
    </main>
  );
}