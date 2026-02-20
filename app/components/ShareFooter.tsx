"use client";

import Image from "next/image";
import NavLink from "./NavLink";
import { useState } from "react";

export default function ShareFooter() {
  const [isEnglish, setIsEnglish] = useState(false);

  return (
    <footer className="border-t-2 border-black bg-black py-4 text-white md:py-5">
      <div className="wrapper">
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row sm:gap-5">
          <Image
            src="/logo/logo2.png"
            alt="roomieVerse"
            width={600}
            height={150}
            className="h-20 sm:h-32 w-auto -my-2 sm:-my-4"
          />
          <div className="flex flex-wrap justify-center gap-3 text-xs sm:text-sm font-bold sm:gap-6">
            <NavLink href="/">
              Trang chủ
            </NavLink>
            <NavLink href="/roommate">
              Tìm bạn ở chung
            </NavLink>
            <NavLink href="/roomshare">
              Tìm phòng
            </NavLink>
            <NavLink href="/blog">
              Blog
            </NavLink>
            <NavLink href="/about">
              Về chúng tôi
            </NavLink>
          </div>
        </div>

        {/* Horizontal divider */}
        <div className="my-4 sm:my-6 border-t border-white opacity-30"></div>

        {/* Copyright and Language Switcher */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-xs sm:text-sm text-white opacity-70">
          <div className="text-center sm:text-left">© 2026 roomieVerse by 99%-from-AI Labs. All rights reserved.</div>

          {/* Language Toggle Switch */}
          <div className="flex items-center gap-3">
            <span
              key={!isEnglish ? `vi-active` : `vi-inactive`}
              className={`text-sm font-bold transition-all ${!isEnglish ? 'opacity-100 text-blue-300 animate-[wiggle-left_0.3s_ease-in-out]' : 'opacity-50 text-white'}`}
            >
              Tiếng Việt
            </span>

            {/* Toggle */}
            <button
              key={isEnglish ? 'en' : 'vi'}
              onClick={() => setIsEnglish(!isEnglish)}
              className={`relative w-14 h-7 rounded-full border-2 border-white border-opacity-40 hover:opacity-90 animate-[bounce-scale_0.25s_ease-out] ${isEnglish ? 'bg-pink-200' : 'bg-blue-200'
                }`}
            >
              <div
                className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full shadow-lg border-2 border-white transition-all duration-300 ease-in-out ${isEnglish ? 'translate-x-7 bg-pink-300' : 'translate-x-0 bg-blue-300'
                  }`}
              ></div>
            </button>
            <style jsx>{`
              @keyframes bounce-scale {
                0% { transform: scale(1); }
                50% { transform: scale(1.1); }
                100% { transform: scale(1); }
              }
              @keyframes wiggle-left {
                0% { transform: translateX(0); }
                50% { transform: translateX(-5px); }
                100% { transform: translateX(0); }
              }
              @keyframes wiggle-right {
                0% { transform: translateX(0); }
                50% { transform: translateX(5px); }
                100% { transform: translateX(0); }
              }
            `}</style>

            <span
              key={isEnglish ? `en-active` : `en-inactive`}
              className={`text-sm font-bold transition-all ${isEnglish ? 'opacity-100 text-pink-300 animate-[wiggle-right_0.3s_ease-in-out]' : 'opacity-50 text-white'}`}
            >
              English
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
