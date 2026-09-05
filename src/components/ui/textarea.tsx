import * as React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  maxLength?: number;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      maxLength,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const charCount = typeof value === "string" ? value.length : 0;

    return (
      <div className="flex w-full flex-col gap-1.5">
        {label && (
          <label className="text-sm font-medium text-[#1B4D3E]">
            {label}
          </label>
        )}
        <div className="relative">
          <textarea
            className={cn(
              "flex min-h-[80px] w-full rounded-md border bg-white px-3 py-2 text-sm text-[#1B4D3E] placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E] disabled:cursor-not-allowed disabled:opacity-50 transition-colors resize-y",
              error ? "border-red-500 focus-visible:ring-red-500" : "border-gray-300",
              className
            )}
            ref={ref}
            maxLength={maxLength}
            value={value}
            onChange={onChange}
            {...props}
          />
        </div>
        <div className="flex items-center justify-between">
          <p
            className={cn(
              "text-xs flex-1",
              error ? "text-red-500" : "text-gray-500"
            )}
          >
            {error || helperText}
          </p>
          {maxLength && (
            <span className="text-xs text-gray-400 ml-4">
              {charCount} / {maxLength}
            </span>
          )}
        </div>
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
