import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Lock, Loader2 } from "lucide-react";
import api from "../../lib/api";
import { getToken, setToken } from "../../lib/adminAuth";
import { inputCls } from "./RecordForm";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  if (getToken()) return <Navigate to="/admin" replace />;

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      // Adjust the path or the body here if your auth route differs.
      const res = await api.post("/auth/login", { email, password });
      const token = res.data?.token;
      if (!token) throw new Error("No token returned");
      setToken(token);
      navigate("/admin", { replace: true });
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed. Check your details.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--bg-soft)] px-4">
      <form
        onSubmit={submit}
        className="w-full max-w-sm rounded-2xl border border-[var(--border)] bg-white p-6 shadow-lg"
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
          <Lock size={20} />
        </div>
        <h1 className="mt-4 text-xl font-bold text-[var(--navy)]">Admin login</h1>
        <p className="mt-1 text-sm text-[var(--text-muted)]">BecomingNdilla dashboard</p>

        <div className="mt-5 space-y-3">
          <div>
            <label className="mb-1 block text-xs font-semibold text-[var(--navy)]">Email</label>
            <input
              type="email"
              required
              autoComplete="username"
              className={inputCls}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-[var(--navy)]">Password</label>
            <input
              type="password"
              required
              autoComplete="current-password"
              className={inputCls}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={busy}
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--navy)] px-4 py-2.5 text-sm font-semibold !text-white transition-colors hover:bg-[var(--accent)] disabled:opacity-60"
        >
          {busy && <Loader2 size={15} className="animate-spin" />}
          Sign in
        </button>
      </form>
    </div>
  );
}