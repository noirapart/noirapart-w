'use client'
import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'motion/react'
import Image from 'next/image'
import { X, ArrowRight, MapPin, Calendar } from 'lucide-react'
import type { Exposition } from '@/app/expositions/page'
import { useLang } from '@/contexts/LanguageContext'
import { useTranslations, type TKey } from '@/lib/translations'
import { useModalA11y } from '@/components/useModalA11y'

const STATUS_COLORS: Record<Exposition['status'], string> = {
  'En cours': 'bg-green-500/15 text-green-400 border-green-500/20',
  'À venir': 'bg-blue-500/15 text-blue-400 border-blue-500/20',
  'Passé': 'bg-ink/10 text-neutral-400 border-neutral-500/20',
}

const STATUS_KEYS: Record<Exposition['status'], TKey> = {
  'En cours': 'expo.status.current',
  'À venir': 'expo.status.upcoming',
  'Passé': 'expo.status.past',
}

function ExpoCard({ expo, index, onSelect, t }: { expo: Exposition; index: number; onSelect: (e: Exposition) => void; t: (k: TKey) => string }) {
  const ref = useRef<HTMLButtonElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const isFeatured = index === 0

  if (isFeatured) {
    return (
      <motion.button
        type="button"
        ref={ref}
        initial={{ opacity: 0, y: 32 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="col-span-1 md:col-span-2 lg:col-span-3 group cursor-pointer text-left"
        onClick={() => onSelect(expo)}
        aria-haspopup="dialog"
        aria-label={`${t('expo.seeExpo')} : ${expo.title}`}
      >
        <div className="relative h-[480px] rounded-2xl overflow-hidden border border-ink/10 dark:border-gallery/10">
          <Image
            src={expo.coverImage}
            alt={expo.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className={`text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full border ${STATUS_COLORS[expo.status]}`}>
                  {t(STATUS_KEYS[expo.status])}
                </span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-normal text-white mb-1">{expo.title}</h2>
              <p className="text-neutral-300 text-sm font-light">{expo.subtitle}</p>
            </div>
            <div className="flex items-center gap-2 text-white/80 text-sm font-medium shrink-0 group-hover:text-white transition-colors">
              {t('expo.seeExpo')}
              <ArrowRight size={16} strokeWidth={1.5} className="group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </div>
      </motion.button>
    )
  }

  return (
    <motion.button
      type="button"
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: (index - 1) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group cursor-pointer flex flex-col text-left"
      onClick={() => onSelect(expo)}
      aria-haspopup="dialog"
      aria-label={`${t('expo.seeExpo')} : ${expo.title}`}
    >
      <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-ink/10 dark:border-gallery/10 mb-5">
        <Image
          src={expo.coverImage}
          alt={expo.title}
          fill
          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-ink/20 group-hover:bg-ink/0 transition-colors duration-500" />
        <div className="absolute top-4 left-4">
          <span className={`text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full border ${STATUS_COLORS[expo.status]}`}>
            {t(STATUS_KEYS[expo.status])}
          </span>
        </div>
      </div>
      <h3 className="text-lg font-medium text-ink dark:text-white mb-1 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">
        {expo.title}
      </h3>
      <p className="text-sm text-ink/50 dark:text-gallery/50 mb-3 line-clamp-2">{expo.subtitle}</p>
      <div className="flex items-center gap-4 text-xs text-neutral-400 dark:text-neutral-600 mt-auto">
        <span className="flex items-center gap-1"><Calendar size={11} strokeWidth={1.5} />{expo.period}</span>
        <span className="flex items-center gap-1"><MapPin size={11} strokeWidth={1.5} />{expo.location}</span>
      </div>
    </motion.button>
  )
}

function ExpoModal({ expo, onClose, t }: { expo: Exposition; onClose: () => void; t: (k: TKey) => string }) {
  const dialogRef = useModalA11y<HTMLDivElement>(true, onClose)
  const titleId = `expo-modal-title-${expo.id}`

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 60, opacity: 0 }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="relative bg-gallery dark:bg-ink w-full sm:max-w-3xl max-h-[90dvh] rounded-t-3xl sm:rounded-2xl overflow-y-auto border border-ink/10 dark:border-gallery/10 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cover */}
        <div className="relative h-64 sm:h-80 rounded-t-3xl sm:rounded-t-2xl overflow-hidden">
          <Image src={expo.coverImage} alt={expo.title} fill className="object-cover" sizes="800px" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <button
            onClick={onClose}
            aria-label={t('ui.close')}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-colors"
          >
            <X size={18} strokeWidth={1.5} />
          </button>
          <div className="absolute bottom-5 left-6 right-6">
            <span className={`text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full border ${STATUS_COLORS[expo.status]} mb-2 inline-block`}>
              {t(STATUS_KEYS[expo.status])}
            </span>
            <h2 id={titleId} className="text-2xl sm:text-3xl font-medium text-white">{expo.title}</h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-8">
          {/* Meta */}
          <div className="flex flex-wrap gap-4 text-sm text-ink/50 dark:text-gallery/50 mb-6 pb-6 border-b border-neutral-100 dark:border-neutral-800">
            <span className="flex items-center gap-1.5"><Calendar size={13} strokeWidth={1.5} />{expo.period}</span>
            <span className="flex items-center gap-1.5"><MapPin size={13} strokeWidth={1.5} />{expo.location}</span>
          </div>

          {/* Theme */}
          <div className="mb-6">
            <h3 className="text-xs font-semibold tracking-widest uppercase text-ink/35 dark:text-gallery/35 mb-3">{t('expo.modal.theme')}</h3>
            <p className="text-base text-neutral-700 dark:text-neutral-300 leading-relaxed italic border-l-2 border-neutral-200 dark:border-neutral-700 pl-4">
              {expo.theme}
            </p>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-xs font-semibold tracking-widest uppercase text-ink/35 dark:text-gallery/35 mb-3">{t('expo.modal.about')}</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">{expo.description}</p>
          </div>

          {/* Artistes */}
          <div className="mb-6">
            <h3 className="text-xs font-semibold tracking-widest uppercase text-ink/35 dark:text-gallery/35 mb-3">{t('expo.modal.artists')}</h3>
            <div className="flex flex-wrap gap-2">
              {expo.artists.map((a) => (
                <span key={a} className="px-3 py-1.5 rounded-full border border-ink/10 dark:border-gallery/10 text-sm text-neutral-700 dark:text-neutral-300 bg-gallery dark:bg-neutral-900">
                  {a}
                </span>
              ))}
            </div>
          </div>

          {/* Photos */}
          <div className="mb-8">
            <h3 className="text-xs font-semibold tracking-widest uppercase text-ink/35 dark:text-gallery/35 mb-3">{t('expo.modal.photos')}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {expo.images.map((img, i) => (
                <div key={i} className="relative aspect-square rounded-lg overflow-hidden bg-gallery/60 dark:bg-ink/60">
                  <Image src={img} alt={`${expo.title} ${i + 1}`} fill className="object-cover" sizes="200px" />
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-4 border-t border-neutral-100 dark:border-neutral-800">
            {expo.tags.map((tag) => (
              <span key={tag} className="text-xs text-ink/35 dark:text-gallery/35">#{tag}</span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function ExpositionsList({ expositions }: { expositions: Exposition[] }) {
  const [selected, setSelected] = useState<Exposition | null>(null)
  const { lang } = useLang()
  const t = useTranslations(lang)

  return (
    <main className="py-12 md:py-16 px-5 sm:px-6 max-w-7xl mx-auto pb-24 md:pb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {expositions.map((expo, i) => (
          <ExpoCard key={expo.id} expo={expo} index={i} onSelect={setSelected} t={t} />
        ))}
      </div>

      <AnimatePresence>
        {selected && <ExpoModal expo={selected} onClose={() => setSelected(null)} t={t} />}
      </AnimatePresence>
    </main>
  )
}
