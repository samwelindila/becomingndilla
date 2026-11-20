import "./config/env.js"; // must stay the first import
import dns from "node:dns";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import connectDB from "./config/db.js";
import { cloudinaryReady } from "./config/cloudinary.js";
import authRoutes from "./routes/auth.js";
import contactRoutes from "./routes/contact.js";
import contentRoutes from "./routes/content.js";
import uploadRoutes from "./routes/upload.js";
import { notFound, errorHandler } from "./middleware/error.js";

// Fixes MongoDB Atlas SRV lookups on some networks
dns.setDefaultResultOrder("ipv4first");

const app = express();

app.set("trust proxy", 1);

const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:5173")
  .split(",")
  .map((o) => o.trim());

app.use(helmet());
app.use(
  cors({
    origin: (origin, cb) => {
      // allow tools like PowerShell/Postman (no origin) and listed sites
      if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
      cb(new Error("Not allowed by CORS"));
    },
  })
);
app.use(express.json({ limit: "1mb" }));

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "BecomingNdilla API is running successfully 🚀",
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    cloudinary: cloudinaryReady(),
    time: new Date().toISOString(),
  });
});

app.use("/api", contentRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    console.log("Cloudinary ready:", cloudinaryReady());
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("Failed to start:", err.message);
    process.exit(1);
  });