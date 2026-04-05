import React, { forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { Loader2Icon } from 'lucide-react';
interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'ref' | 'children'> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children?: React.ReactNode;
}
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  className = '',
  variant = 'primary',
  size = 'md',
  isLoading,
  leftIcon,
  rightIcon,
  children,
  disabled,
  ...props
}, ref) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-xl font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:pointer-events-none';
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-dark shadow-sm',
    secondary: 'bg-cream text-text-primary hover:bg-beige',
    ghost: 'bg-transparent text-text-secondary hover:bg-cream hover:text-text-primary',
    outline: 'bg-transparent border border-border text-text-primary hover:bg-cream'
  };
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-8 py-3.5 text-lg'
  };
  return <motion.button ref={ref} whileTap={{
    scale: disabled || isLoading ? 1 : 0.98
  }} className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} disabled={disabled || isLoading} {...props} data-id="element-174">
        {isLoading && <Loader2Icon className="w-4 h-4 mr-2 animate-spin" data-id="element-175" />}
        {!isLoading && leftIcon && <span className="mr-2" data-id="element-176">{leftIcon}</span>}
        {children}
        {!isLoading && rightIcon && <span className="ml-2" data-id="element-177">{rightIcon}</span>}
      </motion.button>;
});
Button.displayName = 'Button';