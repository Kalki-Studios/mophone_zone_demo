import React, { useState } from 'react';
import { useData } from '../../data/DataContext';
import { buildWhatsappLink } from '../../lib/whatsapp';
import './Repair.css';

/* ─── Static repair services ─── */
const REPAIR_SERVICES = [
  {
    id: 'screen',
    icon: '📱',
    title: 'Screen Replacement',
    desc: 'Cracked or unresponsive display? We replace with OEM-grade panels for crystal-clear visuals.',
    priceFrom: 799,
    time: '30–60 min',
    badge: 'Most Common',
  },
  {
    id: 'battery',
    icon: '🔋',
    title: 'Battery Replacement',
    desc: 'Poor battery life or unexpected shutdowns? Genuine-capacity cells, proper calibration.',
    priceFrom: 499,
    time: '20–40 min',
    badge: null,
  },
  {
    id: 'charging',
    icon: '🔌',
    title: 'Charging Port Repair',
    desc: 'Loose connector or no charging? We clean or replace the port to restore full power.',
    priceFrom: 299,
    time: '20–30 min',
    badge: null,
  },
  {
    id: 'water',
    icon: '💧',
    title: 'Water Damage Recovery',
    desc: 'Dropped in water? Bring it in immediately. Ultrasonic cleaning + board-level repair.',
    priceFrom: 999,
    time: '2–24 hrs',
    badge: 'Expert Care',
  },
  {
    id: 'camera',
    icon: '📷',
    title: 'Camera Repair',
    desc: 'Blurry images, black screen, or cracked lens? Full front and rear camera module replacement.',
    priceFrom: 599,
    time: '45–90 min',
    badge: null,
  },
  {
    id: 'speaker',
    icon: '🔊',
    title: 'Speaker / Mic Repair',
    desc: 'No sound or muffled audio during calls? We replace earpiece, loudspeaker, or microphone.',
    priceFrom: 349,
    time: '30–60 min',
    badge: null,
  },
  {
    id: 'software',
    icon: '🖥️',
    title: 'Software & Flashing',
    desc: 'Stuck in boot loop, factory reset, or software update issues? Fast firmware flashing.',
    priceFrom: 199,
    time: '30–60 min',
    badge: null,
  },
  {
    id: 'back',
    icon: '🛡️',
    title: 'Back Panel Replacement',
    desc: 'Cracked glass back? We replace it to restore your phone\'s premium look and feel.',
    priceFrom: 399,
    time: '30–45 min',
    badge: null,
  },
];

