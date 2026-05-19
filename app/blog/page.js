import Heading from "../components/Heading";
import Layout1 from "../layout/Layout1";
import Blog from "../components/Blog/Blog";

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      <Layout1>
        <Heading
          heading="Our Blog"
          subHeading="Legal insights, firm updates, and expert commentary from the Crabbe Crabbe & Co. team."
        />
        <p className="mt-10 max-w-2xl text-secondary_color">
          Articles and resources will appear here soon. Check back for updates on
          law, policy, and developments affecting our clients in Ghana.
        </p>

        <Blog />
      </Layout1>
      
    </div>
  );
}
