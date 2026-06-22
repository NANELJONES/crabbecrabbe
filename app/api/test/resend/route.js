import { sendEmail } from "@/app/api/email/resend";

export async function POST() {
  try {
    const result = await sendEmail({
      to: "eruditejones@gmail.com",
      subject: "Resend test",
      text: "hi",
      html: "<p>hi</p>",
    });

    if (!result.sent) {
      return Response.json(
        { success: false, error: result.error ?? "Email could not be sent." },
        { status: 500 }
      );
    }

    return Response.json({
      success: true,
      message: "Test email sent to eruditejones@gmail.com",
      id: result.id,
    });
  } catch (error) {
    console.error("[API /test/resend] Error:", error);
    return Response.json(
      { success: false, error: error?.message ?? "Unexpected error." },
      { status: 500 }
    );
  }
}
