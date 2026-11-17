import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";

const {
  CLOUDINARY_CLOUD_NAME: name,
  CLOUDINARY_API_KEY: key,
  CLOUDINARY_API_SECRET: secret,
} = process.env;

// Shows hidden spaces or quotes in your values
console.log("cloud name:", JSON.stringify(name));
console.log("api key length:", key?.length, "(usually 15 digits)");
console.log("api secret length:", secret?.length, "(usually 27 characters)");
console.log("CLOUDINARY_URL also set:", Boolean(process.env.CLOUDINARY_URL));

cloudinary.config({ cloud_name: name, api_key: key, api_secret: secret, secure: true });

try {
  const ping = await cloudinary.api.ping();
  console.log("1) Credentials OK:", ping);
} catch (e) {
  console.error("1) Credentials FAILED:", e.error?.message || e.message, e.error?.http_code || e.http_code || "");
}

try {
  // A 1-pixel image, so no file is needed
  const up = await cloudinary.uploader.upload(
    "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
    { folder: "becomingndilla/test" }
  );
  console.log("2) Upload OK:", up.secure_url);
} catch (e) {
  console.error("2) Upload FAILED:", e.error?.message || e.message, e.error?.http_code || e.http_code || "");
}