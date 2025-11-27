'use client';

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import HeaderLogo from "../components/HeaderLogo";

interface Sparkle {
  id: string;
  x: string;
  y: string;
  color: string;
  delay: number;
  scale: number;
}

const SparkleIcon = ({ id, x, y, color, delay, scale }: Sparkle) => {
  return (
    <motion.svg
      key={id}
      className="pointer-events-none absolute z-20"
      initial={{ opacity: 0, left: x, top: y }}
      animate={{
        opacity: [0, 0.8, 0],
        scale: [0, scale, 0],
        rotate: [75, 100, 120],
      }}
      transition={{ duration: 2.5, repeat: Infinity, delay }}
      width="18"
      height="18"
      viewBox="0 0 21 21"
    >
      <path
        d="M9.82531 0.843845C10.0553 0.215178 10.9446 0.215178 11.1746 0.843845L11.8618 2.72026C12.4006 4.19229 12.3916 6.39157 13.5 7.5C14.6084 8.60843 16.8077 8.59935 18.2797 9.13822L20.1561 9.82534C20.7858 10.0553 20.7858 10.9447 20.1561 11.1747L18.2797 11.8618C16.8077 12.4007 14.6084 12.3916 13.5 13.5C12.3916 14.6084 12.4006 16.8077 11.8618 18.2798L11.1746 20.1562C10.9446 20.7858 10.0553 20.7858 9.82531 20.1562L9.13819 18.2798C8.59932 16.8077 8.60843 14.6084 7.5 13.5C6.39157 12.3916 4.19225 12.4007 2.72023 11.8618L0.843814 11.1747C0.215148 10.9447 0.215148 10.0553 0.843814 9.82534L2.72023 9.13822C4.19225 8.59935 6.39157 8.60843 7.5 7.5C8.60843 6.39157 8.59932 4.19229 9.13819 2.72026L9.82531 0.843845Z"
        fill={color}
      />
    </motion.svg>
  );
};

const steps = [
  {
    emoji: "📝",
    title: "Đăng ký tài khoản",
    description: "Tạo tài khoản miễn phí chỉ với email và số điện thoại.",
    duration: "1 phút",
    color: "bg-pink-200",
  },
  {
    emoji: "🏠",
    title: "Đăng bài tìm roommate",
    description: "Điền thông tin phòng, giá, khu vực và ngày dọn vào mong muốn.",
    duration: "5 phút",
    color: "bg-pink-200",
  },
  {
    emoji: "🤝",
    title: "Nhận liên hệ từ người quan tâm",
    description: "Người khác xem bài của bạn và gọi điện trực tiếp để trao đổi.",
    duration: "Ngay lập tức",
    color: "bg-purple-200",
  },
];

const benefits = [
  {
    emoji: "💸",
    text: "100% MIỄN PHÍ - không mất phí môi giới",
  },
  {
    emoji: "📞",
    text: "Kết nối TRỰC TIẾP qua số điện thoại",
  },
  {
    emoji: "⚡",
    text: "Đăng bài đơn giản, nhanh chóng",
  },
  {
    emoji: "✨",
    text: "Không cần tạo profile phức tạp",
  },
];

