import { getCaseBySlug } from "../index";

export async function GET(_request, { params }) {
  const { slug } = await params;

  try {
    const data = await getCaseBySlug(slug);

    if (!data) {
      return Response.json({ error: "Case not found" }, { status: 404 });
    }

    return Response.json({ data });
  } catch (error) {
    console.error("[API /cases/[slug]] Error:", error?.message ?? error);
    return Response.json(
      { error: error?.message ?? "Failed to fetch case" },
      { status: 500 }
    );
  }
}
