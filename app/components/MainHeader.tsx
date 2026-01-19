"use client";

import Link from "next/link";
import { useAuth } from "../contexts/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { User } from "lucide-react";
import HeaderLogo from "./HeaderLogo";
import NavLink from "./NavLink";

export default function MainHeader() {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    logout();
    router.push("/auth");
  };

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
              Tìm phòng
            </NavLink>
          </div>

          {/* Right side: What's Hot, Community, User icon */}
          <div className="flex items-center gap-4 sm:gap-6">
            <NavLink
              href="/blog"
              className="text-white text-sm font-bold hidden sm:block"
            >
              What's Hot
            </NavLink>
            <NavLink
              href="/community"
              className="text-white text-sm font-bold hidden sm:block"
            >
              Community
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
