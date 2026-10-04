import React from 'react';
import './Footer.css';
import { PhoneIcon } from '../icons';
import { SiInstagram } from 'react-icons/si';
import { useLanguage } from '../../i18n';
import { useData } from '../../data/DataContext';

export const Footer = () => {
  const { t } = useLanguage();
  const { shopInfo } = useData();

  return (
    <footer className="mz-footer night-bg">
      <div className="mz-footer-container">
        
        <div className="mz-footer-brand">
          <PhoneIcon width="24" height="24" className="mz-wordmark-icon-footer" />
          <span className="mz-wordmark-text">
            <span className="mz-wordmark-mo">Mo</span> PhoneZone
          </span>
        </div>

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
              <a href={`tel:+${shopInfo.phones.primary}`}>+{shopInfo.phones.primary}</a><br />
              <a href={`tel:+${shopInfo.phones.secondary}`}>+{shopInfo.phones.secondary}</a><br />
              <a href={`mailto:${shopInfo.email}`}>{shopInfo.email}</a>
            </p>
            <p style={{ marginTop: '16px' }}>
              <a href={shopInfo.instagram.url} target="_blank" rel="noopener noreferrer" className="mz-footer-social">
                <SiInstagram /> @{shopInfo.instagram.handle}
              </a>
            </p>
          </div>

          <div className="mz-footer-col">
            <strong>{t('visit.hours')}</strong>
            <p>
              {shopInfo.openTime} - {shopInfo.closeTime}
            </p>
            <p className="mz-footer-small">
              {shopInfo.openDaysConfirmed ? `Days open: ${shopInfo.openDays.join(', ')}` : t('visit.daysTbc')}
            </p>
          </div>
        </div>

        <div className="mz-footer-bottom">
          <span className="mz-footer-credit">{shopInfo.studioCredit}</span>
          {shopInfo.demoMode && (
            <span className="mz-footer-demo">{t('footer.demo')}</span>
          )}
        </div>
        
      </div>
    </footer>
  );
};
