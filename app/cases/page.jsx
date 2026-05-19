import Heading from "../components/Heading";
import Layout1 from "../layout/Layout1";

export default function CasesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Layout1>
        <Heading
          heading="Our Cases"
          subHeading="Explore notable matters and outcomes that reflect our commitment to trusted advocacy and proven results."
        />
        <p className="mt-10 max-w-2xl text-secondary_color">
          Case studies and representative matters will be published here soon.
          Contact us to discuss how we can assist with your legal needs.
        </p>
      </Layout1>
    </div>
  );
}
