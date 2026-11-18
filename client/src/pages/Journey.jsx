
import {
  Download,
  Mail,
  Phone,
  MapPin,
  Github,
  Globe,
  BriefcaseBusiness,
  GraduationCap,
  Code2,
  Palette,
  Monitor,
  Network,
  MessageCircle,
  Lightbulb,
  FileText,
  ExternalLink,
} from "lucide-react";

import PageHero from "../components/Common/PageHero";
import Reveal from "../components/Common/Reveal";
import CallToAction from "../components/home/CallToAction";

const CV_URL = "/cv/Ndilla-Ayubu-Samweli-CV.pdf";

const experiences = [
  {
    role: "Freelance Full-Stack Developer & Digital Creative",
    company: "NdillaTech (Independent)",
    period: "2025 – Present",
    description: [
      "Design and develop full-stack web applications, business websites and e-commerce platforms.",
      "Build digital solutions incorporating AI-powered features and business automation.",
      "Provide graphic design, brand identity and digital marketing services.",
      "Manage project planning, development, deployment and client communication.",
    ],
  },
  {
    role: "Field Network Intern & Customer Support",
    company: "GoFiber",
    period: "2024 – 2025",
    description: [
      "Installed and configured fiber internet connections for customers.",
      "Configured networking equipment and troubleshot connectivity problems.",
      "Provided technical assistance and customer support.",
    ],
  },
  {
    role: "IT & Network Support Intern",
    company: "Muhimbili University of Health and Allied Sciences (MUHAS)",
    period: "2024 – 2025",
    description: [
      "Assisted in maintaining and troubleshooting network infrastructure.",
      "Provided IT support to staff and other system users.",
      "Assisted with computer configuration and network connectivity issues.",
    ],
  },
];

const projects = [
  {
    name: "GrowthGuard",
    description:
      "Machine learning-based SME business growth and risk assessment platform.",
    tech: "MongoDB, Express.js, React.js, Node.js, TensorFlow.js",
  },
  {
    name: "VibeKits",
    description:
      "Football jersey e-commerce concept targeting the Tanzanian market.",
    tech: "MERN Stack",
  },
  {
    name: "LevelUp",
    description:
      "Habit-tracking application concept featuring XP, progress monitoring and user levels.",
    tech: "Application Development, UI/UX",
  },
  {
    name: "BrandKazi",
    description:
      "Planned digital marketplace connecting businesses with creative and digital professionals.",
    tech: "Digital Platforms, Business Solutions",
  },
];

const skills = [
  {
    title: "Software Development & Technology",
    icon: Code2,
    items:
      "JavaScript, React.js, React Native, Node.js, Express.js, MongoDB, HTML5, CSS3, Tailwind CSS, Framer Motion, REST APIs, TensorFlow.js, Git, GitHub, Cloudinary and deployment.",
  },
  {
    title: "Computer Literacy & Office Applications",
    icon: Monitor,
    items:
      "Microsoft Word, Excel and PowerPoint, document preparation, spreadsheet management, data entry, information processing, email communication, internet research and digital file management.",
  },
  {
    title: "Graphic Design & Branding",
    icon: Palette,
    items:
      "Graphic design, logo creation, brand identity development, visual communication, promotional materials, social media graphics and branding strategy.",
  },
  {
    title: "Digital Marketing & Business",
    icon: BriefcaseBusiness,
    items:
      "Digital marketing, social media management, content strategy, online brand development, e-commerce solutions, customer engagement and digital business promotion.",
  },
  {
    title: "Content Creation & Multimedia",
    icon: Globe,
    items:
      "Social media content creation, video recording, video editing, CapCut, Videoleap, InShot, short-form video production and content storytelling.",
  },
  {
    title: "IT Support & Networking",
    icon: Network,
    items:
      "IT support, hardware and software troubleshooting, fiber installation, network configuration, network maintenance, connectivity troubleshooting and technical assistance.",
  },
  {
    title: "Communication & Interpersonal Skills",
    icon: MessageCircle,
    items:
      "Verbal and written communication, customer service, client relations, stakeholder engagement, active listening, teamwork, presentations and conflict resolution.",
  },
  {
    title: "Management & Personal Effectiveness",
    icon: Lightbulb,
    items:
      "Analytical thinking, problem-solving, decision-making, project coordination, time management, adaptability, creativity, attention to detail and entrepreneurial thinking.",
  },
];

function ResumeHeading({ children }) {
  return (
    <div className="mb-4 border-b-2 border-slate-200 pb-2">
      <h2 className="text-xs font-extrabold uppercase tracking-[0.17em] text-[#15345b]">
        {children}
      </h2>
    </div>
  );
}

