import { getCaseSlugs } from "./seo/getCaseSlugs";
import { getCareerSlugs } from "./seo/getCareerSlugs";
import { getPublishedBlogSlugs } from "./seo/getBlogSlugs";
import { PUBLIC_STATIC_ROUTES } from "./seo/routes";
import { SITE_URL } from "./seo/site";

function toAbsoluteUrl(path) {
  const base = SITE_URL.replace(/\/$/, "");
  if (!path || path === "") return `${base}/`;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export default async function sitemap() {
  const now = new Date();

  const staticEntries = PUBLIC_STATIC_ROUTES.map(
    ({ path, changeFrequency, priority }) => ({
      url: toAbsoluteUrl(path),
      lastModified: now,
      changeFrequency,
      priority,
    })
  );

  let blogEntries = [];
  try {
    const posts = await getPublishedBlogSlugs();
    blogEntries = posts.map(({ slug, lastModified }) => ({
      url: toAbsoluteUrl(`/blog/${slug}`),
      lastModified: lastModified ? new Date(lastModified) : now,
      changeFrequency: "weekly",
      priority: 0.65,
    }));
  } catch {
    blogEntries = [];
  }

  let caseEntries = [];
  try {
    const cases = await getCaseSlugs();
    caseEntries = cases.map(({ slug, lastModified }) => ({
      url: toAbsoluteUrl(`/cases/${slug}`),
      lastModified: lastModified ? new Date(lastModified) : now,
      changeFrequency: "monthly",
      priority: 0.6,
    }));
  } catch {
    caseEntries = [];
  }

  let careerEntries = [];
  try {
    const careers = await getCareerSlugs();
    careerEntries = careers.map(({ slug }) => ({
      url: toAbsoluteUrl(`/careers/${slug}`),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.65,
    }));
  } catch {
    careerEntries = [];
  }

  return [...staticEntries, ...blogEntries, ...caseEntries, ...careerEntries];
}
