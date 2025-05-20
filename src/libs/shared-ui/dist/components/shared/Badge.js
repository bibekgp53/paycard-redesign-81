import { jsx } from "react/jsx-runtime";
import React from "react";
import { cn } from "../../lib/utils.js";
const Badge = React.forwardRef(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    const variantStyles = {
      default: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
      primary: "bg-brand-100 text-brand-800 dark:bg-brand-800 dark:text-brand-100",
      secondary: "bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100",
      success: "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100",
      warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100",
      danger: "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100",
      info: "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100"
    };
    const sizeStyles = {
      sm: "text-xs px-2 py-0.5",
      md: "text-sm px-2.5 py-0.5",
      lg: "text-base px-3 py-1"
    };
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        className: cn(
          "inline-flex items-center font-medium rounded-full",
          variantStyles[variant],
          sizeStyles[size],
          className
        ),
        ...props
      }
    );
  }
);
Badge.displayName = "Badge";
export {
  Badge
};
//# sourceMappingURL=Badge.js.map
