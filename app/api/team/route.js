import { getTeam } from "@/app/api/queries";

export async function GET() {
  try {
    const data = await getTeam();
    console.log("[API /team] Loaded", data.length, "team member(s)");
    return Response.json({ data });
  } catch (error) {
    console.error("[API /team] Error:", error?.message ?? error);
    return Response.json(
      { data: [], error: error?.message ?? "Failed to fetch team" },
      { status: 500 }
    );
  }
}
