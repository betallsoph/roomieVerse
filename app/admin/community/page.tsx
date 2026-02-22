"use client";

import { useEffect, useState } from "react";
import MainHeader from "../../components/MainHeader";
import ShareFooter from "../../components/ShareFooter";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../contexts/AuthContext";
import {
  getPendingCommunityPosts,
  approveCommunityPost,
  rejectCommunityPost,
  hardDeleteCommunityPost,
} from "../../data/community";
import { getPendingReports, updateReportStatus } from "../../data/reports";
import { CommunityPost } from "../../data/types";
import { Report } from "../../data/types";
import {
  ArrowLeft,
  MessageSquare,
  Flag,
  CheckCircle,
  XCircle,
  Eye,
  Clock,
  Loader2,
  Lightbulb,
  Flame,
  Star,
  ShoppingBag,
  BookOpen,
} from "lucide-react";
import { CommunityCategory } from "../../data/types";

const categoryLabels: Record<CommunityCategory, string> = {
  tips: "Mẹo hay",
  drama: "Drama",
  review: "Review",
  "pass-do": "Pass đồ",
  blog: "Blog",
};

const categoryColors: Record<CommunityCategory, string> = {
  tips: "bg-yellow-100 text-yellow-700",
  drama: "bg-red-100 text-red-700",
  review: "bg-indigo-100 text-indigo-700",
  "pass-do": "bg-green-100 text-green-700",
  blog: "bg-purple-100 text-purple-700",
};

function timeAgo(dateStr?: string): string {
  if (!dateStr) return "";
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins} phút trước`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} giờ trước`;
  const days = Math.floor(hours / 24);
  return `${days} ngày trước`;
}

