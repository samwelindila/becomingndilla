import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, index: true },
    category: { type: String, trim: true, default: "" },
    status: { type: String, trim: true, default: "" },
    description: { type: String, default: "" },
    problem: { type: String, default: "" },
    result: { type: String, default: "" },
    stack: [{ type: String, trim: true }],
    image: { type: String, default: "" },
    link: { type: String, default: "" },
    github: { type: String, default: "" },
        demo: { type: String, default: "" },
    source: { type: String, default: "" },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Project", schema);