
import { SearchSection } from '@/components/web/Search_Section'
import { Services } from '@/components/web/services'
import { HowItWorks } from '@/components/web/how-it-works'
import { Testimonials } from '@/components/web/testimonials'
import { Stats } from '@/components/web/stats'
import { Hero } from '@/components/web/Hero'
import { Faq } from '@/components/web/Faq'
import { HeroCta } from '@/components/web/hero-cta'

export default function Home() {
  return (
    <main className="w-full">
      <Hero />
      <Stats />
      <SearchSection />
      <HowItWorks />
      <Services />
      <HeroCta/>
      <Faq />
      <Testimonials />
    </main>
  )
}
