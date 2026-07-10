'use client'
import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { useLang } from '@/contexts/LanguageContext'
import { useTranslations } from '@/lib/translations'

export default function Manifesto() {
  const { lang } = useLang()
  const t = useTranslations(lang)

  const upcomingProjects = [
    { id: 'proj-1', type: t('upcoming.p1.type'), title: t('upcoming.p1.title'), description: t('upcoming.p1.description'), date: t('upcoming.p1.date') },
    { id: 'proj-2', type: t('upcoming.p2.type'), title: t('upcoming.p2.title'), description: t('upcoming.p2.description'), date: t('upcoming.p2.date') },
  ]

  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const projRef = useRef<HTMLDivElement>(null)
  const projInView = useInView(projRef, { once: true, margin: '-60px' })

  return (
    <section id="manifeste" className="bg-ink text-gallery py-16 md:py-24 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          className="max-w-3xl"
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-gallery/40 text-xs font-semibold tracking-widest uppercase block mb-6">
            {t('manifesto.label')}
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-5xl font-normal mb-6 md:mb-8 leading-tight text-gallery">
            {t('manifesto.title')}
          </h2>
          <p className="text-gallery/55 text-base md:text-lg leading-relaxed mb-10 font-light max-w-2xl">
            {t('manifesto.body')}
          </p>
          <a
            href="#contact"
            className="group inline-flex items-center gap-2.5 text-gallery/60 hover:text-gallery text-sm font-medium border-b border-gallery/20 hover:border-gallery/60 pb-1 transition-all"
          >
            {t('manifesto.cta')}
            <ArrowRight size={14} strokeWidth={1.5} className="group-hover:translate-x-0.5 transition-transform" />
          </a>
        </motion.div>

        <div ref={projRef} className="mt-14 md:mt-20 pt-12 md:pt-16 border-t border-gallery/10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={projInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
          >
            <div>
              <span className="text-gallery/35 text-xs font-semibold tracking-widest uppercase block mb-3">
                {t('upcoming.label')}
              </span>
              <h3 className="font-display text-2xl md:text-3xl font-normal text-gallery">
                {t('upcoming.title')}
              </h3>
            </div>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 text-sm font-medium text-gallery/40 hover:text-gallery transition-colors shrink-0"
            >
              {t('upcoming.cta')}
              <ArrowRight size={14} strokeWidth={1.5} className="group-hover:translate-x-0.5 transition-transform" />
            </a>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {upcomingProjects.map((proj, i) => (
              <motion.div
                key={proj.id}
                initial={{ opacity: 0, y: 28 }}
                animate={projInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="group relative flex flex-col p-5 sm:p-7 rounded-2xl border border-gallery/8 bg-ink-soft/80 hover:border-gallery/15 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[10px] font-semibold tracking-widest text-brand uppercase">
                    {proj.type}
                  </span>
                  <span className="text-xs text-gallery/30 font-medium">{proj.date}</span>
                </div>
                <h4 className="text-lg font-medium text-gallery mb-3">{proj.title}</h4>
                <p className="text-sm text-gallery/45 leading-relaxed font-light flex-1">{proj.description}</p>
                <div className="mt-6 pt-5 border-t border-gallery/8 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs text-gallery/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand/50" />
                    {t('upcoming.soon')}
                  </span>
                  <a
                    href="#contact"
                    className="text-xs font-medium text-gallery/40 hover:text-gallery transition-colors flex items-center gap-1 group/link"
                  >
                    {t('upcoming.notify')}
                    <ArrowRight size={12} strokeWidth={1.5} className="group-hover/link:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
