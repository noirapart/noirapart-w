'use client'
import { useState } from 'react'
import { motion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import { Instagram, Mail, ArrowRight } from 'lucide-react'
import { useLang } from '@/contexts/LanguageContext'
import { useTranslations } from '@/lib/translations'
import { CONTACT_EMAIL } from '@/lib/contact'

export default function Footer() {
  const { lang } = useLang()
  const t = useTranslations(lang)

  const platform = [
    { label: t('nav.expositions'), href: '/expositions' },
    { label: t('nav.entretiens'), href: '/entretiens' },
    { label: t('nav.artistes'), href: '/artistes' },
  ]

  const info = [
    { label: t('footer.about'), href: '/#contact' },
    { label: t('nav.contact'), href: '/#contact' },
    { label: t('footer.press'), href: '/#contact' },
    { label: t('footer.upcoming'), href: '/#manifeste' },
  ]

  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    const subject = encodeURIComponent('NOIR A PART newsletter')
    const body = encodeURIComponent(`Please add this address to the NOIR A PART newsletter:\n\n${email}`)
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
    setSubscribed(true)
    setEmail('')
  }

  return (
    <footer className="bg-blush dark:bg-ink/80 pt-16 md:pt-20 pb-32 md:pb-10 border-t border-ink/8 dark:border-gallery/8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-12 md:mb-16">
          {/* Brand + Newsletter */}
          <div className="md:col-span-4">
            <Link href="/">
              <Image
                src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/062070a3-b4f9-4496-88cf-dfad7efa126f_320w.png"
                alt="NOIR A PART"
                width={176}
                height={72}
                sizes="176px"
                className="h-16 md:h-[72px] w-auto mb-6 mix-blend-multiply dark:invert dark:mix-blend-screen"
              />
            </Link>
            <p className="text-ink/50 dark:text-gallery/50 text-sm mb-6 max-w-xs leading-relaxed">
              {t('footer.newsletter.copy')}
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
              {subscribed ? (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-brand font-medium py-2.5"
                >
                  {t('footer.newsletter.success')}
                </motion.p>
              ) : (
                <>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('footer.newsletter.placeholder')}
                    required
                    className="w-full bg-gallery dark:bg-ink border border-ink/12 dark:border-gallery/12 rounded-lg text-sm px-4 py-2.5 outline-none focus:border-brand transition-colors placeholder:text-ink/30 dark:placeholder:text-gallery/30 text-ink dark:text-gallery"
                  />
                  <button
                    type="submit"
                    className="bg-brand hover:bg-brand-deep text-white px-4 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 shrink-0"
                  >
                    <ArrowRight size={16} strokeWidth={1.5} />
                  </button>
                </>
              )}
            </form>
          </div>

          {/* Plateforme */}
          <div className="md:col-span-2 md:col-start-7">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-ink/35 dark:text-gallery/35 mb-6">
              {t('footer.platform')}
            </h4>
            <ul className="space-y-3 text-sm text-ink/55 dark:text-gallery/55">
              {platform.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="hover:text-ink dark:hover:text-gallery transition-colors hover:text-brand dark:hover:text-brand">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Informations */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-ink/35 dark:text-gallery/35 mb-6">
              {t('footer.info')}
            </h4>
            <ul className="space-y-3 text-sm text-ink/55 dark:text-gallery/55">
              {info.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="hover:text-brand dark:hover:text-brand transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Réseaux */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-ink/35 dark:text-gallery/35 mb-6">
              {t('footer.social')}
            </h4>
            <ul className="space-y-3 text-sm text-ink/55 dark:text-gallery/55">
              <li>
                <a href="#" className="hover:text-brand transition-colors flex items-center gap-2">
                  <Instagram size={15} strokeWidth={1.5} />Instagram
                </a>
              </li>
              <li>
                <a href="/#contact" className="hover:text-brand transition-colors flex items-center gap-2">
                  <Mail size={15} strokeWidth={1.5} />Newsletter
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-ink/30 dark:text-gallery/30 pt-8 border-t border-ink/8 dark:border-gallery/8">
          <p>{t('footer.rights')}</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-ink dark:hover:text-gallery transition-colors">{t('footer.legal')}</a>
            <a href="#" className="hover:text-ink dark:hover:text-gallery transition-colors">{t('footer.privacy')}</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
