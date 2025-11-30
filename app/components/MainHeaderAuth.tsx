"use client";

import Link from "next/link";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/navigation";
import HeaderLogo from "./HeaderLogo";

export default function MainHeaderAuth() {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/auth");
  };

  return (
    <header className="sticky top-0 z-50 border-b-2 border-black bg-white backdrop-blur-md">
      <div className="wrapper py-4 md:py-5">
        <div className="flex items-center justify-between">
          <HeaderLogo className="h-28" />

          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="/home"
              className="hidden text-sm font-medium text-zinc-600 hover:text-black sm:block sm:text-base"
            >
              Trang chủ
            </Link>
            <Link
              href="/profile"
              className="hidden text-sm font-medium text-zinc-600 hover:text-black sm:block sm:text-base"
            >
              Hồ sơ
            </Link>
            <button
              onClick={handleLogout}
              className="btn-primary text-sm sm:text-base"
            >
              Đăng xuất
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
