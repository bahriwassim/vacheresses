
"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { translations, Translation, Locale } from '@/lib/translations';

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translation;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export const LocaleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>('en');

  useEffect(() => {
    const storedLocale = localStorage.getItem('locale') as Locale | null;
    if (storedLocale && ['en', 'fr'].includes(storedLocale)) {
      setLocaleState(storedLocale);
    } else {
        const browserLang = navigator.language.split('-')[0];
        if (browserLang === 'fr') {
            setLocaleState('fr');
        } else {
            setLocaleState('en');
        }
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    if (['en', 'fr'].includes(newLocale)) {
      setLocaleState(newLocale);
      localStorage.setItem('locale', newLocale);
    }
  };

  const t = useMemo(() => translations[locale], [locale]);

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocale = (): LocaleContextType => {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
};
