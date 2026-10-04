import React from 'react';
import './Footer.css';
import { PhoneIcon } from '../icons';
import { SiInstagram, SiFacebook } from 'react-icons/si';
import { useLanguage } from '../../i18n';
import { useData } from '../../data/DataContext';

export const Footer = () => {
  const { t } = useLanguage();
  const { shopInfo } = useData();

  return (
    <footer className="mz-footer">
      <div className="mz-footer-container">
        
        <div className="mz-footer-grid">
          <div className="mz-footer-col">
            <strong>Address</strong>
            <p>
              {shopInfo.address.line1}<br />
              {shopInfo.address.town}, {shopInfo.address.district}<br />
              {shopInfo.address.state}, PIN {shopInfo.address.pin}
            </p>
          </div>

          <div className="mz-footer-col">
            <strong>Contact</strong>
            <p>
              {shopInfo.phones.primary && (
                <><a href={`tel:+${shopInfo.phones.primary}`}>+{shopInfo.phones.primary}</a><br /></>
              )}
              {shopInfo.phones.secondary && (
                <><a href={`tel:+${shopInfo.phones.secondary}`}>+{shopInfo.phones.secondary}</a><br /></>
              )}
              {shopInfo.email && (
                <a href={`mailto:${shopInfo.email}`}>{shopInfo.email}</a>
              )}
            </p>
          </div>

          <div className="mz-footer-col">
            <strong>{t('visit.hours')}</strong>
            <p>
              {shopInfo.openTime} - {shopInfo.closeTime}
            </p>
            <p className="mz-footer-small">
              {shopInfo.openDaysConfirmed ? 'Monday - Sunday' : t('visit.daysTbc')}
            </p>
          </div>

          <div className="mz-footer-col">
            <strong>Follow Us</strong>
            <div className="mz-footer-socials">
              {shopInfo.instagram.url && shopInfo.instagram.handle && (
                <a href={shopInfo.instagram.url} target="_blank" rel="noopener noreferrer" className="mz-footer-social">
                  <SiInstagram /> Instagram
                </a>
              )}
              {shopInfo.facebook?.url && shopInfo.facebook?.handle && (
                <a href={shopInfo.facebook.url} target="_blank" rel="noopener noreferrer" className="mz-footer-social">
                  <SiFacebook /> Facebook
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="mz-footer-bottom">
          <div className="mz-footer-brand">
            <PhoneIcon width="20" height="20" className="mz-wordmark-icon-footer" />
            <span className="mz-wordmark-text">
              <span className="mz-wordmark-mo">Mo</span> PhoneZone
            </span>
          </div>
          
          <div className="mz-footer-legal">
            <span className="mz-footer-credit">{shopInfo.studioCredit}</span>
            {shopInfo.demoMode && (
              <span className="mz-footer-demo">{t('footer.demo')}</span>
            )}
            <span className="mz-footer-copyright">© 2026 Mo PhoneZone. All rights reserved.</span>
          </div>
        </div>
        
      </div>
    </footer>
  );
};

