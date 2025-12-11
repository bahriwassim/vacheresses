
"use client";

import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster"
import './globals.css';
import { LocaleProvider } from '@/hooks/use-locale';
import { WhatsAppButton } from '@/components/ui/whatsapp-button';
import { CookieConsent } from '@/components/cookie-consent';
import { ThemeProvider } from '@/components/theme-provider';

// This is a client component, so metadata should be exported from a server component if needed, 
// or defined in a generateMetadata function in a parent layout or page.
// export const metadata: Metadata = {
//   title: 'Vacheresses Wedding Dream',
//   description: 'Your dream wedding starts at Domaine des Vacheresses.',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LocaleProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="icon" href="/logo_white.png" type="image/png" sizes="32x32" />
          <link rel="shortcut icon" href="/logo_white.png" type="image/png" />
          <link rel="apple-touch-icon" href="/logo_white.png" sizes="180x180" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
        </head>
        <body className="font-body antialiased">
          <ThemeProvider>
            {children}
            <Toaster />
            <WhatsAppButton />
            <CookieConsent />
          </ThemeProvider>
        </body>
      </html>
    </LocaleProvider>
  );
}

    