import type { Lang } from '@/contexts/LanguageContext'

export type ExpoStatus = 'current' | 'upcoming' | 'past'

export type Exposition = {
  id: string
  status: ExpoStatus
  coverImage: string
  images: string[]
  video?: string
  videoPoster?: string
  videoRotate?: number
  tags: string[]
  fr: {
    title: string
    subtitle: string
    period: string
    location: string
    theme: string
    description: string
    artists: string[]
  }
  en: {
    title: string
    subtitle: string
    period: string
    location: string
    theme: string
    description: string
    artists: string[]
  }
}

const edition1Gallery = [
  'IMG_2260.jpg',
  'IMG_2284.jpg',
  'IMG_2310.jpg',
  'IMG_2316.jpg',
  'IMG_2331.jpg',
  'IMG_2368.jpg',
].map((f) => `/exhibitions/edition-1/gallery/${f}`)

const exodeGallery = [
  '_MG_0533 copy.jpg',
  '_MG_0542 copy.jpg',
  '_MG_0545 copy.jpg',
  '_MG_0550 copy.jpg',
  '_MG_0575 copy.jpg',
].map((f) => `/exhibitions/exode/gallery/${encodeURIComponent(f)}`)

const womheartGallery = [
  'DSC04125.jpg',
  'DSC04215.jpg',
  'DSC04228.jpg',
  'DSC04260.jpg',
  'DSC04300.jpg',
  'DSC04418.jpg',
].map((f) => `/exhibitions/womheart/gallery/${f}`)

