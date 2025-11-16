"use client";

import { useState, useEffect } from "react";

const slides = [
  {
    id: 1,
    title: "Tìm roommate chỉ trong 48 giờ",
    description: "Kết nối trực tiếp với người tìm phòng phù hợp. Không môi giới. Không phí ẩn.",
    highlight: "48 giờ",
    bgColor: "bg-[#FFE951]",
    emoji: "⚡",
  },
  {
    id: 2,
    title: "97% người dùng hài lòng",
    description: "Cộng đồng chia sẻ nhà được chọn lọc kỹ càng. Chỉ người thật, tin thật.",
    highlight: "97%",
    bgColor: "bg-[#87CEEB]",
    emoji: "✨",
  },
  {
    id: 3,
    title: "Hoàn toàn miễn phí",
    description: "Đăng tin, tìm kiếm, kết nối. Tất cả đều miễn phí 100%.",
    highlight: "0đ",
    bgColor: "bg-[#4ECDC4]",
    emoji: "🎉",
  },
  {
    id: 4,
    title: "Match theo lối sống",
    description: "Thuật toán thông minh giúp bạn tìm roommate có chung sở thích và thói quen.",
    highlight: "Smart Match",
    bgColor: "bg-[#FF6B6B]",
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
    <div className="relative mx-auto mb-12 max-w-5xl overflow-hidden rounded-none border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
      {/* Slides */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className={`${slide.bgColor} flex min-w-full flex-col items-center justify-center px-8 py-20 text-center lg:py-28`}
          >
            <div className="mb-6 text-7xl lg:text-8xl">{slide.emoji}</div>
            <div className="mb-4 inline-block border-4 border-black bg-white px-6 py-2 text-2xl font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] lg:text-3xl">
              {slide.highlight}
            </div>
            <h2 className="mb-4 text-4xl font-black leading-tight lg:text-5xl">
              {slide.title}
            </h2>
            <p className="max-w-2xl text-lg font-bold text-gray-800 lg:text-xl">
              {slide.description}
            </p>
          </div>
        ))}
      </div>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-4 w-4 border-3 border-black transition-all ${
              currentSlide === index
                ? "bg-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                : "bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
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
        className="absolute left-4 top-1/2 -translate-y-1/2 border-4 border-black bg-white p-3 text-2xl font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
        aria-label="Previous slide"
      >
        ←
      </button>
      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 border-4 border-black bg-white p-3 text-2xl font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
        aria-label="Next slide"
      >
        →
      </button>
    </div>
  );
}
