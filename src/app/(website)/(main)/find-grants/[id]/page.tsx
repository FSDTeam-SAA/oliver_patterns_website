import React from "react";
import FindGrantsDetailsContainer from "./_components/find-grants-details-container";
import { Faq } from "@/components/web/Faq";
import { Testimonials } from "@/components/web/testimonials";
import RelatedGrants from "./_components/related-grants";

const FindGrantsDetailsPage = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <FindGrantsDetailsContainer id={params?.id || ""} />
      <RelatedGrants/>

      <Faq />
      <Testimonials />
    </div>
  );
};

export default FindGrantsDetailsPage;
