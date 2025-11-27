import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Về chúng tôi | roomieVerse",
  description:
    "Tìm hiểu về roomieVerse - nền tảng kết nối roommate đáng tin cậy tại Việt Nam. Không môi giới, không tin rác.",
  openGraph: {
    title: "Về chúng tôi | roomieVerse",
    description: "Nền tảng kết nối roommate đáng tin cậy tại Việt Nam.",
    type: "website",
    locale: "vi_VN",
  },
};

const perks = [
  {
    icon: "✓",
    title: "Được curator kiểm hồ sơ trong 12h",
    description: "Mỗi hồ sơ đều được đội ngũ curator xác minh để đảm bảo tính xác thực.",
  },
  {
    icon: "✓",
    title: "Được ghép nhóm chat riêng trước khi thăm nhà",
    description: "Kết nối và trò chuyện với roommate tiềm năng trước khi quyết định.",
  },
  {
    icon: "✓",
    title: "Tài liệu hướng dẫn chia chi phí minh bạch",
    description: "Hướng dẫn chi tiết cách chia sẻ chi phí để tránh mâu thuẫn sau này.",
  },
];

const whyChooseUs = [
  {
    emoji: "🎯",
    title: "Match chính xác.",
    subtitle: "Nhanh chóng.",
    subtitleColor: "text-blue-400",
    description: "Thuật toán phân tích lối sống, sở thích, thói quen. Chỉ giới thiệu những người thực sự phù hợp với bạn.",
  },
  {
    emoji: "💎",
    title: "Cộng đồng",
    subtitle: "được chọn lọc.",
    subtitleColor: "text-purple-500",
    description: "Mọi thành viên đều được xác minh. Không spam, không lừa đảo, không môi giới giả danh.",
  },
  {
    emoji: "🚀",
    title: "Đơn giản.",
    subtitle: "Miễn phí.",
    subtitleColor: "text-pink-500",
    description: "Tạo hồ sơ trong 5 phút. Nhận gợi ý trong 24 giờ. Kết nối trong 48 giờ. Zero đồng.",
  },
  {
    emoji: "🤝",
    title: "Kết nối trực tiếp",
    subtitle: "",
    subtitleColor: "",
    description: "Gặp gỡ và chat trực tiếp với người tìm phòng. Không qua môi giới, không phí ẩn.",
  },
  {
    emoji: "✅",
    title: "Tin đăng thật",
    subtitle: "",
    subtitleColor: "",
    description: "Mọi tin đăng được kiểm duyệt. Chỉ có người thật đăng tin thật.",
  },
  {
    emoji: "⚡",
    title: "Nhanh chóng",
    subtitle: "",
    subtitleColor: "",
    description: "Tìm được phòng phù hợp chỉ trong vài ngày. Đơn giản và tiện lợi.",
  },
];

const values = [
  {
    emoji: "💎",
    title: "Chất lượng",
    description: "Mỗi tin đăng và hồ sơ đều được kiểm duyệt kỹ càng. Không spam, không lừa đảo.",
  },
  {
    emoji: "🤝",
    title: "Kết nối thật",
    description: "Thuật toán thông minh giúp bạn tìm được người phù hợp với lối sống và thói quen của mình.",
  },
];

