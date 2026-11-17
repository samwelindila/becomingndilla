import { Resend } from "resend";
import nodemailer from "nodemailer";

const esc = (s = "") =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const buildHtml = ({ name, email, subject, message }) => `
  <div style="font-family:Arial,sans-serif;max-width:560px">
    <h2 style="margin:0 0 12px">New message from your website</h2>
    <p><b>Name:</b> ${esc(name)}</p>
    <p><b>Email:</b> ${esc(email)}</p>
    ${subject ? `<p><b>Subject:</b> ${esc(subject)}</p>` : ""}
    <p style="white-space:pre-wrap;border-left:3px solid #0ea5e9;padding-left:12px">${esc(message)}</p>
    <p style="color:#64748b;font-size:12px">Reply to this email to answer ${esc(name)} directly.</p>
  </div>`;

let resend = null;
let gmail = null;

// Emails you when someone sends the contact form
export async function sendContactEmail(data) {
  const to = process.env.EMAIL_TO || process.env.EMAIL_USER;
  const subject = `New message: ${data.subject || "Contact form"} (${data.name})`;
  const html = buildHtml(data);

  // Option 1: Resend (recommended, no App Password needed)
  if (process.env.RESEND_API_KEY) {
    resend = resend || new Resend(process.env.RESEND_API_KEY);

    const { error } = await resend.emails.send({
      from: "BecomingNdilla <onboarding@resend.dev>",
      to: [to],
      replyTo: data.email,
      subject,
      html,
    });

    // Resend reports problems in `error` instead of throwing
    if (error) throw new Error(error.message || "Resend failed");
    return;
  }

  // Option 2: Gmail with an App Password
  const { EMAIL_USER, EMAIL_PASS } = process.env;
  if (EMAIL_USER && EMAIL_PASS) {
    gmail =
      gmail ||
      nodemailer.createTransport({
        service: "gmail",
        auth: { user: EMAIL_USER, pass: EMAIL_PASS },
      });

    await gmail.sendMail({
      from: `"BecomingNdilla" <${EMAIL_USER}>`,
      to,
      replyTo: data.email,
      subject,
      html,
    });
    return;
  }

  console.warn("No email provider configured. The message was saved to the database only.");
}