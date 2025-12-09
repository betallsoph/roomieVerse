"use client";

import MainHeader from "../components/MainHeader";
import ShareFooter from "../components/ShareFooter";
import Link from "next/link";
import { Shield, FileText, Settings, Wrench } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with actual admin check logic
    const checkAdminAuth = async () => {
      // For now, just simulate checking
      // In the future, you'll check if user is logged in and has admin role
      setIsLoading(false);

      // Example of future implementation:
      // const user = await getCurrentUser();
      // if (!user || !user.isAdmin) {
      //   router.push('/pages/unauthorized');
      // }
      // setIsLoading(false);
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

  return (
    <div className="min-h-screen bg-white">
      <MainHeader />

      {/* Hero Section */}
      <section className="section bg-purple-50 py-16 md:py-20">
        <div className="wrapper">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-black mb-4 flex items-center justify-center gap-3">
              <Shield className="w-12 h-12 text-purple-600" />
              Quản Trị Hệ Thống
            </h1>
            <p className="text-lg text-zinc-600">
              Bảng điều khiển dành cho quản trị viên roomieVerse
            </p>
          </div>

          {/* Admin Menu Cards */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2 max-w-4xl mx-auto">
            {/* Kiểm duyệt */}
            <Link href="/admin/moderation">
              <div className="card bg-white hover:-translate-y-2 transition-all duration-300 cursor-pointer group">
                <div className="flex flex-col items-center text-center">
                  <div className="p-6 bg-red-100 border-2 border-black rounded-xl mb-4 group-hover:bg-red-200 transition-colors">
                    <Shield className="w-12 h-12 text-red-600" />
                  </div>
                  <h2 className="text-2xl font-bold mb-3">Kiểm Duyệt</h2>
                  <p className="text-sm text-zinc-600 mb-4">
                    Duyệt bài đăng, quản lý nội dung người dùng
                  </p>
                  <button className="btn-primary w-full">
                    Truy cập
                  </button>
                </div>
              </div>
            </Link>

            {/* Blog Management */}
            <Link href="/admin/blog">
              <div className="card bg-white hover:-translate-y-2 transition-all duration-300 cursor-pointer group">
                <div className="flex flex-col items-center text-center">
                  <div className="p-6 bg-blue-100 border-2 border-black rounded-xl mb-4 group-hover:bg-blue-200 transition-colors">
                    <FileText className="w-12 h-12 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold mb-3">Quản Lý Blog</h2>
                  <p className="text-sm text-zinc-600 mb-4">
                    Tạo, chỉnh sửa và quản lý bài viết blog
                  </p>
                  <button className="btn-primary w-full">
                    Truy cập
                  </button>
                </div>
              </div>
            </Link>

            {/* General Management */}
            <Link href="/admin/management">
              <div className="card bg-white hover:-translate-y-2 transition-all duration-300 cursor-pointer group">
                <div className="flex flex-col items-center text-center">
                  <div className="p-6 bg-green-100 border-2 border-black rounded-xl mb-4 group-hover:bg-green-200 transition-colors">
                    <Settings className="w-12 h-12 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold mb-3">Quản Lý</h2>
                  <p className="text-sm text-zinc-600 mb-4">
                    Quản lý người dùng, thống kê và cài đặt
                  </p>
                  <button className="btn-primary w-full">
                    Truy cập
                  </button>
                </div>
              </div>
            </Link>

            {/* Maintenance */}
            <Link href="/admin/maintenance">
              <div className="card bg-white hover:-translate-y-2 transition-all duration-300 cursor-pointer group">
                <div className="flex flex-col items-center text-center">
                  <div className="p-6 bg-yellow-100 border-2 border-black rounded-xl mb-4 group-hover:bg-yellow-200 transition-colors">
                    <Wrench className="w-12 h-12 text-yellow-600" />
                  </div>
                  <h2 className="text-2xl font-bold mb-3">Bảo Dưỡng</h2>
                  <p className="text-sm text-zinc-600 mb-4">
                    Bảo trì hệ thống, cập nhật và sao lưu
                  </p>
                  <button className="btn-primary w-full">
                    Truy cập
                  </button>
                </div>
              </div>
            </Link>
          </div>

          {/* Info Box */}
          <div className="card bg-purple-100 mt-12 max-w-2xl mx-auto">
            <div className="text-center">
              <h3 className="text-lg font-bold mb-2">Lưu ý Bảo Mật</h3>
              <p className="text-sm text-zinc-600">
                Trang này chỉ dành cho quản trị viên. Vui lòng không chia sẻ đường dẫn với người khác.
                Mọi thao tác trên trang này sẽ được ghi lại.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ShareFooter />
    </div>
  );
}
