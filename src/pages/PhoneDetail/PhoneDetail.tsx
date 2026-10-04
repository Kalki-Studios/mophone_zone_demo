import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './PhoneDetail.css';
import { useData } from '../../data/DataContext';
import { useLanguage } from '../../i18n';
import { Img } from '../../components/Img/Img';
import { SoldStamp } from '../../components/SoldStamp/SoldStamp';
import { GradeMark } from '../../components/GradeMark/GradeMark';
import { Button } from '../../components/Button/Button';
import { PriceTagCard } from '../../components/PriceTagCard/PriceTagCard';
import { formatPrice } from '../../lib/format';
import { buildWhatsappLink } from '../../lib/whatsapp';
import { GRADE_HELP } from '../../config/shop';
import { ChevronIcon } from '../../components/icons';

export default function PhoneDetail() {
  const { id } = useParams<{ id: string }>();
  const { phones, shopInfo } = useData();
  const { t } = useLanguage();

  const phone = phones.find(p => p.id === id);

  if (!phone) {
    return (
      <div className="mz-page mz-container mz-not-found">
        <h2>{t('notfound.title')}</h2>
        <p>{t('notfound.body')}</p>
        <div style={{ marginTop: '24px', display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <Link to="/phones" className="mz-btn mz-btn-primary">
            {t('nav.phones')}
          </Link>
          <Button 
            as="a" 
            href={buildWhatsappLink(shopInfo.whatsappNumber, "Hello Mo PhoneZone, I have a question.")}
            variant="whatsapp"
          >
            {t('cta.whatsapp')}
          </Button>
        </div>
      </div>
    );
  }

  const isSold = phone.status === 'sold';
  const specs = [phone.ram, phone.storage].filter(Boolean).join(' / ');

  let conditionText = '';
  switch (phone.condition) {
    case 'new': conditionText = t('phones.new'); break;
    case 'refurbished': conditionText = t('phones.refurbished'); break;
    case 'second-hand': conditionText = t('phones.secondHand'); break;
  }

  const whatsappMsg = isSold 
    ? t('cta.askSimilar').replace('{brand}', phone.brand).replace('{model}', phone.model)
    : `Hello Mo PhoneZone, I'm interested in ${phone.brand} ${phone.model}${specs ? ` (${specs})` : ''} (${formatPrice(phone.price)}). Is it available?`;

  const whatsappUrl = buildWhatsappLink(shopInfo.whatsappNumber, whatsappMsg);
  const phoneHref = `tel:+${shopInfo.phones.primary}`;

  // Find up to 4 more phones (same condition preferred, not sold, excluding current)
  const morePhones = [...phones]
    .filter(p => p.id !== phone.id && p.status !== 'sold')
    .sort((a, b) => {
      if (a.condition === phone.condition && b.condition !== phone.condition) return -1;
      if (a.condition !== phone.condition && b.condition === phone.condition) return 1;
      return 0;
    })
    .slice(0, 4);

  return (
    <div className="mz-page">
      <div className="mz-container">
        
        <div className="mz-breadcrumb">
          <Link to="/phones">{t('nav.phones')}</Link>
          <ChevronIcon width="16" height="16" />
          <span>{phone.brand} {phone.model}</span>
        </div>

        <div className="mz-pd-grid">
          <div className="mz-pd-gallery">
            <div className="mz-pd-main-img">
              <Img 
                src={phone.photos[0] || ''} 
                alt={`${phone.brand} ${phone.model}`} 
                width="100%" 
                height="100%" 
                slotName={`phone-${phone.id}-main`}
                className={`mz-pd-img ${isSold ? 'is-sold' : ''}`}
              />
              {isSold && (
                <div className="mz-pd-sold-overlay">
                  <SoldStamp />
                </div>
              )}
            </div>
            {phone.photos.length > 1 && (
              <div className="mz-pd-thumbnails">
                {phone.photos.slice(1, 4).map((photo, i) => (
                  <div key={i} className="mz-pd-thumb">
                    <Img 
                      src={photo} 
                      alt="" 
                      width="100%" 
                      height="100%" 
                      className={`mz-pd-img ${isSold ? 'is-sold' : ''}`}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mz-pd-info">
            <div className="mz-pd-kicker">{phone.brand}</div>
            <h1 className="mz-pd-h1">{phone.model}</h1>
            
            <div className={`mz-pd-price-sticker ${isSold ? 'is-sold' : ''}`}>
              {formatPrice(phone.price)}
            </div>

            <div className="mz-pd-specs-list">
              <div className="mz-pd-spec-row">
                <span className="mz-pd-spec-label">RAM / Storage</span>
                <span className="mz-pd-spec-value">{specs || 'N/A'}</span>
              </div>
              <div className="mz-pd-spec-row">
                <span className="mz-pd-spec-label">Condition</span>
                <span className="mz-pd-spec-value mz-pd-cond-val">
                  {conditionText}
                  {phone.grade && (
                    <>
                      <GradeMark grade={phone.grade} />
                      <span className="mz-pd-grade-help">{GRADE_HELP[phone.grade]}</span>
                    </>
                  )}
                </span>
              </div>
              {phone.warranty && (
                <div className="mz-pd-spec-row">
                  <span className="mz-pd-spec-label">Warranty</span>
                  <span className="mz-pd-spec-value">{phone.warranty}</span>
                </div>
              )}
              {phone.notes && (
                <div className="mz-pd-spec-row">
                  <span className="mz-pd-spec-label">Notes</span>
                  <span className="mz-pd-spec-value">{phone.notes}</span>
                </div>
              )}
            </div>

            <div className="mz-pd-actions">
              <Button as="a" href={whatsappUrl} variant="whatsapp" className="mz-full-width" target="_blank" rel="noopener noreferrer">
                {isSold ? t('cta.askSimilar') : t('cta.askWhatsapp')}
              </Button>
              <Button as="a" href={phoneHref} variant="outline" className="mz-full-width">
                {t('cta.callShop')}
              </Button>
            </div>
          </div>
        </div>

        {morePhones.length > 0 && (
          <div className="mz-pd-more">
            <h2 className="mz-pd-more-title">{t('phones.moreLikeThis')}</h2>
            <div className="mz-phone-grid">
              {morePhones.map(p => (
                <PriceTagCard key={p.id} phone={p} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
