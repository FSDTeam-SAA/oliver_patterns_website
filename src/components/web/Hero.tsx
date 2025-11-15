import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <div className="w-full h-[700px] px-4 sm:px-6 lg:px-8 relative overflow-hidden">

      {/* 🔹 Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/assets/hero.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* 🔹 Dark Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* 🔹 Main Content */}
      <div className="container mx-auto text-center relative z-10 flex flex-col justify-center h-full">
        <h1 className="text-4xl sm:text-4xl lg:text-[48px] font-semibold text-[#F8F9FA] mb-4">
          Find Grants Business
        </h1>

        <p className="text-base font-normal sm:text-base text-[#F4F4F4] mb-8">
          Find grants, claim your funding, and manage opportunities - all in one place. Never miss your chance to prosper!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="h-[50px] px-4 md:px-[45px] !bg-gradient text-white text-base font-bold rounded-lg">
            Find Grants
          </Button>

          <Button
            variant="outline"
            className="h-12 px-4 md:px-[26px] bg-[#E7F1FE] text-[#0C2661] hover:bg-[#E7F1FE] font-semibold rounded-lg"
          >
            Get Started Free
          </Button>
        </div>
      </div>
    </div>
  )
}
