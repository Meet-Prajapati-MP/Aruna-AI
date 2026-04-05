import React from 'react';
interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}
export function Logo({
  className = '',
  size = 'md',
  showText = true
}: LogoProps) {
  const sizes = {
    sm: {
      icon: 24,
      text: 'text-lg'
    },
    md: {
      icon: 32,
      text: 'text-2xl'
    },
    lg: {
      icon: 40,
      text: 'text-3xl'
    }
  };
  const {
    icon,
    text
  } = sizes[size];
  return <div className={`flex items-center gap-2 ${className}`} data-id="element-186">
      {/* Icon with gradient background */}
      <div className="rounded-xl flex items-center justify-center shadow-sm" style={{
      width: icon,
      height: icon,
      background: 'linear-gradient(135deg, #7A3B50 0%, #5C2434 50%, #3D1522 100%)'
    }} data-id="element-187">
        {/* Sparkle/Star SVG */}
        <svg width={icon * 0.5} height={icon * 0.5} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-id="element-188">
          <path d="M12 2L13.09 8.26L18 6L14.74 10.91L21 12L14.74 13.09L18 18L13.09 15.74L12 22L10.91 15.74L6 18L9.26 13.09L3 12L9.26 10.91L6 6L10.91 8.26L12 2Z" fill="white" fillOpacity="0.95" data-id="element-189" />
        </svg>
      </div>
      {showText && <span className={`font-heading font-bold text-text-primary ${text}`} data-id="element-190">
          Aruna
        </span>}
    </div>;
}