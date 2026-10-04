import React from 'react';
import './OfferSticker.css';
import type { Offer } from '../../data/types';

interface OfferStickerProps {
  offer: Offer;
  index: number;
}

export const OfferSticker = ({ offer, index }: OfferStickerProps) => {
  if (!offer.active) return null;
  
  if (offer.endsAt) {
    const end = new Date(offer.endsAt);
    if (end < new Date()) {
      return null; // expired
    }
  }

  // Alternate rotation: -1.5deg or 1deg
  const rotationClass = index % 2 === 0 ? 'mz-rot-left' : 'mz-rot-right';

  let endsText = '';
  if (offer.endsAt) {
    const end = new Date(offer.endsAt);
    const dateFormatted = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short' }).format(end);
    endsText = `Ends ${dateFormatted}`;
  }

  return (
    <div className={`mz-offer-sticker ${rotationClass}`}>
      <h3 className="mz-offer-title">{offer.title}</h3>
      <p className="mz-offer-desc">{offer.description}</p>
      {endsText && <div className="mz-offer-ends">{endsText}</div>}
    </div>
  );
};
