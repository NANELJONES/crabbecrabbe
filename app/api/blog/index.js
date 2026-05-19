import { graphql } from "graphql"
import {request, gql } from  "graphql-request"

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT_BLOG

// getProjects
export const AllBlogs = async ()=>{
    
    const query =  gql `

 query MyQuery {
  postsConnection {
    edges {
      node {
        slug
        stage
        title
        
        excerpt
        content {
          html
        }
        contentType
        featuredPost
        coverImage {
          url
        }
        author {
          name
          picture {
            url
          }
        }
        createdAt
      }
    }
  }
}  
    `

try{
    const response = await request(graphqlAPI, query)

    
    return   response?.projectsConnection?.edges
   
    
}catch (error){
    console.log("There was an error", error)
    return ["null"]
}



}


export const getBlogs = async (first = 3, after = null) => {
  const query = gql`
    query MyQuery($first: Int, $after: String) {
      postsConnection(first: $first, after: $after,orderBy: createdAt_DESC) {
        edges {
          node {
            slug
            stage
                category {
          category
        }
            
            title
            excerpt
            content {
              html
            }
            contentType
            featuredPost
            coverImage {
              url
            }
            author {
              name
              picture {
                url
              }
            }
            createdAt
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
    const response = await request(graphqlAPI, query, { first, after });
    console.log("This is the data fetched blog:", response);
    
    return {data:response.postsConnection.edges
    , pageInfo: response.postsConnection.pageInfo};
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return { edges: [], pageInfo: { hasNextPage: false, endCursor: null } };
  }
};



// export const getSimilarPosts = async (first = 5, after = null) => {
//   const query = gql`
//     query MyQuery($first: Int, $after: String) {
//       postsConnection(first: $first, after: $after) {
//         edges {
//           node {
//             slug
//             title
//             excerpt
//             coverImage {
//               url
//             }
//             author {
//               name
//               picture {
//                 url
//               }
//             }
//             createdAt
//           }
//         }
//         pageInfo {
//           hasNextPage
//           endCursor
//         }
//       }
//     }
//   `;

//   try {
//     const response = await request(graphqlAPI, query, { first, after });
//     console.log("Fetched similar posts:", response);
    
//     return response.postsConnection.edges
//   } catch (error) {
//     console.error("Error fetching similar posts:", error);
//     return { data: [], pageInfo: { hasNextPage: false, endCursor: null } };
//   }
// };

export const GetSimilarPosts = async (categories, slugToExclude) => {
  console.log("This is the Categories being passed:", categories);
  const query = gql`
    query GetSimilarPosts($categories: [String!], $slugToExclude: String!,orderBy: createdAt_DESC) {
      postsConnection(
        where: {
          AND: [
            { category_every: { category_in: $categories } } 
            { slug_not: $slugToExclude }
          ]
        }
        first: 5
      ) {
        edges {
          node {
            slug
            stage
            title
            excerpt
            content {
              html
            }
            contentType
            featuredPost
            coverImage {
              url
            }
            author {
              name
              picture {
                url
              }
            }
            createdAt
            category {
              category
            }
          }
        }
      }
    }
  `;

  try {
    const variables = { categories, slugToExclude };
    const response = await request(graphqlAPI, query, variables);
    console.log("Fetched similar posts:", response);

    return response?.postsConnection?.edges || [];
  } catch (error) {
    console.error("There was an error fetching similar posts:", error);
    return [];
  }
};

export const getBlogFromCategory = async (category) => {
  const query = gql`
  query MyQuery($category: String!) {
    postsConnection(where: { category_some: { category: $category } },orderBy: createdAt_DESC) {
      edges {
        node {
          id
          author {
            name
            picture {
              url
            }
            title
          }
          slug
          content {
            html
          }
          contentType
          coverImage {
            url
          }
          excerpt
          title
          featuredPost
          createdAt
          category {  # Fixed: Ensure it's 'categories' if it's an array
            category
          }
        }
      }
    }
  }
`;


  try {
    const response = await request(graphqlAPI, query, { category });
    console.log("This is the data fetched Blog from Category:", response);
     return response.postsConnection.edges || []; // Return posts or an empty array if no posts exist
  } catch (error) {
    console.error("Error fetching blog posts by category:", error);
    return []; // Return an empty array in case of an error
  }
};










export const getCategories = async () => {  

  const query = gql`
  query MyQuery {
  categoriesConnection(orderBy: createdAt_DESC) {
    edges {
      node {
        category
      }
    }
  }
}
  `;

  try {
    const response = await request(graphqlAPI, query);

    return response.categoriesConnection.edges;
  } catch (error) {
    console.error("There was an error fetching the categories:", error);
    return [];
  }
}



export const GetSingleBlogPost = async (slug) => {
  const query = gql`
  query GetSingleBlogPost($slug: String!) {
    post(where: { slug: $slug }) {
      slug
      stage
      title
      excerpt
      content {
        raw
      }
      contentType
      category {
          category
        }
      featuredPost
      coverImage {
        url
      }
      author {
        name
        picture {
          url
        }
      }
      createdAt
    }
  }
`;

try {
  const response = await request(graphqlAPI, query, { slug });

  return response || null; // Return the post if it exists or null if not
} catch (error) {
  console.log("There was an error fetching the blog post:", error);
  return null; // Return null in case of error
}
};




export const getFeaturedPost = async()=>{
  const query = gql`
  query MyQuery {
  postsConnection(where: {featuredPost: true},orderBy: createdAt_DESC) {
    edges {
      node {
        id
        createdAt
        title
        slug
         coverImage {
              url
            }
        author {
          name
          picture {
            url
          }
          title
        }
        slug
      }
    }
  }
}
`;

  try {
    const response = await request(graphqlAPI, query);
    console.log("This is the data fetched featured post:", response);
    return response.postsConnection.edges;
  } catch (error) {
    console.error("There was an error fetching the featured post:", error);
    return [];
  }
}

// submitComment
export const submitComment = async (obj) => {
  const response = await fetch("/api/blog/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });

  if (!response.ok) {
    throw new Error("Failed to submit comment");
  }

  return response.json();
};




// getComments
export const getComments = async (slug) => {
  const query = gql`
  query GetComments($slug: String!) {
    commentsConnection(where: { slug: $slug }) {
      edges {
        node {
          comment
          postName
          slug
          createdAt
        }
      }
    }
  }
`;

  const result = await request(graphqlAPI, query, { slug });


  return result.commentsConnection.edges;
};


