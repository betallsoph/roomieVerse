"use client";

import Link from "next/link";
import { useAuth } from "../contexts/AuthContext";

interface CTASectionProps {
  heading: string;
  returnUrl: string;
  onPostClick?: () => void;
}

export default function CTASection({
  heading,
  returnUrl,
  onPostClick,
}: CTASectionProps) {
  const { isAuthenticated } = useAuth();

  return (
    <div className="mt-20 rounded-xl border-2 border-black bg-gradient-to-br from-blue-100 to-blue-200 p-16 text-center shadow-[var(--shadow-primary)]">
      <h2 className="mb-4 text-3xl font-bold">{heading}</h2>
      <p className="mb-8 text-lg text-zinc-700">
        Đăng tin tìm bạn ngay!
      </p>
      {isAuthenticated ? (
        <button
          onClick={() => {
            onPostClick?.();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="btn-primary text-base"
        >
          Đăng tin ngay
        </button>
      ) : (
        <Link
          href={`/auth?returnUrl=${returnUrl}`}
          className="btn-primary text-base"
        >
          Đăng nhập để đăng tin
        </Link>
      )}
    </div>
  );
}
