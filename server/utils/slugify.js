export function slugify(text = "") {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

// Makes a slug that no other document in the collection is using
export async function uniqueSlug(Model, text, excludeId) {
  const base = slugify(text) || "item";
  let slug = base;
  let n = 2;

  while (
    await Model.exists({
      slug,
      ...(excludeId ? { _id: { $ne: excludeId } } : {}),
    })
  ) {
    slug = `${base}-${n++}`;
  }
  return slug;
}