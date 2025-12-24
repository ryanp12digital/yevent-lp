
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Toaster } from 'react-hot-toast'

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins'
})

export const metadata: Metadata = {
  title: 'Yevent - Locais Exclusivos para Eventos Corporativos',
  description: 'Plataforma premium para reserva de salas de reunião, auditórios e espaços de alto padrão.',
  keywords: ['eventos corporativos', 'aluguel de salas', 'auditórios', 'reuniões', 'Yevent', 'luxo'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${poppins.variable} font-sans bg-white text-slate-900 selection:bg-blue-600 selection:text-white antialiased`}>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <Toaster position="bottom-right" />
      </body>
    </html>
  )
}
