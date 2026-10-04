import React from 'react';
import './Button.css';
import { SiWhatsapp } from 'react-icons/si';

type ButtonVariant = 'primary' | 'whatsapp' | 'outline' | 'dark';

interface BaseProps {
  variant?: ButtonVariant;
  children: React.ReactNode;
  className?: string;
}

type ButtonAsButton = BaseProps & React.ButtonHTMLAttributes<HTMLButtonElement> & { as?: 'button' };
type ButtonAsAnchor = BaseProps & React.AnchorHTMLAttributes<HTMLAnchorElement> & { as: 'a' };

type ButtonProps = ButtonAsButton | ButtonAsAnchor;

export const Button = (props: ButtonProps) => {
  const { variant = 'primary', className = '', children, as = 'button', ...rest } = props;
  
  const classes = `mz-btn mz-btn-${variant} ${className}`;
  
  const content = (
    <>
      {variant === 'whatsapp' && <SiWhatsapp className="mz-btn-icon" />}
      {children}
    </>
  );

  if (as === 'a') {
    return (
      <a className={classes} {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {content}
      </a>
    );
  }

  return (
    <button className={classes} {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  );
};
