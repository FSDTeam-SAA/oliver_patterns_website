'use client'

import React from 'react'
import OliverDropDown from '@/components/ui/Oliver-Dropdown'
import { useRouter } from 'next/navigation'
import { useGrantFilters } from '@/store/useGrantFilters'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'

export type Option = { label: string; value: string }

interface Props {
  isLanding?: boolean
}

// Options data
const industryOptions = [
  {
    label: 'General - Non-Industry Specific',
    value: 'General - Non-Industry Specific',
  },
  { label: 'Aeronautics', value: 'Aeronautics' },
  { label: 'Agriculture', value: 'Agriculture' },
  { label: 'Automotive and Marine', value: 'Automotive and Marine' },
  {
    label: 'Building, Construction and Engineering',
    value: 'Building, Construction and Engineering',
  },
  { label: 'Defence', value: 'Defence' },
  { label: 'Education', value: 'Education' },
  { label: 'Energy and Renewables', value: 'Energy and Renewables' },
  {
    label: 'Finance and Business Services',
    value: 'Finance and Business Services',
  },
  { label: 'Food and Beverage', value: 'Food and Beverage' },
  {
    label: 'Healthcare, Medical, Biotechnology and Nanotechnology',
    value: 'Healthcare, Medical, Biotechnology and Nanotechnology',
  },
  {
    label: 'Information Technology and Communication (ICT)',
    value: 'Information Technology and Communication (ICT)',
  },
  { label: 'Media and Entertainment', value: 'Media and Entertainment' },
  { label: 'Mining', value: 'Mining' },
  {
    label: 'Textile, Clothing and Footwear',
    value: 'Textile, Clothing and Footwear',
  },
  { label: 'Tourism', value: 'Tourism' },
  { label: 'Other - Not Listed', value: 'Other - Not Listed' },
]

const locationOptions = [
  { label: 'all Australia', value: 'all Australia' },
  { label: 'National', value: 'National' },
  {
    label: 'Australian Capital Territory',
    value: 'Australian Capital Territory',
  },
  { label: 'New South Wales', value: 'New South Wales' },
  { label: 'Northern Territory', value: 'Northern Territory' },
  { label: 'Queensland', value: 'Queensland' },
  { label: 'South Australia', value: 'South Australia' },
  { label: 'Tasmania', value: 'Tasmania' },
  { label: 'Victoria', value: 'Victoria' },
  { label: 'Western Australia', value: 'Western Australia' },
]

const activityOptions = [
  { label: 'General Operations', value: 'General Operations' },
  {
    label: 'Environment and Sustainability',
    value: 'Environment and Sustainability',
  },
  { label: 'Export', value: 'Export' },
  { label: 'Infrastructure / Equipment', value: 'Infrastructure / Equipment' },
  { label: 'Innovation and R&D', value: 'Innovation and R&D' },
  { label: 'Manufacturing', value: 'Manufacturing' },
  { label: 'Marketing', value: 'Marketing' },
  { label: 'Start-up / Establishment', value: 'Start-up / Establishment' },
  { label: 'Training / Employment', value: 'Training / Employment' },
  { label: 'Transport and Distribution', value: 'Transport and Distribution' },
  { label: 'Wholesale and Retail Trade', value: 'Wholesale and Retail Trade' },
]

const GrantSearchBar: React.FC<Props> = ({ isLanding = false }) => {
  const router = useRouter()
  const session = useSession()
  const isAuthenticated = session.status === 'authenticated'

  const {
    search,
    industry,
    location,
    activity,
    setSearch,
    setIndustry,
    setLocation,
    setActivity,
  } = useGrantFilters()

  const hasActiveFilters = industry || location || activity

  // 🔒 Reusable auth check with delayed redirect
  const authCheck = () => {
    if (!isAuthenticated) {
      toast.error('Please login to continue')
      setTimeout(() => router.push('/signin'), 1500)
      return false
    }
    return true
  }

  // ✏ Search typing — no redirect, no routing
  const handleSearchChange = (value: string) => {
    setSearch(value)
  }

  // 🔽 Dropdown changes
  const handleIndustryChange = (value: string) => {
    if (!authCheck()) return
    setIndustry(value)
  }

  const handleLocationChange = (value: string) => {
    if (!authCheck()) return
    setLocation(value)
  }

  const handleActivityChange = (value: string) => {
    if (!authCheck()) return
    setActivity(value)
  }

  // 🧹 Clear all filters
  const handleClearFilters = () => {
    if (!authCheck()) return
    setIndustry('')
    setLocation('')
    setActivity('')
  }

  // 🔍 Search triggered ONLY by ENTER key
  const handleSearch = () => {
    if (!authCheck()) return

    if (isLanding && search.trim().length > 0) {
      router.push('/find-grants#explore-grants-section')
    }
  }

  return (
    <div className="bg-[linear-gradient(91deg,#CCE5FF_3.19%,#D7E8FB_96.81%)] mb-10 md:mb-16 lg:mb-20">
      <div className="container mx-auto py-6 px-4 md:px-0">
        <div className="flex items-center justify-between mb-4">
          <p className="text-lg md:text-[22px] lg:text-2xl font-semibold text-[#0C2661] leading-[150%]">
            Search 1,285 business grants worth $50B
          </p>

          {hasActiveFilters && (
            <button
              onClick={handleClearFilters}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-[#0C2661] cursor-pointer shadow rounded-md bg-[#96C7FF] hover:shadow-lg transition-all hover:scale-[1.009]"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Clear All Filters
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 lg:gap-10">
          {/* Search Input */}
          <div className="md:col-span-1 flex flex-col md:flex-row items-center gap-4 md:gap-6 pt-4 md:pt-5 lg:pt-6">
            <input
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              type="search"
              className="w-full h-[60px] p-4 outline-none rounded-[4px] border border-[#b7bcc9] bg-[#FAFCFF] text-[#0C2661] placeholder:text-[#8E938F] text-base font-normal leading-[150%]"
              placeholder="Search grants by keyword, title, or description"
            />
            <div>
              <span className="text-base font-medium text-[#0C2661] leading-[150%]">
                OR
              </span>
            </div>
          </div>

          {/* Dropdown Section */}
          <div className="md:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6 pt-1 md:pt-5 lg:pt-6">
              <OliverDropDown
                options={industryOptions}
                placeholder="Select Business Industry"
                value={industry}
                onChange={handleIndustryChange}
              />
              <OliverDropDown
                options={locationOptions}
                placeholder="Select Business Location"
                value={location}
                onChange={handleLocationChange}
              />
              <OliverDropDown
                options={activityOptions}
                placeholder="Select Business Activity"
                value={activity}
                onChange={handleActivityChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GrantSearchBar
