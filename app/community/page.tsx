"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import MainHeader from "../components/MainHeader";
import ShareFooter from "../components/ShareFooter";
import { useAdminRedirect } from "../hooks/useAdminRedirect";
import { getCommunityPosts } from "../data/community";
import { CommunityPost, CommunityCategory } from "../data/types";
import {
  MessageSquare,
  Heart,
  Flame,
  Lightbulb,
  ShoppingBag,
  Star,
  BookOpen,
  Clock,
  ChevronRight,
  Eye,
  Loader2,
} from "lucide-react";

const categoryConfig: Record<CommunityCategory, { label: string; icon: typeof Lightbulb; color: string; bgColor: string }> = {
  tips: { label: "Mẹo hay", icon: Lightbulb, color: "text-yellow-700", bgColor: "bg-yellow-100" },
  drama: { label: "Drama", icon: Flame, color: "text-red-700", bgColor: "bg-red-100" },
  review: { label: "Review", icon: Star, color: "text-indigo-700", bgColor: "bg-indigo-100" },
  "pass-do": { label: "Pass đồ", icon: ShoppingBag, color: "text-green-700", bgColor: "bg-green-100" },
  blog: { label: "Blog", icon: BookOpen, color: "text-purple-700", bgColor: "bg-purple-100" },
};

const allCategories: CommunityCategory[] = ["tips", "drama", "review", "pass-do", "blog"];

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

