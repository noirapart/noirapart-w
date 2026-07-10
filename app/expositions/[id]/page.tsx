import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ExpositionDetail from '@/components/ExpositionDetail'
import { expositions } from '@/lib/exhibitions'

export function generateStaticParams() {
  return expositions.map((e) => ({ id: e.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const expo = expositions.find((e) => e.id === id)
  if (!expo) return { title: 'Exposition — NOIR A PART' }
  return { title: `${expo.fr.title} — NOIR A PART` }
}

export default async function ExpositionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const exposition = expositions.find((e) => e.id === id)
  if (!exposition) notFound()
  return <ExpositionDetail exposition={exposition} />
}
