"use client";

import MainHeader from "../../components/MainHeader";
import ShareFooter from "../../components/ShareFooter";
import Link from "next/link";
import { ArrowLeft, Settings, Users, BarChart3, Database, Mail, Bell, ArrowRight } from "lucide-react";

export default function ManagementPage() {
  const systemStats = { totalUsers: 2458, activeUsers: 1823, totalListings: 342, totalMessages: 8934 };

  const recentUsers = [
    { id: 1, name: "Nguyễn Văn A", email: "nguyenvana@email.com", joinDate: "2025-12-01", role: "user", status: "active" },
    { id: 2, name: "Trần Thị B", email: "tranthib@email.com", joinDate: "2025-12-03", role: "user", status: "active" },
    { id: 3, name: "Lê Văn C", email: "levanc@email.com", joinDate: "2025-11-28", role: "user", status: "inactive" },
  ];

  const quickActions = [
    { icon: Users, title: "Quản lý người dùng", desc: "Xem, chỉnh sửa thông tin" },
    { icon: BarChart3, title: "Báo cáo & Thống kê", desc: "Xem báo cáo chi tiết" },
    { icon: Settings, title: "Cài đặt hệ thống", desc: "Cấu hình thiết lập" },
    { icon: Bell, title: "Thông báo", desc: "Gửi thông báo người dùng" },
    { icon: Database, title: "Quản lý dữ liệu", desc: "Sao lưu, khôi phục" },
    { icon: Mail, title: "Email Marketing", desc: "Gửi email hàng loạt" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <MainHeader />

      <section className="py-12 md:py-16 border-b-2 border-black">
        <div className="wrapper max-w-5xl">
          {/* Header */}
          <div className="mb-10">
            <Link href="/admin" className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-500 hover:text-black transition-colors mb-6">
              <ArrowLeft className="w-4 h-4" />
              Quay lại
            </Link>
            <div className="flex items-center gap-3 mb-2">
              <Settings className="w-8 h-8" strokeWidth={1.5} />
              <h1 className="text-3xl md:text-4xl font-black">Quản Lý Hệ Thống</h1>
            </div>
            <p className="text-zinc-600">Quản lý người dùng, thống kê và cài đặt</p>
          </div>

          {/* Stats - Inline */}
          <div className="flex flex-wrap gap-8 mb-12 py-6 border-y-2 border-black">
            <div>
              <p className="text-sm text-zinc-500">Tổng người dùng</p>
              <p className="text-3xl font-black">{systemStats.totalUsers.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-zinc-500">Đang hoạt động</p>
              <p className="text-3xl font-black">{systemStats.activeUsers.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-zinc-500">Tổng tin đăng</p>
              <p className="text-3xl font-black">{systemStats.totalListings.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-zinc-500">Tin nhắn</p>
              <p className="text-3xl font-black">{systemStats.totalMessages.toLocaleString()}</p>
            </div>
          </div>

          {/* Quick Actions - Grid, no card wrapper */}
          <div className="mb-12">
            <h2 className="text-xl font-bold mb-4">Thao Tác Nhanh</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {quickActions.map((action, idx) => (
                <button key={idx} className="group flex items-center gap-3 p-4 border-2 border-black rounded-xl hover:bg-blue-50 transition-all text-left">
                  <action.icon className="w-6 h-6 text-zinc-600 group-hover:text-black" strokeWidth={1.5} />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm truncate">{action.title}</h3>
                    <p className="text-xs text-zinc-500 truncate">{action.desc}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-zinc-300 group-hover:text-black group-hover:translate-x-0.5 transition-all" />
                </button>
              ))}
            </div>
          </div>

          {/* Recent Users - Table style */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Người Dùng Gần Đây</h2>
              <button className="text-sm font-semibold text-zinc-500 hover:text-black transition-colors">
                Xem tất cả →
              </button>
            </div>
            <div className="border-2 border-black rounded-xl overflow-hidden">
              {recentUsers.map((user, idx) => (
                <div key={user.id} className={`flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 ${idx !== recentUsers.length - 1 ? 'border-b-2 border-black' : ''} hover:bg-zinc-50 transition-colors`}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 border-2 border-black rounded-full flex items-center justify-center font-bold text-sm">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold">{user.name}</h3>
                      <p className="text-sm text-zinc-500">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-0.5 text-xs font-bold rounded border border-black ${user.status === "active" ? "bg-blue-100" : "bg-zinc-100"}`}>
                      {user.status === "active" ? "Hoạt động" : "Không hoạt động"}
                    </span>
                    <span className="text-xs text-zinc-400">{user.joinDate}</span>
                    <button className="px-3 py-1.5 text-xs font-semibold border-2 border-black rounded-lg hover:bg-zinc-100 transition-colors">
                      Chi tiết
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ShareFooter />
    </div>
  );
}
