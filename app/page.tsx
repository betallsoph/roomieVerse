"use client";

import Link from "next/link";
import Image from "next/image";
import { SparklesText } from "./components/sparkles-text";
import MainHeader from "./components/MainHeader";
import ShareFooter from "./components/ShareFooter";
import ProfileReminderModal from "./components/ProfileReminderModal";
import { useProfileReminder } from "./hooks/useProfileReminder";
import { useAdminRedirect } from "./hooks/useAdminRedirect";

export default function LandingPage() {
  useAdminRedirect();
  const { showReminder, dismissReminder } = useProfileReminder();

  return (
    <div className="min-h-screen bg-white">
      <MainHeader />

      {/* Profile Reminder Modal */}
      <ProfileReminderModal isOpen={showReminder} onClose={dismissReminder} />

      {/* Hero Section */}
      <section className="section bg-blue-50 py-16 sm:py-24 md:py-32">
        <div className="wrapper text-center">
          <h1 className="mb-8 font-bold leading-tight text-black">
            Không chỉ là tìm phòng...
            <br className="hidden min-[500px]:block" />
            Mà còn là{" "}
            <SparklesText
              className="font-bold"
              sparklesCount={15}
              colors={{ first: "#9E7AFF", second: "#FE8BBB" }}
            >
              tìm người đồng hành.
            </SparklesText>
          </h1>

          <p className="mb-10 text-lg font-medium text-zinc-600 sm:text-xl md:text-2xl max-w-3xl mx-auto">
            Nơi lý tưởng để tìm người ở ghép, tìm phòng trống...
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#cta-section"
              className="btn-primary text-center sm:w-[200px]"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('cta-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Bắt đầu tìm ngay
            </a>
            <a
              href="#how-it-works"
              className="btn-secondary text-center sm:w-[200px]"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Khám phá thêm
            </a>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="section border-t-2 border-black bg-white py-16 md:py-20">
        <div className="wrapper">
          <h2 className="mb-12 text-center text-3xl font-bold uppercase sm:text-4xl md:text-5xl">
            Cách hoạt động
          </h2>

          <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
            <div className="card group bg-pink-200">
              <span className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-black bg-blue-300 text-2xl font-bold">
                01
              </span>
              <h3 className="mb-3 mt-4 text-xl font-bold sm:text-2xl">
                Đăng ký tài khoản
              </h3>
              <p className="mb-4 text-sm font-medium leading-relaxed text-zinc-700 sm:text-base">
                Tạo tài khoản miễn phí chỉ với email. Hoặc đăng nhập dễ dàng bằng Google và số điện thoại.
              </p>
              <div className="inline-block rounded-lg border-2 border-black bg-white px-3 py-1.5 text-sm font-bold">
                ⏱ 1 phút
              </div>
            </div>

            <div className="card group bg-pink-200">
              <span className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-black bg-pink-300 text-2xl font-bold">
                02
              </span>
              <h3 className="mb-3 mt-4 text-xl font-bold sm:text-2xl">
                Tìm phòng hoặc bạn ghép
              </h3>
              <p className="mb-4 text-sm font-medium leading-relaxed text-zinc-700 sm:text-base">
                Đa dạng lựa chọn từ tin đăng có sẵn từ các bạn khác, hoặc đăng bài tìm nếu chưa có ai phù hợp.
              </p>
              <div className="inline-block rounded-lg border-2 border-black bg-white px-3 py-1.5 text-sm font-bold">
                ⏱ 5 phút
              </div>
            </div>

            <div className="card group bg-purple-200">
              <span className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-black bg-blue-300 text-2xl font-bold">
                03
              </span>
              <h3 className="mb-3 mt-4 text-xl font-bold sm:text-2xl">
                Liên hệ người quan tâm
              </h3>
              <p className="mb-4 text-sm font-medium leading-relaxed text-zinc-700 sm:text-base">
                Nhận liên hệ từ người quan tâm hoặc ngược lại. Trao đổi trực tiếp.
              </p>
              <div className="inline-block rounded-lg border-2 border-black bg-white px-3 py-1.5 text-sm font-bold">
                ⏱ Ngay lập tức
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-choose-us" className="section bg-blue-50 py-16 md:py-20 relative before:absolute before:top-0 before:left-0 before:right-0 before:h-20 before:bg-gradient-to-b before:from-white before:to-transparent before:pointer-events-none">
        <div className="wrapper">
          <h2 className="mb-10 text-center text-3xl font-bold uppercase sm:mb-12 sm:text-4xl md:mb-16 md:text-5xl">
            Tại sao chọn chúng tôi?
          </h2>

          <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
            <div className="card group bg-white">
              <div className="mb-4 transition-transform duration-300 group-hover:scale-110">
                <Image
                  src="/assets/easymatch.png"
                  alt="Match chính xác"
                  width={100}
                  height={100}
                  className="h-25 w-25"
                />
              </div>
              <h3 className="mb-3 text-xl font-bold sm:text-2xl">
                Match chính xác.
                <br />
                <span className="text-blue-400">Nhanh chóng.</span>
              </h3>
              <p className="text-sm font-medium leading-relaxed text-zinc-600 sm:text-base">
                Dễ dàng kiếm được người thật sự phù hợp với bạn thông qua các thông tin về lối sống, thói quen...
              </p>
            </div>

            <div className="card group bg-white">
              <div className="mb-4 transition-transform duration-300 group-hover:scale-110">
                <Image
                  src="/assets/verify.png"
                  alt="Cộng đồng được chọn lọc"
                  width={100}
                  height={100}
                  className="h-25 w-25"
                />
              </div>
              <h3 className="mb-3 text-xl font-bold sm:text-2xl">
                Cộng đồng
                <br />
                <span className="text-purple-500">được chọn lọc.</span>
              </h3>
              <p className="text-sm font-medium leading-relaxed text-zinc-600 sm:text-base">
                Mọi thành viên đều được xác minh, ưu tiên chính chủ. Kết nối trực tiếp - không trung gian.
              </p>
            </div>

            <div className="card group bg-white">
              <div className="mb-4 transition-transform duration-300 group-hover:scale-110">
                <Image
                  src="/assets/simple.png"
                  alt="Đơn giản dễ dàng"
                  width={100}
                  height={100}
                  className="h-25 w-25"
                />
              </div>
              <h3 className="mb-3 text-xl font-bold sm:text-2xl">
                Đơn giản.
                <br />
                <span className="text-pink-500">Dễ dàng.</span>
              </h3>
              <p className="text-sm font-medium leading-relaxed text-zinc-600 sm:text-base">
                Tạo hồ sơ trong 5 phút. Kết nối trong 24-48 giờ. Zero đồng cho 2 bài đăng đầu tiên.
              </p>
            </div>
          </div>

          {/* Learn more button */}
          <div className="mt-10 text-center">
            <Link
              href="/about"
              className="btn-secondary"
            >
              Tìm hiểu thêm về roomieVerse
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta-section" className="section border-t-2 border-black py-16 md:py-20">
        <div className="wrapper">
          <div className="card bg-gradient-to-br from-blue-300 to-blue-400 p-8 text-center sm:p-12 lg:p-16">
            <h2 className="mb-4 text-3xl font-black uppercase sm:mb-6 sm:text-4xl md:text-5xl">
              Bạn đang tìm gì?
            </h2>
            <p className="mb-8 text-base font-bold sm:mb-10 sm:text-lg md:text-xl">
              Chọn mục đích phù hợp với bạn
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/roommate"
                className="btn-primary text-base sm:text-lg px-8 py-4 min-w-[200px]"
              >
                Tìm roommate
              </Link>
              <Link
                href="/roomshare"
                className="btn-pink text-base sm:text-lg px-8 py-4 min-w-[200px]"
              >
                Tìm phòng
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ShareFooter />
    </div>
  );
}
