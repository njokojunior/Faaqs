import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { AuthProvider } from '@/lib/auth-context'
import { Toaster } from '@/components/ui/toaster'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'


export const metadata: Metadata = {
  title: "FAAQS - Prépare ton BTS avec confiance",
  description:
    "Plateforme de préparation au BTS avec fiches de révision, quiz et annales corrigées",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`font-sans antialiased ${GeistSans.variable} ${GeistMono.variable}`}
      >
        <Header />
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
        <Analytics />
        <Footer />
      </body>
    </html>
  );
}