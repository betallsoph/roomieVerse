import Image from "next/image";
import NavLink from "./NavLink";

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
            <NavLink href="/">
              Trang chủ
            </NavLink>
            <NavLink href="/roommate">
              Tìm bạn ở chung
            </NavLink>
            <NavLink href="/roomshare">
              Tìm phòng
            </NavLink>
            <NavLink href="/blog">
              Blog
            </NavLink>
            <NavLink href="/about">
              Về chúng tôi
            </NavLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
