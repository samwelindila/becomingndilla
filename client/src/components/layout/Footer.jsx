import { Link } from "react-router-dom";
import { Mail, Phone } from "lucide-react";
import {
  FaInstagram,
  FaWhatsapp,
  FaLinkedinIn,
  FaXTwitter,
  FaYoutube,
  FaFacebookF,
} from "react-icons/fa6";
import { profile } from "../../data/content";

// Edit these lines (or add `instagram`, `phone` and `whatsapp` to `profile` in content.js)
const INSTAGRAM_URL = profile.instagram || "https://instagram.com/your_username";
const PHONE = profile.phone || "+255 700 000 000";
const WHATSAPP = profile.whatsapp || PHONE; // use the same number unless yours differs

const digits = (n) => n.replace(/[^\d]/g, "");

const nav = [
  ["/about", "About"],
  ["/projects", "Projects"],
  ["/ventures", "Ventures"],
  ["/journey", "Journey"],
  ["/blog", "Blog"],
  ["/contact", "Contact"],
];

// Real brand backgrounds for each icon tile
const brand = {
  instagram: {
    Icon: FaInstagram,
    bg: "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)",
  },
  whatsapp: { Icon: FaWhatsapp, bg: "#25D366" },
  linkedin: { Icon: FaLinkedinIn, bg: "#0A66C2" },
  twitter: { Icon: FaXTwitter, bg: "#000000" },
  x: { Icon: FaXTwitter, bg: "#000000" },
  youtube: { Icon: FaYoutube, bg: "#FF0000" },
  facebook: { Icon: FaFacebookF, bg: "#1877F2" },
  phone: { Icon: Phone, bg: "#0EA5E9" },
  email: { Icon: Mail, bg: "#EA4335" },
};

function Tile({ type }) {
  const { Icon, bg } = brand[type] || {};
  if (!Icon) return null;
  return (
    <span
      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-white ring-1 ring-white/20"
      style={{ background: bg }}
    >
      <Icon size={14} />
    </span>
  );
}

const linkClass =
  "inline-flex items-center gap-3 text-white/80 transition hover:text-white";

export default function Footer() {
  // Drop GitHub, and drop any Instagram/WhatsApp entry so they aren't shown twice
  const socials = profile.socials.filter((s) => {
    if (!s.href) return false;
    const name = s.label.toLowerCase();
    return name !== "github" && name !== "instagram" && name !== "whatsapp";
  });

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--navy)] text-white">
      <div className="container grid gap-6 py-8 md:grid-cols-3 md:gap-8">
        <div>
          <p className="font-[var(--font-heading)] text-xl font-bold">
            Becoming<span className="text-[var(--accent)]">Ndilla</span>
          </p>
          <p className="mt-2 max-w-xs text-sm !text-white/60">{profile.tagline}</p>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-wider !text-white/50">Explore</h4>
          <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
            {nav.map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="text-white/80 hover:text-white">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-wider !text-white/50">Connect</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a
                href={`https://wa.me/${digits(WHATSAPP)}`}
                target="_blank"
                rel="noreferrer"
                className={linkClass}
              >
                <Tile type="whatsapp" />
                WhatsApp
              </a>
            </li>

            <li>
              <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className={linkClass}>
                <Tile type="instagram" />
                Instagram
              </a>
            </li>

            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer" className={linkClass}>
                  <Tile type={s.label.toLowerCase()} />
                  {s.label}
                </a>
              </li>
            ))}

            <li>
              <a href={`tel:+${digits(PHONE)}`} className={linkClass}>
                <Tile type="phone" />
                {PHONE}
              </a>
            </li>

            <li>
              <a href={`mailto:${profile.email}`} className={`${linkClass} break-all`}>
                <Tile type="email" />
                {profile.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-3 text-center text-xs text-white/50">
        © {new Date().getFullYear()} {profile.name}. All rights reserved.
      </div>
    </footer>
  );
}