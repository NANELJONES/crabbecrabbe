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
            subHeading="Representative matters handled by the Firm across its practice areas."
          />
        </AnimateUp>

        <CasesList />
      </Layout1>
    </div>
  );
}
