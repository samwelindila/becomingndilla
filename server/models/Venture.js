import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, index: true },
    status: { type: String, trim: true, default: "" },
    type: { type: String, trim: true, default: "" },
    description: { type: String, default: "" },
    image: { type: String, default: "" },
    link: { type: String, default: "" },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Venture", schema);