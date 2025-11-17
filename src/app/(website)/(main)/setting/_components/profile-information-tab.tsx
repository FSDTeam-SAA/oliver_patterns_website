'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Camera } from 'lucide-react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'
import { UserProfileResponse } from '../../../../../../types/user'

interface FormData {
    fullName: string
    email: string
    username: string
    phoneNumber: string
    bio: string
}

export default function ProfileInformationTab() {

    const [formData, setFormData] = useState<FormData>({
        fullName: '',
        email: '',
        username: '',
        phoneNumber: '',
        bio: '',
    })

    const router = useRouter()
    const session = useSession()
    const token = session.data?.user?.accessToken

    const [imageUrl, setImageUrl] = useState<string>('/profile-picture.jpg')

    useEffect(() => {

    }, [formData])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                const result = reader.result as string
                setImageUrl(result)
                console.log('[v0] Profile Image Updated')
            }
            reader.readAsDataURL(file)
        }
    }

    const { mutate: updateProfile, isPending } = useMutation({
        mutationFn: async (data: {
            name: string
            email: string
            username: string
            phoneNumber: string
            bio: string
        }) => {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/user/me`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                        , 'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        name: data.name,
                        email: data.email,
                        username: data.username,
                        phoneNumber: data.phoneNumber,
                        bio: data.bio
                    }),
                }
            )

            const result = await res.json()
            if (!res.ok) throw new Error(result.message || 'profile failed')
            return result
        },
        onSuccess: (data) => {
            toast.success(data.message || 'Profile update successfully 🎉')
            router.push('/signin')
        },
        onError: (error) => {
            toast.error(error.message || 'Profile change failed')
        },
    })

    const getUser = useQuery<UserProfileResponse>({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/me`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            const result = await res.json()
            if (!res.ok) throw new Error(result.message || 'Failed to fetch user')
            return result
        },
    })

    console.log('[v0] User Data:', getUser.data?.data)

    // useEffect(() => {
    //     if (getUser.data) {
    //         setFormData({
    //             fullName: getUser.data.data.name,
    //             email: getUser.data.data.email,
    //             username: getUser.data.data.username,
    //             phoneNumber: getUser.data.data.phoneNumber,
    //             bio: getUser.data.data.bio
    //         })
    //     }
    // }, [getUser.data])



    const handleUpdateProfile = () => {
        updateProfile(
            {
                name: formData.fullName,
                email: formData.email,
                username: formData.username,
                phoneNumber: formData.phoneNumber,
                bio: formData.bio
            }
        )
    }

    const handleReset = () => {
        setFormData({
            fullName: '',
            email: '',
            username: '',
            phoneNumber: '',
            bio: '',
        })
    }

    return (
        <div className="space-y-6">
            {/* Profile Picture Section */}
            <div className="flex items-center gap-6 mb-8">
                <div className="relative">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-200 flex items-center justify-center bg-gray-100">
                        <Image
                            src={imageUrl || "/placeholder.svg"}
                            alt="Profile"
                            width={80}
                            height={80}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    {/* Camera Icon Button */}
                    <label className="absolute bottom-0 right-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer shadow-md hover:bg-blue-700 transition-colors">
                        <Camera className="w-3.5 h-3.5 text-white" />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                            aria-label="Upload profile picture"
                        />
                    </label>
                </div>
                <div>
                    <p className="text-sm font-medium text-gray-900">Your Profile Picture</p>
                </div>

            </div>
            <hr />
            {/* Form Section */}
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleUpdateProfile(); }}>
                {/* Full Name and Email Row */}
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                            Full name
                        </label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2.5 bg-[#FFFFFF] border border-[#E0E4EC] rounded-lg  text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
                        />
                    </div>
                </div>

                {/* Username and Phone Number Row */}
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                            Phone number
                        </label>
                        <input
                            type="tel"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
                        />
                    </div>
                </div>

                {/* Bio Section */}
                <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                        Bio
                    </label>
                    <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        rows={6}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors resize-none"
                    />
                </div>

                {/* Buttons */}
                <div className="flex gap-4 pt-4">
                    <button
                        type="submit"
                        className="px-6 py-2.5 bg-[#0C2661] text-white font-medium text-sm rounded-lg hover:bg-[#0C2661]/90 transition-colors shadow-sm"
                    >
                        Update Profile
                    </button>
                    <button
                        type="button"
                        onClick={handleReset}
                        className="px-6 py-2.5 border border-gray-300 text-gray-900 font-medium text-sm rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Reset
                    </button>
                </div>
            </form>
        </div>
    )
}
