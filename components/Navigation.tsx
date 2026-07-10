'use client'
import { useState, useEffect, useCallback } from 'react'
import { motion } from 'motion/react'
import { Moon, Sun, Home, Images, Mic2, Users, Mail } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLang } from '@/contexts/LanguageContext'
import { useTranslations } from '@/lib/translations'
import Logo from '@/components/Logo'

export default function Navigation() {
  const [isDark, setIsDark] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [currentHash, setCurrentHash] = useState('')
  const pathname = usePathname()
  const isHomepage = pathname === '/'
  const { lang, setLang } = useLang()
  const t = useTranslations(lang)

  const links = [
    { href: '/expositions', label: t('nav.expositions') },
    { href: '/entretiens',  label: t('nav.entretiens') },
    { href: '/artistes',    label: t('nav.artistes') },
  ]

  const mobileNavItems = [
    { href: '/',             label: t('nav.home'),         Icon: Home },
    { href: '/expositions',  label: t('nav.expositions'),  Icon: Images },
    { href: '/entretiens',   label: t('nav.entretiens'),   Icon: Mic2 },
    { href: '/artistes',     label: t('nav.artistes'),     Icon: Users },
    { href: '/#contact',     label: t('nav.contact'),      Icon: Mail },
  ]

  useEffect(() => {
    const saved = localStorage.getItem('theme')
    const dark = saved === 'dark'
    document.documentElement.classList.toggle('dark', dark)
    setIsDark(dark)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const syncHash = () => setCurrentHash(window.location.hash)
    syncHash()
    window.addEventListener('hashchange', syncHash)
    return () => window.removeEventListener('hashchange', syncHash)
  }, [])

  const toggleTheme = useCallback(() => {
    const next = !isDark
    setIsDark(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }, [isDark])

  const isTransparent = isHomepage && !scrolled

  const textBase = isTransparent
    ? 'text-white/60 hover:text-white'
    : 'text-ink/50 dark:text-gallery/50 hover:text-ink dark:hover:text-gallery'

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
          isTransparent
            ? 'bg-transparent border-b border-transparent'
            : 'bg-gallery/92 dark:bg-ink-soft/95 backdrop-blur-2xl border-b border-ink/8 dark:border-gallery/10 shadow-sm'
        }`}
      >
          <div className="max-w-7xl mx-auto px-5 sm:px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="z-50 flex items-center rounded-md" aria-label="NOIR A PART">
            <Logo variant="nav" transparent={isTransparent} priority />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-normal">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`relative transition-colors duration-200 ${textBase} ${
                  pathname === l.href ? (isTransparent ? '!text-white' : '!text-ink dark:!text-gallery') : ''
                }`}
              >
                {l.label}
                {pathname === l.href && (
                  <span className="absolute -bottom-1 left-0 right-0 h-px bg-brand rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-1">
            {/* FR / EN toggle — minimal */}
            <div className="flex items-center gap-0.5 mr-1">
              <button
                onClick={() => setLang('fr')}
                className={`text-[11px] font-semibold tracking-wider transition-opacity px-1 py-0.5 rounded ${
                  isTransparent ? 'text-white' : 'text-ink dark:text-gallery'
                } ${lang === 'fr' ? 'opacity-100' : 'opacity-25 hover:opacity-50'}`}
                aria-label="Français"
              >
                FR
              </button>
              <span className={`text-[10px] select-none ${isTransparent ? 'text-white/30' : 'text-ink/20 dark:text-gallery/20'}`}>
                ·
              </span>
              <button
                onClick={() => setLang('en')}
                className={`text-[11px] font-semibold tracking-wider transition-opacity px-1 py-0.5 rounded ${
                  isTransparent ? 'text-white' : 'text-ink dark:text-gallery'
                } ${lang === 'en' ? 'opacity-100' : 'opacity-25 hover:opacity-50'}`}
                aria-label="English"
              >
                EN
              </button>
            </div>

            {/* Theme */}
            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-full transition-colors hover:bg-ink/5 dark:hover:bg-gallery/8 ${textBase}`}
              aria-label={t('nav.themeToggle')}
              aria-pressed={isDark}
            >
              {isDark ? <Sun size={20} strokeWidth={1.5} /> : <Moon size={20} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile bottom nav */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-gallery/95 dark:bg-ink-soft/95 backdrop-blur-xl border-t border-ink/10 dark:border-gallery/10 pb-safe"
        aria-label={t('nav.menu')}
      >
        <div className="flex items-center justify-around h-16 px-1.5">
          {mobileNavItems.map(({ href, label, Icon }) => {
            const isContact = href === '/#contact'
            const isActive = isContact
              ? pathname === '/' && currentHash === '#contact'
              : pathname === href || (href !== '/' && pathname.startsWith(href))
            return (
              <Link
                key={href}
                href={href}
                aria-current={isActive ? 'page' : undefined}
                className={`min-w-0 flex-1 flex flex-col items-center gap-0.5 px-1 py-2 rounded-xl transition-colors ${
                  isActive ? 'text-brand' : 'text-ink/40 dark:text-gallery/40'
                }`}
              >
                <Icon size={20} strokeWidth={isActive ? 2 : 1.5} />
                <span className="max-w-full truncate text-[10px] font-medium">{label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}
