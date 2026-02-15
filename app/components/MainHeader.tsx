"use client";

import Link from "next/link";
import { useAuth } from "../contexts/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { User } from "lucide-react";
import HeaderLogo from "./HeaderLogo";
import NavLink from "./NavLink";

export default function MainHeader() {
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    logout();
    router.push("/auth");
  };

  // Admin navigation
  if (isAdmin) {
    return (
      <header className="sticky top-0 z-50 border-b-2 border-black bg-black backdrop-blur-md">
        <div className="wrapper py-4 md:py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 sm:gap-6">
              <HeaderLogo className="h-28" />
              <NavLink href="/admin" className="text-white text-sm font-bold hidden sm:block">
                Trang chính
              </NavLink>
              <NavLink href="/admin/moderation" className="text-white text-sm font-bold hidden sm:block">
                Duyệt tin đăng
              </NavLink>
              <NavLink href="/admin/community" className="text-white text-sm font-bold hidden sm:block">
                Duyệt cộng đồng
              </NavLink>
              <NavLink href="/admin/blog" className="text-white text-sm font-bold hidden sm:block">
                Blog
              </NavLink>
              <NavLink href="/admin/management" className="text-white text-sm font-bold hidden sm:block">
                Quản lý
              </NavLink>
            </div>
            <div className="flex items-center gap-4 sm:gap-6">
              <span className="text-xs font-bold text-blue-300 bg-blue-300/20 px-3 py-1 rounded-full hidden sm:block">
                Admin
              </span>
              <button
                onClick={handleLogout}
                className="text-white text-sm font-bold hover:text-red-300 transition-colors"
              >
                Đăng xuất
              </button>
            </div>
          </div>
        </div>
      </header>
    );
  }

  // User navigation
  return (
    <header className="sticky top-0 z-50 border-b-2 border-black bg-black backdrop-blur-md">
      <div className="wrapper py-4 md:py-5">
        <div className="flex items-center justify-between">
          {/* Left side: Logo + Main navigation */}
          <div className="flex items-center gap-4 sm:gap-6">
            <HeaderLogo className="h-28" />
            <NavLink
              href="/"
              className="text-white text-sm font-bold hidden sm:block"
            >
              Trang chủ
            </NavLink>
            <NavLink
              href="/roommate"
              className="text-white text-sm font-bold hidden sm:block"
            >
              Tìm bạn ở chung
            </NavLink>
            <NavLink
              href="/roomshare"
              className="text-white text-sm font-bold hidden sm:block"
            >
              Tìm phòng share
            </NavLink>
            <NavLink
              href="/short-term"
              className="text-white text-sm font-bold hidden sm:block"
            >
              Phòng ngắn ngày
            </NavLink>
            <NavLink
              href="/sublease"
              className="text-white text-sm font-bold hidden sm:block"
            >
              Phòng sang lại
            </NavLink>
          </div>

          {/* Right side: What's Hot, Community, User icon */}
          <div className="flex items-center gap-4 sm:gap-6">
            <NavLink
              href="/whats-hot"
              className="text-white text-sm font-bold hidden sm:block"
            >
              Có gì mới?
            </NavLink>
            <NavLink
              href="/community"
              className="text-white text-sm font-bold hidden sm:block"
            >
              Cộng đồng
            </NavLink>
            {isAuthenticated ? (
              <Link
                href="/profile"
                className="text-white hover:text-blue-300 transition-colors duration-200"
                title="Hồ sơ của bạn"
              >
                <User className="w-8 h-8" />
              </Link>
            ) : (
              <Link
                href={`/auth?returnUrl=${pathname}`}
                onClick={(e) => {
                  e.preventDefault();
                  setTimeout(() => {
                    window.location.href = `/auth?returnUrl=${pathname}`;
                  }, 250);
                }}
                className="text-white hover:text-blue-300 transition-colors duration-200"
                title="Đăng nhập"
              >
                <User className="w-8 h-8" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
