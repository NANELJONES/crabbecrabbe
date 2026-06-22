import { createJobApplication, uploadAsset } from "../hygraph";
import { sendJobApplicationAlert } from "@/app/api/email/resend";
const MAX_FILE_SIZE_BYTES = 20 * 1024 * 1024;
const REQUIRED_DOCUMENTS = ["cv", "jobApplication"];

function isPdfFile(file) {
  return (
    file.type === "application/pdf" ||
    file.name.toLowerCase().endsWith(".pdf")
  );
}

function getUploadedDocuments(formData) {
  return REQUIRED_DOCUMENTS.map((key) => {
    const file = formData.get(key);
    return file instanceof File && file.size > 0 ? file : null;
  });
}

export async function POST(request) {
  try {
    const formData = await request.formData();

    const jobName = String(formData.get("jobName") ?? "").trim();
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const files = getUploadedDocuments(formData);

    if (!jobName) {
      return Response.json({ error: "Job name is required." }, { status: 400 });
    }

    if (!name || !email || !phone) {
      return Response.json(
        { error: "Name, email, and phone are required." },
        { status: 400 }
      );
    }

    if (!files[0]) {
      return Response.json({ error: "CV is required." }, { status: 400 });
    }

    if (!files[1]) {
      return Response.json(
        { error: "Job application document is required." },
        { status: 400 }
      );
    }

    for (const file of files) {
      if (!isPdfFile(file)) {
        return Response.json(
          { error: `"${file.name}" is not a PDF. Only PDF files are allowed.` },
          { status: 400 }
        );
      }

      if (file.size > MAX_FILE_SIZE_BYTES) {
        return Response.json(
          { error: `"${file.name}" exceeds the 20 MB limit.` },
          { status: 400 }
        );
      }
    }

    console.log("[API /careers/apply] Starting uploads for:", files.map((f) => f.name));

    const [cvAsset, jobApplicationAsset] = await Promise.all([
      uploadAsset(files[0]),
      uploadAsset(files[1]),
    ]);

    console.log("[API /careers/apply] Uploads complete:", {
      cv: cvAsset,
      jobApplication: jobApplicationAsset,
    });
    console.log("[API /careers/apply] Creating job application in Hygraph...");

    const applicationId = await createJobApplication({
      jobName,
      name,
      email,
      phone,
      message,
      assetIds: [cvAsset.id, jobApplicationAsset.id],
    });

    if (!applicationId) {
      return Response.json(
        { error: "Application could not be saved." },
        { status: 500 }
      );
    }

    console.log("[API /careers/apply] Sending admin email via Resend...");

    let emailSent = false;

    try {
      const emailResult = await sendJobApplicationAlert({
        jobName,
        name,
        email,
        phone,
        message,
        cvUrl: cvAsset.url,
        jobApplicationUrl: jobApplicationAsset.url,
      });

      emailSent = emailResult.sent;

      if (!emailResult.sent) {
        console.warn(
          "[API /careers/apply] Hygraph saved but admin email was not sent:",
          emailResult.error
        );
      } else {
        console.log("[API /careers/apply] Admin email sent:", emailResult.id);
      }
    } catch (emailError) {
      console.error(
        "[API /careers/apply] Hygraph saved but admin email failed:",
        emailError?.message ?? emailError
      );
    }

    return Response.json({
      success: true,
      id: applicationId,
      emailSent,
    });
  } catch (error) {
    console.error("[API /careers/apply] Error:", error?.message ?? error);

    return Response.json(
      {
        error:
          error?.message ??
          "Failed to submit application. Please try again later.",
      },
      { status: 500 }
    );
  }
}
