"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { GrantResponse } from "../../_components/explore-available-grants";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import moment from "moment";
import Link from "next/link";

const RelatedGrants = () => {
  const { data, isLoading, isError, error } = useQuery<GrantResponse>({
    queryKey: ["grants"],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/grant`);
      return res.json();
    },
  });

  console.log(data);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  return (
    <div className="py-10 md:py-16 lg:py-20">
      <div className="container mx-auto">
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0C2661] leading-[150%]">
          See Related Grants
        </h3>
        <p className="text-base font-normal text-[#424242] leading-[150%] pt-1">
          Browse funding opportunities matched to your business goals and see
          what support you qualify for.
        </p>

        {/* related grants carts */}

        <div className="pt-8 md:pt-12 lg:pt-16">
          <Carousel
            plugins={[
              Autoplay({
                delay: 3000,
                stopOnInteraction: false,
                stopOnMouseEnter: true,
              }),
            ]}
            opts={{
              loop: true,
            }}
          >
            <CarouselContent className="gap-6">
              {data?.data?.items?.map((item) => {
                return (
                  <CarouselItem
                    key={item?._id}
                    className="basis-1/1 md:basis-1/2 lg:basis-1/2 rounded-lg border bg-white shadow-[0_1px_2px_0_rgba(0,0,0,0.12),0_0_0_0_rgba(0,0,0,0.06),0_0_0_0_rgba(0,0,0,0.04)] p-5 md:p-6"
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
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default RelatedGrants;
