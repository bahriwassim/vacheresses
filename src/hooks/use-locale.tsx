
"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { translations, Translation, Locale } from '@/lib/translations';
import { loadTextOverrides, subscribeTextOverrides, loadMediaOverridesByPath } from '@/lib/supabase';

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translation;
  refreshOverrides: () => Promise<void>;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export const LocaleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>('en');
  const [overrides, setOverrides] = useState<any>(null);

  const refreshOverrides = async () => {
    // Load text overrides
    const remoteText = await loadTextOverrides(locale);
    if (remoteText) {
      try {
        const raw = localStorage.getItem('textOverrides');
        const cur = raw ? JSON.parse(raw) : {};
        cur[locale] = remoteText;
        localStorage.setItem('textOverrides', JSON.stringify(cur));
        setOverrides(cur);
        window.dispatchEvent(new Event('textOverridesUpdated'));
      } catch {}
    }

    // Load media overrides
    await loadMediaOverridesByPath();
    window.dispatchEvent(new Event('mediaOverridesUpdated'));
  };

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

  useEffect(() => {
    try {
      const raw = localStorage.getItem('textOverrides');
      if (raw) {
        const parsed = JSON.parse(raw);
        setOverrides(parsed);
      } else {
        setOverrides(null);
      }
    } catch {
      setOverrides(null);
    }
  }, []);

  useEffect(() => {
    let unsubscribe: (() => void) | null = null;
    const run = async () => {
      await refreshOverrides();
      
      unsubscribe = subscribeTextOverrides(locale, async () => {
        await refreshOverrides();
      });
    };
    run();
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [locale]);

  useEffect(() => {
    const handler = () => {
      try {
        const raw = localStorage.getItem('textOverrides');
        setOverrides(raw ? JSON.parse(raw) : null);
      } catch {
        setOverrides(null);
      }
    };
    window.addEventListener('textOverridesUpdated', handler as EventListener);
    return () => window.removeEventListener('textOverridesUpdated', handler as EventListener);
  }, []);

  const setLocale = (newLocale: Locale) => {
    if (['en', 'fr'].includes(newLocale)) {
      setLocaleState(newLocale);
      localStorage.setItem('locale', newLocale);
    }
  };

  const t = useMemo(() => {
    const base = translations[locale];
    const localeOverrides = overrides && overrides[locale] ? overrides[locale] : null;
    if (!localeOverrides) return base;
    const merge = (target: any, source: any): any => {
      if (!source) return target;
      
      // If target is array and source is object (sparse array from overrides), merge by index
      if (Array.isArray(target) && source && typeof source === 'object' && !Array.isArray(source)) {
         const result = [...target];
         Object.keys(source).forEach((key) => {
             const index = parseInt(key, 10);
             if (!isNaN(index)) {
                 if (index < result.length) {
                     // Existing item: recursive merge
                     result[index] = merge(result[index], source[key]);
                 } else {
                     // New item (append? or just set if we want to allow extending arrays)
                     // For now, let's assume we are overriding existing items primarily
                     result[index] = source[key];
                 }
             }
         });
         return result;
      }

      const result: any = Array.isArray(target) ? [...target] : { ...target };
      Object.keys(source).forEach((key) => {
        const srcVal = source[key];
        const tgtVal = (target as any)[key];
        
        // Recursive merge for objects
        // Allow merge if both are objects, OR if target is array and source is object (sparse array override)
        if (srcVal && typeof srcVal === 'object' && !Array.isArray(srcVal) && tgtVal && typeof tgtVal === 'object') {
          result[key] = merge(tgtVal, srcVal);
        } else {
          result[key] = srcVal;
        }
      });
      return result;
    };
    return merge(base, localeOverrides) as Translation;
  }, [locale, overrides]);

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t, refreshOverrides }}>
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
