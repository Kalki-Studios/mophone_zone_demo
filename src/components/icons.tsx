import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement>;

export const PhoneIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" fill="none" stroke="currentColor" {...props}>
    <rect x="5" y="2" width="14" height="20" />
    <line x1="9" y1="18" x2="15" y2="18" />
  </svg>
);

export const WatchIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" fill="none" stroke="currentColor" {...props}>
    <rect x="7" y="6" width="10" height="12" />
    <line x1="9" y1="2" x2="15" y2="2" />
    <line x1="9" y1="22" x2="15" y2="22" />
  </svg>
);

export const EarbudsIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" fill="none" stroke="currentColor" {...props}>
    <circle cx="7" cy="12" r="3" />
    <circle cx="17" cy="12" r="3" />
    <path d="M7 15 L7 20 M17 15 L17 20" />
  </svg>
);

export const CaseIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" fill="none" stroke="currentColor" {...props}>
    <rect x="4" y="2" width="16" height="20" />
    <rect x="7" y="5" width="4" height="4" />
  </svg>
);

export const ScreenGuardIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" fill="none" stroke="currentColor" {...props}>
    <rect x="5" y="2" width="14" height="20" />
    <line x1="5" y1="6" x2="19" y2="6" strokeDasharray="2 2" />
  </svg>
);

export const WrenchIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" fill="none" stroke="currentColor" {...props}>
    <path d="M15 15 L21 21 M15 15 L9 9 M4 14 C2 12 2 8 5 5 C8 2 12 2 14 4 L9 9 Z" />
  </svg>
);

export const PinIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" fill="none" stroke="currentColor" {...props}>
    <path d="M12 22 L12 14" />
    <circle cx="12" cy="8" r="6" />
    <circle cx="12" cy="8" r="2" />
  </svg>
);

export const ClockIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" fill="none" stroke="currentColor" {...props}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

export const MenuIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" fill="none" stroke="currentColor" {...props}>
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

export const CloseIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" fill="none" stroke="currentColor" {...props}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export const ChevronIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" fill="none" stroke="currentColor" {...props}>
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export const CheckIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" fill="none" stroke="currentColor" {...props}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export const SearchIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" stroke="currentColor" {...props}>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

export const CartIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" stroke="currentColor" {...props}>
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

export const UserIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" stroke="currentColor" {...props}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
