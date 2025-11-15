import type { Metadata } from 'next'
import { Manrope, Urbanist } from 'next/font/google'
import './globals.css'
import Providers from './providers'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import { Toaster } from 'sonner'

// Primary font (GLOBAL)
const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  weight: ['300', '400', '500', '600', '700', '800'],
})

// Only for <h1> tag
const urbanist = Urbanist({
  subsets: ['latin'],
  variable: '--font-urbanist',
  weight: ['300', '400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: 'Grants Guru | Find Grants Business',
  description:
    'The UnBurdened Mind helps leaders navigate the space between personal insight and professional influence.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <html suppressHydrationWarning lang="en">
      <body
        suppressHydrationWarning
        className={`${manrope.className} ${urbanist.variable} font-manrope antialiased min-h-screen bg-white text-black`}
      >
        <Toaster position="top-right" />
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  )
}
