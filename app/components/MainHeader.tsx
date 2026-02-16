"use client";

import Link from "next/link";
import { useAuth } from "../contexts/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { User, Menu, X } from "lucide-react";
import HeaderLogo from "./HeaderLogo";
import NavLink from "./NavLink";
import { useState, useEffect } from "react";

export default function MainHeader() {
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

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
    <>
      <header className="sticky top-0 z-50 border-b-2 border-black bg-black backdrop-blur-md">
        <div className="wrapper py-3 sm:py-4 md:py-5">
          <div className="flex items-center justify-between">
            {/* Left side: Logo + Desktop nav */}
            <div className="flex items-center gap-4 sm:gap-6">
              <HeaderLogo className="h-20 sm:h-28" />
              {/* Desktop nav links - hidden on mobile */}
              <div className="hidden sm:flex items-center gap-6">
                <NavLink href="/" className="text-white text-sm font-bold">
                  Trang chủ
                </NavLink>
                <NavLink href="/roommate" className="text-white text-sm font-bold">
                  Tìm bạn ở chung
                </NavLink>
                <NavLink href="/roomshare" className="text-white text-sm font-bold">
                  Tìm phòng share
                </NavLink>
                <NavLink href="/short-term" className="text-white text-sm font-bold">
                  Phòng ngắn ngày
                </NavLink>
                <NavLink href="/sublease" className="text-white text-sm font-bold">
                  Phòng sang lại
                </NavLink>
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3 sm:gap-6">
              {/* Desktop-only links */}
              <div className="hidden sm:flex items-center gap-6">
                <NavLink href="/whats-hot" className="text-white text-sm font-bold">
                  Có gì mới?
                </NavLink>
                <NavLink href="/community" className="text-white text-sm font-bold">
                  Cộng đồng
                </NavLink>
              </div>

              {/* User icon - always visible */}
              {isAuthenticated ? (
                <Link
                  href="/profile"
                  className="text-white hover:text-blue-300 transition-colors duration-200"
                  title="Hồ sơ của bạn"
                >
                  <User className="w-7 h-7 sm:w-8 sm:h-8" />
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
                  <User className="w-7 h-7 sm:w-8 sm:h-8" />
                </Link>
              )}

              {/* Mobile hamburger menu */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="sm:hidden text-white p-1"
                aria-label="Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay - outside header to avoid stacking context issues */}
      {mobileMenuOpen && (
        <div className="sm:hidden fixed inset-0 top-0 z-[999] bg-black/95 backdrop-blur-md overflow-y-auto">
          {/* Close bar */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/20">
            <HeaderLogo className="h-16" />
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-white p-1"
              aria-label="Đóng menu"
            >
              <X className="w-7 h-7" />
            </button>
          </div>
          <nav className="flex flex-col p-5 gap-1">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="text-white text-base font-bold py-3 px-4 rounded-lg hover:bg-white/10 transition-colors">
              Trang chủ
            </Link>
            <Link href="/roommate" onClick={() => setMobileMenuOpen(false)} className="text-white text-base font-bold py-3 px-4 rounded-lg hover:bg-white/10 transition-colors">
              Tìm bạn ở chung
            </Link>
            <Link href="/roomshare" onClick={() => setMobileMenuOpen(false)} className="text-white text-base font-bold py-3 px-4 rounded-lg hover:bg-white/10 transition-colors">
              Tìm phòng share
            </Link>
            <Link href="/short-term" onClick={() => setMobileMenuOpen(false)} className="text-white text-base font-bold py-3 px-4 rounded-lg hover:bg-white/10 transition-colors">
              Phòng ngắn ngày
            </Link>
            <Link href="/sublease" onClick={() => setMobileMenuOpen(false)} className="text-white text-base font-bold py-3 px-4 rounded-lg hover:bg-white/10 transition-colors">
              Phòng sang lại
            </Link>

            <div className="my-3 border-t border-white/20" />

            <Link href="/whats-hot" onClick={() => setMobileMenuOpen(false)} className="text-white text-base font-bold py-3 px-4 rounded-lg hover:bg-white/10 transition-colors">
              Có gì mới?
            </Link>
            <Link href="/community" onClick={() => setMobileMenuOpen(false)} className="text-white text-base font-bold py-3 px-4 rounded-lg hover:bg-white/10 transition-colors">
              Cộng đồng
            </Link>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="text-white text-base font-bold py-3 px-4 rounded-lg hover:bg-white/10 transition-colors">
              Về chúng tôi
            </Link>

            <div className="my-3 border-t border-white/20" />

            {isAuthenticated ? (
              <Link href="/profile" onClick={() => setMobileMenuOpen(false)} className="text-blue-300 text-base font-bold py-3 px-4 rounded-lg hover:bg-white/10 transition-colors">
                Hồ sơ của bạn
              </Link>
            ) : (
              <Link href={`/auth?returnUrl=${pathname}`} onClick={() => setMobileMenuOpen(false)} className="text-blue-300 text-base font-bold py-3 px-4 rounded-lg hover:bg-white/10 transition-colors">
                Đăng nhập / Đăng ký
              </Link>
            )}
          </nav>
        </div>
      )}
    </>
  );
}
