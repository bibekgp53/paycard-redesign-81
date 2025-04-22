
import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "link" | "outline" | "destructive";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export const CustomButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      fullWidth = false,
      iconLeft,
      iconRight,
      className,
      ...props
    },
    ref
  ) => {
    const variantStyles = {
      primary: "bg-paycard-navy text-white hover:bg-paycard-navy-800 focus:ring-paycard-navy-300",
      secondary: "bg-white text-paycard-navy border border-paycard-navy hover:bg-gray-50 focus:ring-paycard-navy-200",
      outline: "bg-white text-paycard-navy border border-gray-300 hover:bg-gray-50 focus:ring-gray-300",
      link: "bg-transparent text-paycard-navy underline hover:no-underline",
      destructive: "bg-paycard-red text-white hover:bg-paycard-red-600 focus:ring-paycard-red-300"
    };

    const sizeStyles = {
      sm: "text-sm px-3 py-1.5",
      md: "text-base px-4 py-2",
      lg: "text-lg px-6 py-3"
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded transition-colors focus:outline-none focus:ring-2 font-medium font-gilroy",
          variantStyles[variant],
          sizeStyles[size],
          fullWidth ? "w-full" : "",
          className
        )}
        {...props}
      >
        {iconLeft && <span className="mr-2 flex items-center">{iconLeft}</span>}
        {children}
        {iconRight && <span className="ml-2 flex items-center">{iconRight}</span>}
      </button>
    );
  }
);

CustomButton.displayName = "CustomButton";
