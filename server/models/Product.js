import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, index: true },
    type: { type: String, trim: true, default: "Product" }, // Course, E-book or Product
    description: { type: String, default: "" },
    price: { type: Number, min: 0 }, // 0 = Free, empty = "Ask for price"
    image: { type: String, default: "" },
    badge: { type: String, trim: true, default: "" },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Product", schema);