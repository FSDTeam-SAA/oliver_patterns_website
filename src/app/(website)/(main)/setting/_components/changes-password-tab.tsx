'use client'

import { useState, useEffect } from 'react'
import { Eye, EyeOff } from 'lucide-react'

interface PasswordFormData {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export default function ChangesPasswordTab() {
  const [formData, setFormData] = useState<PasswordFormData>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const [visibility, setVisibility] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  })

  useEffect(() => {
    console.log('[v0] Password Form Data:', {
      currentPassword: formData.currentPassword ? '••••••••' : '',
      newPassword: formData.newPassword ? '••••••••' : '',
      confirmPassword: formData.confirmPassword ? '••••••••' : '',
      timestamp: new Date().toISOString(),
    })
  }, [formData])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const toggleVisibility = (field: keyof typeof visibility) => {
    setVisibility(prev => ({
      ...prev,
      [field]: !prev[field],
    }))
   
  }

  const handleUpdateProfile = () => {
    console.log('[v0] Update Profile Button Clicked')
    if (formData.newPassword !== formData.confirmPassword) {
      console.log('[v0] Password mismatch error')
      alert('New passwords do not match!')
      return
    }
    console.log('[v0] Submitting Password Change:', {
      currentPasswordProvided: !!formData.currentPassword,
      newPasswordProvided: !!formData.newPassword,
      passwordsMatch: formData.newPassword === formData.confirmPassword,
      timestamp: new Date().toISOString(),
    })
    alert('Password updated! Check console for details.')
  }

  const handleReset = () => {
    console.log('[v0] Reset Button Clicked')
    setFormData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    })
    setVisibility({
      currentPassword: false,
      newPassword: false,
      confirmPassword: false,
    })
    console.log('[v0] Password Form Reset to Default Values')
  }

  return (
    <div className="space-y-6">
      {/* Current Password */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Current Password
        </label>
        <div className="relative">
          <input
            type={visibility.currentPassword ? 'text' : 'password'}
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors pr-10"
          />
          <button
            type="button"
            onClick={() => toggleVisibility('currentPassword')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Toggle password visibility"
          >
            {visibility.currentPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* New Password and Confirm Password Row */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            New Password
          </label>
          <div className="relative">
            <input
              type={visibility.newPassword ? 'text' : 'password'}
              name="newPassword"
              value={formData.newPassword}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors pr-10"
            />
            <button
              type="button"
              onClick={() => toggleVisibility('newPassword')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Toggle password visibility"
            >
              {visibility.newPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={visibility.confirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors pr-10"
            />
            <button
              type="button"
              onClick={() => toggleVisibility('confirmPassword')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Toggle password visibility"
            >
              {visibility.confirmPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 pt-4">
        <button
          onClick={handleUpdateProfile}
          className="px-6 py-2.5  bg-[#0C2661] text-white font-medium text-sm rounded-lg hover:bg-[#0C2661]/90 transition-colors shadow-sm"
        >
          Update Profile
        </button>
        <button
          onClick={handleReset}
          className="px-6 py-2.5 border border-gray-300 text-gray-900 font-medium text-sm rounded-lg hover:bg-gray-50 transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  )
}
