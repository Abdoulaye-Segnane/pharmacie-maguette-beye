import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { baseMetadata } from '@/lib/seo'
import { PHARMACY_NAME, SITE_URL, contact } from '@/lib/constants'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import './globals.css'

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: '--font-jakarta',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = baseMetadata

export const viewport: Viewport = {
  themeColor: '#1A4D35',
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'Pharmacy',
  name: PHARMACY_NAME,
  url: SITE_URL,
  telephone: contact.phone.replace(/\s/g, ''),
  email: contact.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: contact.address,
    addressLocality: 'Kaolack',
    addressCountry: 'SN',
  },
  openingHoursSpecification: [
    { dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], slot: contact.hours.weekdays },
    { dayOfWeek: ['Saturday'], slot: contact.hours.saturday },
    { dayOfWeek: ['Sunday'], slot: contact.hours.sunday },
  ]
    .filter(({ slot }) => !slot.closed)
    .map(({ dayOfWeek, slot }) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek,
      opens: slot.open.replace('h', ':'),
      closes: slot.close.replace('h', ':'),
    })),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="fr"
      className={`${plusJakartaSans.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-white text-gray-dark">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
