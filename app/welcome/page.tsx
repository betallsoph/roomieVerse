import Link from "next/link";

const orientationSteps = [
  {
    title: "Hoàn thiện hồ sơ",
    description: "Chúng tôi ưu tiên các hồ sơ có video giới thiệu và lịch sinh hoạt rõ ràng.",
    duration: "5-7 phút",
  },
  {
    title: "Được ghép với curator",
    description: "Curator sẽ kiểm lại kỳ vọng và đưa bạn vào nhóm trò chuyện phù hợp.",
    duration: "Trong 12 giờ",
  },
  {
    title: "Tham gia welcome call",
    description: "Giải đáp mọi câu hỏi về phí, cọc và chuẩn bị trước ngày dọn vào.",
    duration: "30 phút",
  },
];

const checklist = [
  "Thông tin ngân sách rõ ràng",
  "Chấp nhận quy tắc nhà chung",
  "Ký cam kết minh bạch phí chia sẻ",
  "Tôn trọng không gian riêng tư",
];

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-white pb-16">
      <div className="mx-auto max-w-5xl px-6 pt-12 lg:px-10">
        <header className="rounded-3xl border border-emerald-100 bg-white px-6 py-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link href="/" className="text-lg font-semibold text-slate-900">
              roomie<span className="text-emerald-500">Verse</span> welcome
            </Link>
            <div className="flex flex-wrap gap-3 text-sm font-medium">
              <Link href="/" className="text-slate-500 hover:text-slate-900">
                Landing page
              </Link>
              <Link href="/home" className="text-slate-500 hover:text-slate-900">
                Trang chủ
              </Link>
              <Link href="/profile" className="text-slate-500 hover:text-slate-900">
                Hồ sơ
              </Link>
              <Link
                href="/auth"
                className="rounded-full bg-slate-900 px-4 py-2 text-white hover:bg-slate-800"
              >
                Đăng nhập / Đăng ký
              </Link>
            </div>
          </div>
        </header>

        <main className="mt-12 space-y-12">
          <section className="rounded-[32px] border border-slate-200 bg-slate-900 px-8 py-10 text-white shadow-xl">
            <p className="text-xs uppercase tracking-[0.4em] text-emerald-200">Welcome loop</p>
            <h1 className="mt-4 text-4xl font-semibold">
              Chào mừng bạn đến với cộng đồng chia sẻ nhà được chọn lọc nhất.
            </h1>
            <p className="mt-4 text-lg text-slate-200">
              Đây là tour hướng dẫn nhanh giúp bạn biết chính xác các bước cần hoàn thành trước khi được hiển thị
              trên feed roomieVerse. Mọi dữ liệu đang được lưu tạm thời và sẽ chuyển sang backend riêng khi sản phẩm
              chính thức mở beta.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm font-medium text-slate-900">
              <Link href="/auth" className="rounded-2xl bg-white px-6 py-3">
                Lên lịch onboarding
              </Link>
              <Link href="/home" className="rounded-2xl border border-white/40 px-6 py-3 text-white">
                Xem thử trang chủ
              </Link>
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-lg">
              <h2 className="text-2xl font-semibold text-slate-900">Lộ trình onboarding</h2>
              <p className="mt-1 text-sm text-slate-600">Chúng tôi giữ timeline rõ ràng, không để bạn phải chờ.</p>
              <div className="mt-6 space-y-4">
                {orientationSteps.map((step, index) => (
                  <div key={step.title} className="flex gap-4 rounded-2xl border border-slate-100 p-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-lg font-semibold text-emerald-600">
                      0{index + 1}
                    </div>
                    <div>
                      <p className="text-base font-semibold text-slate-900">{step.title}</p>
                      <p className="text-sm text-slate-600">{step.description}</p>
                      <p className="text-xs text-emerald-600">{step.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-lg">
              <h2 className="text-2xl font-semibold text-slate-900">Checklist trước khi join</h2>
              <p className="mt-1 text-sm text-slate-600">roomieVerse chỉ hoạt động tốt khi mọi người cam kết minh bạch.</p>
              <ul className="mt-6 space-y-3 text-sm text-slate-700">
                {checklist.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-sm font-semibold text-emerald-600">
                      +
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-2xl bg-slate-900/90 p-5 text-white">
                <p className="text-sm text-emerald-200">Hotline curator</p>
                <p className="text-2xl font-semibold">096.888.4477</p>
                <p className="text-sm text-slate-300">Nhắn Zalo trước khi gọi để được ưu tiên.</p>
              </div>
            </div>
          </section>

          <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-lg">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Sau welcome call</p>
                <h2 className="mt-2 text-3xl font-semibold text-slate-900">Bạn sẽ nhận được gì?</h2>
                <p className="mt-3 text-sm text-slate-600">
                  - Bộ hồ sơ PDF để gửi chủ nhà
                  <br />- Timeline dọn nhà chi tiết
                  <br />- Community code để gia nhập các buổi brunch riêng tư
                </p>
              </div>
              <div className="rounded-3xl border border-emerald-100 bg-emerald-50 px-6 py-4 text-right">
                <p className="text-sm text-emerald-600">Invite code</p>
                <p className="text-2xl font-semibold text-emerald-700">RMV-24BETA</p>
                <p className="text-xs text-emerald-600">Có hiệu lực 72 giờ sau khi nhận.</p>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-4 text-sm font-medium">
              <Link href="/auth" className="rounded-full bg-emerald-500 px-6 py-3 text-white hover:bg-emerald-400">
                Xác nhận đã đọc
              </Link>
              <Link href="/home" className="rounded-full border border-slate-300 px-6 py-3 text-slate-700">
                Quay lại trang chủ
              </Link>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
