import type { Metadata } from 'next'
import PageHero from '@/components/PageHero'
import ArtistesList from '@/components/ArtistesList'

export const metadata: Metadata = {
  title: 'Artistes — NOIR A PART',
  description: 'Les artistes des éditions La TR\'ART\'VERSÉE présentés par NOIR A PART.',
}

export default function ArtistesPage() {
  return (
    <>
      <PageHero pageKey="artistes" compact />
      <ArtistesList />
    </>
  )
}
