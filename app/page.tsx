import Hero from '@/components/Hero'
import CulturalPillars from '@/components/CulturalPillars'
import Inquiry from '@/components/Inquiry'
import Manifesto from '@/components/Manifesto'
import ValueProps from '@/components/ValueProps'
import SideNav from '@/components/SideNav'

export default function Home() {
  return (
    <>
      <SideNav />
      <main>
        <Hero />
        <CulturalPillars />
        <Inquiry />
        <Manifesto />
        <ValueProps />
      </main>
    </>
  )
}
