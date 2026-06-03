import { gql, request } from "graphql-request";

const PUBLISHED_STAGES = new Set(["PUBLISHED", "Published", "published"]);

/**
 * Fetches published blog post slugs for sitemap generation.
 * Returns [] if the CMS is unavailable (build still succeeds).
 */
export async function getPublishedBlogSlugs() {
  const endpoint = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT_BLOG;
  if (!endpoint) return [];

  const query = gql`
    query SitemapPosts {
      postsConnection(first: 100, orderBy: createdAt_DESC) {
        edges {
          node {
            slug
            stage
            createdAt
            updatedAt
          }
        }
      }
    }
  `;

  try {
    const response = await request(endpoint, query);
    const edges = response?.postsConnection?.edges ?? [];

    return edges
      .map(({ node }) => node)
      .filter(
        (node) =>
          node?.slug &&
          (!node.stage || PUBLISHED_STAGES.has(node.stage))
      )
      .map((node) => ({
        slug: node.slug,
        lastModified: node.updatedAt ?? node.createdAt ?? null,
      }));
  } catch (error) {
    console.error("[sitemap] Failed to fetch blog slugs:", error?.message ?? error);
    return [];
  }
}
