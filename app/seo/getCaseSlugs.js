import { getCases } from "@/app/api/cases";

export async function getCaseSlugs() {
  try {
    const cases = await getCases();
    return cases.map((c) => ({
      slug: c.slug,
      lastModified: c.createdAt ?? c.endDate ?? c.startDate ?? null,
    }));
  } catch {
    return [];
  }
}
