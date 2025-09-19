import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const executiveButtonVariants = cva(
  "executive-button",
  {
    variants: {
      variant: {
        primary: "executive-button-primary",
        secondary: "executive-button-secondary",
        outline: "border border-electric text-electric hover:bg-electric hover:text-electric-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        hero: "bg-electric text-electric-foreground hover:bg-electric/90 text-lg font-semibold px-8 py-6 shadow-lg hover:shadow-xl",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        hero: "h-14 px-8 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ExecutiveButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof executiveButtonVariants> {
  asChild?: boolean;
}

const ExecutiveButton = React.forwardRef<HTMLButtonElement, ExecutiveButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(executiveButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
ExecutiveButton.displayName = "ExecutiveButton";

export { ExecutiveButton, executiveButtonVariants };