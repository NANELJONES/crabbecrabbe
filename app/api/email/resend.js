import { Resend } from "resend";

function getApiKey() {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured.");
  }
  return apiKey;
}

export function getResendClient() {
  return new Resend(getApiKey());
}

export function getFromAddress() {
  return (
    process.env.RESEND_FROM_EMAIL?.trim() ||
    "Crabbe Crabbe <Info@crabbecrabbeandco.com>"
  );
}

export function getApplicationRecipients() {
  const configured = process.env.RESEND_APPLICATION_TO?.trim();

  if (configured) {
    return configured.split(",").map((entry) => entry.trim()).filter(Boolean);
  }

  return ["Info@crabbecrabbeandco.com", "patience.kusey@gmail.com"];
}

export function buildApplicationEmailBody({
  jobName,
  name,
  email,
  phone,
  message,
  jobApplicationUrl,
  cvUrl,
}) {
  return [
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    `Job: ${jobName}`,
    message ? `Message: ${message}` : "Message: —",
    "",
    "APPLICATION and CV",
    jobApplicationUrl ?? "Job application link unavailable",
    cvUrl ?? "CV link unavailable",
  ].join("\n");
}

export async function sendEmail({ to, subject, text, html, replyTo }) {
  const resend = getResendClient();

  const { data, error } = await resend.emails.send({
    from: getFromAddress(),
    to: Array.isArray(to) ? to : [to],
    subject,
    text,
    html,
    replyTo,
  });

  if (error) {
    console.error("[Resend] Send failed:", error);
    return { sent: false, error: error.message ?? "Resend request failed." };
  }

  console.log("[Resend] Email sent:", data?.id);
  return { sent: true, id: data?.id };
}

export async function sendJobApplicationAlert({
  jobName,
  name,
  email,
  phone,
  message,
  cvUrl,
  jobApplicationUrl,
}) {
  const body = buildApplicationEmailBody({
    jobName,
    name,
    email,
    phone,
    message,
    cvUrl,
    jobApplicationUrl,
  });

  return sendEmail({
    to: getApplicationRecipients(),
    subject: "JOB APPLICATION ALERT",
    text: body,
    html: body.replace(/\n/g, "<br>"),
    replyTo: email,
  });
}
