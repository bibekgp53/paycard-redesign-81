import { jsx, jsxs } from "react/jsx-runtime";
import React from "react";
import { cn } from "../../lib/utils.js";
const Alert = React.forwardRef(
  ({ className, children, variant = "info", title, icon, onClose, ...props }, ref) => {
    const variantStyles = {
      info: "bg-blue-50 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
      success: "bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-300",
      warning: "bg-yellow-50 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
      danger: "bg-red-50 text-red-800 dark:bg-red-900/30 dark:text-red-300"
    };
    const borderStyles = {
      info: "border-l-4 border-blue-400 dark:border-blue-500",
      success: "border-l-4 border-green-400 dark:border-green-500",
      warning: "border-l-4 border-yellow-400 dark:border-yellow-500",
      danger: "border-l-4 border-red-400 dark:border-red-500"
    };
    return /* @__PURE__ */ jsx(
      "div",
      {
        className: cn(
          "p-4 rounded-r-lg animate-fade-in",
          variantStyles[variant],
          borderStyles[variant],
          className
        ),
        ref,
        role: "alert",
        ...props,
        children: /* @__PURE__ */ jsxs("div", { className: "flex items-start", children: [
          icon && /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 mr-3 pt-0.5", children: icon }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
            title && /* @__PURE__ */ jsx("div", { className: "font-medium mb-1", children: title }),
            /* @__PURE__ */ jsx("div", { className: "text-sm opacity-90", children })
          ] }),
          onClose && /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: onClose,
              className: "ml-3 -mr-1 -mt-1 p-1.5 rounded-md hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-black/20 dark:hover:bg-white/10 dark:focus:ring-white/20 btn-transition",
              "aria-label": "Close",
              children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4", viewBox: "0 0 20 20", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z", clipRule: "evenodd" }) })
            }
          )
        ] })
      }
    );
  }
);
Alert.displayName = "Alert";
export {
  Alert
};
//# sourceMappingURL=Alert.js.map
