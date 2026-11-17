import "dotenv/config";
import dns from "node:dns";
import mongoose from "mongoose";
import Admin from "../models/Admin.js";

dns.setDefaultResultOrder("ipv4first");

const { MONGO_URI, ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

async function run() {
  if (!MONGO_URI || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
    throw new Error("Set MONGO_URI, ADMIN_EMAIL and ADMIN_PASSWORD in .env first");
  }

  await mongoose.connect(MONGO_URI);

  let admin = await Admin.findOne({ email: ADMIN_EMAIL.toLowerCase() });
  if (admin) {
    admin.password = ADMIN_PASSWORD; // re-hashed by the pre-save hook
    if (ADMIN_NAME) admin.name = ADMIN_NAME;
    await admin.save();
    console.log(`Updated admin: ${admin.email}`);
  } else {
    admin = await Admin.create({
      name: ADMIN_NAME || "Ndilla",
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
    });
    console.log(`Created admin: ${admin.email}`);
  }

  await mongoose.disconnect();
}

run().catch((err) => {
  console.error(err.message);
  process.exit(1);
});