'use client'

import React, { useState } from 'react'
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
} from 'lucide-react'
import { Button } from '../ui/button'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import Link from 'next/link'
import Image from 'next/image'

// ================== INTERFACE ==================
interface FooterProps {
  logo?: { text: string; highlight: string }
  quickLinks?: Array<{ label: string; href: string }>
  contactInfo?: { email: string; phone: string; address: string }
  newsletter?: { title: string; subtitle: string }
  socialLinks?: {
    facebook?: string
    instagram?: string
    linkedin?: string
    twitter?: string
  }
  copyright?: string
}

// ================== COMPONENT ==================
export function Footer({
  
  quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Blog', href: '/blogs' },
    { label: 'Podcasts', href: '/podcast' },
    // { label: 'Blog', href: '/blogs' },
  ],
  contactInfo = {
    email: 'support@unburdenedmind.com',
    phone: '+1 (555) 123-4567',
    address: '123 Care Street, City, State, ZIP',
  },
  newsletter = {
    title: 'Newsletter',
    subtitle: 'Subscribe for updates & news',
  },
  socialLinks = {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
  },
  copyright = '2025 Grants Pty Ltd. All rights reserved.',
}: FooterProps) {
  const [email, setEmail] = useState('')

  //  React Query Mutation
  const subscribeMutation = useMutation({
    mutationFn: async (email: string) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/broadcast/subscribe`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        }
      )

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.message || 'Failed to subscribe')
      }

      return res.json()
    },
    onSuccess: () => {
      toast.success('🎉 Successfully subscribed!')
      setEmail('')
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error.message || 'Subscription failed')
    },
  })

  const handleSubscribe = () => {
    if (!email) {
      toast.warning('Please enter your email address!')
      return
    }
    subscribeMutation.mutate(email)
  }

  return (
    <footer
      className="w-full py-8 px-4 sm:px-6 lg:px-8"
      style={{ background: 'linear-gradient(99.62deg, #DEEEFF 8.8%, #BEDCFF 100%)' }}
    >
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Logo Section */}
          <div>
          <Image
            src="/assets/logo.png"
            alt="Logo"
            width={1000}
            height={1000}
            className="w-[131px] h-[84px] mb-4"
          />
          <p className='text-sm text-[#424242] font-normal pl-5'>
            Helping Australian businesses discover government funding to accelerate growth and prosperity.

          </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[#0C2661] font-semibold text-lg mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-[#424242] text-base font-normal hover:text-[#5A8DEE] transition-colors "
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-[#0C2661] font-semibold text-lg mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-[##424242] text-base">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{contactInfo.email}</span>
              </li>
              <li className="flex items-start gap-2 text-[#424242] text-base">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{contactInfo.phone}</span>
              </li>
              <li className="flex items-start gap-2 text-[#424242] text-base">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{contactInfo.address}</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-[#343A40] font-semibold text-lg mb-2">
              {newsletter.title}
            </h3>
            <p className="text-[#0C2661] text-sm mb-4">{newsletter.subtitle}</p>

            <div className="flex gap-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 h-[48px] rounded-md border border-[#355AC7] text-base focus:outline-none focus:ring-2 focus:ring-[#5A8DEE] focus:border-transparent"
              />
              <Button
                onClick={handleSubscribe}
                disabled={subscribeMutation.isPending}
                className="!bg-gradient hover:bg-gradient/90 text-white px-6 h-[48px] rounded-md text-sm font-medium transition-colors whitespace-nowrap"
              >
                {subscribeMutation.isPending ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </div>

            {/* Social Icons */}
            <div className="flex gap-3 mt-6">
              {socialLinks.facebook && (
                <Link
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-[#68706A] hover:bg-[#5A8DEE] rounded flex items-center justify-center transition-colors"
                >
                  <Facebook className="w-5 h-5 text-white" />
                </Link>
              )}
              {socialLinks.instagram && (
                <Link
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-[#68706A] hover:bg-[#5A8DEE] rounded flex items-center justify-center transition-colors"
                >
                  <Instagram className="w-5 h-5 text-white" />
                </Link>
              )}
              {socialLinks.linkedin && (
                <Link
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-[#68706A] hover:bg-[#5A8DEE] rounded flex items-center justify-center transition-colors"
                >
                  <Linkedin className="w-5 h-5 text-white" />
                </Link>
              )}
              {socialLinks.twitter && (
                <Link
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-[#68706A] hover:bg-[#5A8DEE] rounded flex items-center justify-center transition-colors"
                >
                  <Twitter className="w-5 h-5 text-white" />
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[#90B3F4] pt-6">
          <p className="text-center text-[#68706A] text-sm">{copyright}</p>
        </div>
      </div>
    </footer>
  )
}
