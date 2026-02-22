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
import { CommunityPost } from "../../data/types";
import {
  ArrowLeft,
  ShoppingBag,
  CheckCircle,
  XCircle,
  Eye,
  Clock,
  Loader2,
  MapPin,
} from "lucide-react";

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

export default function PassDoModerationPage() {
  const { user, isMod, isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  useEffect(() => {
    if (!authLoading && (!isAuthenticated || !isMod)) {
      router.push("/");
    }
  }, [authLoading, isAuthenticated, isMod, router]);

  useEffect(() => {
    async function load() {
      if (!isMod) return;
      try {
        const allPending = await getPendingCommunityPosts();
        setPosts(allPending.filter(p => p.category === "pass-do"));
      } catch (error) {
        console.error("Error loading pass-do posts:", error);
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
      setPosts(prev => prev.filter(p => p.id !== postId));
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
      setPosts(prev => prev.filter(p => p.id !== postId));
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
      setPosts(prev => prev.filter(p => p.id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
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
            <h1 className="text-3xl md:text-4xl font-black">Duyệt Pass Đồ</h1>
            <p className="text-zinc-500 mt-1">
              {isLoading ? "..." : `${posts.length} bài chờ duyệt`}
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-zinc-400" />
            </div>
          ) : posts.length === 0 ? (
            <div className="border-2 border-dashed border-zinc-300 rounded-xl p-8 text-center bg-white">
              <ShoppingBag className="w-10 h-10 text-zinc-300 mx-auto mb-3" />
              <p className="text-sm text-zinc-400">Không có bài pass đồ nào chờ duyệt</p>
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => {
                const postId = post.id!;
                const isRejecting = rejectingId === postId;
                const isActioning = actionLoading === postId;
                return (
                  <div key={postId} className="border-2 border-black rounded-xl overflow-hidden bg-white">
                    <div className="p-5">
                      {/* Header row */}
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-0.5 text-xs font-bold rounded bg-green-100 text-green-700">Pass đồ</span>
                        {post.price && (
                          <span className="px-2 py-0.5 text-xs font-bold rounded bg-amber-100 text-amber-700">{post.price}</span>
                        )}
                        <span className="text-xs text-zinc-400">{timeAgo(post.createdAt)}</span>
                      </div>

                      {/* Title + author */}
                      <h3 className="font-bold text-lg mb-1">{post.title}</h3>
                      <p className="text-sm text-zinc-500 mb-2">bởi {post.authorName}</p>

                      {/* Location */}
                      {post.location && (
                        <p className="text-sm text-zinc-500 flex items-center gap-1 mb-2">
                          <MapPin className="w-3.5 h-3.5" /> {post.location}
                        </p>
                      )}

                      {/* Preview */}
                      <p className="text-sm text-zinc-600 line-clamp-3 mb-3">{post.preview}</p>

                      {/* Images */}
                      {post.images && post.images.length > 0 && (
                        <div className="flex gap-3 mb-4 overflow-x-auto">
                          {post.images.map((img, i) => (
                            <a key={i} href={img} target="_blank" rel="noopener noreferrer">
                              <img src={img} alt="" className="w-24 h-24 rounded-lg border-2 border-zinc-200 object-cover flex-shrink-0 hover:opacity-80 transition-opacity" />
                            </a>
                          ))}
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex gap-2 pt-3 border-t border-zinc-200">
                        <Link
                          href={`/community/${postId}`}
                          target="_blank"
                          className="px-3 py-2 text-sm font-semibold border-2 border-black rounded-lg hover:bg-zinc-100 transition-colors flex items-center gap-1"
                        >
                          <Eye className="w-4 h-4" /> Xem
                        </Link>
                        <button
                          onClick={() => handleApprove(postId)}
                          disabled={isActioning}
                          className="px-3 py-2 text-sm font-semibold border-2 border-black rounded-lg bg-green-100 hover:bg-green-200 transition-colors flex items-center gap-1 disabled:opacity-50"
                        >
                          {isActioning ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                          Duyệt
                        </button>
                        <button
                          onClick={() => setRejectingId(isRejecting ? null : postId)}
                          disabled={isActioning}
                          className="px-3 py-2 text-sm font-semibold border-2 border-black rounded-lg hover:bg-red-100 transition-colors flex items-center gap-1 disabled:opacity-50"
                        >
                          <XCircle className="w-4 h-4" /> Từ chối
                        </button>
                      </div>

                      {/* Reject reason */}
                      {isRejecting && (
                        <div className="mt-3 flex gap-2">
                          <input
                            autoComplete="off"
                            type="text"
                            value={rejectReason}
                            onChange={(e) => setRejectReason(e.target.value)}
                            placeholder="Lý do từ chối..."
                            className="flex-1 px-3 py-2 text-sm border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
                          />
                          <button
                            onClick={() => handleReject(postId)}
                            disabled={!rejectReason.trim() || isActioning}
                            className="px-4 py-2 text-sm font-semibold border-2 border-black rounded-lg bg-red-100 hover:bg-red-200 transition-colors disabled:opacity-50"
                          >
                            Xác nhận
                          </button>
                          <button
                            onClick={() => handleDelete(postId)}
                            disabled={isActioning}
                            className="px-4 py-2 text-sm font-semibold border-2 border-black rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors disabled:opacity-50"
                          >
                            Xóa hẳn
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <ShareFooter />
    </div>
  );
}
