
"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Moon, Sun, Globe } from "lucide-react";
import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLocale } from "@/hooks/use-locale";
import { translations } from "@/lib/translations";

const navLinks = [
  { href: "/", label: "home" },
  { href: "/#packages", label: "packages" },
  { href: "/prestations", label: "services" },
  { href: "/configurator", label: "configurator" },
  { href: "/#availability", label: "availability" },
];

function useTheme() {
  const [theme, setThemeState] = useState('dark');

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') || 'dark';
    setThemeState(storedTheme);
    if (storedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const setTheme = (newTheme: 'dark' | 'light') => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return { theme, setTheme };
}

export function Header() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { locale, setLocale, t } = useLocale();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-7xl items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image src="/logo_white.png" alt="Manoir de Vacheresses" width={64} height={64} className="h-16 w-16 invert dark:invert-0" />
        </Link>

        <nav className="hidden md:flex items-center gap-4 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              {t.header[link.label as keyof typeof t.header]}
            </Link>
          ))}
           <Link href="/blog" className="transition-colors hover:text-foreground/80 text-foreground/60">
              {t.header.blog}
           </Link>
        </nav>

        <div className="flex items-center gap-2">
           <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Globe className="h-[1.2rem] w-[1.2rem]" />
                <span className="sr-only">Toggle language</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLocale('en')}>
                English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLocale('fr')}>
                Français
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          <Button asChild>
            <Link href="/login">{t.header.portal}</Link>
          </Button>

          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <Link href="/" className="flex items-center mb-8">
                <Image src="/logo_white.png" alt="Manoir de Vacheresses" width={64} height={64} className="h-16 w-16 invert dark:invert-0" />
              </Link>
              <nav className="flex flex-col gap-6 text-lg font-medium">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="transition-colors hover:text-foreground/80 text-foreground/60"
                    onClick={() => setIsSheetOpen(false)}
                  >
                    {t.header[link.label as keyof typeof t.header]}
                  </Link>
                ))}
                 <Link
                    href="/blog"
                    className="transition-colors hover:text-foreground/80 text-foreground/60"
                    onClick={() => setIsSheetOpen(false)}
                  >
                    {t.header.blog}
                  </Link>
                 <Link
                  href="/login"
                  className="transition-colors hover:text-foreground/80 text-foreground/60"
                  onClick={() => setIsSheetOpen(false)}
                >
                  {t.header.portal}
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
