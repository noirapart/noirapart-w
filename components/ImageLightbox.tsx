'use client'
import { useCallback, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { useModalA11y } from '@/components/useModalA11y'

type ImageLightboxProps = {
  images: string[]
  index: number
  title: string
  onClose: () => void
  onChange: (index: number) => void
  closeLabel: string
}

export default function ImageLightbox({
  images,
  index,
  title,
  onClose,
  onChange,
  closeLabel,
}: ImageLightboxProps) {
  const dialogRef = useModalA11y<HTMLDivElement>(true, onClose)
  const hasPrev = index > 0
  const hasNext = index < images.length - 1

  const goPrev = useCallback(() => {
    if (hasPrev) onChange(index - 1)
  }, [hasPrev, index, onChange])

  const goNext = useCallback(() => {
    if (hasNext) onChange(index + 1)
  }, [hasNext, index, onChange])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goPrev, goNext])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 p-4 sm:p-8"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        className="relative w-full max-w-6xl h-full max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4 shrink-0">
          <p className="text-sm text-white/60">
            {index + 1} / {images.length}
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label={closeLabel}
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        <div className="relative flex-1 min-h-0 flex items-center justify-center">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={images[index]}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="relative w-full h-full"
            >
              <Image
                src={images[index]}
                alt={`${title} ${index + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </motion.div>
          </AnimatePresence>

          {hasPrev && (
            <button
              type="button"
              onClick={goPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-brand transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft size={22} strokeWidth={1.5} />
            </button>
          )}
          {hasNext && (
            <button
              type="button"
              onClick={goNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-brand transition-colors"
              aria-label="Next"
            >
              <ChevronRight size={22} strokeWidth={1.5} />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  )
}
