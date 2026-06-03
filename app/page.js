import AboutUs from "./components/AboutUs";
import AnimateUp from "./components/AnimateUp";
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
      <AnimateUp delay={0.05}>
        <MessageFromFounder />
      </AnimateUp>
      <AnimateUp delay={0.05}>
        <PracticeAreas />
      </AnimateUp>
      <AnimateUp delay={0.05}>
        <UniqueValueProposition />
      </AnimateUp>
      <AnimateUp>
        <BlogSample />
      </AnimateUp>
      <AnimateUp delay={0.05}>
        <Testimonials />
      </AnimateUp>
      <AnimateUp>
        <CTA />
      </AnimateUp>
    </>
  );
}
