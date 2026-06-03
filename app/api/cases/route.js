import { getCasesPage, CASES_PAGE_SIZE } from "./index";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const first = Math.min(
      Math.max(parseInt(searchParams.get("first") ?? String(CASES_PAGE_SIZE), 10) || CASES_PAGE_SIZE, 1),
      50
    );
    const after = searchParams.get("after") || null;

    const { data, pageInfo } = await getCasesPage(first, after);

    return Response.json({ data, pageInfo, source: "hygraph" });
  } catch (error) {
    console.error("[API /cases] Error:", error?.message ?? error);
    return Response.json({
      data: [],
      pageInfo: { hasNextPage: false, endCursor: null },
      source: "error",
      error: error?.message ?? "Failed to fetch cases",
    });
  }
}
