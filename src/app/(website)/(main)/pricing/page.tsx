import React from "react";
import PricingContainer from "./_components/pricing-container";
import { Hero } from "@/components/common/Hero";
import { Faq } from "@/components/web/Faq";
import { Testimonials } from "@/components/web/testimonials";

const PricingPage = () => {
  return (
    <div>
      <Hero
        title="Simple Transparent Pricing"
        subtitle={
          <>
            Select your plan and access the grants you need to grow and prosper.
          </>
        }
      />
      <PricingContainer />

      <Faq />
      <Testimonials />
    </div>
  );
};

export default PricingPage;
