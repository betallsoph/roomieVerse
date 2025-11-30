"use client";

import Link from "next/link";
import Image from "next/image";
import MainHeader from "./components/MainHeader";
import ShareFooter from "./components/ShareFooter";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <MainHeader />

      {/* 404 Content */}
      <main className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="max-w-5xl w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left side - Text content */}
            <div className="text-center md:text-left order-2 md:order-1">
              <h1 className="text-[180px] md:text-[220px] font-black text-blue-300 leading-none mb-6" style={{ fontFamily: 'var(--font-google-sans)', borderRadius: '24px' }}>404</h1>
              <h2 className="text-4xl font-black text-black mb-4">
                Lạc đường rồi!
              </h2>
              <p className="text-lg text-zinc-700 font-medium mb-8">
                Bạn đang ở một nơi vắng vẻ. Hãy quay lại hoặc tìm kiếm người đồng hành mới.
              </p>
              <Link
                href="/"
                className="btn-primary text-base sm:text-lg px-8 py-4"
              >
                Quay lại trang chủ
              </Link>
            </div>

            {/* Right side - Illustration */}
            <div className="flex justify-center order-1 md:order-2">
              <Image
                src="/assets/error/404.png"
                alt="Lost person with map"
                width={400}
                height={400}
                className="w-full max-w-md h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </main>

      <ShareFooter />
    </div>
  );
}
