"use client";

import React from "react";
import { PricingCard } from "./pricing-card";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import PricingSkeleton from "./pricing-skeleton";
import NotFound from "@/components/common/NotFound/NotFound";
import ErrorContainer from "@/components/common/ErrorContainer/ErrorContainer";

export interface PlanItem {
  _id: string;
  name: string;
  price: number;
  billingCycle: string;
  title: string;
  features: string[];
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const PricingContainer = () => {
  const { data: session } = useSession();
  const token = (session?.user as {accessToken:string})?.accessToken;

  const { data, isLoading, isError } = useQuery<{
    status: boolean;
    data: { items: PlanItem[] };
  }>({
    queryKey: ["plans"],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/plan`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to load plans");
      return res.json();
    },
  });

  if (isLoading) return <PricingSkeleton />;
  if (isError)
    return (
      <div className="container mx-auto py-20">
        <ErrorContainer message="Failed to load pricing plans" />
      </div>
    );
  if (!data?.data?.items?.length)
    return (
      <div className="container mx-auto py-20">
        <NotFound message="No plans available" />
      </div>
    );

  const plans = data.data.items;

  // Force Premium to center
  const premiumPlan = plans.find(p => p.name.toLowerCase() === "premium");
  const otherPlans = plans
    .filter(p => p.name.toLowerCase() !== "premium")
    .sort((a, b) => {
      // Optional: make "basic" appear on the right
      if (a.name.toLowerCase() === "basic") return 1;
      if (b.name.toLowerCase() === "basic") return -1;
      return 0;
    });

  return (
    <section className="pt-16 lg:pt-24">
      <div className="container mx-auto px-4">

        {/* Desktop: 3-column grid with Premium in center */}
        <div className="hidden md:grid md:grid-cols-3 gap-8 lg:gap-12 items-start max-w-7xl mx-auto">
          {/* Left: proPlan */}
          <div className="h-full flex items-center justify-end">
            {otherPlans[1] && <PricingCard plan={otherPlans[1]} />}
          </div>

          {/* Center: PREMIUM (always middle) */}
          <div className="h-full flex items-center justify-center">
            {premiumPlan && (
              <div className="transform scale-105 lg:scale-110 ">
                <PricingCard plan={premiumPlan} isPopular />
              </div>
            )}
          </div>

          {/* Right: basic */}
          <div className="h-full flex items-center justify-start">
            {otherPlans[0] && <PricingCard plan={otherPlans[0]} />}
          </div>
        </div>

        {/* Mobile: Stacked (Premium first for visibility) */}
        <div className="md:hidden flex flex-col gap-8 items-center">
          {premiumPlan && (
            <div className="w-full max-w-sm">
              <PricingCard plan={premiumPlan} isPopular />
            </div>
          )}
          {otherPlans.map(plan => (
            <div key={plan._id} className="w-full max-w-sm">
              <PricingCard plan={plan} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingContainer;














// "use client";
// import React, { useState } from "react";
// import { PricingToggle } from "./pricing-toggle";
// import { PricingCard } from "./pricing-card";
// import { useQuery } from "@tanstack/react-query";
// import { useSession } from "next-auth/react";
// import PricingSkeleton from "./pricing-skeleton";
// import NotFound from "@/components/common/NotFound/NotFound";
// import ErrorContainer from "@/components/common/ErrorContainer/ErrorContainer";

// export interface PlanResponse {
//   status: boolean;
//   message: string;
//   data: {
//     items: PlanItem[];
//     pagination: Pagination;
//   };
// }

// export interface PlanItem {
//   _id: string;
//   name: string;
//   price: number;
//   billingCycle: "monthly" | "yearly";
//   title: string;
//   features: string[];
//   status: "active" | "inactive";
//   subscribers: string[];
//   createdAt: string;
//   updatedAt: string;
//   __v: number;
// }

// export interface Pagination {
//   page: number;
//   limit: number;
//   total: number;
//   pages: number;
// }

// const PricingContainer = () => {
//   let content;
//   const session = useSession();
//   const token = (session?.data?.user as { accessToken: string })?.accessToken;
//   console.log(token);
//   const [isAnnual, setIsAnnual] = useState(true);

//   const { data, isLoading, isError, error } = useQuery<PlanResponse>({
//     queryKey: ["plans"],
//     queryFn: async () => {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/plan`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       return res.json();
//     },
//   });

//   console.log(data);

//   if (isLoading) {
//     content = (
//       <div>
//         <PricingSkeleton />
//       </div>
//     );
//   } else if (isError) {
//     content = (
//       <div className="container mx-auto">
//         <ErrorContainer message={error?.message || "Something went Wrong"} />
//       </div>
//     );
//   } else if (
//     data &&
//     data?.data &&
//     data?.data?.items &&
//     data?.data?.items?.length === 0
//   ) {
//     content = (
//       <div className="container mx-auto">
//         <NotFound message="Oops! No data available. Modify your filters or check your internet connection." />
//       </div>
//     );
//   } else if (
//     data &&
//     data?.data &&
//     data?.data?.items &&
//     data?.data?.items?.length > 0
//   ) {
//     content = (
//       <div className="w-full flex flex-col md:flex-row items-center justify-center gap-6 mb-12=">
//         {data?.data?.items?.map((plan) => (
//           // <PricingCard key={plan?.name} {...plan} />
//           <PricingCard key={plan?.name} plan={plan} />
//         ))}
//       </div>
//     );
//   }

//   return (
//     <div className="pt-10 md:pt-16 lg:pt-20">
//       {/* Pricing Toggle */}
//       {/* <div className="flex justify-center mb-12">
//         <PricingToggle isAnnual={isAnnual} setIsAnnual={setIsAnnual} />
//       </div> */}

//       {/* Pricing Cards */}
//       <div className="px-4 sm:px-6 lg:px-8">{content}</div>
//     </div>
//   );
// };

// export default PricingContainer;
