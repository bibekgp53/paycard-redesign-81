
import React from 'react';
import { cn } from '@/lib/utils';

interface ChipProps {
  label: string;
  variant?: 'default' | 'success' | 'warning' | 'error';
  removable?: boolean;
  onRemove?: () => void;
  className?: string;
}

export const Chip: React.FC<ChipProps> = ({
  label,
  variant = 'default',
  removable = false,
  onRemove,
  className,
}) => {
  const variantStyles = {
    default: 'bg-pcard-blue-100 text-pcard-dark-blue',
    success: 'bg-pcard-status-green-light text-pcard-status-green-dark',
    warning: 'bg-pcard-status-orange-light text-pcard-status-orange-dark',
    error: 'bg-pcard-status-red-light text-pcard-status-red-dark',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold',
        variantStyles[variant],
        className
      )}
    >
      {removable && (
        <button
          type="button"
          onClick={onRemove}
          className="mr-1 hover:text-opacity-75 focus:outline-none"
        >
          ×
        </button>
      )}
      {label}
    </div>
  );
};
