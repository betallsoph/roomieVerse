import Link from "next/link";
import Image from "next/image";

export default function ShareFooter() {
  return (
    <footer className="border-t-2 border-black bg-black py-4 text-white md:py-5">
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
              href="/home"
              className="transition-all duration-200 hover:scale-110 hover:text-yellow-300"
            >
              Trang chủ
            </Link>
            <Link
              href="/roommate"
              className="transition-all duration-200 hover:scale-110 hover:text-blue-300"
            >
              Tìm bạn ở chung
            </Link>
            <Link
              href="/roomshare"
              className="transition-all duration-200 hover:scale-110 hover:text-pink-400"
            >
              Tìm phòng share
            </Link>
            <Link
              href="/blog"
              className="transition-all duration-200 hover:scale-110 hover:text-purple-400"
            >
              Blog
            </Link>
            <Link
              href="/about"
              className="transition-all duration-200 hover:scale-110 hover:text-green-300"
            >
              Về chúng tôi
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
