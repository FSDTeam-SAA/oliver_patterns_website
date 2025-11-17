/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState } from 'react'
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
import Link from 'next/link'
import { Eye, EyeOff } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

const signinSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password required'),
})

export default function SigninPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = async (values: z.infer<typeof signinSchema>) => {
    try {
      setIsLoading(true)

      // NextAuth credentials login
      const res = await signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: false, 
      })

      setIsLoading(false)

      if (!res) {
        toast.error('Something went wrong. Please try again.')
        return
      }

      if (res.error) {
        toast.error(res.error)
        return
      }

      toast.success('Login successful 🎉')
      router.push('/') // ✅ redirect to homepage
    } catch (err: any) {
      setIsLoading(false)
      toast.error(err?.message || 'Login failed')
    }
  }

  return (
    <AuthLayout>
      <div className="space-y-6 lg:space-y-8 w-4xl bg-[#EFF7FF] shadow-2xl p-5 rounded-md">
        <div className="space-y-4 text-start">
          <h1 className="text-xl md:text-2xl lg:text-[32px] text-center font-bold text-[#0C2661]">
            Welcome
          </h1>
          <p className="text-[#6C757D] text-center text-sm md:text-base">
            Access your account to manage.           
             </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#616161]">
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Email Address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400 font-medium" />
                </FormItem>
              )}
            />

            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#616161]">Password</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        className="pr-10"
                        {...field}
                      />
                    </FormControl>
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <FormMessage className="text-red-400 font-medium" />
                </FormItem>
              )}
            />

            {/* Remember me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-[#0C2661]"
                  checked
                  readOnly
                />
                <span className="text-gray-600">Remember me</span>
              </div>
              <Link
                href="/forgot-password"
                className="text-[#0C2661] underline"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-[#0C2661] hover:bg-[#0C2661]/90 cursor-pointer text-white"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Log In'}
            </Button>

            {/* Sign Up link */}
            <p className="text-center text-sm text-gray-600 mt-5">
              Don’t have an account?{' '}
              <Link
                href="/signup"
                className="text-[#0C2661] font-medium hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </AuthLayout>
  )
}
