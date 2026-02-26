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
        /* GRADIENT PRIMARY */
        primary:
          "bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 text-zinc-800 shadow-md hover:scale-105 hover:shadow-lg font-semibold",

        /* DARK GLASS SECONDARY */
        secondary:
          "border border-zinc-700 bg-zinc-900/60 backdrop-blur text-zinc-200 hover:bg-zinc-800 hover:border-zinc-600 hover:scale-105 hover:shadow-lg font-semibold",

        /* ЖИДКОЕ СТЕКЛО */
        liquid:
          "relative overflow-hidden bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 text-zinc-800 shadow-md hover:shadow-lg font-semibold before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700 before:ease-in-out",

        //Outline
        outline:
          "border border-zinc-700 bg-transparent hover:bg-zinc-800",

        //Ghost
        ghost:
          "hover:bg-accent hover:text-accent-foreground",
        //Link
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