import React, { useState } from 'react';
import { useData } from '../../data/DataContext';
import { buildWhatsappLink } from '../../lib/whatsapp';
import './Accessories.css';

/* ─── Static accessory catalogue ─── */
const CATEGORIES = [
  'All',
  'Cases & Covers',
  'Audio',
  'Charging',
  'Wearables',
  'Screen Protection',
  'Cables & Adapters',
  'Power Banks',
] as const;

type Category = (typeof CATEGORIES)[number];

interface AccessoryItem {
  id: string;
  name: string;
  tagline: string;
  category: Exclude<Category, 'All'>;
  price: number;
  mrp?: number;
  badge?: string;
  img: string;
}

const ACCESSORIES: AccessoryItem[] = [
  /* ── Cases & Covers ── */
  {
    id: 'c1',
    name: 'Transparent Slim Case',
    tagline: 'Ultra-clear, scratch-resistant',
    category: 'Cases & Covers',
    price: 199,
    mrp: 499,
    badge: 'Best Seller',
    img: 'https://images.unsplash.com/photo-1603313011101-320f26a4f6f6?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'c2',
    name: 'Leather Flip Cover',
    tagline: 'Premium PU leather, card slots',
    category: 'Cases & Covers',
    price: 399,
    mrp: 899,
    img: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'c3',
    name: 'Military-Grade Bumper Case',
    tagline: 'Drop protection up to 2m',
    category: 'Cases & Covers',
    price: 599,
    mrp: 1299,
    badge: 'Top Rated',
    img: 'https://images.unsplash.com/photo-1571903686793-a9059bd1b1a9?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'c4',
    name: 'Magsafe Wallet Case',
    tagline: 'Magnetic attach, 3-card holder',
    category: 'Cases & Covers',
    price: 799,
    mrp: 1799,
    img: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?q=80&w=600&auto=format&fit=crop',
  },

  /* ── Audio ── */
  {
    id: 'a1',
    name: 'Wireless Earbuds Pro',
    tagline: 'ANC · 30 hrs battery · IPX5',
    category: 'Audio',
    price: 1499,
    mrp: 3499,
    badge: 'Hot Deal',
    img: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'a2',
    name: 'Over-Ear Headphones',
    tagline: 'Hi-Fi sound · Foldable design',
    category: 'Audio',
    price: 2499,
    mrp: 5999,
    img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'a3',
    name: 'Neckband Earphones',
    tagline: 'Bluetooth 5.3 · Magnetic snap',
    category: 'Audio',
    price: 699,
    mrp: 1499,
    img: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'a4',
    name: 'Wired Type-C Earphones',
    tagline: 'High-res audio · Built-in mic',
    category: 'Audio',
    price: 299,
    mrp: 699,
    badge: 'Value Pick',
    img: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?q=80&w=600&auto=format&fit=crop',
  },

  /* ── Charging ── */
  {
    id: 'ch1',
    name: '65W GaN Charger',
    tagline: 'Charge 3 devices at once',
    category: 'Charging',
    price: 1299,
    mrp: 2499,
    badge: 'New Arrival',
    img: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'ch2',
    name: '15W Wireless Charger',
    tagline: 'Qi2 compatible, LED indicator',
    category: 'Charging',
    price: 799,
    mrp: 1799,
    img: 'https://images.unsplash.com/photo-1583394293214-8b483f18e61d?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'ch3',
    name: '25W Fast Charger Adapter',
    tagline: 'USB-C PD, compact design',
    category: 'Charging',
    price: 499,
    mrp: 999,
    img: 'https://images.unsplash.com/photo-1562408590-e32931084e23?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'ch4',
    name: 'Car Fast Charger',
    tagline: '30W dual-port, USB-A + C',
    category: 'Charging',
    price: 399,
    mrp: 899,
    img: 'https://images.unsplash.com/photo-1601972602237-8c79241e468b?q=80&w=600&auto=format&fit=crop',
  },

  /* ── Wearables ── */
  {
    id: 'w1',
    name: 'Smart Watch Series 5',
    tagline: 'Health tracking · AMOLED · 7-day battery',
    category: 'Wearables',
    price: 3999,
    mrp: 7999,
    badge: 'Popular',
    img: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'w2',
    name: 'Fitness Band Ultra',
    tagline: 'SpO2 · HR · 14 sport modes',
    category: 'Wearables',
    price: 1499,
    mrp: 2999,
    img: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'w3',
    name: 'Smart Watch Lite',
    tagline: 'Budget-friendly, 5-day battery',
    category: 'Wearables',
    price: 1999,
    mrp: 3499,
    badge: 'Value Pick',
    img: 'https://images.unsplash.com/photo-1617625802912-cde586faf749?q=80&w=600&auto=format&fit=crop',
  },

  /* ── Screen Protection ── */
  {
    id: 'sp1',
    name: 'Tempered Glass Guard',
    tagline: '9H hardness, case-friendly',
    category: 'Screen Protection',
    price: 99,
    mrp: 299,
    badge: 'Best Seller',
    img: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'sp2',
    name: 'Matte Anti-Glare Film',
    tagline: 'Fingerprint-free, smooth touch',
    category: 'Screen Protection',
    price: 149,
    mrp: 399,
    img: 'https://images.unsplash.com/photo-1592890288564-76628a30a657?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'sp3',
    name: 'UV Privacy Screen Guard',
    tagline: '180° privacy, full coverage',
    category: 'Screen Protection',
    price: 249,
    mrp: 599,
    img: 'https://images.unsplash.com/photo-1629853904944-7f154dbce57a?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'sp4',
    name: 'Camera Lens Protector',
    tagline: 'Scratch-proof optical glass',
    category: 'Screen Protection',
    price: 79,
    mrp: 199,
    img: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=600&auto=format&fit=crop',
  },

  /* ── Cables & Adapters ── */
  {
    id: 'ca1',
    name: '120W USB-C Braided Cable',
    tagline: '1.5m, fast charge & data',
    category: 'Cables & Adapters',
    price: 299,
    mrp: 699,
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'ca2',
    name: 'USB-C to 3.5mm Adapter',
    tagline: 'Hi-res audio pass-through',
    category: 'Cables & Adapters',
    price: 149,
    mrp: 349,
    img: 'https://images.unsplash.com/photo-1606229365485-93a3b8ee0385?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'ca3',
    name: 'OTG Adapter (USB-C)',
    tagline: 'Connect drives, keyboards & more',
    category: 'Cables & Adapters',
    price: 99,
    mrp: 249,
    badge: 'Value Pick',
    img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop',
  },

  /* ── Power Banks ── */
  {
    id: 'pb1',
    name: '20000 mAh Power Bank',
    tagline: '65W PD, charges laptops too',
    category: 'Power Banks',
    price: 2499,
    mrp: 4999,
    badge: 'Top Rated',
    img: 'https://images.unsplash.com/photo-1620428268482-cf1851a36764?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'pb2',
    name: '10000 mAh Slim Power Bank',
    tagline: '22.5W, pocket-friendly size',
    category: 'Power Banks',
    price: 1299,
    mrp: 2499,
    badge: 'Best Seller',
    img: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'pb3',
    name: '5000 mAh MagSafe Bank',
    tagline: 'Wireless + wired charge',
    category: 'Power Banks',
    price: 1799,
    mrp: 3499,
    img: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?q=80&w=600&auto=format&fit=crop',
  },
];

