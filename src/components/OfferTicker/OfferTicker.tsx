import React, { useState } from 'react';
import { useData } from '../../data/DataContext';
import './OfferTicker.css';

/* ── static bank offers that always show ──────────────────────────────── */
const BANK_OFFERS = [
  {
    id: 'hdfc',
    label: 'Up to 10% NeuCoins',
    banks: [{ name: 'HDFC Bank', color: '#004C8F' }],
  },
  {
    id: 'cards',
    label: 'Up to ₹7,000 Instant Cashback*',
    banks: [
      { name: 'Axis Bank', color: '#97144D' },
      { name: 'ICICI Bank', color: '#B02A30' },
      { name: 'SBI Card', color: '#003399' },
    ],
  },
  {
    id: 'emi',
    label: 'No-Cost EMI available',
    banks: [{ name: 'All major cards', color: '#1A1A2E' }],
  },
];

export const OfferTicker: React.FC = () => {
  const { offers } = useData();

  const activeOffers = offers.filter(o => {
    if (!o.active) return false;
    if (o.endsAt && new Date(o.endsAt) < new Date()) return false;
    return true;
  });

  /* Build the slide list: bank offers first, then dynamic store offers */
  const slides = [
    ...BANK_OFFERS.map(b => ({ type: 'bank' as const, data: b })),
    ...activeOffers.map(o => ({ type: 'store' as const, data: o })),
  ];

  /* Duplicate for seamless looping */
  const doubled = [...slides, ...slides];

  const [paused, setPaused] = useState(false);

  return (
    <div
      className="mz-ticker"
      aria-label="Current offers and promotions"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Gradient fade edges */}
      <div className="mz-ticker-fade mz-ticker-fade--left" aria-hidden="true" />
      <div className="mz-ticker-fade mz-ticker-fade--right" aria-hidden="true" />

      <div
        className={`mz-ticker-track${paused ? ' mz-ticker-track--paused' : ''}`}
      >
        {doubled.map((slide, idx) =>
          slide.type === 'bank' ? (
            <BankSlide key={`${slide.data.id}-${idx}`} item={slide.data} />
          ) : (
            <StoreSlide key={`${(slide.data as any).id}-${idx}`} item={slide.data as any} />
          )
        )}
      </div>
    </div>
  );
};

/* ── Bank offer slide ─────────────────────────────────────────────────── */
const BankSlide: React.FC<{ item: (typeof BANK_OFFERS)[number] }> = ({ item }) => (
  <div className="mz-ticker-slide">
    <span className="mz-ticker-label">{item.label}</span>
    <span className="mz-ticker-prep">on</span>
    <span className="mz-ticker-banks">
      {item.banks.map(b => (
        <span
          key={b.name}
          className="mz-ticker-bank-pill"
          style={{ '--pill-color': b.color } as React.CSSProperties}
        >
          {b.name}
        </span>
      ))}
    </span>
    <span className="mz-ticker-sep" aria-hidden="true">·</span>
  </div>
);

/* ── Store offer slide ────────────────────────────────────────────────── */
const StoreSlide: React.FC<{ item: { id: string; title: string; description: string } }> = ({ item }) => (
  <div className="mz-ticker-slide">
    <span className="mz-ticker-store-badge" aria-hidden="true">✦ Offer</span>
    <span className="mz-ticker-label">{item.title}</span>
    <span className="mz-ticker-sep" aria-hidden="true">·</span>
  </div>
);
