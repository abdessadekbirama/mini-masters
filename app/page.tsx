import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Slider from "./components/Slider";
import Mobile from "./components/Mobile";
import MobileSection from "./components/MobileSection";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Slider />
      <MobileSection />
      <div className="py-40"></div>
    </>
  );
}
