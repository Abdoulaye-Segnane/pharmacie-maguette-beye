// app/layout.tsx
import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { baseMetadata } from '@/lib/seo';
import './globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: '--font-jakarta',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = baseMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-white text-gray-dark">
        {children}
      </body>
    </html>
  );
}
