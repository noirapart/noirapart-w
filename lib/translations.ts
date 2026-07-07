import type { Lang } from '@/contexts/LanguageContext'

const translations = {
  fr: {
    // Shared UI
    'ui.close': 'Fermer',

    // Navigation
    'nav.expositions': 'Expositions',
    'nav.entretiens': 'Entretiens',
    'nav.artistes': 'Artistes',
    'nav.contact': 'Contact',
    'nav.home': 'Accueil',
    'nav.menu': 'Menu',

    // Hero
    'hero.badge': 'Nouvelle Exposition : Identités Croisées',
    'hero.title': "Un pont entre l'art, la culture et le monde.",
    'hero.subtitle': "NOIR A PART célèbre la créativité africaine et afro-diasporique à travers des expositions curatées, des entretiens exclusifs et des expériences immersives.",
    'hero.cta1': 'Découvrir',
    'hero.cta2': 'Nous contacter',
    'hero.scroll': 'Défiler',

    // Cultural Pillars
    'pillars.title': 'Explorer',
    'pillars.subtitle': 'Trois entrées pour découvrir le monde que NOIR A PART documente et célèbre.',
    'pillars.expositions.description': 'Thèmes, œuvres et récits des expositions passées et en cours.',
    'pillars.entretiens.description': 'Conversations intimes avec des créateurs, penseurs et visionnaires.',
    'pillars.artistes.description': 'Portraits et trajectoires des créateurs qui façonnent la scène afro-diasporique.',

    // Side Nav
    'sidenav.hero': 'Accueil',
    'sidenav.plateforme': 'Explorer',
    'sidenav.contact': 'Contact',
    'sidenav.manifeste': 'Manifeste',

    // Inquiry / Contact
    'inquiry.label': 'Contact',
    'inquiry.title1': 'Une question,',
    'inquiry.title2': 'une idée\u00a0?',
    'inquiry.subtitle': "Pour toute demande concernant nos expositions, nos projets ou une collaboration, nous serions ravis d'échanger avec vous.",
    'inquiry.bullet1': 'Réponse sous 48\u00a0h ouvrées',
    'inquiry.bullet2': 'Prise en charge en français et en anglais',
    'inquiry.bullet3': 'Projets curatoraux, presse, acquisitions, collaborations',
    'inquiry.firstName': 'Prénom',
    'inquiry.lastName': 'Nom',
    'inquiry.email': 'Email',
    'inquiry.subject': 'Sujet',
    'inquiry.subjectPlaceholder': 'Choisir un sujet…',
    'inquiry.message': 'Message',
    'inquiry.messagePlaceholder': 'Décrivez votre demande…',
    'inquiry.submit': "Préparer l'e-mail",
    'inquiry.success.title': 'Brouillon prêt',
    'inquiry.success.body': "Votre client mail s'ouvre avec votre demande préremplie. Envoyez l'e-mail pour finaliser.",
    'inquiry.success.link': 'Préparer une autre demande',
    'inquiry.s1': 'Exposition',
    'inquiry.s2': 'Entretien',
    'inquiry.s3': 'Collaboration artistique',
    'inquiry.s4': 'Presse & Médias',
    'inquiry.s5': "Acquisition d'œuvre",
    'inquiry.s6': 'Autre',

    // Manifesto
    'manifesto.label': 'Notre Manifeste',
    'manifesto.title': "Célébrer la pluralité des voix afro\u2011diasporiques.",
    'manifesto.body': "NOIR A PART n'est pas qu'une galerie. C'est un espace de dialogue, de documentation et de transmission. Nous créons des ponts tangibles entre les créateurs contemporains et un public en quête de sens, d'authenticité et de nouvelles narrations.",
    'manifesto.cta': 'Nous écrire',

    // Upcoming
    'upcoming.label': 'Agenda',
    'upcoming.title': 'Prochains projets',
    'upcoming.cta': 'Rester informé',
    'upcoming.soon': 'Bientôt',
    'upcoming.notify': 'Me tenir informé',
    'upcoming.p1.type': 'Exposition',
    'upcoming.p1.title': 'Mémoire Vive',
    'upcoming.p1.description': "Une exploration de la mémoire collective et de l'archive dans l'art contemporain afro-diasporique.",
    'upcoming.p1.date': 'Juin 2026',
    'upcoming.p2.type': 'Conférence',
    'upcoming.p2.title': 'Diaspora & Création',
    'upcoming.p2.description': "Table ronde réunissant des voix majeures de la création contemporaine pour questionner les frontières entre identité et pratique artistique.",
    'upcoming.p2.date': 'Juillet 2026',
    'upcoming.p3.type': 'Résidence',
    'upcoming.p3.title': 'Résidence Paris',
    'upcoming.p3.description': "Programme de résidence de trois semaines à Paris, ouvert à des artistes émergents du continent africain et de sa diaspora.",
    'upcoming.p3.date': 'Septembre 2026',

    // Value Props
    'values.discover.title': 'Découvrir',
    'values.discover.desc': 'Explorez des œuvres uniques et des perspectives inédites.',
    'values.participate.title': 'Participer',
    'values.participate.desc': 'Rejoignez nos événements physiques et digitaux.',
    'values.meet.title': 'Rencontrer',
    'values.meet.desc': 'Échangez directement avec les artistes de la scène afro-diasporique.',
    'values.exchange.title': 'Échanger',
    'values.exchange.desc': 'Plongez dans des entretiens exclusifs avec les créateurs.',

    // Footer
    'footer.newsletter.copy': "Rejoignez notre newsletter pour être informé des prochaines expositions, nouveaux entretiens et projets.",
    'footer.newsletter.placeholder': 'Adresse email',
    'footer.newsletter.success': "Brouillon d'inscription ouvert. Envoyez l'e-mail pour confirmer.",
    'footer.platform': 'Plateforme',
    'footer.info': 'Informations',
    'footer.social': 'Réseaux',
    'footer.about': 'À propos',
    'footer.press': 'Presse',
    'footer.upcoming': 'Projets à venir',
    'footer.rights': '© 2026 NOIR A PART. Tous droits réservés.',
    'footer.legal': 'Mentions légales',
    'footer.privacy': 'Politique de confidentialité',

    // Page Heroes
    'page.expositions.label': 'Expositions',
    'page.expositions.title': 'Expositions',
    'page.expositions.desc': "Les projets curatoraux de NOIR A PART — passés, en cours et à venir.",
    'page.entretiens.label': 'Entretiens',
    'page.entretiens.title': 'Entretiens',
    'page.entretiens.desc': "Conversations avec les artistes, penseurs et créateurs que NOIR A PART accompagne.",
    'page.artistes.label': 'Artistes',
    'page.artistes.title': 'Artistes',
    'page.artistes.desc': "Les créateurs et créatrices avec lesquels NOIR A PART construit son projet culturel.",

    // Exposition list UI
    'expo.nowShowing': 'À la une',
    'expo.seeExpo': "Voir l'exposition",
    'expo.status.current': 'En cours',
    'expo.status.upcoming': 'À venir',
    'expo.status.past': 'Passé',
    'expo.modal.theme': 'Thème',
    'expo.modal.about': 'À propos',
    'expo.modal.artists': 'Artistes',
    'expo.modal.photos': 'Photos',

    // Entretiens list UI
    'entretien.featured': 'À la une',
    'entretien.read': 'Lire',
    'entretien.label': 'Entretien',

    // Artistes list UI
    'artistes.count': (n: number) => `${n} artiste${n > 1 ? 's' : ''}`,
    'artistes.viewProfile': 'Voir le profil',
    'artistes.modal.origin': 'Origine',
    'artistes.modal.based': 'Basé(e) à',
    'artistes.modal.bio': 'Biographie',
    'artistes.modal.cta': 'Contacter au sujet de cet artiste',
  },

  en: {
    'ui.close': 'Close',

    'nav.expositions': 'Exhibitions',
    'nav.entretiens': 'Interviews',
    'nav.artistes': 'Artists',
    'nav.contact': 'Contact',
    'nav.home': 'Home',
    'nav.menu': 'Menu',

    'hero.badge': 'New Exhibition: Crossed Identities',
    'hero.title': 'A bridge between art, culture and the world.',
    'hero.subtitle': 'NOIR A PART celebrates African and Afro-diasporic creativity through curated exhibitions, exclusive interviews and immersive experiences.',
    'hero.cta1': 'Discover',
    'hero.cta2': 'Contact us',
    'hero.scroll': 'Scroll',

    'pillars.title': 'Explore',
    'pillars.subtitle': 'Three entry points to discover the world that NOIR A PART documents and celebrates.',
    'pillars.expositions.description': 'Themes, works and narratives from past and current exhibitions.',
    'pillars.entretiens.description': 'Intimate conversations with creators, thinkers and visionaries.',
    'pillars.artistes.description': 'Portraits and trajectories of the creators who shape the Afro-diasporic scene.',

    'sidenav.hero': 'Home',
    'sidenav.plateforme': 'Explore',
    'sidenav.contact': 'Contact',
    'sidenav.manifeste': 'Manifesto',

    'inquiry.label': 'Contact',
    'inquiry.title1': 'A question,',
    'inquiry.title2': 'an idea?',
    'inquiry.subtitle': 'For any enquiry regarding our exhibitions, projects or a collaboration, we would love to hear from you.',
    'inquiry.bullet1': 'Response within 48 working hours',
    'inquiry.bullet2': 'Available in French and English',
    'inquiry.bullet3': 'Curatorial projects, press, acquisitions, collaborations',
    'inquiry.firstName': 'First name',
    'inquiry.lastName': 'Last name',
    'inquiry.email': 'Email',
    'inquiry.subject': 'Subject',
    'inquiry.subjectPlaceholder': 'Choose a subject…',
    'inquiry.message': 'Message',
    'inquiry.messagePlaceholder': 'Describe your enquiry…',
    'inquiry.submit': 'Prepare email',
    'inquiry.success.title': 'Draft ready',
    'inquiry.success.body': 'Your email client opens with your request filled in. Send the email to finish.',
    'inquiry.success.link': 'Prepare another request',
    'inquiry.s1': 'Exhibition',
    'inquiry.s2': 'Interview',
    'inquiry.s3': 'Artistic Collaboration',
    'inquiry.s4': 'Press & Media',
    'inquiry.s5': 'Artwork Acquisition',
    'inquiry.s6': 'Other',

    'manifesto.label': 'Our Manifesto',
    'manifesto.title': 'Celebrating the plurality of Afro\u2011diasporic voices.',
    'manifesto.body': 'NOIR A PART is more than a gallery. It is a space for dialogue, documentation and transmission. We create tangible bridges between contemporary creators and an audience in search of meaning, authenticity and new narratives.',
    'manifesto.cta': 'Write to us',

    'upcoming.label': 'Agenda',
    'upcoming.title': 'Upcoming projects',
    'upcoming.cta': 'Stay informed',
    'upcoming.soon': 'Soon',
    'upcoming.notify': 'Keep me informed',
    'upcoming.p1.type': 'Exhibition',
    'upcoming.p1.title': 'Living Memory',
    'upcoming.p1.description': 'An exploration of collective memory and archive in contemporary Afro-diasporic art.',
    'upcoming.p1.date': 'June 2026',
    'upcoming.p2.type': 'Conference',
    'upcoming.p2.title': 'Diaspora & Creation',
    'upcoming.p2.description': 'A roundtable bringing together leading voices in contemporary creation to question the boundaries between identity and artistic practice.',
    'upcoming.p2.date': 'July 2026',
    'upcoming.p3.type': 'Residency',
    'upcoming.p3.title': 'Paris Residency',
    'upcoming.p3.description': 'A three-week residency programme in Paris, open to emerging artists from the African continent and its diaspora.',
    'upcoming.p3.date': 'September 2026',

    'values.discover.title': 'Discover',
    'values.discover.desc': 'Explore unique works and unprecedented perspectives.',
    'values.participate.title': 'Participate',
    'values.participate.desc': 'Join our physical and digital events.',
    'values.meet.title': 'Meet',
    'values.meet.desc': 'Connect directly with artists from the Afro-diasporic scene.',
    'values.exchange.title': 'Exchange',
    'values.exchange.desc': 'Dive into exclusive interviews with creators.',

    'footer.newsletter.copy': 'Join our newsletter to be informed of upcoming exhibitions, new interviews and projects.',
    'footer.newsletter.placeholder': 'Email address',
    'footer.newsletter.success': 'Subscription draft opened. Send the email to confirm.',
    'footer.platform': 'Platform',
    'footer.info': 'Information',
    'footer.social': 'Networks',
    'footer.about': 'About',
    'footer.press': 'Press',
    'footer.upcoming': 'Upcoming projects',
    'footer.rights': '© 2026 NOIR A PART. All rights reserved.',
    'footer.legal': 'Legal notice',
    'footer.privacy': 'Privacy policy',

    'page.expositions.label': 'Exhibitions',
    'page.expositions.title': 'Exhibitions',
    'page.expositions.desc': "NOIR A PART's curatorial projects — past, present and upcoming.",
    'page.entretiens.label': 'Interviews',
    'page.entretiens.title': 'Interviews',
    'page.entretiens.desc': 'Conversations with the artists, thinkers and creators that NOIR A PART supports.',
    'page.artistes.label': 'Artists',
    'page.artistes.title': 'Artists',
    'page.artistes.desc': 'The creators with whom NOIR A PART builds its cultural project.',

    'expo.nowShowing': 'Featured',
    'expo.seeExpo': 'View exhibition',
    'expo.status.current': 'On view',
    'expo.status.upcoming': 'Upcoming',
    'expo.status.past': 'Past',
    'expo.modal.theme': 'Theme',
    'expo.modal.about': 'About',
    'expo.modal.artists': 'Artists',
    'expo.modal.photos': 'Photos',

    'entretien.featured': 'Featured',
    'entretien.read': 'Read',
    'entretien.label': 'Interview',

    'artistes.count': (n: number) => `${n} artist${n > 1 ? 's' : ''}`,
    'artistes.viewProfile': 'View profile',
    'artistes.modal.origin': 'Origin',
    'artistes.modal.based': 'Based in',
    'artistes.modal.bio': 'Biography',
    'artistes.modal.cta': 'Contact about this artist',
  },
} as const

export type TKey = keyof typeof translations.fr

export function useTranslations(lang: Lang) {
  const dict = translations[lang]
  return (key: TKey) => {
    const val = dict[key as keyof typeof dict]
    if (typeof val === 'function') return val as unknown as string
    return (val ?? key) as string
  }
}
