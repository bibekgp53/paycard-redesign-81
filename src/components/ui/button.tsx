
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  // Base button styles tuned to PayCard
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paycard-navy-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 font-poppins",
  {
    variants: {
      variant: {
        // Updated variants to use PayCard design system
        default: "bg-paycard-navy text-white hover:bg-paycard-navy-800",
        destructive:
          "bg-paycard-red text-white hover:bg-paycard-red/90",
        outline:
          "border border-paycard-navy-200 bg-white text-paycard-navy hover:bg-paycard-navy-100",
        secondary:
          "bg-paycard-blue text-white hover:bg-paycard-navy-400",
        ghost: "hover:bg-paycard-navy-150 text-paycard-navy",
        link: "text-paycard-salmon hover:underline",
        accent: "bg-paycard-salmon text-white hover:bg-paycard-salmon-dark"
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-9 rounded px-3 py-1.5 text-sm",
        lg: "h-12 rounded-lg px-8 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
