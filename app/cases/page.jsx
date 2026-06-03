import Heading from "../components/Heading";
import AnimateUp from "../components/AnimateUp";
import Layout1 from "../layout/Layout1";

export default function CasesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Layout1>
        <AnimateUp>
          <Heading
            heading="Our Cases"
            subHeading="Explore notable matters and outcomes that reflect our commitment to trusted advocacy and proven results."
          />
        </AnimateUp>
        <AnimateUp delay={0.08}>
          <p className="mt-10 max-w-2xl text-secondary_color">
            Case studies and representative matters will be published here soon.
            Contact us to discuss how we can assist with your legal needs.
          </p>
        </AnimateUp>
      </Layout1>
    </div>
  );
}
