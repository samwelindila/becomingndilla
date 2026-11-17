const base =
  "https://res.cloudinary.com/dmhxpdtay/image/upload/{T}v1794914527/becomingndilla/general/n0f7ijdww4jgj1yzdlvg.png";

for (const [label, t] of [
  ["with f_auto,q_auto", "f_auto,q_auto/"],
  ["plain original   ", ""],
]) {
  const url = base.replace("{T}", t);
  try {
    const res = await fetch(url, { method: "HEAD" });
    console.log(label, "->", res.status, res.headers.get("x-cld-error") || "");
  } catch (e) {
    console.log(label, "-> failed:", e.message);
  }
}