import React from 'react';
interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'personal' | 'professional' | 'thinking' | 'planning' | 'executing';
  size?: 'sm' | 'md';
}
export function Badge({
  className = '',
  variant = 'default',
  size = 'sm',
  children,
  ...props
}: BadgeProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-full';
  const variants = {
    default: 'bg-cream text-text-secondary border border-border',
    personal: 'bg-rose-light/20 text-primary-dark border border-rose-light/30',
    professional: 'bg-slate-100 text-slate-700 border border-slate-200',
    thinking: 'bg-amber-50 text-amber-700 border border-amber-200',
    planning: 'bg-blue-50 text-blue-700 border border-blue-200',
    executing: 'bg-emerald-50 text-emerald-700 border border-emerald-200'
  };
  const sizes = {
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm'
  };
  return <span className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} {...props} data-id="element-173">
      {children}
    </span>;
}