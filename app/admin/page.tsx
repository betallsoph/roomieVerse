"use client";

import MainHeader from "../components/MainHeader";
import ShareFooter from "../components/ShareFooter";
import Link from "next/link";
import {
  Shield, FileText, Settings, Wrench, ArrowRight,
  Users, MessageSquare
} from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";

export default function AdminPage() {
  const router = useRouter();
  const { isAuthenticated, isAdmin, isLoading: authLoading } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!isAuthenticated || !isAdmin) {
      router.replace("/");
      return;
    }
    setIsLoading(false);
  }, [authLoading, isAuthenticated, isAdmin, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-300 border-t-transparent" />
      </div>
    );
  }

  const now = new Date();

  return (
    <div className="min-h-screen bg-blue-50/60">
      <MainHeader />

      <section className="py-12 md:py-16">
        <div className="wrapper max-w-5xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-black mb-2">Trang quản lý</h1>
            <p className="text-zinc-600">
              {now.toLocaleDateString("vi-VN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
            </p>
          </div>

          <div className="bg-white border-2 border-black rounded-xl mb-6">
            {/* Kiểm duyệt */}
            <div className="p-6">
              <h2 className="text-lg font-black mb-4">Kiểm duyệt</h2>
              <div className="space-y-3">
                <Link href="/admin/moderation">
                  <div className="group flex items-center justify-between p-4 hover:bg-blue-50 rounded-lg transition-all cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                        <Users className="w-5 h-5 text-blue-700" />
                      </div>
                      <div>
                        <h3 className="font-bold">Tin đăng chính</h3>
                        <p className="text-xs text-zinc-500">Tìm phòng, tìm bạn ở ghép</p>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-zinc-400 group-hover:text-black group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
                <Link href="/admin/community">
                  <div className="group flex items-center justify-between p-4 hover:bg-purple-50 rounded-lg transition-all cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                        <MessageSquare className="w-5 h-5 text-purple-700" />
                      </div>
                      <div>
                        <h3 className="font-bold">Bài đăng cộng đồng</h3>
                        <p className="text-xs text-zinc-500">Bài viết, bình luận, báo cáo</p>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-zinc-400 group-hover:text-black group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              </div>
            </div>

            <hr className="border-zinc-200" />

            {/* Quản lý */}
            <div className="p-6">
              <h2 className="text-lg font-black mb-4">Quản lý</h2>
              <div className="space-y-3">
                {[
                  { href: "/admin/blog", icon: FileText, title: "Blog", desc: "Tạo & chỉnh sửa bài viết", color: "bg-emerald-100 text-emerald-700", hover: "hover:bg-emerald-50" },
                  { href: "/admin/management", icon: Settings, title: "Cài đặt", desc: "Người dùng, thống kê", color: "bg-zinc-100 text-zinc-700", hover: "hover:bg-zinc-50" },
                  { href: "/admin/maintenance", icon: Wrench, title: "Bảo dưỡng", desc: "Bảo trì, sao lưu", color: "bg-orange-100 text-orange-700", hover: "hover:bg-orange-50" },
                ].map((item) => (
                  <Link key={item.href} href={item.href}>
                    <div className={`group flex items-center justify-between p-4 ${item.hover} rounded-lg transition-all cursor-pointer`}>
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-lg ${item.color} flex items-center justify-center`}>
                          <item.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-bold">{item.title}</h3>
                          <p className="text-xs text-zinc-500">{item.desc}</p>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-zinc-400 group-hover:text-black group-hover:translate-x-1 transition-all" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Footer note */}
          <p className="text-sm text-zinc-500 flex items-start gap-2">
            <Shield className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>Mọi thao tác được ghi lại trong nhật ký hệ thống.</span>
          </p>
        </div>
      </section>

      <ShareFooter />
    </div>
  );
}
