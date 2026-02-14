"use client";

import { useEffect } from "react";
import MainHeader from "../../components/MainHeader";
import ShareFooter from "../../components/ShareFooter";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../contexts/AuthContext";
import { ArrowLeft, MessageSquare, Flag, AlertTriangle, MessagesSquare } from "lucide-react";

export default function CommunityModerationPage() {
  const { isAdmin, isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && (!isAuthenticated || !isAdmin)) {
      router.push("/");
    }
  }, [authLoading, isAuthenticated, isAdmin, router]);

  if (authLoading || !isAuthenticated || !isAdmin) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-300 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <MainHeader />

      <section className="py-12 md:py-16">
        <div className="wrapper max-w-5xl">
          {/* Header */}
          <div className="mb-8">
            <Link href="/admin" className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-500 hover:text-black transition-colors mb-6">
              <ArrowLeft className="w-4 h-4" />
              Quay lại Dashboard
            </Link>
            <h1 className="text-3xl md:text-4xl font-black mb-2">Kiểm Duyệt Bài Đăng Cộng Đồng</h1>
            <p className="text-zinc-600">Duyệt bài viết, bình luận và xử lý báo cáo trong cộng đồng</p>
          </div>

          {/* Placeholder sections */}
          <div className="space-y-6">
            {/* Reported posts */}
            <div className="border-2 border-dashed border-zinc-200 rounded-xl p-8 text-center">
              <Flag className="w-10 h-10 text-zinc-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-zinc-500 mb-1">Bài viết bị báo cáo</h3>
              <p className="text-sm text-zinc-400">Chưa có báo cáo nào cần xử lý</p>
            </div>

            {/* Reported comments */}
            <div className="border-2 border-dashed border-zinc-200 rounded-xl p-8 text-center">
              <MessagesSquare className="w-10 h-10 text-zinc-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-zinc-500 mb-1">Bình luận bị báo cáo</h3>
              <p className="text-sm text-zinc-400">Chưa có bình luận nào cần xử lý</p>
            </div>

            {/* Spam detection */}
            <div className="border-2 border-dashed border-zinc-200 rounded-xl p-8 text-center">
              <AlertTriangle className="w-10 h-10 text-zinc-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-zinc-500 mb-1">Phát hiện spam</h3>
              <p className="text-sm text-zinc-400">Hệ thống tự động chưa phát hiện nội dung spam</p>
            </div>
          </div>

          {/* Info note */}
          <div className="mt-8">
            <p className="text-sm text-zinc-500 flex items-start gap-2">
              <MessageSquare className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>
                Các tính năng kiểm duyệt cộng đồng sẽ hoạt động đầy đủ khi hệ thống bài viết và bình luận được triển khai.
              </span>
            </p>
          </div>
        </div>
      </section>

      <ShareFooter />
    </div>
  );
}
