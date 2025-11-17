/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import AuthLayout from './authLayout'
import { useState } from 'react'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useRouter, useSearchParams } from 'next/navigation'

const resetPasswordSchema = z
  .object({
    newPassword: z.string().min(6, 'At least 6 characters'),
    confirmPassword: z.string().min(6, 'Confirm your password'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords don’t match',
    path: ['confirmPassword'],
  })

export default function ResetPasswordPage() {
  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { newPassword: '', confirmPassword: '' },
  })

  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get('email')

  const { mutate: resetPassword, isPending } = useMutation({
    mutationFn: async (data: { email: string; newPassword: string }) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            newPassword: data.newPassword,
          }),
        }
      )
      const result = await res.json()
      if (!res.ok) throw new Error(result.message || 'Password reset failed')
      return result
    },
    onSuccess: (data) => {
      toast.success(data.message || 'Password reset successfully 🔒')
      router.push('/signin')
    },
    onError: (error: any) => {
      toast.error(error.message || 'Something went wrong')
    },
  })

  const onSubmit = (values: z.infer<typeof resetPasswordSchema>) => {
    if (!email) {
      toast.error('Email missing from URL')
      return
    }
    resetPassword({ email, newPassword: values.newPassword })
  }

  return (
    <AuthLayout>
      <div className="space-y-6 md:space-y-8  bg-[#EFF7FF] w-4xl p-6 md:p-10">
        <div className="text-start space-y-3">
          <h1 className="text-2xl font-bold text-[#0C2661] text-center"> Change Password</h1>
          <p className="text-[#6C757D] text-center">Enter your new password below.</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#616161]">
                    Create New Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Create New Password"
                        {...field}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-400 font-medium" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#616161]">
                    Confirm New Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Confirm New Password"
                        {...field}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-400 font-medium" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isPending}
              className="w-full bg-[#0C2661] hover:bg-[#0C2661]/90 text-white"
            >
            Change Password {isPending && <Loader2/>}
            </Button>
          </form>
        </Form>
      </div>
    </AuthLayout>
  )
}
