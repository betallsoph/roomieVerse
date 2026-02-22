"use client";

import { useState, useEffect } from "react";
import MainHeader from "../../components/MainHeader";
import ShareFooter from "../../components/ShareFooter";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../contexts/AuthContext";
import { getAdminBlogPosts, deleteCommunityPost, approveCommunityPost } from "../../data/community";
import { CommunityPost } from "../../data/types";
import { ArrowLeft, Trash2, Eye, Loader2, CheckCircle } from "lucide-react";

export default function BlogManagementPage() {
  const { user, isTester, isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && (!isAuthenticated || !isTester)) {
      router.push("/");
    }
  }, [authLoading, isAuthenticated, isTester, router]);

  useEffect(() => {
    async function fetchPosts() {
      if (!isTester) return;
      try {
        const data = await getAdminBlogPosts();
        setPosts(data);
      } catch (err) {
        console.error("Error fetching blog posts:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, [isTester]);

  const published = posts.filter(p => p.status === "active");
  const drafts = posts.filter(p => p.status !== "active" && p.status !== "deleted");

  const handleDelete = async (postId: string) => {
    if (!confirm("Xóa bài viết này?")) return;
    setActionLoading(postId);
    try {
      await deleteCommunityPost(postId);
      setPosts(prev => prev.filter(p => p.id !== postId));
    } catch (err) {
      console.error("Error deleting post:", err);
      alert("Xóa thất bại.");
    } finally {
      setActionLoading(null);
    }
  };

  const handlePublish = async (postId: string) => {
    if (!user) return;
    setActionLoading(postId);
    try {
      await approveCommunityPost(postId, user.uid);
      setPosts(prev => prev.map(p => p.id === postId ? { ...p, status: "active" } : p));
    } catch (err) {
      console.error("Error publishing post:", err);
      alert("Xuất bản thất bại.");
    } finally {
      setActionLoading(null);
    }
  };

  function PostRow({ post, list, idx }: { post: CommunityPost; list: CommunityPost[]; idx: number }) {
    const postId = post.id!;
    const isActioning = actionLoading === postId;
    return (
      <div className={`flex flex-col md:flex-row md:items-center justify-between gap-3 p-4 ${idx !== list.length - 1 ? 'border-b border-zinc-200' : ''} hover:bg-blue-50/50 transition-colors`}>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold truncate">{post.title}</h3>
          <div className="flex items-center gap-3 text-sm text-zinc-500 mt-0.5">
            <span>{post.authorName}</span>
            <span>·</span>
            <span>{post.createdAt?.slice(0, 10)}</span>
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" />
              {post.views.toLocaleString()}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Status badge */}
          <span className={`px-2 py-0.5 text-xs font-bold rounded border border-black ${
            post.status === "active" ? "bg-blue-100" :
            post.status === "pending" ? "bg-amber-100" : "bg-zinc-100"
          }`}>
            {post.status === "active" ? "Xuất bản" :
             post.status === "pending" ? "Chờ duyệt" : "Ẩn"}
          </span>

          {/* Publish button for non-active posts */}
          {post.status !== "active" && (
            <button
              onClick={() => handlePublish(postId)}
              disabled={isActioning}
              className="px-3 py-1.5 text-xs font-semibold border-2 border-black rounded-lg bg-green-100 hover:bg-green-200 transition-colors flex items-center gap-1 disabled:opacity-50"
            >
              {isActioning ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle className="w-3.5 h-3.5" />}
              Xuất bản
            </button>
          )}

          {/* View */}
          <Link
            href={`/community/${postId}`}
            target="_blank"
            className="px-3 py-1.5 text-xs font-semibold border-2 border-black rounded-lg hover:bg-zinc-100 transition-colors flex items-center gap-1"
          >
            <Eye className="w-3.5 h-3.5" /> Xem
          </Link>

          {/* Delete */}
          <button
            onClick={() => handleDelete(postId)}
            disabled={isActioning}
            className="px-3 py-1.5 text-xs font-semibold border-2 border-black rounded-lg hover:bg-red-100 transition-colors flex items-center gap-1 disabled:opacity-50"
          >
            {isActioning ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
            Xóa
          </button>
        </div>
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
            <div className="flex items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-black">Quản Lý Blog</h1>
                <p className="text-zinc-500 mt-1">
                  {loading ? "..." : `${published.length} bài xuất bản`}
                  {!loading && drafts.length > 0 && ` · ${drafts.length} chờ duyệt`}
                </p>
              </div>
              <Link href="/community/create?category=blog" className="btn-primary flex-shrink-0">
                Tạo bài viết
              </Link>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-zinc-400" />
            </div>
          ) : posts.length === 0 ? (
            <p className="text-zinc-500 py-8 text-center">Chưa có bài viết blog nào.</p>
          ) : (
            <>
              {/* Published */}
              {published.length > 0 && (
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-lg font-bold">Đã Xuất Bản</h2>
                    <span className="text-sm text-zinc-400">{published.length} bài</span>
                  </div>
                  <div className="border-2 border-black rounded-xl overflow-hidden bg-white">
                    {published.map((post, idx) => (
                      <PostRow key={post.id} post={post} list={published} idx={idx} />
                    ))}
                  </div>
                </div>
              )}

              {/* Drafts / Pending */}
              {drafts.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-lg font-bold">Chờ Duyệt</h2>
                    <span className="text-sm text-zinc-400">{drafts.length} bài</span>
                  </div>
                  <div className="border-2 border-black rounded-xl overflow-hidden bg-white">
                    {drafts.map((post, idx) => (
                      <PostRow key={post.id} post={post} list={drafts} idx={idx} />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <ShareFooter />
    </div>
  );
}
