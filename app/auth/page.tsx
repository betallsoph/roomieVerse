import type { Metadata } from "next";
import Link from "next/link";
import AuthForm from "./auth-form";
import InteractiveGrid from "../components/InteractiveGrid";
import AnimatedLogo from "../components/AnimatedLogo";

export const metadata: Metadata = {
  title: "Đăng nhập | roomieVerse - Tìm Roommate Uy Tín",
  description:
    "Đăng nhập hoặc tạo tài khoản roomieVerse để kết nối với roommate phù hợp. Cộng đồng roommate only - không môi giới, không tin rác.",
  keywords: [
    "đăng nhập roomieverse",
    "tìm roommate",
    "share phòng",
    "ở ghép",
    "roommate việt nam",
    "tìm người ở ghép",
  ],
  openGraph: {
    title: "Đăng nhập | roomieVerse - Tìm Roommate Uy Tín",
    description:
      "Kết nối với roommate phù hợp. Cộng đồng roommate only - không môi giới.",
    type: "website",
    locale: "vi_VN",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AuthPage() {
  return (
    <InteractiveGrid className="min-h-screen flex items-center justify-center py-12">
      <div className="wrapper mx-auto flex max-w-5xl flex-col gap-8 lg:flex-row">
        <section className="card flex flex-1 flex-col justify-between bg-white p-8 lg:p-10">
          <div>
            <AnimatedLogo />
            <p className="mt-6 text-center text-base font-medium leading-relaxed text-zinc-600">
              Nền tảng kết nối roommate đáng tin cậy. Không môi giới, không tin rác - chỉ có người thật tìm phòng thật.
            </p>
          </div>
          <div className="mt-8 space-y-3">
            <p className="text-sm font-semibold text-zinc-600">
              Tìm hiểu thêm:
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/about"
                className="btn-secondary text-sm"
              >
                Về chúng tôi
              </Link>
              <Link
                href="/"
                className="btn-primary text-sm"
              >
                Trang chủ
              </Link>
            </div>
          </div>
        </section>

        <AuthForm />
      </div>
    </InteractiveGrid>
  );
}
