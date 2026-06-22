export { metadata } from "./metadata";

import Heading from "../components/Heading";
import AnimateUp from "../components/AnimateUp";
import Layout1 from "../layout/Layout1";
import PracticeAreasLayout from "./components/PracticeAreasLayout";

export default function PracticeAreasPage() {
  return (
    <div className="min-h-screen bg-white">
      <Layout1>
        <AnimateUp>
          <Heading
            heading="Our Practice Areas"
            subHeading="Legal services offered by the Firm to individuals, corporations, and institutions in Ghana."
          />
        </AnimateUp>
      </Layout1>

      <AnimateUp delay={0.05}>
        <PracticeAreasLayout />
      </AnimateUp>
    </div>
  );
}
