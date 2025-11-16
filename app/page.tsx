import Link from "next/link";
import HeroCarousel from "./components/HeroCarousel";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-slate-50 to-white pb-16">
      <div className="mx-auto max-w-6xl px-6 pt-10 lg:px-12">
        {/* Header */}
        <header className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-white/60 px-6 py-4 shadow-sm backdrop-blur">
          <Link href="/" className="text-lg font-semibold text-slate-900">
            roomie<span className="text-emerald-500">Verse</span>
          </Link>
          <div className="flex flex-wrap items-center gap-3 text-sm font-medium">
            <Link href="/share" className="text-slate-500 transition hover:text-slate-900">
              Tìm phòng
            </Link>
            <Link href="/home" className="text-slate-500 transition hover:text-slate-900">
              Trang chủ
            </Link>
            <Link
              href="/auth"
              className="rounded-full bg-emerald-500 px-5 py-2 text-white transition hover:bg-emerald-600"
            >
              Bắt đầu
            </Link>
          </div>
        </header>

        {/* Hero Carousel */}
        <section className="mt-12">
          <HeroCarousel />
        </section>

        {/* Tagline Section - Glass Morphism Style */}
        <section className="mt-12">
          <div className="rounded-[32px] border border-slate-200 bg-white/40 px-8 py-12 text-center shadow-lg backdrop-blur-md">
            <h2 className="mb-4 text-3xl font-semibold leading-tight text-slate-900 lg:text-5xl">
              Không chỉ là tìm phòng.
              <br />
              <span className="bg-gradient-to-r from-emerald-500 to-emerald-600 bg-clip-text text-transparent">
                Mà là tìm người đồng hành.
              </span>
            </h2>
            <p className="text-lg font-medium text-slate-600 lg:text-xl">
              Thuật toán thông minh. Cộng đồng chất lượng. Miễn phí mãi mãi.
            </p>
          </div>
        </section>

        {/* Hero Section */}
        <section className="mt-12">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-block rounded-full border border-emerald-200 bg-emerald-50 px-5 py-2 text-sm font-semibold text-emerald-700">
              🏠 Bắt đầu hành trình của bạn
            </div>

            <h1 className="mb-6 text-5xl font-bold leading-tight text-slate-900 lg:text-6xl">
              Nền tảng tìm
              <br />
              <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                roommate
              </span>{" "}
              số 1 VN
            </h1>

            <p className="mb-10 text-xl font-medium text-slate-600 lg:text-2xl">
              Kết nối trực tiếp, không môi giới.
              <br />
              Tìm người ở ghép phù hợp với lối sống của bạn.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/share"
                className="w-full rounded-full bg-emerald-500 px-8 py-4 text-lg font-semibold text-white shadow-lg transition hover:bg-emerald-600 hover:shadow-xl sm:w-auto"
              >
                Tìm phòng ngay
              </Link>
              <Link
                href="/auth"
                className="w-full rounded-full border border-slate-300 bg-white px-8 py-4 text-lg font-semibold text-slate-900 shadow-md transition hover:border-slate-400 hover:shadow-lg sm:w-auto"
              >
                Đăng tin miễn phí
              </Link>
            </div>
          </div>
        </section>

        {/* Value Props - Glass Morphism Style */}
        <section className="mt-20">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-3xl border border-slate-200 bg-white/60 p-8 shadow-lg backdrop-blur-sm transition hover:shadow-xl">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-100 to-emerald-200 text-4xl">
                🎯
              </div>
              <h3 className="mb-3 text-2xl font-semibold text-slate-900">
                Match chính xác.
                <br />
                Nhanh chóng.
              </h3>
              <p className="font-medium leading-relaxed text-slate-600">
                Thuật toán phân tích lối sống, sở thích, thói quen. Chỉ giới thiệu những người thực sự phù hợp với bạn.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white/60 p-8 shadow-lg backdrop-blur-sm transition hover:shadow-xl">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 text-4xl">
                💎
              </div>
              <h3 className="mb-3 text-2xl font-semibold text-slate-900">
                Cộng đồng
                <br />
                được chọn lọc.
              </h3>
              <p className="font-medium leading-relaxed text-slate-600">
                Mọi thành viên đều được xác minh. Không spam, không lừa đảo, không môi giới giả danh.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white/60 p-8 shadow-lg backdrop-blur-sm transition hover:shadow-xl">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-100 to-teal-200 text-4xl">
                🚀
              </div>
              <h3 className="mb-3 text-2xl font-semibold text-slate-900">
                Đơn giản.
                <br />
                Miễn phí.
              </h3>
              <p className="font-medium leading-relaxed text-slate-600">
                Tạo hồ sơ trong 5 phút. Nhận gợi ý trong 24 giờ. Kết nối trong 48 giờ. Zero đồng.
              </p>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="mt-20">
          <div className="rounded-[32px] border border-slate-200 bg-white/40 p-10 shadow-xl backdrop-blur-md lg:p-16">
            <h2 className="mb-12 text-center text-4xl font-semibold text-slate-900 lg:text-5xl">
              Tại sao chọn chúng tôi?
            </h2>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-6 shadow-md">
                <div className="mb-4 text-5xl">🤝</div>
                <h3 className="mb-3 text-xl font-semibold text-slate-900">Kết nối trực tiếp</h3>
                <p className="font-medium leading-relaxed text-slate-600">
                  Gặp gỡ và chat trực tiếp với người tìm phòng. Không qua môi giới, không phí ẩn.
                </p>
              </div>

              <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-6 shadow-md">
                <div className="mb-4 text-5xl">✅</div>
                <h3 className="mb-3 text-xl font-semibold text-slate-900">Tin đăng thật</h3>
                <p className="font-medium leading-relaxed text-slate-600">
                  Mọi tin đăng được kiểm duyệt. Chỉ có người thật đăng tin thật.
                </p>
              </div>

              <div className="rounded-2xl border border-teal-100 bg-gradient-to-br from-teal-50 to-white p-6 shadow-md">
                <div className="mb-4 text-5xl">⚡</div>
                <h3 className="mb-3 text-xl font-semibold text-slate-900">Nhanh chóng</h3>
                <p className="font-medium leading-relaxed text-slate-600">
                  Tìm được phòng phù hợp chỉ trong vài ngày. Đơn giản và tiện lợi.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Simple Stats */}
        <section className="mt-20">
          <div className="grid gap-6 text-center md:grid-cols-3">
            <div className="rounded-3xl border border-slate-200 bg-white/60 p-8 shadow-lg backdrop-blur-sm">
              <div className="mb-2 bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-5xl font-bold text-transparent lg:text-6xl">
                2.4K+
              </div>
              <div className="text-base font-semibold uppercase tracking-wide text-slate-600">
                Kết nối thành công
              </div>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white/60 p-8 shadow-lg backdrop-blur-sm">
              <div className="mb-2 bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-5xl font-bold text-transparent lg:text-6xl">
                48h
              </div>
              <div className="text-base font-semibold uppercase tracking-wide text-slate-600">
                Thời gian trung bình
              </div>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white/60 p-8 shadow-lg backdrop-blur-sm">
              <div className="mb-2 bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-5xl font-bold text-transparent lg:text-6xl">
                97%
              </div>
              <div className="text-base font-semibold uppercase tracking-wide text-slate-600">Hài lòng</div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-20">
          <div className="rounded-[32px] border border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-12 text-center shadow-xl lg:p-16">
            <h2 className="mb-6 text-4xl font-semibold text-slate-900 lg:text-5xl">
              Sẵn sàng tìm roommate?
            </h2>
            <p className="mb-8 text-xl font-medium text-slate-700">
              Đăng tin hoàn toàn miễn phí. Kết nối ngay hôm nay!
            </p>
            <Link
              href="/share"
              className="inline-block rounded-full bg-emerald-500 px-10 py-4 text-xl font-semibold text-white shadow-lg transition hover:bg-emerald-600 hover:shadow-xl"
            >
              Bắt đầu ngay 🚀
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-20 rounded-3xl border border-slate-200 bg-slate-900 py-8 shadow-xl">
          <div className="px-6">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <p className="font-semibold text-white">© 2024 roomieVerse</p>
              <div className="flex gap-6 text-sm font-medium text-slate-300">
                <Link href="/share" className="transition hover:text-emerald-300">
                  Tìm phòng
                </Link>
                <Link href="/auth" className="transition hover:text-emerald-300">
                  Đăng ký
                </Link>
                <Link href="/home" className="transition hover:text-emerald-300">
                  Trang chủ
                </Link>
                <Link href="/profile" className="transition hover:text-emerald-300">
                  Hồ sơ
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
