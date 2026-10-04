import React, { useEffect, useState } from 'react';
import './PremiumLoader.css';

interface PremiumLoaderProps {
  isLoading: boolean;
}

export const PremiumLoader: React.FC<PremiumLoaderProps> = ({ isLoading }) => {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setFading(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 1000); // Wait for zoom and fade animations to complete
      return () => clearTimeout(timer);
    } else {
      setVisible(true);
      setFading(false);
    }
  }, [isLoading]);

  if (!visible) return null;

  return (
    <div className={`mz-premium-loader ${fading ? 'mz-fade-out' : ''}`}>
      <div className="mz-loader-content">
        <div className="mz-loader-logo">
          <span className="mz-loader-pip" aria-hidden="true" />
          <span className="mz-loader-text">
            <span className="mz-loader-mo">MO</span>
            <span className="mz-loader-brand">PHONEZONE</span>
          </span>
        </div>
        <div className="mz-loader-bar-container">
          <div className="mz-loader-bar"></div>
        </div>
      </div>
    </div>
  );
};
