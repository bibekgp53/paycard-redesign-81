
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helpText?: string;
  prepend?: React.ReactNode;
  append?: React.ReactNode;
}

export const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, helpText, prepend, append, className, ...props }, ref) => {
    return (
      <div className="mb-4">
        {label && (
          <Label 
            htmlFor={props.id} 
            className="block text-sm font-medium text-pcard-dark-blue mb-1"
          >
            {label}
          </Label>
        )}
        
        <div className={cn("flex", (prepend || append) && "relative")}>
          {prepend && (
            <div className="flex items-center justify-center px-3 bg-pcard-blue-100 border border-r-0 border-input rounded-l-md">
              {prepend}
            </div>
          )}
          
          <Input
            ref={ref}
            className={cn(
              prepend && "rounded-l-none",
              append && "rounded-r-none",
              error && "border-pcard-status-red ring-1 ring-pcard-status-red",
              className
            )}
            {...props}
          />
          
          {append && (
            <div className="flex items-center justify-center px-3 min-w-[80px] bg-pcard-blue-100 border border-l-0 border-input rounded-r-md">
              {append}
            </div>
          )}
        </div>
        
        {error && <p className="mt-1 text-sm text-pcard-status-red">{error}</p>}
        {helpText && !error && <p className="mt-1 text-sm text-gray-500">{helpText}</p>}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";
