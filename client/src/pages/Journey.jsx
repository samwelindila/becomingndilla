import { Download, FileText } from "lucide-react";
import PageHero from "../components/Common/PageHero";
import Reveal from "../components/Common/Reveal";
import CallToAction from "../components/home/CallToAction";
import { journey } from "../data/content";

const CV_URL = "/cv/Ndilla-Ayubu-Samweli-CV.pdf";

export default function Journey() {
  return (
    <>
      <PageHero
        label="My journey"
        title="Where I've been, where I'm going"
        text="Education, work, projects and milestones on the road to becoming more."
      />

      <section className="section !py-8 md:!py-12">
        <div className="container mx-auto max-w-2xl">
          <div className="relative space-y-6 border-l-2 border-[var(--accent-soft)] pl-7">
            {journey.map((j) => (
              <Reveal key={j.title}>
                <div className="relative">
                  <span className="absolute -left-[35px] top-1 h-3 w-3 rounded-full border-2 border-white bg-[var(--accent)] shadow" />
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--accent)]">
                      {j.period}
                    </span>
                    <span className="tag !text-[11px]">{j.type}</span>
                  </div>
                  <h3 className="mt-1.5 text-base leading-snug md:text-lg">{j.title}</h3>
                  <p className="text-xs font-medium text-[var(--navy)]/70">{j.place}</p>
                  <p className="mt-1.5 text-sm leading-relaxed">{j.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* CV download */}
          <Reveal>
            <div className="card mt-10 flex flex-col items-center gap-4 p-6 text-center hover:!transform-none sm:flex-row sm:text-left">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                <FileText size={24} />
              </div>
              <div className="flex-1">
                <h3 className="text-base">Want the full picture?</h3>
                <p className="mt-1 text-sm">
                  Download my CV with my experience, education, projects and skills in one page.
                </p>
              </div>
              <a
                href={CV_URL}
                download="Ndilla-Ayubu-Samweli-CV.pdf"
                className="btn-primary shrink-0 !px-5 !py-2.5 !text-sm"
              >
                <Download size={16} />
                Download CV
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <CallToAction />
    </>
  );
}