const team = [
  {
    name: "roomieVerse Team",
    role: "Đội ngũ phát triển",
    description: "Những người trẻ đam mê công nghệ và muốn giải quyết vấn đề tìm roommate tại Việt Nam.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b-2 border-black bg-white backdrop-blur-md">
        <div className="wrapper py-4 md:py-5">
          <div className="flex items-center justify-between">
            <Link href="/" className="group flex items-center">
              <Image
                src="/logo/logo1.png"
                alt="roomieVerse"
                width={480}
                height={120}
                className="h-20 w-auto transition-transform duration-200 group-hover:scale-105"
              />
            </Link>

            <div className="flex items-center gap-3 sm:gap-4">
              <Link
                href="/share"
                className="btn-secondary hidden text-sm sm:block sm:text-base"
              >
                Tìm phòng
              </Link>
              <Link href="/auth" className="btn-primary text-sm sm:text-base">
                Bắt đầu
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="section py-16 sm:py-24">
        <div className="wrapper text-center">
          <h1 className="mb-6 text-4xl font-bold leading-tight text-black sm:text-5xl md:text-6xl">
            Về <span className="text-blue-400">roomieVerse</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg font-medium text-zinc-600 sm:text-xl">
            Nền tảng kết nối roommate đáng tin cậy tại Việt Nam. 
            Chúng tôi tin rằng tìm được người ở cùng phù hợp không chỉ là về giá cả, mà còn là về lối sống.
          </p>
        </div>
      </section>

      {/* Perks Section */}
      <section className="section bg-blue-100 py-16 md:py-20">
        <div className="wrapper">
          <h2 className="mb-10 text-center text-3xl font-bold uppercase sm:mb-12 sm:text-4xl">
            Quyền lợi khi tham gia
          </h2>

          <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
            {perks.map((perk) => (
              <div key={perk.title} className="card group bg-white">
                <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-300 text-xl font-bold text-white transition-transform duration-300 group-hover:scale-110">
                  {perk.icon}
                </span>
                <h3 className="mb-3 text-xl font-bold">{perk.title}</h3>
                <p className="text-sm font-medium leading-relaxed text-zinc-600 sm:text-base">
                  {perk.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section py-16 md:py-20">
        <div className="wrapper">
          <h2 className="mb-10 text-center text-3xl font-bold uppercase sm:mb-12 sm:text-4xl md:mb-16 md:text-5xl">
            Tại sao chọn chúng tôi?
          </h2>

          <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
            {whyChooseUs.map((item) => (
              <div key={item.title} className="card group bg-white">
                <div className="mb-4 text-5xl transition-transform duration-300 group-hover:scale-110">
                  {item.emoji}
                </div>
                <h3 className="mb-3 text-xl font-bold sm:text-2xl">
                  {item.title}
                  {item.subtitle && (
                    <>
                      <br />
                      <span className={item.subtitleColor}>{item.subtitle}</span>
                    </>
                  )}
                </h3>
                <p className="text-sm font-medium leading-relaxed text-zinc-600 sm:text-base">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section bg-blue-100 py-16 md:py-20">
        <div className="wrapper">
          <h2 className="mb-10 text-center text-3xl font-bold uppercase sm:mb-12 sm:text-4xl">
            Giá trị cốt lõi
          </h2>

          <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
            {values.map((value) => (
              <div key={value.title} className="card group bg-white">
                <div className="mb-4 text-5xl transition-transform duration-300 group-hover:scale-110">
                  {value.emoji}
                </div>
                <h3 className="mb-3 text-xl font-bold sm:text-2xl">{value.title}</h3>
                <p className="text-sm font-medium leading-relaxed text-zinc-600 sm:text-base">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section bg-gradient-to-br from-blue-300 to-blue-400 py-16 md:py-20">
        <div className="wrapper">
          <div className="card mx-auto max-w-3xl bg-white p-8 text-center sm:p-12">
            <h2 className="mb-6 text-3xl font-bold uppercase sm:text-4xl">
              Sứ mệnh của chúng tôi
            </h2>
            <p className="text-lg font-medium leading-relaxed text-zinc-700 sm:text-xl">
              &ldquo;Giúp mọi người tìm được roommate phù hợp một cách dễ dàng, an toàn và minh bạch. 
              Chúng tôi muốn biến việc tìm người ở ghép từ một trải nghiệm căng thẳng 
              thành một hành trình thú vị để tìm kiếm bạn đồng hành.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section py-16 md:py-20">
        <div className="wrapper text-center">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
            Sẵn sàng tìm roommate?
          </h2>
          <p className="mb-8 text-lg font-medium text-zinc-600">
            Tham gia cộng đồng roomieVerse ngay hôm nay!
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/auth" className="btn-primary px-8 py-4 text-lg">
              Đăng ký miễn phí
            </Link>
            <Link href="/share" className="btn-secondary px-8 py-4 text-lg">
              Xem tin đăng
            </Link>
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
                href="/"
                className="transition-all duration-200 hover:scale-110 hover:text-purple-400"
              >
                Trang chủ
              </Link>
              <Link
                href="/about"
                className="transition-all duration-200 hover:scale-110 hover:text-yellow-300"
              >
                Về chúng tôi
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