function LogoWithSparkles() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  const colors = { first: "#60A5FA", second: "#A78BFA" };

  // Fixed positions around logo - 22 sparkles
  const sparklePositions = [
    { x: "8%", y: "3%" },
    { x: "25%", y: "0%" },
    { x: "50%", y: "0%" },
    { x: "75%", y: "0%" },
    { x: "92%", y: "3%" },
    { x: "97%", y: "20%" },
    { x: "100%", y: "50%" },
    { x: "97%", y: "80%" },
    { x: "92%", y: "97%" },
    { x: "75%", y: "100%" },
    { x: "50%", y: "100%" },
    { x: "25%", y: "100%" },
    { x: "8%", y: "97%" },
    { x: "3%", y: "80%" },
    { x: "0%", y: "50%" },
    { x: "3%", y: "20%" },
    { x: "15%", y: "40%" },
    { x: "15%", y: "60%" },
    { x: "85%", y: "40%" },
    { x: "85%", y: "60%" },
    { x: "50%", y: "25%" },
    { x: "50%", y: "75%" },
  ];

  useEffect(() => {
    // Generate 22 sparkles around logo with random delays for chill effect
    const cornerSparkles: Sparkle[] = sparklePositions.map((pos, index) => ({
      id: `sparkle-${index}-${Date.now()}`,
      x: pos.x,
      y: pos.y,
      color: index % 2 === 0 ? colors.first : colors.second,
      delay: Math.random() * 3, // Random delay 0-3s for chill effect
      scale: 0.7 + Math.random() * 0.6, // Random scale 0.7-1.3
    }));
    
    setSparkles(cornerSparkles);
  }, []);

  return (
    <div className="relative mx-auto mb-6 w-fit">
      <Image 
        src="/logo/logo2.png" 
        alt="roomieVerse" 
        width={1680} 
        height={420}
        className="mx-auto -mt-4 h-96 w-auto"
        priority
      />
      {sparkles.map((sparkle) => (
        <SparkleIcon key={sparkle.id} {...sparkle} />
      ))}
    </div>
  );
}

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b-2 border-black bg-white backdrop-blur-md">
        <div className="wrapper py-4 md:py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <HeaderLogo className="h-28" />
              <span className="rounded-lg border-2 border-black bg-pink-300 px-3 py-1 text-xs font-bold shadow-[2px_2px_0_0_#000]">
                WELCOME TOUR
              </span>
            </div>

            <nav className="flex items-center gap-3 sm:gap-4">
              <Link
                href="/"
                className="hidden text-sm font-medium text-zinc-600 hover:text-black sm:block sm:text-base"
              >
                Landing
              </Link>
              <Link
                href="/home"
                className="hidden text-sm font-medium text-zinc-600 hover:text-black sm:block sm:text-base"
              >
                Trang chủ
              </Link>
              <Link
                href="/auth"
                className="btn-primary text-sm sm:text-base"
              >
                Đăng ký
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="section border-b-2 border-black bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 py-16 sm:py-24">
        <div className="wrapper">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-0 text-4xl font-bold leading-tight text-black sm:text-5xl md:text-6xl">
              Chào mừng đến với
              <br />
            </h1>
            <LogoWithSparkles />
            <p className="mx-auto mb-10 max-w-2xl text-lg font-medium text-zinc-600 sm:text-xl">
              Tour hướng dẫn nhanh giúp bạn biết chính xác các bước cần hoàn thành 
              trước khi được hiển thị trên feed roomieVerse.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/auth" className="btn-primary text-base sm:text-lg px-8 py-4">
                Bắt đầu ngay →
              </Link>
              <Link href="/home" className="btn-secondary text-base sm:text-lg px-8 py-4">
                Xem thử trang chủ
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section py-16 md:py-20">
        <div className="wrapper">
          <h2 className="mb-4 text-center text-3xl font-bold uppercase sm:text-4xl md:text-5xl">
            Cách hoạt động
          </h2>
          <p className="mb-12 text-center text-lg text-zinc-600">
            Chỉ 3 bước đơn giản để tìm roommate!
          </p>

          <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
            {steps.map((step, index) => (
              <div 
                key={step.title} 
                className={`card group ${step.color}`}
              >
                <span className={`flex h-16 w-16 items-center justify-center rounded-full border-2 border-black text-2xl font-bold ${
                  index === 1 ? 'bg-pink-400' : 'bg-blue-300'
                }`}>
                  0{index + 1}
                </span>
                <h3 className="mb-3 mt-4 text-xl font-bold sm:text-2xl">
                  {step.title}
                </h3>
                <p className="mb-4 text-sm font-medium leading-relaxed text-zinc-700 sm:text-base">
                  {step.description}
                </p>
                <div className="inline-block rounded-lg border-2 border-black bg-white px-3 py-1.5 text-sm font-bold">
                  ⏱ {step.duration}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="section py-16 md:py-20">
        <div className="wrapper">
          <div className="card bg-gradient-to-br from-pink-200 to-pink-300 p-8 text-center sm:p-12 lg:p-16">
            <h2 className="mb-4 text-3xl font-black uppercase sm:mb-6 sm:text-4xl md:text-5xl">
              Sẵn sàng tìm roommate?
            </h2>
            <p className="mb-8 text-base font-bold sm:text-lg md:text-xl">
              Đăng bài MIỄN PHÍ ngay hôm nay và kết nối với hàng nghìn người đang tìm phòng!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/share" className="btn-primary text-base sm:text-lg px-8 py-4">
                Đăng bài ngay 🚀
              </Link>
              <Link href="/home" className="btn-secondary text-base sm:text-lg px-8 py-4">
                Xem bài đăng
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-black bg-gradient-to-br from-black to-gray-900 py-4 text-white md:py-5">
        <div className="wrapper">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:gap-5">
            <Image 
              src="/logo/logo2.png" 
              alt="roomieVerse" 
              width={600} 
              height={150}
              className="h-32 w-auto -my-4"
            />
            <div className="flex flex-wrap justify-center gap-4 text-sm font-bold sm:gap-6">
              <Link
                href="/share"
                className="transition-all duration-200 hover:scale-110 hover:text-pink-400"
              >
                Tìm phòng
              </Link>
              <Link
                href="/auth"
                className="transition-all duration-200 hover:scale-110 hover:text-blue-300"
              >
                Đăng ký
              </Link>
              <Link
                href="/home"
                className="transition-all duration-200 hover:scale-110 hover:text-purple-400"
              >
                Trang chủ
              </Link>
              <Link
                href="/profile"
                className="transition-all duration-200 hover:scale-110 hover:text-yellow-300"
              >
                Hồ sơ
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
