import React from 'react';
import './LanguageToggle.css';
import { useLanguage } from '../../i18n';
import type { Language } from '../../i18n';

export const LanguageToggle = () => {
  const { lang, setLanguage } = useLanguage();

  return (
    <div className="mz-lang-toggle">
      <button
        className={`mz-lang-btn ${lang === 'en' ? 'active' : ''}`}
        onClick={() => setLanguage('en')}
        aria-pressed={lang === 'en'}
      >
        EN
      </button>
      <button
        className={`mz-lang-btn ${lang === 'or' ? 'active' : ''}`}
        onClick={() => setLanguage('or')}
        aria-pressed={lang === 'or'}
      >
        ଓଡ଼ିଆ
      </button>
    </div>
  );
};
