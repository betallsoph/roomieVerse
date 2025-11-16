import Link from "next/link";

const tasks = [
  {
    title: "Hoàn thiện hồ sơ",
    status: "Cần 15% nữa",
    description: "Thêm video giới thiệu ngắn để tăng độ tin tưởng.",
    action: "Tải video",
  },
  {
    title: "Đặt lịch xem nhà",
    status: "2 lời mời",
    description: "Chọn một trong hai khung giờ mà nhóm Chi & Linh đã gửi.",
    action: "Xem lịch",
  },
  {
    title: "Xác minh giấy tờ",
    status: "Đã tải CMND",
    description: "Chờ kiểm duyệt (ETA < 12h).",
    action: "Theo dõi",
  },
];

const profileStats = [
  {
    label: "Lượt xem hồ sơ",
    value: "247",
    trend: "+12% tuần này",
  },
  {
    label: "Tin nhắn mới",
    value: "8",
    trend: "3 chưa đọc",
  },
  {
    label: "Match rate",
    value: "92%",
    trend: "Cao hơn 78% người dùng",
  },
];

const achievements = [
  {
    icon: "✅",
    title: "Hồ sơ đã xác minh",
    description: "CMND và số điện thoại đã được xác nhận",
  },
  {
    icon: "⭐",
    title: "Thành viên ưu tiên",
    description: "Hoàn thành 87% hồ sơ",
  },
  {
    icon: "🎯",
    title: "Match thông minh",
    description: "Đã bật thuật toán tìm kiếm tự động",
  },
];

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      <div className="mx-auto max-w-6xl px-6 pt-10 lg:px-12">
        {/* Header */}
        <header className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-white/60 px-6 py-4 shadow-sm backdrop-blur">
          <Link href="/" className="text-lg font-semibold text-slate-900">
            roomie<span className="text-emerald-500">Verse</span>
          </Link>
          <div className="flex flex-wrap items-center gap-3 text-sm font-medium">
            <Link href="/home" className="text-slate-500 transition hover:text-slate-900">
              Trang chủ
            </Link>
            <Link href="/welcome" className="text-slate-500 transition hover:text-slate-900">
              Welcome tour
            </Link>
            <Link href="/auth" className="text-slate-500 transition hover:text-slate-900">
              Đăng xuất
            </Link>
          </div>
        </header>

        {/* Profile Header */}
        <section className="mt-12 rounded-3xl border border-slate-200 bg-white p-8 shadow-md">
          <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-6">
              <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-black bg-[#FFE951] text-4xl font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                👤
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Nguyễn Văn A</h1>
                <p className="text-slate-600">@nguyenvana • Thành viên từ tháng 11/2024</p>
                <div className="mt-2 flex gap-2">
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                    Đã xác minh
                  </span>
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                    Thành viên ưu tiên
                  </span>
                </div>
              </div>
            </div>
            <Link
              href="/auth"
              className="rounded-full border-3 border-black bg-[#4ECDC4] px-6 py-3 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            >
              Chỉnh sửa hồ sơ
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {profileStats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm text-slate-600">{stat.label}</p>
                <p className="mt-1 text-3xl font-black text-slate-900">{stat.value}</p>
                <p className="mt-1 text-xs text-emerald-600">{stat.trend}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Main Content Grid */}
        <main className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.5fr]">
          {/* Left Column - Your Status */}
          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-md">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Your status</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">87% hoàn tất</h2>
              <p className="mt-1 text-sm text-slate-600">
                Hoàn thành 3 tác vụ cuối để đẩy hồ sơ lên đầu danh sách tìm roommate.
              </p>

              {/* Progress Bar */}
              <div className="mt-4 h-3 w-full overflow-hidden rounded-full border-2 border-black bg-white">
                <div className="h-full w-[87%] bg-[#4ECDC4]"></div>
              </div>

              <div className="mt-6 space-y-4">
                {tasks.map((task) => (
                  <div key={task.title} className="rounded-2xl border border-slate-100 p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-base font-semibold text-slate-900">{task.title}</p>
                      <span className="text-xs text-slate-500">{task.status}</span>
                    </div>
                    <p className="mt-1 text-sm text-slate-600">{task.description}</p>
                    <button className="mt-3 text-sm font-medium text-emerald-600 transition hover:text-emerald-700">
                      {task.action}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="rounded-3xl border border-slate-200 bg-slate-900 p-6 text-white shadow-md">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Thành tựu</p>
              <h2 className="mt-2 text-2xl font-semibold">Huy hiệu của bạn</h2>
              <div className="mt-4 space-y-3">
                {achievements.map((achievement) => (
                  <div key={achievement.title} className="rounded-2xl bg-white/10 p-4">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{achievement.icon}</span>
                      <div>
                        <p className="text-base font-semibold">{achievement.title}</p>
                        <p className="text-sm text-slate-200">{achievement.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Right Column - Profile Details */}
          <section className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-md">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900">Thông tin cá nhân</h2>
                <button className="text-sm font-medium text-emerald-600">Chỉnh sửa</button>
              </div>
              <div className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-sm text-slate-500">Tuổi</p>
                    <p className="mt-1 font-semibold text-slate-900">25</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Nghề nghiệp</p>
                    <p className="mt-1 font-semibold text-slate-900">UX Designer</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Khu vực mong muốn</p>
                    <p className="mt-1 font-semibold text-slate-900">Quận 1, Quận 3, Bình Thạnh</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Ngân sách</p>
                    <p className="mt-1 font-semibold text-slate-900">8 - 12 triệu/tháng</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-md">
              <h2 className="text-2xl font-bold text-slate-900">Lối sống & Sở thích</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {["Early bird", "Yêu thú cưng", "Ăn chay", "Gym", "Đọc sách", "Nấu ăn", "Không hút thuốc"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="rounded-full border-2 border-black bg-[#FFE951] px-4 py-2 text-sm font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-md">
              <h2 className="text-2xl font-bold text-slate-900">Giới thiệu bản thân</h2>
              <p className="mt-4 leading-relaxed text-slate-700">
                Mình là UX Designer, làm việc remote 3 ngày/tuần. Thích không gian sạch sẽ, gọn gàng và tôn trọng
                riêng tư của nhau. Thích nấu ăn và chia sẻ bữa tối cuối tuần. Mình có 1 chú mèo rất hiền và đã được
                tiêm phòng đầy đủ. Mong tìm được roommate có lối sống tương tự để cùng nhau tạo nên một không gian
                sống thoải mái!
              </p>
            </div>

            <div className="rounded-3xl border-3 border-black bg-[#87CEEB] p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="text-2xl font-black">Tìm kiếm của bạn</h2>
              <p className="mt-2 font-semibold text-slate-800">
                Đang tìm: Phòng ở ghép tại Quận 1, Quận 3
                <br />
                Thời gian: Dọn vào từ 01/12/2024
                <br />
                Hình thức: Ở ghép 2-3 người
              </p>
              <Link
                href="/home"
                className="mt-4 inline-block rounded-xl border-3 border-black bg-white px-6 py-3 font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Xem gợi ý match
              </Link>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
