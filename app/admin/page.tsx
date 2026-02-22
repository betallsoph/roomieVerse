"use client";

import MainHeader from "../components/MainHeader";
import ShareFooter from "../components/ShareFooter";
import Link from "next/link";
import {
  Shield, FileText, Wrench, ArrowRight,
  Users, MessageSquare, ShoppingBag
} from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";

export default function AdminPage() {
  const router = useRouter();
  const { isAuthenticated, isMod, isAdmin, isTester, isLoading: authLoading } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!isAuthenticated || !isMod) {
      router.replace("/");
      return;
    }
    setIsLoading(false);
  }, [authLoading, isAuthenticated, isMod, router]);

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
                      <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
                        <Users className="w-6 h-6 text-blue-700" />
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
                      <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
                        <MessageSquare className="w-6 h-6 text-purple-700" />
                      </div>
                      <div>
                        <h3 className="font-bold">Bài đăng cộng đồng</h3>
                        <p className="text-xs text-zinc-500">Bài viết, bình luận, báo cáo</p>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-zinc-400 group-hover:text-black group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
                <Link href="/admin/pass-do">
                  <div className="group flex items-center justify-between p-4 hover:bg-amber-50 rounded-lg transition-all cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
                        <ShoppingBag className="w-6 h-6 text-amber-700" />
                      </div>
                      <div>
                        <h3 className="font-bold">Pass đồ</h3>
                        <p className="text-xs text-zinc-500">Duyệt bài pass đồ, mua bán</p>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-zinc-400 group-hover:text-black group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              </div>
            </div>

            {/* Quản lý — only for tester & admin */}
            {isTester && (
              <>
                <hr className="border-zinc-200" />
                <div className="p-6">
                  <h2 className="text-lg font-black mb-4">Quản lý</h2>
                  <div className="space-y-3">
                    {[
                      { href: "/admin/blog", icon: FileText, title: "Blog", desc: "Tạo & chỉnh sửa bài viết", color: "text-emerald-700", hover: "hover:bg-emerald-50" },
                      { href: "/admin/management", icon: Users, title: "Users", desc: "Quản lý người dùng, phân quyền", color: "text-zinc-700", hover: "hover:bg-zinc-50" },
                      { href: "/admin/maintenance", icon: Wrench, title: "Bảo dưỡng", desc: "Bảo trì, sao lưu", color: "text-orange-700", hover: "hover:bg-orange-50" },
                    ].map((item) => (
                      <Link key={item.href} href={item.href}>
                        <div className={`group flex items-center justify-between p-4 ${item.hover} rounded-lg transition-all cursor-pointer`}>
                          <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 flex items-center justify-center flex-shrink-0 ${item.color}`}>
                              <item.icon className="w-6 h-6" />
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
              </>
            )}
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
