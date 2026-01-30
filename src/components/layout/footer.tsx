
"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/hooks/use-locale";
import { EditableText } from "@/components/ui/editable-text";

const YouTubeIcon = () => (
    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 576 512">
        <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.325-11.412 132.325s0 89.458 11.412 132.325c6.281 23.65 24.787 42.276 48.284 48.597C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.322 42.003-24.947 48.284-48.597 11.412-42.867 11.412-132.325 11.412-132.325s0-89.458-11.412-132.325zM232.615 354.46V157.54l142.739 88.46-142.739 108.46z"/>
    </svg>
)

function SocialLink({ href, children, 'aria-label': ariaLabel }: { href: string; children: React.ReactNode; 'aria-label': string }) {
  return (
    <Link href={href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label={ariaLabel}>
      {children}
    </Link>
  );
}

export function Footer() {
  const { t } = useLocale();
  const currentYear = new Date().getFullYear();
  
  // NOTE: To enable the map, you need a valid Google Maps API key.
  // 1. Get an API key from https://console.cloud.google.com/google/maps-apis/overview
  // 2. Enable the "Maps Embed API" for your project.
  // 3. Replace the src URL below with the one provided by Google, including your API key.
  const mapSrcWithApiKey = "https://www.google.com/maps/embed/v1/place?key=AIzaSyDB9IcwYdjnLWwD21GU4lr-a0Iu2NYyDpI&q=Manoir+de+Vacheresses,Nogent-Le-Roi,France";


  return (
    <footer className="border-t">
      <div className="container grid grid-cols-1 md:grid-cols-3 gap-8 py-12 max-w-7xl">
        <div>
          <div className="flex items-center gap-3 mb-4">
             <Link href="/" className="flex items-center gap-2">
                <Image
                src="/logo_white.png"
                alt="Manoir de Vacheresses"
                width={32}
                height={32}
                className="h-8 w-8 invert dark:invert-0"
                />
                <span className="text-2xl font-bold font-headline">Vacheresses</span>
            </Link>
          </div>
          <p className="text-sm text-muted-foreground"><EditableText path="footer.name" value={t.footer.name} /></p>
          <p className="text-sm text-muted-foreground"><EditableText path="footer.address_1" value={t.footer.address_1} /></p>
          <p className="text-sm text-muted-foreground"><EditableText path="footer.address_2" value={t.footer.address_2} /></p>
          <div className="mt-4 space-y-2">
            <p className="text-sm text-muted-foreground"><EditableText path="footer.phone" value={t.footer.phone} /></p>
            <p className="text-sm text-muted-foreground"><EditableText path="footer.email" value={t.footer.email} /></p>
          </div>
           <div className="flex items-center gap-4 mt-4">
               <SocialLink href="https://www.facebook.com/profile.php?id=100063530055187" aria-label="Facebook">
                 <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path></svg>
               </SocialLink>
               <SocialLink href="https://www.instagram.com/manoirdevacheresses/" aria-label="Instagram">
                 <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363-.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.012-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218 1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.08 2.525c.636-.247 1.363-.416 2.427-.465C9.53 2.013 9.884 2 12.315 2zm0 1.623c-2.387 0-2.704.01-3.66.058-1.17.053-1.803.24-2.228.41a3.282 3.282 0 00-1.18 1.18c-.17.425-.357 1.058-.41 2.228-.048.956-.058 1.273-.058 3.66s.01 2.704.058 3.66c.053 1.17.24 1.803.41 2.228a3.282 3.282 0 001.18 1.18c.425.17 1.058.357 2.228.41.956.048 1.273.058 3.66.058s2.704-.01 3.66-.058c1.17-.053 1.803-.24 2.228-.41a3.282 3.282 0 001.18-1.18c.17-.425.357-1.058-.41-2.228.048-.956.058-1.273.058-3.66s-.01-2.704-.058-3.66c-.053-1.17-.24-1.803-.41-2.228a3.282 3.282 0 00-1.18-1.18c-.425-.17-1.058-.357-2.228-.41-.956-.048-1.273.058-3.66-.058zM12 8.118a3.882 3.882 0 100 7.764 3.882 3.882 0 000-7.764zm0 6.138a2.256 2.256 0 110-4.512 2.256 2.256 0 010 4.512zm5.338-7.838a.937.937 0 100-1.874.937.937 0 000 1.874z" clipRule="evenodd"></path></svg>
               </SocialLink>
               <SocialLink href="https://www.youtube.com/channel/UCfdHA7FnfVNNxG4sihpnn2g" aria-label="YouTube">
                 <YouTubeIcon />
               </SocialLink>
            </div>
        </div>
        <div className="md:col-span-2 rounded-lg overflow-hidden">
          <iframe
            className="w-full h-full min-h-[250px]"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen={false}
            referrerPolicy="no-referrer-when-downgrade"
            src={mapSrcWithApiKey}
          />
        </div>
      </div>
      <div className="container max-w-7xl border-t">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
             <p className="text-sm text-muted-foreground">
              <EditableText path="footer.copyright" value={t.footer.copyright.replace('{year}', currentYear.toString())} />
            </p>
            <Link href="/legal" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              <EditableText path="footer.legal" value={t.footer.legal} />
            </Link>
        </div>
      </div>
    </footer>
  );
}
