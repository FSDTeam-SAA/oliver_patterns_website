import { Button } from '@/components/ui/button'

export function HeroCta() {
  return (
    <div className="w-full bg-[#E4F1FF] py-16 sm:py-20 lg:py-[147px] px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl sm:text-4xl lg:text-4xl font-bold text-blue-900 mb-4">
          Ready to find grants for your business?
        </h1>
        <p className="text-base text-[#424242] mb-8">
          Join thousands of Australian businesses that have already discovered and secured funding through our platform.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
          <Button className="h-[50px] px-4 md:px-[45px] !bg-gradient text-white text-base font-bold rounded-lg">
            Search Grants
          </Button>
          <Button
            variant="outline"
            className="h-12 px-8 border-2 border-blue-900 text-blue-900 hover:bg-blue-50 font-semibold rounded-lg"
          >
            Sign Up Free
          </Button>
        </div>

        <p className="text-xz text-[#616161]">
          No credit card required. Free plan available
        </p>
      </div>
    </div>
  )
}
