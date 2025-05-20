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
        leftElement && /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500", children: leftElement }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type,
            className: cn(
              "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              leftElement ? "pl-10" : "",
              rightElement ? "pr-10" : "",
              error ? "border-red-500 focus-visible:ring-red-500" : "",
              className
            ),
            ref,
            ...props
          }
        ),
        rightElement && /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 right-0 flex items-center pr-3", children: rightElement })
      ] }),
      error && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-500", children: error }),
      hint && !error && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-500", children: hint })
    ] });
  }
);
Input.displayName = "Input";
export {
  Input
};
//# sourceMappingURL=Input.js.map
