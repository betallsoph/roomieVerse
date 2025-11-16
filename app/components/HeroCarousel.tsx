"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const slides = [
  {
    id: 1,
    title: "Tìm roommate chỉ trong 48 giờ",
    description: "Kết nối trực tiếp với người tìm phòng phù hợp. Không môi giới. Không phí ẩn.",
    highlight: "48 giờ",
    bgColor: "bg-gradient-to-br from-[#FFE951] via-[#FFE951] to-[#FFD700]",
    emoji: "⚡",
  },
  {
    id: 2,
    title: "97% người dùng hài lòng",
    description: "Cộng đồng chia sẻ nhà được chọn lọc kỹ càng. Chỉ người thật, tin thật.",
    highlight: "97%",
    bgColor: "bg-gradient-to-br from-[#87CEEB] via-[#87CEEB] to-[#5FACCE]",
    emoji: "✨",
  },
  {
    id: 3,
    title: "Hoàn toàn miễn phí",
    description: "Đăng tin, tìm kiếm, kết nối. Tất cả đều miễn phí 100%.",
    highlight: "0đ",
    bgColor: "bg-gradient-to-br from-[#4ECDC4] via-[#4ECDC4] to-[#3AAFA9]",
    emoji: "🎉",
  },
  {
    id: 4,
    title: "Match theo lối sống",
    description: "Thuật toán thông minh giúp bạn tìm roommate có chung sở thích và thói quen.",
    highlight: "Smart Match",
    bgColor: "bg-gradient-to-br from-[#FF6B6B] via-[#FF6B6B] to-[#EE5A52]",
    emoji: "🤝",
  },
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 700);
  }, [isTransitioning]);

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % slides.length);
  }, [currentSlide, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
  }, [currentSlide, goToSlide]);

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      timerRef.current = setInterval(nextSlide, 5000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isAutoPlaying, nextSlide]);

  // Touch/swipe handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsAutoPlaying(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      prevSlide();
    }

    setTouchStart(0);
    setTouchEnd(0);
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        prevSlide();
        setIsAutoPlaying(false);
      } else if (e.key === "ArrowRight") {
        nextSlide();
        setIsAutoPlaying(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  return (
    <div
      className="group relative mx-auto mb-8 max-w-7xl overflow-hidden rounded-2xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] md:mb-12 md:rounded-3xl lg:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] lg:hover:shadow-[20px_20px_0px_0px_rgba(0,0,0,1)]"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides */}
      <div
        className="flex transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)]"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`${slide.bgColor} relative flex min-w-full flex-col items-center justify-center px-6 py-16 text-center sm:px-8 sm:py-20 md:py-24 lg:py-32 xl:py-36`}
          >
            {/* Decorative gradient overlay for depth */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center">
              {/* Emoji with subtle animation */}
              <div
                className={`mb-4 text-6xl transition-all duration-700 sm:mb-6 sm:text-7xl md:text-8xl lg:text-9xl ${
                  currentSlide === index ? "scale-100 opacity-100" : "scale-90 opacity-0"
                }`}
                style={{ transitionDelay: currentSlide === index ? "200ms" : "0ms" }}
              >
                {slide.emoji}
              </div>

              {/* Highlight badge */}
              <div
                className={`mb-3 inline-block border-3 border-black bg-white px-4 py-1.5 text-lg font-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all duration-700 sm:mb-4 sm:border-4 sm:px-6 sm:py-2 sm:text-xl sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:text-2xl lg:text-3xl ${
                  currentSlide === index ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
                style={{ transitionDelay: currentSlide === index ? "300ms" : "0ms" }}
              >
                {slide.highlight}
              </div>

              {/* Title */}
              <h2
                className={`mb-3 max-w-4xl text-3xl font-black leading-tight transition-all duration-700 sm:mb-4 sm:text-4xl md:text-5xl lg:text-6xl ${
                  currentSlide === index ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
                style={{ transitionDelay: currentSlide === index ? "400ms" : "0ms" }}
              >
                {slide.title}
              </h2>

              {/* Description */}
              <p
                className={`max-w-2xl text-base font-bold text-gray-800 transition-all duration-700 sm:text-lg md:text-xl lg:text-2xl ${
                  currentSlide === index ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
                style={{ transitionDelay: currentSlide === index ? "500ms" : "0ms" }}
              >
                {slide.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Progress indicators */}
      <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2 sm:bottom-6 sm:gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            disabled={isTransitioning}
            className={`group/dot relative h-3 w-3 border-2 border-black transition-all duration-300 sm:h-4 sm:w-4 sm:border-3 ${
              currentSlide === index
                ? "scale-110 bg-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                : "bg-white/90 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:scale-105 hover:bg-white"
            }`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={currentSlide === index}
          >
            {/* Progress bar for current slide */}
            {currentSlide === index && isAutoPlaying && (
              <div
                className="absolute inset-0 bg-white/30"
                style={{
                  animation: "progress 5s linear",
                }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Navigation Arrows - Hidden on mobile, visible on tablet+ */}
      <button
        onClick={prevSlide}
        disabled={isTransitioning}
        className="absolute left-2 top-1/2 z-20 hidden -translate-y-1/2 border-3 border-black bg-white/95 p-2 text-xl font-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:bg-white hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:scale-95 disabled:opacity-50 sm:p-3 sm:text-2xl md:left-4 md:block lg:p-4 lg:text-3xl"
        aria-label="Previous slide"
      >
        ←
      </button>
      <button
        onClick={nextSlide}
        disabled={isTransitioning}
        className="absolute right-2 top-1/2 z-20 hidden -translate-y-1/2 border-3 border-black bg-white/95 p-2 text-xl font-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:bg-white hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:scale-95 disabled:opacity-50 sm:p-3 sm:text-2xl md:right-4 md:block lg:p-4 lg:text-3xl"
        aria-label="Next slide"
      >
        →
      </button>

      {/* Auto-play indicator - only visible on hover on desktop */}
      <div className="absolute right-4 top-4 z-20 hidden items-center gap-2 rounded-full border-2 border-black bg-white/90 px-3 py-1.5 text-xs font-bold opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 lg:flex">
        <div className={`h-2 w-2 rounded-full ${isAutoPlaying ? "bg-green-500" : "bg-gray-400"}`} />
        <span>{isAutoPlaying ? "Auto" : "Paused"}</span>
      </div>
    </div>
  );
}

// Add this to your global CSS for the progress animation
const style = `
@keyframes progress {
  from {
    width: 0%;
  }
  to {
    width: 100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .transition-transform,
  .transition-all {
    transition-duration: 0.01ms !important;
  }
}
`;
