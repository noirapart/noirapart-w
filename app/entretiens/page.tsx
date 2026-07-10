import type { Metadata } from 'next'
import PageHero from '@/components/PageHero'
import EntretiensList from '@/components/EntretiensList'

export const metadata: Metadata = {
  title: 'Entretiens — NOIR A PART',
  description: 'Conversations exclusives avec des artistes, penseurs et créateurs de la scène afro-diasporique.',
}

export default function EntretiensPage() {
  return (
    <>
      <PageHero pageKey="entretiens" />
      <EntretiensList />
    </>
  )
}
