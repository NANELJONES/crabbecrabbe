import { getCareers } from "./index";

export async function GET() {
  try {
    const data = await getCareers();
    return Response.json({ data, source: "hygraph" });
  } catch (error) {
    console.error("[API /careers] Error:", error?.message ?? error);
    return Response.json({
      data: [],
      source: "error",
      error: error?.message ?? "Failed to fetch careers",
    });
  }
}
