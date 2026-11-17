import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, index: true },
    excerpt: { type: String, default: "" },
    category: { type: String, trim: true, default: "" },
    type: { type: String, trim: true, default: "article" }, // "article" or "video"
    date: { type: Date, default: Date.now },
    image: { type: String, default: "" },
    videoUrl: { type: String, default: "" },
    readTime: { type: String, default: "" },
    tags: [{ type: String, trim: true }],
    content: { type: mongoose.Schema.Types.Mixed, default: "" },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
    type: { type: String, enum: ["article", "video"], default: "article" },
videoUrl: { type: String, trim: true, default: "" },
vertical: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Post", schema);