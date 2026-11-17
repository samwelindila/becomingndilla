import "dotenv/config";
import { sendContactEmail } from "../utils/mailer.js";

console.log("Provider:", process.env.RESEND_API_KEY ? "Resend" : "Gmail / none");
console.log("Sending to:", process.env.EMAIL_TO || process.env.EMAIL_USER || "(missing)");

try {
  await sendContactEmail({
    name: "Email Test",
    email: "test@example.com",
    subject: "BecomingNdilla email test",
    message: "If you can read this, your contact form emails are working.",
  });
  console.log("Done. Check your inbox (and the spam folder).");
} catch (err) {
  console.error("Failed:", err.message);
}