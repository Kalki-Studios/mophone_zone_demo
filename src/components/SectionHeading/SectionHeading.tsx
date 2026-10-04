import React from 'react';
import './SectionHeading.css';

interface SectionHeadingProps {
  title: string;
  note?: string;
  className?: string;
}

export const SectionHeading = ({ title, note, className = '' }: SectionHeadingProps) => {
  return (
    <div className={`mz-section-heading-wrapper ${className}`}>
      <div className="mz-section-heading">
        <h2>{title}</h2>
        <div className="mz-section-heading-line"></div>
      </div>
      {note && (
        <div className="mz-section-heading-note">
          {note}
        </div>
      )}
    </div>
  );
};
