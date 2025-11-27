'use client'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import moment from 'moment'
import Link from 'next/link'
import Autoplay from 'embla-carousel-autoplay'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import Image from 'next/image'
import WishlistModal from './wishlist-modal'

// Types
interface GrantData {
  _id: string
  title: string
  type: string
  funding: string
  deadline: string
  location: string[] | string
  activity: string[] | string
  industry: string[] | string
  description: string
  imageUrl: string
  fileUrl?: string
  status: string
  wishlist: boolean
  relatedGrants?: RelatedGrant[]
}

interface RelatedGrant {
  _id: string
  title: string
  type: string
  funding: string
  deadline: string
  location: string[] | string
  activity: string[] | string
  industry: string[] | string
  imageUrl: string
  status: string
}

interface GrantDetailsResponse {
  status: boolean
  message: string
  data: GrantData
}

// Find Grants Details Container Component
export const FindGrantsDetailsContainer = ({ id }: { id: string }) => {
  const [isWishlistOpen, setIsWishlistOpen] = React.useState(false)

  const { data, isLoading, isError, error } = useQuery<GrantDetailsResponse>({
    queryKey: ['grant-details', id],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/grant/${id}`)
      if (!res.ok) throw new Error('Failed to fetch grant details')
      return res.json()
    },
  })

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="text-lg text-gray-600">Loading grant details...</div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="text-lg text-red-600">
          Error:{' '}
          {error instanceof Error ? error.message : 'Failed to load grant'}
        </div>
      </div>
    )
  }

  if (!data?.data) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="text-lg text-gray-600">Grant not found</div>
      </div>
    )
  }

  const grant = data.data
  const locations = Array.isArray(grant.location)
    ? grant.location
    : [grant.location]
  const activities = Array.isArray(grant.activity)
    ? grant.activity
    : [grant.activity]
  const industries = Array.isArray(grant.industry)
    ? grant.industry
    : [grant.industry]

  return (
    <div className="py-10 md:py-16 lg:py-20 px-4 md:px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title */}
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0C2661] leading-tight mb-2">
                {grant.title}
              </h1>
              <p className="text-sm text-gray-500">
                Funding to help small businesses adapt for an increasingly
                digital future
              </p>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#0C2661] mb-4">
                Description
              </h2>
              <p className="text-base text-[#424242] leading-relaxed">
                {grant.description}
              </p>
            </div>

            {/* Eligibility */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#0C2661] mb-4">
                Eligibility
              </h2>
              <div className="space-y-2">
                {locations.map((loc, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full border-2 border-green-500 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-[#424242]">{loc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Industries */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#0C2661] mb-4">
                Industries
              </h2>
              <div className="flex flex-wrap gap-2">
                {industries.map((industry, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-1.5 bg-blue-100 text-[#1D326D] text-sm rounded-full"
                  >
                    {industry}
                  </span>
                ))}
              </div>
            </div>

            {/* Price */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#0C2661] mb-2">
                Price
              </h2>
              <p className="text-base text-[#424242]">{grant.funding}</p>
            </div>

            {/* Deadline */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#0C2661] mb-2">
                Deadline
              </h2>
              <p className="text-base text-[#424242]">
                {moment(grant.deadline).format('MMMM DD, YYYY')}
              </p>
            </div>
          </div>

          {/* Right Column - Image and Details */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Image */}
              <div className="rounded-lg overflow-hidden shadow-lg relative">
                {/* Add Wishlist Button */}
                <button
                  onClick={() => setIsWishlistOpen(true)}
                  className="absolute top-3 right-3 flex items-center gap-1 text-sm text-[#0C2661] bg-white/80 backdrop-blur-sm 
               px-3 py-1.5 rounded-full shadow hover:bg-white transition cursor-pointer"
                >
                  Add Wishlist
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="#0C2661"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 3.75c-1.61 0-3.04.87-3.75 2.19A4.125 4.125 0 0 0 9 3.75C6.38 3.75 4.5 5.81 4.5 8.25c0 4.28 6 9 7.5 9s7.5-4.72 7.5-9c0-2.44-1.88-4.5-4.5-4.5z"
                    />
                  </svg>
                </button>

                {/* Image */}
                <Image
                  src={grant.imageUrl}
                  alt={grant.title}
                  width={640}
                  height={256}
                  className="object-cover w-full h-64"
                />
              </div>

              {/* Details Card */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
                {/* <div className="flex justify-between items-start border-b pb-3">
                  <span className="text-sm text-gray-600">Category</span>
                  <span className="text-sm font-semibold text-[#0C2661]">
                    Business
                  </span>
                </div> */}

                <div className="flex justify-between items-start border-b pb-3">
                  <span className="text-sm text-gray-600">Location</span>
                  <span className="text-sm font-semibold text-[#0C2661] text-right">
                    {locations.join(', ')}
                  </span>
                </div>

                <div className="flex justify-between items-start border-b pb-3">
                  <span className="text-sm text-gray-600">Region</span>
                  <span className="text-sm font-semibold text-[#0C2661]">
                    Any
                  </span>
                </div>

                <div className="flex justify-between items-start border-b pb-3">
                  <span className="text-sm text-gray-600">Max Funding</span>
                  <span className="text-sm font-semibold text-[#0C2661]">
                    {grant.funding}
                  </span>
                </div>

                <div className="flex justify-between items-start border-b pb-3">
                  <span className="text-sm text-gray-600">Min Funding</span>
                  <span className="text-sm font-semibold text-[#0C2661]">
                    {grant.funding}
                  </span>
                </div>

                <div className="flex justify-between items-start border-b pb-3">
                  <span className="text-sm text-gray-600">Activities</span>
                  <span className="text-sm font-semibold text-[#0C2661] text-right">
                    {activities.join(', ')}
                  </span>
                </div>

                <div className="flex justify-between items-start border-b pb-3">
                  <span className="text-sm text-gray-600">Industries</span>
                  <span className="text-sm font-semibold text-[#0C2661] text-right">
                    {industries.join(', ')}
                  </span>
                </div>

                <div className="flex justify-between items-start border-b pb-3">
                  <span className="text-sm text-gray-600">Funding Type</span>
                  <span className="text-sm font-semibold text-[#0C2661]">
                    {grant.type}
                  </span>
                </div>

                <div className="flex justify-between items-start">
                  <span className="text-sm text-gray-600">Country</span>
                  <span className="text-sm font-semibold text-[#0C2661]">
                    Australia
                  </span>
                </div>
              </div>
            </div>
          </div>
          <WishlistModal
            isOpen={isWishlistOpen}
            onClose={() => setIsWishlistOpen(false)}
            id={grant._id}
          />
        </div>
      </div>
    </div>
  )
}

// Related Grants Component
export const RelatedGrants = ({ id }: { id: string }) => {
  const { data, isLoading, isError } = useQuery<GrantDetailsResponse>({
    queryKey: ['grant-details', id],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/grant/${id}`)
      if (!res.ok) throw new Error('Failed to fetch grant details')
      return res.json()
    },
  })

  if (isLoading || isError || !data?.data?.relatedGrants?.length) {
    return null
  }

  const relatedGrants = data.data.relatedGrants

  return (
    <div className="py-10 md:py-16 lg:py-20 px-4 md:px-0 bg-gray-50">
      <div className="container mx-auto">
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0C2661] leading-[150%]">
          See Related Grants
        </h3>
        <p className="text-base font-normal text-[#424242] leading-[150%] pt-1">
          Browse funding opportunities matched to your business goals and see
          what support you qualify for.
        </p>

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
              {relatedGrants.map((item) => {
                const itemLocations = Array.isArray(item.location)
                  ? item.location.join(', ')
                  : item.location

                return (
                  <CarouselItem
                    key={item._id}
                    className="basis-1/1 md:basis-1/2 lg:basis-1/2 rounded-lg border border-gray-100 bg-white shadow-[0_1px_2px_0_rgba(0,0,0,0.12),0_0_0_0_rgba(0,0,0,0.06),0_0_0_0_rgba(0,0,0,0.04)] p-5 md:p-6 lg:p-8"
                  >
                    <h4 className="text-lg md:text-xl lg:text-2xl font-bold text-[#0C2661] leading-[120%]">
                      {item.title}
                    </h4>

                    <div className="flex items-center gap-2 py-3 md:py-4 lg:py-5">
                      <button className="text-[#1D326D] text-xs font-medium leading-[16px] rounded-full bg-[#E7F1FE] shadow-[0_4px_11px_rgba(0,0,0,0.10)] py-[2px] px-[10px]">
                        {item.funding}
                      </button>
                      <button className="text-[#1D326D] text-xs font-medium leading-[16px] rounded-full bg-[#FAFCFF] shadow-[0_4px_11px_rgba(0,0,0,0.10)] py-[2px] px-2">
                        Deadline: {moment(item.deadline).format('DD-MM-YYYY')}
                      </button>
                      <button className="text-[#1D326D] text-xs font-medium leading-[16px] rounded-full bg-[#E7F1FE] shadow-[0_4px_11px_rgba(0,0,0,0.10)] py-[2px] px-2">
                        {item.type}
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="text-xs font-normal text-[#424242] leading-[150%]">
                        {itemLocations}
                      </p>
                      <Link href={`/find-grants/${item._id}`}>
                        <button className="text-xs font-semibold text-[#E8F3FF] cursor-pointer leading-[150%] rounded-md border border-[#E8F3FF] bg-gradient-to-b from-[#355AC7] to-[#1271F2] py-2 px-3 hover:opacity-90 transition-opacity">
                          View Details
                        </button>
                      </Link>
                    </div>
                  </CarouselItem>
                )
              })}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  )
}
