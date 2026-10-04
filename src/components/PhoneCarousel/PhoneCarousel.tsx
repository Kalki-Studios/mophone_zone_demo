import React, { useState, useEffect } from 'react';
import './PhoneCarousel.css';

const CAROUSEL_DATA = [
  {
    id: 1,
    title: 'Galaxy S24 Ultra',
    subtitle: 'Galaxy AI is here.',
    price: 'Starting at ₹1,29,999*',
    image: '/s24-ultra.jpg',
    bg: '#f4f4f4',
    textColor: '#000000'
  },
  {
    id: 2,
    title: 'Galaxy Z Fold5',
    subtitle: 'Unfold more with the ultimate main display.',
    price: 'Starting at ₹1,54,999*',
    image: '/z-fold5.jpg',
    bg: '#000000',
    textColor: '#ffffff'
  },
  {
    id: 3,
    title: 'Galaxy Z Flip5',
    subtitle: 'Join the flip side.',
    price: 'Starting at ₹99,999*',
    image: '/z-flip5.jpg',
    bg: '#e8eaed',
    textColor: '#000000'
  }
];

export const PhoneCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % CAROUSEL_DATA.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + CAROUSEL_DATA.length) % CAROUSEL_DATA.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = CAROUSEL_DATA[currentIndex];

  return (
    <div className="mz-phone-carousel">
      <div 
        className="mz-carousel-track"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {CAROUSEL_DATA.map((item) => (
          <div 
            key={item.id} 
            className="mz-carousel-slide" 
            style={{ backgroundColor: item.bg }}
          >
            <div className="mz-carousel-bg">
              <img src={item.image} alt={item.title} className="mz-carousel-bg-image" />
              <div className="mz-carousel-bg-overlay"></div>
            </div>

            <div className="mz-carousel-content">
              <h2 className="mz-carousel-title">{item.title}</h2>
              <p className="mz-carousel-subtitle">{item.subtitle}</p>
              
              <div className="mz-carousel-price-wrap">
                <p className="mz-carousel-price">{item.price}</p>
                <p className="mz-carousel-tax-note">*Inclusive of Bank Offers</p>
                <button className="mz-carousel-buy-btn">Buy now</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="mz-carousel-arrow mz-arrow-left" onClick={prevSlide}>
        ‹
      </button>
      <button className="mz-carousel-arrow mz-arrow-right" onClick={nextSlide}>
        ›
      </button>
      
      {/* Fake Bank Offers Strip */}
      <div className="mz-carousel-bank-offers">
        <div className="mz-bank-offer-item">
          <span className="mz-bank-text">Up to 10% NeuCoins* on</span>
          <strong className="mz-bank-highlight">HDFC BANK</strong>
        </div>
        <div className="mz-bank-divider" />
        <div className="mz-bank-offer-item">
          <span className="mz-bank-text">Up to ₹7,000 Instant Cashback* on Credit Cards of</span>
          <div className="mz-bank-logos">
            <strong className="mz-bank-highlight" style={{ color: '#A02040' }}>AXIS BANK</strong>
            <strong className="mz-bank-highlight" style={{ color: '#E86020' }}>ICICI Bank</strong>
            <strong className="mz-bank-highlight" style={{ color: '#0060A0' }}>SBI Card</strong>
          </div>
        </div>
      </div>
    </div>
  );
};
