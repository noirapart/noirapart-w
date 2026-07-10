import type { Lang } from '@/contexts/LanguageContext'
import { expositions, type Exposition } from '@/lib/exhibitions'

export type ExhibitionRef = 'la-genese' | 'exode' | 'womheart'

export type Artiste = {
  id: string
  name: string
  image: string
  exhibitions: ExhibitionRef[]
}

const EXHIBITION_ORDER: ExhibitionRef[] = ['la-genese', 'exode', 'womheart']

export const EXHIBITION_COVERS: Record<ExhibitionRef, string> = {
  'la-genese': '/exhibitions/edition-1/cover.jpg',
  exode: '/exhibitions/exode/cover.jpg',
  womheart: '/exhibitions/womheart/cover.jpg',
}

export const EXHIBITION_LABELS: Record<ExhibitionRef, { fr: string; en: string }> = {
  'la-genese': { fr: "LA GENÈSE", en: 'LA GENÈSE' },
  exode: { fr: 'EXODE', en: 'EXODE' },
  womheart: { fr: "WOM'HEART", en: "WOM'HEART" },
}

const STOCK_PORTRAITS = [
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1494790108755-2616b612b830?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1200&auto=format&fit=crop',
]

function slugify(name: string) {
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function stockImageFor(id: string) {
  let hash = 0
  for (let i = 0; i < id.length; i += 1) hash = (hash + id.charCodeAt(i) * (i + 1)) % STOCK_PORTRAITS.length
  return STOCK_PORTRAITS[hash]
}

function buildArtist(name: string, exhibitions: ExhibitionRef[]): Artiste {
  const id = slugify(name)
  return { id, name, image: stockImageFor(id), exhibitions }
}

export function getArtists(): Artiste[] {
  const byName = new Map<string, Set<ExhibitionRef>>()

  for (const expo of expositions) {
    if (expo.id === 'broken-lineage') continue
    const ref = expo.id as ExhibitionRef
    for (const name of expo.fr.artists) {
      if (!byName.has(name)) byName.set(name, new Set())
      byName.get(name)!.add(ref)
    }
  }

  return [...byName.entries()]
    .map(([name, exhibitions]) =>
      buildArtist(name, EXHIBITION_ORDER.filter((id) => exhibitions.has(id))),
    )
    .sort((a, b) => a.name.localeCompare(b.name, 'fr'))
}

export function getArtistByName(name: string): Artiste | undefined {
  return getArtists().find((a) => a.name === name)
}

export function getArtistsForExhibition(exhibitionId: ExhibitionRef): Artiste[] {
  const expo = expositions.find((e) => e.id === exhibitionId) as Exposition
  return expo.fr.artists.map((name) => buildArtist(name, [exhibitionId]))
}

export function getExhibitionSummaries(lang: Lang) {
  return EXHIBITION_ORDER.map((id) => {
    const expo = expositions.find((e) => e.id === id) as Exposition
    const content = expo[lang]
    return {
      id,
      title: EXHIBITION_LABELS[id][lang],
      fullTitle: content.title,
      period: content.period,
      cover: EXHIBITION_COVERS[id],
      artistCount: content.artists.length,
    }
  })
}

export type LocalizedArtiste = Artiste & {
  discipline: string
  origin: string
  based: string
  bio: string
  tags: string[]
  exhibitionLabels: string[]
}

export function localizeArtiste(artiste: Artiste, lang: Lang): LocalizedArtiste {
  const labels = artiste.exhibitions.map((id) => EXHIBITION_LABELS[id][lang])
  const copy = {
    fr: {
      discipline: 'Art contemporain',
      origin: 'Cameroun',
      based: 'Yaoundé, Cameroun',
      bio: (names: string[]) =>
        `${artiste.name} a participé à ${names.join(', ')} dans le cadre de La TR'ART'VERSÉE par NOIR A PART.`,
    },
    en: {
      discipline: 'Contemporary art',
      origin: 'Cameroon',
      based: 'Yaoundé, Cameroon',
      bio: (names: string[]) =>
        `${artiste.name} participated in ${names.join(', ')} as part of La TR'ART'VERSÉE by NOIR A PART.`,
    },
  }[lang]

  return {
    ...artiste,
    discipline: copy.discipline,
    origin: copy.origin,
    based: copy.based,
    bio: copy.bio(labels),
    tags: labels,
    exhibitionLabels: labels,
  }
}