/* ─── Helper ─── */
const discountPct = (mrp: number, price: number) =>
  Math.round(((mrp - price) / mrp) * 100);

export default function Accessories() {
  const { shopInfo } = useData();
  const [activeCategory, setActiveCategory] = useState<Category>('All');

  const filtered =
    activeCategory === 'All'
      ? ACCESSORIES
      : ACCESSORIES.filter((a) => a.category === activeCategory);

  return (
    <div className="mz-page mz-accessories-page">
      {/* ── Header ── */}
      <div className="mz-accessories-header">
        <p className="mz-section-eyebrow">Enhance your experience</p>
        <h1 className="mz-accessories-title">Premium Accessories</h1>
        <p className="mz-accessories-subtitle">
          Find the perfect companion for your device. High-quality cases, audio,
          chargers&nbsp;&amp;&nbsp;more — all available in&nbsp;store.
        </p>
      </div>

      <div className="mz-accessories-container">
        {/* ── Category Tabs ── */}
        <div className="mz-accessories-tabs-wrapper">
          <div className="mz-accessories-tabs" role="tablist">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={activeCategory === cat}
                className={`mz-acc-tab${activeCategory === cat ? ' active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ── Results count ── */}
        <p className="mz-acc-results">
          {filtered.length} item{filtered.length !== 1 ? 's' : ''}
        </p>

        {/* ── Product Grid ── */}
        <div className="mz-accessories-grid">
          {filtered.map((item) => {
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
