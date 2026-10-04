import React from 'react';
import { Link } from 'react-router-dom';
import './PriceTagCard.css';
import type { Phone } from '../../data/types';
import { useLanguage } from '../../i18n';
import { formatPrice } from '../../lib/format';
import { buildWhatsappLink } from '../../lib/whatsapp';
import { useData } from '../../data/DataContext';

interface PriceTagCardProps {
  phone: Phone;
}

function discountPct(mrp: number | undefined, price: number): string {
  if (!mrp || mrp <= price) return '0';
  return Math.round(((mrp - price) / mrp) * 100).toString();
}

export const PriceTagCard = ({ phone }: PriceTagCardProps) => {
  const { t } = useLanguage();
  const { shopInfo } = useData();

  const isSold = phone.status === 'sold';
  
  // Calculate if it was added recently (within 14 days)
  const addedDate = new Date(phone.addedAt);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - addedDate.getTime()) / (1000 * 3600 * 24));
  const isNew = phone.condition === 'new' && diffDays <= 14;

  const specs = [phone.ram, phone.storage].filter(Boolean).join(' / ');

  const whatsappMsg = isSold 
    ? t('cta.askSimilar').replace('{brand}', phone.brand).replace('{model}', phone.model)
    : `Hi, I want to buy ${phone.brand} ${phone.model}`;
    
  const whatsappUrl = buildWhatsappLink(shopInfo.whatsappNumber, whatsappMsg);

  const badgeText = isSold ? 'SOLD' : (isNew ? 'NEW' : null);

  return (
    <div className={`mz-samsung-card ${isSold ? 'is-sold' : ''}`}>
      {badgeText && (
        <span className="mz-samsung-card-badge">{badgeText}</span>
      )}
      
      <Link to={`/phones/${phone.id}`} className="mz-samsung-card-image">
        <img
          src={phone.photos[0] || ''}
          alt={`${phone.brand} ${phone.model}`}
          loading="lazy"
          onError={e => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=500&auto=format&fit=crop';
          }}
        />
      </Link>

      <div className="mz-samsung-card-info">
        <h3 className="mz-samsung-card-title">{phone.brand} {phone.model}</h3>
        <p className="mz-samsung-card-specs">{specs}</p>

        <div className="mz-samsung-card-pricing">
          <span className="mz-samsung-card-price">{formatPrice(phone.price)}</span>
          {phone.mrp && phone.mrp > phone.price && (
            <>
              <span className="mz-samsung-card-mrp">{formatPrice(phone.mrp)}</span>
              <span className="mz-samsung-card-discount">{discountPct(phone.mrp, phone.price)}% off</span>
            </>
          )}
        </div>

        <div className="mz-samsung-card-actions">
          <a
            href={whatsappUrl}
            className="mz-samsung-btn-primary"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            {isSold ? 'Ask for similar' : 'Buy now'}
          </a>
          <Link
            to={`/phones/${phone.id}`}
            className="mz-samsung-btn-outline"
          >
            Learn more
          </Link>
        </div>
      </div>
    </div>
  );
};