export default function CommunityModerationPage() {
  const { user, isMod, isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [pendingPosts, setPendingPosts] = useState<CommunityPost[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  useEffect(() => {
    if (!authLoading && (!isAuthenticated || !isMod)) {
      router.push("/");
    }
  }, [authLoading, isAuthenticated, isMod, router]);

  // Fetch data
  useEffect(() => {
    async function load() {
      if (!isMod) return;
      try {
        const [posts, rpts] = await Promise.all([
          getPendingCommunityPosts(),
          getPendingReports(),
        ]);
        // Filter out pass-do — handled on separate /admin/pass-do page
        setPendingPosts(posts.filter(p => p.category !== "pass-do"));
        setReports(rpts);
      } catch (error) {
        console.error("Error loading moderation data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, [isMod]);

  const handleApprove = async (postId: string) => {
    if (!user) return;
    setActionLoading(postId);
    try {
      await approveCommunityPost(postId, user.uid);
      setPendingPosts((prev) => prev.filter((p) => p.id !== postId));
    } catch (error) {
      console.error("Error approving post:", error);
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (postId: string) => {
    if (!user || !rejectReason.trim()) return;
    setActionLoading(postId);
    try {
      await rejectCommunityPost(postId, user.uid, rejectReason.trim());
      setPendingPosts((prev) => prev.filter((p) => p.id !== postId));
      setRejectingId(null);
      setRejectReason("");
    } catch (error) {
      console.error("Error rejecting post:", error);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (postId: string) => {
    if (!confirm("Xóa vĩnh viễn bài viết này?")) return;
    setActionLoading(postId);
    try {
      await hardDeleteCommunityPost(postId);
      setPendingPosts((prev) => prev.filter((p) => p.id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    } finally {
      setActionLoading(null);
    }
  };

  const handleResolveReport = async (reportId: string) => {
    if (!user) return;
    setActionLoading(reportId);
    try {
      await updateReportStatus(reportId, "resolved", user.uid);
      setReports((prev) => prev.filter((r) => r.id !== reportId));
    } catch (error) {
      console.error("Error resolving report:", error);
    } finally {
      setActionLoading(null);
    }
  };

  if (authLoading || !isAuthenticated || !isMod) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-300 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50">
      <MainHeader />

      <section className="py-12 md:py-16">
        <div className="wrapper max-w-5xl">
          {/* Header */}
          <div className="mb-10">
            <Link href="/admin" className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-500 hover:text-black transition-colors mb-6">
              <ArrowLeft className="w-4 h-4" />
              Quay lại
            </Link>
            <h1 className="text-3xl md:text-4xl font-black">Kiểm Duyệt Cộng Đồng</h1>
            <p className="text-zinc-500 mt-1">Duyệt bài viết và xử lý báo cáo</p>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 mb-6 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-zinc-400" />
              <span className="text-zinc-600">Bài chờ duyệt:</span>
              <span className="font-bold">{pendingPosts.length}</span>
            </div>
            <div className="flex items-center gap-2">
              <Flag className="w-4 h-4 text-zinc-400" />
              <span className="text-zinc-600">Báo cáo chờ xử lý:</span>
              <span className="font-bold">{reports.length}</span>
            </div>
          </div>

          {isLoading && (
            <div className="text-center py-16">
              <Loader2 className="w-8 h-8 text-zinc-400 mx-auto mb-3 animate-spin" />
              <p className="text-zinc-500">Đang truy xuất hệ thống...</p>
            </div>
          )}

          {/* Pending Posts */}
          {!isLoading && (
            <div className="space-y-8">
              {/* Pending community posts */}
              <div>
                <h2 className="text-lg font-black mb-4">Bài viết chờ duyệt ({pendingPosts.length})</h2>
                {pendingPosts.length === 0 ? (
                  <div className="border-2 border-dashed border-zinc-200 rounded-xl p-8 text-center bg-white">
                    <MessageSquare className="w-10 h-10 text-zinc-300 mx-auto mb-3" />
                    <p className="text-sm text-zinc-400">Không có bài viết nào chờ duyệt</p>
                  </div>
                ) : (
                  <div className="border-2 border-black rounded-xl overflow-hidden bg-white">
                    {pendingPosts.map((post, idx) => {
                      const postId = post.id!;
                      const isRejecting = rejectingId === postId;
                      const isActionLoading = actionLoading === postId;
                      return (
                        <div
                          key={postId}
                          className={`p-5 ${idx !== pendingPosts.length - 1 ? "border-b-2 border-black" : ""} hover:bg-zinc-50 transition-colors`}
                        >
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1.5">
                                <span className={`px-2 py-0.5 text-xs font-bold rounded ${categoryColors[post.category]}`}>
                                  {categoryLabels[post.category]}
                                </span>
                                <span className="text-xs text-zinc-400">{timeAgo(post.createdAt)}</span>
                              </div>
                              <h3 className="font-bold truncate mb-0.5">{post.title}</h3>
                              <p className="text-sm text-zinc-500">bởi {post.authorName}</p>
                              <p className="text-xs text-zinc-400 mt-1 line-clamp-2">{post.preview}</p>
                              {post.images && post.images.length > 0 && (
                                <div className="flex gap-2 mt-2">
                                  {post.images.slice(0, 3).map((img, i) => (
                                    <img key={i} src={img} alt="" className="w-16 h-16 rounded-lg border border-zinc-200 object-cover" />
                                  ))}
                                  {post.images.length > 3 && (
                                    <div className="w-16 h-16 rounded-lg border border-zinc-200 bg-zinc-100 flex items-center justify-center text-xs font-bold text-zinc-500">
                                      +{post.images.length - 3}
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2 flex-shrink-0">
                              <Link
                                href={`/community/${postId}`}
                                target="_blank"
                                className="px-3 py-2 text-sm font-semibold border-2 border-black rounded-lg hover:bg-zinc-100 transition-colors flex items-center gap-1"
                              >
                                <Eye className="w-4 h-4" /> Xem
                              </Link>
                              <button
                                onClick={() => handleApprove(postId)}
                                disabled={isActionLoading}
                                className="px-3 py-2 text-sm font-semibold border-2 border-black rounded-lg bg-green-100 hover:bg-green-200 transition-colors flex items-center gap-1 disabled:opacity-50"
                              >
                                {isActionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                                Duyệt
                              </button>
                              <button
                                onClick={() => setRejectingId(isRejecting ? null : postId)}
                                disabled={isActionLoading}
                                className="px-3 py-2 text-sm font-semibold border-2 border-black rounded-lg hover:bg-red-100 transition-colors flex items-center gap-1 disabled:opacity-50"
                              >
                                <XCircle className="w-4 h-4" /> Từ chối
                              </button>
                            </div>
                          </div>

                          {/* Reject reason */}
                          {isRejecting && (
                            <div className="mt-4 flex gap-2">
                              <input
                                autoComplete="off" type="text"
                                value={rejectReason}
                                onChange={(e) => setRejectReason(e.target.value)}
                                placeholder="Lý do từ chối..."
                                className="flex-1 px-3 py-2 text-sm border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
                              />
                              <button
                                onClick={() => handleReject(postId)}
                                disabled={!rejectReason.trim() || isActionLoading}
                                className="px-4 py-2 text-sm font-semibold border-2 border-black rounded-lg bg-red-100 hover:bg-red-200 transition-colors disabled:opacity-50"
                              >
                                Xác nhận
                              </button>
                              <button
                                onClick={() => handleDelete(postId)}
                                disabled={isActionLoading}
                                className="px-4 py-2 text-sm font-semibold border-2 border-black rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors disabled:opacity-50"
                              >
                                Xóa hẳn
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Reports */}
              <div>
                <h2 className="text-lg font-black mb-4">Báo cáo chờ xử lý ({reports.length})</h2>
                {reports.length === 0 ? (
                  <div className="border-2 border-dashed border-zinc-200 rounded-xl p-8 text-center bg-white">
                    <Flag className="w-10 h-10 text-zinc-300 mx-auto mb-3" />
                    <p className="text-sm text-zinc-400">Không có báo cáo nào cần xử lý</p>
                  </div>
                ) : (
                  <div className="border-2 border-black rounded-xl overflow-hidden bg-white">
                    {reports.map((report, idx) => (
                      <div
                        key={report.id}
                        className={`p-5 ${idx !== reports.length - 1 ? "border-b-2 border-black" : ""} hover:bg-zinc-50 transition-colors`}
                      >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1.5">
                              <span className="px-2 py-0.5 text-xs font-bold rounded bg-red-100 text-red-700">
                                {report.reason}
                              </span>
                              <span className="text-xs text-zinc-400">{timeAgo(report.createdAt)}</span>
                            </div>
                            <p className="text-sm font-bold mb-0.5">Listing: {report.listingId}</p>
                            {report.details && (
                              <p className="text-xs text-zinc-500">{report.details}</p>
                            )}
                          </div>
                          <button
                            onClick={() => handleResolveReport(report.id!)}
                            disabled={actionLoading === report.id}
                            className="px-4 py-2 text-sm font-semibold border-2 border-black rounded-lg bg-green-100 hover:bg-green-200 transition-colors flex items-center gap-1 disabled:opacity-50"
                          >
                            {actionLoading === report.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                            Đã xử lý
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      <ShareFooter />
    </div>
  );
}
