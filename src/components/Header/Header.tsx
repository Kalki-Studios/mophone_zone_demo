import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { MenuIcon, CloseIcon } from '../icons';
import { LanguageToggle } from '../LanguageToggle/LanguageToggle';
import { Button } from '../Button/Button';
import { useLanguage } from '../../i18n';
import { useData } from '../../data/DataContext';

export const Header = () => {
  const { t } = useLanguage();
  const { shopInfo } = useData();
  const [menuOpen, setMenuOpen] = useState(false);

  // Trap focus & lock scroll
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setMenuOpen(false);
      };
      document.addEventListener('keydown', handleEscape);
      return () => {
        document.body.style.overflow = '';
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const phoneHref = `tel:+${shopInfo.phones.primary}`;
  const whatsappHref = `https://wa.me/${shopInfo.whatsappNumber}?text=${encodeURIComponent(t('cta.askWhatsapp'))}`;

  return (
    <header className="mz-header">
      <div className="mz-header-container">
        
        {/* Left: Logo */}
        <div className="mz-header-left">
          <Link to="/" className="mz-wordmark" onClick={closeMenu}>
            <span className="mz-wordmark-pip" aria-hidden="true" />
            <span className="mz-wordmark-text">
              <span className="mz-wordmark-mo">MO</span>
              <span className="mz-wordmark-sep" aria-hidden="true" />
              <span className="mz-wordmark-brand">PHONEZONE</span>
            </span>
          </Link>
        </div>

        {/* Center: Desktop Nav */}
        <nav className="mz-desktop-nav">
          <Link to="/phones">{t('nav.phones')}</Link>
          <Link to="/accessories">{t('nav.accessories')}</Link>
          <Link to="/repair">{t('nav.repair')}</Link>
          <a href="https://maps.app.goo.gl/QzMpto9oU3TcisU6A" target="_blank" rel="noreferrer">{t('nav.visit')}</a>
        </nav>

        {/* Right: Actions */}
        <div className="mz-header-right mz-desktop-only">
          <Link to="/support" className="mz-header-link">Support</Link>
          <Link to="/business" className="mz-header-link">For Business</Link>
        </div>

        {/* Mobile controls */}
        <div className="mz-mobile-controls">
          <button className="mz-menu-btn" onClick={() => setMenuOpen(true)}>
            <MenuIcon width="24" height="24" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {menuOpen && (
        <div className="mz-mobile-menu">
          <div className="mz-mobile-menu-header">
            <span className="mz-wordmark-text">
              <span className="mz-wordmark-mo">MO</span>
              <span className="mz-wordmark-sep" aria-hidden="true" />
              <span className="mz-wordmark-brand">PHONEZONE</span>
            </span>
            <button className="mz-menu-btn" onClick={closeMenu}>
              <CloseIcon width="24" height="24" />
            </button>
          </div>
          
          <nav className="mz-mobile-nav-links">
            <Link to="/phones" onClick={closeMenu}>{t('nav.phones')}</Link>
            <Link to="/accessories" onClick={closeMenu}>{t('nav.accessories')}</Link>
            <Link to="/repair" onClick={closeMenu}>{t('nav.repair')}</Link>
            <a href="https://maps.app.goo.gl/QzMpto9oU3TcisU6A" target="_blank" rel="noreferrer" onClick={closeMenu}>{t('nav.visit')}</a>
            <Link to="/support" onClick={closeMenu}>Support</Link>
            <Link to="/business" onClick={closeMenu}>For Business</Link>
          </nav>

          <div className="mz-mobile-menu-actions">
            <LanguageToggle />
            <Button as="a" href={phoneHref} variant="outline" className="mz-full-width">{t('cta.call')}</Button>
            <Button as="a" href={whatsappHref} variant="whatsapp" className="mz-full-width">{t('cta.whatsapp')}</Button>
          </div>
        </div>
      )}
    </header>
  );
};
