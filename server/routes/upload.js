import { Router } from "express";
import multer from "multer";
import cloudinary, {
  cloudinaryReady,
  missingCloudinaryVars,
} from "../config/cloudinary.js";
import { protect } from "../middleware/auth.js";
import asyncHandler from "../utils/asyncHandler.js";

const router = Router();

const FOLDERS = [
  "projects",
  "posts",
  "ventures",
  "services",
  "products",
  "testimonials",
  "portfolio",
  "general",
];

const optimize = process.env.CLOUDINARY_OPTIMIZE === "true";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /^image\/(jpe?g|png|webp|gif|avif)$/i;

    if (allowedTypes.test(file.mimetype)) return cb(null, true);

    return cb(
      new Error("Only JPG, JPEG, PNG, WEBP, GIF and AVIF images are allowed.")
    );
  },
});

const uploadBuffer = (buffer, folder) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: `becomingndilla/${folder}`,
        resource_type: "image",
      },
      (error, result) => {
        if (error) return reject(error);
        if (!result) {
          return reject(new Error("Cloudinary returned no upload result."));
        }
        resolve(result);
      }
    );

    stream.end(buffer);
  });

const notConfigured = (res) =>
  res.status(500).json({
    message: `Cloudinary is not configured. Missing: ${missingCloudinaryVars().join(", ")}`,
  });

// POST /api/upload?folder=projects
router.post(
  "/",
  protect,
  upload.single("image"),
  asyncHandler(async (req, res) => {
    if (!cloudinaryReady()) return notConfigured(res);

    if (!req.file) {
      return res.status(400).json({
        message: "Please select an image to upload.",
      });
    }

    const folder = FOLDERS.includes(req.query.folder)
      ? req.query.folder
      : "general";

    try {
      const result = await uploadBuffer(req.file.buffer, folder);

      const imageUrl = optimize
        ? result.secure_url.replace("/upload/", "/upload/f_auto,q_auto/")
        : result.secure_url;

      return res.status(201).json({
        success: true,
        message: "Image uploaded successfully.",
        url: imageUrl,
        publicId: result.public_id,
        width: result.width,
        height: result.height,
        format: result.format,
      });
    } catch (error) {
      console.error("CLOUDINARY UPLOAD ERROR:", {
        message: error.message,
        http_code: error.http_code,
        name: error.name,
      });

      return res.status(error.http_code || 502).json({
        success: false,
        message: "Cloudinary upload failed.",
        error: error.message,
        code: error.http_code || null,
      });
    }
  })
);

// DELETE /api/upload
router.delete(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    if (!cloudinaryReady()) return notConfigured(res);

    const { publicId } = req.body;

    if (
      !publicId ||
      typeof publicId !== "string" ||
      !publicId.startsWith("becomingndilla/")
    ) {
      return res.status(400).json({
        message: "A valid Cloudinary publicId is required.",
      });
    }

    const result = await cloudinary.uploader.destroy(publicId);

    if (!["ok", "not found"].includes(result.result)) {
      return res.status(400).json({
        message: "Could not delete the image from Cloudinary.",
      });
    }

    return res.json({
      success: true,
      message: "Image deleted successfully.",
    });
  })
);

// Handle Multer validation errors
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    const message =
      err.code === "LIMIT_FILE_SIZE"
        ? "Image is too large. Maximum allowed size is 5 MB."
        : err.message;

    return res.status(400).json({ message });
  }

  if (err.message?.includes("Only JPG")) {
    return res.status(400).json({ message: err.message });
  }

  next(err);
});

export default router;