 

'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Camera, Loader2 } from 'lucide-react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'
import { UserProfileResponse } from '../../../../../../../types/user'

interface FormData {
    fullName: string
    email: string
    username: string
    bio: string
}

export default function ProfileInformationTab() {

    const [formData, setFormData] = useState<FormData>({
        fullName: '',
        email: '',
        username: '',
        bio: '',
    })

    const session = useSession()
    const token = session.data?.user?.accessToken

    const [imageUrl, setImageUrl] = useState<string>('/profile-picture.jpg')

    // 🔥 Upload Profile Image Instantly
    const { mutate: uploadImage, isPending: imageUploading } = useMutation({
        mutationFn: async (file: File) => {
            const formData = new FormData()
            formData.append("profileImage", file)

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/user/upload-avatar`,
                {
                    method: "PUT",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                    body: formData
                }
            )

            const result = await res.json()
            if (!res.ok) throw new Error(result.message || "Image upload failed")
            return result
        },
        onSuccess: (data) => {
            toast.success(data.message || "Profile picture updated 🎉")
        },
        onError: (error) => {
            toast.error(error.message || "Image upload failed")
        }
    })

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        // Temp Preview
        const reader = new FileReader()
        reader.onloadend = () => {
            setImageUrl(reader.result as string)
        }
        reader.readAsDataURL(file)

        // Upload instantly
        uploadImage(file)
    }

    // 🔥 Update Profile Info
    const { mutate: updateProfile, isPending } = useMutation({
        mutationFn: async (data: { name: string; username: string; bio: string }) => {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/user/me`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        name: data.name,
                        username: data.username,
                        bio: data.bio
                    }),
                }
            )

            const result = await res.json()
            if (!res.ok) throw new Error(result.message || 'Profile update failed')
            return result
        },
        onSuccess: (data) => {
            toast.success(data.message || 'Profile updated successfully 🎉')
        },
        onError: (error) => {
            toast.error(error.message || 'Profile update failed')
        },
    })

    // 🔥 Get User Info
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
        }
    })

    useEffect(() => {
        if (getUser.data) {
            const user = getUser.data.data
            setFormData({
                fullName: user.name,
                email: user.email,
                username: user.username,
                bio: user.bio ?? ''
            })

            if (user.profileImage) {
                setImageUrl(user.profileImage)
            }
        }
    }, [getUser.data])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleUpdateProfile = () => {
        updateProfile({
            name: formData.fullName,
            username: formData.username,
            bio: formData.bio
        })
    }

    const handleReset = () => {
        if (!getUser.data) return
        const user = getUser.data.data

        setFormData({
            fullName: user.name,
            email: user.email,
            username: user.username,
            bio: user.bio ?? ''
        })
    }

    return (
        <div className="space-y-6">
            {/* Profile Picture Section */}
            <div className="flex items-center gap-6 mb-8">
                <div className="relative w-20 h-20">
                    {/* Image */}
                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-200 bg-gray-100">
                        <Image
                            src={imageUrl}
                            alt="Profile"
                            width={80}
                            height={80}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Loading Overlay */}
                    {imageUploading && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-full">
                            <Loader2 className="w-6 h-6 text-white animate-spin" />
                        </div>
                    )}

                    {/* Upload button */}
                    <label className="absolute bottom-0 right-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer shadow-md hover:bg-blue-700 transition-colors">
                        <Camera className="w-3.5 h-3.5 text-white" />
                        <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                    </label>
                </div>

                <p className="text-sm font-medium text-gray-900">Your Profile Picture</p>
            </div>

            <hr />

            {/* Form */}
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleUpdateProfile(); }}>
                {/* Full Name / Email */}
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">Full name</label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2.5 bg-white border border-[#E0E4EC] rounded-lg text-gray-900 text-sm focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            disabled
                            value={formData.email}
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 text-sm"
                        />
                    </div>
                </div>

                {/* Username */}
                <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">Username</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 text-sm"
                    />
                </div>

                {/* Bio */}
                <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">Bio</label>
                    <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        rows={6}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 text-sm resize-none"
                    />
                </div>

                {/* Buttons */}
                <div className="flex gap-4 pt-4">
                    <button
                        type="submit"
                        className="px-6 py-2.5 flex items-center bg-[#0C2661] text-white text-sm rounded-lg hover:bg-[#0C2661]/90"
                    >
                        Update Profile {isPending && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
                    </button>

                    <button
                        type="button"
                        onClick={handleReset}
                        className="px-6 py-2.5 border border-gray-300 text-gray-900 text-sm rounded-lg hover:bg-gray-50"
                    >
                        Reset
                    </button>
                </div>
            </form>
        </div>
    )
}
