"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-ring/50 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 text-zinc-800 shadow-md hover:scale-105 hover:shadow-lg font-semibold",

        secondary:
          "border border-zinc-700/30 bg-zinc-900/30 backdrop-blur-lg text-zinc-200 hover:bg-zinc-800/40 hover:border-zinc-600/40 hover:shadow-lg hover:shadow-emerald-500/20 hover:scale-105 font-semibold",

        outline:
          "border border-zinc-700 bg-transparent hover:bg-zinc-800",

        ghost:
          "hover:bg-accent hover:text-accent-foreground",

        link:
          "text-primary underline-offset-4 hover:underline",
      },

      size: {
        default: "h-12 px-7 text-base",
        lg: "h-14 px-8 text-base",
        sm: "h-10 px-5 text-sm",
        icon: "size-11",
      },
    },

    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
};

export { buttonVariants };