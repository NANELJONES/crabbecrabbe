import { getPracticeAreas } from "@/app/api/queries";
import { PRACTICE_AREAS_SECTIONS } from "@/app/practiceAreas/practiceAreasData";

export async function GET() {
  try {
    const fromHygraph = await getPracticeAreas();

    if (fromHygraph.length > 0) {
      console.log("[API /practice-areas] Loaded", fromHygraph.length, "from Hygraph");
      return Response.json({ data: fromHygraph, source: "hygraph" });
    }

    console.log("[API /practice-areas] No Hygraph data, using fallback");
    return Response.json({ data: PRACTICE_AREAS_SECTIONS, source: "fallback" });
  } catch (error) {
    console.error("[API /practice-areas] Error:", error?.message ?? error);
    return Response.json({
      data: PRACTICE_AREAS_SECTIONS,
      source: "fallback",
      error: error?.message ?? "Failed to fetch practice areas",
    });
  }
}
