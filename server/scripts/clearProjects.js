import "dotenv/config";
import dns from "node:dns";
import mongoose from "mongoose";
import Project from "../models/Project.js";

dns.setDefaultResultOrder("ipv4first");

await mongoose.connect(process.env.MONGO_URI);
const r = await Project.deleteMany({});
console.log(`Removed ${r.deletedCount} projects`);
await mongoose.disconnect();