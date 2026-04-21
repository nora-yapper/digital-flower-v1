import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Inter, Sulphur_Point } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif"
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans"
});
const sulphurPoint = Sulphur_Point({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-display"
});

export const metadata: Metadata = {
  title: 'Flower Shop Kiosk',
  description: 'Design your own bouquet or discover a selection of fresh, beautiful flowers.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${inter.variable} ${sulphurPoint.variable} font-display antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
