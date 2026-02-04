"use client";

import MainHeader from "../../components/MainHeader";
import ShareFooter from "../../components/ShareFooter";
import Link from "next/link";
import { ArrowLeft, Shield, CheckCircle, XCircle, Eye, Flag, Clock } from "lucide-react";

export default function ModerationPage() {
  const pendingPosts = [
    { id: 1, type: "roommate", title: "Tìm bạn ở chung quận 1", author: "Nguyễn Văn A", date: "2025-12-05" },
    { id: 2, type: "roomshare", title: "Cho thuê phòng trọ giá rẻ", author: "Trần Thị B", date: "2025-12-05" },
    { id: 3, type: "roommate", title: "Cần tìm người share phòng", author: "Lê Văn C", date: "2025-12-04" },
  ];

  const reportedContent = [
    { id: 1, postId: 101, postTitle: "Bài đăng có nội dung spam", reportedBy: "User123", reason: "Spam", date: "2025-12-05" },
    { id: 2, postId: 102, postTitle: "Thông tin không chính xác", reportedBy: "User456", reason: "Sai thông tin", date: "2025-12-04" },
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
              <Shield className="w-8 h-8" strokeWidth={1.5} />
              <h1 className="text-3xl md:text-4xl font-black">Kiểm Duyệt Nội Dung</h1>
            </div>
            <p className="text-zinc-600">Duyệt bài đăng và xử lý báo cáo từ người dùng</p>
          </div>

          {/* Stats - Inline, minimal */}
          <div className="flex flex-wrap gap-6 mb-10 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-zinc-400" />
              <span className="text-zinc-600">Chờ duyệt:</span>
              <span className="font-bold text-lg">{pendingPosts.length}</span>
            </div>
            <div className="flex items-center gap-2">
              <Flag className="w-5 h-5 text-zinc-400" />
              <span className="text-zinc-600">Bị báo cáo:</span>
              <span className="font-bold text-lg">{reportedContent.length}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-zinc-400" />
              <span className="text-zinc-600">Đã duyệt hôm nay:</span>
              <span className="font-bold text-lg">12</span>
            </div>
          </div>

          {/* Pending Posts */}
          <div className="mb-12">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5" /> Bài Đăng Chờ Duyệt
            </h2>
            <div className="border-2 border-black rounded-xl overflow-hidden">
              {pendingPosts.map((post, idx) => (
                <div key={post.id} className={`flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 ${idx !== pendingPosts.length - 1 ? 'border-b-2 border-black' : ''} hover:bg-zinc-50 transition-colors`}>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-0.5 text-xs font-bold rounded border border-black ${post.type === "roommate" ? "bg-blue-100" : "bg-pink-100"}`}>
                        {post.type === "roommate" ? "Roommate" : "Roomshare"}
                      </span>
                      <span className="text-xs text-zinc-400">{post.date}</span>
                    </div>
                    <h3 className="font-bold">{post.title}</h3>
                    <p className="text-sm text-zinc-500">bởi {post.author}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-2 text-sm font-semibold border-2 border-black rounded-lg hover:bg-zinc-100 transition-colors flex items-center gap-1">
                      <Eye className="w-4 h-4" /> Xem
                    </button>
                    <button className="px-3 py-2 text-sm font-semibold border-2 border-black rounded-lg bg-blue-100 hover:bg-blue-200 transition-colors flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" /> Duyệt
                    </button>
                    <button className="px-3 py-2 text-sm font-semibold border-2 border-black rounded-lg hover:bg-red-100 transition-colors flex items-center gap-1">
                      <XCircle className="w-4 h-4" /> Từ chối
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reported Content */}
          <div>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Flag className="w-5 h-5" /> Nội Dung Bị Báo Cáo
            </h2>
            <div className="border-2 border-black rounded-xl overflow-hidden">
              {reportedContent.map((report, idx) => (
                <div key={report.id} className={`flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 ${idx !== reportedContent.length - 1 ? 'border-b-2 border-black' : ''} hover:bg-zinc-50 transition-colors`}>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 text-xs font-bold rounded border border-black bg-red-100">
                        {report.reason}
                      </span>
                      <span className="text-xs text-zinc-400">{report.date}</span>
                    </div>
                    <h3 className="font-bold">{report.postTitle}</h3>
                    <p className="text-sm text-zinc-500">Báo cáo bởi: {report.reportedBy} • ID: #{report.postId}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-2 text-sm font-semibold border-2 border-black rounded-lg hover:bg-zinc-100 transition-colors flex items-center gap-1">
                      <Eye className="w-4 h-4" /> Xem
                    </button>
                    <button className="px-3 py-2 text-sm font-semibold border-2 border-black rounded-lg bg-blue-100 hover:bg-blue-200 transition-colors">
                      Bỏ qua
                    </button>
                    <button className="px-3 py-2 text-sm font-semibold border-2 border-black rounded-lg hover:bg-red-100 transition-colors">
                      Xóa bài
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Empty State */}
          {pendingPosts.length === 0 && reportedContent.length === 0 && (
            <div className="text-center py-16">
              <Shield className="w-16 h-16 text-zinc-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-zinc-500 mb-2">Không có nội dung cần xử lý</h3>
              <p className="text-sm text-zinc-400">Tất cả bài đăng đã được duyệt</p>
            </div>
          )}
        </div>
      </section>

      <ShareFooter />
    </div>
  );
}
