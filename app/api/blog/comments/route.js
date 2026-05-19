import { GraphQLClient, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT_BLOG ;

export async function POST(req) {
  try {
    const body = await req.json();
    console.log('Received body:', body); // Log received body

    const { name, email, comment, slug } = body;

    if (!name || !email || !comment || !slug) {
      return Response.json({ message: 'Missing required fields. Please pass in all data necessary' }, { status: 400 });
    }

    const graphQLClient = new GraphQLClient(graphqlAPI, {
      headers: {
        authorization: `Bearer ${process.env.NEXT_PUBLIC_DEFAULT_TOKEN_BLOG}`,
      },
    });


    const query = gql`
   mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!) {
  createComment(data: {
    name: $name,
    email: $email,
    comment: $comment,
    slug: $slug
  }) {
    id
  }
}
  `;
  
  ;
  

    const result = await graphQLClient.request(query, {
      name: name,
      email: email,
      comment: comment,
      slug: slug
      
      });

    return Response.json(result, { status: 200 });
  } catch (error) {
    console.error('Error submitting comment:', error);
    return Response.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}
