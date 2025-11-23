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

  return (
    <div className="pt-10 md:pt-16 lg:pt-20">
      {/* Pricing Toggle */}
      {/* <div className="flex justify-center mb-12">
        <PricingToggle isAnnual={isAnnual} setIsAnnual={setIsAnnual} />
      </div> */}

      {/* Pricing Cards */}
      <div className="px-4 sm:px-6 lg:px-8">{content}</div>
    </div>
  );
};

export default PricingContainer;
