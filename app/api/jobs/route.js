import { GraphQLClient, gql } from 'graphql-request';

const graphqlAPI = process.env.GRAPHCMS_ENDPOINT?.trim();

export async function POST(req) {
  try {
    const body = await req.json();
    console.log('Received body:', body); // Log received body

    const {  name, email,  phoneNumber, country, location,  cv } = body;


    if (!name || !email || !phoneNumber || !country || !location || !volunteeringType) {
        return Response.json({ message: 'Missing required fields. Please pass in all data necessary' }, { status: 400 });
      }

    const graphQLClient = new GraphQLClient(graphqlAPI, {
      headers: {
        authorization: `Bearer ${process.env.CMS_TOKEN}`,
      },
    });


    const query = gql`
   mutation CreatejobApplication($name: String!,    $email: String!,    $phone: String!,    $country: String!,    $location: String!,   $cv: String!) {
  createjobApplication(data: {
    applicantName: $name,
    applicantEmail: $email,
    applicantPhoneNumber: $phone,
    applicantCountry: $country,
    applicantLocation: $location,
    applicantCv: $cv
  }) {
    id
  }
}
  `;
  
  ;
  

    const result = await graphQLClient.request(query, {
      name: name,
      email: email,
      phone: phoneNumber,
      country: country,
      location:location,
      cv: cv

      
      });

    return Response.json(result, { status: 200 });
  } catch (error) {
    console.error('Error submitting Volunteer:', error);
    return Response.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}
