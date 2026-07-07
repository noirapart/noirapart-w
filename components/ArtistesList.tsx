'use client'
import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'motion/react'
import Image from 'next/image'
import { X, MapPin, ArrowRight } from 'lucide-react'
import type { Artiste } from '@/app/artistes/page'
import Link from 'next/link'
import { useLang } from '@/contexts/LanguageContext'
import { useTranslations, type TKey } from '@/lib/translations'
import { useModalA11y } from '@/components/useModalA11y'

function ArtisteCard({ artiste, index, onSelect, t }: { artiste: Artiste; index: number; onSelect: (a: Artiste) => void; t: (k: TKey) => string }) {
  const ref = useRef<HTMLButtonElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.button
      type="button"
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group cursor-pointer text-left"
      onClick={() => onSelect(artiste)}
      aria-haspopup="dialog"
      aria-label={`${t('artistes.viewProfile')} : ${artiste.name}`}
    >
      {/* Portrait */}
      <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-200 dark:bg-neutral-800 mb-5">
        <Image
          src={artiste.image}
          alt={artiste.name}
          fill
          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-ink/10 group-hover:bg-ink/0 transition-colors duration-500" />
        {/* Hover overlay with name */}
        <div className="absolute inset-x-0 bottom-0 p-5 sm:translate-y-2 sm:opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <div className="bg-white/95 dark:bg-ink/95 backdrop-blur-sm rounded-xl p-4 flex items-center justify-between border border-neutral-200/50 dark:border-neutral-700/50">
            <span className="text-sm font-medium text-ink dark:text-gallery">{t('artistes.viewProfile')}</span>
            <ArrowRight size={14} strokeWidth={1.5} className="text-ink/50 dark:text-gallery/50" />
          </div>
        </div>
      </div>

      {/* Info */}
      <div>
        <h3 className="text-base font-medium text-ink dark:text-white mb-0.5">
          {artiste.name}
        </h3>
        <p className="text-sm text-ink/50 dark:text-gallery/50 mb-1">{artiste.discipline}</p>
        <p className="text-xs text-neutral-400 dark:text-neutral-600 flex items-center gap-1">
          <MapPin size={10} strokeWidth={1.5} />
          {artiste.based}
        </p>
      </div>
    </motion.button>
  )
}

function ArtisteModal({ artiste, onClose, t }: { artiste: Artiste; onClose: () => void; t: (k: TKey) => string }) {
  const dialogRef = useModalA11y<HTMLDivElement>(true, onClose)
  const titleId = `artiste-modal-title-${artiste.id}`

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
        className="relative bg-gallery dark:bg-ink w-full sm:max-w-xl max-h-[90dvh] rounded-t-3xl sm:rounded-2xl overflow-y-auto border border-ink/10 dark:border-gallery/10 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top */}
        <div className="relative h-64 sm:h-80">
          <Image src={artiste.image} alt={artiste.name} fill className="object-cover object-top" sizes="600px" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <button
            onClick={onClose}
            aria-label={t('ui.close')}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-colors"
          >
            <X size={18} strokeWidth={1.5} />
          </button>
          <div className="absolute bottom-5 left-6 right-6">
            <p className="text-xs font-semibold tracking-widest uppercase text-white/50 mb-1">{artiste.discipline}</p>
            <h2 id={titleId} className="text-2xl font-medium text-white">{artiste.name}</h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {/* Location */}
          <div className="flex flex-wrap gap-4 text-sm text-ink/50 dark:text-gallery/50 mb-6 pb-6 border-b border-neutral-100 dark:border-neutral-800">
            <div>
              <span className="text-[10px] font-semibold tracking-widest uppercase text-neutral-400 dark:text-neutral-600 block mb-0.5">{t('artistes.modal.origin')}</span>
              <span className="flex items-center gap-1"><MapPin size={12} strokeWidth={1.5} />{artiste.origin}</span>
            </div>
            <div>
              <span className="text-[10px] font-semibold tracking-widest uppercase text-neutral-400 dark:text-neutral-600 block mb-0.5">{t('artistes.modal.based')}</span>
              <span className="flex items-center gap-1"><MapPin size={12} strokeWidth={1.5} />{artiste.based}</span>
            </div>
          </div>

          {/* Bio */}
          <div className="mb-6">
            <h3 className="text-xs font-semibold tracking-widest uppercase text-ink/35 dark:text-gallery/35 mb-3">{t('artistes.modal.bio')}</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">{artiste.bio}</p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {artiste.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 rounded-full border border-ink/10 dark:border-gallery/10 text-xs text-ink/50 dark:text-gallery/50">
                {tag}
              </span>
            ))}
          </div>

          {/* CTA */}
          <Link
            href="/#contact"
            onClick={onClose}
            className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-full bg-brand hover:bg-brand-deep text-white text-sm font-medium transition-colors"
          >
            {t('artistes.modal.cta')}
            <ArrowRight size={14} strokeWidth={1.5} />
          </Link>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function ArtistesList({ artistes }: { artistes: Artiste[] }) {
  const [selected, setSelected] = useState<Artiste | null>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true })
  const { lang } = useLang()
  const t = useTranslations(lang)
  const countFn = t('artistes.count') as unknown as (n: number) => string

  return (
    <main className="py-12 md:py-16 px-5 sm:px-6 max-w-7xl mx-auto pb-24 md:pb-16">
      {/* Count */}
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0 }}
        animate={headerInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
        className="mb-10 text-sm text-neutral-400 dark:text-neutral-600"
      >
        {countFn(artistes.length)}
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
        {artistes.map((artiste, i) => (
          <ArtisteCard key={artiste.id} artiste={artiste} index={i} onSelect={setSelected} t={t} />
        ))}
      </div>

      <AnimatePresence>
        {selected && <ArtisteModal artiste={selected} onClose={() => setSelected(null)} t={t} />}
      </AnimatePresence>
    </main>
  )
}
