import { getCareerBySlug } from "../index";

export async function GET(_request, { params }) {
  const { slug } = await params;

  try {
    const data = await getCareerBySlug(slug);

    if (!data) {
      return Response.json({ error: "Position not found" }, { status: 404 });
    }

    return Response.json({ data });
  } catch (error) {
    console.error("[API /careers/[slug]] Error:", error?.message ?? error);
    return Response.json(
      { error: error?.message ?? "Failed to fetch position" },
      { status: 500 }
    );
  }
}
