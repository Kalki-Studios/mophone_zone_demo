import React from 'react';
import './StickyMobileBar.css';
import { Button } from '../Button/Button';
import { useLanguage } from '../../i18n';
import { useData } from '../../data/DataContext';

export const StickyMobileBar = () => {
  const { t } = useLanguage();
  const { shopInfo } = useData();

  const phoneHref = `tel:+${shopInfo.phones.primary}`;
  const whatsappHref = `https://wa.me/${shopInfo.whatsappNumber}?text=${encodeURIComponent(t('cta.askWhatsapp'))}`;
  const mapHref = "https://www.google.com/maps/search/?api=1&query=Mo+PhoneZone+Semiliguda+Koraput+Odisha";

  return (
    <div className="mz-sticky-mobile-bar">
      <Button as="a" href={phoneHref} variant="outline" className="mz-smb-btn">
        {t('cta.call')}
      </Button>
      <Button as="a" href={whatsappHref} variant="whatsapp" className="mz-smb-btn">
        {t('cta.whatsapp')}
      </Button>
      <Button as="a" href={mapHref} variant="primary" className="mz-smb-btn" target="_blank" rel="noopener noreferrer">
        {t('cta.directions')}
      </Button>
    </div>
  );
};
