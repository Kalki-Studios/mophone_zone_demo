import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import { useData } from '../../data/DataContext';
import { PhoneCarousel } from '../../components/PhoneCarousel/PhoneCarousel';
import { buildWhatsappLink } from '../../lib/whatsapp';
import { FiSmartphone, FiBattery, FiZap, FiDroplet } from 'react-icons/fi';

/* ── Static sample phones shown in the "Latest & Greatest" grid ── */
const SAMPLE_PHONES = {
  New: [
    {
      id: 's1',
      name: 'Samsung Galaxy S24 FE',
      storage: '256 GB · 8 GB RAM',
      mrp: 54999,
      price: 44999,
      badge: 'Best Seller',
      img: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=600&auto=format&fit=crop',
    },
    {
      id: 's2',
      name: 'Apple iPhone 15',
      storage: '128 GB',
      mrp: 79900,
      price: 68999,
      badge: 'Hot Deal',
      img: 'https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?q=80&w=600&auto=format&fit=crop',
    },
    {
      id: 's3',
      name: 'OnePlus 12R',
      storage: '256 GB · 16 GB RAM',
      mrp: 42999,
      price: 36999,
      badge: null,
      img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600&auto=format&fit=crop',
    },
    {
      id: 's4',
      name: 'OPPO Reno 12 Pro',
      storage: '256 GB · 12 GB RAM',
      mrp: 36999,
      price: 30999,
      badge: 'New Arrival',
      img: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?q=80&w=600&auto=format&fit=crop',
    },
  ],
  Refurbished: [
    {
      id: 'r1',
      name: 'iPhone 13 Pro · Grade A',
      storage: '128 GB',
      mrp: 55000,
      price: 39999,
      badge: 'Grade A',
      img: 'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?q=80&w=600&auto=format&fit=crop',
    },
    {
      id: 'r2',
      name: 'Samsung Galaxy S22 · Grade A',
      storage: '128 GB · 8 GB RAM',
      mrp: 35000,
      price: 22999,
      badge: 'Grade A',
      img: 'https://images.unsplash.com/photo-1610945264803-c22b62d2a7b3?q=80&w=600&auto=format&fit=crop',
    },
    {
      id: 'r3',
      name: 'OnePlus 9 Pro · Grade B',
      storage: '128 GB · 8 GB RAM',
      mrp: 28000,
      price: 16999,
      badge: 'Grade B',
      img: 'https://images.unsplash.com/photo-1546054454-aa26e2b734c7?q=80&w=600&auto=format&fit=crop',
    },
    {
      id: 'r4',
      name: 'Pixel 7a · Grade A',
      storage: '128 GB',
      mrp: 32000,
      price: 21999,
      badge: 'Grade A',
      img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop',
    },
  ],
};

