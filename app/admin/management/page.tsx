"use client";

import MainHeader from "../../components/MainHeader";
import ShareFooter from "../../components/ShareFooter";
import Link from "next/link";
import { ArrowLeft, Settings, Users, BarChart3, Database, Mail, Bell } from "lucide-react";

export default function ManagementPage() {
  // Mock data - replace with real data from backend
  const systemStats = {
    totalUsers: 2458,
    activeUsers: 1823,
    totalListings: 342,
    totalMessages: 8934,
  };

  const recentUsers = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      email: "nguyenvana@email.com",
      joinDate: "2025-12-01",
      role: "user",
      status: "active",
    },
    {
      id: 2,
      name: "Trần Thị B",
      email: "tranthib@email.com",
      joinDate: "2025-12-03",
      role: "user",
      status: "active",
    },
    {
      id: 3,
      name: "Lê Văn C",
      email: "levanc@email.com",
      joinDate: "2025-11-28",
      role: "user",
      status: "inactive",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <MainHeader />

      <section className="section bg-green-50 py-12 md:py-16">
        <div className="wrapper max-w-6xl">
          {/* Header */}
          <div className="mb-8">
            <Link href="/admin" className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-600 hover:text-black transition-colors mb-4">
              <ArrowLeft className="w-4 h-4" />
              Quay lại trang Admin
            </Link>
            <div className="flex items-center gap-3 mb-3">
              <Settings className="w-10 h-10 text-green-600" />
              <h1 className="text-4xl font-black">Quản Lý Hệ Thống</h1>
            </div>
            <p className="text-base text-zinc-600">
              Quản lý người dùng, thống kê và cài đặt hệ thống
            </p>
          </div>

          {/* System Statistics */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Thống Kê Hệ Thống</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="card bg-white">
                <div className="text-center">
                  <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-xs font-medium text-zinc-600 mb-1">Tổng người dùng</p>
                  <p className="text-2xl font-black text-blue-700">{systemStats.totalUsers.toLocaleString()}</p>
                </div>
              </div>

              <div className="card bg-white">
                <div className="text-center">
                  <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-xs font-medium text-zinc-600 mb-1">Người dùng hoạt động</p>
                  <p className="text-2xl font-black text-green-700">{systemStats.activeUsers.toLocaleString()}</p>
                </div>
              </div>

              <div className="card bg-white">
                <div className="text-center">
                  <Database className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-xs font-medium text-zinc-600 mb-1">Tổng tin đăng</p>
                  <p className="text-2xl font-black text-purple-700">{systemStats.totalListings.toLocaleString()}</p>
                </div>
              </div>

              <div className="card bg-white">
                <div className="text-center">
                  <Mail className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <p className="text-xs font-medium text-zinc-600 mb-1">Tin nhắn</p>
                  <p className="text-2xl font-black text-orange-700">{systemStats.totalMessages.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Thao Tác Nhanh</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <button className="card bg-white hover:-translate-y-1 transition-all text-left">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 border-2 border-black rounded-xl">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Quản lý người dùng</h3>
                    <p className="text-xs text-zinc-600">Xem, chỉnh sửa thông tin người dùng</p>
                  </div>
                </div>
              </button>

              <button className="card bg-white hover:-translate-y-1 transition-all text-left">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-100 border-2 border-black rounded-xl">
                    <BarChart3 className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Báo cáo & Thống kê</h3>
                    <p className="text-xs text-zinc-600">Xem báo cáo chi tiết hệ thống</p>
                  </div>
                </div>
              </button>

              <button className="card bg-white hover:-translate-y-1 transition-all text-left">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 border-2 border-black rounded-xl">
                    <Settings className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Cài đặt hệ thống</h3>
                    <p className="text-xs text-zinc-600">Cấu hình các thiết lập chung</p>
                  </div>
                </div>
              </button>

              <button className="card bg-white hover:-translate-y-1 transition-all text-left">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-yellow-100 border-2 border-black rounded-xl">
                    <Bell className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Thông báo hệ thống</h3>
                    <p className="text-xs text-zinc-600">Gửi thông báo cho người dùng</p>
                  </div>
                </div>
              </button>

              <button className="card bg-white hover:-translate-y-1 transition-all text-left">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-red-100 border-2 border-black rounded-xl">
                    <Database className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Quản lý dữ liệu</h3>
                    <p className="text-xs text-zinc-600">Sao lưu và khôi phục dữ liệu</p>
                  </div>
                </div>
              </button>

              <button className="card bg-white hover:-translate-y-1 transition-all text-left">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-pink-100 border-2 border-black rounded-xl">
                    <Mail className="w-6 h-6 text-pink-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Email Marketing</h3>
                    <p className="text-xs text-zinc-600">Gửi email tới người dùng</p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Recent Users */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Người Dùng Gần Đây</h2>
            <div className="space-y-3">
              {recentUsers.map((user) => (
                <div key={user.id} className="card bg-white">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-200 border-2 border-black rounded-full flex items-center justify-center font-bold text-blue-700">
                        {user.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-base mb-1">{user.name}</h3>
                        <p className="text-sm text-zinc-600">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                      <div className="flex gap-2">
                        <span className={`px-3 py-1 text-xs font-bold rounded-full border-2 border-black ${
                          user.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}>
                          {user.status === "active" ? "Hoạt động" : "Không hoạt động"}
                        </span>
                        <span className="px-3 py-1 text-xs font-bold rounded-full bg-blue-100 text-blue-700 border-2 border-black">
                          {user.role === "admin" ? "Admin" : "User"}
                        </span>
                      </div>
                      <span className="text-xs text-zinc-500">Tham gia: {user.joinDate}</span>
                      <button className="btn-secondary text-xs px-3 py-1">
                        Chi tiết
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-6">
              <button className="btn-primary">
                Xem tất cả người dùng
              </button>
            </div>
          </div>
        </div>
      </section>

      <ShareFooter />
    </div>
  );
}
