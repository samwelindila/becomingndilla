import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, trim: true, default: "Logo" }, // Logo, Poster, Instagram
    image: { type: String, default: "" },
    problem: { type: String, default: "" },
    result: { type: String, default: "" },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("PortfolioItem", schema);