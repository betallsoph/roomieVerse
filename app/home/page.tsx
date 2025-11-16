import Link from "next/link";

const matchSuggestions = [
  {
    id: "match-1",
    title: "Creative loft tại Quận 3",
    compatibility: 92,
    budget: "11.5m / người",
    household: "2/3 người",
    description:
      "Không gian có phòng làm việc riêng, ưu tiên người đi làm văn phòng nhưng thoải mái remote 2 ngày/tuần.",
    tags: ["UX Designer", "Ăn chay", "Yêu thú cưng"],
  },
  {
    id: "match-2",
    title: "Căn penthouse ở Thảo Điền",
    compatibility: 88,
    budget: "13m / người",
    household: "3/4 người",
    description:
      "Nhóm creative agency cần thêm 1 người gọn gàng, thích nấu ăn chung cuối tuần.",
    tags: ["Night owl", "Âm nhạc", "Gym"],
  },
  {
    id: "match-3",
    title: "Sunny studio tại Bình Thạnh",
    compatibility: 84,
    budget: "8.5m / người",
    household: "1/2 người",
    description:
      "Phù hợp người làm tech, thời gian ngủ sớm, sẵn sàng share chi phí dọn dẹp định kỳ.",
    tags: ["6AM runner", "Không hút thuốc"],
  },
];

const communityUpdates = [
  {
    title: "Đăng lịch Welcome Tour",
    detail: "3 slot cuối cùng cho tuần này còn trống vào thứ 5.",
    time: "15 phút trước",
  },
  {
    title: "Bạn mới quan tâm",
    detail: "Linh vừa gửi like cho hồ sơ của bạn.",
    time: "1 giờ trước",
  },
  {
    title: "Đề nghị ghép đôi",
    detail: "Hoàng mời bạn tham gia group chat căn hộ Q.1.",
    time: "Hôm qua",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      <div className="mx-auto max-w-6xl px-6 pt-10 lg:px-12">
        <header className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-white/60 px-6 py-4 shadow-sm backdrop-blur">
          <Link href="/" className="text-lg font-semibold text-slate-900">
            roomie<span className="text-emerald-500">Verse</span>
          </Link>
          <div className="flex flex-wrap items-center gap-3 text-sm font-medium">
            <Link href="/welcome" className="text-slate-500 transition hover:text-slate-900">
              Welcome tour
            </Link>
            <Link href="/profile" className="text-slate-500 transition hover:text-slate-900">
              Hồ sơ
            </Link>
            <Link href="/auth" className="text-slate-500 transition hover:text-slate-900">
              Đăng xuất
            </Link>
          </div>
        </header>

        <main className="mt-12">
          <section className="space-y-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Feed thông minh</p>
                <h1 className="mt-2 text-3xl font-semibold text-slate-900">Đề xuất hợp nhất cho tuần này</h1>
              </div>
              <Link href="/welcome" className="text-sm font-medium text-emerald-600 hover:text-emerald-700">
                Xem cách hệ thống match
              </Link>
            </div>

            <div className="grid gap-4">
              {matchSuggestions.map((match) => (
                <article key={match.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-md">
                  <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-500">
                    <p>{match.household}</p>
                    <p className="rounded-full bg-emerald-100 px-3 py-1 text-emerald-700">
                      {match.compatibility}% match
                    </p>
                  </div>
                  <h2 className="mt-3 text-2xl font-semibold text-slate-900">{match.title}</h2>
                  <p className="mt-2 text-sm text-slate-600">{match.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs font-medium text-slate-600">
                    {match.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-slate-100 px-3 py-1">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 flex flex-wrap items-center gap-4 text-sm font-semibold text-slate-900">
                    <span>{match.budget}</span>
                    <div className="flex gap-2">
                      <Link href="/auth" className="rounded-xl bg-slate-900 px-4 py-2 text-white">
                        Nhắn làm quen
                      </Link>
                      <Link
                        href="/welcome"
                        className="rounded-xl border border-slate-300 px-4 py-2 text-slate-700 hover:border-slate-400"
                      >
                        Chi tiết
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Community Updates - Moved from sidebar */}
            <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-900 p-6 text-white shadow-md">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Cộng đồng</p>
              <h2 className="mt-2 text-2xl font-semibold">Tín hiệu mới</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-3">
                {communityUpdates.map((update) => (
                  <div key={update.title} className="rounded-2xl bg-white/10 p-4">
                    <p className="text-base font-semibold">{update.title}</p>
                    <p className="text-sm text-slate-200">{update.detail}</p>
                    <p className="mt-2 text-xs text-slate-400">{update.time}</p>
                  </div>
                ))}
              </div>
              <Link href="/welcome" className="mt-6 inline-flex text-sm font-semibold text-emerald-300">
                {"Xem tất cả update ->"}
              </Link>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
