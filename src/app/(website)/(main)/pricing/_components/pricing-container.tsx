"use client"
import React, { useState } from 'react'
import { PricingToggle } from './pricing-toggle'
import { PricingCard } from './pricing-card'

const PricingContainer = () => {
    const [isAnnual, setIsAnnual] = useState(true)

  const pricingPlans = [
    {
      name: 'Free',
      badge: '',
      price: 0,
      period: 'month',
      description: 'Perfect for getting started and exploring available grants',
      billingInfo: 'Billed annually ($0/year)',
      features: [
        'Basic grant search',
        'Save up to 5 grants',
        'Email notifications',
        'Limited filter options',
      ],
      buttonText: 'Sign up for free',
      buttonVariant: 'outline' as const,
    },
    {
      name: 'Premium',
      badge: 'Save 20%',
      price: isAnnual ? 29 : 3,
      period: isAnnual ? 'year' : 'month',
      description: 'The complete solution for serious business grant seekers',
      billingInfo: isAnnual ? 'Billed annually ($348/year)' : 'Billed monthly',
      features: [
        'Unlimited grant searches',
        'Unlimited saved grants',
        'Advanced filters & sorting',
        'Personalized recommendations',
        'Deadline reminders & calendar',
        'Export grant details',
        'Expert grant support',
        'Application tracking',
      ],
      buttonText: 'Get Premium',
      buttonVariant: 'default' as const,
      featured: true,
    },
    {
      name: 'Basic',
      badge: '',
      price: isAnnual ? 9.99 : 9.99,
      period: 'month',
      description: 'Perfect for getting started and exploring available grants',
      billingInfo: 'Billed monthly',
      features: [
        'Basic grant search',
        'Save up to 5 grants',
        'Email notifications',
        'Limited filter options',
      ],
      buttonText: 'Get Basic',
      buttonVariant: 'outline' as const,
    },
  ]
  return (
    <div className="pt-10 md:pt-16 lg:pt-20">
       {/* Pricing Toggle */}
          <div className="flex justify-center mb-12">
            <PricingToggle isAnnual={isAnnual} setIsAnnual={setIsAnnual} />
          </div>

      {/* Pricing Cards */}
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="">
          <div className="w-full flex items-center justify-center gap-8 mb-12=">
            {pricingPlans?.map((plan) => (
              <PricingCard key={plan?.name} {...plan} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PricingContainer