const BRANDS = [
  { name: 'Samsung', icon: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg' },
  { name: 'Apple', icon: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
  { name: 'OnePlus', icon: 'https://upload.wikimedia.org/wikipedia/commons/8/87/OnePlus_Logo.svg' },
  { name: 'Redmi', icon: 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Xiaomi_logo_%282021-%29.svg' },
  { name: 'realme', icon: 'https://upload.wikimedia.org/wikipedia/commons/f/f2/Realme_logo.svg' },
  { name: 'OPPO', icon: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/OPPO_LOGO_2019.svg' },
  { name: 'vivo', icon: 'https://upload.wikimedia.org/wikipedia/commons/5/50/Vivo_logo_2019.svg' },
  { name: 'Motorola', icon: 'https://upload.wikimedia.org/wikipedia/commons/6/6c/Motorola_logo_2013.svg' },
];

const WHY_US = [
  { icon: '⚡', title: 'Same-Day Service', desc: 'Most repairs done in under 60 minutes while you wait.' },
  { icon: '🔩', title: 'Genuine Parts', desc: 'OEM-grade components for lasting quality you can trust.' },
  { icon: '🛡️', title: '30-Day Warranty', desc: 'All repairs backed by our service warranty — no questions asked.' },
  { icon: '💰', title: 'Transparent Pricing', desc: 'No hidden costs. Get a free quote before we start anything.' },
];

export default function Repair() {
  const { shopInfo } = useData();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const quoteLink = buildWhatsappLink(
    shopInfo.whatsappNumber,
    "Hi Mo PhoneZone! I need a repair quote for my phone."
  );

  return (
    <div className="mz-page mz-repair-page">

      {/* ── 1. Hero ── */}
      <section className="mz-repair-hero">
        <div className="mz-repair-hero-content">
          <p className="mz-section-eyebrow">Expert technicians · Same-day service</p>
          <h1 className="mz-repair-hero-title">
            We Fix Phones.<br />Fast &amp; Right.
          </h1>
          <p className="mz-repair-hero-sub">
            Screen, battery, water damage, software — if it's broken, we can fix it.
            Bring your device in or chat with us to get a free quote.
          </p>
          <div className="mz-repair-hero-actions">
            <a href={quoteLink} className="mz-samsung-btn-primary" target="_blank" rel="noreferrer">
              Get a Free Quote
            </a>
            <a href={`tel:${shopInfo.phones.primary}`} className="mz-samsung-btn-outline">
              Call Us Now
            </a>
          </div>
          <div className="mz-repair-trust-pills">
            <span>⚡ 60-min turnaround</span>
            <span>🔩 Genuine parts</span>
            <span>🛡️ 30-day warranty</span>
          </div>
        </div>
        <div className="mz-repair-hero-image">
          <img
            src="https://images.unsplash.com/photo-1585771724684-38269d6639fd?q=80&w=900&auto=format&fit=crop"
            alt="Technician repairing a smartphone"
          />
        </div>
      </section>

      {/* ── 2. Why Us ── */}
      <section className="mz-repair-why-section">
        <div className="mz-repair-why-grid">
          {WHY_US.map((w) => (
            <div key={w.title} className="mz-repair-why-card">
              <span className="mz-repair-why-icon">{w.icon}</span>
              <h3>{w.title}</h3>
              <p>{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. Services ── */}
      <section className="mz-repair-services-section">
        <div className="mz-repair-services-inner">
          <p className="mz-section-eyebrow">What we fix</p>
          <h2 className="mz-samsung-section-title">Our Repair Services</h2>

          <div className="mz-repair-services-grid">
            {REPAIR_SERVICES.map((svc) => (
              <div key={svc.id} className="mz-repair-service-card">
                {svc.badge && (
                  <span className="mz-product-badge">{svc.badge}</span>
                )}
                <div className="mz-repair-svc-icon">{svc.icon}</div>
                <h3>{svc.title}</h3>
                <p>{svc.desc}</p>
                <div className="mz-repair-svc-meta">
                  <span className="mz-repair-svc-price">
                    From ₹{svc.priceFrom.toLocaleString('en-IN')}
                  </span>
                  <span className="mz-repair-svc-time">⏱ {svc.time}</span>
                </div>
                <a
                  href={buildWhatsappLink(shopInfo.whatsappNumber, `Hi! I need a quote for: ${svc.title}`)}
                  className="mz-samsung-btn-outline mz-repair-svc-btn"
                  target="_blank"
                  rel="noreferrer"
                >
                  Get Quote
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Supported Brands ── */}
      <section className="mz-repair-brands-section">
        <div className="mz-repair-brands-inner">
          <p className="mz-section-eyebrow">Compatible with all major brands</p>
          <h2 className="mz-samsung-section-title">We Repair All Brands</h2>
          <div className="mz-repair-brands-grid">
            {BRANDS.map((b) => (
              <div key={b.name} className="mz-repair-brand-chip">
                <img src={b.icon} alt={b.name} />
                <span>{b.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. How It Works ── */}
      <section className="mz-repair-how-section">
        <div className="mz-repair-how-inner">
          <p className="mz-section-eyebrow">Simple process</p>
          <h2 className="mz-samsung-section-title">How It Works</h2>
          <div className="mz-repair-steps">
            {[
              { num: '01', title: 'Bring In Your Device', desc: 'Walk in to our store on Main Road, Damanjodi — no appointment needed.' },
              { num: '02', title: 'Free Diagnosis', desc: 'Our technician inspects your phone and gives you a transparent quote in minutes.' },
              { num: '03', title: 'We Fix It', desc: 'Approved? We get to work. Most repairs done in under 60 minutes.' },
              { num: '04', title: 'Pick It Up', desc: 'Your phone, good as new. Backed by our 30-day service warranty.' },
            ].map((step) => (
              <div key={step.num} className="mz-repair-step">
                <div className="mz-repair-step-num">{step.num}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. FAQ ── */}
      <section className="mz-repair-faq-section">
        <div className="mz-repair-faq-inner">
          <p className="mz-section-eyebrow">Got questions?</p>
          <h2 className="mz-samsung-section-title">Frequently Asked</h2>
          <div className="mz-repair-faq-list">
            {[
              { q: 'Do I need to book an appointment?', a: 'No! Just walk in to our store. We serve customers on a first-come, first-served basis. For urgent or complex repairs, you can WhatsApp us in advance.' },
              { q: 'Do you use original parts?', a: 'We use OEM-grade (Original Equipment Manufacturer) quality parts. For specific premium brands, we can also source genuine parts on request.' },
              { q: 'What if my repair takes more than a day?', a: 'If your repair requires special parts or extended work (like severe water damage), we\'ll give you a clear timeline upfront and keep you updated via WhatsApp.' },
              { q: 'Is there a warranty on the repair?', a: 'Yes! All repairs come with a 30-day service warranty. If the same issue recurs within 30 days, we fix it free of charge.' },
              { q: 'Will I lose my data during repair?', a: 'Most repairs (screen, battery, charging port) do not affect your data. For software repairs or board-level work, we\'ll inform you upfront and recommend a backup.' },
            ].map((faq, i) => (
              <div
                key={i}
                className={`mz-repair-faq-item${openFaq === i ? ' open' : ''}`}
              >
                <button
                  className="mz-repair-faq-q"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span>{faq.q}</span>
                  <span className="mz-repair-faq-icon">{openFaq === i ? '−' : '+'}</span>
                </button>
                {openFaq === i && (
                  <div className="mz-repair-faq-a">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Bottom CTA ── */}
      <section className="mz-repair-cta-section">
        <div className="mz-repair-cta-inner">
          <h2>Ready to fix your phone?</h2>
          <p>Chat with us on WhatsApp or visit our store today — we'll have it good as new.</p>
          <div className="mz-repair-cta-actions">
            <a href={quoteLink} className="mz-samsung-btn-primary" target="_blank" rel="noreferrer">
              WhatsApp Us
            </a>
            <a href={`tel:${shopInfo.phones.primary}`} className="mz-repair-call-btn">
              📞 {shopInfo.phones.primary || 'Call Us'}
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
