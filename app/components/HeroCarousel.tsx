"use client";

import { useState, useEffect } from "react";

const slides = [
  {
    id: 1,
    title: "Tìm roommate chỉ trong 48 giờ",
    description: "Kết nối trực tiếp với người tìm phòng phù hợp. Không môi giới. Không phí ẩn.",
    highlight: "48 giờ",
    gradientFrom: "from-emerald-400",
    gradientTo: "to-teal-400",
    bgGradient: "from-emerald-50",
    bgGradientTo: "to-teal-50",
    emoji: "⚡",
  },
  {
    id: 2,
    title: "97% người dùng hài lòng",
    description: "Cộng đồng chia sẻ nhà được chọn lọc kỹ càng. Chỉ người thật, tin thật.",
    highlight: "97%",
    gradientFrom: "from-blue-400",
    gradientTo: "to-cyan-400",
    bgGradient: "from-blue-50",
    bgGradientTo: "to-cyan-50",
    emoji: "✨",
  },
  {
    id: 3,
    title: "Hoàn toàn miễn phí",
    description: "Đăng tin, tìm kiếm, kết nối. Tất cả đều miễn phí 100%.",
    highlight: "0đ",
    gradientFrom: "from-violet-400",
    gradientTo: "to-purple-400",
    bgGradient: "from-violet-50",
    bgGradientTo: "to-purple-50",
    emoji: "🎉",
  },
  {
    id: 4,
    title: "Match theo lối sống",
    description: "Thuật toán thông minh giúp bạn tìm roommate có chung sở thích và thói quen.",
    highlight: "Smart Match",
    gradientFrom: "from-pink-400",
    gradientTo: "to-rose-400",
    bgGradient: "from-pink-50",
    bgGradientTo: "to-rose-50",
    emoji: "🤝",
  },
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-[32px] border border-slate-200 shadow-2xl">
      {/* Slides */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className={`relative min-w-full bg-gradient-to-br ${slide.bgGradient} ${slide.bgGradientTo} px-8 py-20 lg:py-28`}
          >
            {/* Glass morphism overlay */}
            <div className="absolute inset-0 bg-white/40 backdrop-blur-sm"></div>

            <div className="relative z-10 flex flex-col items-center justify-center text-center">
              <div className="mb-6 text-7xl lg:text-8xl">{slide.emoji}</div>
              <div
                className={`mb-4 inline-block rounded-full border border-slate-200 bg-white/80 px-6 py-3 text-2xl font-bold shadow-lg backdrop-blur-md lg:text-3xl ${slide.gradientFrom} ${slide.gradientTo} bg-gradient-to-r bg-clip-text text-transparent`}
              >
                {slide.highlight}
              </div>
              <h2 className="mb-4 text-4xl font-semibold leading-tight text-slate-900 lg:text-5xl">
                {slide.title}
              </h2>
              <p className="max-w-2xl text-lg font-medium text-slate-700 lg:text-xl">
                {slide.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2.5 rounded-full transition-all ${
              currentSlide === index
                ? "w-8 bg-emerald-500 shadow-md"
                : "w-2.5 bg-white/60 backdrop-blur-sm hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() =>
          setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
        }
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-slate-200 bg-white/80 p-3 text-xl font-bold text-slate-900 shadow-lg backdrop-blur-md transition hover:bg-white hover:shadow-xl"
        aria-label="Previous slide"
      >
        ←
      </button>
      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-slate-200 bg-white/80 p-3 text-xl font-bold text-slate-900 shadow-lg backdrop-blur-md transition hover:bg-white hover:shadow-xl"
        aria-label="Next slide"
      >
        →
      </button>
    </div>
  );
}
