'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useLang } from '@/contexts/LanguageContext'
import { useTranslations } from '@/lib/translations'

export default function SideNav() {
  const { lang } = useLang()
  const t = useTranslations(lang)

  const sections = [
    { id: 'hero', label: t('sidenav.hero') },
    { id: 'plateforme', label: t('sidenav.plateforme') },
    { id: 'manifeste', label: t('sidenav.manifeste') },
    { id: 'films', label: t('sidenav.films') },
    { id: 'contact', label: t('sidenav.contact') },
  ]

  const [active, setActive] = useState('hero')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Show after brief delay
    const t = setTimeout(() => setVisible(true), 1200)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id)
        },
        { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 12 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed right-6 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col items-center gap-4"
          role="navigation"
          aria-label={lang === 'en' ? 'Section navigation' : 'Navigation par section'}
        >
          {sections.map(({ id, label }) => {
            const isActive = active === id
            return (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                aria-label={lang === 'en' ? `Go to ${label}` : `Aller à ${label}`}
                className="group relative flex items-center justify-end gap-3"
              >
                {/* Tooltip */}
                <span className="absolute right-full mr-3 text-[10px] font-medium tracking-widest uppercase text-ink/40 dark:text-gallery/40 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {label}
                </span>

                {/* Dot */}
                <motion.span
                  animate={{
                    width: isActive ? 20 : 6,
                  }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className={`block h-1.5 rounded-full dark:opacity-80 ${isActive ? 'bg-brand' : 'bg-ink/20 dark:bg-gallery/25'}`}
                />
              </button>
            )
          })}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
