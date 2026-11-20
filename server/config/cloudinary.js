import "./env.js";
import { v2 as cloudinary } from "cloudinary";

const REQUIRED = [
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
];

export const missingCloudinaryVars = () =>
  REQUIRED.filter((key) => !process.env[key]);

export const cloudinaryReady = () => missingCloudinaryVars().length === 0;

if (cloudinaryReady()) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
} else {
  console.warn(
    `Cloudinary env variables are missing: ${missingCloudinaryVars().join(", ")}`
  );
}

export default cloudinary;