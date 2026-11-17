import { Link, NavLink, Navigate, Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, LogOut, ExternalLink } from "lucide-react";
import { resources } from "./RecordForm";
import { getToken, clearToken } from "../../lib/adminAuth";

const linkCls = ({ isActive }) =>
  `flex shrink-0 items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
    isActive
      ? "bg-[var(--navy)] !text-white"
      : "text-[var(--text-muted)] hover:bg-[var(--bg-soft)] hover:text-[var(--navy)]"
  }`;

export default function AdminLayout() {
  const navigate = useNavigate();

  if (!getToken()) return <Navigate to="/admin/login" replace />;

  const logout = () => {
    clearToken();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-[var(--bg-soft)] lg:flex">
      <aside className="border-b border-[var(--border)] bg-white lg:sticky lg:top-0 lg:h-screen lg:w-60 lg:shrink-0 lg:border-b-0 lg:border-r">
        <div className="flex items-center justify-between gap-3 px-4 py-3 lg:block lg:px-5 lg:py-5">
          <div>
            <p className="text-base font-bold text-[var(--navy)]">BecomingNdilla</p>
            <p className="text-xs text-[var(--text-muted)]">Admin dashboard</p>
          </div>
          <div className="flex items-center gap-1 lg:hidden">
            <Link to="/" target="_blank" aria-label="View site" className="rounded-lg p-2 text-[var(--text-muted)] hover:bg-[var(--bg-soft)]">
              <ExternalLink size={16} />
            </Link>
            <button onClick={logout} aria-label="Log out" className="rounded-lg p-2 text-[var(--text-muted)] hover:bg-[var(--bg-soft)]">
              <LogOut size={16} />
            </button>
          </div>
        </div>

        <nav className="flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-col lg:overflow-visible lg:pb-0">
          <NavLink to="/admin" end className={linkCls}>
            <LayoutDashboard size={16} /> Overview
          </NavLink>
          {resources.map(({ key, label, icon: Icon }) => (
            <NavLink key={key} to={`/admin/${key}`} className={linkCls}>
              <Icon size={16} /> {label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden space-y-1 border-t border-[var(--border)] p-3 lg:absolute lg:bottom-0 lg:block lg:w-full">
          <Link to="/" target="_blank" className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-[var(--text-muted)] hover:bg-[var(--bg-soft)] hover:text-[var(--navy)]">
            <ExternalLink size={16} /> View site
          </Link>
          <button onClick={logout} className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-[var(--text-muted)] hover:bg-[var(--bg-soft)] hover:text-[var(--navy)]">
            <LogOut size={16} /> Log out
          </button>
        </div>
      </aside>

      <main className="min-w-0 flex-1 p-4 md:p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
}