import Heading from "../components/Heading";
import Layout1 from "../layout/Layout1";
import PracticeAreasLayout from "./components/PracticeAreasLayout";

export default function PracticeAreasPage() {
  return (
    <div className="min-h-screen bg-white">
      <Layout1>
        <Heading
          heading="Our Practice Areas"
          subHeading="Comprehensive legal services for individuals, corporations, and institutions across Ghana."
        />
      </Layout1>

      <PracticeAreasLayout />
    </div>
  );
}
