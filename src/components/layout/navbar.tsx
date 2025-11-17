'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { Button } from '../ui/button'


export default function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Blogs', href: '/blogs' },
    { name: 'Services', href: '/services' },
    { name: 'Podcast', href: '/podcast' },
    { name: 'Contact', href: '/contact' },
  ]

  const isActiveLink = (href: string) => {
    if (href === '/') return pathname === '/'
    const pathnameSegments = pathname.split('/').filter(Boolean)
    const hrefSegments = href.split('/').filter(Boolean)
    return pathnameSegments[0] === hrefSegments[0]
  }

  return (
    <nav className="bg-white py-3 sticky top-0 w-full z-50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left - Logo */}
          <Link href={'/'}>
            <div className="flex-shrink-0 text-[#5A8DEE] font-semibold text-lg md:text-xl font-sans">
              <Image src="/assets/navlogo.png" alt="Logo" width={100} height={100} />
            </div>
          </Link>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-[#5A8DEE] focus:outline-none"
              aria-label="Toggle Menu"
            >
              {menuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`relative text-[#5A8DEE] font-medium transition-all duration-200 hover:opacity-80 ${isActiveLink(link.href) ? 'after:w-full' : 'after:w-0'
                  } after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-[#5A8DEE] after:transition-all after:duration-300 hover:after:w-full`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right - Desktop Buttons */}
          <div className="hidden md:flex items-center gap-2 space-x-3">
            <Link href={'/signup'}>
              <Button
                className="border border-[#0C2661] px-8 h-[48px] bg-transparent text-[#0C2661] hover:bg-transparent transition-all duration-200"
              >
                Sign Up Free
              </Button>
            </Link>
            <Link href={'/signin'}>
              <Button
                className="border border-[#5A8DEE] px-8 h-[48px] !bg-[linear-gradient(180deg,#355AC7_0%,#1271F2_100%)] text-[#FBEFEC] hover:text-white transition-all duration-200"
              >
                Log in
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu Items */}
      {menuOpen && (
        <div className="md:hidden bg-white/70 backdrop-blur-md border-t border-[#5A8DEE20] px-4 pb-4 space-y-4 animate-fadeIn">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`block text-[#5A8DEE] font-medium py-2 border-b border-[#5A8DEE20] ${isActiveLink(link.href) ? 'underline underline-offset-4' : ''
                }`}
            >
              {link.name}
            </Link>
          ))}

          {/* Mobile Buttons */}
          <div className="pt-2 flex flex-col space-y-3">
            <Link href={'/signup'}>
              <Button
                className="w-full py-3 px-4 !bg-[linear-gradient(180deg,#355AC7_0%,#1271F2_100%)] text-white font-semibold rounded-lg shadow-md"
              >
                Sign Up Free
              </Button>
            </Link>

            <Link href={'/signin'}>
              <Button
                className="w-full py-3 px-4 !bg-transparent border border-[#5A8DEE] text-[#5A8DEE] font-semibold rounded-lg"
              >
                Log in
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
