import { jsx } from "react/jsx-runtime";
import React from "react";
import { cn } from "../../lib/utils.js";
const Card = React.forwardRef(
  ({ className, children, variant = "default", padding = "md", ...props }, ref) => {
    const variantStyles = {
      default: "bg-white dark:bg-gray-800",
      bordered: "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700",
      elevated: "bg-white dark:bg-gray-800 card-shadow"
    };
    const paddingStyles = {
      none: "",
      sm: "p-3",
      md: "p-5",
      lg: "p-7"
    };
    return /* @__PURE__ */ jsx(
      "div",
      {
        className: cn(
          "rounded-lg transition-all duration-200",
          variantStyles[variant],
          paddingStyles[padding],
          className
        ),
        ref,
        ...props,
        children
      }
    );
  }
);
Card.displayName = "Card";
const CardHeader = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("flex flex-col space-y-1.5 mb-4", className),
    ...props
  }
));
CardHeader.displayName = "CardHeader";
const CardTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "h3",
  {
    ref,
    className: cn("text-xl font-semibold tracking-tight", className),
    ...props
  }
));
CardTitle.displayName = "CardTitle";
const CardDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "p",
  {
    ref,
    className: cn("text-sm text-gray-500 dark:text-gray-400", className),
    ...props
  }
));
CardDescription.displayName = "CardDescription";
const CardContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("", className), ...props }));
CardContent.displayName = "CardContent";
const CardFooter = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("flex items-center mt-6 pt-4 border-t border-gray-200 dark:border-gray-700", className),
    ...props
  }
));
CardFooter.displayName = "CardFooter";
export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
};
//# sourceMappingURL=Card.js.map
