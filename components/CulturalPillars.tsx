'use client'
import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { useLang } from '@/contexts/LanguageContext'
import { useTranslations } from '@/lib/translations'

const MotionLink = motion.create(Link)

type Pillar = {
  href: string
  title: string
  description: string
  src: string
  alt: string
  badge?: string
}

function PillarCard({ pillar, index }: { pillar: Pillar; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <MotionLink
      ref={ref}
      href={pillar.href}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col h-72 sm:h-96 md:h-[480px] lg:h-[520px] overflow-hidden rounded-xl bg-ink/10 border border-ink/10 dark:border-gallery/10 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/80 focus-visible:ring-offset-4 focus-visible:ring-offset-gallery dark:focus-visible:ring-offset-ink"
    >
      <div className="absolute inset-0 overflow-hidden">
        <Image src={pillar.src} alt={pillar.alt} fill className="object-cover transition-all duration-700 group-hover:scale-105 md:grayscale md:group-hover:grayscale-0 opacity-90" sizes="(max-width: 768px) 100vw, 33vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/40 to-ink/10" />
      </div>
      <div className="mt-auto p-5 sm:p-8 relative z-10 text-white">
        {pillar.badge && (
          <span className="inline-block mb-3 text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full border border-white/20 bg-white/10 text-white/80">
            {pillar.badge}
          </span>
        )}
        <div className="flex items-center justify-between gap-4 mb-3">
          <h3 className="text-2xl font-medium">{pillar.title}</h3>
          <ArrowUpRight size={22} strokeWidth={1.5} className="shrink-0 opacity-70 md:opacity-0 translate-x-0 md:translate-x-1 md:-translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 text-brand" />
        </div>
        <p className="text-sm text-white/68 font-light leading-relaxed">{pillar.description}</p>
        <div className="mt-5 w-8 h-px bg-brand opacity-70 md:opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/0 group-hover:ring-brand/20 transition-all duration-300" />
    </MotionLink>
  )
}

export default function CulturalPillars() {
  const { lang } = useLang()
  const t = useTranslations(lang)
  const titleRef = useRef<HTMLDivElement>(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' })

  const pillars = [
    {
      href: '/expositions',
      title: t('nav.expositions'),
      description: t('pillars.expositions.description'),
      src: '/exhibitions/exode/cover.jpg',
      alt: 'Expositions',
    },
    {
      href: '/entretiens',
      title: t('nav.entretiens'),
      description: t('pillars.entretiens.description'),
      src: '/entretiens-pic.jpg',
      alt: 'Entretiens',
      badge: t('entretien.comingSoon'),
    },
    {
      href: '/artistes',
      title: t('nav.artistes'),
      description: t('pillars.artistes.description'),
      src: '/exhibitions/womheart/cover.jpg',
      alt: 'Artistes',
    },
  ]

  return (
    <section id="plateforme" className="py-16 md:py-28 px-6 max-w-7xl mx-auto bg-gallery dark:bg-ink">
      <motion.div
        ref={titleRef}
        initial={{ opacity: 0, y: 24 }}
        animate={titleInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-16 gap-4 md:gap-6"
      >
        <div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-normal text-ink dark:text-gallery mb-3">
            {t('pillars.title')}
          </h2>
          <p className="text-ink/50 dark:text-gallery/50 text-base max-w-md">
            {t('pillars.subtitle')}
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {pillars.map((pillar, index) => (
          <PillarCard key={pillar.href} pillar={pillar} index={index} />
        ))}
      </div>
    </section>
  )
}
