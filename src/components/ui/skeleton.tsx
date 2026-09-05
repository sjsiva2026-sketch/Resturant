import * as React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "circular" | "rectangular";
  width?: string | number;
  height?: string | number;
}

function Skeleton({
  className,
  variant = "text",
  width,
  height,
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse bg-gray-200",
        {
          "rounded-md": variant === "text" || variant === "rectangular",
          "rounded-full": variant === "circular",
          "h-4 w-full": variant === "text" && !height && !width,
        },
        className
      )}
      style={{ width, height }}
      {...props}
    />
  );
}

export { Skeleton };
