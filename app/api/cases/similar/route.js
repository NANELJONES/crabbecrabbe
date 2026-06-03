import { getSimilarCases } from "../index";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const practiceArea = searchParams.get("practiceArea");
  const practiceAreas = searchParams.get("practiceAreas");
  const exclude = searchParams.get("exclude") ?? "";
  const limit = Math.min(Number(searchParams.get("limit") || 5), 10);

  const slugs = practiceAreas
    ? practiceAreas.split(",").map((s) => s.trim()).filter(Boolean)
    : practiceArea
      ? [practiceArea]
      : [];

  if (slugs.length === 0) {
    return Response.json({ data: [] });
  }

  try {
    const data = await getSimilarCases(slugs, exclude, limit);
    return Response.json({ data });
  } catch (error) {
    console.error("[API /cases/similar] Error:", error?.message ?? error);
    return Response.json({ data: [], error: error?.message });
  }
}
