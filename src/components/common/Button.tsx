import React from "react";
import { cn } from "../../utils/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "rounded-full font-semibold transition-all duration-200 flex items-center justify-center active:scale-95",
        {
          // Variants
          "bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700":
            variant === "primary",
          "bg-white text-emerald-600 hover:bg-emerald-50":
            variant === "secondary",
          "border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50":
            variant === "outline",

          // Sizes & Responsive Adjustments
          "px-3 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm md:px-6 md:py-3 md:text-base lg:px-4 lg:py-2 lg:text-sm": size === "sm",
          "px-4 py-2 text-sm sm:px-5 sm:py-3 sm:text-base md:px-8 md:py-4 md:text-lg lg:px-6 lg:py-3 lg:text-base": size === "md",
          "px-5 py-3 text-base sm:px-6 sm:py-4 sm:text-lg md:px-10 md:py-5 md:text-xl lg:px-8 lg:py-4 lg:text-lg": size === "lg",
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
