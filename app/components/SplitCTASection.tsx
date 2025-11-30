"use client";

import Link from "next/link";
import { useAuth } from "../contexts/AuthContext";

interface SplitCTASectionProps {
  // Left side - current page
  leftHeading: string;
  leftButton: string;
  leftReturnUrl: string;
  onPostClick?: () => void;

  // Right side - other page
  rightHeading: string;
  rightButton: string;
  rightLink: string;

  // Theme variant
  variant?: "blue" | "pink";
}

export default function SplitCTASection({
  leftHeading,
  leftButton,
  leftReturnUrl,
  onPostClick,
  rightHeading,
  rightButton,
  rightLink,
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
    <div className="mt-20 grid gap-6 md:grid-cols-2">
      {/* Left side - Post */}
      <div className={`rounded-xl border-2 border-black ${leftBgColor} p-8 text-center shadow-[var(--shadow-primary)]`}>
        <h2 className="mb-4 text-2xl font-bold">{leftHeading}</h2>
        <p className="mb-6 text-base text-zinc-700">
          Đăng tin của bạn ngay - MIỄN PHÍ mãi mãi!
        </p>
        {isAuthenticated ? (
          <button
            onClick={() => {
              onPostClick?.();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="btn-primary text-base w-full"
          >
            {leftButton}
          </button>
        ) : (
          <Link
            href={`/auth?returnUrl=${leftReturnUrl}`}
            className="btn-primary text-base block"
          >
            Đăng nhập để đăng tin
          </Link>
        )}
      </div>

      {/* Right side - Switch */}
      <div className={`rounded-xl border-2 border-black ${rightBgColor} p-8 text-center shadow-[var(--shadow-primary)]`}>
        <h2 className="mb-4 text-2xl font-bold">{rightHeading}</h2>
        <p className="mb-6 text-base text-zinc-700">
          Khám phá thêm nhiều lựa chọn khác!
        </p>
        <Link href={rightLink} className="btn-secondary text-base block">
          {rightButton}
        </Link>
      </div>
    </div>
  );
}
