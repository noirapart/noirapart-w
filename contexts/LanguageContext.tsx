'use client'
import { createContext, useContext, useState, useEffect, useCallback } from 'react'

export type Lang = 'fr' | 'en'

interface LanguageContextValue {
  lang: Lang
  setLang: (l: Lang) => void
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'fr',
  setLang: () => {},
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('fr')

  useEffect(() => {
    const saved = localStorage.getItem('lang') as Lang | null
    if (saved === 'fr' || saved === 'en') setLangState(saved)
  }, [])

  const setLang = useCallback((l: Lang) => {
    setLangState(l)
    localStorage.setItem('lang', l)
    document.documentElement.setAttribute('lang', l)
  }, [])

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  return useContext(LanguageContext)
}

/** Pick the correct language value from a bilingual pair */
export function pick<T>(fr: T, en: T, lang: Lang): T {
  return lang === 'en' ? en : fr
}
