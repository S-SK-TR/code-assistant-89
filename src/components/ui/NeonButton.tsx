import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils'; // Assuming cn utility exists or should be created
import { Loader2 } from 'lucide-react';

interface NeonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ElementType; // Lucide icon component
}

export const NeonButton = React.forwardRef<HTMLButtonElement, NeonButtonProps>(
  ({ 
    className,
    children,
    variant = 'primary',
    size = 'md',
    loading,
    icon: Icon,
    disabled,
    ...props
  }, ref) => {
    return (
      <motion.button
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center gap-2 overflow-hidden",
          "font-medium rounded-xl border border-transparent",
          "transition-all duration-300 ease-out active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed",
          "group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500",
          // Sizes
          {
            'h-9 px-4 text-sm': size === 'sm',
            'h-11 px-6 text-base': size === 'md',
            'h-12 px-8 text-lg': size === 'lg',
          },
          // Variants
          {
            // Primary: Glowing gradient background
            'bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-lg shadow-blue-500/20': variant === 'primary',
            'hover:from-blue-500 hover:to-indigo-600': variant === 'primary' && !disabled,

            // Secondary: Subtle glassmorphism with accent border
            'bg-white/5 border-white/10 text-white backdrop-blur-md': variant === 'secondary',
            'hover:bg-white/10 hover:border-blue-500/50': variant === 'secondary' && !disabled,
            
            // Ghost: Text-only, subtle hover
            'text-blue-300 hover:text-blue-100 hover:bg-white/5': variant === 'ghost',
          },
          className
        )}
        disabled={disabled || loading}
        whileHover={!disabled && !loading ? { scale: 1.02 } : {}}
        whileTap={!disabled && !loading ? { scale: 0.95 } : {}}
        {
          ...props
        }
      >
        {loading ? (
          <Loader2 size={18} className="animate-spin" />
        ) : (
          Icon && <Icon size={18} />
        )}
        {children}
        {/* Neon effect for primary variant */}
        {variant === 'primary' && !disabled && (
          <div 
            className="absolute inset-0 z-0 rounded-xl pointer-events-none"
            style={{
              background: 'radial-gradient(circle at center, rgba(125, 125, 255, 0.4) 0%, transparent 70%)',
              opacity: 0,
              transition: 'opacity 0.3s ease-out'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '0')}
          />
        )}
      </motion.button>
    );
  }
);

NeonButton.displayName = 'NeonButton';

// Assuming src/lib/utils.ts contains this helper. If not, it needs to be created.
// import { clsx, type ClassValue } from 'clsx';
// import { twMerge } from 'tailwind-merge';
// export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
