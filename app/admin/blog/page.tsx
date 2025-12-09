"use client";

import MainHeader from "../../components/MainHeader";
import ShareFooter from "../../components/ShareFooter";
import Link from "next/link";
import { ArrowLeft, FileText, Plus, Edit, Trash2, Eye, TrendingUp } from "lucide-react";

export default function BlogManagementPage() {
  // Mock data - replace with real data from backend
  const blogPosts = [
    {
      id: 1,
      title: "5 Lời Khuyên Khi Tìm Bạn Ở Chung",
      author: "Admin",
      date: "2025-12-01",
      views: 1250,
      status: "published",
      category: "Tips",
    },
    {
      id: 2,
      title: "Làm Thế Nào Để Chọn Phòng Trọ Phù Hợp?",
      author: "Admin",
      date: "2025-11-28",
      views: 980,
      status: "published",
      category: "Guide",
    },
    {
      id: 3,
      title: "Xu Hướng Thuê Phòng Trọ 2025",
      author: "Admin",
      date: "2025-12-05",
      views: 45,
      status: "draft",
      category: "News",
    },
  ];

  const stats = {
    totalPosts: 24,
    published: 20,
    drafts: 4,
    totalViews: 15420,
  };

  return (
    <div className="min-h-screen bg-white">
      <MainHeader />

      <section className="section bg-blue-50 py-12 md:py-16">
        <div className="wrapper max-w-6xl">
          {/* Header */}
          <div className="mb-8">
            <Link href="/admin" className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-600 hover:text-black transition-colors mb-4">
              <ArrowLeft className="w-4 h-4" />
              Quay lại trang Admin
            </Link>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <FileText className="w-10 h-10 text-blue-600" />
                  <h1 className="text-4xl font-black">Quản Lý Blog</h1>
                </div>
                <p className="text-base text-zinc-600">
                  Tạo, chỉnh sửa và quản lý các bài viết blog
                </p>
              </div>
              <button className="btn-primary flex items-center gap-2 px-6 py-3">
                <Plus className="w-5 h-5" />
                Tạo bài viết mới
              </button>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="card bg-white">
              <div className="text-center">
                <FileText className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-xs font-medium text-zinc-600 mb-1">Tổng bài viết</p>
                <p className="text-2xl font-black text-blue-700">{stats.totalPosts}</p>
              </div>
            </div>

            <div className="card bg-white">
              <div className="text-center">
                <Eye className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-xs font-medium text-zinc-600 mb-1">Đã xuất bản</p>
                <p className="text-2xl font-black text-green-700">{stats.published}</p>
              </div>
            </div>

            <div className="card bg-white">
              <div className="text-center">
                <Edit className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                <p className="text-xs font-medium text-zinc-600 mb-1">Bản nháp</p>
                <p className="text-2xl font-black text-yellow-700">{stats.drafts}</p>
              </div>
            </div>

            <div className="card bg-white">
              <div className="text-center">
                <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="text-xs font-medium text-zinc-600 mb-1">Lượt xem</p>
                <p className="text-2xl font-black text-purple-700">{stats.totalViews.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="card bg-white mb-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Tìm kiếm bài viết..."
                  className="w-full px-4 py-2 border-2 border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
              <select className="px-4 py-2 border-2 border-black rounded-xl font-semibold focus:outline-none focus:ring-2 focus:ring-blue-300">
                <option value="all">Tất cả trạng thái</option>
                <option value="published">Đã xuất bản</option>
                <option value="draft">Bản nháp</option>
              </select>
              <select className="px-4 py-2 border-2 border-black rounded-xl font-semibold focus:outline-none focus:ring-2 focus:ring-blue-300">
                <option value="all">Tất cả danh mục</option>
                <option value="tips">Tips</option>
                <option value="guide">Guide</option>
                <option value="news">News</option>
              </select>
            </div>
          </div>

          {/* Blog Posts List */}
          <div className="space-y-4">
            {blogPosts.map((post) => (
              <div key={post.id} className="card bg-white">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  {/* Post Info */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className={`px-3 py-1 text-xs font-bold rounded-full border-2 border-black ${
                        post.status === "published"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}>
                        {post.status === "published" ? "Đã xuất bản" : "Bản nháp"}
                      </span>
                      <span className="px-3 py-1 text-xs font-bold rounded-full bg-blue-100 text-blue-700 border-2 border-black">
                        {post.category}
                      </span>
                      <span className="text-xs text-zinc-500">{post.date}</span>
                    </div>
                    <h3 className="text-lg font-bold mb-1">{post.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-zinc-600">
                      <span>Tác giả: {post.author}</span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {post.views.toLocaleString()} lượt xem
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-2 lg:flex-col xl:flex-row">
                    <button className="btn-secondary text-sm px-4 py-2 flex items-center justify-center gap-2">
                      <Eye className="w-4 h-4" />
                      Xem
                    </button>
                    <button className="btn-primary text-sm px-4 py-2 flex items-center justify-center gap-2">
                      <Edit className="w-4 h-4" />
                      Sửa
                    </button>
                    <button className="bg-red-500 text-white font-semibold px-4 py-2 text-sm rounded-xl border-2 border-black shadow-[var(--shadow-primary)] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all duration-200 flex items-center justify-center gap-2">
                      <Trash2 className="w-4 h-4" />
                      Xóa
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {blogPosts.length === 0 && (
            <div className="card bg-zinc-50 text-center py-16">
              <FileText className="w-16 h-16 text-zinc-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-zinc-600 mb-2">
                Chưa có bài viết nào
              </h3>
              <p className="text-sm text-zinc-500 mb-6">
                Bắt đầu tạo bài viết blog đầu tiên của bạn
              </p>
              <button className="btn-primary inline-flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Tạo bài viết mới
              </button>
            </div>
          )}

          {/* Pagination */}
          {blogPosts.length > 0 && (
            <div className="flex justify-center gap-2 mt-8">
              <button className="btn-secondary px-4 py-2 text-sm">
                Trang trước
              </button>
              <button className="btn-primary px-4 py-2 text-sm">
                1
              </button>
              <button className="btn-secondary px-4 py-2 text-sm">
                2
              </button>
              <button className="btn-secondary px-4 py-2 text-sm">
                3
              </button>
              <button className="btn-secondary px-4 py-2 text-sm">
                Trang sau
              </button>
            </div>
          )}
        </div>
      </section>

      <ShareFooter />
    </div>
  );
}
