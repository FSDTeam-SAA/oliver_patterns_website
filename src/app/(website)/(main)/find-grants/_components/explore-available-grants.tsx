'use client'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import moment from 'moment'
import Link from 'next/link'
import { useDebounce } from '@/components/hooks/useDebounce'
import ErrorContainer from '@/components/common/ErrorContainer/ErrorContainer'
import NotFound from '@/components/common/NotFound/NotFound'
import GrantLoadingSkeleton from './grant-card-skeleton'
import { useSession } from 'next-auth/react'
import { useGrantFilters } from '@/store/useGrantFilters'
import { useRouter } from 'next/navigation'
import GrantSearchBar from '@/components/common/grantSearchBar'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export interface GrantResponse {
  status: boolean
  message: string
  data: {
    items: GrantItem[]
    total: number
    page: number
    limit: number
  }
}

export interface GrantItem {
  _id: string
  title: string
  type: string
  funding: string
  deadline: string
  location: string[]
  activity: string[]
  industry: string[]
  description: string
  imageUrl: string
  fileUrls?: string[]
  fileUrl?: string
  status: 'upcoming' | 'open' | 'closed'
  createdAt: string
  updatedAt: string
  __v: number
}

const ExploreAvailableGrants = () => {
  const router = useRouter()
  const session = useSession()
  const token = (session?.data?.user as { accessToken: string })?.accessToken
  const isAuthenticated = session.status === 'authenticated'

  const { search, industry, location, activity } = useGrantFilters()
  const debouncedSearch = useDebounce(search, 500)

  const [currentPage, setCurrentPage] = React.useState(1)
  const itemsPerPage = 10

  const { data, isLoading, isError, error } = useQuery<GrantResponse>({
    queryKey: [
      'grants',
      debouncedSearch,
      industry,
      location,
      activity,
      currentPage,
    ],
    queryFn: async () => {
      const params = new URLSearchParams()

      if (debouncedSearch) params.append('search', debouncedSearch)
      if (industry) params.append('industry', industry)
      if (location) params.append('location', location)
      if (activity) params.append('activity', activity)
      params.append('page', currentPage.toString())
      params.append('limit', itemsPerPage.toString())

      const url = `${
        process.env.NEXT_PUBLIC_API_URL
      }/grant?${params.toString()}`

      const res = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return res.json()
    },
    enabled: isAuthenticated && debouncedSearch !== undefined,
  })

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1)
  }, [debouncedSearch, industry, location, activity])

  const totalPages = data?.data?.total
    ? Math.ceil(data.data.total / itemsPerPage)
    : 0
  const hasNextPage = currentPage < totalPages
  const hasPrevPage = currentPage > 1

  const handleNextPage = () => {
    if (hasNextPage) {
      setCurrentPage((prev) => prev + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handlePrevPage = () => {
    if (hasPrevPage) {
      setCurrentPage((prev) => prev - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handlePageClick = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const showEllipsis = totalPages > 7

    if (!showEllipsis) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1)
        pages.push('...')
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        pages.push(1)
        pages.push('...')
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      }
    }

    return pages
  }

  let content

  if (!isAuthenticated) {
    content = (
      <div className="pt-8 md:pt-12 lg:pt-16">
        <div className="bg-white border border-gray-200 rounded-lg p-8 md:p-12 text-center shadow-sm">
          <div className="mb-6">
            <svg
              className="mx-auto h-16 w-16 text-[#355AC7]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-[#0C2661] mb-4">
            Login Required to View Grants
          </h3>
          <p className="text-base md:text-lg text-[#424242] mb-6 max-w-2xl mx-auto">
            Please login to access our database of over 1,200 business grants
            worth $50B. Already have an account? Login now. Need to choose a
            plan? Visit our pricing page.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push('/signin')}
              className="px-6 py-3 bg-gradient-to-b from-[#355AC7] to-[#1271F2] text-white font-semibold rounded-md shadow hover:shadow-lg transition-all cursor-pointer"
            >
              Login to View Grants
            </button>
            <button
              onClick={() => router.push('/pricing')}
              className="px-6 py-3 bg-white text-[#355AC7] border-2 border-[#355AC7] font-semibold rounded-md hover:bg-[#E7F1FE] transition-all cursor-pointer"
            >
              View Pricing Plans
            </button>
          </div>
        </div>
      </div>
    )
  } else if (isLoading) {
    content = (
      <div className="pt-4 md:pt-6 lg:pt-8">
        <GrantLoadingSkeleton />
      </div>
    )
  } else if (isError) {
    content = (
      <div className="container mx-auto pt-4 md:pt-6 lg:pt-8">
        <ErrorContainer message={error?.message || 'Something went Wrong'} />
      </div>
    )
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
    )
  } else if (
    data &&
    data?.data &&
    data?.data?.items &&
    data?.data?.items?.length > 0
  ) {
    content = (
      <>
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
                <p className="text-sm font-normal text-[#424242] leading-[150%] pt-2 md:pt-3">
                  {item?.description}
                </p>

                <div className="flex items-center gap-2 py-3 md:py-4 lg:py-5 flex-wrap">
                  <button className="text-[#1D326D] text-xs font-medium leading-[16px] rounded-full bg-[#E7F1FE] shadow-[0_4px_11px_rgba(0,0,0,0.10)] py-[2px] px-[10px]">
                    {item?.funding}
                  </button>
                  <button className="text-[#1D326D] text-xs font-medium leading-[16px] rounded-full bg-[#FAFCFF] shadow-[0_4px_11px_rgba(0,0,0,0.10)] py-[2px] px-2">
                    Deadline: {moment(item?.deadline).format('DD-MM-YYYY')}
                  </button>
                  <button className="text-[#1D326D] text-xs font-medium leading-[16px] rounded-full bg-[#E7F1FE] shadow-[0_4px_11px_rgba(0,0,0,0.10)] py-[2px] px-2">
                    {item?.type}
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-xs font-normal text-[#424242] leading-[150%]">
                    {item?.location?.join(', ')}
                  </p>
                  <Link href={`/find-grants/${item?._id}`}>
                    <button className="text-xs font-semibold text-[#E8F3FF] cursor-pointer leading-[150%] rounded-md border border-[#E8F3FF] bg-gradient-to-b from-[#355AC7] to-[#1271F2] py-2 px-3 hover:shadow-lg transition-shadow">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-8 md:mt-12 lg:mt-16">
            {/* Previous Button */}
            <button
              onClick={handlePrevPage}
              disabled={!hasPrevPage}
              className={`flex items-center justify-center w-10 h-10  rounded-md border transition-all ${
                hasPrevPage
                  ? 'border-[#355AC7] text-[#355AC7] hover:bg-[#E7F1FE] cursor-pointer'
                  : 'border-gray-300 text-gray-400 cursor-not-allowed'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Page Numbers */}
            {getPageNumbers().map((page, index) => (
              <React.Fragment key={index}>
                {page === '...' ? (
                  <span className="px-3 text-[#0C2661]">...</span>
                ) : (
                  <button
                    onClick={() => handlePageClick(page as number)}
                    className={`w-10 h-10 rounded-md border transition-all font-medium ${
                      currentPage === page
                        ? 'bg-gradient-to-b from-[#355AC7] to-[#1271F2] text-white border-transparent'
                        : 'border-[#355AC7] text-[#355AC7] hover:bg-[#E7F1FE]'
                    }`}
                  >
                    {page}
                  </button>
                )}
              </React.Fragment>
            ))}

            {/* Next Button */}
            <button
              onClick={handleNextPage}
              disabled={!hasNextPage}
              className={`flex items-center justify-center w-10 h-10 rounded-md border transition-all ${
                hasNextPage
                  ? 'border-[#355AC7] text-[#355AC7] hover:bg-[#E7F1FE] cursor-pointer'
                  : 'border-gray-300 text-gray-400 cursor-not-allowed'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Results Info */}
        <div className="text-center mt-4 text-sm text-[#424242]">
          Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
          {Math.min(currentPage * itemsPerPage, data.data.total)} of{' '}
          {data.data.total} grants
        </div>
      </>
    )
  }

  return (
    <div className="py-10 md:py-16 lg:py-20">
      <GrantSearchBar isLanding={false} />

      <div className="container mx-auto px-4 md:px-0">
        <h2 className="text-2xl md:text-3xl lg:text-[40px] font-bold text-[#0C2661] leading-[150%]">
          Explore Available Grants
        </h2>
        <p className="text-sm md:text-base font-normal text-[#424242] leading-[150%] pt-2 md:pt-3">
          Browse funding opportunities matched to your business goals and see
          what support you qualify for.
        </p>

        <div>{content}</div>
      </div>
    </div>
  )
}

export default ExploreAvailableGrants
