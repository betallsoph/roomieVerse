"use client";

import Link from "next/link";
import MainHeader from "../components/MainHeader";
import ShareFooter from "../components/ShareFooter";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <MainHeader />

      {/* Hero Section */}
      <section className="section bg-blue-50 py-16 sm:py-24 md:py-32">
        <div className="wrapper text-center">
          <h1 className="mb-8 font-bold leading-tight text-black">
            Về <span className="text-blue-500">roomie</span>
            <span className="text-pink-500">Verse</span>
          </h1>
          <p className="mb-10 text-base font-medium text-zinc-600 sm:text-lg md:text-xl max-w-3xl mx-auto">
            Nền tảng kết nối những người tìm phòng và roommate đáng tin cậy ở Việt Nam, đặc biệt là khu vực Sài Gòn.
            roomieVerse tin rằng tìm được người ở cùng phù hợp sẽ giúp cuộc sống của bạn trở nên tốt đẹp hơn.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-20 border-t-2 border-black">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div>
              <h2 className="mb-6 text-3xl font-bold sm:text-4xl">
                Sứ mệnh của chúng tôi
              </h2>
              <p className="mb-6 text-base sm:text-lg text-zinc-700 leading-relaxed">
                RoomieVerse ra đời với mong muốn giải quyết bài toán khó khăn trong việc tìm kiếm
                người ở ghép và phòng trọ phù hợp tại các thành phố lớn.
              </p>
              <p className="text-base sm:text-lg text-zinc-700 leading-relaxed">
                Chúng tôi không chỉ giúp bạn tìm phòng, mà còn tìm được những người bạn cùng phòng
                có lối sống, thói quen và giá trị tương đồng - để việc ở chung trở thành trải nghiệm tích cực.
              </p>
            </div>
            <div className="card bg-pink-200 p-8 text-center">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold mb-3">Mục tiêu</h3>
              <p className="text-zinc-700">
                Kết nối 10,000+ người tìm phòng và roommate trong năm 2025
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How We Work Section */}
      <section className="py-16 md:py-20 border-t-2 border-black">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-12 text-center text-3xl font-bold sm:text-4xl md:text-5xl">
            Cách chúng tôi hoạt động
          </h2>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="card bg-blue-100 p-8">
              <h3 className="mb-4 text-2xl font-bold flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-black bg-white text-lg font-bold">
                  1
                </span>
                Xác minh người dùng
              </h3>
              <p className="text-zinc-700 leading-relaxed">
                Mỗi tài khoản đều được xác minh thông qua email và số điện thoại.
                Chúng tôi ưu tiên hiển thị những hồ sơ có đầy đủ thông tin và ảnh thật.
              </p>
            </div>

            <div className="card bg-pink-100 p-8">
              <h3 className="mb-4 text-2xl font-bold flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-black bg-white text-lg font-bold">
                  2
                </span>
                Matching thông minh
              </h3>
              <p className="text-zinc-700 leading-relaxed">
                Dựa trên lối sống, thói quen và sở thích, chúng tôi giúp bạn tìm được
                những roommate tiềm năng phù hợp nhất.
              </p>
            </div>

            <div className="card bg-purple-100 p-8">
              <h3 className="mb-4 text-2xl font-bold flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-black bg-white text-lg font-bold">
                  3
                </span>
                Kết nối trực tiếp
              </h3>
              <p className="text-zinc-700 leading-relaxed">
                Không qua trung gian, không phí môi giới. Bạn được liên hệ trực tiếp
                với chủ phòng hoặc người tìm roommate.
              </p>
            </div>

            <div className="card bg-green-100 p-8">
              <h3 className="mb-4 text-2xl font-bold flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-black bg-white text-lg font-bold">
                  4
                </span>
                Hỗ trợ 24/7
              </h3>
              <p className="text-zinc-700 leading-relaxed">
                Đội ngũ hỗ trợ luôn sẵn sàng giải đáp thắc mắc và hỗ trợ bạn
                trong quá trình tìm kiếm.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-4 text-center text-3xl font-bold sm:text-4xl md:text-5xl">
            Đội ngũ phát triển
          </h2>
          <p className="mb-12 text-center text-zinc-600 max-w-2xl mx-auto">
            Những người trẻ đam mê công nghệ và mong muốn tạo ra giá trị cho cộng đồng
          </p>

          <div className="flex justify-center">
            <div className="card bg-blue-100 p-8 text-center max-w-sm">
              <div className="mb-4 mx-auto h-24 w-24 rounded-full border-3 border-black bg-gradient-to-br from-blue-300 to-pink-300 flex items-center justify-center text-4xl">
                👨‍💻
              </div>
              <h3 className="text-xl font-bold mb-1">RoomieVerse Team</h3>
              <p className="text-zinc-600 mb-4">Founder & Developer</p>
              <p className="text-sm text-zinc-700">
                Với niềm đam mê công nghệ và mong muốn giải quyết vấn đề thực tế,
                chúng tôi xây dựng RoomieVerse để giúp mọi người dễ dàng tìm được nơi ở lý tưởng.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 border-t-2 border-black">
        <div className="mx-auto max-w-4xl px-6">
          <div className="card bg-gradient-to-br from-blue-300 to-pink-300 p-8 sm:p-12 text-center">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              Sẵn sàng bắt đầu?
            </h2>
            <p className="mb-8 text-lg text-zinc-700">
              Tham gia cộng đồng RoomieVerse và tìm người đồng hành lý tưởng ngay hôm nay!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/roommate" className="btn-primary text-base px-8 py-4">
                Tìm roommate
              </Link>
              <Link href="/roomshare" className="btn-pink text-base px-8 py-4">
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
