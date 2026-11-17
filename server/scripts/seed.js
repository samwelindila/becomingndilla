import "dotenv/config";
import dns from "node:dns";
import mongoose from "mongoose";
import { uniqueSlug } from "../utils/slugify.js";
import Project from "../models/Project.js";
import Post from "../models/Post.js";
import Venture from "../models/Venture.js";
import Service from "../models/Service.js";
import Product from "../models/Product.js";
import Testimonial from "../models/Testimonial.js";

dns.setDefaultResultOrder("ipv4first");

async function run() {
  if (!process.env.MONGO_URI) throw new Error("MONGO_URI is missing in .env");

  let content;
  try {
    content = await import("../../client/src/data/content.js");
  } catch (err) {
    throw new Error(
      `Could not read client/src/data/content.js (${err.message}). ` +
        "If it imports images or other files, copy the arrays into a plain file first."
    );
  }

  await mongoose.connect(process.env.MONGO_URI);

  const sets = [
    ["projects", Project, content.projects],
    ["posts", Post, content.posts],
    ["ventures", Venture, content.ventures],
    ["services", Service, content.services],
    ["products", Product, content.products],
    ["testimonials", Testimonial, content.testimonials],
  ];

  for (const [label, Model, items = []] of sets) {
    const existing = await Model.countDocuments();
    if (existing > 0) {
      console.log(`${label}: skipped (already has ${existing})`);
      continue;
    }

    let added = 0;
    for (const [i, raw] of items.entries()) {
      try {
        const data = { ...raw, order: raw.order ?? i };
        delete data._id;
        if (Model.schema.path("slug")) {
          data.slug = await uniqueSlug(Model, raw.slug || raw.title || raw.name);
        }
        await Model.create(data);
        added++;
      } catch (err) {
        console.log(`  ${label} #${i + 1} failed: ${err.message}`);
      }
    }
    console.log(`${label}: added ${added} of ${items.length}`);
  }

  await mongoose.disconnect();
}

run().catch((err) => {
  console.error(err.message);
  process.exit(1);
});