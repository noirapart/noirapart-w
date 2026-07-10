'use client'
import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { Eye, Ticket, Users, MessageCircle } from 'lucide-react'
import { useLang } from '@/contexts/LanguageContext'
import { useTranslations } from '@/lib/translations'

export default function ValueProps() {
  const { lang } = useLang()
  const t = useTranslations(lang)

  const props = [
    { Icon: Eye, title: t('values.discover.title'), description: t('values.discover.desc') },
    { Icon: Ticket, title: t('values.participate.title'), description: t('values.participate.desc') },
    { Icon: Users, title: t('values.meet.title'), description: t('values.meet.desc') },
    { Icon: MessageCircle, title: t('values.exchange.title'), description: t('values.exchange.desc') },
  ]

  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="py-14 md:py-20 bg-gallery dark:bg-ink-card border-b border-ink/8 dark:border-gallery/8">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center md:text-left">
          {props.map(({ Icon, title, description }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center md:items-start"
            >
              <div className="w-12 h-12 rounded-full bg-brand/8 dark:bg-brand/15 flex items-center justify-center mb-6 text-brand">
                <Icon size={22} strokeWidth={1.5} />
              </div>
              <h4 className="text-base font-medium text-ink dark:text-gallery mb-2">{title}</h4>
              <p className="text-sm text-ink/50 dark:text-gallery/50 leading-relaxed">{description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
