import { getTestimonials } from "@/app/api/queries";

export async function GET() {
  try {
    const { data } = await getTestimonials();
    console.log("[API /testimonials] Loaded", data.length, "testimonial(s)");
    return Response.json({ data });
  } catch (error) {
    console.error("[API /testimonials] Error:", error?.message ?? error);
    return Response.json(
      { data: [], error: error?.message ?? "Failed to fetch testimonials" },
      { status: 500 }
    );
  }
}
