'use client'
import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, MapPin, Calendar } from 'lucide-react'
import type { Exposition, ExpoStatus } from '@/lib/exhibitions'
import { getLocalizedExposition, type LocalizedExposition } from '@/lib/exhibitions'
import { useLang } from '@/contexts/LanguageContext'
import { useTranslations, type TKey } from '@/lib/translations'

const STATUS_COLORS: Record<ExpoStatus, string> = {
  current: 'bg-green-600/90 text-white border-green-400/30 shadow-sm',
  upcoming: 'bg-brand text-white border-brand-light/50 shadow-sm',
  past: 'bg-brand text-white border-white/35 shadow-[0_2px_12px_rgba(0,0,0,0.45)] ring-1 ring-white/50',
}

const STATUS_KEYS: Record<ExpoStatus, TKey> = {
  current: 'expo.status.current',
  upcoming: 'expo.status.upcoming',
  past: 'expo.status.past',
}

const SECTION_KEYS: Record<ExpoStatus, TKey> = {
  current: 'expo.section.current',
  upcoming: 'expo.section.upcoming',
  past: 'expo.section.past',
}

function ExpoCard({
  expo,
  index,
  t,
  featured,
}: {
  expo: LocalizedExposition
  index: number
  t: (k: TKey) => string
  featured?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  if (featured) {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 32 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="col-span-1 md:col-span-2 lg:col-span-3"
      >
        <Link
          href={`/expositions/${expo.id}`}
          className="group block text-left"
        >
          <div className="relative h-[420px] sm:h-[480px] rounded-2xl overflow-hidden border border-ink/10 dark:border-gallery/10">
            <Image
              src={expo.coverImage}
              alt={expo.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className={`text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full border ${STATUS_COLORS[expo.status]}`}>
                    {t(STATUS_KEYS[expo.status])}
                  </span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-normal text-white mb-1 max-w-3xl">{expo.title}</h2>
                <p className="text-neutral-300 text-sm font-light max-w-2xl">{expo.subtitle}</p>
              </div>
              <div className="flex items-center gap-2 text-white/80 text-sm font-medium shrink-0 group-hover:text-white transition-colors">
                {t('expo.seeExpo')}
                <ArrowRight size={16} strokeWidth={1.5} className="group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={`/expositions/${expo.id}`} className="group flex flex-col text-left">
        <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-ink/10 dark:border-gallery/10 mb-5">
          <Image
            src={expo.coverImage}
            alt={expo.title}
            fill
            className="object-cover md:grayscale md:group-hover:grayscale-0 transition-all duration-500 group-hover:scale-[1.04]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-ink/20 group-hover:bg-ink/0 transition-colors duration-500" />
          <div className="absolute top-4 left-4">
            <span className={`text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full border ${STATUS_COLORS[expo.status]}`}>
              {t(STATUS_KEYS[expo.status])}
            </span>
          </div>
        </div>
        <h3 className="text-lg font-medium text-ink dark:text-gallery mb-1 group-hover:text-brand transition-colors line-clamp-2">
          {expo.title}
        </h3>
        <p className="text-sm text-ink/50 dark:text-gallery/50 mb-3 line-clamp-2">{expo.subtitle}</p>
        <div className="flex flex-wrap items-center gap-3 text-xs text-ink/45 dark:text-gallery/45 mt-auto">
          <span className="flex items-center gap-1"><Calendar size={11} strokeWidth={1.5} />{expo.period}</span>
          <span className="flex items-center gap-1"><MapPin size={11} strokeWidth={1.5} />{expo.location}</span>
        </div>
      </Link>
    </motion.div>
  )
}

function ExpoSection({
  status,
  items,
  t,
}: {
  status: ExpoStatus
  items: LocalizedExposition[]
  t: (k: TKey) => string
}) {
  if (items.length === 0) return null
  const featured = status === 'upcoming' && items[0]

  return (
    <section className="mb-14 md:mb-20">
      <h2 className="font-display text-xl md:text-2xl font-normal text-ink dark:text-gallery mb-8 pb-4 border-b border-ink/10 dark:border-gallery/10">
        {t(SECTION_KEYS[status])}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featured && <ExpoCard expo={featured} index={0} t={t} featured />}
        {items.slice(featured ? 1 : 0).map((expo, i) => (
          <ExpoCard key={expo.id} expo={expo} index={i} t={t} />
        ))}
      </div>
    </section>
  )
}

export default function ExpositionsList({ expositions }: { expositions: Exposition[] }) {
  const { lang } = useLang()
  const t = useTranslations(lang)

  const localized = expositions.map((e) => getLocalizedExposition(e, lang))
  const upcoming = localized.filter((e) => e.status === 'upcoming')
  const current = localized.filter((e) => e.status === 'current')
  const past = localized.filter((e) => e.status === 'past')

  return (
    <main className="py-12 md:py-16 px-5 sm:px-6 max-w-7xl mx-auto pb-24 md:pb-16 bg-gallery dark:bg-ink">
      <ExpoSection status="upcoming" items={upcoming} t={t} />
      <ExpoSection status="current" items={current} t={t} />
      <ExpoSection status="past" items={past} t={t} />
    </main>
  )
}
