import React, { useState } from 'react';
import './Img.css';
import { PhoneIcon } from '../icons';

interface ImgProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width: string | number;
  height: string | number;
  slotName?: string;
}

export const Img = ({ src, alt, width, height, slotName, className = '', ...rest }: ImgProps) => {
  const [error, setError] = useState(!src);

  if (error) {
    return (
      <div 
        className={`mz-img-fallback ${className}`} 
        style={{ width, height }}
        title={alt}
      >
        <svg className="mz-img-hatch" width="100%" height="100%">
          <defs>
            <pattern id={`hatch-${slotName || 'default'}`} width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="8" stroke="var(--ink)" strokeWidth="1" opacity="0.1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#hatch-${slotName || 'default'})`} />
        </svg>
        <div className="mz-img-fallback-content">
          <PhoneIcon width="32" height="32" opacity={0.2} />
          {import.meta.env.DEV && slotName && (
            <span className="mz-img-slot-label">photo: {slotName}</span>
          )}
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      decoding="async"
      loading="lazy"
      onError={() => setError(true)}
      className={`mz-img ${className}`}
      {...rest}
    />
  );
};
