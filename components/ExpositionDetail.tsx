'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import { ArrowLeft, Calendar, MapPin } from 'lucide-react'
import { AnimatePresence } from 'motion/react'
import type { Exposition, ExpoStatus } from '@/lib/exhibitions'
import { getLocalizedExposition } from '@/lib/exhibitions'
import { getArtistByName, localizeArtiste, type LocalizedArtiste } from '@/lib/artists'
import { useLang } from '@/contexts/LanguageContext'
import { useTranslations, type TKey } from '@/lib/translations'
import VideoPlayer from '@/components/VideoPlayer'
import ImageLightbox from '@/components/ImageLightbox'
import ArtisteModal from '@/components/ArtisteModal'

const STATUS_COLORS: Record<ExpoStatus, string> = {
  current: 'bg-green-600/90 text-white border-green-400/30 shadow-sm',
  upcoming: 'bg-brand text-white border-brand-light/50 shadow-sm',
  past: 'bg-brand text-white border-white/35 shadow-[0_2px_12px_rgba(0,0,0,0.45)] ring-1 ring-white/50',
}

const STATUS_KEYS: Record<ExpoStatus, TKey> = {
  current: 'expo.status.current',
  upcoming: 'expo.status.upcoming',
  past: 'expo.status.past',
}

export default function ExpositionDetail({ exposition }: { exposition: Exposition }) {
  const { lang } = useLang()
  const t = useTranslations(lang)
  const expo = getLocalizedExposition(exposition, lang)
  const isTitleCover = expo.id === 'broken-lineage'
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [selectedArtist, setSelectedArtist] = useState<LocalizedArtiste | null>(null)

  const openArtist = (name: string) => {
    const artist = getArtistByName(name)
    if (artist) setSelectedArtist(localizeArtiste(artist, lang))
  }

  return (
    <>
      <section className="bg-ink pt-28 pb-12 px-5 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/expositions"
            className="inline-flex items-center gap-2 text-sm text-gallery/50 hover:text-gallery transition-colors mb-8"
          >
            <ArrowLeft size={16} strokeWidth={1.5} />
            {t('nav.expositions')}
          </Link>

          <div className="relative h-[45vh] min-h-[280px] max-h-[520px] rounded-2xl overflow-hidden mb-10">
            <Image
              src={expo.coverImage}
              alt={expo.title}
              fill
              className={isTitleCover ? 'object-contain px-5 pb-16 pt-6 sm:px-12 md:px-20' : 'object-cover'}
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className={`text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full border ${STATUS_COLORS[expo.status]} mb-3 inline-block`}>
                {t(STATUS_KEYS[expo.status])}
              </span>
              <h1 className={isTitleCover ? 'sr-only' : 'font-display text-2xl sm:text-4xl md:text-5xl font-normal text-gallery leading-tight max-w-4xl'}>
                {expo.title}
              </h1>
              <p className="text-gallery/60 mt-2 max-w-2xl">{expo.subtitle}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-gallery/50 mb-10">
            <span className="flex items-center gap-1.5"><Calendar size={14} strokeWidth={1.5} />{expo.period}</span>
            <span className="flex items-center gap-1.5"><MapPin size={14} strokeWidth={1.5} />{expo.location}</span>
          </div>
        </div>
      </section>

      <section className="bg-gallery dark:bg-ink-soft py-12 md:py-16 px-5 sm:px-6">
        <div className="max-w-3xl mx-auto space-y-10">
          <div>
            <h2 className="text-xs font-semibold tracking-widest uppercase text-ink/40 dark:text-gallery/40 mb-3">{t('expo.modal.theme')}</h2>
            <p className="text-lg text-ink/80 dark:text-gallery/80 leading-relaxed italic border-l-2 border-brand pl-4">
              {expo.theme}
            </p>
          </div>
          <div>
            <h2 className="text-xs font-semibold tracking-widest uppercase text-ink/40 dark:text-gallery/40 mb-3">{t('expo.modal.about')}</h2>
            <p className="text-base text-ink/70 dark:text-gallery/70 leading-relaxed">{expo.description}</p>
          </div>
          {expo.artists.length > 0 && (
            <div>
              <h2 className="text-xs font-semibold tracking-widest uppercase text-ink/40 dark:text-gallery/40 mb-3">{t('expo.modal.artists')}</h2>
              <div className="flex flex-wrap gap-2">
                {expo.artists.map((name) => {
                  const hasProfile = Boolean(getArtistByName(name))
                  return hasProfile ? (
                    <button
                      key={name}
                      type="button"
                      onClick={() => openArtist(name)}
                      className="px-3 py-1.5 rounded-full border border-ink/10 dark:border-gallery/15 text-sm text-ink/75 dark:text-gallery/75 bg-white dark:bg-ink-card hover:border-brand/40 hover:text-brand dark:hover:text-brand transition-colors cursor-pointer"
                      aria-haspopup="dialog"
                      aria-label={`${t('artistes.viewProfile')} : ${name}`}
                    >
                      {name}
                    </button>
                  ) : (
                    <span key={name} className="px-3 py-1.5 rounded-full border border-ink/10 dark:border-gallery/15 text-sm text-ink/75 dark:text-gallery/75 bg-white dark:bg-ink-card">
                      {name}
                    </span>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {expo.images.length > 0 && (
        <section className="bg-blush dark:bg-ink py-12 md:py-16 px-5 sm:px-6 pb-24 md:pb-16">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-xs font-semibold tracking-widest uppercase text-ink/40 dark:text-gallery/40 mb-6">{t('expo.modal.photos')}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {expo.images.map((img, i) => (
                <motion.button
                  key={img}
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setLightboxIndex(i)}
                  className="relative aspect-square rounded-xl overflow-hidden border border-ink/10 dark:border-gallery/10 cursor-zoom-in group"
                >
                  <Image src={img} alt={`${expo.title} ${i + 1}`} fill className="object-cover md:grayscale md:group-hover:grayscale-0 transition-all duration-500" sizes="400px" />
                </motion.button>
              ))}
            </div>
          </div>
        </section>
      )}

      {expo.video && (
        <section className="bg-gallery dark:bg-ink-card py-12 px-5 sm:px-6 border-t border-ink/8 dark:border-gallery/8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xs font-semibold tracking-widest uppercase text-ink/40 dark:text-gallery/40 mb-4">{t('expo.modal.video')}</h2>
            <VideoPlayer variant="compact" src={expo.video} poster={expo.videoPoster} rotate={expo.videoRotate} />
          </div>
        </section>
      )}

      <AnimatePresence>
        {lightboxIndex !== null && (
          <ImageLightbox
            images={expo.images}
            index={lightboxIndex}
            title={expo.title}
            onClose={() => setLightboxIndex(null)}
            onChange={setLightboxIndex}
            closeLabel={t('ui.close')}
          />
        )}
        {selectedArtist && (
          <ArtisteModal artiste={selectedArtist} onClose={() => setSelectedArtist(null)} t={t} />
        )}
      </AnimatePresence>
    </>
  )
}
