"use client";

import Link from "next/link";
import HeaderLogo from "./HeaderLogo";

export default function MainHeaderGuest() {
  return (
    <header className="sticky top-0 z-50 border-b-2 border-black bg-white backdrop-blur-md">
      <div className="wrapper py-4 md:py-5">
        <div className="flex items-center justify-between">
          <HeaderLogo className="h-28" />

          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="/auth"
              className="btn-primary text-base sm:text-lg px-8 py-3"
            >
              Bắt đầu
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
