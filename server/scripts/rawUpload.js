import "dotenv/config";
import crypto from "node:crypto";

const { CLOUDINARY_CLOUD_NAME: cloud, CLOUDINARY_API_KEY: key, CLOUDINARY_API_SECRET: secret } =
  process.env;

const timestamp = Math.floor(Date.now() / 1000);
const folder = "becomingndilla/test";

// Cloudinary signature: sorted params + secret, SHA-1
const signature = crypto
  .createHash("sha1")
  .update(`folder=${folder}&timestamp=${timestamp}${secret}`)
  .digest("hex");

const form = new FormData();
form.append("file", "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7");
form.append("api_key", key);
form.append("timestamp", String(timestamp));
form.append("folder", folder);
form.append("signature", signature);

const url = `https://api.cloudinary.com/v1_1/${cloud}/image/upload`;
console.log("POST", url);

try {
  const res = await fetch(url, { method: "POST", body: form });
  const text = await res.text();

  console.log("Status:", res.status);
  console.log("content-type:", res.headers.get("content-type"));
  console.log("server:", res.headers.get("server"));
  console.log("x-cld-error:", res.headers.get("x-cld-error"));
  console.log("Body (first 400 chars):");
  console.log(text.slice(0, 400));
} catch (err) {
  console.error("Request failed:", err.cause?.message || err.message);
}