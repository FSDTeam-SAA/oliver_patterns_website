"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import moment from "moment";
import Link from "next/link";
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
  location: string;
  activity: string;
  industry: string;
  description: string;
  imageUrl: string;
  fileUrls?: string[]; // sometimes array exists
  fileUrl?: string; // sometimes single file URL exists
  status: "open" | "closed" | "upcoming";
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const ExploreAvailableGrants = () => {
  const { data, isLoading, isError, error } = useQuery<GrantResponse>({
    queryKey: ["grants"],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/grant`);
      return res.json();
    },
  });

  console.log(data)

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  return (
    <div className="py-10 md:py-16 lg:py-20">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl lg:text-[40px] font-bold text-[#0C2661] leading-[150%]">
          Explore Available Grants
        </h2>
        <p className="text-sm md:text-base font-normal text-[#424242] leadig-[150%] pt-2 md:pt-3">
          Browse funding opportunities matched to your business goals and see
          what support you qualify for.
        </p>

        {/* carts  */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 md:pt-12 lg:pt-16">
        {
          data?.data?.items?.map((item)=>{
            return <div key={item?._id} className="rounded-lg bg-white shadow-[0_1px_2px_0_rgba(0,0,0,0.12),0_0_0_0_rgba(0,0,0,0.06),0_0_0_0_rgba(0,0,0,0.04)] p-5 md:p-6">
              <h4  className="text-lg md:text-xl lg:text-2xl font-bold text-[#0C2661] leading-[120%]">{item?.title}</h4>
              <p className="text-sm  font-normal text-[#424242] leading-[150%] pt-2 md:pt-3">{item?.description}</p>

              <div className="flex items-center gap-2 py-3 md:py-4 lg:py-5">
                <button className="text-[#1D326D] text-xs font-medium leading-[16px] rounded-full bg-[#E7F1FE] shadow-[0_4px_11px_rgba(0,0,0,0.10)] py-[2px] px-[10px]"> {item?.funding}</button>
                <button className="text-[#1D326D] text-xs font-medium leading-[16px] rounded-full bg-[#FAFCFF] shadow-[0_4px_11px_rgba(0,0,0,0.10)] py-[2px] px-2">Deadline : {moment(item?.deadline).format("DD-MM-YYYY")}</button>
                <button className="text-[#1D326D] text-xs font-medium leading-[16px] rounded-full bg-[#E7F1FE] shadow-[0_4px_11px_rgba(0,0,0,0.10)] py-[2px] px-2">Deadline : {item?.type}</button>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-xs font-normal text-[#424242] leading-[150%] ">{item?.location}</p>
                <Link href={`/find-grants/${item?._id}`}>
                <button className="text-xs font-semibold text-[#E8F3FF] cursor-pointer leading-[150%] rounded-md border border-[#E8F3FF] bg-gradient-to-b from-[#355AC7] to-[#1271F2] py-2 px-3">View Details</button>
                </Link>
              </div>
            </div>
          })
        }
        </div>
      </div>
    </div>
  );
};

export default ExploreAvailableGrants;
