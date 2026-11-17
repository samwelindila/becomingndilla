import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";

// ✏️ RENAME, REORDER OR MOVE MENU ITEMS HERE
const links = [
  { to: "/", label: "Home", end: true },
  {
    group: "About",
    items: [
      { to: "/about", label: "About Me" },
      { to: "/journey", label: "Journey" },
    ],
  },
  {
    group: "Work",
    items: [
      { to: "/projects", label: "Projects" },
      { to: "/portfolio", label: "Portfolio" },
      { to: "/ventures", label: "Ventures" },
    ],
  },
  {
    group: "Hire & Shop",
    items: [
      { to: "/services", label: "Services" },
      { to: "/marketplace", label: "Marketplace" },
    ],
  },
  { to: "/blog", label: "Blog" },
];

// Same animated underline as your original design
const underline = (active) =>
  `relative whitespace-nowrap text-sm font-medium transition-colors
   after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:rounded-full
   after:bg-[var(--accent)] after:transition-all after:duration-300
   ${
     active
       ? "text-[var(--accent)] after:w-1/2"
       : "text-[var(--text-muted)] hover:text-[var(--navy)] after:w-0 hover:after:w-1/2"
   }`;

const linkClass = ({ isActive }) => underline(isActive);

/* ---------- Desktop dropdown ---------- */
function Dropdown({ item, pathname }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const active = item.items.some((i) => pathname.startsWith(i.to));

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <li ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="true"
        className={`inline-flex items-center gap-1 ${underline(active || open)}`}
      >
        {item.group}
        <ChevronDown size={14} className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <ul className="absolute left-1/2 top-full z-10 mt-5 w-48 -translate-x-1/2 rounded-xl border border-[var(--border)] bg-white p-2 shadow-lg">
          {item.items.map((i) => (
            <li key={i.to}>
              <NavLink
                to={i.to}
                className={({ isActive }) =>
                  `block rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-[var(--bg-soft)] ${
                    isActive ? "text-[var(--accent)]" : "text-[var(--navy)]"
                  }`
                }
              >
                {i.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

/* ---------- Phone dropdown ---------- */
function MobileGroup({ item, pathname }) {
  const [open, setOpen] = useState(false);
  const active = item.items.some((i) => pathname.startsWith(i.to));

  return (
    <li>
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className={`flex w-full items-center justify-between py-3 text-base font-medium ${
          active || open ? "text-[var(--accent)]" : "text-[var(--navy)]"
        }`}
      >
        {item.group}
        <ChevronDown size={18} className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <ul className="mb-2 ml-1 border-l-2 border-[var(--accent-soft)] pl-4">
          {item.items.map((i) => (
            <li key={i.to}>
              <NavLink
                to={i.to}
                className={({ isActive }) =>
                  `block py-2.5 text-[15px] font-medium ${
                    isActive ? "text-[var(--accent)]" : "text-[var(--text-muted)]"
                  }`
                }
              >
                {i.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the phone menu whenever a page is opened
  useEffect(() => setOpen(false), [pathname]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 px-4 pt-3 transition-colors duration-300 sm:px-6 sm:pt-4 ${
        solid ? "bg-white pb-3" : "bg-transparent pb-0"
      }`}
    >
      <div
        className={`mx-auto max-w-6xl rounded-2xl border border-[var(--border)] transition-all duration-300 ${
          solid ? "bg-white shadow-lg" : "bg-white/80 shadow-sm backdrop-blur-xl"
        }`}
      >
        {/* Desktop: 3 columns, so the links sit in the exact centre */}
        <nav className="flex h-14 items-center justify-between px-5 md:px-6 lg:grid lg:grid-cols-[1fr_auto_1fr]">
          <Link
            to="/"
            className="justify-self-start font-[var(--font-heading)] text-xl font-bold text-[var(--navy)]"
          >
            Becoming<span className="text-[var(--accent)]">Ndilla</span>
          </Link>

          <ul className="hidden items-center justify-center gap-8 lg:flex">
            {links.map((l) =>
              l.group ? (
                <Dropdown key={l.group} item={l} pathname={pathname} />
              ) : (
                <li key={l.to}>
                  <NavLink to={l.to} end={l.end} className={linkClass}>
                    {l.label}
                  </NavLink>
                </li>
              )
            )}
          </ul>

          <div className="hidden justify-self-end lg:block">
            <Link to="/contact" className="btn-primary !px-5 !py-2 !text-sm">
              Contact
            </Link>
          </div>

          <button
            className="lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Phone menu */}
        {open && (
          <div className="max-h-[70vh] overflow-y-auto border-t border-[var(--border)] lg:hidden">
            <ul className="flex flex-col px-5 py-2">
              {links.map((l) =>
                l.group ? (
                  <MobileGroup key={l.group} item={l} pathname={pathname} />
                ) : (
                  <li key={l.to}>
                    <NavLink
                      to={l.to}
                      end={l.end}
                      className={({ isActive }) =>
                        `block py-3 text-base font-medium ${
                          isActive ? "text-[var(--accent)]" : "text-[var(--navy)]"
                        }`
                      }
                    >
                      {l.label}
                    </NavLink>
                  </li>
                )
              )}
              <li className="py-3">
                <Link to="/contact" className="btn-primary w-full">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}