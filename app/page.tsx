import Link from "next/link";
import HeroCarousel from "./components/HeroCarousel";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <header className="border-b-4 border-black bg-white">
        <div className="mx-auto max-w-6xl px-6 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="border-4 border-black bg-black px-4 py-2 text-xl font-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                ROOMIE
              </div>
              <div className="border-4 border-black bg-[#FFE951] px-4 py-2 text-xl font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                VERSE
              </div>
            </Link>

            <div className="flex items-center gap-4">
              <Link
                href="/share"
                className="hidden border-3 border-black px-5 py-2 font-bold transition hover:bg-black hover:text-white sm:block"
              >
                Tìm phòng
              </Link>
              <Link
                href="/auth"
                className="border-4 border-black bg-[#4ECDC4] px-6 py-2 font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Bắt đầu
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Carousel */}
      <section className="px-6 pt-12">
        <HeroCarousel />
      </section>

      {/* Tagline Section - Apple/Chợ Tốt Style */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-3xl font-black leading-tight lg:text-5xl">
            Không chỉ là tìm phòng.
            <br />
            <span className="text-[#FF6B6B]">Mà là tìm người đồng hành.</span>
          </h2>
          <p className="text-lg font-medium text-gray-600 lg:text-xl">
            Thuật toán thông minh. Cộng đồng chất lượng. Miễn phí mãi mãi.
          </p>
        </div>
      </section>

      {/* Hero Section */}
      <section className="px-6 py-12 lg:py-16">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-8 inline-block border-4 border-black bg-[#FFE951] px-6 py-2 text-sm font-black uppercase shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            🏠 Bắt đầu hành trình của bạn
          </div>

          <h1 className="mb-8 text-5xl font-black leading-tight lg:text-7xl">
            Nền tảng tìm
            <br />
            <span className="relative inline-block">
              <span className="relative z-10">roommate</span>
              <span className="absolute bottom-2 left-0 -z-0 h-6 w-full bg-[#87CEEB]"></span>
            </span>{" "}
            số 1 VN
          </h1>

          <p className="mb-12 text-xl font-medium text-gray-700 lg:text-2xl">
            Kết nối trực tiếp, không môi giới.
            <br />
            Tìm người ở ghép phù hợp với lối sống của bạn.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/share"
              className="w-full border-4 border-black bg-[#FF6B6B] px-10 py-5 text-xl font-black uppercase text-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:w-auto"
            >
              Tìm phòng ngay
            </Link>
            <Link
              href="/auth"
              className="w-full border-4 border-black bg-white px-10 py-5 text-xl font-black uppercase shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:w-auto"
            >
              Đăng tin miễn phí
            </Link>
          </div>
        </div>
      </section>

      {/* Value Props - Apple Style */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="text-center lg:text-left">
              <div className="mb-6 text-6xl">🎯</div>
              <h3 className="mb-3 text-2xl font-black">
                Match chính xác.
                <br />
                Nhanh chóng.
              </h3>
              <p className="font-medium leading-relaxed text-gray-600">
                Thuật toán phân tích lối sống, sở thích, thói quen. Chỉ giới thiệu những người thực sự phù hợp với bạn.
              </p>
            </div>

            <div className="text-center lg:text-left">
              <div className="mb-6 text-6xl">💎</div>
              <h3 className="mb-3 text-2xl font-black">
                Cộng đồng
                <br />
                được chọn lọc.
              </h3>
              <p className="font-medium leading-relaxed text-gray-600">
                Mọi thành viên đều được xác minh. Không spam, không lừa đảo, không môi giới giả danh.
              </p>
            </div>

            <div className="text-center lg:text-left">
              <div className="mb-6 text-6xl">🚀</div>
              <h3 className="mb-3 text-2xl font-black">
                Đơn giản.
                <br />
                Miễn phí.
              </h3>
              <p className="font-medium leading-relaxed text-gray-600">
                Tạo hồ sơ trong 5 phút. Nhận gợi ý trong 24 giờ. Kết nối trong 48 giờ. Zero đồng.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-y-4 border-black bg-white px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-16 text-center text-4xl font-black uppercase lg:text-5xl">
            Tại sao chọn chúng tôi?
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="border-4 border-black bg-[#FFE951] p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="mb-4 text-5xl">🤝</div>
              <h3 className="mb-3 text-2xl font-black">Kết nối trực tiếp</h3>
              <p className="font-medium leading-relaxed text-gray-800">
                Gặp gỡ và chat trực tiếp với người tìm phòng. Không qua môi giới, không phí ẩn.
              </p>
            </div>

            <div className="border-4 border-black bg-[#87CEEB] p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="mb-4 text-5xl">✅</div>
              <h3 className="mb-3 text-2xl font-black">Tin đăng thật</h3>
              <p className="font-medium leading-relaxed text-gray-800">
                Mọi tin đăng được kiểm duyệt. Chỉ có người thật đăng tin thật.
              </p>
            </div>

            <div className="border-4 border-black bg-[#FF6B6B] p-8 text-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="mb-4 text-5xl">⚡</div>
              <h3 className="mb-3 text-2xl font-black">Nhanh chóng</h3>
              <p className="font-medium leading-relaxed">
                Tìm được phòng phù hợp chỉ trong vài ngày. Đơn giản và tiện lợi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Stats */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-8 text-center md:grid-cols-3">
            <div>
              <div className="mb-2 text-5xl font-black lg:text-6xl">2.4K+</div>
              <div className="text-lg font-bold uppercase text-gray-600">Kết nối thành công</div>
            </div>
            <div>
              <div className="mb-2 text-5xl font-black lg:text-6xl">48h</div>
              <div className="text-lg font-bold uppercase text-gray-600">Thời gian trung bình</div>
            </div>
            <div>
              <div className="mb-2 text-5xl font-black lg:text-6xl">97%</div>
              <div className="text-lg font-bold uppercase text-gray-600">Hài lòng</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="border-4 border-black bg-[#4ECDC4] p-12 text-center shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] lg:p-16">
            <h2 className="mb-6 text-4xl font-black uppercase lg:text-5xl">
              Sẵn sàng tìm roommate?
            </h2>
            <p className="mb-8 text-xl font-bold">
              Đăng tin hoàn toàn miễn phí. Kết nối ngay hôm nay!
            </p>
            <Link
              href="/share"
              className="inline-block border-4 border-black bg-[#FFE951] px-10 py-5 text-xl font-black uppercase shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              Bắt đầu ngay 🚀
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-4 border-black bg-black py-8 text-white">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="font-bold">© 2024 roomieVerse</p>
            <div className="flex gap-6 text-sm font-bold">
              <Link href="/share" className="transition hover:text-[#FFE951]">
                Tìm phòng
              </Link>
              <Link href="/auth" className="transition hover:text-[#FFE951]">
                Đăng ký
              </Link>
              <Link href="/home" className="transition hover:text-[#FFE951]">
                Trang chủ
              </Link>
              <Link href="/profile" className="transition hover:text-[#FFE951]">
                Hồ sơ
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
