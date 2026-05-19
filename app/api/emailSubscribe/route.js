import mailchimp from "@mailchimp/mailchimp_marketing";

mailchimp.setConfig({
  apiKey: process.env.NEXT_PUBLIC_MAILCHIMP_API_KEY,
  server: process.env.NEXT_PUBLIC_DATACENTER, // e.g., "us21"
});

export async function POST(req) {
  try {
    const { name, email } = await req.json();

    if (!email || !name) {
      return new Response(JSON.stringify({ error: "Name and email are required" }), { status: 400 });
    }

    await mailchimp.lists.addListMember(process.env.NEXT_PUBLIC_AUDIENCE_ID, {
      email_address: email,
      status: "subscribed", // Change to "pending" for double opt-in
      merge_fields: { FNAME: name },
    });

    return new Response(JSON.stringify({ message: "Successfully subscribed!" }), { status: 200 });
  } catch (error) {
    let errorMessage = "Something went wrong.";

    if (error.response?.body) {
      try {
        const errorBody = JSON.parse(error.response.body);
        if (errorBody.title === "Member Exists") {
          errorMessage = "This email is already subscribed!";
        } else {
          errorMessage = errorBody.detail || errorMessage;
        }
      } catch (parseError) {
        console.error("Error parsing Mailchimp error response:", parseError);
      }
    }

    return new Response(JSON.stringify({ error: errorMessage }), { status: 400 });
  }
}
