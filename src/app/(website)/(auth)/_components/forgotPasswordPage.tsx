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
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

const forgotSchema = z.object({
  email: z.string().email('Invalid email'),
})

export default function ForgotPasswordPage() {
  const router = useRouter()

  const form = useForm<z.infer<typeof forgotSchema>>({
    resolver: zodResolver(forgotSchema),
    defaultValues: { email: '' },
  })

  const { mutate: sendOtp, isPending } = useMutation({
    mutationFn: async (data: { email: string }) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/forget-password`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        }
      )
      const result = await res.json()
      if (!res.ok) throw new Error(result.message || 'Failed to send OTP')
      return result
    },
    onSuccess: (_, variables) => {
      toast.success('OTP sent successfully 📩')
      router.push(`/verify-email?email=${encodeURIComponent(variables.email)}`)
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to send OTP')
    },
  })

  const onSubmit = (values: z.infer<typeof forgotSchema>) => {
    sendOtp(values)
  }

  return (
    <AuthLayout>
      <div className="space-y-6 bg-[#EFF7FF] w-4xl shadow-2xl p-5 rounded-lg">
        <div className="text-start space-y-3">
          <h1 className="text-2xl md:text-3xl text-center font-bold text-[#0C2661]">
            Forgot Password
          </h1>
          <p className="text-[#6C757D] text-center">
            Enter your email to recover your password
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#616161]">
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Email Address" {...field} />
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
            Send OTP { isPending && <Loader2 className="animate-spin" /> }
            </Button>
          </form>
        </Form>
      </div>
    </AuthLayout>
  )
}
