'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)

  const testimonials = [
    {
      name: 'Connect Directly',
      location: 'Portland, OR',
      image: '/assets/Avatar.jpg',
      rating: 4.5,
      text: "I've been ordering from TABLEFRESH for over a year now, and the quality of their organic produce is consistently excellent. The convenience of having fresh, organic food delivered to my door has made healthy eating so much easier for my family.",
    },
    {
      name: 'Connect Directly',
      location: 'Portland, OR',
       image: '/assets/Avatar.jpg',
      rating: 5,
      text: "I've been ordering from TABLEFRESH for over a year now, and the quality of their organic produce is consistently excellent. The convenience of having fresh, organic food delivered to my door has made healthy eating so much easier for my family.",
    },
    {
      name: 'Connect Directly',
      location: 'Portland, OR',
       image: '/assets/Avatar.jpg',
      rating: 4.5,
      text: "I've been ordering from TABLEFRESH for over a year now, and the quality of their organic produce is consistently excellent. The convenience of having fresh, organic food delivered to my door has made healthy eating so much easier for my family.",
    },
    {
      name: 'Connect Directly',
      location: 'Portland, OR',
      image: '/assets/Avatar.jpg',
      rating: 5,
      text: "I've been ordering from TABLEFRESH for over a year now, and the quality of their organic produce is consistently excellent. The convenience of having fresh, organic food delivered to my door has made healthy eating so much easier for my family.",
    },
  ]

  const prev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  const next = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  return (
    <div className="w-full bg-white py-16 sm:py-20 lg:py-[147px] px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-4xl font-bold text-[#0C2661] mb-4">
            Trusted by Australian Businesses
          </h1>
          <p className="text-[#424242] text-base">
            Hear from business owners who have successfully secured funding using our platform.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 overflow-hidden">
            {[0, 1, 2].map((i) => {
              const testimonialIndex = (activeIndex + i) % testimonials.length
              const testimonial = testimonials[testimonialIndex]
              return (
                <Card
                  key={testimonialIndex}
                  className="bg-[#DEEEFF] border-0 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between  gap-3 mb-4">
                      <div className='flex gap-2'>

                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={100}
                        height={100}
                        className="w-14 h-14 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-semibold text-[20px] text-[#0C2661]">{testimonial.name}</h4>
                        <p className="text-xs text-[#424242">{testimonial.location}</p>
                      </div>
                      </div>
                      <div className='flex justify-between items-center '>
                    <div className="flex gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={`${i < Math.floor(testimonial.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    </div>
                      </div>
                    <p className="text-gray-700 text-sm">{testimonial.text}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              onClick={prev}
              variant="outline"
              size="icon"
              className="rounded-full border-blue-300 text-blue-600 hover:bg-blue-50"
            >
              <ChevronLeft size={24} />
            </Button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${i === activeIndex ? 'bg-blue-600' : 'bg-blue-300'}`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <Button
              onClick={next}
              variant="outline"
              size="icon"
              className="rounded-full border-blue-300 text-blue-600 hover:bg-blue-50"
            >
              <ChevronRight size={24} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
