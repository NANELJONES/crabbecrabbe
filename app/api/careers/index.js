import { gql, request } from "graphql-request";

const graphqlAPI = process.env.GRAPHCMS_ENDPOINT?.trim();
const graphqlToken = process.env.CMS_TOKEN?.trim();

async function hygraphRequest(query, variables) {
  if (!graphqlAPI || !graphqlToken) {
    throw new Error("Hygraph is not configured (GRAPHCMS_ENDPOINT / CMS_TOKEN)");
  }

  return request(graphqlAPI, query, variables, {
    Authorization: `Bearer ${graphqlToken}`,
  });
}

const CAREER_FIELDS = `
  id
  slug
  jobName
  available
  description {
    raw
  }
`;

function mapCareerNode(node) {
  if (!node) return null;

  return {
    id: node.id,
    slug: node.slug,
    jobName: node.jobName ?? "",
    available: Boolean(node.available),
    description: node.description?.raw ?? null,
  };
}

export async function getCareers() {
  const query = gql`
    query CareersList {
      careersConnection {
        edges {
          node {
            ${CAREER_FIELDS}
          }
        }
      }
    }
  `;

  try {
    const response = await hygraphRequest(query);
    const edges = response?.careersConnection?.edges ?? [];
    return edges.map(({ node }) => mapCareerNode(node)).filter(Boolean);
  } catch (error) {
    console.error(
      "[getCareers] Error:",
      error?.response?.errors?.[0]?.message ?? error?.message ?? error
    );
    return [];
  }
}

export async function getCareerBySlug(slug) {
  const query = gql`
    query CareerBySlug($slug: String!) {
      career(where: { slug: $slug }) {
        ${CAREER_FIELDS}
      }
    }
  `;

  try {
    const response = await hygraphRequest(query, { slug });
    return mapCareerNode(response?.career);
  } catch (error) {
    console.error(
      "[getCareerBySlug] Error:",
      error?.response?.errors?.[0]?.message ?? error?.message ?? error
    );
    return null;
  }
}
