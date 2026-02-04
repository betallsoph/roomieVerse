"use client";

import MainHeader from "../../components/MainHeader";
import ShareFooter from "../../components/ShareFooter";
import Link from "next/link";
import { ArrowLeft, FileText, Plus, Edit, Trash2, Eye, TrendingUp } from "lucide-react";

export default function BlogManagementPage() {
  const blogPosts = [
    { id: 1, title: "5 Lời Khuyên Khi Tìm Bạn Ở Chung", author: "Admin", date: "2025-12-01", views: 1250, status: "published", category: "Tips" },
    { id: 2, title: "Làm Thế Nào Để Chọn Phòng Trọ Phù Hợp?", author: "Admin", date: "2025-11-28", views: 980, status: "published", category: "Guide" },
    { id: 3, title: "Xu Hướng Thuê Phòng Trọ 2025", author: "Admin", date: "2025-12-05", views: 45, status: "draft", category: "News" },
  ];

  const stats = { totalPosts: 24, published: 20, drafts: 4, totalViews: 15420 };

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
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <FileText className="w-8 h-8" strokeWidth={1.5} />
                  <h1 className="text-3xl md:text-4xl font-black">Quản Lý Blog</h1>
                </div>
                <p className="text-zinc-600">Tạo, chỉnh sửa và quản lý các bài viết blog</p>
              </div>
              <button className="btn-primary flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Tạo bài viết
              </button>
            </div>
          </div>

          {/* Stats - Inline */}
          <div className="flex flex-wrap gap-6 mb-10 text-sm">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-zinc-400" />
              <span className="text-zinc-600">Tổng:</span>
              <span className="font-bold text-lg">{stats.totalPosts}</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-zinc-400" />
              <span className="text-zinc-600">Đã xuất bản:</span>
              <span className="font-bold text-lg">{stats.published}</span>
            </div>
            <div className="flex items-center gap-2">
              <Edit className="w-5 h-5 text-zinc-400" />
              <span className="text-zinc-600">Bản nháp:</span>
              <span className="font-bold text-lg">{stats.drafts}</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-zinc-400" />
              <span className="text-zinc-600">Lượt xem:</span>
              <span className="font-bold text-lg">{stats.totalViews.toLocaleString()}</span>
            </div>
          </div>

          {/* Search & Filter */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <input
              type="text"
              placeholder="Tìm kiếm bài viết..."
              className="flex-1 px-4 py-2.5 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <select className="px-4 py-2.5 border-2 border-black rounded-lg font-semibold focus:outline-none">
              <option value="all">Tất cả trạng thái</option>
              <option value="published">Đã xuất bản</option>
              <option value="draft">Bản nháp</option>
            </select>
          </div>

          {/* Blog Posts Table */}
          <div className="border-2 border-black rounded-xl overflow-hidden">
            {blogPosts.map((post, idx) => (
              <div key={post.id} className={`flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-5 ${idx !== blogPosts.length - 1 ? 'border-b-2 border-black' : ''} hover:bg-zinc-50 transition-colors`}>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className={`px-2 py-0.5 text-xs font-bold rounded border border-black ${post.status === "published" ? "bg-blue-100" : "bg-zinc-100"}`}>
                      {post.status === "published" ? "Xuất bản" : "Nháp"}
                    </span>
                    <span className="px-2 py-0.5 text-xs font-medium rounded bg-zinc-100 border border-zinc-200">
                      {post.category}
                    </span>
                    <span className="text-xs text-zinc-400">{post.date}</span>
                  </div>
                  <h3 className="font-bold text-lg">{post.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-zinc-500">
                    <span>{post.author}</span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {post.views.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-2 text-sm font-semibold border-2 border-black rounded-lg hover:bg-zinc-100 transition-colors flex items-center gap-1">
                    <Eye className="w-4 h-4" /> Xem
                  </button>
                  <button className="px-3 py-2 text-sm font-semibold border-2 border-black rounded-lg bg-blue-100 hover:bg-blue-200 transition-colors flex items-center gap-1">
                    <Edit className="w-4 h-4" /> Sửa
                  </button>
                  <button className="px-3 py-2 text-sm font-semibold border-2 border-black rounded-lg hover:bg-red-100 transition-colors flex items-center gap-1">
                    <Trash2 className="w-4 h-4" /> Xóa
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {blogPosts.length > 0 && (
            <div className="flex justify-center gap-2 mt-8">
              <button className="px-4 py-2 text-sm font-semibold border-2 border-black rounded-lg hover:bg-zinc-100">
                ← Trước
              </button>
              <button className="px-4 py-2 text-sm font-bold border-2 border-black rounded-lg bg-blue-100">
                1
              </button>
              <button className="px-4 py-2 text-sm font-semibold border-2 border-black rounded-lg hover:bg-zinc-100">
                2
              </button>
              <button className="px-4 py-2 text-sm font-semibold border-2 border-black rounded-lg hover:bg-zinc-100">
                Sau →
              </button>
            </div>
          )}
        </div>
      </section>

      <ShareFooter />
    </div>
  );
}
