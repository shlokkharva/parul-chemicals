import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'

export const metadata: Metadata = {
  title: 'Parul Chemicals — Precision Chemistry',
  description: 'Leading manufacturer of Diethyl Phthalate (DEP) and Triethyl Citrate (TEC). ISO certified, GMP compliant, trusted by pharmaceutical, food and cosmetics industries.',
  keywords: 'Diethyl Phthalate, Triethyl Citrate, DEP, TEC, chemical manufacturer, plasticizer',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Poppins:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white text-[#0F1C33] antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  )
}