export const expositions: Exposition[] = [
  {
    id: 'broken-lineage',
    status: 'upcoming',
    coverImage: '/exhibitions/broken-lineage/cover.png',
    images: [],
    tags: ['Générations', 'Héritage', 'Mondialisation', 'Technologie'],
    fr: {
      title: 'THE BROKEN LINEAGE : WHEN TODAY CANNOT STAND YESTERDAY',
      subtitle: 'La rupture entre les générations',
      period: 'Décembre 2026',
      location: 'Yaoundé, Cameroun',
      theme:
        "THE BROKEN LINEAGE : WHEN TODAY CANNOT STAND YESTERDAY interroge la rupture entre les générations, façonnée par la mondialisation, le métissage culturel et la technologie, quand la jeunesse en quête d'ailleurs ne se reconnaît plus dans l'héritage d'hier.",
      description:
        "Prochaine édition de La TR'ART'VERSÉE. Une exposition qui explore le décalage croissant entre les générations — entre ce qui fut transmis et ce que le présent exige de repenser.",
      artists: [],
    },
    en: {
      title: 'THE BROKEN LINEAGE: WHEN TODAY CANNOT STAND YESTERDAY',
      subtitle: 'The rupture between generations',
      period: 'December 2026',
      location: 'Yaoundé, Cameroon',
      theme:
        'THE BROKEN LINEAGE: WHEN TODAY CANNOT STAND YESTERDAY explores the growing disconnect between generations — shaped by globalization, cultural blending, and technology — as a youth reaching for elsewhere no longer recognizes itself in the legacy of the past.',
      description:
        "The next edition of La TR'ART'VERSÉE. An exhibition exploring the widening gap between generations — between what was handed down and what the present demands we rethink.",
      artists: [],
    },
  },
  {
    id: 'womheart',
    status: 'past',
    coverImage: '/exhibitions/womheart/cover.jpg',
    images: womheartGallery,
    video: '/videos/womheart-recap.m4v',
    videoPoster: '/exhibitions/womheart/cover.jpg',
    tags: ['Femme', 'Société', 'Art contemporain', 'Engagement'],
    fr: {
      title: "WOM'HEART",
      subtitle: "La représentation de la femme dans la société sous le prisme de l'art contemporain",
      period: '1er Mars — 27 Avril 2025',
      location: 'Yaoundé, Cameroun',
      theme:
        "WOM'HEART place la femme au centre du regard artistique et social. L'édition interroge la manière dont la société perçoit, représente et façonne la figure féminine, entre héritage culturel, perception sociale et liberté d'expression, pour en révéler toute la complexité.",
      description:
        "WOM'HEART enrichit le concept d'une dimension institutionnelle et éducative, sensibilisant le public aux enjeux liés à la condition féminine et à l'identité. Cette édition affirme le rôle de La TR'ART'VERSÉE comme plateforme engagée et socialement consciente.",
      artists: [
        'Lauriane Yougang',
        'Raoul Wansi',
        'Saint Babila',
        'Edwige Ndjeng',
        'Allen Wankwini',
        'Desy Danga',
        'Leuna Noumbimboo',
      ],
    },
    en: {
      title: "WOM'HEART",
      subtitle: "The representation of women in society through contemporary art",
      period: '1 March — 27 April 2025',
      location: 'Yaoundé, Cameroon',
      theme:
        "WOM'HEART places women at the centre of artistic and social inquiry. This edition examines how society perceives, represents and shapes the feminine figure — between cultural heritage, social perception and freedom of expression — revealing its full complexity.",
      description:
        "WOM'HEART deepens the concept with an institutional and educational dimension, raising public awareness of issues related to women's condition and identity. This edition affirms La TR'ART'VERSÉE's role as an engaged, socially conscious platform.",
      artists: [
        'Lauriane Yougang',
        'Raoul Wansi',
        'Saint Babila',
        'Edwige Ndjeng',
        'Allen Wankwini',
        'Desy Danga',
        'Leuna Noumbimboo',
      ],
    },
  },
  {
    id: 'exode',
    status: 'past',
    coverImage: '/exhibitions/exode/cover.jpg',
    images: exodeGallery,
    tags: ['Identité', 'Migration', 'Spiritualité', 'Territoire'],
    fr: {
      title: 'EXODE',
      subtitle: "L'identité et la migration d'un peuple, d'une pensée, d'un état spirituel et d'un lieu à un autre",
      period: '9 Fév — 18 Fév 2024',
      location: 'Yaoundé, Cameroun',
      theme:
        "EXODE explore le déplacement dans toutes ses dimensions : géographique, spirituelle et intellectuelle. L'édition interroge cette migration d'un peuple qui quitte un lieu, une croyance ou une manière de penser, et questionne ce que l'on emporte, ce que l'on perd et ce que l'on devient en chemin.",
      description:
        "EXODE approfondit la dimension réflexive du concept à travers la narration et l'identité. Portée par une scénographie affirmée et des temps d'échange structurés, cette édition réunit 8 artistes et confirme La TR'ART'VERSÉE comme un espace de réflexion artistique sérieux et innovant.",
      artists: [
        'Jean David Nkot',
        'Louise Sombga',
        'Gael « Keutch » Keutchogue',
        'Renaud Atemengue',
        'Nourane Hassan',
        'Bright Toh',
        'Paul « Mouono » Onobiono',
        'Théodora Mouafo',
      ],
    },
    en: {
      title: 'EXODE',
      subtitle: 'Identity and the migration of a people, a thought, a spiritual state and a place to another',
      period: '9 Feb — 18 Feb 2024',
      location: 'Yaoundé, Cameroon',
      theme:
        'EXODE explores displacement in all its dimensions: geographic, spiritual and intellectual. This edition examines the migration of a people leaving a place, a belief or a way of thinking — questioning what is carried, what is lost and what is transformed along the way.',
      description:
        "EXODE deepens the reflective dimension of the concept through narrative and identity. With a bold scenography and structured moments of exchange, this edition brings together 8 artists and confirms La TR'ART'VERSÉE as a space for serious, innovative artistic reflection.",
      artists: [
        'Jean David Nkot',
        'Louise Sombga',
        'Gael « Keutch » Keutchogue',
        'Renaud Atemengue',
        'Nourane Hassan',
        'Bright Toh',
        'Paul « Mouono » Onobiono',
        'Théodora Mouafo',
      ],
    },
  },
  {
    id: 'la-genese',
    status: 'past',
    coverImage: '/exhibitions/edition-1/cover.jpg',
    images: edition1Gallery,
    video: '/videos/edition-1-recap.mp4',
    videoPoster: '/exhibitions/edition-1/cover.jpg',
    videoRotate: -90,
    tags: ['Origines', 'Culture', 'Genèse', 'Art contemporain'],
    fr: {
      title: "LA TR'ART'VERSÉE : LA GENÈSE",
      subtitle: 'Les origines de notre culture',
      period: '8 Sep — 10 Sep 2023',
      location: 'Yaoundé, Cameroun',
      theme:
        "Édition fondatrice, LA GENÈSE explore les origines, celles du collectif comme celles de la pensée. Elle met en scène la migration d'un état d'esprit à un autre, ce basculement intérieur par lequel une idée, une conscience, se transforme et s'ouvre à de nouvelles perspectives.",
      description:
        "Première édition de La TR'ART'VERSÉE, LA GENÈSE réunit 8 artistes autour d'un dialogue direct entre œuvres et public, replaçant l'art au cœur des questionnements sociaux contemporains. Une exposition collective qui pose les bases du concept et fédère une première communauté autour de l'art contemporain camerounais.",
      artists: [
        'Jacques Eyoum Madiba',
        'Zak Ndam',
        'Carole Nkolo',
        'Bright Toh',
        'Gael « Keutch » Keutchogue',
        'Alida Ymele',
        'Stephane Bilana',
        'Erick « FOTALE » Foguieng',
      ],
    },
    en: {
      title: "LA TR'ART'VERSÉE: LA GENÈSE",
      subtitle: 'The origins of our culture',
      period: '8 Sep — 10 Sep 2023',
      location: 'Yaoundé, Cameroon',
      theme:
        'Founding edition — LA GENÈSE explores origins, those of the collective as well as those of thought. It stages the migration from one state of mind to another, that inner shift through which an idea, a consciousness, transforms and opens to new perspectives.',
      description:
        "The first edition of La TR'ART'VERSÉE, LA GENÈSE brings together 8 artists in a direct dialogue between works and audience, placing art back at the heart of contemporary social questions. A collective exhibition that lays the foundations of the concept and builds a first community around Cameroonian contemporary art.",
      artists: [
        'Jacques Eyoum Madiba',
        'Zak Ndam',
        'Carole Nkolo',
        'Bright Toh',
        'Gael « Keutch » Keutchogue',
        'Alida Ymele',
        'Stephane Bilana',
        'Erick « FOTALE » Foguieng',
      ],
    },
  },
]

export function getLocalizedExposition(expo: Exposition, lang: Lang) {
  const content = expo[lang]
  return {
    id: expo.id,
    status: expo.status,
    coverImage: expo.coverImage,
    images: expo.images,
    video: expo.video,
    videoPoster: expo.videoPoster,
    videoRotate: expo.videoRotate,
    tags: expo.tags,
    title: content.title,
    subtitle: content.subtitle,
    period: content.period,
    location: content.location,
    theme: content.theme,
    description: content.description,
    artists: content.artists,
  }
}

export type LocalizedExposition = ReturnType<typeof getLocalizedExposition>
