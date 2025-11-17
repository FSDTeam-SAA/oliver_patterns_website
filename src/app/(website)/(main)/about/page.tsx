import { Faq } from "@/components/web/Faq";
import { Hero } from "@/components/web/Hero";
import { Testimonials } from "@/components/web/testimonials";
import OurMission from "./_components/our-mission";
import MeetTeam from "./_components/meet-team";
import { HeroCta } from "@/components/web/hero-cta";

const page = () => {
  return (
    <div>
      <Hero />
      <OurMission />
      <MeetTeam />
      <Faq />
      <HeroCta />
      <Testimonials />
    </div>
  );
};

export default page;
