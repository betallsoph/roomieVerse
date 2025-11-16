import Link from "next/link";
import HeroCarousel from "./components/HeroCarousel";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b-4 border-black bg-white/95 backdrop-blur-md transition-all duration-300">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 md:py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="group flex items-center gap-2">
              <div className="border-3 border-black bg-black px-3 py-1.5 text-lg font-black text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 group-hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:border-4 sm:px-4 sm:py-2 sm:text-xl md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                ROOMIE
              </div>
              <div className="border-3 border-black bg-[#FFE951] px-3 py-1.5 text-lg font-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 group-hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:border-4 sm:px-4 sm:py-2 sm:text-xl md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                VERSE
              </div>
            </Link>

            <div className="flex items-center gap-2 sm:gap-4">
              <Link
                href="/share"
                className="hidden border-3 border-black px-4 py-2 font-bold transition-all duration-200 hover:scale-105 hover:bg-black hover:text-white hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:scale-95 sm:block"
              >
                Tìm phòng
              </Link>
              <Link
                href="/auth"
                className="border-3 border-black bg-[#4ECDC4] px-4 py-1.5 text-sm font-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 hover:scale-105 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:scale-95 sm:border-4 sm:px-6 sm:py-2 sm:text-base md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                Bắt đầu
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Carousel */}
      <section className="px-4 pt-8 sm:px-6 sm:pt-12">
        <HeroCarousel />
      </section>

      {/* Tagline Section - Apple/Chợ Tốt Style */}
      <section className="px-4 py-12 sm:px-6 sm:py-16 md:py-20">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="mb-4 text-3xl font-black leading-tight sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl">
            Không chỉ là tìm phòng.
            <br />
            <span className="bg-gradient-to-r from-[#FF6B6B] to-[#EE5A52] bg-clip-text text-transparent">
              Mà là tìm người đồng hành.
            </span>
          </h2>
          <p className="text-base font-medium text-gray-600 sm:text-lg md:text-xl lg:text-2xl">
            Thuật toán thông minh. Cộng đồng chất lượng. Miễn phí mãi mãi.
          </p>
        </div>
      </section>

      {/* Hero Section */}
      <section className="px-4 py-12 sm:px-6 md:py-16 lg:py-20">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mb-6 inline-block animate-pulse border-3 border-black bg-[#FFE951] px-4 py-1.5 text-xs font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:mb-8 sm:border-4 sm:px-6 sm:py-2 sm:text-sm md:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            🏠 Bắt đầu hành trình của bạn
          </div>

          <h1 className="mb-6 text-4xl font-black leading-tight sm:mb-8 sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
            Nền tảng tìm
            <br />
            <span className="relative inline-block">
              <span className="relative z-10">roommate</span>
              <span className="absolute bottom-1 left-0 -z-0 h-4 w-full bg-[#87CEEB] sm:bottom-2 sm:h-5 md:h-6 lg:h-8"></span>
            </span>{" "}
            số 1 VN
          </h1>

          <p className="mb-8 text-base font-medium leading-relaxed text-gray-700 sm:mb-12 sm:text-lg md:text-xl lg:text-2xl">
            Kết nối trực tiếp, không môi giới.
            <br />
            Tìm người ở ghép phù hợp với lối sống của bạn.
          </p>

          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4 md:gap-6">
            <Link
              href="/share"
              className="group w-full border-3 border-black bg-gradient-to-br from-[#FF6B6B] to-[#EE5A52] px-8 py-4 text-base font-black uppercase text-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:scale-105 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:scale-95 sm:w-auto sm:border-4 sm:px-10 sm:py-5 sm:text-xl md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
            >
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                Tìm phòng ngay →
              </span>
            </Link>
            <Link
              href="/auth"
              className="group w-full border-3 border-black bg-white px-8 py-4 text-base font-black uppercase shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:scale-105 hover:bg-[#FAFAFA] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:scale-95 sm:w-auto sm:border-4 sm:px-10 sm:py-5 sm:text-xl md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
            >
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                Đăng tin miễn phí
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Value Props - Apple Style */}
      <section className="px-4 py-16 sm:px-6 md:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 sm:gap-10 md:gap-12 lg:grid-cols-3">
            <div className="group text-center transition-transform duration-300 hover:scale-105 lg:text-left">
              <div className="mb-4 inline-block text-5xl transition-transform duration-300 group-hover:scale-110 sm:mb-6 sm:text-6xl md:text-7xl">
                🎯
              </div>
              <h3 className="mb-3 text-xl font-black leading-tight sm:text-2xl md:text-3xl">
                Match chính xác.
                <br />
                <span className="text-[#FF6B6B]">Nhanh chóng.</span>
              </h3>
              <p className="text-sm font-medium leading-relaxed text-gray-600 sm:text-base md:text-lg">
                Thuật toán phân tích lối sống, sở thích, thói quen. Chỉ giới thiệu những người thực sự phù hợp với bạn.
              </p>
            </div>

            <div className="group text-center transition-transform duration-300 hover:scale-105 lg:text-left">
              <div className="mb-4 inline-block text-5xl transition-transform duration-300 group-hover:scale-110 sm:mb-6 sm:text-6xl md:text-7xl">
                💎
              </div>
              <h3 className="mb-3 text-xl font-black leading-tight sm:text-2xl md:text-3xl">
                Cộng đồng
                <br />
                <span className="text-[#4ECDC4]">được chọn lọc.</span>
              </h3>
              <p className="text-sm font-medium leading-relaxed text-gray-600 sm:text-base md:text-lg">
                Mọi thành viên đều được xác minh. Không spam, không lừa đảo, không môi giới giả danh.
              </p>
            </div>

            <div className="group text-center transition-transform duration-300 hover:scale-105 lg:text-left">
              <div className="mb-4 inline-block text-5xl transition-transform duration-300 group-hover:scale-110 sm:mb-6 sm:text-6xl md:text-7xl">
                🚀
              </div>
              <h3 className="mb-3 text-xl font-black leading-tight sm:text-2xl md:text-3xl">
                Đơn giản.
                <br />
                <span className="text-[#FFE951]">Miễn phí.</span>
              </h3>
              <p className="text-sm font-medium leading-relaxed text-gray-600 sm:text-base md:text-lg">
                Tạo hồ sơ trong 5 phút. Nhận gợi ý trong 24 giờ. Kết nối trong 48 giờ. Zero đồng.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-y-4 border-black bg-white px-4 py-16 sm:px-6 md:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-10 text-center text-3xl font-black uppercase sm:mb-12 sm:text-4xl md:mb-16 md:text-5xl lg:text-6xl">
            Tại sao chọn chúng tôi?
          </h2>

          <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
            <div className="group border-3 border-black bg-gradient-to-br from-[#FFE951] to-[#FFD700] p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:scale-105 hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] sm:border-4 sm:p-8 md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="mb-4 text-4xl transition-transform duration-300 group-hover:scale-110 sm:text-5xl">🤝</div>
              <h3 className="mb-3 text-xl font-black sm:text-2xl">Kết nối trực tiếp</h3>
              <p className="text-sm font-medium leading-relaxed text-gray-800 sm:text-base">
                Gặp gỡ và chat trực tiếp với người tìm phòng. Không qua môi giới, không phí ẩn.
              </p>
            </div>

            <div className="group border-3 border-black bg-gradient-to-br from-[#87CEEB] to-[#5FACCE] p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:scale-105 hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] sm:border-4 sm:p-8 md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="mb-4 text-4xl transition-transform duration-300 group-hover:scale-110 sm:text-5xl">✅</div>
              <h3 className="mb-3 text-xl font-black sm:text-2xl">Tin đăng thật</h3>
              <p className="text-sm font-medium leading-relaxed text-gray-800 sm:text-base">
                Mọi tin đăng được kiểm duyệt. Chỉ có người thật đăng tin thật.
              </p>
            </div>

            <div className="group border-3 border-black bg-gradient-to-br from-[#FF6B6B] to-[#EE5A52] p-6 text-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:scale-105 hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] sm:border-4 sm:p-8 md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="mb-4 text-4xl transition-transform duration-300 group-hover:scale-110 sm:text-5xl">⚡</div>
              <h3 className="mb-3 text-xl font-black sm:text-2xl">Nhanh chóng</h3>
              <p className="text-sm font-medium leading-relaxed sm:text-base">
                Tìm được phòng phù hợp chỉ trong vài ngày. Đơn giản và tiện lợi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Stats */}
      <section className="px-4 py-16 sm:px-6 md:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 text-center sm:gap-8 md:grid-cols-3">
            <div className="group transition-transform duration-300 hover:scale-110">
              <div className="mb-2 bg-gradient-to-r from-[#FF6B6B] to-[#EE5A52] bg-clip-text text-4xl font-black text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
                2.4K+
              </div>
              <div className="text-base font-bold uppercase text-gray-600 sm:text-lg md:text-xl">
                Kết nối thành công
              </div>
            </div>
            <div className="group transition-transform duration-300 hover:scale-110">
              <div className="mb-2 bg-gradient-to-r from-[#4ECDC4] to-[#3AAFA9] bg-clip-text text-4xl font-black text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
                48h
              </div>
              <div className="text-base font-bold uppercase text-gray-600 sm:text-lg md:text-xl">
                Thời gian trung bình
              </div>
            </div>
            <div className="group transition-transform duration-300 hover:scale-110">
              <div className="mb-2 bg-gradient-to-r from-[#FFE951] to-[#FFD700] bg-clip-text text-4xl font-black text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
                97%
              </div>
              <div className="text-base font-bold uppercase text-gray-600 sm:text-lg md:text-xl">
                Hài lòng
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 sm:px-6 md:py-20 lg:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="relative overflow-hidden border-3 border-black bg-gradient-to-br from-[#4ECDC4] to-[#3AAFA9] p-8 text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] sm:border-4 sm:p-12 md:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] lg:p-16">
            {/* Decorative background pattern */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />

            <div className="relative z-10">
              <h2 className="mb-4 text-3xl font-black uppercase sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl">
                Sẵn sàng tìm roommate?
              </h2>
              <p className="mb-6 text-base font-bold sm:mb-8 sm:text-lg md:text-xl lg:text-2xl">
                Đăng tin hoàn toàn miễn phí. Kết nối ngay hôm nay!
              </p>
              <Link
                href="/share"
                className="group inline-block border-3 border-black bg-[#FFE951] px-8 py-4 text-base font-black uppercase shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:scale-105 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:scale-95 sm:border-4 sm:px-10 sm:py-5 sm:text-xl md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
              >
                <span className="inline-flex items-center gap-2">
                  Bắt đầu ngay
                  <span className="transition-transform duration-300 group-hover:translate-x-1">🚀</span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-4 border-black bg-gradient-to-br from-black to-gray-900 py-8 text-white md:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:gap-6">
            <p className="text-sm font-bold sm:text-base">© 2024 roomieVerse</p>
            <div className="flex flex-wrap justify-center gap-4 text-xs font-bold sm:gap-6 sm:text-sm">
              <Link
                href="/share"
                className="transition-all duration-200 hover:scale-110 hover:text-[#FFE951]"
              >
                Tìm phòng
              </Link>
              <Link
                href="/auth"
                className="transition-all duration-200 hover:scale-110 hover:text-[#4ECDC4]"
              >
                Đăng ký
              </Link>
              <Link
                href="/home"
                className="transition-all duration-200 hover:scale-110 hover:text-[#87CEEB]"
              >
                Trang chủ
              </Link>
              <Link
                href="/profile"
                className="transition-all duration-200 hover:scale-110 hover:text-[#FF6B6B]"
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
