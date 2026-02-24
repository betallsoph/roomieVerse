"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import MainHeader from "../../components/MainHeader";
import ShareFooter from "../../components/ShareFooter";
import { useAuth } from "../../contexts/AuthContext";
import {
  getCommunityPostById,
  getCommentsByPostId,
  createComment,
  togglePostLike,
  isPostLiked,
  incrementPostViewCount,
  deleteCommunityPost,
  hardDeleteCommunityPost,
  deleteComment,
} from "../../data/community";
import { CommunityPost, CommunityComment, CommunityCategory } from "../../data/types";
import {
  ArrowLeft,
  Heart,
  MessageSquare,
  Eye,
  Clock,
  MapPin,
  Star,
  Share2,
  Loader2,
  Send,
  Lightbulb,
  Flame,
  ShoppingBag,
  BookOpen,
  Trash2,
} from "lucide-react";

const categoryConfig: Record<CommunityCategory, { label: string; icon: typeof Lightbulb; color: string; bgColor: string }> = {
  tips: { label: "Mẹo hay", icon: Lightbulb, color: "text-yellow-700", bgColor: "bg-yellow-100" },
  drama: { label: "Drama", icon: Flame, color: "text-red-700", bgColor: "bg-red-100" },
  review: { label: "Review", icon: Star, color: "text-indigo-700", bgColor: "bg-indigo-100" },
  "pass-do": { label: "Pass đồ", icon: ShoppingBag, color: "text-green-700", bgColor: "bg-green-100" },
  blog: { label: "Blog", icon: BookOpen, color: "text-purple-700", bgColor: "bg-purple-100" },
};

