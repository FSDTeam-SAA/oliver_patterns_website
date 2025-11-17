import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface PricingToggleProps {
  isAnnual: boolean
  setIsAnnual: (value: boolean) => void
}

export function PricingToggle({ isAnnual, setIsAnnual }: PricingToggleProps) {
  return (
    <div className="grid grid-cols-2 gap-2 rounded-[8px] bg-[linear-gradient(307deg,#CCE5FF_16.87%,#89C0FF_200.96%)] shadow-[0_4px_8px_rgba(0,0,0,0.10)] py-2 px-4">
      <Button
        variant={isAnnual ? 'default' : 'ghost'}
        onClick={() => setIsAnnual(true)}
        className={cn(
          'h-[48px] rounded-full px-6 md:px-12 lg:px-20 py-3 font-semibold transition-all ease-in-out duration-300 cursor-pointer',
          isAnnual ? 'rounded-[6px] bg-[linear-gradient(180deg,#355AC7_0%,#1271F2_100%)] text-base text-white leading-[150%] font-semibold' : 'rounded-[6px] bg-[#FAFCFF] text-sm font-semibold text-[#0C2661] leading-[150%]'
        )}
      >
        Annual <span className='bg-[#EFF7FF] text-sm text-[#0C2661] font-medium leading-[150%] py-[2px] px-[8px] rounded-full'>Save 20%</span>
      </Button>
      <Button
        variant={!isAnnual ? 'default' : 'ghost'}
        onClick={() => setIsAnnual(false)}
        className={cn(
          'h-[48px] rounded-full px-6 md:px-12 lg:px-20 py-3 font-semibold transition-all ease-in-out duration-300 cursor-pointer',
          !isAnnual ? 'rounded-[6px] bg-[linear-gradient(180deg,#355AC7_0%,#1271F2_100%)] text-base text-white leading-[150%] font-semibold' : 'rounded-[6px] bg-[#FAFCFF] text-sm font-semibold text-[#0C2661] leading-[150%]'
        )}
      >
        Monthly
      </Button>
    </div>
  )
}
