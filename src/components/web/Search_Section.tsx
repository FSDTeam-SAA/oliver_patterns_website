'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Search } from 'lucide-react'

export function SearchSection() {
  return (
    <div className="w-full bg-blue-100 py-[46px] px-4 sm:px-6 lg:px-8">
      <div className=" container mx-auto">
        <h1 className="text-2xl sm:text-2xl font-bold text-[#0C2661] mb-8">
          Search over 1,285 business grants worth $50B
        </h1>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-3">
          {/* Search Input */}
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Search grants by keyword, title, or description"
              className=" bg-[#FAFCFF] h-[60px] px-4 border-0 rounded-[4px] "
            />
          </div>

          {/* Search Button */}
          <Button className="h-[60px] !px-[25px] bg-[#96C7FF] hover:bg-[#96C7FF]/95  text-[#0C2661] font-medium rounded-[50px]  flex items-center gap-2 w-full md:w-auto">
            <Search size={20} className="text-[#0C2661]" />
            Search
          </Button>

          {/* OR Text */}
          <span className="text-gray-600 font-medium text-center md:text-left">
            OR
          </span>

          {/* Business Industry Dropdown */}
          <Select>
            <SelectTrigger className="h-[60px] bg-[#96C7FF] border-0 rounded-[50px] text-[#0C2661] font-midium w-full md:w-auto">
              <SelectValue placeholder="Select Business Industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tech">Technology</SelectItem>
              <SelectItem value="retail">Retail</SelectItem>
              <SelectItem value="healthcare">Healthcare</SelectItem>
              <SelectItem value="manufacturing">Manufacturing</SelectItem>
              <SelectItem value="services">Services</SelectItem>
            </SelectContent>
          </Select>

          {/* Community Sector Dropdown */}
          <Select>
            <SelectTrigger className="h-[60px] bg-[#96C7FF] border-0 rounded-full text-[#0C2661] font-midium w-full md:w-auto">
              <SelectValue placeholder="Select Community Sector" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="community">Community</SelectItem>
              <SelectItem value="nonprofit">Non-Profit</SelectItem>
              <SelectItem value="social">Social Enterprise</SelectItem>
              <SelectItem value="indigenous">Indigenous</SelectItem>
              <SelectItem value="women">Women in Business</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
