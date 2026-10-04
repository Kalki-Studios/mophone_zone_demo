import React from 'react';
import './FilterChips.css';

export interface ChipOption {
  value: string;
  label: string;
}

interface FilterChipsProps {
  options: ChipOption[];
  activeValue: string;
  onChange: (value: string) => void;
  className?: string;
}

export const FilterChips = ({ options, activeValue, onChange, className = '' }: FilterChipsProps) => {
  return (
    <div className={`mz-filter-chips ${className}`}>
      {options.map((opt) => {
        const isActive = opt.value === activeValue;
        return (
          <button
            key={opt.value}
            className={`mz-chip ${isActive ? 'mz-chip-active' : ''}`}
            onClick={() => onChange(opt.value)}
            aria-pressed={isActive}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
};
