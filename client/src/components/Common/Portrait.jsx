// When you have a professional photo, put it in /public/ndilla.jpg
// and set USE_PHOTO to true.
const USE_PHOTO = true;

export default function Portrait({ className = "" }) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute -inset-4 rounded-[32px] bg-gradient-to-br from-[var(--accent-soft)] to-transparent" />
      <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--bg-soft)]">
        {USE_PHOTO ? (
          <img src="/ndilla.jpg" alt="Ndilla Samweli" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-b from-[var(--accent-soft)] to-white">
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-[var(--navy)] font-[var(--font-heading)] text-5xl font-bold text-white">
              N
            </div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">
              Portrait coming soon
            </p>
          </div>
        )}
      </div>
    </div>
  );
}