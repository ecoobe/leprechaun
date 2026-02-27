"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold outline-none disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-white/40 transition-transform transition-shadow transition-background duration-300 ease-out",
  {
    variants: {
      variant: {
        /* LIQUID GLASS PRIMARY WITH LIGHTER GREEN GRADIENT AND SMOOTH ANIMATION */
        primary: `
          bg-gradient-to-r from-emerald-500/60 via-green-500/60 to-teal-500/60
          text-zinc-900
          backdrop-blur-md
          border border-white/20
          shadow-md
          hover:scale-105
          hover:shadow-lg
          active:scale-100
        `,

        /* PERFECT LIQUID DARK */
        secondary: `
          bg-zinc-900/60
          text-zinc-200
          backdrop-blur-md
          border border-white/10
          shadow-md
          hover:bg-zinc-800/60
          hover:shadow-lg
          hover:scale-105
          active:scale-100
        `,

        outline:
          "border border-zinc-700 bg-transparent hover:bg-zinc-800",

        ghost:
          "hover:bg-white/10",

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