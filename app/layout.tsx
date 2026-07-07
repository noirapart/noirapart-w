import type { Metadata } from 'next'
import './globals.css'
import Providers from '@/components/Providers'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'NOIR A PART | Art, Culture & Monde',
  description:
    'NOIR A PART célèbre la créativité africaine et afro-diasporique à travers des expositions curatées, des entretiens exclusifs et des expériences immersives.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className="bg-gallery dark:bg-ink text-ink dark:text-gallery transition-colors duration-300"
      >
        <Providers>
          <Navigation />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
