import { getTeam } from "@/app/api/queries";

export async function GET() {
  try {
    const { data, groups } = await getTeam();
    console.log(
      "[API /team] Loaded",
      data.length,
      "team member(s) in",
      groups.length,
      "role group(s)"
    );
    return Response.json({ data, groups });
  } catch (error) {
    console.error("[API /team] Error:", error?.message ?? error);
    return Response.json(
      { data: [], groups: [], error: error?.message ?? "Failed to fetch team" },
      { status: 500 }
    );
  }
}
