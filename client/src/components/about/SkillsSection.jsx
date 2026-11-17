import SectionHeader from "../Common/SectionHeader";
import Reveal from "../Common/Reveal";
import SkillIcon from "../Common/SkillIcon";
import { techSkills, designSkills, creatorSkills } from "../../data/content";

function Block({ title, groups, cols }) {
  return (
    <div className="mt-8 first:mt-0 md:mt-10">
      <div className="mb-4 flex items-center gap-3">
        <h3 className="text-lg font-semibold text-[var(--navy)] md:text-xl">{title}</h3>
        <span className="h-px flex-1 bg-[var(--border)]" />
      </div>

      <div className={`grid gap-4 ${cols}`}>
        {groups.map((g, i) => (
          <Reveal key={g.group} delay={i * 0.06} className="h-full">
            <div className="card h-full bg-white p-4 transition-[border-color,box-shadow] duration-300 hover:!transform-none hover:border-[var(--accent)] hover:shadow-md">
              <h4 className="border-b border-[var(--border)] pb-2 text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                {g.group}
              </h4>
              <div className="mt-3 grid grid-cols-4 gap-1.5 sm:grid-cols-5 md:grid-cols-4 xl:grid-cols-5">
                {g.items.map((s) => (
                  <div
                    key={s.name}
                    className="group relative flex flex-col items-center gap-1 rounded-lg p-1 text-center transition-colors duration-300 hover:bg-[var(--bg-soft)]"
                  >
                    {s.main && (
                      <span className="absolute -top-1 right-0 rounded-full bg-[var(--accent)] px-1.5 py-px text-[8px] font-bold uppercase tracking-wider text-white shadow-sm">
                        Main
                      </span>
                    )}
                    <div className="scale-75">
                      <SkillIcon name={s.icon} image={s.image} alt={s.name} />
                    </div>
                    <span className="-mt-1 text-[11px] font-medium leading-tight text-[var(--navy)]">
                      {s.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export default function SkillsSection() {
  return (
    <section className="section !py-8 md:!py-12">
      <div className="container mx-auto max-w-5xl">
        <SectionHeader
          label="Skills & tools"
          title="What I work with"
          text="The technology I build with, the strategy behind the brands, and the tools I use to create content."
        />

        <Block title="Technology" groups={techSkills} cols="md:grid-cols-2 lg:grid-cols-3" />
        <Block title="Design & Marketing" groups={designSkills} cols="md:grid-cols-3" />
        <Block title="Content Creation" groups={creatorSkills} cols="md:grid-cols-2" />
      </div>
    </section>
  );
}