export default function Journey() {
  return (
    <>
      <PageHero
        label="Professional Curriculum Vitae"
        title="My professional profile"
        text="Education, experience, technical expertise and professional capabilities."
      />

      <section className="section !py-8 md:!py-14">
        <div className="container mx-auto max-w-5xl">

          {/* DOWNLOAD BAR */}
          <Reveal>
            <div className="mb-5 flex flex-col justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                  <FileText size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">
                    Professional Curriculum Vitae
                  </p>
                  <p className="text-xs text-slate-500">
                    Ndilla Ayubu Samweli
                  </p>
                </div>
              </div>

              <a
                href={CV_URL}
                download="Ndilla-Ayubu-Samweli-CV.pdf"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#15345b] px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-800"
              >
                <Download size={16} />
                Download PDF
              </a>
            </div>
          </Reveal>

          {/* RESUME DOCUMENT */}
          <Reveal>
            <article
              id="professional-cv"
              className="overflow-hidden border border-slate-200 bg-white shadow-xl shadow-slate-900/5"
            >

              {/* HEADER */}
              <header className="relative overflow-hidden bg-[#142d4e] px-6 py-9 text-white md:px-11 md:py-12">
                <div className="absolute -right-20 -top-28 h-72 w-72 rounded-full border-[35px] border-white/[0.04]" />
                <div className="absolute -bottom-36 right-32 h-64 w-64 rounded-full border-[30px] border-blue-300/[0.05]" />

                <div className="relative z-10">
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-300">
                    Curriculum Vitae
                  </p>

                  <h1 className="mt-4 text-3xl font-black uppercase tracking-tight md:text-5xl">
                    Ndilla Ayubu Samweli
                  </h1>

                  <div className="mt-4 h-1 w-16 rounded-full bg-blue-400" />

                  <p className="mt-4 max-w-3xl text-xs font-semibold uppercase leading-7 tracking-[0.09em] text-blue-100 md:text-sm">
                    Full-Stack Developer | IT Support Professional |
                    Graphic Designer | Brand Strategist | Content Creator
                  </p>

                  <div className="mt-7 grid gap-x-7 gap-y-3 border-t border-white/15 pt-5 text-xs text-slate-200 sm:grid-cols-2">
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="shrink-0 text-blue-300" />
                      Dar es Salaam, Tanzania
                    </div>

                    <a
                      href="tel:+255770374380"
                      className="flex items-center gap-2 hover:text-white"
                    >
                      <Phone size={14} className="shrink-0 text-blue-300" />
                      +255 770 374 380
                    </a>

                    <a
                      href="mailto:samwelindila81@gmail.com"
                      className="flex items-center gap-2 break-all hover:text-white"
                    >
                      <Mail size={14} className="shrink-0 text-blue-300" />
                      samwelindila81@gmail.com
                    </a>

                    <a
                      href="https://github.com/samwelindila"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 hover:text-white"
                    >
                      <Github size={14} className="shrink-0 text-blue-300" />
                      github.com/samwelindila
                    </a>

                    <a
                      href="https://ndillatech.netlify.app"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 hover:text-white sm:col-span-2"
                    >
                      <Globe size={14} className="shrink-0 text-blue-300" />
                      ndillatech.netlify.app
                    </a>
                  </div>
                </div>
              </header>

              {/* RESUME BODY */}
              <div className="grid md:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)]">

                {/* MAIN CONTENT */}
                <main className="space-y-8 px-6 py-8 md:px-9 md:py-10">

                  {/* SUMMARY */}
                  <section>
                    <ResumeHeading>Professional Summary</ResumeHeading>

                    <p className="text-justify text-[13px] leading-[1.9] text-slate-600">
                      Versatile Computer Science graduate with a
                      multidisciplinary background in software development,
                      information technology, networking, graphic design,
                      digital marketing and business-oriented digital
                      solutions. Experienced in developing web applications,
                      supporting IT infrastructure, assisting customers and
                      creating digital content and brand identities. Possesses
                      strong communication, computer literacy, problem-solving,
                      teamwork and organizational abilities. Adaptable and
                      capable of working across technical, creative,
                      administrative and customer-facing environments, with a
                      strong interest in innovation and entrepreneurship.
                    </p>
                  </section>

                  {/* EXPERIENCE */}
                  <section>
                    <ResumeHeading>Professional Experience</ResumeHeading>

                    <div className="space-y-6">
                      {experiences.map((job) => (
                        <div
                          key={job.role}
                          className="relative border-l-2 border-blue-100 pl-4"
                        >
                          <span className="absolute -left-[5px] top-1 h-2 w-2 rounded-full bg-blue-600" />

                          <div className="flex flex-wrap items-start justify-between gap-2">
                            <h3 className="max-w-sm text-sm font-bold leading-6 text-[#183554]">
                              {job.role}
                            </h3>

                            <span className="rounded bg-blue-50 px-2 py-1 text-[10px] font-bold text-blue-700">
                              {job.period}
                            </span>
                          </div>

                          <p className="mt-1 text-xs font-semibold text-blue-700">
                            {job.company}
                          </p>

                          <ul className="mt-3 space-y-2">
                            {job.description.map((item) => (
                              <li
                                key={item}
                                className="flex gap-2 text-[12px] leading-[1.75] text-slate-600"
                              >
                                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-blue-500" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* PROJECTS */}
                  <section>
                    <ResumeHeading>Selected Projects</ResumeHeading>

                    <div className="space-y-4">
                      {projects.map((project) => (
                        <div key={project.name}>
                          <h3 className="text-sm font-bold text-[#183554]">
                            {project.name}
                          </h3>

                          <p className="mt-1 text-[12px] leading-6 text-slate-600">
                            {project.description}
                          </p>

                          <p className="mt-1 text-[10px] font-semibold text-blue-700">
                            Technologies: {project.tech}
                          </p>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* EDUCATION */}
                  <section>
                    <ResumeHeading>Education</ResumeHeading>

                    <div className="flex items-start gap-3">
                      <div className="mt-1 text-blue-700">
                        <GraduationCap size={21} />
                      </div>

                      <div>
                        <h3 className="text-sm font-bold leading-6 text-[#183554]">
                          Bachelor of Science in Computer Science
                        </h3>

                        <p className="mt-1 text-xs font-semibold text-blue-700">
                          Kampala International University in Tanzania (KIUT)
                        </p>

                        <p className="mt-1 text-[11px] text-slate-500">
                          2023 – 2026 | Graduated 30 August 2026
                        </p>

                        <p className="mt-3 text-xs leading-6 text-slate-600">
                          <strong className="text-slate-800">
                            Research Project:
                          </strong>{" "}
                          GrowthGuard – A Machine Learning-Based Business
                          Growth and Risk Assessment Platform.
                        </p>
                      </div>
                    </div>
                  </section>
                </main>

                {/* SIDEBAR */}
                <aside className="border-t border-slate-200 bg-[#f5f8fc] px-6 py-8 md:border-l md:border-t-0 md:px-7 md:py-10">

                  {/* COMPETENCIES */}
                  <section>
                    <ResumeHeading>Core Competencies</ResumeHeading>

                    <div className="space-y-5">
                      {skills.map((group) => {
                        const Icon = group.icon;

                        return (
                          <div key={group.title}>
                            <div className="mb-1.5 flex items-center gap-2">
                              <Icon size={15} className="shrink-0 text-blue-700" />
                              <h3 className="text-[11px] font-extrabold leading-5 text-[#183554]">
                                {group.title}
                              </h3>
                            </div>

                            <p className="text-[11px] leading-[1.8] text-slate-600">
                              {group.items}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </section>

                  {/* LANGUAGES */}
                  <section className="mt-8">
                    <ResumeHeading>Languages</ResumeHeading>

                    <div className="space-y-3">
                      <div>
                        <p className="text-xs font-bold text-[#183554]">
                          English
                        </p>
                        <p className="text-[11px] text-slate-500">Fluent</p>
                      </div>

                      <div>
                        <p className="text-xs font-bold text-[#183554]">
                          Swahili
                        </p>
                        <p className="text-[11px] text-slate-500">Fluent</p>
                      </div>
                    </div>
                  </section>

                  {/* REFERENCES */}
                  <section className="mt-8">
                    <ResumeHeading>References</ResumeHeading>

                    <p className="text-xs leading-6 text-slate-600">
                      Professional references are available upon request.
                    </p>
                  </section>

                  {/* PROFILE HIGHLIGHT */}
                  <div className="mt-9 rounded-xl bg-[#15345b] p-4 text-white">
                    <p className="text-[10px] font-bold uppercase tracking-[0.17em] text-blue-300">
                      Professional Approach
                    </p>

                    <p className="mt-3 text-xs leading-6 text-blue-50">
                      Combining technical knowledge, creativity,
                      communication and business understanding to deliver
                      practical solutions.
                    </p>
                  </div>
                </aside>
              </div>

              {/* DOCUMENT FOOTER */}
              <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4 md:px-10">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Ndilla Ayubu Samweli · Professional Profile
                </p>

                <p className="text-[10px] text-slate-400">
                  Dar es Salaam, Tanzania
                </p>
              </footer>
            </article>
          </Reveal>

          {/* DOWNLOAD BOTTOM */}
          <Reveal>
            <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl bg-[#142d4e] p-6 text-center text-white sm:flex-row sm:text-left md:p-8">
              <div>
                <h2 className="text-xl font-bold">
                  Download my professional CV
                </h2>
                <p className="mt-1 text-sm text-blue-200">
                  Keep a copy of my professional background and qualifications.
                </p>
              </div>

              <a
                href={CV_URL}
                download="Ndilla-Ayubu-Samweli-CV.pdf"
                className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#142d4e] transition hover:bg-blue-50"
              >
                <Download size={17} />
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
