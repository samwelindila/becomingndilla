import { useState } from "react";
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import PageHero from "../components/Common/PageHero";
import api, { errorMessage } from "../lib/api";
import { profile } from "../data/content";

const reasons = ["Project / freelance work", "Job opportunity", "Collaboration", "Other"];

const labelClass = "mb-1 block text-xs font-semibold text-[var(--navy)]";
const inputClass = "input !py-2 !text-sm";

const emptyForm = { name: "", email: "", reason: reasons[0], message: "", website: "" };

export default function Contact() {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [error, setError] = useState("");

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;

    setStatus("sending");
    setError("");

    try {
      await api.post("/contact", {
        name: form.name,
        email: form.email,
        subject: form.reason,
        message: form.message,
        website: form.website, // hidden spam-trap field, must stay empty for real visitors
      });
      setForm(emptyForm);
      setStatus("sent");
    } catch (err) {
      setError(errorMessage(err));
      setStatus("error");
    }
  };

  // GitHub is left out, same as in the footer
  const socials = profile.socials.filter((s) => s.href && s.label.toLowerCase() !== "github");

  return (
    <>
      <PageHero
        label="Contact"
        title="Let's talk"
        text="For projects, jobs, collaborations or just to say hello. I read every message."
      />

      <section className="section !pb-8 !pt-4 md:!pb-12 md:!pt-6">
        <div className="container mx-auto grid max-w-5xl gap-5 lg:grid-cols-[1.4fr_1fr] lg:gap-6">
          <form onSubmit={submit} className="card space-y-3 p-5 hover:!transform-none md:p-6">
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label htmlFor="c-name" className={labelClass}>Name</label>
                <input
                  id="c-name"
                  name="name"
                  required
                  maxLength={100}
                  value={form.name}
                  onChange={update}
                  className={inputClass}
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="c-email" className={labelClass}>Email</label>
                <input
                  id="c-email"
                  name="email"
                  type="email"
                  required
                  maxLength={150}
                  value={form.email}
                  onChange={update}
                  className={inputClass}
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="c-reason" className={labelClass}>What is this about?</label>
              <select
                id="c-reason"
                name="reason"
                value={form.reason}
                onChange={update}
                className={inputClass}
              >
                {reasons.map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="c-message" className={labelClass}>Message</label>
              <textarea
                id="c-message"
                name="message"
                required
                rows={4}
                maxLength={4000}
                value={form.message}
                onChange={update}
                className={`${inputClass} resize-none`}
                placeholder="Tell me a little about what you have in mind..."
              />
            </div>

            {/* Spam trap: hidden from people, bots tend to fill it in */}
            <div className="hidden" aria-hidden="true">
              <label>
                Website
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.website}
                  onChange={update}
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="btn-primary !px-5 !py-2.5 !text-sm disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === "sending" ? (
                <>
                  Sending <Loader2 size={14} className="animate-spin" />
                </>
              ) : (
                <>
                  Send message <Send size={14} />
                </>
              )}
            </button>

            {/* Result messages */}
            <div aria-live="polite">
              {status === "sent" && (
                <p className="flex items-start gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700">
                  <CheckCircle2 size={14} className="mt-px shrink-0" />
                  Thank you! Your message was sent. I will reply as soon as I can.
                </p>
              )}
              {status === "error" && (
                <p className="flex items-start gap-2 rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-700">
                  <AlertCircle size={14} className="mt-px shrink-0" />
                  <span>
                    {error}{" "}
                    <a href={`mailto:${profile.email}`} className="underline">
                      Or email me directly.
                    </a>
                  </span>
                </p>
              )}
            </div>
          </form>

          <aside className="space-y-3">
            {[
              { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
              { icon: Phone, label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}` },
              { icon: MapPin, label: "Location", value: profile.location },
            ].map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="card flex items-center gap-3 p-3.5 hover:!transform-none">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--accent-soft)] text-[var(--accent)]">
                  <Icon size={17} />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                    {label}
                  </p>
                  {href ? (
                    <a
                      href={href}
                      className="break-all text-sm font-medium text-[var(--navy)] hover:text-[var(--accent)]"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm font-medium text-[var(--navy)]">{value}</p>
                  )}
                </div>
              </div>
            ))}

            {socials.length > 0 && (
              <div className="card p-3.5 hover:!transform-none">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                  Find me online
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="tag !text-[11px] hover:bg-[var(--accent)] hover:text-white"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </section>
    </>
  );
}