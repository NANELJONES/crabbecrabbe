import Heading from "../components/Heading";
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
        <Heading
          heading="About Crabbe Crabbe & Co."
          subHeading="Learn about our mission, values, and commitment to exceptional legal service in Ghana."
        />

        <WhoAreWe />
        <AboutUs />
       
        <MissionVision />
        <CoreValues />
        <WhyClientsChooseUs />
        <CTA />
      </Layout1>
    </div>
  );
}
