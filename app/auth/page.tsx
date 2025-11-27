import type { Metadata } from "next";
import InteractiveGrid from "../components/InteractiveGrid";
import AuthContent from "./auth-content";

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
      <AuthContent />
    </InteractiveGrid>
  );
}
