"use client";

import Link from "next/link";
import { useAuth } from "../contexts/AuthContext";

interface SplitCTASectionProps {
  // Left side - current page
  leftHeading: string;
  leftSubheading?: string;
  leftButton: string;
  leftReturnUrl: string;
  onPostClick?: () => void;

  // Right side - other page
  // Right side - other page
  rightHeading: string;
  rightButton: string;
  rightLink: string;
  rightSubheading?: string;

  // Theme variant
  variant?: "blue" | "pink";
}

export default function SplitCTASection({
  leftHeading,
  leftSubheading = "Đăng tin tìm bạn ngay!",
  leftButton,
  leftReturnUrl,
  onPostClick,
  rightHeading,
  rightButton,
  rightLink,
  rightSubheading = "Khám phá thêm nhiều lựa chọn khác!",
  variant = "blue",
}: SplitCTASectionProps) {
  const { isAuthenticated } = useAuth();

  // Define colors based on variant
  const leftBgColor = variant === "blue"
    ? "bg-blue-200"
    : "bg-pink-200";

  const rightBgColor = variant === "blue"
    ? "bg-pink-200"
    : "bg-blue-200";

  return (
    <div className="mt-12 sm:mt-20 grid gap-4 sm:gap-6 md:grid-cols-2">
      {/* Left side - Post */}
      <div className={`rounded-xl border-2 border-black ${leftBgColor} p-5 sm:p-8 text-center shadow-[var(--shadow-primary)]`}>
        <h2 className="mb-3 sm:mb-4 text-xl sm:text-2xl font-bold">{leftHeading}</h2>
        {leftSubheading && (
          <p className="mb-4 sm:mb-6 text-sm sm:text-base text-zinc-700">
            {leftSubheading}
          </p>
        )}
        {isAuthenticated ? (
          <button
            onClick={() => {
              onPostClick?.();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="btn-secondary text-sm sm:text-base w-full sm:w-auto px-6 sm:px-8 whitespace-nowrap mx-auto"
          >
            {leftButton}
          </button>
        ) : (
          <Link
            href={`/auth?returnUrl=${leftReturnUrl}`}
            className="btn-secondary text-sm sm:text-base block w-full sm:w-auto px-6 sm:px-8 whitespace-nowrap mx-auto"
          >
            Đăng nhập để đăng tin
          </Link>
        )}
      </div>

      {/* Right side - Switch */}
      <div className={`rounded-xl border-2 border-black ${rightBgColor} p-5 sm:p-8 text-center shadow-[var(--shadow-primary)]`}>
        <h2 className="mb-3 sm:mb-4 text-xl sm:text-2xl font-bold">{rightHeading}</h2>
        {rightSubheading && (
          <p className="mb-4 sm:mb-6 text-sm sm:text-base text-zinc-700">
            {rightSubheading}
          </p>
        )}
        <Link
          href={rightLink}
          className="btn-secondary text-sm sm:text-base block w-full sm:w-auto px-6 sm:px-8 whitespace-nowrap mx-auto"
        >
          {rightButton}
        </Link>
      </div>
    </div>
  );
}
