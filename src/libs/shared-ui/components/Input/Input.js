import { jsxs, jsx } from "react/jsx-runtime";
import React from "react";
import { cn } from "../../lib/utils.js";
const Input = React.forwardRef(
  ({
    className,
    type,
    leftElement,
    rightElement,
    error,
    hint,
    ...props
  }, ref) => {
    return /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        leftElement && /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500 dark:text-gray-400", children: leftElement }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type,
            className: cn(
              "flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm transition-colors",
              "border-gray-300 dark:border-gray-600",
              "input-focus-ring focus-visible:ring-brand-500",
              "placeholder:text-gray-500 dark:placeholder:text-gray-400",
              leftElement ? "pl-10" : "",
              rightElement ? "pr-10" : "",
              error ? "border-red-500 focus-visible:ring-red-500" : "hover:border-gray-400 dark:hover:border-gray-500",
              className
            ),
            ref,
            ...props
          }
        ),
        rightElement && /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 right-0 flex items-center pr-3", children: rightElement })
      ] }),
      error && /* @__PURE__ */ jsx("p", { className: "mt-1.5 text-sm text-red-500", children: error }),
      hint && !error && /* @__PURE__ */ jsx("p", { className: "mt-1.5 text-sm text-gray-500 dark:text-gray-400", children: hint })
    ] });
  }
);
Input.displayName = "Input";
export {
  Input
};
//# sourceMappingURL=Input.js.map
