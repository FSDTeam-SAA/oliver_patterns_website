"use client";
import React, { useState } from "react";
import { PricingToggle } from "./pricing-toggle";
import { PricingCard } from "./pricing-card";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import PricingSkeleton from "./pricing-skeleton";
import NotFound from "@/components/common/NotFound/NotFound";
import ErrorContainer from "@/components/common/ErrorContainer/ErrorContainer";

export interface PlanResponse {
  status: boolean;
  message: string;
  data: {
    items: PlanItem[];
    pagination: Pagination;
  };
}

export interface PlanItem {
  _id: string;
  name: string;
  price: number;
  billingCycle: "monthly" | "yearly";
  title: string;
  features: string[];
  status: "active" | "inactive";
  subscribers: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

const PricingContainer = () => {
  let content;
  const session = useSession();
  const token = (session?.data?.user as { accessToken: string })?.accessToken;
  console.log(token);
  const [isAnnual, setIsAnnual] = useState(true);

  const { data, isLoading, isError, error } = useQuery<PlanResponse>({
    queryKey: ["plans"],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/plan`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return res.json();
    },
  });

  console.log(data);

  if (isLoading) {
    content = (
      <div>
        <PricingSkeleton />
      </div>
    );
  } else if (isError) {
    content = (
      <div className="container mx-auto">
        <ErrorContainer message={error?.message || "Something went Wrong"} />
      </div>
    );
  } else if (
    data &&
    data?.data &&
    data?.data?.items &&
    data?.data?.items?.length === 0
  ) {
    content = (
      <div className="container mx-auto">
        <NotFound message="Oops! No data available. Modify your filters or check your internet connection." />
      </div>
    );
  } else if (
    data &&
    data?.data &&
    data?.data?.items &&
    data?.data?.items?.length > 0
  ) {
    content = (
      <div className="w-full flex flex-col md:flex-row items-center justify-center gap-6 mb-12=">
        {data?.data?.items?.map((plan) => (
          // <PricingCard key={plan?.name} {...plan} />
          <PricingCard key={plan?.name} plan={plan} />
        ))}
      </div>
    );
  }

  // const pricingPlans = [
  //   {
  //     name: "Free",
  //     badge: "",
  //     price: 0,
  //     period: "month",
  //     description: "Perfect for getting started and exploring available grants",
  //     billingInfo: "Billed annually ($0/year)",
  //     features: [
  //       "Basic grant search",
  //       "Save up to 5 grants",
  //       "Email notifications",
  //       "Limited filter options",
  //     ],
  //     buttonText: "Sign up for free",
  //     buttonVariant: "outline" as const,
  //   },
  //   {
  //     name: "Premium",
  //     badge: "Save 20%",
  //     price: isAnnual ? 29 : 3,
  //     period: isAnnual ? "year" : "month",
  //     description: "The complete solution for serious business grant seekers",
  //     billingInfo: isAnnual ? "Billed annually ($348/year)" : "Billed monthly",
  //     features: [
  //       "Unlimited grant searches",
  //       "Unlimited saved grants",
  //       "Advanced filters & sorting",
  //       "Personalized recommendations",
  //       "Deadline reminders & calendar",
  //       "Export grant details",
  //       "Expert grant support",
  //       "Application tracking",
  //     ],
  //     buttonText: "Get Premium",
  //     buttonVariant: "default" as const,
  //     featured: true,
  //   },
  //   {
  //     name: "Basic",
  //     badge: "",
  //     price: isAnnual ? 9.99 : 9.99,
  //     period: "month",
  //     description: "Perfect for getting started and exploring available grants",
  //     billingInfo: "Billed monthly",
  //     features: [
  //       "Basic grant search",
  //       "Save up to 5 grants",
  //       "Email notifications",
  //       "Limited filter options",
  //     ],
  //     buttonText: "Get Basic",
  //     buttonVariant: "outline" as const,
  //   },
  // ];

  return (
    <div className="pt-10 md:pt-16 lg:pt-20">
      {/* Pricing Toggle */}
      <div className="flex justify-center mb-12">
        <PricingToggle isAnnual={isAnnual} setIsAnnual={setIsAnnual} />
      </div>

      {/* Pricing Cards */}
      <div className="px-4 sm:px-6 lg:px-8">{content}</div>
    </div>
  );
};

export default PricingContainer;
