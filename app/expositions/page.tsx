import type { Metadata } from 'next'
import PageHero from '@/components/PageHero'
import ExpositionsList from '@/components/ExpositionsList'
import { expositions } from '@/lib/exhibitions'

export const metadata: Metadata = {
  title: 'Expositions — NOIR A PART',
  description: 'Découvrez les expositions passées, en cours et à venir de NOIR A PART.',
}

export default function ExpositionsPage() {
  return (
    <>
      <PageHero pageKey="expositions" />
      <ExpositionsList expositions={expositions} />
    </>
  )
}
