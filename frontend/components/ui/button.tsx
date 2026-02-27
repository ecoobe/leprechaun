"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-ring/50 [&_svg]:shrink-0 overflow-hidden",
  {
    variants: {
      variant: {
        /* LIQUID GLASS PRIMARY */
        primary:
          `
          bg-gradient-to-r from-emerald-400/70 via-green-400/70 to-teal-400/70
          text-zinc-900
          backdrop-blur-xl
          border border-white/30
          shadow-lg shadow-emerald-500/20
          before:absolute before:inset-0
          before:rounded-full
          before:bg-white/10
          before:opacity-0
          before:transition-opacity
          hover:before:opacity-100
          hover:scale-105
          hover:shadow-emerald-400/40
          `,

        /* LIQUID GLASS SECONDARY */
        secondary:
          `
          bg-zinc-900/50
          text-zinc-100
          backdrop-blur-xl
          border border-white/10
          shadow-lg shadow-black/30
          before:absolute before:inset-0
          before:rounded-full
          before:bg-white/5
          before:opacity-0
          before:transition-opacity
          hover:before:opacity-100
          hover:bg-zinc-800/60
          hover:scale-105
          hover:shadow-black/50
          `,

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