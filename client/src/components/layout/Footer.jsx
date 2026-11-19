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

// ---- Your accounts ----
const INSTAGRAM_USERNAME = "becomingndilla";
const INSTAGRAM_URL = `https://instagram.com/${INSTAGRAM_USERNAME}`;

const WHATSAPP_LOCAL = "0613374380"; // local format, converted below
const PHONE_LOCAL = WHATSAPP_LOCAL; // same number for calls

const digits = (n) => n.replace(/[^\d]/g, "");

// Converts 0613374380 -> 255613374380 (Tanzania country code)
const toIntl = (n) => {
  const d = digits(n);
  if (d.startsWith("255")) return d;
  if (d.startsWith("0")) return "255" + d.slice(1);
  return d;
};

const WHATSAPP_INTL = toIntl(WHATSAPP_LOCAL);
const PHONE_INTL = toIntl(PHONE_LOCAL);
const PHONE_DISPLAY = `+${PHONE_INTL.slice(0, 3)} ${PHONE_INTL.slice(3, 6)} ${PHONE_INTL.slice(6, 9)} ${PHONE_INTL.slice(9)}`;

const WHATSAPP_URL = `https://wa.me/${WHATSAPP_INTL}?text=${encodeURIComponent(
  "Hi Ndilla, I found you through your website."
)}`;

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
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                aria-label="Chat on WhatsApp"
                className={linkClass}
              >
                <Tile type="whatsapp" />
                WhatsApp
              </a>
            </li>

            <li>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                aria-label="Follow on Instagram"
                className={linkClass}
              >
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
              <a href={`tel:+${PHONE_INTL}`} className={linkClass}>
                <Tile type="phone" />
                {PHONE_DISPLAY}
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