"use client";

/**
 * ButtonV2 - Style button đặc biệt (ver2)
 * Dùng cho các nút như "Xem thêm", "Về đầu trang" trên trang listing
 *
 * @example
 * // Primary button (nền màu, viền đen)
 * <ButtonV2 variant="primary" color="blue">Xem thêm</ButtonV2>
 *
 * // Outline button (nền trắng, viền màu)
 * <ButtonV2 variant="outline" color="pink">Về đầu trang</ButtonV2>
 */

import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "../lib/utils";

interface ButtonV2Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline";
  color?: "blue" | "pink";
  size?: "sm" | "md" | "lg";
}

const ButtonV2 = forwardRef<HTMLButtonElement, ButtonV2Props>(
  (
    {
      className,
      variant = "primary",
      color = "blue",
      size = "md",
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center gap-2 rounded-md border-2 font-medium transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none";

    const sizeStyles = {
      sm: "h-10 w-32 text-xs",
      md: "h-12 w-40 text-sm",
      lg: "h-14 w-48 text-base",
    };

    const variantStyles = {
      primary: {
        blue: "border-black bg-blue-300 text-black hover:bg-blue-400",
        pink: "border-black bg-pink-300 text-black hover:bg-pink-400",
      },
      outline: {
        blue: "border-blue-400 bg-white text-blue-400 hover:bg-blue-400 hover:text-white",
        pink: "border-pink-400 bg-white text-pink-400 hover:bg-pink-400 hover:text-white",
      },
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          sizeStyles[size],
          variantStyles[variant][color],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

ButtonV2.displayName = "ButtonV2";

export default ButtonV2;
