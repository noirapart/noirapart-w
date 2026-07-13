import type { Lang } from '@/contexts/LanguageContext'
import { expositions, type Exposition } from '@/lib/exhibitions'

export type ExhibitionRef = 'la-genese' | 'exode' | 'womheart'

export type Artiste = {
  id: string
  name: string
  image: string | null
  exhibitions: ExhibitionRef[]
  origin: LocalizedValue
  based: LocalizedValue
}

type LocalizedValue = {
  fr: string
  en: string
}

type ArtistProfile = {
  name: string
  image: string | null
  origin: LocalizedValue
  based: LocalizedValue
  exhibitionAliases?: string[]
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

const CAMEROON = { fr: 'Cameroun', en: 'Cameroon' }

function basedIn(city: string): LocalizedValue {
  return { fr: `${city}, Cameroun`, en: `${city}, Cameroon` }
}

const ARTIST_PROFILES: ArtistProfile[] = [
  { name: 'Alida Ymele', image: '/artists/alida-ymele.webp', origin: CAMEROON, based: basedIn('Yaoundé') },
  { name: 'Allen Wankwini', image: '/artists/allen-wankwini.jpg', origin: CAMEROON, based: basedIn('Yaoundé') },
  { name: 'Bright Toh', image: '/artists/bright-toh.jpg', origin: CAMEROON, based: basedIn('Buea') },
  { name: 'Carole Nkolo', image: '/artists/carole-nkolo.jpg', origin: CAMEROON, based: basedIn('Yaoundé') },
  { name: 'Desy Danga', image: '/artists/desy-danga.jpeg', origin: CAMEROON, based: basedIn('Garoua') },
  { name: 'Edwige Ndjeng', image: '/artists/edwige-ndjeng.jpg', origin: CAMEROON, based: basedIn('Douala') },
  {
    name: 'Erick Foguieng',
    image: '/artists/erick-foguieng.jpg',
    origin: CAMEROON,
    based: basedIn('Douala'),
    exhibitionAliases: ['Erick « FOTALE » Foguieng'],
  },
  {
    name: 'Gael Keutchogue',
    image: '/artists/gael-keutchogue.jpg',
    origin: CAMEROON,
    based: basedIn('Yaoundé'),
    exhibitionAliases: ['Gael « Keutch » Keutchogue'],
  },
  { name: 'Jacques Eyoum Madiba', image: '/artists/jacques-eyoum-madiba.jpg', origin: CAMEROON, based: basedIn('Yaoundé') },
  { name: 'Jean David Nkot', image: '/artists/jean-david-nkot.png', origin: CAMEROON, based: basedIn('Douala') },
  { name: 'Lauriane Yougang', image: '/artists/lauriane-yougang.webp', origin: CAMEROON, based: basedIn('Yaoundé') },
  { name: 'Leuna Noumbimboo', image: '/artists/leuna-noumbimboo.jpg', origin: CAMEROON, based: basedIn('Douala') },
  {
    name: 'Nourane Hassan',
    image: '/artists/nourane-hassan.jpeg',
    origin: { fr: 'Égypte', en: 'Egypt' },
    based: { fr: 'Arabie saoudite', en: 'Saudi Arabia' },
  },
  {
    name: 'Paul Onobiono',
    image: '/artists/paul-onobiono.jpg',
    origin: CAMEROON,
    based: basedIn('Yaoundé'),
    exhibitionAliases: ['Paul « Mouono » Onobiono'],
  },
  { name: 'Raoul Wansi', image: '/artists/raoul-wansi.jpg', origin: CAMEROON, based: basedIn('Douala') },
  { name: 'Renaud Atemengue', image: null, origin: CAMEROON, based: basedIn('Yaoundé') },
  { name: 'Saint Babila', image: '/artists/saint-babila.jpg', origin: CAMEROON, based: basedIn('Yaoundé') },
  { name: 'STOOF', image: '/artists/stoof.png', origin: CAMEROON, based: basedIn('Douala') },
  {
    name: 'Theodora Mouafo',
    image: null,
    origin: CAMEROON,
    based: basedIn('Yaoundé'),
    exhibitionAliases: ['Théodora Mouafo'],
  },
  { name: 'Zak Ndam', image: '/artists/zak-ndam.jpg', origin: CAMEROON, based: basedIn('Douala') },
]

function slugify(name: string) {
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function profileNames(profile: ArtistProfile) {
  return [profile.name, ...(profile.exhibitionAliases ?? [])]
}

function exhibitionsForProfile(profile: ArtistProfile): ExhibitionRef[] {
  const names = new Set(profileNames(profile))
  return EXHIBITION_ORDER.filter((id) => {
    const expo = expositions.find((item) => item.id === id) as Exposition
    return expo.fr.artists.some((name) => names.has(name))
  })
}

function buildArtist(profile: ArtistProfile): Artiste {
  return {
    id: slugify(profile.name),
    name: profile.name,
    image: profile.image,
    exhibitions: exhibitionsForProfile(profile),
    origin: profile.origin,
    based: profile.based,
  }
}

export function getArtists(): Artiste[] {
  return ARTIST_PROFILES
    .map(buildArtist)
    .sort((a, b) => a.name.localeCompare(b.name, 'fr'))
}

export function getArtistByName(name: string): Artiste | undefined {
  const profile = ARTIST_PROFILES.find((item) => profileNames(item).includes(name))
  return profile ? buildArtist(profile) : undefined
}

export function getArtistsForExhibition(exhibitionId: ExhibitionRef): Artiste[] {
  const expo = expositions.find((e) => e.id === exhibitionId) as Exposition
  return expo.fr.artists
    .map(getArtistByName)
    .filter((artist): artist is Artiste => Boolean(artist))
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
      artistCount: getArtistsForExhibition(id).length,
    }
  })
}

export type LocalizedArtiste = Omit<Artiste, 'origin' | 'based'> & {
  discipline: string
  origin: string
  based: string
  tags: string[]
  exhibitionLabels: string[]
}

export function localizeArtiste(artiste: Artiste, lang: Lang): LocalizedArtiste {
  const labels = artiste.exhibitions.map((id) => EXHIBITION_LABELS[id][lang])
  const copy = {
    fr: {
      discipline: 'Art contemporain',
    },
    en: {
      discipline: 'Contemporary art',
    },
  }[lang]

  return {
    ...artiste,
    discipline: copy.discipline,
    origin: artiste.origin[lang],
    based: artiste.based[lang],
    tags: labels,
    exhibitionLabels: labels,
  }
}
