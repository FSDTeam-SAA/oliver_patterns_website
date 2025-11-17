/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { z } from 'zod'
import { useState } from 'react'
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
import Link from 'next/link'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const signupSchema = z
  .object({
    firstName: z.string().min(1, 'First name required'),
    lastName: z.string().min(1, 'Last name required'),
    email: z.string().email('Invalid email'),
    password: z.string().min(6, 'At least 6 characters'),
    confirmPassword: z.string().min(6, 'Confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords don’t match',
    path: ['confirmPassword'],
  })

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const { mutate: registerUser, isPending } = useMutation({
    mutationFn: async (data: {
      name: string
      email: string
      password: string
    }) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        }
      )

      const result = await res.json()
      if (!res.ok) throw new Error(result.message || 'Registration failed')
      return result
    },
    onSuccess: (data) => {
      toast.success('Account created successfully 🎉')
      console.log('✅ Registered user:', data)

      // Optional redirect after successful signup
      router.push('/signin')
    },
    onError: (error: any) => {
      toast.error(error.message || 'Registration failed')
    },
  })

  const onSubmit = (values: z.infer<typeof signupSchema>) => {
    const payload = {
      name: `${values.firstName} ${values.lastName}`,
      email: values.email,
      password: values.password,
    }
    registerUser(payload)
  }

  return (
    <AuthLayout>
      <div className="space-y-6 md:space-y-10 w-4xl bg-[#EFF7FF] shadow-2xl p-5 rounded-lg">
        {/* Heading */}
        <div className="space-y-2 text-start">
          <h1
            style={{ fontFamily: 'var(--font-playfair)' }}
            className="text-2xl md:text-[25px] lg:text-[32px] text-center leading-[1.5] font-bold text-[#0C2661]"
          >
            Create Your Account
          </h1>
          <p className="text-[#6C757D] text-center leading-[1.5]">
            Connect with trusted care join grants.
          </p>
        </div>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-1 gap-3">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#616161]">First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="First Name" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-400 font-medium" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#616161]">Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Last Name" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-400 font-medium" />
                  </FormItem>
                )}
              />
            </div>

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

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#616161]">
                    Create Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Create Password"
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

            {/* Confirm Password */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#616161]">
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Confirm Password"
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

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-[#0C2661] hover:bg-[#0C2661]/90 text-white"
              disabled={isPending}
            >
              Sign Up { isPending && <Loader2 className='animate-spin '/>}
            </Button>

            {/* Sign In link */}
            <p className="text-center text-base text-gray-600 mt-5">
              Already have an account?{' '}
              <Link
                href="/signin"
                className="text-[#0C2661] font-medium hover:underline"
              >
                Log In
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </AuthLayout>
  )
}
