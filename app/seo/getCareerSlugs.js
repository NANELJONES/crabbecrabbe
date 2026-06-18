import { getCareers } from "@/app/api/careers";

export async function getCareerSlugs() {
  try {
    const careers = await getCareers();
    return careers.map((c) => ({ slug: c.slug }));
  } catch {
    return [];
  }
}
