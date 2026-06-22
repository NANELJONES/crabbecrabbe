export { metadata } from "./metadata";

import Heading from "../components/Heading";
import AnimateUp from "../components/AnimateUp";
import Layout1 from "../layout/Layout1";
import CareersList from "./components/CareersList";

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-white">
      <Layout1>
        <AnimateUp>
          <Heading
            heading="Careers"
            subHeading="Current employment opportunities at Crabbe, Crabbe & Co."
          />
        </AnimateUp>

        <CareersList />
      </Layout1>
    </div>
  );
}
