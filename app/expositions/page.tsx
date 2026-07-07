import type { Metadata } from 'next'
import PageHero from '@/components/PageHero'
import ExpositionsList from '@/components/ExpositionsList'

export const metadata: Metadata = {
  title: 'Expositions — NOIR A PART',
  description: 'Découvrez les expositions passées et en cours de NOIR A PART.',
}

export type Exposition = {
  id: string
  title: string
  subtitle: string
  artists: string[]
  period: string
  location: string
  status: 'En cours' | 'À venir' | 'Passé'
  coverImage: string
  images: string[]
  description: string
  theme: string
  tags: string[]
}

const expositions: Exposition[] = [
  {
    id: 'identites-croisees',
    title: 'Identités Croisées',
    subtitle: 'Quand les frontières deviennent des œuvres',
    artists: ['Amara Diallo', 'Kofi Mensah', 'Sarah Jenkins', 'David Ndlovu'],
    period: '15 Jan — 30 Avr 2026',
    location: 'Paris, France',
    status: 'En cours',
    coverImage: '/expo-pic.jpg',
    images: [
      'https://images.unsplash.com/photo-1579762715118-a6f1d4b934f1?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1561214115-f2f134cc4912?q=80&w=1200&auto=format&fit=crop',
    ],
    description:
      'Identités Croisées rassemble quatre artistes dont les pratiques dialoguent autour de la notion de frontière — géographique, mémorielle, corporelle. En confrontant leurs œuvres dans un même espace, l\'exposition interroge ce qui se produit à l\'intersection des cultures, des récits et des temporalités.',
    theme:
      'La frontière comme espace de création. Ce projet explore la richesse qui émerge des zones de contact entre les cultures africaines et leurs diasporas, là où les identités ne se fixent pas mais se recomposent en permanence.',
    tags: ['Identité', 'Diaspora', 'Peinture', 'Photographie', 'Pluridisciplinaire'],
  },
  {
    id: 'corps-territoire',
    title: 'Corps & Territoire',
    subtitle: 'Le corps comme espace politique',
    artists: ['Élise Ouedraogo', 'Yaw Asante'],
    period: 'Sep — Nov 2025',
    location: 'Abidjan, Côte d\'Ivoire',
    status: 'Passé',
    coverImage: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?q=80&w=1600&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1579762715118-a6f1d4b934f1?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1561214115-f2f134cc4912?q=80&w=1200&auto=format&fit=crop',
    ],
    description:
      'Corps & Territoire a exploré la relation entre le corps humain et les espaces qu\'il habite ou revendique. À travers des œuvres de grand format, Élise Ouedraogo et Yaw Asante ont interrogé comment les corps noirs s\'inscrivent dans des géographies souvent hostiles.',
    theme:
      'Le corps comme territoire. Comment le corps noir négocie-t-il son espace dans le monde ? Cette exposition proposait un regard frontal et sans concession sur la présence physique comme acte politique.',
    tags: ['Corps', 'Politique', 'Sculpture', 'Peinture'],
  },
  {
    id: 'racines-reves',
    title: 'Racines & Rêves',
    subtitle: 'Mémoire et utopie dans l\'art contemporain',
    artists: ['Amara Diallo', 'Mia Fontaine', 'Seun Adesanya'],
    period: 'Mar — Juin 2025',
    location: 'Paris, France',
    status: 'Passé',
    coverImage: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?q=80&w=1600&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?q=80&w=1200&auto=format&fit=crop',
    ],
    description:
      'Première exposition majeure de NOIR A PART, Racines & Rêves posait la question de la mémoire collective dans une société en perpétuelle mutation. Entre nostalgie et projection, les artistes invités ont construit un dialogue entre le passé et un futur possible.',
    theme:
      'La mémoire comme matière première. Comment les artistes afro-diasporiques héritent-ils et réinventent-ils les récits de leurs ancêtres pour imaginer de nouveaux horizons ?',
    tags: ['Mémoire', 'Héritage', 'Utopie', 'Peinture', 'Installation'],
  },
]

export default function ExpositionsPage() {
  return (
    <>
      <PageHero pageKey="expositions" />
      <ExpositionsList expositions={expositions} />
    </>
  )
}
