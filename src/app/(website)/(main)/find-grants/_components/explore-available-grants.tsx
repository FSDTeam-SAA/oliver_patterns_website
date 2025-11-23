"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import moment from "moment";
import Link from "next/link";
import { useDebounce } from "@/components/hooks/useDebounce";
import ErrorContainer from "@/components/common/ErrorContainer/ErrorContainer";
import NotFound from "@/components/common/NotFound/NotFound";
import GrantLoadingSkeleton from "./grant-card-skeleton";
import OliverDropDown from "@/components/ui/Oliver-Dropdown";
import { useSession } from "next-auth/react";
export interface GrantResponse {
  status: boolean;
  message: string;
  data: {
    items: GrantItem[];
    total: number;
    page: number;
    limit: number;
  };
}

export interface GrantItem {
  _id: string;
  title: string;
  type: string;
  funding: string;
  deadline: string; // ISO date string
  location: string[];
  activity: string[];
  industry: string[];
  description: string;
  imageUrl: string;
  fileUrls?: string[]; // optional because some items have fileUrl or empty array
  fileUrl?: string; // some entries use `fileUrl` instead of `fileUrls`
  status: "upcoming" | "open" | "closed"; // you can expand as needed
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
}

// industries data
const INDUSTRY_ENUM = [
  "General - Non-Industry Specific",
  "Aeronautics",
  "Agriculture",
  "Automotive and Marine",
  "Building, Construction and Engineering",
  "Defence",
  "Education",
  "Energy and Renewables",
  "Finance and Business Services",
  "Food and Beverage",
  "Healthcare, Medical, Biotechnology and Nanotechnology",
  "Information Technology and Communication (ICT)",
  "Media and Entertainment",
  "Mining",
  "Textile, Clothing and Footwear",
  "Tourism",
  "Other - Not Listed",
];

const industryOptions = INDUSTRY_ENUM.map((item) => ({
  label: item,
  value: item,
}));

// location data 
const LOCATION_ENUM = [
  "all Australia",
  "National",
  "Australian Capital Territory",
  "New South Wales",
  "Northern Territory",
  "Queensland",
  "South Australia",
  "Tasmania",
  "Victoria",
  "Western Australia"
];
const locationOptions = LOCATION_ENUM.map((item) =>({
  label: item,
  value: item,
}));

// activity data 
const ACTIVITY_ENUM = [
  "General Operations",
  "Environment and Sustainability",
  "Export",
  "Infrastructure / Equipment",
  "Innovation and R&D",
  "Manufacturing",
  "Marketing",
  "Start-up / Establishment",
  "Training / Employment",
  "Transport and Distribution",
  "Wholesale and Retail Trade"
];

const activityOptions = ACTIVITY_ENUM.map((item)=>({
  label: item,
  value: item,
}));