function timeAgo(dateStr?: string): string {
  if (!dateStr) return "";
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins} phút trước`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} giờ trước`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} ngày trước`;
  return new Date(dateStr).toLocaleDateString("vi-VN");
}

interface Props {
  initialPost?: CommunityPost | null;
}

export default function CommunityPostDetailPage({ initialPost }: Props) {
  const params = useParams();
  const postId = params.id as string;
  const { user, isAuthenticated, isMod, isAdmin } = useAuth();
  const router = useRouter();

  const [post, setPost] = useState<CommunityPost | null>(initialPost ?? null);
  const [comments, setComments] = useState<CommunityComment[]>([]);
  const [isLoading, setIsLoading] = useState(!initialPost);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialPost?.likes || 0);
  const [commentText, setCommentText] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  // Fetch post + comments
  useEffect(() => {
    async function load() {
      try {
        const [postData, commentsData] = await Promise.all([
          getCommunityPostById(postId),
          getCommentsByPostId(postId),
        ]);
        setPost(postData);
        setComments(commentsData);
        if (postData) {
          setLikeCount(postData.likes);
          incrementPostViewCount(postId).catch(() => {});
        }
      } catch (err) {
        console.error("Failed to load post:", err);
        setPost(null);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, [postId]);

  // Check if liked
  useEffect(() => {
    if (!user?.uid) return;
    isPostLiked(postId, user.uid).then(setLiked).catch(() => {});
  }, [postId, user?.uid]);

  const handleLike = async () => {
    if (!user?.uid) return;
    const newLiked = await togglePostLike(postId, user.uid);
    setLiked(newLiked);
    setLikeCount((prev) => prev + (newLiked ? 1 : -1));
  };

  const handleComment = async () => {
    if (!user || !commentText.trim() || isSubmittingComment) return;
    const content = commentText.trim();
    setIsSubmittingComment(true);
    try {
      const commentId = await createComment({
        postId,
        authorId: user.uid,
        authorName: user.displayName || "Ẩn danh",
        authorPhoto: user.photoURL || undefined,
        content,
      });
      // Only update local state after Firebase confirms
      setComments((prev) => [
        ...prev,
        {
          id: commentId,
          postId,
          authorId: user.uid,
          authorName: user.displayName || "Ẩn danh",
          authorPhoto: user.photoURL || undefined,
          content,
          likes: 0,
          status: "active",
          createdAt: new Date().toISOString(),
        },
      ]);
      setCommentText("");
      if (post) setPost({ ...post, comments: post.comments + 1 });
    } catch (error) {
      console.error("Error posting comment:", error);
      alert("Không thể đăng bình luận. Vui lòng thử lại.");
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const isPostAuthor = !!(user?.uid && post?.authorId && user.uid === post.authorId);
  const canManagePost = isPostAuthor || isMod;

  const handleDeletePost = async () => {
    if (!confirm("Bạn có chắc muốn xóa bài viết này?")) return;
    await deleteCommunityPost(postId);
    router.push("/community");
  };

  const handleHardDeletePost = async () => {
    if (!confirm("Xóa vĩnh viễn bài viết này? Hành động không thể hoàn tác.")) return;
    await hardDeleteCommunityPost(postId);
    router.push("/community");
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!confirm("Xóa bình luận này?")) return;
    await deleteComment(commentId, postId);
    setComments(prev => prev.filter(c => c.id !== commentId));
    if (post) setPost({ ...post, comments: post.comments - 1 });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <MainHeader />
        <div className="flex min-h-[60vh] items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-zinc-400" />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white">
        <MainHeader />
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
          <h2 className="text-2xl font-bold">Bài viết không tồn tại</h2>
          <Link href="/community" className="text-orange-600 hover:underline font-bold">
            Quay lại Cộng đồng
          </Link>
        </div>
        <ShareFooter />
      </div>
    );
  }

  const config = categoryConfig[post.category];
  const CatIcon = config.icon;

  return (
    <div className="min-h-screen bg-white">
      <MainHeader />

      <section className="py-12 md:py-16">
        <div className="wrapper max-w-3xl">
          {/* Back link */}
          <Link
            href="/community"
            className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-500 hover:text-black transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Quay lại Cộng đồng
          </Link>

          {/* Post header */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${config.bgColor} ${config.color}`}>
                <CatIcon className="h-3.5 w-3.5" />
                {config.label}
              </span>
              {post.hot && (
                <span className="rounded-full bg-red-500 px-2.5 py-1 text-xs font-bold text-white">HOT</span>
              )}
              {post.price && (
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">{post.price}</span>
              )}
            </div>

            <h1 className="text-2xl md:text-3xl font-black leading-tight mb-4">{post.title}</h1>

            <div className="flex items-center gap-4 text-sm text-zinc-500">
              <Link href={`/user/${post.authorId}`} className="font-medium text-zinc-700 hover:text-orange-600 transition-colors">{post.authorName}</Link>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {timeAgo(post.createdAt)}
              </span>
              {post.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {post.location}
                </span>
              )}
            </div>

            {/* Rating */}
            {post.rating && post.rating > 0 && (
              <div className="flex items-center gap-1 mt-3">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`w-5 h-5 ${s <= post.rating! ? "text-yellow-500 fill-yellow-500" : "text-zinc-200"}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Post content */}
          <div className="prose prose-zinc max-w-none mb-8 text-base leading-relaxed whitespace-pre-wrap border-t border-zinc-100 pt-6">
            {post.content}
          </div>

          {/* Images */}
          {post.images && post.images.length > 0 && (
            <div className={`mb-8 ${post.images.length === 1 ? '' : 'grid grid-cols-2 gap-3'}`}>
              {post.images.map((img, idx) => (
                <a key={idx} href={img} target="_blank" rel="noopener noreferrer">
                  <img
                    src={img}
                    alt={`Ảnh ${idx + 1}`}
                    className="w-full rounded-lg border-2 border-black object-cover cursor-pointer hover:opacity-90 transition-opacity"
                    style={{ maxHeight: post.images!.length === 1 ? '500px' : '250px' }}
                  />
                </a>
              ))}
            </div>
          )}

          {/* Actions bar */}
          <div className="flex items-center gap-6 border-y border-zinc-100 py-4 mb-8">
            <button
              onClick={handleLike}
              disabled={!isAuthenticated}
              className={`flex items-center gap-2 text-sm font-bold transition-colors ${
                liked ? "text-red-500" : "text-zinc-500 hover:text-red-500"
              } disabled:opacity-50`}
            >
              <Heart className={`h-5 w-5 ${liked ? "fill-current" : ""}`} />
              {likeCount}
            </button>
            <span className="flex items-center gap-2 text-sm text-zinc-500">
              <MessageSquare className="h-5 w-5" />
              {comments.length}
            </span>
            <span className="flex items-center gap-2 text-sm text-zinc-500">
              <Eye className="h-5 w-5" />
              {post.views}
            </span>
            <button
              onClick={() => navigator.clipboard.writeText(window.location.href)}
              className="flex items-center gap-2 text-sm text-zinc-500 hover:text-orange-500 transition-colors ml-auto"
            >
              <Share2 className="h-5 w-5" />
              Chia sẻ
            </button>
            {canManagePost && (
              <>
                <button
                  onClick={handleDeletePost}
                  className="flex items-center gap-2 text-sm font-bold text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 className="h-5 w-5" />
                  Xóa
                </button>
                {isAdmin && (
                  <button
                    onClick={handleHardDeletePost}
                    className="flex items-center gap-2 text-sm font-bold text-red-600 hover:text-red-800 transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                    Xóa vĩnh viễn
                  </button>
                )}
              </>
            )}
          </div>

          {/* Comments section */}
          <div>
            <h2 className="text-lg font-black mb-6">Bình luận ({comments.length})</h2>

            {/* Comment input */}
            {isAuthenticated ? (
              <div className="flex gap-3 mb-8">
                <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 text-xs font-bold text-orange-700">
                  {user?.displayName?.charAt(0) || "?"}
                </div>
                <div className="flex-1 flex gap-2">
                  <input
                    autoComplete="off" type="text"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleComment()}
                    placeholder="Viết bình luận..."
                    className="flex-1 px-4 py-2.5 border-2 border-zinc-200 rounded-xl text-sm focus:outline-none focus:border-black focus:ring-2 focus:ring-orange-300"
                  />
                  <button
                    onClick={handleComment}
                    disabled={!commentText.trim() || isSubmittingComment}
                    className="px-4 py-2.5 border-2 border-black rounded-xl bg-orange-300 font-bold text-sm disabled:opacity-50 transition-all hover:shadow-[2px_2px_0_0_#000] active:scale-95"
                  >
                    {isSubmittingComment ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            ) : (
              <div className="mb-8 p-4 border-2 border-dashed border-zinc-200 rounded-xl text-center text-sm text-zinc-500">
                <Link href="/auth?returnUrl=/community" className="text-orange-600 font-bold hover:underline">
                  Đăng nhập
                </Link>{" "}
                để bình luận
              </div>
            )}

            {/* Comments list */}
            {comments.length === 0 ? (
              <p className="text-sm text-zinc-400 text-center py-8">Chưa có bình luận nào. Hãy là người đầu tiên!</p>
            ) : (
              <div className="space-y-6">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3">
                    <Link href={`/user/${comment.authorId}`} className="w-9 h-9 rounded-full bg-zinc-100 flex items-center justify-center flex-shrink-0 text-xs font-bold text-zinc-600 hover:bg-orange-100 transition-colors">
                      {comment.authorName.charAt(0)}
                    </Link>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Link href={`/user/${comment.authorId}`} className="text-sm font-bold hover:text-orange-600 transition-colors">{comment.authorName}</Link>
                        <span className="text-xs text-zinc-400">{timeAgo(comment.createdAt)}</span>
                        {(user?.uid === comment.authorId || isMod) && (
                          <button
                            onClick={() => handleDeleteComment(comment.id!)}
                            className="text-zinc-300 hover:text-red-500 transition-colors ml-auto"
                            title="Xóa bình luận"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                      <p className="text-sm text-zinc-700 leading-relaxed">{comment.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <ShareFooter />
    </div>
  );
}
