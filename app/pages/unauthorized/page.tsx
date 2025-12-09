import Link from "next/link";
import Image from "next/image";
import ShareFooter from "../../components/ShareFooter";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="border-b-2 border-black bg-red-300">
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

      {/* Unauthorized Content */}
      <main className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="max-w-2xl text-center">
          <div className="mb-8">
            <h1 className="text-9xl font-black text-black mb-4">403</h1>
            <div className="inline-block rounded-xl border-2 border-black bg-red-300 px-6 py-3 text-2xl font-bold shadow-[var(--shadow-primary)]">
              Không có quyền truy cập
            </div>
          </div>

          <p className="mb-8 text-lg text-zinc-700 font-medium">
            Bạn không có quyền truy cập vào trang này.
            <br />
            Vui lòng đăng nhập hoặc liên hệ quản trị viên.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/auth"
              className="btn-primary text-base sm:text-lg px-8 py-4"
            >
              Đăng nhập
            </Link>
            <Link
              href="/"
              className="btn-secondary text-base sm:text-lg px-8 py-4"
            >
              Về trang chủ
            </Link>
          </div>

          {/* Fun illustration */}
          <div className="mt-12 text-6xl opacity-50">
            🚫🔒
          </div>
        </div>
      </main>

      <ShareFooter />
    </div>
  );
}
