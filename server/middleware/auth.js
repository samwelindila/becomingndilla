import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import asyncHandler from "../utils/asyncHandler.js";

// Protects admin-only routes
export const protect = asyncHandler(async (req, res, next) => {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    res.status(401);
    throw new Error("Not authorized");
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    res.status(401);
    throw new Error("Session expired, please log in again");
  }

  const admin = await Admin.findById(decoded.id);
  if (!admin) {
    res.status(401);
    throw new Error("Not authorized");
  }

  req.admin = admin;
  next();
});