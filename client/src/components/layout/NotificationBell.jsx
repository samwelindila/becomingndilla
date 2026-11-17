import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Bell } from "lucide-react";
import { notices } from "../../data/content";

const KEY = "bn-seen-notices";

const readSeen = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
};

const writeSeen = (ids) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(ids));
  } catch {
    /* storage unavailable, ignore */
  }
};

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [seen, setSeen] = useState(readSeen);
  const [fresh, setFresh] = useState([]);
  const ref = useRef(null);

  const unread = notices.filter((n) => !seen.includes(n.id));

  const toggle = () => {
    if (!open) {
      setFresh(unread.map((n) => n.id));
      const all = notices.map((n) => n.id);
      setSeen(all);
      writeSeen(all);
    }
    setOpen(!open);
  };

  // Close on outside click or Escape
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={toggle}
        aria-label="Notifications"
        className="relative flex h-9 w-9 items-center justify-center rounded-full text-[var(--navy)] transition hover:bg-[var(--accent-soft)]"
      >
        <Bell size={18} />
        {unread.length > 0 && (
          <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-60" />
            <span className="relative flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
              {unread.length}
            </span>
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            className="absolute right-0 top-full z-50 mt-3 w-72 overflow-hidden rounded-xl border border-[var(--border)] bg-white shadow-xl"
          >
            <p className="border-b border-[var(--border)] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
              Notifications
            </p>

            {notices.length === 0 ? (
              <p className="px-4 py-4 text-sm">Nothing new right now.</p>
            ) : (
              <ul className="max-h-72 divide-y divide-[var(--border)] overflow-y-auto">
                {notices.map((n) => (
                  <li key={n.id}>
                    <Link
                      to={n.to || "/"}
                      onClick={() => setOpen(false)}
                      className="flex gap-3 px-4 py-3 transition hover:bg-[var(--bg-soft)]"
                    >
                      <span
                        className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                          fresh.includes(n.id) ? "bg-[var(--accent)]" : "bg-transparent"
                        }`}
                      />
                      <span className="min-w-0">
                        <span className="block text-sm font-semibold text-[var(--navy)]">
                          {n.title}
                        </span>
                        <span className="block text-xs leading-snug text-[var(--text-muted)]">
                          {n.text}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}