'use client'

import Image from 'next/image'
import { Star } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { type CarouselApi } from '@/components/ui/carousel'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

export function Testimonials() {
  const [api, setApi] = useState<CarouselApi>()
  const [current, gamut] = useState(0)

  const testimonials = [
    {
      name: 'Sarah Johnson',
      location: 'Sydney, NSW',
       image: '/assets/Avatar.jpg',
      rating: 5,
      text: "I've been ordering from TABLEFRESH for over a year now, and the quality of their organic produce is consistently excellent. The convenience of having fresh, organic food delivered to my door has made healthy eating so much easier for my family.",
    },
    {
      name: 'Michael Chen',
      location: 'Melbourne, VIC',
      image: '/assets/Avatar.jpg',
      rating: 4.5,
      text: 'The customer service is outstanding! They always go above and beyond to ensure my order is perfect. Highly recommend TABLEFRESH to anyone looking for farm-fresh produce.',
    },
    {
      name: 'Emma Williams',
      location: 'Brisbane, QLD',
      image: '/assets/Avatar.jpg',
      rating: 5,
      text: 'As a busy business owner, TABLEFRESH has been a game-changer. The produce is always fresh and lasts longer than supermarket options. My team loves the weekly fruit boxes!',
    },
    {
      name: 'David Martinez',
      location: 'Perth, WA',
      image: '/assets/Avatar.jpg',
      rating: 5,
      text: 'Best decision I made was switching to TABLEFRESH. The variety and quality are unmatched, and I love supporting local Australian farmers directly.',
    },
    {
      name: 'Lisa Thompson',
      location: 'Adelaide, SA',
      image: '/assets/avatar5.jpg',
      rating: 4.5,
      text: 'The seasonal boxes are amazing! Everything arrives fresh and beautifully packed. My family looks forward to opening the box every week.',
    },
    {
      name: 'James Wilson',
      location: 'Canberra, ACT',
       image: '/assets/Avatar.jpg',
      rating: 5,
      text: 'Incredible quality and variety. I’ve tried many services, but nothing comes close to TABLEFRESH. Worth every penny!',
    },
  ]

  useEffect(() => {
    if (!api) return

    const onSelect = () => {
      gamut(api.selectedScrollSnap())
    }

    api.on('select', onSelect)
    onSelect()

    return () => {
      api.off('select', onSelect)
    }
  }, [api])

  return (
    <div className="w-full bg-white py-16 sm:py-20 lg:py-[147px] px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-4xl font-bold text-[#0C2661] mb-4">
            Trusted by Australian Businesses
          </h1>
          <p className="text-[#424242] text-base max-w-2xl mx-auto">
            Hear from business owners who have successfully secured funding using our platform.
          </p>
        </div>

        {/* Carousel */}
        <Carousel
          setApi={setApi}
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-6">
            {testimonials.map((testimonial, index) => (
              <CarouselItem
                key={index}
                className="pl-6 md:basis-1/2 lg:basis-1/3 select-none"
              >
                <Card className="bg-[#DEEEFF] border-0 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 h-full">
                  <CardContent className="p-6 flex flex-col h-full">
                    {/* Header: Avatar + Name + Rating */}
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <div className="flex items-center gap-3">
                        <Image
                          src={testimonial.image || '/placeholder.svg'}
                          alt={testimonial.name}
                          width={56}
                          height={56}
                          className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
                        />
                        <div>
                          <h4 className="font-semibold text-[20px] text-[#0C2661] leading-tight">
                            {testimonial.name}
                          </h4>
                          <p className="text-xs text-[#424242]">{testimonial.location}</p>
                        </div>
                      </div>

                      {/* Stars */}
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={`${
                              i < Math.floor(testimonial.rating)
                                ? 'fill-yellow-400 text-yellow-400'
                                : i < testimonial.rating
                                ? 'fill-yellow-400/50 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Testimonial Text */}
                    <p className="text-gray-700 text-sm leading-relaxed mt-auto">
                      {testimonial.text}
                    </p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation: Arrows + Dots */}
          <div className="flex items-center justify-center gap-8 mt-10">
            {/* Previous Button */}
            <CarouselPrevious className="relative cursor-pointer inset-0 translate-y-0 rounded-full bg-[#DEEEFF] border border-[#B9D9FF] text-blue-600 hover:bg-[#B9D9FF] w-12 h-12 shadow-md transition-all" />

            {/* Dots Indicator */}
            <div className="flex gap-2">
              {testimonials.length > 0 &&
                api?.scrollSnapList().map((_, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="icon"
                    className={`w-2 h-2 rounded-full p-0 transition-all duration-300 ${
                      index === current
                        ? 'bg-[#B9D9FF] w-8'
                        : 'bg-[#B9D9FF] hover:bg-[#8cc0f7]'
                    }`}
                    onClick={() => api?.scrollTo(index)}
                  >
                    <span className="sr-only">Go to slide {index + 1}</span>
                  </Button>
                ))}
            </div>

            {/* Next Button */}
            <CarouselNext className="relative inset-0 cursor-pointer translate-y-0 rounded-full bg-[#DEEEFF] border border-[#B9D9FF] text-blue-600 hover:bg-[#B9D9FF] w-12 h-12 shadow-md transition-all" />
          </div>
        </Carousel>
      </div>
    </div>
  )
}