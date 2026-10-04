import { useState, useEffect } from 'react';
import { en } from './en';
import { or } from './or';

export type Language = 'en' | 'or';

type TranslationKey = keyof typeof en;

let currentLang: Language = (localStorage.getItem('mz_lang') as Language) || 'en';
const listeners = new Set<() => void>();

export const setLanguage = (lang: Language) => {
  currentLang = lang;
  localStorage.setItem('mz_lang', lang);
  document.documentElement.lang = lang;
  listeners.forEach(l => l());
};

export const getLanguage = () => currentLang;

export const t = (key: TranslationKey, params?: Record<string, string | number>): string => {
  let text = en[key];
  if (currentLang === 'or' && or[key]) {
    text = or[key];
  } else if (currentLang === 'or' && !or[key]) {
    if (import.meta.env.DEV) {
      console.warn(`Missing Odia translation for key: ${key}`);
    }
  }

  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      text = text.replace(`{${k}}`, String(v));
    });
  }
  return text;
};

export const useLanguage = () => {
  const [lang, setLang] = useState<Language>(currentLang);

  useEffect(() => {
    const listener = () => setLang(currentLang);
    listeners.add(listener);
    document.documentElement.lang = currentLang;
    return () => {
      listeners.delete(listener);
    };
  }, []);

  return { lang, setLanguage, t };
};
