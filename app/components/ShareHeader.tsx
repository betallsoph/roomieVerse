import Link from "next/link";
import Image from "next/image";

interface ShareHeaderProps {
  variant?: "blue" | "pink";
}

export default function ShareHeader({ variant = "blue" }: ShareHeaderProps) {
  const bgColor = variant === "pink" ? "bg-pink-200" : "bg-blue-200";

  return (
    <header className={`border-b-2 border-black ${bgColor}`}>
      <div className="wrapper py-6">
        <div className="flex items-center justify-between">
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

          <nav className="flex items-center gap-4">
            <Link
              href="/"
              className="rounded-lg border-2 border-black bg-white px-6 py-2.5 font-medium transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
            >
              Trang chủ
            </Link>
            <Link href="/home" className="btn-primary">
              Khám phá
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
