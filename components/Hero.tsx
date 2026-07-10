'use client'
import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { useLang } from '@/contexts/LanguageContext'
import { useTranslations } from '@/lib/translations'

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const shouldReduceMotion = useReducedMotion()
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '36%'])
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0])
  const { lang } = useLang()
  const t = useTranslations(lang)
  const titleLines = t('hero.title').split('\n')
  const titleClassName = `font-display text-4xl sm:text-5xl ${
    lang === 'fr' ? 'md:text-6xl lg:text-7xl max-w-6xl' : 'md:text-7xl lg:text-8xl max-w-4xl'
  } leading-[0.95] text-white font-normal mb-6`

  return (
    <header ref={ref} id="hero" className="relative w-full min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-ink">
      <motion.div style={shouldReduceMotion ? undefined : { y: imageY }} className="absolute inset-0 z-0 scale-110">
        <Image src="/hero-bg.jpg" alt="Art contemporain africain" fill className="object-cover object-center" priority sizes="100vw" />
        <div className="absolute inset-0 bg-ink/65" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/30 to-ink/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/40 via-transparent to-ink/40" />
      </motion.div>

      <motion.div style={shouldReduceMotion ? undefined : { y: textY, opacity }} className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/20 bg-white/8 backdrop-blur-md text-xs font-medium text-white/80"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
          {t('hero.badge')}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className={titleClassName}
        >
          {titleLines.map((line) => (
            <span key={line} className="block md:whitespace-nowrap">
              {line}
            </span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-base md:text-lg text-white/65 font-light max-w-xl mb-10 leading-relaxed"
        >
          {t('hero.subtitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto"
        >
          <a href="#plateforme" className="group px-7 py-3.5 bg-brand hover:bg-brand-deep text-white text-sm font-medium rounded-full transition-colors duration-200 text-center flex items-center justify-center gap-2 shadow-lg shadow-brand/30">
            {t('hero.cta1')}
            <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
          </a>
          <a href="#contact" className="px-7 py-3.5 bg-white/10 border border-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-full hover:bg-white/18 transition-colors duration-200 text-center">
            {t('hero.cta2')}
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-[9px] font-semibold tracking-[0.25em] text-white/35 uppercase">{t('hero.scroll')}</span>
        <motion.div
          animate={shouldReduceMotion ? undefined : { y: [0, 7, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-white/35 to-transparent"
        />
      </motion.div>
    </header>
  )
}
