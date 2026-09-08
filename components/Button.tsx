import React from 'react';
import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: 'primary' | 'outline' | 'ghost' | 'secondary';
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  target?: string;
  rel?: string;
}

const Button = ({ 
  children, 
  href, 
  variant = 'primary', 
  className = '', 
  onClick,
  type = 'button',
  target,
  rel,
}: ButtonProps) => {
  const baseStyles = "px-6 py-3 rounded-xl font-medium transition-all duration-300 text-center inline-block";
  
  const variants = {
    primary: "bg-theme-purple text-white hover:brightness-110 active:scale-95",
    outline: "border border-theme-border text-white hover:bg-white/5 active:scale-95",
    secondary: "border border-theme-border text-white hover:bg-white/5 active:scale-95",
    ghost: "text-theme-muted hover:text-white transition-colors"
  };

  const combinedClassName = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    const isExternal = href.startsWith('http://') || href.startsWith('https://');
    if (isExternal) {
      return (
        <a
          href={href}
          target={target || "_blank"}
          rel={rel || "noopener noreferrer"}
          className={combinedClassName}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} target={target} rel={rel} className={combinedClassName}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={combinedClassName}>
      {children}
    </button>
  );
};

export default Button;
