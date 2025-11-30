import Link from "next/link";
import Image from "next/image";
import MainHeader from "../../components/MainHeader";
import ShareFooter from "../../components/ShareFooter";

export default function LoginRequiredPage() {
  return (
    <div className="min-h-screen bg-blue-50 flex flex-col">
      <MainHeader />

      {/* Login Required Content */}
      <main className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="max-w-5xl w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left side - Illustration */}
            <div className="flex justify-center order-1 md:order-1">
              <Image
                src="/assets/error/isLogin.png"
                alt="Login required"
                width={400}
                height={400}
                className="w-full max-w-md h-auto"
                priority
              />
            </div>

            {/* Right side - Text content */}
            <div className="text-center md:text-left order-2 md:order-2">
              <h1 className="text-5xl font-black text-black mb-4 leading-tight">
                Ô? Bạn chưa đăng nhập kìa!
              </h1>

              <p className="text-lg text-zinc-700 font-medium mb-8 leading-relaxed">
                Để truy cập tính năng này, bạn cần đăng nhập hoặc tạo tài khoản mới.
                <br />
                Chỉ mất <span className="font-bold text-blue-500">1 phút</span> thôi!
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/auth"
                  className="btn-yellow text-base sm:text-lg px-8 py-4"
                >
                  Đăng nhập ngay
                </Link>

                <Link
                  href="/"
                  className="btn-secondary text-base sm:text-lg px-8 py-4"
                >
                  Về trang chủ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <ShareFooter />
    </div>
  );
}
