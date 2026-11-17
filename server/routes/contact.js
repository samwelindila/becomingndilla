import { Router } from "express";
import mongoose from "mongoose";
import rateLimit from "express-rate-limit";
import Message from "../models/Message.js";
import { protect } from "../middleware/auth.js";
import { sendContactEmail } from "../utils/mailer.js";
import asyncHandler from "../utils/asyncHandler.js";

const router = Router();

const sendLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many messages. Please try again later." },
});

const emailOk = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

// POST /api/contact  (public)
router.post(
  "/",
  sendLimiter,
  asyncHandler(async (req, res) => {
    const { name, email, subject, message, website } = req.body;

    // Hidden "website" field: real people leave it empty, bots fill it in
    if (website) return res.status(201).json({ message: "Message sent" });

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      res.status(400);
      throw new Error("Name, email and message are required");
    }
    if (!emailOk(email.trim())) {
      res.status(400);
      throw new Error("Please enter a valid email address");
    }

    const saved = await Message.create({
      name,
      email,
      subject: subject || "",
      message,
    });

    // The message is already saved, so an email problem never loses it
    try {
      await sendContactEmail(saved);
    } catch (err) {
      console.error("Email failed:", err.message);
    }

    res.status(201).json({ message: "Message sent" });
  })
);

// ---- Admin only ----

// GET /api/contact  (newest first, optional ?unread=true)
router.get(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const filter = req.query.unread === "true" ? { read: false } : {};
    const messages = await Message.find(filter).sort({ createdAt: -1 });
    res.json(messages);
  })
);

// PATCH /api/contact/:id/read
router.patch(
  "/:id/read",
  protect,
  asyncHandler(async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
      res.status(400);
      throw new Error("Invalid id");
    }
    const msg = await Message.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
    if (!msg) {
      res.status(404);
      throw new Error("Message not found");
    }
    res.json(msg);
  })
);

// DELETE /api/contact/:id
router.delete(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
      res.status(400);
      throw new Error("Invalid id");
    }
    const msg = await Message.findByIdAndDelete(req.params.id);
    if (!msg) {
      res.status(404);
      throw new Error("Message not found");
    }
    res.json({ message: "Deleted" });
  })
);

export default router;