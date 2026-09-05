import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[#C9A96E] focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-[#1B4D3E] text-white hover:bg-[#1B4D3E]/80",
        success: "border-transparent bg-green-600 text-white hover:bg-green-600/80",
        warning: "border-transparent bg-amber-500 text-white hover:bg-amber-500/80",
        error: "border-transparent bg-red-600 text-white hover:bg-red-600/80",
        info: "border-transparent bg-blue-600 text-white hover:bg-blue-600/80",
        outline: "text-[#1B4D3E] border-[#1B4D3E]",
      },
      size: {
        sm: "px-2 py-0.5 text-[10px]",
        md: "px-2.5 py-0.5 text-xs",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
