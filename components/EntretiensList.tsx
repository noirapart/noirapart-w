'use client'
import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'motion/react'
import Image from 'next/image'
import { X, Clock, ArrowRight } from 'lucide-react'
import type { Entretien } from '@/app/entretiens/page'
import { useLang } from '@/contexts/LanguageContext'
import { useTranslations, type TKey } from '@/lib/translations'
import { useModalA11y } from '@/components/useModalA11y'

function EntretienCard({
  entretien,
  index,
  onSelect,
  featured,
  t,
}: {
  entretien: Entretien
  index: number
  onSelect: (e: Entretien) => void
  featured?: boolean
  t: (k: TKey) => string
}) {
  const ref = useRef<HTMLButtonElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  if (featured) {
    return (
      <motion.button
        type="button"
        ref={ref}
        initial={{ opacity: 0, y: 32 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="col-span-1 md:col-span-2 group cursor-pointer text-left"
        onClick={() => onSelect(entretien)}
        aria-haspopup="dialog"
        aria-label={`${t('entretien.read')} : ${entretien.title}`}
      >
        <div className="grid grid-cols-1 md:grid-cols-5 gap-0 rounded-2xl overflow-hidden border border-ink/10 dark:border-gallery/10 bg-gallery dark:bg-neutral-900/50 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors">
          <div className="relative md:col-span-2 aspect-[4/3] md:aspect-auto min-h-[260px]">
            <Image
              src={entretien.image}
              alt={entretien.subject}
              fill
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              sizes="(max-width: 768px) 100vw, 40vw"
              priority
            />
          </div>
          <div className="md:col-span-3 flex flex-col justify-between p-6 md:p-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[10px] font-semibold tracking-widest uppercase text-ink/35 dark:text-gallery/35">
                  {t('entretien.featured')}
                </span>
                <span className="text-[10px] text-neutral-300 dark:text-neutral-600">·</span>
                <span className="text-[10px] text-ink/35 dark:text-gallery/35">{entretien.date}</span>
              </div>
              <h2 className="text-2xl font-medium text-ink dark:text-white mb-3 leading-snug">
                {entretien.title}
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed line-clamp-3">
                {entretien.excerpt}
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-ink dark:text-gallery">{entretien.subject}</p>
                <p className="text-xs text-ink/50 dark:text-gallery/50">{entretien.role}</p>
              </div>
              <div className="flex items-center gap-4 text-xs text-ink/35 dark:text-gallery/35">
                <span className="flex items-center gap-1"><Clock size={11} strokeWidth={1.5} />{entretien.readTime}</span>
                <span className="flex items-center gap-1 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors font-medium text-neutral-600 dark:text-neutral-300">
                  {t('entretien.read')}
                  <ArrowRight size={12} strokeWidth={1.5} className="group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
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
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: (index % 2) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group cursor-pointer rounded-2xl border border-ink/10 dark:border-gallery/10 bg-gallery dark:bg-neutral-900/50 overflow-hidden hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors flex flex-col text-left"
      onClick={() => onSelect(entretien)}
      aria-haspopup="dialog"
      aria-label={`${t('entretien.read')} : ${entretien.title}`}
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={entretien.image}
          alt={entretien.subject}
          fill
          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3 text-[10px] text-ink/35 dark:text-gallery/35">
          <span className="font-semibold tracking-widest uppercase">{t('entretien.label')}</span>
          <span>·</span>
          <span>{entretien.date}</span>
        </div>
        <h3 className="text-base font-medium text-ink dark:text-white mb-2 leading-snug">
          {entretien.title}
        </h3>
        <p className="text-sm text-ink/50 dark:text-gallery/50 line-clamp-2 leading-relaxed flex-1">
          {entretien.excerpt}
        </p>
        <div className="mt-5 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-neutral-800 dark:text-neutral-200">{entretien.subject}</p>
            <p className="text-[11px] text-ink/35 dark:text-gallery/35">{entretien.role}</p>
          </div>
          <span className="flex items-center gap-1 text-xs text-ink/35 dark:text-gallery/35">
            <Clock size={11} strokeWidth={1.5} />{entretien.readTime}
          </span>
        </div>
      </div>
    </motion.button>
  )
}

function EntretienModal({ entretien, onClose, t }: { entretien: Entretien; onClose: () => void; t: (k: TKey) => string }) {
  const dialogRef = useModalA11y<HTMLDivElement>(true, onClose)
  const titleId = `entretien-modal-title-${entretien.id}`

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
        className="relative bg-gallery dark:bg-ink w-full sm:max-w-2xl max-h-[90dvh] rounded-t-3xl sm:rounded-2xl overflow-y-auto border border-ink/10 dark:border-gallery/10 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-52 sm:h-72">
          <Image src={entretien.image} alt={entretien.subject} fill className="object-cover" sizes="700px" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <button
            onClick={onClose}
            aria-label={t('ui.close')}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-colors"
          >
            <X size={18} strokeWidth={1.5} />
          </button>
          <div className="absolute bottom-5 left-6">
            <p className="text-white font-medium">{entretien.subject}</p>
            <p className="text-white/60 text-sm">{entretien.role}</p>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-4 text-xs text-ink/35 dark:text-gallery/35">
            <span>{entretien.date}</span>
            <span>·</span>
            <span className="flex items-center gap-1"><Clock size={11} strokeWidth={1.5} />{entretien.readTime}</span>
          </div>

          <h2 id={titleId} className="text-2xl font-medium text-ink dark:text-white mb-6 leading-snug">
            {entretien.title}
          </h2>

          <p className="text-base text-neutral-600 dark:text-neutral-300 leading-relaxed italic mb-6 border-l-2 border-neutral-200 dark:border-neutral-700 pl-4">
            {entretien.excerpt}
          </p>

          <div className="prose prose-sm dark:prose-invert max-w-none">
            {entretien.content.split('\n\n').map((para, i) => (
              <p key={i} className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                {para}
              </p>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mt-6 pt-5 border-t border-neutral-100 dark:border-neutral-800">
            {entretien.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 rounded-full border border-ink/10 dark:border-gallery/10 text-xs text-ink/50 dark:text-gallery/50">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function EntretiensList({ entretiens }: { entretiens: Entretien[] }) {
  const [selected, setSelected] = useState<Entretien | null>(null)
  const [featured, ...rest] = entretiens
  const { lang } = useLang()
  const t = useTranslations(lang)

  return (
    <main className="py-12 md:py-16 px-5 sm:px-6 max-w-7xl mx-auto pb-24 md:pb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <EntretienCard entretien={featured} index={0} onSelect={setSelected} featured t={t} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rest.map((e, i) => (
          <EntretienCard key={e.id} entretien={e} index={i + 1} onSelect={setSelected} t={t} />
        ))}
      </div>
      <AnimatePresence>
        {selected && <EntretienModal entretien={selected} onClose={() => setSelected(null)} t={t} />}
      </AnimatePresence>
    </main>
  )
}
