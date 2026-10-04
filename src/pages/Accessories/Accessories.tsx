import React from 'react';
import { useData } from '../../data/DataContext';
import { buildWhatsappLink } from '../../lib/whatsapp';
import './Accessories.css';

/* ─── Static accessory catalogue ─── */
const ACCESSORIES = [
  {
    id: 'c1',
    name: 'Transparent Slim Case',
    tagline: 'Ultra-clear, scratch-resistant',
    price: 199,
    mrp: 499,
    badge: 'Best Seller',
    img: 'https://images.unsplash.com/photo-1603313011101-320f26a4f6f6?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'a1',
    name: 'Wireless Earbuds Pro',
    tagline: 'ANC · 30 hrs battery · IPX5',
    price: 1499,
    mrp: 3499,
    badge: 'Hot Deal',
    img: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'ch1',
    name: '65W GaN Charger',
    tagline: 'Charge 3 devices at once',
    price: 1299,
    mrp: 2499,
    badge: 'New Arrival',
    img: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'w1',
    name: 'Smart Watch Series 5',
    tagline: 'Health tracking · AMOLED',
    price: 3999,
    mrp: 7999,
    badge: 'Popular',
    img: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'sp1',
    name: 'Tempered Glass Guard',
    tagline: '9H hardness, case-friendly',
    price: 99,
    mrp: 299,
    badge: 'Best Seller',
    img: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?q=80&w=600&auto=format&fit=crop',
  }
];

/* ─── Helper ─── */
const discountPct = (mrp: number, price: number) =>
  Math.round(((mrp - price) / mrp) * 100);

export default function Accessories() {
  const { shopInfo } = useData();

  return (
    <div className="mz-page mz-accessories-page">
      {/* ── Header ── */}
      <div className="mz-accessories-header">
        <h1 className="mz-accessories-title">Premium Accessories</h1>
        <p className="mz-accessories-subtitle">
          Find the perfect companion for your device. High-quality cases, audio,
          chargers&nbsp;&amp;&nbsp;more — all available in&nbsp;store.
        </p>
      </div>

      <div className="mz-accessories-container">
        {/* ── Product Grid ── */}
        <div className="mz-accessories-grid">
          {ACCESSORIES.map((item) => {
            const whatsappMsg = `Hi Mo PhoneZone! I'm interested in the "${item.name}" — is it available?`;
            const whatsappUrl = buildWhatsappLink(shopInfo.whatsappNumber, whatsappMsg);
            const hasDiscount = item.mrp && item.mrp > item.price;

            return (
              <div key={item.id} className="mz-samsung-product-card mz-acc-card">
                {item.badge && (
                  <span className="mz-product-badge">{item.badge}</span>
                )}

                <div className="mz-samsung-product-image">
                  <img src={item.img} alt={item.name} loading="lazy" />
                </div>

                <div className="mz-product-info">
                  <h2 className="mz-samsung-product-title">{item.name}</h2>
                  <p className="mz-product-storage">{item.tagline}</p>

                  <div className="mz-product-pricing">
                    <span className="mz-product-price">
                      ₹{item.price.toLocaleString('en-IN')}
                    </span>
                    {hasDiscount && (
                      <>
                        <span className="mz-product-mrp">
                          ₹{item.mrp!.toLocaleString('en-IN')}
                        </span>
                        <span className="mz-product-discount">
                          {discountPct(item.mrp!, item.price)}% off
                        </span>
                      </>
                    )}
                  </div>

                  <div className="mz-samsung-product-actions">
                    <a
                      href={whatsappUrl}
                      className="mz-samsung-btn-primary"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Buy Now
                    </a>
                    <a
                      href={whatsappUrl}
                      className="mz-samsung-btn-outline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Ask us
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── CTA Banner ── */}
        <div className="mz-acc-cta-banner">
          <div className="mz-acc-cta-text">
            <h2>Can't find what you need?</h2>
            <p>
              We stock hundreds more items in-store. Message us on WhatsApp and
              we'll check availability for you instantly.
            </p>
          </div>
          <a
            href={buildWhatsappLink(
              shopInfo.whatsappNumber,
              "Hi! I'm looking for a specific accessory. Can you help?"
            )}
            className="mz-samsung-btn-primary"
            target="_blank"
            rel="noreferrer"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
