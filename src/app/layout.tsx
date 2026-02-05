
import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster"
import './globals.css';
import { LocaleProvider } from '@/hooks/use-locale';
import { WhatsAppButton } from '@/components/ui/whatsapp-button';
import { CookieConsent } from '@/components/cookie-consent';
import { ThemeProvider } from '@/components/theme-provider';
import { BookingProvider } from '@/contexts/booking-context';

export const metadata: Metadata = {
  title: 'Vacheresses Wedding Dream',
  description: 'Your dream wedding starts at Domaine des Vacheresses.',
  icons: {
    icon: [
      { url: '/logo_white.png', sizes: 'any' }
    ],
    shortcut: '/logo_white.png',
    apple: '/logo_white.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LocaleProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
        </head>
        <body className="font-body antialiased">
          <ThemeProvider>
            <BookingProvider>
              {children}
            </BookingProvider>
            <Toaster />
            <WhatsAppButton />
            <CookieConsent />
          </ThemeProvider>
        </body>
      </html>
    </LocaleProvider>
  );
}

    