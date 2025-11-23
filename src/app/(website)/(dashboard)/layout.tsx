'use client'
import type { ReactNode } from 'react'

// import { redirect } from 'next/navigation'
// import { useSession } from 'next-auth/react'
import AdminSidebar from '@/components/sideBar'
import UserHeader from '@/components/useHeader'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-[#F8F9FC] min-h-screen flex">
      {/* Sidebar - Fixed */}
      <div className="w-[300px] fixed left-0 top-0 h-screen">
        <AdminSidebar />
      </div>

      {/* Main Area */}
      <div className="flex-1 ml-[300px] flex flex-col h-screen overflow-hidden">
        {/* Header - Fixed */}
        <div className="fixed left-[300px] right-0 top-0 z-10 bg-sky-100/50 border-b border-gray-200">
          <UserHeader />
        </div>

        {/* Page Content (scrollable) */}
        <div className="flex-1 overflow-y-auto pt-[110px] px-4">{children}</div>
      </div>
    </div>
  )
}
