import React, { useState } from 'react';
import { useData } from '../../data/DataContext';
import { buildWhatsappLink } from '../../lib/whatsapp';
import './Repair.css';
import { 
  FiSmartphone, FiBattery, FiZap, FiDroplet, FiCamera, 
  FiVolume2, FiMonitor, FiShield, FiClock, FiTool, FiDollarSign, FiPhoneCall
} from 'react-icons/fi';
import { 
  SiSamsung, SiApple, SiGoogle, SiOneplus, 
  SiXiaomi, SiOppo, SiVivo, SiMotorola 
} from 'react-icons/si';

/* ─── Static repair services ─── */
const REPAIR_SERVICES = [
  {
    id: 'screen',
    icon: <FiSmartphone size={32} />,
    title: 'Screen Replacement',
    desc: 'Cracked or unresponsive display? We replace with OEM-grade panels for crystal-clear visuals.',
    priceFrom: 799,
    time: '30–60 min',
    badge: 'Most Common',
  },
  {
    id: 'battery',
    icon: <FiBattery size={32} />,
    title: 'Battery Replacement',
    desc: 'Poor battery life or unexpected shutdowns? Genuine-capacity cells, proper calibration.',
    priceFrom: 499,
    time: '20–40 min',
    badge: null,
  },
  {
    id: 'charging',
    icon: <FiZap size={32} />,
    title: 'Charging Port Repair',
    desc: 'Loose connector or no charging? We clean or replace the port to restore full power.',
    priceFrom: 299,
    time: '20–30 min',
    badge: null,
  },
  {
    id: 'water',
    icon: <FiDroplet size={32} />,
    title: 'Water Damage Recovery',
    desc: 'Dropped in water? Bring it in immediately. Ultrasonic cleaning + board-level repair.',
    priceFrom: 999,
    time: '2–24 hrs',
    badge: 'Expert Care',
  },
  {
    id: 'camera',
    icon: <FiCamera size={32} />,
    title: 'Camera Repair',
    desc: 'Blurry images, black screen, or cracked lens? Full front and rear camera module replacement.',
    priceFrom: 599,
    time: '45–90 min',
    badge: null,
  },
  {
    id: 'speaker',
    icon: <FiVolume2 size={32} />,
    title: 'Speaker / Mic Repair',
    desc: 'No sound or muffled audio during calls? We replace earpiece, loudspeaker, or microphone.',
    priceFrom: 349,
    time: '30–60 min',
    badge: null,
  },
  {
    id: 'software',
    icon: <FiMonitor size={32} />,
    title: 'Software & Flashing',
    desc: 'Stuck in boot loop, factory reset, or software update issues? Fast firmware flashing.',
    priceFrom: 199,
    time: '30–60 min',
    badge: null,
  },
  {
    id: 'back',
    icon: <FiShield size={32} />,
    title: 'Back Panel Replacement',
    desc: 'Cracked glass back? We replace it to restore your phone\'s premium look and feel.',
    priceFrom: 399,
    time: '30–45 min',
    badge: null,
  },
];

const BRANDS = [
  { name: 'Samsung', icon: <SiSamsung size={40} />, hideName: true },
  { name: 'Apple', icon: <SiApple size={24} /> },
  { name: 'Google', icon: <SiGoogle size={24} /> },
  { name: 'OnePlus', icon: <SiOneplus size={24} /> },
  { name: 'Redmi', icon: <SiXiaomi size={24} /> },
  { name: 'OPPO', icon: <SiOppo size={40} />, hideName: true },
  { name: 'vivo', icon: <SiVivo size={40} />, hideName: true },
  { name: 'Motorola', icon: <SiMotorola size={24} /> },
];

const WHY_US = [
  { icon: <FiClock size={28} />, title: 'Same-Day Service', desc: 'Most repairs done in under 60 minutes while you wait.' },
  { icon: <FiTool size={28} />, title: 'Genuine Parts', desc: 'OEM-grade components for lasting quality you can trust.' },
  { icon: <FiShield size={28} />, title: '30-Day Warranty', desc: 'All repairs backed by our service warranty — no questions asked.' },
  { icon: <FiDollarSign size={28} />, title: 'Transparent Pricing', desc: 'No hidden costs. Get a free quote before we start anything.' },
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
          <h1 className="mz-repair-hero-title">
            We Fix Phones.<br />Fast &amp; Right.
          </h1>
          <p className="mz-repair-hero-sub">
            Screen, battery, water damage, software — if it's broken, we can fix it.
            Bring your device in or chat with us to get a free quote.
          </p>
          <div className="mz-repair-hero-actions">
            <a href={`tel:${shopInfo.phones.primary}`} className="mz-samsung-btn-outline">
              Call Us Now
            </a>
          </div>
          <div className="mz-repair-trust-pills">
            <span><FiClock size={16} className="mz-repair-pill-icon" /> 60-min turnaround</span>
            <span><FiTool size={16} className="mz-repair-pill-icon" /> Genuine parts</span>
            <span><FiShield size={16} className="mz-repair-pill-icon" /> 30-day warranty</span>
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
          <h2 className="mz-samsung-section-title">Our Repair Services</h2>

          <div className="mz-repair-services-grid">
            {REPAIR_SERVICES.map((svc) => (
              <a
                key={svc.id}
                href={buildWhatsappLink(shopInfo.whatsappNumber, `Hi! I need a quote for: ${svc.title}`)}
                className="mz-repair-service-card"
                target="_blank"
                rel="noreferrer"
              >
                {svc.badge && (
                  <span className="mz-product-badge">{svc.badge}</span>
                )}
                <div className="mz-repair-svc-icon">{svc.icon}</div>
                <h3>{svc.title}</h3>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Supported Brands ── */}
      <section className="mz-repair-brands-section">
        <div className="mz-repair-brands-marquee">
          <div className="mz-repair-brands-track">
            {BRANDS.map((b) => (
              <div key={b.name} className={`mz-repair-brand-chip ${b.hideName ? 'mz-repair-brand-chip-icon-only' : ''}`}>
                <span className="mz-repair-brand-icon">{b.icon}</span>
                {!b.hideName && <span>{b.name}</span>}
              </div>
            ))}
            {/* Duplicate for seamless looping */}
            {BRANDS.map((b) => (
              <div key={`${b.name}-dup`} className={`mz-repair-brand-chip ${b.hideName ? 'mz-repair-brand-chip-icon-only' : ''}`}>
                <span className="mz-repair-brand-icon">{b.icon}</span>
                {!b.hideName && <span>{b.name}</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. FAQ ── */}
      <section className="mz-repair-faq-section">
        <div className="mz-repair-faq-inner">
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
