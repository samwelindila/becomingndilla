import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// server/.env, no matter where `node` is launched from
dotenv.config({ path: path.join(__dirname, "..", ".env") });