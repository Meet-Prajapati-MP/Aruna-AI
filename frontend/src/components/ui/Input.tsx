import React, { forwardRef } from 'react';
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}
export const Input = forwardRef<HTMLInputElement, InputProps>(({
  className = '',
  label,
  error,
  leftIcon,
  rightIcon,
  id,
  ...props
}, ref) => {
  const inputId = id || Math.random().toString(36).substring(7);
  return <div className="w-full flex flex-col gap-1.5" data-id="element-179">
        {label && <label htmlFor={inputId} className="text-sm font-medium text-text-secondary ml-1" data-id="element-180">
            {label}
          </label>}
        <div className="relative flex items-center" data-id="element-181">
          {leftIcon && <div className="absolute left-3 text-text-muted pointer-events-none" data-id="element-182">
              {leftIcon}
            </div>}
          <input ref={ref} id={inputId} className={`
              w-full bg-white border rounded-xl px-4 py-2.5 text-text-primary placeholder:text-text-muted
              focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all
              ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : 'border-border'}
              ${leftIcon ? 'pl-10' : ''}
              ${rightIcon ? 'pr-10' : ''}
              ${className}
            `} {...props} data-id="element-183" />
          {rightIcon && <div className="absolute right-3 text-text-muted" data-id="element-184">{rightIcon}</div>}
        </div>
        {error && <span className="text-sm text-red-500 ml-1 mt-0.5" data-id="element-185">{error}</span>}
      </div>;
});
Input.displayName = 'Input';