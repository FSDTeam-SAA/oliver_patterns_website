/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams, useRouter } from 'next/navigation'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Clock } from 'lucide-react'
import AuthLayout from './authLayout'
import { useState, useEffect, useRef } from 'react'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

const otpSchema = z.object({
  otp: z.string().length(6, 'OTP must be 6 digits'),
})

export default function VerifyEmailPage() {
  const searchParams = useSearchParams()
  const email = searchParams.get('email')
  const router = useRouter()

  const form = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: '' },
  })

  const [timeLeft, setTimeLeft] = useState(120)
  const inputRefs = useRef<HTMLInputElement[]>([])

  useEffect(() => {
    if (timeLeft <= 0) return
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000)
    return () => clearInterval(timer)
  }, [timeLeft])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    i: number,
    field: any
  ) => {
    const val = e.target.value.replace(/[^0-9]/g, '')
    const newValue =
      field.value.substring(0, i) + val + field.value.substring(i + 1)
    field.onChange(newValue)
    if (val && i < 5) inputRefs.current[i + 1]?.focus()
    if (!val && i > 0) inputRefs.current[i - 1]?.focus()
  }

  const { mutate: verifyOtp, isPending } = useMutation({
    mutationFn: async (data: { email: string; otp: string }) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/verify-code`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        }
      )
      const result = await res.json()
      if (!res.ok) throw new Error(result.message || 'Verification failed')
      return result
    },
    onSuccess: () => {
      toast.success('✅ Email verified successfully!')
      router.push(`/reset-password?email=${encodeURIComponent(email || '')}`)
    },
    onError: (error: any) => {
      toast.error(error.message || 'Invalid OTP')
    },
  })

  const { mutate: resendOtp, isPending: isResending } = useMutation({
    mutationFn: async () => {
      if (!email) throw new Error('Email not found')
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/forget-password`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        }
      )
      const result = await res.json()
      if (!res.ok) throw new Error(result.message || 'Failed to resend OTP')
      return result
    },
    onSuccess: () => {
      toast.success('OTP resent successfully 📩')
      setTimeLeft(120)
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to resend OTP')
    },
  })

  const onSubmit = (values: z.infer<typeof otpSchema>) => {
    if (!email) {
      toast.error('Email missing from URL')
      return
    }
    verifyOtp({ email, otp: values.otp })
  }

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  return (
    <AuthLayout>
      <div className="space-y-6 p-5 bg-[#EFF7FF] w-4xl md:p-10 ">
        <div className="text-start space-y-4">
          <h1 className="text-2xl font-bold text-[#0C2661] text-center">Verify Email</h1>
          <p className="text-[#6C757D] text-center">
            Enter OTP to verify your email address
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex gap-2 md:gap-3 justify-between">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <Input
                          key={i}
                          ref={(el) => {
                            if (el) inputRefs.current[i] = el
                          }}
                          maxLength={1}
                          className="w-10 h-10 md:w-14 md:h-14 text-center text-sm md:text-lg font-semibold rounded-xl border-2 focus:border-[#0C2661]"
                          value={field.value[i] || ''}
                          onChange={(e) => handleChange(e, i, field)}
                        />
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage className="text-center" />
                </FormItem>
              )}
            />

            <div className="flex justify-between items-center text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Clock size={16} />
                <span>
                  {minutes.toString().padStart(2, '0')}:
                  {seconds.toString().padStart(2, '0')}
                </span>
              </div>
              <button
                type="button"
                onClick={() => resendOtp()}
                disabled={timeLeft > 0 || isResending}
                className={`${timeLeft > 0
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-[#0C2661] underline font-medium'
                  }`}
              >
                {isResending ? 'Resending...' : 'Resend OTP'}
              </button>
            </div>

            <Button
              type="submit"
              disabled={isPending}
              className="w-full bg-[#0C2661] hover:bg-[#0C2661]/90 text-white"
            >
              {isPending ? 'Verifying...' : 'Verify'}
            </Button>
          </form>
        </Form>
      </div>
    </AuthLayout>
  )
}
