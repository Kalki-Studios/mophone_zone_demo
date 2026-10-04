import React from 'react';
import './RateCard.css';
import type { RepairItem } from '../../data/types';
import { formatPrice } from '../../lib/format';

interface RateCardProps {
  items: RepairItem[];
}

export const RateCard = ({ items }: RateCardProps) => {
  return (
    <div className="mz-rate-card">
      <dl className="mz-rate-list">
        {items.map((item) => (
          <div key={item.id} className="mz-rate-row">
            <dt className="mz-rate-service">
              <span className="mz-rs-name">{item.service}</span>
              {item.timeNote && <span className="mz-rs-note">{item.timeNote}</span>}
            </dt>
            <div className="mz-rate-leader"></div>
            <dd className="mz-rate-price">from {formatPrice(item.priceFrom)}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
};
