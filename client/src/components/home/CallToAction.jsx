import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "../Common/Reveal";

export default function CallToAction() {
  return (
    <section className="section pt-0">
      <div className="container">
        <Reveal>
          <div className="mx-auto max-w-4xl rounded-2xl bg-[var(--navy)] p-6 text-center md:p-10">
            <h2 className="mx-auto max-w-xl text-2xl !text-white md:text-3xl">
              Let's build something <span className="text-[var(--accent)]">together.</span>
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm !text-white/70 md:text-base">
              Whether it's a project, a job opportunity or a collaboration, I'd love to hear from you.
            </p>
            <Link
              to="/contact"
              className="btn-primary mt-5 !border-white !bg-white !text-[var(--navy)] hover:!bg-[var(--accent)] hover:!text-white"
            >
              Get in touch <ArrowRight size={18} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}