import type { Metadata } from 'next'
import PageHero from '@/components/PageHero'
import EntretiensList from '@/components/EntretiensList'

export const metadata: Metadata = {
  title: 'Entretiens — NOIR A PART',
  description: 'Conversations exclusives avec des artistes, penseurs et créateurs de la scène afro-diasporique.',
}

export type Entretien = {
  id: string
  title: string
  subject: string
  role: string
  excerpt: string
  date: string
  readTime: string
  image: string
  tags: string[]
  content: string
}

const entretiens: Entretien[] = [
  {
    id: 'amara-diallo',
    title: 'La peinture comme acte de résistance',
    subject: 'Amara Diallo',
    role: 'Peintre, Paris',
    excerpt:
      'Amara Diallo parle de son rapport à la couleur noire, non comme absence mais comme présence absolue, et de la façon dont sa peinture refuse les catégories imposées.',
    date: 'Mars 2026',
    readTime: '12 min',
    image: 'https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?q=80&w=1200&auto=format&fit=crop',
    tags: ['Peinture', 'Identité', 'Résistance'],
    content:
      'Dans son atelier parisien, Amara Diallo travaille entouré de toiles de grand format dont les noirs sont aussi intenses que variés. « Pour moi, le noir n\'est pas une couleur. C\'est un territoire. Un espace où tout peut exister. » Né à Dakar, formé à l\'École des Beaux-Arts de Paris, Amara a développé une pratique qui refuse autant le pittoresque exotique que le geste purement formaliste. Ses œuvres portent une tension : elles semblent à la fois vouloir nous raconter quelque chose et nous résister.\n\n« Je pense à l\'histoire chaque fois que je prends le pinceau. Pas de façon illustrative — je ne fais pas de peinture historique. Mais l\'histoire est là, comme une pression dans le bras. Quelque chose que je dois traverser pour arriver à quelque chose de vrai. »\n\nSa série la plus récente, présentée dans Identités Croisées, explore les zones de passage. Des corps à peine reconnaissables, des espaces indéfinis, des lumières qui ne viennent de nulle part. « Je veux que le spectateur ne sache pas s\'il regarde un lieu ou une émotion. Pour moi, c\'est la même chose. »',
  },
  {
    id: 'kofi-mensah',
    title: 'La sculpture comme conversation avec les ancêtres',
    subject: 'Kofi Mensah',
    role: 'Sculpteur, Accra & Berlin',
    excerpt:
      'Entre Accra et Berlin, Kofi Mensah sculpte des formes hybrides qui interrogent la transmission du savoir et la transformation des matières culturelles d\'une génération à l\'autre.',
    date: 'Janvier 2026',
    readTime: '9 min',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop',
    tags: ['Sculpture', 'Héritage', 'Matière'],
    content:
      'Kofi Mensah manipule les matières comme d\'autres manipulent les mots. Bois, bronze, argile, résine — il passe de l\'un à l\'autre avec une aisance qui cache un travail de recherche intense. « Chaque matière a une mémoire. Le bois de fromager que j\'utilise parfois vient d\'arbres qui ont vu des choses. Je ne sculpte pas dedans, je dégage ce qui est déjà là. »\n\nFormé à l\'Université des Arts de Berlin après des années d\'apprentissage auprès d\'artisans à Kumasi, Kofi navigue entre deux traditions sans se sentir contraint par aucune. « En Europe, on m\'a appris à penser en termes de "projet". En Afrique, j\'ai appris à penser en termes de "transmission". Ces deux logiques coexistent dans mon travail. »\n\nSes sculptures récentes sont de grands personnages debout, à mi-chemin entre la figuration et l\'abstraction, dont les surfaces portent des traces de processus contradictoires — poli et brûlé, assemblé et fracturé.',
  },
  {
    id: 'sarah-jenkins',
    title: 'Photographier l\'invisible',
    subject: 'Sarah Jenkins',
    role: 'Photographe & Vidéaste, Londres',
    excerpt:
      'Sarah Jenkins construit des archives de l\'intime. Sa caméra ne cherche pas les grands gestes mais les détails qui font la vie quotidienne des communautés afro-caribéennes de Londres.',
    date: 'Novembre 2025',
    readTime: '15 min',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b830?q=80&w=1200&auto=format&fit=crop',
    tags: ['Photographie', 'Archive', 'Communauté'],
    content:
      'Sarah Jenkins photographie depuis l\'âge de seize ans, d\'abord avec un appareil emprunté à sa tante, puis avec un sens toujours plus aigu de ce qu\'elle cherche dans l\'image. « Je ne cherche pas à documenter. Je cherche à être avec. Il y a une différence fondamentale entre observer une communauté et en faire partie, et cette différence se voit dans les images. »\n\nNée à Brixton de parents jamaïcains, Sarah a passé dix ans à construire une relation de confiance avec les familles qu\'elle photographie. Le résultat est une archive d\'une tendresse rare — des fêtes, des repas, des gestes de soin, des moments de deuil aussi.\n\n« L\'Occident a longtemps photographié les corps noirs de l\'extérieur, comme des sujets d\'étude ou d\'exotisme. Ce que j\'essaie de faire, c\'est de montrer ce que ça fait d\'être à l\'intérieur. La chaleur, le bruit, l\'humour, la douleur aussi. Tout ce que les archives officielles n\'ont pas gardé. »',
  },
  {
    id: 'david-ndlovu',
    title: 'Penser le temps autrement',
    subject: 'David Ndlovu',
    role: 'Artiste pluridisciplinaire, Johannesburg',
    excerpt:
      'David Ndlovu développe une pratique qui croise installation, performance et écriture pour questionner les temporalités imposées par le colonialisme et imaginer d\'autres façons d\'habiter le temps.',
    date: 'Septembre 2025',
    readTime: '11 min',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop',
    tags: ['Installation', 'Performance', 'Temps', 'Décolonial'],
    content:
      'David Ndlovu travaille lentement, délibérément. Ses installations prennent parfois des années à se construire, couche par couche, comme des sédiments. « Le colonialisme a imposé son rythme sur tout. Le temps de la production, le temps du marché, le temps de l\'histoire. Mon travail essaie de se soustraire à cette logique. »\n\nNé à Soweto et formé à la Wits School of Arts, David a longtemps résisté à l\'idée de "carrière artistique" telle qu\'elle est définie dans les circuits occidentaux. « Je ne voulais pas produire des œuvres pour des biennales qui me demanderaient de représenter l\'Afrique. Je voulais travailler avec ma communauté, à mon rythme. »\n\nSes performances récentes intègrent des pratiques rituelles Ndebele revisitées à travers un prisme contemporain, sans jamais tomber dans la reconstitution. « Ce qui m\'intéresse, c\'est ce que ces pratiques peuvent faire dans le présent. Pas les reproduire — les activer. »',
  },
]

export default function EntretiensPage() {
  return (
    <>
      <PageHero pageKey="entretiens" />
      <EntretiensList entretiens={entretiens} />
    </>
  )
}
