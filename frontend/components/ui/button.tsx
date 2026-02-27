"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold outline-none transition-[transform,box-shadow,background] duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-white/40",
  {
    variants: {
      variant: {
        /* PERFECT LIQUID PRIMARY */
        primary: `
          bg-white/10
          text-white
          backdrop-blur-md
          border border-white/20
          shadow-[0_4px_20px_rgba(0,0,0,0.25)]
          hover:shadow-[0_6px_30px_rgba(0,0,0,0.35)]
          hover:scale-[1.03]
          active:scale-[0.98]
        `,

        /* PERFECT LIQUID DARK */
        secondary: `
          bg-white/5
          text-zinc-100
          backdrop-blur-md
          border border-white/10
          shadow-[0_4px_16px_rgba(0,0,0,0.3)]
          hover:bg-white/10
          hover:shadow-[0_8px_28px_rgba(0,0,0,0.4)]
          hover:scale-[1.03]
          active:scale-[0.98]
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