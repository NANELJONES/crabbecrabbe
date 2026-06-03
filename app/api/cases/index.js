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

const CASE_LIST_FIELDS = `
  caseName
  caseStatus
  courts
  coverImage {
    url
  }
  endDate
  slug
  startDate
  team {
    ... on Team {
      id
      employeeName
      practiceAreas {
        areaName
        slug
      }
    }
  }
`;

const CASE_DETAIL_FIELDS = `
  caseContent {
    raw
  }
  ${CASE_LIST_FIELDS}
`;

export const CASES_PAGE_SIZE = 9;

function uniquePracticeAreasFromTeamMembers(teamMembers = []) {
  const bySlug = new Map();

  for (const member of teamMembers) {
    if (!member) continue;
    for (const pa of member.practiceAreas ?? []) {
      if (!pa?.slug) continue;
      bySlug.set(pa.slug, {
        name: pa.areaName ?? "",
        slug: pa.slug,
      });
    }
  }

  return [...bySlug.values()];
}

function mapCaseNode(node) {
  if (!node) return null;

  const rawTeam = (node.team ?? []).filter(Boolean);
  const practiceAreas = uniquePracticeAreasFromTeamMembers(rawTeam);

  const team = rawTeam.map((member) => ({
    id: member.id,
    name: member.employeeName ?? "",
    practiceAreas: (member.practiceAreas ?? [])
      .filter((pa) => pa?.slug)
      .map((pa) => ({
        name: pa.areaName ?? "",
        slug: pa.slug,
      })),
  }));

  return {
    id: node.slug,
    slug: node.slug,
    caseName: node.caseName ?? "",
    caseStatus: node.caseStatus ?? null,
    courts: node.courts ?? null,
    coverImage: node.coverImage?.url ?? "",
    startDate: node.startDate ?? null,
    endDate: node.endDate ?? null,
    createdAt: node.startDate ?? null,
    caseContent: node.caseContent?.raw ?? null,
    practiceAreas,
    practiceArea: practiceAreas[0] ?? null,
    team,
  };
}

async function fetchCasesPage(first = CASES_PAGE_SIZE, after = null) {
  const query = gql`
    query CasesList($first: Int!, $after: String) {
      casesConnection(
        first: $first
        after: $after
        orderBy: startDate_DESC
      ) {
        edges {
          node {
            ${CASE_LIST_FIELDS}
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  `;

  const response = await hygraphRequest(query, { first, after });
  const connection = response?.casesConnection;
  const edges = connection?.edges ?? [];

  return {
    data: edges.map(({ node }) => mapCaseNode(node)).filter(Boolean),
    pageInfo: connection?.pageInfo ?? {
      hasNextPage: false,
      endCursor: null,
    },
  };
}

export async function getCasesPage(first = CASES_PAGE_SIZE, after = null) {
  try {
    return await fetchCasesPage(first, after);
  } catch (error) {
    console.error(
      "[getCasesPage] Error:",
      error?.response?.errors?.[0]?.message ?? error?.message ?? error
    );
    return {
      data: [],
      pageInfo: { hasNextPage: false, endCursor: null },
    };
  }
}

export async function getCases() {
  try {
    const { data } = await fetchCasesPage(100, null);
    return data;
  } catch (error) {
    console.error(
      "[getCases] Error:",
      error?.response?.errors?.[0]?.message ?? error?.message ?? error
    );
    return [];
  }
}

export async function getCaseBySlug(slug) {
  const query = gql`
    query CaseBySlug($slug: String!) {
      case(where: { slug: $slug }) {
        ${CASE_DETAIL_FIELDS}
      }
    }
  `;

  try {
    const response = await hygraphRequest(query, { slug });
    return mapCaseNode(response?.case);
  } catch (error) {
    console.error(
      "[getCaseBySlug] Error:",
      error?.response?.errors?.[0]?.message ?? error?.message ?? error
    );
    return null;
  }
}

function caseSharesPracticeArea(caseItem, practiceAreaSlugs) {
  if (!practiceAreaSlugs?.length) return false;
  const slugs = new Set(practiceAreaSlugs);
  return caseItem.practiceAreas?.some((pa) => slugs.has(pa.slug));
}

export async function getSimilarCases(practiceAreaSlugs, excludeSlug, limit = 5) {
  const slugs = Array.isArray(practiceAreaSlugs)
    ? practiceAreaSlugs.filter(Boolean)
    : practiceAreaSlugs
      ? [practiceAreaSlugs]
      : [];

  if (slugs.length === 0) return [];

  const allCases = await getCases();

  return allCases
    .filter(
      (item) =>
        item.slug !== excludeSlug && caseSharesPracticeArea(item, slugs)
    )
    .slice(0, limit);
}
