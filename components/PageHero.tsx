'use client'
import { motion } from 'motion/react'
import Link from 'next/link'
import { useLang } from '@/contexts/LanguageContext'
import { useTranslations } from '@/lib/translations'

type PageKey = 'expositions' | 'entretiens' | 'artistes'

const keyMap: Record<PageKey, { label: string; title: string; desc: string }> = {
  expositions: { label: 'page.expositions.label', title: 'page.expositions.title', desc: 'page.expositions.desc' },
  entretiens:  { label: 'page.entretiens.label',  title: 'page.entretiens.title',  desc: 'page.entretiens.desc'  },
  artistes:    { label: 'page.artistes.label',    title: 'page.artistes.title',    desc: 'page.artistes.desc'    },
}

export default function PageHero({ pageKey, compact }: { pageKey: PageKey; compact?: boolean }) {
  const { lang } = useLang()
  const t = useTranslations(lang)
  const keys = keyMap[pageKey]

  return (
    <section className={`bg-ink pt-32 px-6 ${compact ? 'pb-4' : 'pb-20'}`}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-2 mb-8 text-xs font-semibold tracking-widest text-gallery/30 uppercase">
            <Link href="/" className="hover:text-gallery/60 transition-colors">NOIR A PART</Link>
            <span className="text-brand">/</span>
            <span className="text-gallery/50">{t(keys.label as Parameters<typeof t>[0])}</span>
          </div>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 40 }}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="h-0.5 bg-brand rounded-full mb-8"
          />
          <h1 className={`font-display text-4xl sm:text-5xl md:text-7xl font-normal text-gallery max-w-3xl leading-none ${compact ? 'mb-3' : 'mb-6'}`}>
            {t(keys.title as Parameters<typeof t>[0])}
          </h1>
          <p className={`text-base md:text-lg text-gallery/45 max-w-xl leading-relaxed font-light ${compact ? 'mb-0' : ''}`}>
            {t(keys.desc as Parameters<typeof t>[0])}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
