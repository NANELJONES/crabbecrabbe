import { request, gql } from "graphql-request";

const graphqlAPI = process.env.GRAPHCMS_ENDPOINT?.trim();
const graphqlToken = process.env.CMS_TOKEN?.trim();

const hygraphRequest = async (query, variables) => {
  if (!graphqlAPI) {
    console.error(
      "[Hygraph] Missing GRAPHCMS_ENDPOINT. Check your .env file and restart the dev server."
    );
    throw new Error("Hygraph endpoint is not configured");
  }

  if (!graphqlToken) {
    console.error(
      "[Hygraph] Missing CMS_TOKEN. Check your .env file and restart the dev server."
    );
    throw new Error("Hygraph token is not configured");
  }

  try {
    return await request(graphqlAPI, query, variables, {
      Authorization: `Bearer ${graphqlToken}`,
    });
  } catch (error) {
    console.error("[Hygraph] Request failed:", error?.message ?? error);
    throw error;
  }
};

const slugify = (value = "") =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

// getProjects






// getSingleProjects


// getGallery
// getGallery
export const getGallery = async (first = 2, after = null) => {
  const query = gql`
    query MyQuery($first: Int, $after: String) {
      galleriesConnection(first: $first, after: $after,orderBy: createdAt_DESC) {
        edges {
          node {
            title
            createdAt
            imageContent {
              url
            }
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  `;

  try {
    const response = await hygraphRequest(query, { first, after });
    console.log("Fetched images:", response);
    return response.galleriesConnection;
  } catch (error) {
    console.error("Error fetching gallery images:", error);
    return { edges: [], pageInfo: { hasNextPage: false } };
  }
};
















function groupTeamByRole(members) {
  const roleMap = new Map();

  for (const member of members) {
    const roleName = member.roleName || "Other";
    const existing = roleMap.get(roleName);

    if (existing) {
      existing.members.push(member);
      existing.rank = Math.min(existing.rank, member.roleRank);
      continue;
    }

    roleMap.set(roleName, {
      roleName,
      rank: member.roleRank,
      members: [member],
    });
  }

  return [...roleMap.values()].sort(
    (a, b) => a.rank - b.rank || a.roleName.localeCompare(b.roleName)
  );
}

// get Team
export const getTeam = async () => {
  const query = gql`
    query MyQuery {
      teamsConnection {
        edges {
          node {
            id
            description
            employeeImage {
              url
            }
            employeeName
            employeePosition
            staffRole {
              roleName
              rank
            }
            practiceAreas {
              areaName
              slug
            }
          }
        }
      }
    }
  `;

  try {
    const response = await hygraphRequest(query);

    const members =
      response?.teamsConnection?.edges?.map(({ node }) => {
        const roleName =
          node.staffRole?.roleName ?? node.employeePosition ?? "";
        const roleRank =
          typeof node.staffRole?.rank === "number"
            ? node.staffRole.rank
            : Number.MAX_SAFE_INTEGER;

        return {
          id: node.id ?? slugify(node.employeeName),
          name: node.employeeName ?? "",
          title: roleName,
          roleName,
          roleRank,
          image: node.employeeImage?.url ?? "",
          expertise:
            node.practiceAreas?.map((area) => area.areaName).filter(Boolean) ??
            [],
          bio: node.description ?? "",
        };
      }) ?? [];

    return {
      data: members,
      groups: groupTeamByRole(members),
    };
  } catch (error) {
    console.error("[getTeam] Error:", error?.response?.errors ?? error?.message ?? error);
    return { data: [], groups: [] };
  }
};


// get Testimonials
export const getTestimonials = async () => {
  const query = gql`
    query MyQuery {
      testimonialsConnection {
        edges {
          node {
            personName
            personPosition
            testimony
            personImage {
              url
            }
          }
        }
      }
    }
  `;

  try {
    const response = await hygraphRequest(query);

    return {
      data:
        response?.testimonialsConnection?.edges?.map(({ node }) => ({
          id: slugify(node.personName),
          name: node.personName ?? "",
          role: node.personPosition ?? "",
          text: node.testimony ?? "",
          avatar: node.personImage?.url ?? "",
          score: 5,
        })) ?? [],
    };
  } catch (error) {
    console.error(
      "[getTestimonials] Error:",
      error?.response?.errors ?? error?.message ?? error
    );
    return { data: [] };
  }
};



// get Practice Areas
export const getPracticeAreas = async () => {
  const query = gql`
    query MyQuery {
      practiceAreasConnection {
        edges {
          node {
            areaName
            coverImage {
              url
            }
            description
            slug
          }
        }
      }
    }
  `;

  try {
    const response = await hygraphRequest(query);
    const edges = response?.practiceAreasConnection?.edges ?? [];

    return edges.map(({ node }) => ({
      id: node.slug,
      title: node.areaName ?? "",
      description: node.description ?? "",
      image: node.coverImage?.url ?? "",
    }));
  } catch (error) {
    console.error(
      "[getPracticeAreas] Error:",
      error?.response?.errors ?? error?.message ?? error
    );
    return [];
  }
};

// get AwarenessMaterials






export const getClients = async ()=>{
  const query = gql `
query MyQuery {
  clientsConnection {
    edges {
      node {
        partnerName
        partnerLogo {
          url
        }
      }
    }
  }
}
  `
  try{
    const response = await hygraphRequest(query)
  
    console.log( "these are the clients", response?.clientsConnection?.edges)
    return   response?.clientsConnection?.edges
   
    
  }catch (error){
    console.log("There was an error, WE NOR SEE TOP", error)
    return ["null"]
  }
  

}









export const getAvailablePositions = async()=>{

const query = gql`
query MyQuery {
  jobPostsConnection(orderBy: createdAt_DESC) {
    edges {
      node {
        slug
        jobDetails
        jobExcerpt
        jobName
        id
        jobStatus
        createdAt
      }
    }
  }
}


`


try{

const response = await hygraphRequest(query)
console.log("these are the postions available" , response)
return response.jobPostsConnection.edges

}catch(error){
  console.log("There was an error", error)
  return [null]

}


}


export const getSingleJobPost = async(slug)=>{
  const query = gql`
query MyQuery ($slug: String!){
  jobPostsConnection(where:{slug:$slug}) {
    edges {
      node {
        slug
        jobDetails
        jobExcerpt
        jobName
        id
        jobStatus
      }
    }
  }
}


`


try{

const response = await hygraphRequest(query, {slug})
console.log("this is the single job position" , response)
return response?.jobPostsConnection?.edges[0]?.node

}catch(error){
  console.log("There was an error", error)
  return [null]

}

}

export const submitJobApplication =  async (applicant_data)=>{

  const response = await fetch("/api/queries/jobs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(applicant_data),
  });

  if (!response.ok) {
    throw new Error("Failed to submit Job Application");
  }

  return response.json();


}





