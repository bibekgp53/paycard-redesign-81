import { jsxs, jsx } from "react/jsx-runtime";
import React from "react";
import { cn } from "../../lib/utils.js";
const Button = React.forwardRef(
  ({
    className,
    children,
    variant = "primary",
    size = "md",
    isLoading = false,
    leftIcon,
    rightIcon,
    disabled,
    ...props
  }, ref) => {
    const variantStyles = {
      primary: "bg-brand-600 text-white shadow-sm hover:bg-brand-700 focus:ring-brand-500",
      secondary: "bg-gray-200 text-gray-900 shadow-sm hover:bg-gray-300 focus:ring-gray-400",
      outline: "bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-300 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-800",
      ghost: "bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-300 dark:text-gray-300 dark:hover:bg-gray-800",
      link: "bg-transparent text-brand-600 hover:underline focus:ring-brand-500 p-0 dark:text-brand-400",
      destructive: "bg-red-600 text-white shadow-sm hover:bg-red-700 focus:ring-red-500"
    };
    const sizeStyles = {
      sm: "text-xs px-2.5 py-1 h-8 rounded-md",
      md: "text-sm px-4 py-2 h-10 rounded-md",
      lg: "text-base px-6 py-2.5 h-12 rounded-lg"
    };
    return /* @__PURE__ */ jsxs(
      "button",
      {
        className: cn(
          "font-medium focus-ring inline-flex items-center justify-center btn-transition rounded-md",
          variantStyles[variant],
          sizeStyles[size],
          isLoading ? "opacity-70 cursor-not-allowed" : "",
          disabled ? "opacity-50 cursor-not-allowed" : "",
          className
        ),
        disabled: isLoading || disabled,
        ref,
        ...props,
        children: [
          isLoading && /* @__PURE__ */ jsxs("svg", { className: "animate-spin -ml-1 mr-2 h-4 w-4 text-current", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [
            /* @__PURE__ */ jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }),
            /* @__PURE__ */ jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })
          ] }),
          !isLoading && leftIcon && /* @__PURE__ */ jsx("span", { className: "mr-2", children: leftIcon }),
          children,
          !isLoading && rightIcon && /* @__PURE__ */ jsx("span", { className: "ml-2", children: rightIcon })
        ]
      }
    );
  }
);
Button.displayName = "Button";
export {
  Button
};
//# sourceMappingURL=Button.js.map
