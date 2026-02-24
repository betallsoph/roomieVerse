"use client";

import { useEffect } from "react";
import Link from "next/link";
import MainHeader from "./components/MainHeader";
import ShareFooter from "./components/ShareFooter";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col">
      <MainHeader />

      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="max-w-lg w-full text-center">
          {/* Icon */}
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl border-2 border-black bg-red-100 flex items-center justify-center shadow-[3px_3px_0_0_#000]">
            <AlertTriangle className="w-10 h-10 text-red-600" />
          </div>

          <h1 className="text-3xl md:text-4xl font-black mb-2">Có lỗi xảy ra</h1>
          <p className="text-zinc-500 mb-6">
            Đã có lỗi xảy ra khi tải trang này. Thử lại hoặc quay về trang chủ.
          </p>

          {/* Error details (dev only) */}
          {process.env.NODE_ENV === "development" && error.message && (
            <div className="mb-6 rounded-xl border-2 border-black bg-white p-4 text-left">
              <p className="text-sm font-mono text-red-600 break-words">
                {error.message}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => reset()}
              className="flex items-center gap-2 px-6 py-3 font-bold border-2 border-black rounded-xl bg-white hover:bg-zinc-50 transition-colors shadow-[2px_2px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
            >
              <RotateCcw className="w-4 h-4" />
              Thử lại
            </button>
            <Link
              href="/"
              className="flex items-center gap-2 px-6 py-3 font-bold border-2 border-black rounded-xl bg-orange-300 hover:bg-orange-400 transition-colors shadow-[2px_2px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
            >
              <Home className="w-4 h-4" />
              Về trang chủ
            </Link>
          </div>
        </div>
      </main>

      <ShareFooter />
    </div>
  );
}
