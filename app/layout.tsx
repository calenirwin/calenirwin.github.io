import type { Metadata } from 'next'
import { Syne, Geist_Mono } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const syne = Syne({ subsets: ['latin'], weight: ['700', '800'], variable: '--font-heading' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata: Metadata = {
  title: 'Calen Irwin',
  description: 'Writing about AI, building things, and what I\'m learning.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${syne.variable} ${geistMono.variable} font-mono flex flex-col min-h-screen bg-white text-black`}>
        <Navigation />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
