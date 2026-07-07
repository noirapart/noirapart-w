import type { Metadata } from 'next'
import PageHero from '@/components/PageHero'
import ArtistesList from '@/components/ArtistesList'

export const metadata: Metadata = {
  title: 'Artistes — NOIR A PART',
  description: 'Portraits et trajectoires des artistes avec lesquels NOIR A PART collabore.',
}

export type Artiste = {
  id: string
  name: string
  discipline: string
  origin: string
  based: string
  bio: string
  image: string
  tags: string[]
  featured: boolean
}

const artistes: Artiste[] = [
  {
    id: 'amara-diallo',
    name: 'Amara Diallo',
    discipline: 'Peinture',
    origin: 'Dakar, Sénégal',
    based: 'Paris, France',
    bio: 'Amara Diallo développe une peinture qui refuse les catégories. Ses grands formats noirs absorbent et restituent la lumière d\'une façon unique, créant des espaces de tension entre présence et effacement. Formé à l\'École des Beaux-Arts de Paris, il expose régulièrement en Europe et en Afrique de l\'Ouest.',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1200&auto=format&fit=crop',
    tags: ['Peinture', 'Abstraction', 'Identité'],
    featured: true,
  },
  {
    id: 'kofi-mensah',
    name: 'Kofi Mensah',
    discipline: 'Sculpture',
    origin: 'Kumasi, Ghana',
    based: 'Berlin, Allemagne',
    bio: 'Sculpteur de formation traditionnelle revisitée, Kofi Mensah travaille le bois, le bronze et les matériaux industriels pour créer des formes qui parlent de transmission et de transformation. Ses pièces monumentales ont été exposées à Berlin, São Paulo et Accra.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop',
    tags: ['Sculpture', 'Matière', 'Héritage'],
    featured: false,
  },
  {
    id: 'sarah-jenkins',
    name: 'Sarah Jenkins',
    discipline: 'Photographie & Vidéo',
    origin: 'Londres, Royaume-Uni',
    based: 'Londres, Royaume-Uni',
    bio: 'Sarah Jenkins documente les communautés afro-caribéennes de Londres avec une intimité rare. Son travail photographique construit une archive du quotidien — gestes, fêtes, silences — que les archives officielles ont ignorés. Elle enseigne également la photographie dans des ateliers communautaires à Brixton.',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b830?q=80&w=1200&auto=format&fit=crop',
    tags: ['Photographie', 'Archive', 'Communauté'],
    featured: false,
  },
  {
    id: 'david-ndlovu',
    name: 'David Ndlovu',
    discipline: 'Installation & Performance',
    origin: 'Soweto, Afrique du Sud',
    based: 'Johannesburg, Afrique du Sud',
    bio: 'David Ndlovu croise installation, performance et écriture pour questionner les temporalités imposées par le colonialisme. Ses œuvres s\'installent lentement dans l\'espace, comme des processus plutôt que des objets. Il collabore régulièrement avec des communautés Ndebele dans la création de ses performances.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop',
    tags: ['Installation', 'Performance', 'Décolonial'],
    featured: false,
  },
  {
    id: 'elise-ouedraogo',
    name: 'Élise Ouedraogo',
    discipline: 'Peinture & Dessin',
    origin: 'Ouagadougou, Burkina Faso',
    based: 'Paris, France & Abidjan, Côte d\'Ivoire',
    bio: 'Le travail d\'Élise Ouedraogo explore le corps féminin noir comme espace de résistance et de célébration. Ses dessins au fusain, d\'une précision anatomique troublante, sont accompagnés de peintures plus gestuelles qui parlent de libération. Elle a exposé dans une vingtaine de pays.',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1200&auto=format&fit=crop',
    tags: ['Corps', 'Féminisme', 'Peinture'],
    featured: false,
  },
  {
    id: 'yaw-asante',
    name: 'Yaw Asante',
    discipline: 'Art Textile & Installation',
    origin: 'Accra, Ghana',
    based: 'Accra, Ghana & New York, USA',
    bio: 'Yaw Asante travaille avec des tisserands traditionnels ghanéens pour créer des installations textiles qui dialoguent avec l\'architecture des espaces d\'exposition. Le kente revisité devient chez lui un langage contemporain capable de parler de mondialisation, de perte et de réinvention.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1200&auto=format&fit=crop',
    tags: ['Textile', 'Tradition', 'Installation'],
    featured: false,
  },
]

export default function ArtistesPage() {
  return (
    <>
      <PageHero pageKey="artistes" />
      <ArtistesList artistes={artistes} />
    </>
  )
}
