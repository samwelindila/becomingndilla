
import { useCallback, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import {
  Loader2,
  Pencil,
  Plus,
  Search,
  Trash2,
  X,
  Image as ImageIcon,
} from "lucide-react";

import api from "../../lib/api";
import { authConfig, clearToken } from "../../lib/adminAuth";

import RecordForm, {
  blankFrom,
  inputCls,
  prepareForSave,
  resources,
} from "./RecordForm";

// ---------- IMAGE HELPERS ----------

const thumbOf = (item) =>
  item?.image ||
  item?.thumbnail ||
  item?.thumb ||
  item?.cover ||
  item?.logo ||
  item?.photo ||
  item?.poster ||
  "";

// Normalize legacy image fields for Posts and Products.
const normalizeRecord = (record, resource) => {
  if (!record || typeof record !== "object") return record;

  if (resource.key !== "posts" && resource.key !== "products") {
    return record;
  }

  return {
    ...record,
    image: thumbOf(record),
  };
};

// ---------- RECORD HELPERS ----------

const titleOf = (item, resource) =>
  item?.[resource.titleKey] ||
  item?.name ||
  item?.title ||
  "Untitled";

// Try database ID first, then slug.
async function withKeys(method, base, item, data) {
  const keys = [item?._id, item?.slug].filter(Boolean);

  if (!keys.length) {
    throw new Error("This record has no ID or slug.");
  }

  let lastErr;

  for (const key of keys) {
    try {
      return await api.request({
        method,
        url: `${base}/${encodeURIComponent(key)}`,
        data,
        ...authConfig(),
      });
    } catch (error) {
      lastErr = error;

      if (error?.response?.status !== 404) {
        throw error;
      }
    }
  }

  throw lastErr || new Error("Record not found.");
}

export default function AdminResource() {
  const { key } = useParams();
  const navigate = useNavigate();

  const resource = resources.find((r) => r.key === key);

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  const [editor, setEditor] = useState(null);
  const [opening, setOpening] = useState(null);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  // ---------- AUTHENTICATION ----------

  const handleAuth = useCallback(
    (err) => {
      const status = err?.response?.status;

      if (status === 401 || status === 403) {
        clearToken();
        navigate("/admin/login", { replace: true });
        return true;
      }

      return false;
    },
    [navigate]
  );

  // ---------- LOAD RECORDS ----------

  const load = useCallback(async () => {
    if (!resource) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await api.get(resource.path, authConfig());

      if (!Array.isArray(res.data)) {
        throw new Error("The server returned an invalid list.");
      }

      setItems(
        res.data.map((item) => normalizeRecord(item, resource))
      );
    } catch (err) {
      if (!handleAuth(err)) {
        setError(
          err?.response?.data?.message ||
            "Could not load this list. Check your server connection."
        );
      }
    } finally {
      setLoading(false);
    }
  }, [resource, handleAuth]);

  useEffect(() => {
    setItems([]);
    setQuery("");
    setEditor(null);
    setError("");
    setNotice("");

    load();
  }, [load]);

  // ---------- EDITOR KEYBOARD HANDLING ----------

  useEffect(() => {
    if (!editor) return;

    const onKey = (e) => {
      if (e.key === "Escape" && !saving) {
        setEditor(null);
        setError("");
      }
    };

    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [editor, saving]);

  // ---------- NOTIFICATIONS ----------

  const flash = (message) => {
    setNotice(message);

    window.setTimeout(() => {
      setNotice("");
    }, 2500);
  };

  // ---------- CREATE RECORD ----------

  const openNew = () => {
    setError("");

    setEditor({
      item: null,
      value: blankFrom(resource.template),
    });
  };

  // ---------- EDIT RECORD ----------

  const openEdit = async (item) => {
    setError("");

    const recordId = item._id || item.slug;

    setOpening(recordId);

    try {
      let full = item;

      const keys = [item._id, item.slug].filter(Boolean);

      // Fetch the complete record where possible.
      for (const id of keys) {
        try {
          const res = await api.get(
            `${resource.path}/${encodeURIComponent(id)}`,
            authConfig()
          );

          if (res.data && typeof res.data === "object") {
            full = res.data;
            break;
          }
        } catch (err) {
          if (
            err?.response?.status === 401 ||
            err?.response?.status === 403
          ) {
            handleAuth(err);
            return;
          }
        }
      }

      const normalized = normalizeRecord(full, resource);

      setEditor({
        item,
        value: {
          ...blankFrom(resource.template),
          ...normalized,
        },
      });
    } catch (err) {
      if (!handleAuth(err)) {
        setError(
          err?.response?.data?.message ||
            err.message ||
            "Could not open this record."
        );
      }
    } finally {
      setOpening(null);
    }
  };

  // ---------- SAVE RECORD ----------

  const save = async () => {
    if (!editor || saving) return;

    setSaving(true);
    setError("");

    try {
      const body = prepareForSave(
        editor.value,
        resource.template,
        !editor.item
      );

      // Validate product title.
      if (
        resource.key === "products" &&
        !String(body.title || "").trim()
      ) {
        throw new Error("Please enter a product title.");
      }

      // Always preserve the selected image for Posts and Products.
      if (
        resource.key === "posts" ||
        resource.key === "products"
      ) {
        body.image = editor.value.image || "";
      }

      if (editor.item) {
        await withKeys(
          "put",
          resource.path,
          editor.item,
          body
        );
      } else {
        await api.post(
          resource.path,
          body,
          authConfig()
        );
      }

      setEditor(null);
      flash("Record saved successfully.");

      await load();
    } catch (err) {
      if (!handleAuth(err)) {
        setError(
          err?.response?.data?.message ||
            err.message ||
            "Could not save this record."
        );
      }
    } finally {
      setSaving(false);
    }
  };

  // ---------- DELETE RECORD ----------

  const remove = async (item) => {
    const title = titleOf(item, resource);

    if (
      !window.confirm(
        `Delete "${title}"? This cannot be undone.`
      )
    ) {
      return;
    }

    setError("");

    try {
      await withKeys("delete", resource.path, item);

      flash("Record deleted successfully.");

      await load();
    } catch (err) {
      if (!handleAuth(err)) {
        setError(
          err?.response?.data?.message ||
            "Could not delete this record."
        );
      }
    }
  };

  // ---------- SEARCH ----------

  const q = query.trim().toLowerCase();

  const shown = items.filter((item) => {
    if (!q) return true;

    const title = titleOf(item, resource).toLowerCase();

    const subtitle = String(
      item[resource.subKey] || ""
    ).toLowerCase();

    return title.includes(q) || subtitle.includes(q);
  });

  // ---------- INVALID RESOURCE ----------

  if (!resource) {
    return <Navigate to="/admin" replace />;
  }

  // ---------- INTERFACE ----------

  return (
    <div className="mx-auto max-w-5xl">

      {/* HEADER */}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[var(--navy)]">
            {resource.label}
          </h1>

          <p className="mt-0.5 text-sm text-[var(--text-muted)]">
            {items.length} saved
          </p>
        </div>

        <button
          type="button"
          onClick={openNew}
          className="inline-flex items-center gap-1.5 rounded-full bg-[var(--navy)] px-4 py-2 text-sm font-semibold !text-white transition-colors hover:bg-[var(--accent)]"
        >
          <Plus size={15} />
          New {resource.singular}
        </button>
      </div>

      {/* SEARCH */}

      <label className="relative mt-5 block w-full sm:w-72">
        <span className="sr-only">Search</span>

        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
        />

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Search ${resource.label.toLowerCase()}`}
          className={`${inputCls} rounded-full py-2 pl-9 text-xs`}
        />
      </label>

      {/* NOTIFICATIONS */}

      {notice && (
        <p className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">
          {notice}
        </p>
      )}

      {error && !editor && (
        <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      {/* RECORD LIST */}

      <div className="mt-5 space-y-2">
        {loading ? (
          <p className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
            <Loader2 size={15} className="animate-spin" />
            Loading...
          </p>
        ) : shown.length === 0 ? (
          <div className="rounded-xl border border-dashed border-[var(--border)] bg-white px-5 py-10 text-center">
            <p className="font-semibold text-[var(--navy)]">
              Nothing here yet
            </p>

            <p className="mt-1 text-sm text-[var(--text-muted)]">
              Add your first {resource.singular} using the button above.
            </p>
          </div>
        ) : (
          shown.map((item) => {
            const thumb = thumbOf(item);

            const id =
              item._id ||
              item.slug ||
              titleOf(item, resource);

            const recordId = item._id || item.slug;

            return (
              <div
                key={id}
                className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-white p-3 shadow-sm"
              >
                {/* IMAGE PREVIEW */}

                <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[var(--bg-soft)]">
                  {thumb ? (
                    <img
                      src={thumb}
                      alt={titleOf(item, resource)}
                      className="h-full w-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    <ImageIcon
                      size={20}
                      className="text-slate-400"
                    />
                  )}
                </div>

                {/* RECORD INFORMATION */}

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-[var(--navy)]">
                    {titleOf(item, resource)}
                  </p>

                  <p className="truncate text-xs text-[var(--text-muted)]">
                    {item[resource.subKey] || "—"}
                  </p>

                  {resource.key === "products" && (
                    <p className="mt-0.5 text-xs text-[var(--text-muted)]">
                      {item.price === 0
                        ? "Free"
                        : item.price
                          ? `Price: ${item.price}`
                          : "Ask for price"}
                    </p>
                  )}
                </div>

                {/* EDIT */}

                <button
                  type="button"
                  onClick={() => openEdit(item)}
                  disabled={opening === recordId}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] px-3 py-1.5 text-xs font-semibold text-[var(--navy)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] disabled:opacity-60"
                >
                  {opening === recordId ? (
                    <Loader2
                      size={13}
                      className="animate-spin"
                    />
                  ) : (
                    <Pencil size={13} />
                  )}

                  Edit
                </button>

                {/* DELETE */}

                <button
                  type="button"
                  onClick={() => remove(item)}
                  aria-label={`Delete ${titleOf(item, resource)}`}
                  className="rounded-full p-2 text-[var(--text-muted)] transition-colors hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            );
          })
        )}
      </div>

      {/* EDITOR DRAWER */}

      {editor && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-slate-950/50 backdrop-blur-sm"
          onClick={() => {
            if (!saving) {
              setEditor(null);
              setError("");
            }
          }}
          role="dialog"
          aria-modal="true"
          aria-label={`${editor.item ? "Edit" : "New"} ${resource.singular}`}
        >
          <div
            className="flex h-full w-full max-w-2xl flex-col bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* DRAWER HEADER */}

            <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
              <h2 className="text-base font-semibold text-[var(--navy)]">
                {editor.item
                  ? `Edit ${resource.singular}`
                  : `New ${resource.singular}`}
              </h2>

              <button
                type="button"
                onClick={() => {
                  if (!saving) {
                    setEditor(null);
                    setError("");
                  }
                }}
                aria-label="Close"
                className="rounded-full p-2 text-[var(--text-muted)] hover:bg-[var(--bg-soft)]"
              >
                <X size={18} />
              </button>
            </div>

            {/* FORM */}

            <div className="flex-1 overflow-y-auto px-5 py-5">
              <RecordForm
                value={editor.value}
                sample={resource.template}
                selects={resource.selects}
                isNew={!editor.item}
                onChange={(value) =>
                  setEditor((current) =>
                    current
                      ? { ...current, value }
                      : current
                  )
                }
              />
            </div>

            {/* DRAWER FOOTER */}

            <div className="border-t border-[var(--border)] px-5 py-4">
              {error && (
                <p className="mb-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                  {error}
                </p>
              )}

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (!saving) {
                      setEditor(null);
                      setError("");
                    }
                  }}
                  disabled={saving}
                  className="rounded-full border border-[var(--border)] px-4 py-2 text-sm font-semibold text-[var(--navy)] hover:border-[var(--accent)] disabled:opacity-60"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={save}
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--navy)] px-5 py-2 text-sm font-semibold !text-white transition-colors hover:bg-[var(--accent)] disabled:opacity-60"
                >
                  {saving && (
                    <Loader2
                      size={14}
                      className="animate-spin"
                    />
                  )}

                  {saving ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
