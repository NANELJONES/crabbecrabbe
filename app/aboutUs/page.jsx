export { metadata } from "./metadata";

import Heading from "../components/Heading";
import AnimateUp from "../components/AnimateUp";
import Layout1 from "../layout/Layout1";
import CoreValues from "./components/CoreValues";
import MissionVision from "./components/MissionVision";
import WhoAreWe from "./components/WhoAreWe";
import AboutUs from "./components/AboutUs";
import WhyClientsChooseUs from "./components/WhyClientsChooseUs";
import CTA from "../components/CTA";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Layout1>
        <AnimateUp>
          <Heading
            heading="About Crabbe Crabbe & Co."
            subHeading="Information about our legal practice, mission, values, and offices in Ghana."
          />
        </AnimateUp>

        <AnimateUp>
          <WhoAreWe />
        </AnimateUp>
        <AnimateUp delay={0.05}>
          <AboutUs />
        </AnimateUp>
        <AnimateUp delay={0.05}>
          <MissionVision />
        </AnimateUp>
        <AnimateUp delay={0.05}>
          <CoreValues />
        </AnimateUp>
        <AnimateUp delay={0.05}>
          <WhyClientsChooseUs />
        </AnimateUp>
        <AnimateUp>
          <CTA />
        </AnimateUp>
      </Layout1>
    </div>
  );
}
