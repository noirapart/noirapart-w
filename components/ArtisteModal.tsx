'use client'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import { X, MapPin, ArrowRight } from 'lucide-react'
import { useModalA11y } from '@/components/useModalA11y'
import type { LocalizedArtiste } from '@/lib/artists'
import type { TKey } from '@/lib/translations'

type ArtisteModalProps = {
  artiste: LocalizedArtiste
  onClose: () => void
  t: (k: TKey) => string
}

export default function ArtisteModal({ artiste, onClose, t }: ArtisteModalProps) {
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
        <div className="relative h-64 sm:h-80">
          {artiste.image ? (
            <Image src={artiste.image} alt={artiste.name} fill className="object-cover object-top" sizes="600px" />
          ) : (
            <div
              role="img"
              aria-label={`${artiste.name} — ${t('artistes.noPhoto')}`}
              className="absolute inset-0 flex flex-col items-center justify-center bg-ink-soft text-gallery"
            >
              <span className="mb-5 h-px w-12 bg-brand" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gallery/55">
                {t('artistes.noPhoto')}
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <button
            type="button"
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

        <div className="p-6 sm:p-8">
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

          {artiste.exhibitionLabels.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xs font-semibold tracking-widest uppercase text-ink/35 dark:text-gallery/35 mb-3">{t('artistes.modal.exhibitions')}</h3>
              <div className="flex flex-wrap gap-2">
                {artiste.exhibitionLabels.map((label) => (
                  <span key={label} className="px-3 py-1.5 rounded-full border border-brand/25 bg-brand/5 text-xs font-medium text-brand">
                    {label}
                  </span>
                ))}
              </div>
            </div>
          )}

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
