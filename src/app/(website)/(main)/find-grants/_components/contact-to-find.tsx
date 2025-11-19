import Link from 'next/link'
import React from 'react'

const ContactToFind = () => {
  return (
    <div className="bg-[linear-gradient(91deg,#CCE5FF_3.19%,#D7E8FB_96.81%)] py-5 md:py-7 lg:py-9 px-4 md:px-0">
      <div className='container mx-auto'>
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0C2661] leading-[150%] text-center">
          Contact to find the best grants
        </h3>
        <p className="text-base font-normal text-[#424242] leading-[150%] pt-1 text-center">
          Join thousands of that have already discovered and secured funding through our platform.
        </p>
        <div className='flex items-center justify-center py-4 md:py-6 lg:py-7'>
        <Link href="/contact">
            <button className='bg-gradient-to-b from-[#355AC7] to-[#1271F2] cursor-pointer h-[41px] text-base font-semibold leading-[150%] text-white py-2 px-10 rounded-[10px]'>
                Contact
            </button>
        </Link>
        </div>
        <p className="text-sm font-normal text-[#424242] leading-[150%] text-center">
          No credit card required. Free plan available.
        </p>
      </div>
    </div>
  )
}

export default ContactToFind
