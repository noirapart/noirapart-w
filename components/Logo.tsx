import Image from 'next/image'
import { cn } from '@/lib/utils'

type LogoProps = {
  variant?: 'nav' | 'footer'
  transparent?: boolean
  className?: string
  priority?: boolean
}

export default function Logo({ variant = 'nav', transparent = false, className, priority }: LogoProps) {
  const sizeClass =
    variant === 'nav'
      ? transparent
        ? 'h-[58px] sm:h-16 md:h-[72px]'
        : 'h-[58px] sm:h-16 md:h-[72px]'
      : 'h-20 md:h-[88px]'

  return (
    <Image
      src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/062070a3-b4f9-4496-88cf-dfad7efa126f_320w.png"
      alt="NOIR A PART"
      width={176}
      height={72}
      sizes={variant === 'nav' ? '(max-width: 768px) 156px, 184px' : '(max-width: 768px) 200px, 220px'}
      priority={priority}
      className={cn(
        'w-auto origin-left transition-all duration-300',
        sizeClass,
        transparent
          ? 'brightness-0 invert drop-shadow-[0_6px_18px_rgba(0,0,0,0.45)]'
          : 'dark:brightness-0 dark:invert',
        className,
      )}
    />
  )
}
