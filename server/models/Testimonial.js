import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, trim: true, default: "" },
    quote: { type: String, required: true, trim: true },
    photo: { type: String, default: "" },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Testimonial", schema);