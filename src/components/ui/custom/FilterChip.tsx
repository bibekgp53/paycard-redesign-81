
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ChevronDown, X } from 'lucide-react';

interface FilterChipProps {
  label: string;
  active?: boolean;
  onRemove?: () => void;
  onClick?: () => void;
  className?: string;
  showDropdownIndicator?: boolean;
}

export const FilterChip: React.FC<FilterChipProps> = ({
  label,
  active = false,
  onRemove,
  onClick,
  className,
  showDropdownIndicator = false,
}) => {
  return (
    <Button
      variant="outline"
      size="sm"
      className={cn(
        "flex items-center gap-1 font-gilroy",
        active && "bg-pcard-blue-100 border-pcard-blue-200",
        className
      )}
      onClick={onClick}
    >
      <span>{label}</span>
      
      {showDropdownIndicator && (
        <ChevronDown className="h-4 w-4 ml-1" />
      )}
      
      {active && onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="ml-1 text-xs hover:text-opacity-75 focus:outline-none"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </Button>
  );
};
