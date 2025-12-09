"use client";

import MainHeader from "../../components/MainHeader";
import ShareFooter from "../../components/ShareFooter";
import Link from "next/link";
import { ArrowLeft, Wrench, Database, RefreshCw, HardDrive, AlertTriangle, CheckCircle, Server, Upload } from "lucide-react";

export default function MaintenancePage() {
  // Mock data - replace with real data from backend
  const systemHealth = {
    database: "healthy",
    storage: "warning",
    api: "healthy",
    cache: "healthy",
  };

  const storageStats = {
    used: 45.2,
    total: 100,
    percentage: 45.2,
  };

  const lastBackup = {
    date: "2025-12-05 03:00 AM",
    size: "2.4 GB",
    status: "success",
  };

  const maintenanceLogs = [
    {
      id: 1,
      action: "Database Backup",
      status: "success",
      timestamp: "2025-12-05 03:00 AM",
      duration: "15 phút",
    },
    {
      id: 2,
      action: "Cache Clear",
      status: "success",
      timestamp: "2025-12-04 02:00 AM",
      duration: "2 phút",
    },
    {
      id: 3,
      action: "System Update",
      status: "warning",
      timestamp: "2025-12-03 01:00 AM",
      duration: "45 phút",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <MainHeader />

      <section className="section bg-yellow-50 py-12 md:py-16">
        <div className="wrapper max-w-6xl">
          {/* Header */}
          <div className="mb-8">
            <Link href="/admin" className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-600 hover:text-black transition-colors mb-4">
              <ArrowLeft className="w-4 h-4" />
              Quay lại trang Admin
            </Link>
            <div className="flex items-center gap-3 mb-3">
              <Wrench className="w-10 h-10 text-yellow-600" />
              <h1 className="text-4xl font-black">Bảo Dưỡng Hệ Thống</h1>
            </div>
            <p className="text-base text-zinc-600">
              Bảo trì, cập nhật và sao lưu hệ thống
            </p>
          </div>

          {/* System Health Status */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Tình Trạng Hệ Thống</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className={`card ${
                systemHealth.database === "healthy" ? "bg-green-100" : "bg-red-100"
              }`}>
                <div className="text-center">
                  <Database className={`w-8 h-8 mx-auto mb-2 ${
                    systemHealth.database === "healthy" ? "text-green-600" : "text-red-600"
                  }`} />
                  <p className="text-xs font-medium text-zinc-600 mb-1">Database</p>
                  <div className="flex items-center justify-center gap-1">
                    {systemHealth.database === "healthy" ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                    )}
                    <p className="text-sm font-bold">
                      {systemHealth.database === "healthy" ? "Tốt" : "Lỗi"}
                    </p>
                  </div>
                </div>
              </div>

              <div className={`card ${
                systemHealth.storage === "healthy" ? "bg-green-100" : systemHealth.storage === "warning" ? "bg-yellow-100" : "bg-red-100"
              }`}>
                <div className="text-center">
                  <HardDrive className={`w-8 h-8 mx-auto mb-2 ${
                    systemHealth.storage === "healthy" ? "text-green-600" : systemHealth.storage === "warning" ? "text-yellow-600" : "text-red-600"
                  }`} />
                  <p className="text-xs font-medium text-zinc-600 mb-1">Storage</p>
                  <div className="flex items-center justify-center gap-1">
                    {systemHealth.storage === "warning" ? (
                      <AlertTriangle className="w-4 h-4 text-yellow-600" />
                    ) : (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    )}
                    <p className="text-sm font-bold">
                      {systemHealth.storage === "healthy" ? "Tốt" : "Cảnh báo"}
                    </p>
                  </div>
                </div>
              </div>

              <div className={`card ${
                systemHealth.api === "healthy" ? "bg-green-100" : "bg-red-100"
              }`}>
                <div className="text-center">
                  <Server className={`w-8 h-8 mx-auto mb-2 ${
                    systemHealth.api === "healthy" ? "text-green-600" : "text-red-600"
                  }`} />
                  <p className="text-xs font-medium text-zinc-600 mb-1">API</p>
                  <div className="flex items-center justify-center gap-1">
                    {systemHealth.api === "healthy" ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                    )}
                    <p className="text-sm font-bold">
                      {systemHealth.api === "healthy" ? "Tốt" : "Lỗi"}
                    </p>
                  </div>
                </div>
              </div>

              <div className={`card ${
                systemHealth.cache === "healthy" ? "bg-green-100" : "bg-red-100"
              }`}>
                <div className="text-center">
                  <RefreshCw className={`w-8 h-8 mx-auto mb-2 ${
                    systemHealth.cache === "healthy" ? "text-green-600" : "text-red-600"
                  }`} />
                  <p className="text-xs font-medium text-zinc-600 mb-1">Cache</p>
                  <div className="flex items-center justify-center gap-1">
                    {systemHealth.cache === "healthy" ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                    )}
                    <p className="text-sm font-bold">
                      {systemHealth.cache === "healthy" ? "Tốt" : "Lỗi"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Storage & Backup Info */}
          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            {/* Storage */}
            <div className="card bg-white">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <HardDrive className="w-5 h-5" />
                Dung Lượng Lưu Trữ
              </h3>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-zinc-600">Đã sử dụng</span>
                  <span className="font-bold">
                    {storageStats.used} GB / {storageStats.total} GB
                  </span>
                </div>
                <div className="w-full h-4 bg-gray-200 border-2 border-black rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-500 transition-all"
                    style={{ width: `${storageStats.percentage}%` }}
                  ></div>
                </div>
                <p className="text-xs text-zinc-500 mt-2">
                  {storageStats.percentage}% dung lượng đã sử dụng
                </p>
              </div>
              <button className="btn-yellow w-full">
                Quản lý dung lượng
              </button>
            </div>

            {/* Last Backup */}
            <div className="card bg-white">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Database className="w-5 h-5" />
                Sao Lưu Gần Nhất
              </h3>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-600">Thời gian:</span>
                  <span className="font-semibold">{lastBackup.date}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-600">Kích thước:</span>
                  <span className="font-semibold">{lastBackup.size}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-600">Trạng thái:</span>
                  <span className="flex items-center gap-1 font-semibold text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    Thành công
                  </span>
                </div>
              </div>
              <button className="btn-green w-full">
                Tạo bản sao lưu mới
              </button>
            </div>
          </div>

          {/* Maintenance Actions */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Thao Tác Bảo Dưỡng</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <button className="card bg-white hover:-translate-y-1 transition-all text-left">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 border-2 border-black rounded-xl">
                    <Database className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base mb-1">Sao lưu Database</h3>
                    <p className="text-xs text-zinc-600">Tạo bản sao lưu CSDL</p>
                  </div>
                </div>
              </button>

              <button className="card bg-white hover:-translate-y-1 transition-all text-left">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-100 border-2 border-black rounded-xl">
                    <RefreshCw className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base mb-1">Xóa Cache</h3>
                    <p className="text-xs text-zinc-600">Làm mới bộ nhớ đệm</p>
                  </div>
                </div>
              </button>

              <button className="card bg-white hover:-translate-y-1 transition-all text-left">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 border-2 border-black rounded-xl">
                    <Upload className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base mb-1">Khôi phục Backup</h3>
                    <p className="text-xs text-zinc-600">Phục hồi từ bản sao lưu</p>
                  </div>
                </div>
              </button>

              <button className="card bg-white hover:-translate-y-1 transition-all text-left">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-yellow-100 border-2 border-black rounded-xl">
                    <Server className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base mb-1">Khởi động lại Server</h3>
                    <p className="text-xs text-zinc-600">Restart hệ thống</p>
                  </div>
                </div>
              </button>

              <button className="card bg-white hover:-translate-y-1 transition-all text-left">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-red-100 border-2 border-black rounded-xl">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base mb-1">Chế độ bảo trì</h3>
                    <p className="text-xs text-zinc-600">Tạm ngừng hệ thống</p>
                  </div>
                </div>
              </button>

              <button className="card bg-white hover:-translate-y-1 transition-all text-left">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-pink-100 border-2 border-black rounded-xl">
                    <HardDrive className="w-6 h-6 text-pink-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base mb-1">Dọn dẹp dữ liệu</h3>
                    <p className="text-xs text-zinc-600">Xóa file tạm, log cũ</p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Maintenance Logs */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Nhật Ký Bảo Dưỡng</h2>
            <div className="space-y-3">
              {maintenanceLogs.map((log) => (
                <div key={log.id} className="card bg-white">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div className="flex items-center gap-4">
                      {log.status === "success" ? (
                        <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0" />
                      ) : (
                        <AlertTriangle className="w-8 h-8 text-yellow-600 flex-shrink-0" />
                      )}
                      <div>
                        <h3 className="font-bold text-base mb-1">{log.action}</h3>
                        <p className="text-sm text-zinc-600">
                          {log.timestamp} • Thời gian: {log.duration}
                        </p>
                      </div>
                    </div>
                    <span className={`px-4 py-2 text-xs font-bold rounded-full border-2 border-black ${
                      log.status === "success"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {log.status === "success" ? "Thành công" : "Cảnh báo"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-6">
              <button className="btn-secondary">
                Xem tất cả nhật ký
              </button>
            </div>
          </div>
        </div>
      </section>

      <ShareFooter />
    </div>
  );
}
