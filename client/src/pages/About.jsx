import PageHero from "../components/Common/PageHero";
import SectionHeader from "../components/Common/SectionHeader";
import Reveal from "../components/Common/Reveal";
import Roles from "../components/about/Roles";
import SkillsSection from "../components/about/SkillsSection";
import Values from "../components/about/Values";
import { profile, values, interests } from "../data/content";

export default function About() {
  return (
    <>
      <PageHero
        label="About me"
        title="The story behind BecomingNdilla"
        text="A developer, designer, brand strategist and content creator documenting the process of becoming more."
      />

      <section className="section !py-8 md:!py-12">
        <div className="container mx-auto grid max-w-5xl items-start gap-8 lg:grid-cols-[1fr_2fr] lg:gap-10">
          {/* Photo: stays in view beside the story on desktop */}
          <div className="mx-auto w-full max-w-[200px] sm:max-w-[230px] lg:sticky lg:top-24">
            <div className="relative">
              <div className="absolute -inset-2 rounded-[24px] bg-gradient-to-br from-[var(--accent-soft)] to-transparent" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-soft)] shadow-lg shadow-slate-900/10 ring-4 ring-white">
                <img
                  src="/ndilla.jpg"
                  alt="Ndilla Samweli"
                  className="h-full w-full object-cover object-top"
                />
              </div>
            </div>
          </div>

          <Reveal>
            <h2 className="text-2xl font-bold text-[var(--navy)] md:text-3xl">
              Hi, I'm {profile.short}.
            </h2>
            <div className="mt-4 max-w-2xl space-y-3 text-sm leading-relaxed text-[var(--text-muted)] md:text-[15px] md:leading-[1.75]">
              <p>
                I'm a Computer Science student at Kampala International University Tanzania,
                based in {profile.location}. I build web applications with the MERN stack and
                explore how AI can help small businesses grow.
              </p>
              <p>
                Alongside code, I work as a graphic designer and a marketing and branding
                strategist, helping ideas look professional and reach the right people. I also
                create content, mainly on Instagram, editing with CapCut, Videoleap and InShot.
              </p>
              <p>
                Before all of this, I worked in networking, maintaining infrastructure at Muhimbili
                University and installing fiber connections at GoFiber. That experience taught me
                how systems really work, and it shapes the way I build.
              </p>
              <p>
                I'm building businesses and documenting the journey, because growth is easier
                when it is shared. That is the idea behind BecomingNdilla.
              </p>
            </div>

            <div className="mt-5 flex flex-wrap gap-1.5 border-t border-[var(--border)] pt-4">
              {interests.map((i) => (
                <span key={i} className="tag !text-[11px]">
                  {i}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <Roles />

      
<Values />
      <div className="section-soft">
        <SkillsSection />
      </div>

    </>
  );
}