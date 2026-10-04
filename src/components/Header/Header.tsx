import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { MenuIcon, CloseIcon } from '../icons';
import { SiInstagram, SiFacebook, SiWhatsapp } from 'react-icons/si';
import { FiPhone } from 'react-icons/fi';
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
      document.body.classList.add('mz-menu-open');
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setMenuOpen(false);
      };
      document.addEventListener('keydown', handleEscape);
      return () => {
        document.body.style.overflow = '';
        document.body.classList.remove('mz-menu-open');
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
        <div className="mz-header-right mz-desktop-only" style={{ gap: '16px', alignItems: 'center' }}>
          {shopInfo.instagram.url && (
            <a href={shopInfo.instagram.url} target="_blank" rel="noreferrer" className="mz-header-link mz-icon-link" aria-label="Instagram">
              <SiInstagram size={20} />
            </a>
          )}
          {shopInfo.facebook.url && (
            <a href={shopInfo.facebook.url} target="_blank" rel="noreferrer" className="mz-header-link mz-icon-link" aria-label="Facebook">
              <SiFacebook size={20} />
            </a>
          )}
          <a href={phoneHref} className="mz-header-link mz-icon-link" aria-label="Call">
            <FiPhone size={22} />
          </a>
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
            <div style={{ display: 'flex', gap: '24px', padding: '16px 0', alignItems: 'center' }}>
              {shopInfo.instagram.url && (
                <a href={shopInfo.instagram.url} target="_blank" rel="noreferrer" className="mz-icon-link" aria-label="Instagram">
                  <SiInstagram size={24} color="var(--ink)" />
                </a>
              )}
              {shopInfo.facebook.url && (
                <a href={shopInfo.facebook.url} target="_blank" rel="noreferrer" className="mz-icon-link" aria-label="Facebook">
                  <SiFacebook size={24} color="var(--ink)" />
                </a>
              )}
              <a href={phoneHref} onClick={closeMenu} className="mz-icon-link" aria-label="Call">
                <FiPhone size={26} color="var(--ink)" />
              </a>
            </div>
          </nav>

          <div className="mz-mobile-menu-actions">
            <a href={phoneHref} className="mz-mobile-action-btn mz-mobile-call" onClick={closeMenu}>
              {t('cta.call')}
            </a>
            <a href={whatsappHref} className="mz-mobile-action-btn mz-mobile-wa" onClick={closeMenu} target="_blank" rel="noopener noreferrer">
              <SiWhatsapp size={20} />
              {t('cta.whatsapp')}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
