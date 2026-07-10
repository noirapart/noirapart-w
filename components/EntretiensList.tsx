'use client'
import { motion } from 'motion/react'
import { Mic2, ArrowRight } from 'lucide-react'
import { useLang } from '@/contexts/LanguageContext'
import { useTranslations } from '@/lib/translations'

export default function EntretiensList() {
  const { lang } = useLang()
  const t = useTranslations(lang)

  return (
    <main className="py-16 md:py-24 px-5 sm:px-6 max-w-3xl mx-auto pb-24 md:pb-16 text-center">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-2xl border border-ink/10 dark:border-gallery/10 bg-gallery/50 dark:bg-ink/40 p-10 md:p-16"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand/10 text-brand mb-8">
          <Mic2 size={28} strokeWidth={1.5} />
        </div>
        <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-brand mb-4">
          {t('entretien.label')}
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-normal text-ink dark:text-gallery mb-5">
          {t('entretien.comingSoon')}
        </h2>
        <p className="text-base text-ink/55 dark:text-gallery/55 leading-relaxed max-w-lg mx-auto mb-10">
          {t('entretien.comingSoonBody')}
        </p>
        <a
          href="/#contact"
          className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand hover:bg-brand-deep text-white text-sm font-medium transition-colors"
        >
          {t('entretien.notify')}
          <ArrowRight size={14} strokeWidth={1.5} className="group-hover:translate-x-0.5 transition-transform" />
        </a>
      </motion.div>
    </main>
  )
}
