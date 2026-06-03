import { SITE_URL } from "./seo/site";

/**
 * robots.txt — industry-standard crawl rules.
 *
 * Public pages (home, about, practice areas, contact, appointment, blog) stay
 * crawlable for SEO. Form spam / bot abuse should be handled on Vercel
 * (rate limiting, Bot Protection, WAF), not by blocking those URLs here.
 */
export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/_next/",
          "/private/",
        ],
      },
      // Optional: limit aggressive AI training crawlers (content still public in browser)
      {
        userAgent: "GPTBot",
        disallow: ["/"],
      },
      {
        userAgent: "CCBot",
        disallow: ["/"],
      },
      {
        userAgent: "Google-Extended",
        disallow: ["/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL.replace(/\/$/, ""),
  };
}
