export { metadata } from "./metadata";

import Heading from "../components/Heading";
import AnimateUp from "../components/AnimateUp";
import Layout1 from "../layout/Layout1";
import CasesList from "./components/CasesList";

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

        <CasesList />
      </Layout1>
    </div>
  );
}
