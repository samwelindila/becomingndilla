import { Router } from "express";
import jwt from "jsonwebtoken";
import rateLimit from "express-rate-limit";
import Admin from "../models/Admin.js";
import { protect } from "../middleware/auth.js";
import asyncHandler from "../utils/asyncHandler.js";

const router = Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many login attempts. Try again in 15 minutes." },
});

// POST /api/auth/login
router.post(
  "/login",
  loginLimiter,
  asyncHandler(async (req, res) => {
    const email = String(req.body.email || "").toLowerCase().trim();
    const password = String(req.body.password || "");

    if (!email || !password) {
      res.status(400);
      throw new Error("Email and password are required");
    }

    const admin = await Admin.findOne({ email }).select("+password");
    const ok = admin && (await admin.matchPassword(password));

    if (!ok) {
      res.status(401);
      throw new Error("Invalid email or password");
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({
      token,
      admin: { id: admin._id, name: admin.name, email: admin.email },
    });
  })
);

// GET /api/auth/me  (checks the token is still valid)
router.get("/me", protect, (req, res) => {
  const { _id, name, email } = req.admin;
  res.json({ admin: { id: _id, name, email } });
});

export default router;