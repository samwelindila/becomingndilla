import Hero from "../components/home/Hero";
import Pillars from "../components/home/Pillars";
import FeaturedProjects from "../components/home/FeaturedProjects";
import VenturesTeaser from "../components/home/VenturesTeaser";
import LatestPosts from "../components/home/LatestPosts";
import CallToAction from "../components/home/CallToAction";
import Testimonials from "../components/home/Testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <Pillars />
      <FeaturedProjects />
      <VenturesTeaser />
      <LatestPosts />
            <Testimonials />
      <CallToAction />
    </>
  );
}