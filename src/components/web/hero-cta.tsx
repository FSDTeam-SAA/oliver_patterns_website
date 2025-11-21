import { Button } from '@/components/ui/button'

export function HeroCta() {
  return (
    <div className="w-full bg-[#E4F1FF] py-16 sm:py-20 lg:py-[147px] px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl sm:text-4xl lg:text-4xl font-bold text-[#0C2661] mb-4">
          Ready to find grants for your business?
        </h1>
        <p className="text-base text-[#424242] mb-8">
          Join thousands of Australian businesses that have already discovered and secured funding through our platform.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-7 pt-10">
          <Button className="h-[50px] px-4 md:px-[45px] !bg-gradient text-white cursor-pointer hover:scale-105 duration-200 text-base font-bold rounded-lg">
            Search Grants
          </Button>
          <Button

            variant="bg_border"
            className="h-12 px-[41px] border-2 border-[#0C2661] text-[#0C2661]  cursor-pointer hover:scale-105 duration-200  font-semibold rounded-lg"
          >
            Sign Up Free
          </Button>
        </div>

        <p className="text-xs text-[#616161]">
          No credit card required. Free plan available
        </p>
      </div>
    </div>
  )
}
