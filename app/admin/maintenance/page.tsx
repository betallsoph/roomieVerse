"use client";

import MainHeader from "../../components/MainHeader";
import ShareFooter from "../../components/ShareFooter";
import Link from "next/link";
import { ArrowLeft, Wrench, Database, RefreshCw, HardDrive, AlertTriangle, CheckCircle, Server, Upload, ArrowRight } from "lucide-react";

export default function MaintenancePage() {
  const systemHealth = { database: "healthy", storage: "warning", api: "healthy", cache: "healthy" };
  const storageStats = { used: 45.2, total: 100, percentage: 45.2 };
  const lastBackup = { date: "2025-12-05 03:00 AM", size: "2.4 GB", status: "success" };

  const maintenanceLogs = [
    { id: 1, action: "Database Backup", status: "success", timestamp: "2025-12-05 03:00 AM", duration: "15 phút" },
    { id: 2, action: "Cache Clear", status: "success", timestamp: "2025-12-04 02:00 AM", duration: "2 phút" },
    { id: 3, action: "System Update", status: "warning", timestamp: "2025-12-03 01:00 AM", duration: "45 phút" },
  ];

  const actions = [
    { icon: Database, title: "Sao lưu Database", desc: "Tạo bản sao lưu CSDL" },
    { icon: RefreshCw, title: "Xóa Cache", desc: "Làm mới bộ nhớ đệm" },
    { icon: Upload, title: "Khôi phục Backup", desc: "Phục hồi từ bản sao lưu" },
    { icon: Server, title: "Khởi động lại", desc: "Restart hệ thống" },
    { icon: AlertTriangle, title: "Chế độ bảo trì", desc: "Tạm ngừng hệ thống" },
    { icon: HardDrive, title: "Dọn dẹp dữ liệu", desc: "Xóa file tạm, log cũ" },
  ];

  const healthItems = [
    { key: "database", label: "Database", icon: Database },
    { key: "storage", label: "Storage", icon: HardDrive },
    { key: "api", label: "API", icon: Server },
    { key: "cache", label: "Cache", icon: RefreshCw },
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
              <Wrench className="w-8 h-8" strokeWidth={1.5} />
              <h1 className="text-3xl md:text-4xl font-black">Bảo Dưỡng Hệ Thống</h1>
            </div>
            <p className="text-zinc-600">Bảo trì, cập nhật và sao lưu hệ thống</p>
          </div>

          {/* System Health - Inline badges */}
          <div className="mb-10">
            <h2 className="text-lg font-bold mb-3">Tình Trạng Hệ Thống</h2>
            <div className="flex flex-wrap gap-3">
              {healthItems.map((item) => {
                const status = systemHealth[item.key as keyof typeof systemHealth];
                const isHealthy = status === "healthy";
                const isWarning = status === "warning";
                return (
                  <div key={item.key} className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-black ${isHealthy ? 'bg-blue-50' : isWarning ? 'bg-yellow-50' : 'bg-red-50'}`}>
                    <item.icon className="w-5 h-5" strokeWidth={1.5} />
                    <span className="font-medium">{item.label}</span>
                    {isHealthy ? (
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-yellow-600" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Storage & Backup - Side by side, compact */}
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {/* Storage */}
            <div className="p-5 border-2 border-black rounded-xl">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <HardDrive className="w-5 h-5" /> Dung Lượng
              </h3>
              <div className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-zinc-500">Đã dùng</span>
                  <span className="font-bold">{storageStats.used} / {storageStats.total} GB</span>
                </div>
                <div className="w-full h-3 bg-zinc-100 border border-black rounded-full overflow-hidden">
                  <div className="h-full bg-blue-300 transition-all" style={{ width: `${storageStats.percentage}%` }}></div>
                </div>
              </div>
              <button className="w-full py-2 text-sm font-semibold border-2 border-black rounded-lg hover:bg-blue-50 transition-colors">
                Quản lý dung lượng
              </button>
            </div>

            {/* Last Backup */}
            <div className="p-5 border-2 border-black rounded-xl">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <Database className="w-5 h-5" /> Sao Lưu Gần Nhất
              </h3>
              <div className="space-y-1 mb-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Thời gian:</span>
                  <span className="font-medium">{lastBackup.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Kích thước:</span>
                  <span className="font-medium">{lastBackup.size}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Trạng thái:</span>
                  <span className="font-medium flex items-center gap-1 text-blue-600">
                    <CheckCircle className="w-4 h-4" /> Thành công
                  </span>
                </div>
              </div>
              <button className="w-full py-2 text-sm font-semibold border-2 border-black rounded-lg bg-blue-100 hover:bg-blue-200 transition-colors">
                Tạo bản sao lưu mới
              </button>
            </div>
          </div>

          {/* Maintenance Actions - Compact grid */}
          <div className="mb-10">
            <h2 className="text-lg font-bold mb-3">Thao Tác Bảo Dưỡng</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {actions.map((action, idx) => (
                <button key={idx} className="group flex items-center gap-3 p-4 border-2 border-black rounded-xl hover:bg-blue-50 transition-all text-left">
                  <action.icon className="w-6 h-6 text-zinc-600 group-hover:text-black" strokeWidth={1.5} />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm truncate">{action.title}</h3>
                    <p className="text-xs text-zinc-500 truncate">{action.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Maintenance Logs - Table style */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold">Nhật Ký Bảo Dưỡng</h2>
              <button className="text-sm font-semibold text-zinc-500 hover:text-black transition-colors">
                Xem tất cả →
              </button>
            </div>
            <div className="border-2 border-black rounded-xl overflow-hidden">
              {maintenanceLogs.map((log, idx) => (
                <div key={log.id} className={`flex items-center justify-between gap-4 p-4 ${idx !== maintenanceLogs.length - 1 ? 'border-b-2 border-black' : ''} hover:bg-zinc-50 transition-colors`}>
                  <div className="flex items-center gap-3">
                    {log.status === "success" ? (
                      <CheckCircle className="w-5 h-5 text-blue-600" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-yellow-600" />
                    )}
                    <div>
                      <h3 className="font-bold text-sm">{log.action}</h3>
                      <p className="text-xs text-zinc-500">{log.timestamp} • {log.duration}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-0.5 text-xs font-bold rounded border border-black ${log.status === "success" ? "bg-blue-100" : "bg-yellow-100"}`}>
                    {log.status === "success" ? "Thành công" : "Cảnh báo"}
                  </span>
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
