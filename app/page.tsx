import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Slider from "./components/Slider";
import MobileSection from "./components/MobileSection";
import Location from "./components/Location";
import Faq from "./components/Faq";
import AnimatedSlider from "./components/AnimatedSilder";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Slider />
      <MobileSection />
      <Location />
      <Faq />
      <AnimatedSlider direction="right" />
    </>
  );
}
