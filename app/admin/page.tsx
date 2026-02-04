"use client";

import MainHeader from "../components/MainHeader";
import ShareFooter from "../components/ShareFooter";
import Link from "next/link";
import { Shield, FileText, Settings, Wrench, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAdminAuth = async () => {
      setIsLoading(false);
    };
    checkAdminAuth();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-300 border-t-transparent mx-auto mb-4"></div>
          <p className="text-lg font-semibold text-zinc-600">Đang xác thực...</p>
        </div>
      </div>
    );
  }

  const menuItems = [
    {
      href: "/admin/moderation",
      icon: Shield,
      title: "Kiểm Duyệt",
      description: "Duyệt bài đăng, quản lý nội dung người dùng",
    },
    {
      href: "/admin/blog",
      icon: FileText,
      title: "Quản Lý Blog",
      description: "Tạo, chỉnh sửa và quản lý bài viết blog",
    },
    {
      href: "/admin/management",
      icon: Settings,
      title: "Quản Lý",
      description: "Quản lý người dùng, thống kê và cài đặt",
    },
    {
      href: "/admin/maintenance",
      icon: Wrench,
      title: "Bảo Dưỡng",
      description: "Bảo trì hệ thống, cập nhật và sao lưu",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <MainHeader />

      <section className="py-16 md:py-20 border-b-2 border-black">
        <div className="wrapper">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-3">
              <Shield className="w-10 h-10" strokeWidth={1.5} />
              <h1 className="text-4xl md:text-5xl font-black">Quản Trị Hệ Thống</h1>
            </div>
            <p className="text-lg text-zinc-600">
              Bảng điều khiển dành cho quản trị viên roomieVerse
            </p>
          </div>

          {/* Admin Menu - Clean list style */}
          <div className="space-y-4 max-w-3xl">
            {menuItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <div className="group flex items-center justify-between p-6 bg-white border-2 border-black rounded-xl hover:bg-blue-50 transition-all duration-200 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
                  <div className="flex items-center gap-5">
                    <item.icon className="w-8 h-8 text-black" strokeWidth={1.5} />
                    <div>
                      <h2 className="text-xl font-bold mb-1">{item.title}</h2>
                      <p className="text-sm text-zinc-600">{item.description}</p>
                    </div>
                  </div>
                  <ArrowRight className="w-6 h-6 text-zinc-400 group-hover:text-black group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))}
          </div>

          {/* Security Note - Simple text, no card */}
          <div className="mt-12 max-w-3xl">
            <p className="text-sm text-zinc-500 flex items-start gap-2">
              <Shield className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>
                <strong>Lưu ý bảo mật:</strong> Trang này chỉ dành cho quản trị viên.
                Mọi thao tác sẽ được ghi lại trong nhật ký hệ thống.
              </span>
            </p>
          </div>
        </div>
      </section>

      <ShareFooter />
    </div>
  );
}