const ExploreAvailableGrants = () => {

  const session = useSession();
  const token = (session?.data?.user as {accessToken: string})?.accessToken;
  const [search, setSearch] = React.useState<string>("");
  const [industry, setIndustry] = React.useState<string>("");
  const [location, setLocation] = React.useState<string>("");
  const [activity, setActivity] = React.useState<string>("");
  const debouncedSearch = useDebounce(search, 500);
  let content;
  console.log(search);
  const { data, isLoading, isError, error } = useQuery<GrantResponse>({
    queryKey: ["grants", debouncedSearch, industry, location, activity],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/grant`,{
          method: "GET",
          headers : {
            // "Content-Type": "application/json",
            "Authorization" : `Bearer ${token}`
          }
        }
      );
      return res.json();
    },
    enabled: debouncedSearch !== undefined,
  });

  console.log(data);

  if (isLoading) {
    content = (
      <div className="pt-4 md:pt-6 lg:pt-8">
        <GrantLoadingSkeleton />
      </div>
    );
  } else if (isError) {
    content = (
      <div className="container mx-auto pt-4 md:pt-6 lg:pt-8">
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
      <div className="pt-4 md:pt-6 lg:pt-8">
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 md:pt-12 lg:pt-16">
        {data?.data?.items?.map((item) => {
          return (
            <div
              key={item?._id}
              className="rounded-lg bg-white border border-gray-100 shadow-[0_1px_2px_0_rgba(0,0,0,0.12),0_0_0_0_rgba(0,0,0,0.06),0_0_0_0_rgba(0,0,0,0.04)] p-5 md:p-6"
            >
              <h4 className="text-lg md:text-xl lg:text-2xl font-bold text-[#0C2661] leading-[120%]">
                {item?.title}
              </h4>
              <p className="text-sm  font-normal text-[#424242] leading-[150%] pt-2 md:pt-3">
                {item?.description}
              </p>

              <div className="flex items-center gap-2 py-3 md:py-4 lg:py-5">
                <button className="text-[#1D326D] text-xs font-medium leading-[16px] rounded-full bg-[#E7F1FE] shadow-[0_4px_11px_rgba(0,0,0,0.10)] py-[2px] px-[10px]">
                  {" "}
                  {item?.funding}
                </button>
                <button className="text-[#1D326D] text-xs font-medium leading-[16px] rounded-full bg-[#FAFCFF] shadow-[0_4px_11px_rgba(0,0,0,0.10)] py-[2px] px-2">
                  Deadline : {moment(item?.deadline).format("DD-MM-YYYY")}
                </button>
                <button className="text-[#1D326D] text-xs font-medium leading-[16px] rounded-full bg-[#E7F1FE] shadow-[0_4px_11px_rgba(0,0,0,0.10)] py-[2px] px-2">
                  Deadline : {item?.type}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-xs font-normal text-[#424242] leading-[150%] ">
                  {item?.location}
                </p>
                <Link href={`/find-grants/${item?._id}`}>
                  <button className="text-xs font-semibold text-[#E8F3FF] cursor-pointer leading-[150%] rounded-md border border-[#E8F3FF] bg-gradient-to-b from-[#355AC7] to-[#1271F2] py-2 px-3">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="py-10 md:py-16 lg:py-20 ">
      <div className="bg-[linear-gradient(91deg,#CCE5FF_3.19%,#D7E8FB_96.81%)] mb-10 md:mb-16 lg:mb-20">
        <div className="container mx-auto py-6 px-4 md:px-0">
          <p className="text-xl md:text-[22px] lg:text-2xl font-semibold text-[#0C2661] leading-[150%]">
            Search 1,285 business grants worth $50B
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 lg:gap-10"> 
            <div className="md:col-span-1 pt-4 md:pt-5 lg:pt-6">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="search"
              className="w-full h-[60px] p-4 outline-none rounded-[4px] border border-[#0C2661] bg-[#FAFCFF] text-[#0C2661] placeholder:text-[#8E938F] text-base font-normal leading-[150%]"
              placeholder="Search grants by keyword, title, or description"
            />
          </div>
          <div className="md:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6 pt-4 md:pt-5 lg:pt-6"> 
            <OliverDropDown
              options={industryOptions}
              placeholder="Select Business Industry"
              value={industry}
              onChange={setIndustry}
            />
             <OliverDropDown
              options={locationOptions}
              placeholder="Select Business Location"
              value={location}
              onChange={setLocation}
            />
            <OliverDropDown
              options={activityOptions}
              placeholder="Select Business Activity"
              value={activity}
              onChange={setActivity}
            />
          </div>
          </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 md:px-0">
        <h2 className="text-2xl md:text-3xl lg:text-[40px] font-bold text-[#0C2661] leading-[150%]">
          Explore Available Grants
        </h2>
        <p className="text-sm md:text-base font-normal text-[#424242] leadig-[150%] pt-2 md:pt-3">
          Browse funding opportunities matched to your business goals and see
          what support you qualify for.
        </p>

        {/* carts  */}

        <div>{content}</div>
      </div>
    </div>
  );
};

export default ExploreAvailableGrants;
