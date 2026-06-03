export { metadata } from "./metadata";

import Heading from "../components/Heading";
import AnimateUp from "../components/AnimateUp";
import Layout1 from "../layout/Layout1";
import Blog from "../components/Blog/Blog";

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      <Layout1>
        <AnimateUp>
          <Heading
            heading="Our Blog"
            subHeading="Legal insights, firm updates, and expert commentary from the Crabbe Crabbe & Co. team."
          />
        </AnimateUp>
        <AnimateUp delay={0.08}>
          <p className="mt-10 max-w-2xl text-secondary_color">
            Articles and resources will appear here soon. Check back for updates on
            law, policy, and developments affecting our clients in Ghana.
          </p>
        </AnimateUp>

        <AnimateUp delay={0.1}>
          <Blog />
        </AnimateUp>
      </Layout1>
    </div>
  );
}
