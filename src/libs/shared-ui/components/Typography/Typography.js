import { jsx } from "react/jsx-runtime";
import React from "react";
import { cn } from "../../lib/utils.js";
const Text = React.forwardRef(
  ({ className, variant = "body", as: Component = "p", ...props }, ref) => {
    const variantStyles = {
      body: "text-base text-gray-700 dark:text-gray-300",
      lead: "text-lg leading-7 text-gray-700 dark:text-gray-300",
      small: "text-sm text-gray-600 dark:text-gray-400",
      muted: "text-sm text-gray-500 dark:text-gray-400"
    };
    return /* @__PURE__ */ jsx(
      Component,
      {
        ref,
        className: cn(variantStyles[variant], className),
        ...props
      }
    );
  }
);
Text.displayName = "Text";
const Heading = React.forwardRef(
  ({ className, level = 2, as, size, ...props }, ref) => {
    const Tag = as || `h${level}`;
    const sizeStyles = {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
      "4xl": "text-4xl"
    };
    const defaultSizes = {
      1: "3xl",
      2: "2xl",
      3: "xl",
      4: "lg",
      5: "md",
      6: "sm"
    };
    const selectedSize = size || defaultSizes[level];
    return /* @__PURE__ */ jsx(
      Tag,
      {
        ref,
        className: cn(
          "font-bold tracking-tight text-gray-900 dark:text-gray-100",
          sizeStyles[selectedSize],
          className
        ),
        ...props
      }
    );
  }
);
Heading.displayName = "Heading";
export {
  Heading,
  Text
};
//# sourceMappingURL=Typography.js.map
