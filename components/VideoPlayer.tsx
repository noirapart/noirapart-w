'use client'
import { cn } from '@/lib/utils'

type VideoPlayerProps = {
  src: string
  poster?: string
  label?: string
  variant?: 'default' | 'featured' | 'compact' | 'cinema'
  rotate?: number
  className?: string
}

export default function VideoPlayer({
  src,
  poster,
  label,
  variant = 'default',
  rotate = 0,
  className,
}: VideoPlayerProps) {
  const maxHeight =
    variant === 'featured' || variant === 'cinema'
      ? 'min(78vh, 820px)'
      : variant === 'compact'
        ? 'min(65vh, 560px)'
        : 'min(72vh, 680px)'

  const isRotated = rotate !== 0

  return (
    <figure className={cn('w-full', className)}>
      <div
        className={cn(
          'flex w-full items-center justify-center rounded-xl border bg-neutral-950 px-2 py-2 sm:px-4 sm:py-4',
          variant === 'featured' || variant === 'cinema' ? 'border-gallery/15' : 'border-ink/10 dark:border-gallery/10',
          isRotated && 'min-h-[min(70vh,640px)]',
        )}
      >
        <video
          controls
          playsInline
          preload="metadata"
          poster={poster}
          className="h-auto w-auto max-w-full object-contain"
          style={{
            maxHeight: isRotated ? 'min(55vh, 480px)' : maxHeight,
            transform: isRotated ? `rotate(${rotate}deg)` : undefined,
          }}
        >
          <source src={src} />
        </video>
      </div>
      {label && (
        <figcaption
          className={cn(
            'mt-3 text-sm leading-relaxed',
            variant === 'featured' || variant === 'cinema' ? 'text-gallery/55' : 'text-ink/50 dark:text-gallery/50 px-1',
          )}
        >
          {label}
        </figcaption>
      )}
    </figure>
  )
}
