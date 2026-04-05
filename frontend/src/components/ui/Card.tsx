import React, { forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
interface CardProps extends Omit<HTMLMotionProps<'div'>, 'ref'> {
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
  clickable?: boolean;
}
export const Card = forwardRef<HTMLDivElement, CardProps>(({
  className = '',
  padding = 'md',
  hover = false,
  clickable = false,
  children,
  ...props
}, ref) => {
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };
  const baseStyles = 'bg-white rounded-2xl border border-border shadow-soft';
  const hoverStyles = hover || clickable ? 'transition-all duration-300 hover:shadow-soft-lg hover:border-rose-light/50' : '';
  const clickableStyles = clickable ? 'cursor-pointer' : '';
  return <motion.div ref={ref} whileHover={clickable ? {
    y: -2
  } : {}} whileTap={clickable ? {
    scale: 0.99
  } : {}} className={`${baseStyles} ${paddings[padding]} ${hoverStyles} ${clickableStyles} ${className}`} {...props} data-id="element-178">
        {children}
      </motion.div>;
});
Card.displayName = 'Card';