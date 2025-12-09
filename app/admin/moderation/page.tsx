"use client";

import MainHeader from "../../components/MainHeader";
import ShareFooter from "../../components/ShareFooter";
import Link from "next/link";
import { ArrowLeft, Shield, CheckCircle, XCircle, Eye, Flag } from "lucide-react";

export default function ModerationPage() {
  // Mock data - replace with real data from backend
  const pendingPosts = [
    {
      id: 1,
      type: "roommate",
      title: "Tìm bạn ở chung quận 1",
      author: "Nguyễn Văn A",
      date: "2025-12-05",
      status: "pending",
    },
    {
      id: 2,
      type: "roomshare",
      title: "Cho thuê phòng trọ giá rẻ",
      author: "Trần Thị B",
      date: "2025-12-05",
      status: "pending",
    },
    {
      id: 3,
      type: "roommate",
      title: "Cần tìm người share phòng",
      author: "Lê Văn C",
      date: "2025-12-04",
      status: "pending",
    },
  ];

  const reportedContent = [
    {
      id: 1,
      postId: 101,
      postTitle: "Bài đăng có nội dung spam",
      reportedBy: "User123",
      reason: "Spam",
      date: "2025-12-05",
    },
    {
      id: 2,
      postId: 102,
      postTitle: "Thông tin không chính xác",
      reportedBy: "User456",
      reason: "Sai thông tin",
      date: "2025-12-04",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <MainHeader />

      <section className="section bg-red-50 py-12 md:py-16">
        <div className="wrapper max-w-6xl">
          {/* Header */}
          <div className="mb-8">
            <Link href="/admin" className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-600 hover:text-black transition-colors mb-4">
              <ArrowLeft className="w-4 h-4" />
              Quay lại trang Admin
            </Link>
            <div className="flex items-center gap-3 mb-3">
              <Shield className="w-10 h-10 text-red-600" />
              <h1 className="text-4xl font-black">Kiểm Duyệt Nội Dung</h1>
            </div>
            <p className="text-base text-zinc-600">
              Duyệt bài đăng và xử lý báo cáo từ người dùng
            </p>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="card bg-yellow-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-zinc-600 mb-1">Chờ duyệt</p>
                  <p className="text-3xl font-black text-yellow-700">{pendingPosts.length}</p>
                </div>
                <Eye className="w-10 h-10 text-yellow-600" />
              </div>
            </div>

            <div className="card bg-red-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-zinc-600 mb-1">Bị báo cáo</p>
                  <p className="text-3xl font-black text-red-700">{reportedContent.length}</p>
                </div>
                <Flag className="w-10 h-10 text-red-600" />
              </div>
            </div>

            <div className="card bg-green-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-zinc-600 mb-1">Đã duyệt hôm nay</p>
                  <p className="text-3xl font-black text-green-700">12</p>
                </div>
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
            </div>
          </div>

          {/* Pending Posts Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Bài Đăng Chờ Duyệt</h2>
            <div className="space-y-4">
              {pendingPosts.map((post) => (
                <div key={post.id} className="card bg-white">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`px-3 py-1 text-xs font-bold rounded-full border-2 border-black ${
                          post.type === "roommate"
                            ? "bg-blue-200 text-blue-800"
                            : "bg-pink-200 text-pink-800"
                        }`}>
                          {post.type === "roommate" ? "Roommate" : "Roomshare"}
                        </span>
                        <span className="text-xs text-zinc-500">{post.date}</span>
                      </div>
                      <h3 className="text-lg font-bold mb-1">{post.title}</h3>
                      <p className="text-sm text-zinc-600">Đăng bởi: {post.author}</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <button className="btn-secondary text-sm px-4 py-2 flex items-center justify-center gap-2">
                        <Eye className="w-4 h-4" />
                        Xem chi tiết
                      </button>
                      <button className="btn-green text-sm px-4 py-2 flex items-center justify-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Duyệt
                      </button>
                      <button className="bg-red-500 text-white font-semibold px-4 py-2 text-sm rounded-xl border-2 border-black shadow-[var(--shadow-primary)] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all duration-200 flex items-center justify-center gap-2">
                        <XCircle className="w-4 h-4" />
                        Từ chối
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reported Content Section */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Nội Dung Bị Báo Cáo</h2>
            <div className="space-y-4">
              {reportedContent.map((report) => (
                <div key={report.id} className="card bg-white border-l-4 border-l-red-500">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-3 py-1 text-xs font-bold rounded-full bg-red-100 text-red-700 border-2 border-black">
                          {report.reason}
                        </span>
                        <span className="text-xs text-zinc-500">{report.date}</span>
                      </div>
                      <h3 className="text-lg font-bold mb-1">{report.postTitle}</h3>
                      <p className="text-sm text-zinc-600">
                        Báo cáo bởi: {report.reportedBy} • Post ID: #{report.postId}
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <button className="btn-secondary text-sm px-4 py-2 flex items-center justify-center gap-2">
                        <Eye className="w-4 h-4" />
                        Xem chi tiết
                      </button>
                      <button className="btn-green text-sm px-4 py-2">
                        Bỏ qua
                      </button>
                      <button className="bg-red-500 text-white font-semibold px-4 py-2 text-sm rounded-xl border-2 border-black shadow-[var(--shadow-primary)] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all duration-200">
                        Xóa bài
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Empty State (hidden when there's data) */}
          {pendingPosts.length === 0 && reportedContent.length === 0 && (
            <div className="card bg-zinc-50 text-center py-16">
              <Shield className="w-16 h-16 text-zinc-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-zinc-600 mb-2">
                Không có nội dung cần xử lý
              </h3>
              <p className="text-sm text-zinc-500">
                Tất cả bài đăng đã được duyệt và không có báo cáo nào
              </p>
            </div>
          )}
        </div>
      </section>

      <ShareFooter />
    </div>
  );
}