export default function Home() {
  const { shopInfo } = useData();
  const [activeTab, setActiveTab] = useState<'New' | 'Refurbished'>('New');

  const phones = SAMPLE_PHONES[activeTab];

  const discountPct = (mrp: number, price: number) =>
    Math.round(((mrp - price) / mrp) * 100);

  return (
    <div className="mz-page mz-home-samsung">

      {/* ── 1. Main Hero Carousel ── */}
      <section className="mz-samsung-hero-section">
        <PhoneCarousel />
      </section>

      {/* ── 2. Latest & Greatest ── */}
      <section className="mz-samsung-section">
        <h2 className="mz-samsung-section-title">Latest &amp; Greatest</h2>

        {/* Tabs — only New / Refurbished */}
        <div className="mz-samsung-tabs" role="tablist">
          {(['New', 'Refurbished'] as const).map(tab => (
            <button
              key={tab}
              role="tab"
              aria-selected={activeTab === tab}
              className={`mz-samsung-tab${activeTab === tab ? ' active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Product grid */}
        <div className="mz-samsung-product-grid" role="tabpanel">
          {phones.map(phone => (
            <div key={phone.id} className="mz-samsung-product-card">

              {/* Badge */}
              {phone.badge && (
                <span className="mz-product-badge">{phone.badge}</span>
              )}

              {/* Image */}
              <div className="mz-samsung-product-image">
                <img
                  src={phone.img}
                  alt={phone.name}
                  loading="lazy"
                  onError={e => {
                    e.currentTarget.src =
                      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=500&auto=format&fit=crop';
                  }}
                />
              </div>

              {/* Info */}
              <div className="mz-product-info">
                <h3 className="mz-samsung-product-title">{phone.name}</h3>
                <p className="mz-product-storage">{phone.storage}</p>

                {/* Pricing */}
                <div className="mz-product-pricing">
                  <span className="mz-product-price">
                    ₹{phone.price.toLocaleString('en-IN')}
                  </span>
                  <span className="mz-product-mrp">
                    ₹{phone.mrp.toLocaleString('en-IN')}
                  </span>
                  <span className="mz-product-discount">
                    {discountPct(phone.mrp, phone.price)}% off
                  </span>
                </div>

                {/* Actions */}
                <div className="mz-samsung-product-actions">
                  <a
                    href={buildWhatsappLink(
                      shopInfo.phones.primary,
                      `Hi, I want to buy ${phone.name}`
                    )}
                    className="mz-samsung-btn-primary"
                  >
                    Buy now
                  </a>
                  <a
                    href={buildWhatsappLink(
                      shopInfo.phones.primary,
                      `Hi, I want to know more about ${phone.name}`
                    )}
                    className="mz-samsung-btn-outline"
                  >
                    Learn more
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View all CTA */}
        <div className="mz-section-view-all">
          <Link to="/phones" className="mz-samsung-btn-outline">
            View all phones →
          </Link>
        </div>
      </section>

      {/* ── 3. Repair Banner ── */}
      <section className="mz-samsung-promo-banner">
        <div className="mz-samsung-promo-content">
          <h2>Your Trusted Local Store.<br />Sales &amp; Fast Repairs.</h2>
          <p>
            From the latest smartphones and premium accessories to expert repair services 
            done in under 60 minutes. We are Damanjodi's go-to destination for all things mobile.
          </p>

          {/* Quick service chips */}
          <ul className="mz-repair-chips">
            <li><FiSmartphone size={16} className="mz-chip-icon" /> Screen Replacement</li>
            <li><FiBattery size={16} className="mz-chip-icon" /> Battery Replacement</li>
            <li><FiZap size={16} className="mz-chip-icon" /> Charging Port</li>
            <li><FiDroplet size={16} className="mz-chip-icon" /> Water Damage</li>
          </ul>

          <div className="mz-samsung-promo-actions">
            <Link to="/repair" className="mz-samsung-btn-primary">View all services</Link>
            <a
              href={`tel:+${shopInfo.phones.primary}`}
              className="mz-samsung-btn-outline"
            >
              Enquire
            </a>
          </div>
        </div>
        <div className="mz-samsung-promo-image">
          <img
            src="https://images.unsplash.com/photo-1585771724684-38269d6639fd?q=80&w=1200&auto=format&fit=crop"
            alt="Technician repairing a smartphone screen"
          />
        </div>
      </section>

      {/* ── 4. Discover More ── */}
      <section className="mz-samsung-section">
        <h2 className="mz-samsung-section-title">Discover Mo PhoneZone</h2>
        <div className="mz-samsung-discover-grid">

          <div className="mz-samsung-discover-card">
            <img
              src="https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?q=80&w=800&auto=format&fit=crop"
              alt="Accessories"
            />
            <div className="mz-samsung-discover-info">
              <h3>Premium Accessories</h3>
              <p>Cases, chargers, and more.</p>
              <Link to="/accessories" className="mz-samsung-link">Shop now</Link>
            </div>
          </div>

          <div className="mz-samsung-discover-card">
            <img
              src="https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?q=80&w=800&auto=format&fit=crop"
              alt="Sell your phone"
            />
            <div className="mz-samsung-discover-info">
              <h3>Sell Your Device</h3>
              <p>Get the best value for your old phone.</p>
              <a
                href={buildWhatsappLink(shopInfo.phones.primary, 'Hi, I want to sell my phone.')}
                className="mz-samsung-link"
              >
                Get quote
              </a>
            </div>
          </div>

          <div className="mz-samsung-discover-card">
            <img
              src="https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?q=80&w=800&auto=format&fit=crop"
              alt="Store Visit"
            />
            <div className="mz-samsung-discover-info">
              <h3>Visit Our Store</h3>
              <p>Experience the latest devices in person.</p>
              <a
                href="https://maps.app.goo.gl/QzMpto9oU3TcisU6A"
                target="_blank"
                rel="noreferrer"
                className="mz-samsung-link"
              >
                Get directions
              </a>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
