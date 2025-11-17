'use client'

import { useState, useEffect } from 'react'
import ProfileInformationTab from './_components/profile-information-tab'
import ChangesPasswordTab from './_components/changes-password-tab'


export default function Home() {
  const [activeTab, setActiveTab] = useState('personal')

  useEffect(() => {
    console.log('[v0] Active Tab Changed:', {
      activeTab,
      timestamp: new Date().toISOString(),
    })
  }, [activeTab])

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-full mx-auto p-6">
        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-8">
          <button
            onClick={() => setActiveTab('personal')}
            className={`pb-4 px-2 text-sm font-medium transition-colors ${
              activeTab === 'personal'
                ? 'text-blue-900 border-b-2 border-blue-900'
                : 'text-gray-400'
            }`}
          >
            Personal Information
          </button>
          <button
            onClick={() => setActiveTab('password')}
            className={`pb-4 px-6 text-sm font-medium transition-colors ${
              activeTab === 'password'
                ? 'text-blue-900 border-b-2 border-blue-900'
                : 'text-gray-400'
            }`}
          >
            Changes Password
          </button>
        </div>

        {/* Content */}
        {activeTab === 'personal' && <ProfileInformationTab />}
        {activeTab === 'password' && <ChangesPasswordTab />}
      </div>
    </div>
  )
}
