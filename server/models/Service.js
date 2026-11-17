import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, index: true },
    category: { type: String, trim: true, default: "Technology" },
    icon: { type: String, trim: true, default: "code" },
    badge: { type: String, trim: true, default: "" },
    description: { type: String, default: "" },
    includes: [{ type: String, trim: true }],
    price: { type: Number, min: 0 }, // leave empty for "Request a quote"
    priceNote: { type: String, trim: true, default: "" },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Service", schema);