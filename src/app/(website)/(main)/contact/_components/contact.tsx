import { Mail, MapPin, Phone } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import ContactForm from './contact-form'

const Contact = () => {
  return (
    <div className="container mx-auto mt-20 pb-20">
      <div className="flex flex-col lg:flex-row items-stretch shadow-xl rounded">
        {/* Left Side - Contact Info */}
        <div className="lg:w-[30%] w-full">
          <div
            className="bg-[#deeeff] p-5 h-full rounded-t-lg lg:rounded-l-lg lg:rounded-tr-none space-y-3
          
          "
          >
            <h1 className="font-bold text-[#0C2661] text-xl lg:mt-10">
              Contact information
            </h1>
            <p className="opacity-70 mt-1">
              Have questions about our platform or need assistance with grants?
              Our team is here to help you.
            </p>

            <div className="space-y-3 mt-4">
              <div className="flex items-center gap-2 opacity-70">
                <MapPin className="h-5 w-5" />
                123 Collins Street, Melbourne VIC 3000, Australia
              </div>

              <div className="flex items-center gap-2 opacity-70">
                <Phone className="h-5 w-5" />
                +61 (03) 1234 5678
              </div>

              <div className="flex items-center gap-2 opacity-70">
                <Mail className="h-5 w-5" />
                contact@grantfinder.com.au
              </div>
            </div>

            <div className="flex items-center gap-5 mt-6">
              {['facebook', 'instagram', 'linkedin', 'twitter'].map((icon) => (
                <Link key={icon} href={''}>
                  <Image
                    src={`/assets/${icon}.png`}
                    alt={`${icon}.png`}
                    width={24}
                    height={24}
                    className="h-6 w-6 hover:scale-105 cursor-pointer duration-200"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="flex-1 pl-5 pb-5 pr-5 space-y-1.5">
          <h1 className="text-xl text-[#0C2661] font-bold">
            Send us a Message
          </h1>
          <p className="opacity-75">
            Our friendly team would love to hear from you.
          </p>

          <div className="mt-5">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
