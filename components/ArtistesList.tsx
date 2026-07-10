'use client'
import { useMemo, useRef, useState } from 'react'
import { motion, useInView, AnimatePresence, LayoutGroup } from 'motion/react'
import Image from 'next/image'
import { MapPin, ArrowRight, LayoutGrid, Layers } from 'lucide-react'
import { useLang } from '@/contexts/LanguageContext'
import { useTranslations, type TKey } from '@/lib/translations'
import ArtisteModal from '@/components/ArtisteModal'
import {
  getArtists,
  getArtistsForExhibition,
  getExhibitionSummaries,
  localizeArtiste,
  type ExhibitionRef,
  type LocalizedArtiste,
} from '@/lib/artists'

type ViewMode = 'all' | 'expo'

function ArtisteCard({
  artiste,
  index,
  onSelect,
  t,
}: {
  artiste: LocalizedArtiste
  index: number
  onSelect: (a: LocalizedArtiste) => void
  t: (k: TKey) => string
}) {
  const ref = useRef<HTMLButtonElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.button
      type="button"
      ref={ref}
      layout
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.55, delay: (index % 6) * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="group cursor-pointer text-left"
      onClick={() => onSelect(artiste)}
      aria-haspopup="dialog"
      aria-label={`${t('artistes.viewProfile')} : ${artiste.name}`}
    >
      <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-200 dark:bg-neutral-800 mb-5">
        <Image
          src={artiste.image}
          alt={artiste.name}
          fill
          className="object-cover md:grayscale md:group-hover:grayscale-0 transition-all duration-700 group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-ink/10 group-hover:bg-ink/0 transition-colors duration-500" />
        <div className="absolute inset-x-0 bottom-0 p-5 sm:translate-y-2 sm:opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <div className="bg-white/95 dark:bg-ink/95 backdrop-blur-sm rounded-xl p-4 flex items-center justify-between border border-neutral-200/50 dark:border-neutral-700/50">
            <span className="text-sm font-medium text-ink dark:text-gallery">{t('artistes.viewProfile')}</span>
            <ArrowRight size={14} strokeWidth={1.5} className="text-ink/50 dark:text-gallery/50" />
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-base font-medium text-ink dark:text-white mb-0.5">{artiste.name}</h3>
        <p className="text-sm text-ink/50 dark:text-gallery/50 mb-1">{artiste.discipline}</p>
        <p className="text-xs text-neutral-400 dark:text-neutral-600 flex items-center gap-1">
          <MapPin size={10} strokeWidth={1.5} />
          {artiste.based}
        </p>
      </div>
    </motion.button>
  )
}

