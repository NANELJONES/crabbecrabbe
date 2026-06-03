import AboutUs from "./components/AboutUs";
import CTA from "./components/CTA";
import Header from "./components/Header";
import MessageFromFounder from "./components/MessageFromFounder";
import PracticeAreas from "./components/PracticeAreas";
import Testimonials from "./components/Testimonials";
import UniqueValueProposition from "./components/UniqueValueProposition";
import BlogSample from "./components/BlogSample";

export default function Home() {
  return (
    <>
      <Header />
      <AboutUs />
      <MessageFromFounder />
      <PracticeAreas />
      <UniqueValueProposition />
      <BlogSample />
      <Testimonials />
      <CTA />
    </>
  );
}
