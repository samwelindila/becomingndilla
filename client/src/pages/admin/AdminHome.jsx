import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import api from "../../lib/api";
import { resources } from "./RecordForm";

export default function AdminHome() {
  const [counts, setCounts] = useState({});

  useEffect(() => {
    let cancelled = false;
    Promise.allSettled(resources.map((r) => api.get(r.path))).then((results) => {
      if (cancelled) return;
      const next = {};
      results.forEach((res, i) => {
        next[resources[i].key] =
          res.status === "fulfilled" && Array.isArray(res.value.data) ? res.value.data.length : null;
      });
      setCounts(next);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="text-2xl font-bold text-[var(--navy)]">Overview</h1>
      <p className="mt-1 text-sm text-[var(--text-muted)]">
        Pick a section to add, edit or delete content. Changes appear on the public site right away.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {resources.map(({ key, label, icon: Icon }) => (
          <Link
            key={key}
            to={`/admin/${key}`}
            className="group flex items-center gap-4 rounded-xl border border-[var(--border)] bg-white p-4 shadow-sm transition-[border-color,box-shadow] duration-300 hover:border-[var(--accent)] hover:shadow-md"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
              <Icon size={20} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-[var(--navy)]">{label}</p>
              <p className="text-xs text-[var(--text-muted)]">
                {counts[key] === undefined ? "Loading…" : counts[key] === null ? "Not reachable" : `${counts[key]} saved`}
              </p>
            </div>
            <ArrowUpRight
              size={16}
              className="shrink-0 text-[var(--accent)] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}