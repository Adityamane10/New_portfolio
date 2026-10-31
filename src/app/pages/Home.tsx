import { AboutTeaser } from '../components/AboutTeaser'
import { Hero } from '../components/Hero'
import { Marquee } from '../components/Marquee'
import { Stack } from '../components/Stack'
import { WorkSection } from '../components/WorkSection'

export function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <WorkSection />
      <AboutTeaser />
      <Stack />
    </>
  )
}
