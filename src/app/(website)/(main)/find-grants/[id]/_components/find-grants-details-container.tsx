"use client";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import Image from "next/image";
import React, { useState } from "react";
import WishlistModal from "./wishlist-modal";

export interface SingleGrantResponse {
  status: boolean;
  message: string;
  data: GrantItem;
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
  fileUrl?: string; // optional single file
  fileUrls?: string[]; // optional array of files
  status: "upcoming" | "open" | "closed";
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
}


const grantData = {
    category: "Business",
    location: "Australia",
    region: "Any",
    maxFunding: "$3M",
    minFunding: "$100,000",
    totalFundingPool: "$848M",
    competitive: "Yes",
    coContribution: "Any",
    activities: "Small Business Digital Adoption Grant",
    industries: "General",
    fundingType: "Grant",
    country: "Australia",
    governmentTier: "Federal",
    department: "Any",
    contact: {
      administration: "Small Business Digital Adoption Grant",
      phone: "857496123",
      generalWebsite: "#",
      programWebsite: "#",
      applyNow: "#",
    },
  };


const FindGrantsDetailsContainer = ({ id }: { id: string }) => {
    const [wishlistModalOpen, setWishlistModalOpen] = useState(false);
  const { data, isLoading, isError, error } = useQuery<SingleGrantResponse>({
    queryKey: ["single-grant", id],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/grant/${id}`);
      return res.json();
    },
  });

  console.log("single grants", data);

  const grant = data?.data;

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  return (
    <div className="py-10 md:py-16 lg:py-20 px-4 md:px-0">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6 lg:gap-8 md:gap-11 lg:gap-[54px]">
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0C2661] leading-[150%]">
            {grant?.title}
          </h3>
          <div>
            <p className="text-sm font-medium text-[#686869] leading-[150%] flex items-center gap-2">
              Add Wishlist
              {/* <Heart /> */}
              <button onClick={()=>{setWishlistModalOpen(true)}} className="cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                >
                  <path
                    d="M15.9993 27.9999L14.066 26.2665C11.8216 24.2443 9.96602 22.4999 8.49935 21.0332C7.03268 19.5665 5.86602 18.2554 4.99935 17.0999C4.13268 15.9221 3.52157 14.8443 3.16602 13.8665C2.83268 12.8888 2.66602 11.8888 2.66602 10.8665C2.66602 8.77765 3.36602 7.0332 4.76602 5.6332C6.16602 4.2332 7.91046 3.5332 9.99935 3.5332C11.1549 3.5332 12.2549 3.77765 13.2993 4.26654C14.3438 4.75543 15.2438 5.44431 15.9993 6.3332C16.7549 5.44431 17.6549 4.75543 18.6993 4.26654C19.7438 3.77765 20.8438 3.5332 21.9993 3.5332C24.0882 3.5332 25.8327 4.2332 27.2327 5.6332C28.6327 7.0332 29.3327 8.77765 29.3327 10.8665C29.3327 11.8888 29.1549 12.8888 28.7993 13.8665C28.466 14.8443 27.866 15.9221 26.9993 17.0999C26.1327 18.2554 24.966 19.5665 23.4993 21.0332C22.0327 22.4999 20.1771 24.2443 17.9327 26.2665L15.9993 27.9999ZM15.9993 24.3999C18.1327 22.4888 19.8882 20.8554 21.266 19.4999C22.6438 18.1221 23.7327 16.9332 24.5327 15.9332C25.3327 14.911 25.8882 14.011 26.1994 13.2332C26.5105 12.4332 26.666 11.6443 26.666 10.8665C26.666 9.5332 26.2216 8.42209 25.3327 7.5332C24.4438 6.64432 23.3327 6.19987 21.9993 6.19987C20.9549 6.19987 19.9882 6.49987 19.0993 7.09987C18.2105 7.67765 17.5993 8.42209 17.266 9.3332H14.7327C14.3994 8.42209 13.7882 7.67765 12.8993 7.09987C12.0105 6.49987 11.0438 6.19987 9.99935 6.19987C8.66602 6.19987 7.5549 6.64432 6.66602 7.5332C5.77713 8.42209 5.33268 9.5332 5.33268 10.8665C5.33268 11.6443 5.48824 12.4332 5.79935 13.2332C6.11046 14.011 6.66602 14.911 7.46602 15.9332C8.26602 16.9332 9.3549 18.1221 10.7327 19.4999C12.1105 20.8554 13.866 22.4888 15.9993 24.3999Z"
                    // fill="#0C2661"
                    fill="#000"
                  />
                </svg>
              </button>
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-11 lg:gap-[54px] pt-5 md:pt-7 lg:pt-10">
          <div className="md:col-span-2">
            <div className="pb-6 md:pb-8 lg:pb-10">
              <h4 className="text-2xl md:text-2xl lg:text-4xl text-[#424242] leading-[150%] font-semibold">
                Description
              </h4>
              <p className="text-base md:text-lg font-normal text-[#686869] leading-[150%] pt-2">
                {grant?.description}
              </p>
            </div>
            <div>
              <h4 className="text-2xl md:text-3xl lg:text-4xl text-[#424242] leading-[150%] font-semibold">
                Industries
              </h4>
              <div className="flex items-center gap-3">
                {
                  grant?.industry?.map((item)=>{
                    return <button key={item} className="text-[#424242] text-xs font-medium leading-[16px] rounded-full bg-[#96C7FF] p-2">
                {" "}
                {item}
              </button>
                  })
                }
              </div>
              
            </div>
            <div className="py-6 md:py-8 lg:py-10">
              <h4 className="text-2xl md:text-3xl lg:text-4xl text-[#424242] leading-[150%] font-semibold">
                Price
              </h4>
              <p className="text-base md:text-lg font-normal text-[#686869] leading-[150%] pt-2">
                {grant?.funding}
              </p>
            </div>
            <div>
              <h4 className="text-2xl md:text-3xl lg:text-4xl text-[#424242] leading-[150%] font-semibold">
                Deadline
              </h4>
              <p className="text-base md:text-lg font-normal text-[#686869] leading-[150%] pt-2">
                {moment(grant?.deadline).format("MMMM DD, YYYY")}
              </p>
            </div>
          </div>
          <div className="md:col-span-1">
           <div className="mb-6">
             <Image
              src={grant?.imageUrl || "/assets/images/No_Image_Available.jpg"}
              alt={grant?.title || "grant image"}
              width={5500}
              height={3500}
              className="rounded-md border-[2px] border-[#96C7FF] w-full h-[463px] object-cover"
            />
           </div>

           {/* cart data  */}

           <div>
            <p className="grid grid-cols-1 md:grid-cols-2"> <span className="text-sm md:text-base font-semibold text-[#686869] leading-[150%]">Location</span> <span className="flex items-center">{grant?.location?.map((item)=>{
              return <div key={item} >
                {item}
              </div>
            })}</span></p>
            <p className="grid grid-cols-1 md:grid-cols-2 py-3 md:py-4"> <span className="text-sm md:text-base font-semibold text-[#686869] leading-[150%]">funding</span> <span>{grant?.funding}</span></p>
             <p className="grid grid-cols-1 md:grid-cols-2"> <span className="text-sm md:text-base font-semibold text-[#686869] leading-[150%]">Activities</span> <span className="flex items-center">{grant?.activity?.map((item)=>{
              return <div key={item} >
                {item}
              </div>
            })}</span></p>
            <p className="grid grid-cols-1 md:grid-cols-2 py-3 md:py-4"> <span className="text-sm md:text-base font-semibold text-[#686869] leading-[150%]">Industries</span> <span className="flex items-center">{grant?.industry?.map((item)=>{
              return <div key={item} >
                {item}
              </div>
            })}</span></p>
            <p className="grid grid-cols-1 md:grid-cols-2"> <span className="text-sm md:text-base font-semibold text-[#686869] leading-[150%]">funding Type</span> <span>{grant?.type}</span></p>
           </div>
          </div>
        </div>
      </div>
      {/* wishlist modal  */}
      <div>
        {
            wishlistModalOpen && <WishlistModal isOpen={wishlistModalOpen} onClose={()=>{setWishlistModalOpen(false)}} id={id} />
        }
      </div>
    </div>
  );
};

export default FindGrantsDetailsContainer;