function ViewToggle({
  mode,
  onChange,
  t,
}: {
  mode: ViewMode
  onChange: (mode: ViewMode) => void
  t: (k: TKey) => string
}) {
  const options: { id: ViewMode; label: string; icon: typeof LayoutGrid }[] = [
    { id: 'all', label: t('artistes.viewModeAll'), icon: LayoutGrid },
    { id: 'expo', label: t('artistes.viewModeExpo'), icon: Layers },
  ]

  return (
    <LayoutGroup>
      <div
        role="tablist"
        aria-label={t('artistes.exhibitions')}
        className="inline-flex w-full sm:w-auto p-1 rounded-full border border-ink/10 dark:border-gallery/10 bg-gallery/80 dark:bg-ink/40 backdrop-blur-sm"
      >
        {options.map(({ id, label, icon: Icon }) => {
          const active = mode === id
          return (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onChange(id)}
              className={`relative flex flex-1 sm:flex-none items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
                active ? 'text-white' : 'text-ink/55 dark:text-gallery/55 hover:text-ink dark:hover:text-gallery'
              }`}
            >
              {active && (
                <motion.span
                  layoutId="artist-view-toggle"
                  className="absolute inset-0 rounded-full bg-brand shadow-sm shadow-brand/25"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <Icon size={15} strokeWidth={1.5} />
                <span className="whitespace-nowrap">{label}</span>
              </span>
            </button>
          )
        })}
      </div>
    </LayoutGroup>
  )
}

function ExpoSelector({
  exhibitions,
  active,
  onChange,
  countLabel,
}: {
  exhibitions: ReturnType<typeof getExhibitionSummaries>
  active: ExhibitionRef
  onChange: (id: ExhibitionRef) => void
  countLabel: (n: number) => string
}) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 snap-x snap-mandatory scrollbar-hide">
      {exhibitions.map((expo) => {
        const selected = active === expo.id
        return (
          <button
            key={expo.id}
            type="button"
            onClick={() => onChange(expo.id)}
            className={`group snap-start shrink-0 w-[min(82vw,240px)] rounded-xl overflow-hidden border text-left transition-all ${
              selected
                ? 'border-brand ring-2 ring-brand/20'
                : 'border-ink/10 dark:border-gallery/10 hover:border-brand/30'
            }`}
          >
            <div className="relative h-28">
              <Image src={expo.cover} alt={expo.title} fill className="object-cover md:grayscale group-hover:grayscale-0 transition-all duration-500" sizes="240px" />
              <div className={`absolute inset-0 transition-colors ${selected ? 'bg-brand/20' : 'bg-ink/25 group-hover:bg-ink/10'}`} />
            </div>
            <div className={`px-4 py-3 ${selected ? 'bg-brand/5' : 'bg-gallery/50 dark:bg-ink/30'}`}>
              <p className="text-[10px] font-semibold tracking-widest uppercase text-brand mb-1">{expo.period}</p>
              <p className="text-sm font-medium text-ink dark:text-gallery leading-snug">{expo.title}</p>
              <p className="text-xs text-ink/45 dark:text-gallery/45 mt-1">{countLabel(expo.artistCount)}</p>
            </div>
          </button>
        )
      })}
    </div>
  )
}

export default function ArtistesList() {
  const [viewMode, setViewMode] = useState<ViewMode>('all')
  const [activeExpo, setActiveExpo] = useState<ExhibitionRef>('la-genese')
  const [selected, setSelected] = useState<LocalizedArtiste | null>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true })
  const { lang } = useLang()
  const t = useTranslations(lang)
  const countFn = t('artistes.count') as unknown as (n: number) => string
  const exhibitions = useMemo(() => getExhibitionSummaries(lang), [lang])

  const artists = useMemo(() => {
    const list = viewMode === 'all' ? getArtists() : getArtistsForExhibition(activeExpo)
    return list.map((a) => localizeArtiste(a, lang))
  }, [viewMode, activeExpo, lang])

  return (
    <main className="pt-2 pb-24 md:pb-16 px-5 sm:px-6 max-w-7xl mx-auto bg-gallery dark:bg-ink">
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: 12 }}
        animate={headerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="mb-6 md:mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
      >
        <div>
          <p className="text-sm text-ink/50 dark:text-gallery/50 mb-1">{countFn(getArtists().length)}</p>
          <p className="text-sm text-ink/55 dark:text-gallery/55 leading-relaxed max-w-xl">{t('artistes.intro')}</p>
        </div>
        <ViewToggle mode={viewMode} onChange={setViewMode} t={t} />
      </motion.div>

      <AnimatePresence mode="wait">
        {viewMode === 'expo' && (
          <motion.div
            key="expo-selector"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10 overflow-hidden"
          >
            <ExpoSelector exhibitions={exhibitions} active={activeExpo} onChange={setActiveExpo} countLabel={countFn} />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
        <AnimatePresence mode="popLayout">
          {artists.map((artiste, i) => (
            <ArtisteCard key={`${viewMode}-${activeExpo}-${artiste.id}`} artiste={artiste} index={i} onSelect={setSelected} t={t} />
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {selected && <ArtisteModal artiste={selected} onClose={() => setSelected(null)} t={t} />}
      </AnimatePresence>
    </main>
  )
}
