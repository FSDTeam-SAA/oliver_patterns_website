import { Hero } from "@/components/common/Hero";
import React from "react";
import ExploreAvailableGrants from "./_components/explore-available-grants";
import { Faq } from "@/components/web/Faq";
import { Testimonials } from "@/components/web/testimonials";

const FindGrantsPage = () => {
  return (
    <div className="">
      <Hero
        title="Find Business Grants"
        subtitle={
          <>
            Discover funding opportunities, expert insights, and tools to help
            your business grow through <br /> grants. Search and filter from
            over 1,200 available grants for your business
          </>
        }
      />
      <ExploreAvailableGrants />
      <Faq />
      <Testimonials />
    </div>
  );
};

export default FindGrantsPage;
