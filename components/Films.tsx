'use client'
import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence, LayoutGroup } from 'motion/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useLang } from '@/contexts/LanguageContext'
import { useTranslations } from '@/lib/translations'
import VideoPlayer from '@/components/VideoPlayer'

export default function Films() {
  const { lang } = useLang()
  const t = useTranslations(lang)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  const films = [
    { id: 'presentation', src: '/videos/presentation.mp4', poster: '/exhibitions/edition-1/cover.jpg', label: t('media.presentation') },
    { id: 'womens-day', src: '/videos/womens-day.mp4', poster: '/exhibitions/womheart/cover.jpg', label: t('media.womensDay') },
    { id: 'edition-recap', src: '/videos/edition-1-recap.mp4', poster: '/exhibitions/edition-1/cover.jpg', label: t('media.editionRecap'), rotate: -90 },
    { id: 'womheart-recap', src: '/videos/womheart-recap.m4v', poster: '/exhibitions/womheart/cover.jpg', label: t('media.womheartRecap') },
  ]

  const [active, setActive] = useState(0)
  const current = films[active]

  const prev = () => setActive((i) => (i === 0 ? films.length - 1 : i - 1))
  const next = () => setActive((i) => (i === films.length - 1 ? 0 : i + 1))

  return (
    <section id="films" className="bg-ink-soft text-gallery py-16 md:py-24 lg:py-28 border-y border-gallery/8">
      <div ref={ref} className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
        >
          <div>
            <span className="text-gallery/40 text-xs font-semibold tracking-widest uppercase block mb-3">
              {t('media.label')}
            </span>
            <h2 className="font-display text-2xl md:text-4xl font-normal text-gallery">
              {t('media.title')}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={prev}
              className="w-10 h-10 rounded-full border border-gallery/15 flex items-center justify-center text-gallery/60 hover:text-gallery hover:border-brand/40 hover:bg-brand/10 transition-colors"
              aria-label="Previous film"
            >
              <ChevronLeft size={18} strokeWidth={1.5} />
            </button>
            <span className="text-xs font-medium text-gallery/40 tabular-nums min-w-[3rem] text-center">
              {active + 1} / {films.length}
            </span>
            <button
              type="button"
              onClick={next}
              className="w-10 h-10 rounded-full border border-gallery/15 flex items-center justify-center text-gallery/60 hover:text-gallery hover:border-brand/40 hover:bg-brand/10 transition-colors"
              aria-label="Next film"
            >
              <ChevronRight size={18} strokeWidth={1.5} />
            </button>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl mx-auto"
          >
            <VideoPlayer
              variant="cinema"
              src={current.src}
              poster={current.poster}
              label={current.label}
              rotate={current.rotate}
            />
          </motion.div>
        </AnimatePresence>

        <LayoutGroup>
          <div className="mt-8 flex gap-2 overflow-x-auto pb-2 no-scrollbar justify-center">
            {films.map((film, i) => (
              <button
                key={film.id}
                type="button"
                onClick={() => setActive(i)}
                className={`relative shrink-0 px-4 py-2.5 rounded-full text-xs font-medium transition-colors ${
                  active === i ? 'text-white' : 'text-gallery/45 hover:text-gallery/70'
                }`}
              >
                {active === i && (
                  <motion.span
                    layoutId="film-pill"
                    className="absolute inset-0 rounded-full bg-brand"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10 whitespace-nowrap">{film.label}</span>
              </button>
            ))}
          </div>
        </LayoutGroup>
      </div>
    </section>
  )
}
