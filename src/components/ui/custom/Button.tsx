
import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent" | "outline" | "link";
  size?: "sm" | "md" | "lg";
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    children, 
    className, 
    variant = "primary", 
    size = "md", 
    iconLeft, 
    iconRight, 
    fullWidth,
    ...props 
  }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-gilroy font-medium rounded transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
    
    const variantStyles = {
      primary: "bg-paycard-navy text-white hover:bg-paycard-navy-800 focus:ring-paycard-navy-500",
      secondary: "bg-white text-paycard-navy border border-paycard-navy hover:bg-paycard-navy-100 focus:ring-paycard-navy-300",
      accent: "bg-paycard-salmon text-white hover:bg-opacity-90 focus:ring-paycard-salmon",
      outline: "bg-transparent text-paycard-navy border border-paycard-navy-200 hover:bg-paycard-navy-100 focus:ring-paycard-navy-300",
      link: "bg-transparent text-paycard-navy hover:underline focus:ring-0 p-0"
    };
    
    const sizeStyles = {
      sm: "px-3 py-1.5 text-sm button-3",
      md: "px-4 py-2 text-base button-2",
      lg: "px-6 py-3 text-lg button-1"
    };
    
    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          variant !== "link" && sizeStyles[size],
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {iconLeft && <span className="mr-2">{iconLeft}</span>}
        {children}
        {iconRight && <span className="ml-2">{iconRight}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";
