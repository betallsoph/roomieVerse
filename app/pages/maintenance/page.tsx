import Link from "next/link";
import Image from "next/image";
import ShareFooter from "../../components/ShareFooter";

export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="border-b-2 border-black bg-yellow-300">
        <div className="wrapper py-6">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo/logo1.png"
              alt="roomieVerse"
              width={480}
              height={120}
              className="h-24 w-auto transition-transform duration-200 hover:scale-105"
              priority
            />
          </Link>
        </div>
      </header>

      {/* Maintenance Content */}
      <main className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="max-w-2xl text-center">
          <div className="mb-8">
            <div className="text-8xl mb-6">🔧</div>
            <div className="inline-block rounded-xl border-2 border-black bg-yellow-300 px-6 py-3 text-2xl font-bold shadow-[var(--shadow-primary)]">
              Đang bảo trì
            </div>
          </div>

          <h1 className="text-4xl font-black text-black mb-6">
            Chúng tôi đang nâng cấp hệ thống
          </h1>

          <p className="mb-8 text-lg text-zinc-700 font-medium">
            roomieVerse đang được nâng cấp để phục vụ bạn tốt hơn.
            <br />
            Vui lòng quay lại sau ít phút!
          </p>

          <div className="rounded-xl border-2 border-black bg-blue-100 p-6 mb-8">
            <p className="text-base font-bold text-black mb-2">
              Thời gian dự kiến hoàn thành:
            </p>
            <p className="text-2xl font-black text-blue-600">
              15 phút
            </p>
          </div>

          <Link href="/" className="btn-primary text-base sm:text-lg px-8 py-4">
            Thử tải lại
          </Link>

          {/* Progress illustration */}
          <div className="mt-12 flex justify-center gap-2">
            <div className="w-4 h-4 rounded-full bg-blue-300 border-2 border-black animate-pulse"></div>
            <div className="w-4 h-4 rounded-full bg-pink-300 border-2 border-black animate-pulse [animation-delay:0.2s]"></div>
            <div className="w-4 h-4 rounded-full bg-purple-300 border-2 border-black animate-pulse [animation-delay:0.4s]"></div>
          </div>
        </div>
      </main>

      <ShareFooter />
    </div>
  );
}