export default function CommunityPage() {
  useAdminRedirect();
  const [activeCategory, setActiveCategory] = useState<CommunityCategory | "all">("all");
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch posts
  useEffect(() => {
    async function load() {
      setIsLoading(true);
      try {
        const category = activeCategory === "all" ? undefined : activeCategory;
        const data = await getCommunityPosts(category);
        setPosts(data);
      } catch (error) {
        console.error("Error loading posts:", error);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, [activeCategory]);

  const trendingPosts = [...posts].sort((a, b) => b.views - a.views).slice(0, 5);

  return (
    <div className="min-h-screen bg-white">
      <MainHeader />

      {/* Hero Section */}
      <section className="bg-orange-50 pt-8 sm:pt-12 md:pt-16 pb-6 sm:pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h1 className="mb-3 sm:mb-4 text-2xl font-extrabold leading-tight sm:text-5xl md:text-6xl">
            Cộng đồng
          </h1>
          <p className="max-w-2xl text-sm sm:text-lg text-zinc-700">
            Chia sẻ kinh nghiệm, kể chuyện drama, review nhà trọ và pass đồ cùng cộng đồng roommate
          </p>

          {/* Category Filter */}
          <div className="mt-5 sm:mt-8 flex flex-wrap gap-2 sm:gap-3">
            <button
              onClick={() => setActiveCategory("all")}
              className={`flex items-center gap-2 rounded-lg border-2 border-black px-4 py-2 text-sm font-bold transition-all ${
                activeCategory === "all"
                  ? "bg-orange-300 shadow-[2px_2px_0_0_#000]"
                  : "bg-white hover:bg-zinc-50"
              }`}
            >
              Tất cả
            </button>
            {allCategories.map((cat) => {
              const config = categoryConfig[cat];
              const Icon = config.icon;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex items-center gap-2 rounded-lg border-2 border-black px-4 py-2 text-sm font-bold transition-all ${
                    activeCategory === cat
                      ? "bg-orange-300 shadow-[2px_2px_0_0_#000]"
                      : "bg-white hover:bg-zinc-50"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {config.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Blur transition */}
      <div className="h-6 sm:h-8 bg-gradient-to-b from-orange-50 to-white" />

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pb-12 sm:pb-16">
        <div className="grid gap-8 sm:gap-10 lg:grid-cols-[1fr_380px]">

          {/* Left Column - Feed */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm font-medium text-zinc-500">
                {posts.length} bài viết
              </span>
              <Link
                href="/community/create"
                className="flex items-center gap-2 rounded-lg border-2 border-black bg-orange-300 px-5 py-2.5 text-sm font-bold shadow-[2px_2px_0_0_#000] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
              >
                Viết bài mới
              </Link>
            </div>

            {/* Loading */}
            {isLoading && (
              <div className="text-center py-16">
                <Loader2 className="w-8 h-8 text-zinc-400 mx-auto mb-3 animate-spin" />
                <p className="text-zinc-500">Đang tải...</p>
              </div>
            )}

            {/* Empty state */}
            {!isLoading && posts.length === 0 && (
              <div className="text-center py-16 border-2 border-dashed border-zinc-200 rounded-xl">
                <MessageSquare className="w-12 h-12 text-zinc-300 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-zinc-500 mb-1">Chưa có bài viết nào</h3>
                <p className="text-sm text-zinc-400 mb-4">Hãy là người đầu tiên chia sẻ!</p>
                <Link
                  href="/community/create"
                  className="inline-flex items-center gap-2 rounded-lg border-2 border-black bg-orange-300 px-5 py-2.5 text-sm font-bold shadow-[2px_2px_0_0_#000]"
                >
                  Viết bài mới
                </Link>
              </div>
            )}

            {/* Posts feed */}
            {!isLoading && posts.length > 0 && (
              <div className="divide-y divide-zinc-200">
                {posts.map((post) => {
                  const config = categoryConfig[post.category];
                  const Icon = config.icon;
                  return (
                    <Link key={post.id} href={`/community/${post.id}`}>
                      <article className="py-4 sm:py-6 first:pt-0 cursor-pointer group">
                        {/* Top line: category tag + time */}
                        <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 flex-wrap">
                          <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-bold ${config.bgColor} ${config.color}`}>
                            <Icon className="h-3 w-3" />
                            {config.label}
                          </span>
                          {post.hot && (
                            <span className="rounded-full bg-red-500 px-2 py-0.5 text-xs font-bold text-white">
                              HOT
                            </span>
                          )}
                          {post.price && (
                            <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-bold text-green-700">
                              {post.price}
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h3 className="mb-2 sm:mb-3 text-base sm:text-lg font-bold leading-snug group-hover:text-orange-600 transition-colors">
                          {post.title}
                        </h3>

                        {/* Thumbnail */}
                        {post.images && post.images.length > 0 && (
                          <div className="mb-2 sm:mb-3 flex gap-2 overflow-hidden">
                            {post.images.slice(0, 3).map((img, idx) => (
                              <img key={idx} src={img} alt="" className="w-20 h-20 rounded-lg border border-zinc-200 object-cover flex-shrink-0" />
                            ))}
                            {post.images.length > 3 && (
                              <div className="w-20 h-20 rounded-lg border border-zinc-200 bg-zinc-100 flex items-center justify-center flex-shrink-0 text-sm font-bold text-zinc-500">
                                +{post.images.length - 3}
                              </div>
                            )}
                          </div>
                        )}

                        {/* Footer: author + actions */}
                        <div className="flex items-center justify-between text-[11px] sm:text-xs text-zinc-400">
                          <div className="flex items-center gap-2 sm:gap-3">
                            <Link href={`/user/${post.authorId}`} onClick={(e) => e.stopPropagation()} className="font-medium text-zinc-600 hover:text-orange-600 transition-colors">{post.authorName}</Link>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" /> {timeAgo(post.createdAt)}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 sm:gap-4">
                            <span className="flex items-center gap-1">
                              <Heart className="h-3 w-3 sm:h-3.5 sm:w-3.5" /> {post.likes}
                            </span>
                            <span className="flex items-center gap-1">
                              <MessageSquare className="h-3 w-3 sm:h-3.5 sm:w-3.5" /> {post.comments}
                            </span>
                            <span className="flex items-center gap-1">
                              <Eye className="h-3 w-3 sm:h-3.5 sm:w-3.5" /> {post.views}
                            </span>
                          </div>
                        </div>
                      </article>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:sticky lg:top-24 space-y-6 sm:space-y-8 self-start bg-orange-50/70 rounded-2xl p-4 sm:p-6 lg:-mr-2">

            {/* Trending */}
            <div>
              <h3 className="font-bold text-sm text-orange-900 mb-4">Xu hướng</h3>
              {trendingPosts.length === 0 && !isLoading && (
                <p className="text-xs text-zinc-400">Chưa có bài viết nào</p>
              )}
              <div className="space-y-4">
                {trendingPosts.map((post, index) => {
                  const config = categoryConfig[post.category];
                  return (
                    <Link key={post.id} href={`/community/${post.id}`}>
                      <div className="flex gap-3 cursor-pointer group">
                        <span className="text-2xl font-extrabold text-zinc-200 leading-none w-6 text-right flex-shrink-0">
                          {index + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-sm line-clamp-2 group-hover:text-orange-600 transition-colors leading-snug">
                            {post.title}
                          </p>
                          <div className="flex items-center gap-2 mt-1 text-xs text-zinc-400">
                            <span className={`${config.color}`}>{config.label}</span>
                            <span>·</span>
                            <span>{post.views} lượt xem</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-zinc-200" />

            {/* Category quick links */}
            <div>
              <h3 className="font-bold text-sm text-zinc-500 uppercase tracking-wide mb-3">Chuyên mục</h3>
              <div className="flex flex-wrap gap-2">
                {allCategories.map((cat) => {
                  const config = categoryConfig[cat];
                  const Icon = config.icon;
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`inline-flex items-center gap-1.5 rounded-full border border-zinc-200 px-3 py-1.5 text-xs font-medium transition-colors ${
                        activeCategory === cat
                          ? `${config.bgColor} ${config.color} border-transparent`
                          : "bg-white text-zinc-600 hover:bg-zinc-50"
                      }`}
                    >
                      <Icon className="h-3 w-3" />
                      {config.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-zinc-200" />

            {/* CTA */}
            <div className="text-center">
              <p className="font-bold text-sm mb-1">Chưa tìm được phòng?</p>
              <p className="text-xs text-zinc-500 mb-3">Xem các bài đăng tìm bạn ở cùng</p>
              <Link
                href="/roommate"
                className="inline-flex items-center gap-1 text-sm font-bold text-orange-600 hover:underline"
              >
                Tìm Roommate <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="border-t border-zinc-200" />

            {/* Ad Placeholder */}
            <div className="p-4 rounded-lg border border-dashed border-zinc-200 bg-zinc-50/50 text-center">
              <p className="text-xs text-zinc-300 mb-2">Quảng cáo</p>
              <div className="h-[250px] flex items-center justify-center text-zinc-200 text-sm">
                Google Ads
              </div>
            </div>
          </div>
        </div>
      </div>

      <ShareFooter />
    </div>
  );
}
