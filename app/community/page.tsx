"use client";

import { useState } from "react";
import Link from "next/link";
import MainHeader from "../components/MainHeader";
import ShareFooter from "../components/ShareFooter";
import { useAdminRedirect } from "../hooks/useAdminRedirect";
import {
  MessageSquare,
  Heart,
  Flame,
  Lightbulb,
  ShoppingBag,
  Star,
  BookOpen,
  MapPin,
  Clock,
  ChevronRight,
  Eye,
  TrendingUp,
  Share2,
} from "lucide-react";

// Types
type PostCategory = "tips" | "drama" | "review" | "pass-do" | "blog";

interface CommunityPost {
  id: string;
  author: string;
  date: string;
  category: PostCategory;
  title: string;
  preview: string;
  likes: number;
  comments: number;
  views: number;
  hot?: boolean;
  location?: string;
  rating?: number;
  price?: string;
}

// Mock data
const mockPosts: CommunityPost[] = [
  {
    id: "1",
    author: "Minh Nguyễn",
    date: "2 giờ trước",
    category: "tips",
    title: "10 tips tiết kiệm tiền khi ở ghép mà ai cũng nên biết",
    preview: "Mình đã ở ghép 3 năm và đúc kết được những mẹo sau để giảm chi phí sinh hoạt mà vẫn sống thoải mái...",
    likes: 234,
    comments: 45,
    views: 1200,
  },
  {
    id: "2",
    author: "Thu Trần",
    date: "5 giờ trước",
    category: "drama",
    title: "Roommate của mình đem bạn trai về ngủ mỗi đêm 😭",
    preview: "Mình thuê chung phòng với 1 bạn nữ, ban đầu mọi thứ rất ổn. Nhưng từ tháng thứ 2, bạn ấy bắt đầu đưa bạn trai về...",
    likes: 456,
    comments: 156,
    views: 3400,
    hot: true,
  },
  {
    id: "3",
    author: "An Phạm",
    date: "1 ngày trước",
    category: "review",
    title: "Review chung cư Vinhomes Grand Park sau 1 năm ở",
    preview: "Mình đã ở VGP được hơn 1 năm, chia sẻ trải nghiệm thật từ tiện ích, an ninh, đến chất lượng sống...",
    likes: 189,
    comments: 67,
    views: 2100,
    location: "Quận 9, TP.HCM",
    rating: 4,
  },
  {
    id: "4",
    author: "Khoa Lê",
    date: "1 ngày trước",
    category: "pass-do",
    title: "Pass tủ lạnh mini còn mới 90%, chuyển phòng nên bán gấp",
    preview: "Tủ lạnh Aqua 90L, mua được 6 tháng, dùng rất ít vì đi công tác nhiều. Giá mua 3tr5, giờ pass 2tr.",
    likes: 45,
    comments: 12,
    views: 890,
    price: "2.000.000đ",
    location: "Bình Thạnh, TP.HCM",
  },
  {
    id: "5",
    author: "Hà Linh",
    date: "2 ngày trước",
    category: "tips",
    title: "Cách sắp xếp đồ trong phòng nhỏ dưới 15m² siêu gọn gàng",
    preview: "Phòng trọ nhỏ không phải vấn đề nếu bạn biết cách tận dụng không gian. Chia sẻ 7 mẹo mình đang dùng...",
    likes: 189,
    comments: 32,
    views: 1500,
  },
  {
    id: "6",
    author: "Đức Anh",
    date: "2 ngày trước",
    category: "drama",
    title: "Drama: Người yêu cũ của mình đang hẹn hò với roommate 💀",
    preview: "Câu chuyện bắt đầu khi mình chia tay được 2 tháng. Một hôm đi làm về sớm, mình thấy roommate đang video call với...",
    likes: 678,
    comments: 234,
    views: 5600,
    hot: true,
  },
  {
    id: "7",
    author: "Mai Anh",
    date: "3 ngày trước",
    category: "review",
    title: "Review khu trọ Ngõ 68 Triều Khúc - Sinh viên cần biết",
    preview: "Khu trọ này khá nổi tiếng với sinh viên vì giá rẻ. Nhưng liệu rẻ có xứng đáng? Mình ở đây 2 năm...",
    likes: 156,
    comments: 89,
    views: 1800,
    location: "Thanh Xuân, Hà Nội",
    rating: 3,
  },
  {
    id: "8",
    author: "Tuấn Kiệt",
    date: "3 ngày trước",
    category: "blog",
    title: "Tâm lý học ở ghép: Vì sao bạn luôn ghét roommate?",
    preview: "Nghiên cứu tâm lý cho thấy, dù roommate có hoàn hảo đến mấy, sau 3 tháng bạn vẫn sẽ tìm ra điều gì đó để khó chịu...",
    likes: 312,
    comments: 78,
    views: 2400,
  },
  {
    id: "9",
    author: "Phương Vy",
    date: "4 ngày trước",
    category: "pass-do",
    title: "Pass nệm Zinus 1m6 và kệ sách gỗ, giá rẻ bất ngờ",
    preview: "Chuyển nhà nên pass lại. Nệm Zinus foam 1m6 mua 5tr, pass 2tr5. Kệ sách gỗ 4 tầng mua 1tr2, pass 500k.",
    likes: 67,
    comments: 23,
    views: 750,
    price: "500.000đ - 2.500.000đ",
    location: "Quận 7, TP.HCM",
  },
];

const categoryConfig: Record<PostCategory, { label: string; icon: typeof Lightbulb; color: string; bgColor: string }> = {
  tips: { label: "Mẹo hay", icon: Lightbulb, color: "text-yellow-700", bgColor: "bg-yellow-100" },
  drama: { label: "Drama", icon: Flame, color: "text-red-700", bgColor: "bg-red-100" },
  review: { label: "Review", icon: Star, color: "text-indigo-700", bgColor: "bg-indigo-100" },
  "pass-do": { label: "Pass đồ", icon: ShoppingBag, color: "text-green-700", bgColor: "bg-green-100" },
  blog: { label: "Blog", icon: BookOpen, color: "text-purple-700", bgColor: "bg-purple-100" },
};

const allCategories: PostCategory[] = ["tips", "drama", "review", "pass-do", "blog"];

export default function CommunityPage() {
  useAdminRedirect();
  const [activeCategory, setActiveCategory] = useState<PostCategory | "all">("all");

  const filteredPosts = activeCategory === "all"
    ? mockPosts
    : mockPosts.filter((p) => p.category === activeCategory);

  const trendingPosts = [...mockPosts].sort((a, b) => b.views - a.views).slice(0, 5);

  return (
    <div className="min-h-screen bg-white">
      <MainHeader />

      {/* Hero Section */}
      <section className="bg-blue-50 pt-12 sm:pt-16 pb-8">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="mb-4 text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl">
            Cộng đồng
          </h1>
          <p className="max-w-2xl text-base sm:text-lg text-zinc-700">
            Chia sẻ kinh nghiệm, kể chuyện drama, review nhà trọ và pass đồ cùng cộng đồng roommate
          </p>

          {/* Category Filter */}
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => setActiveCategory("all")}
              className={`flex items-center gap-2 rounded-lg border-2 border-black px-4 py-2 text-sm font-bold transition-all ${
                activeCategory === "all"
                  ? "bg-blue-300 shadow-[2px_2px_0_0_#000]"
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
                      ? "bg-blue-300 shadow-[2px_2px_0_0_#000]"
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
      <div className="h-8 bg-gradient-to-b from-blue-50 to-white" />

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-6 pb-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_380px]">

          {/* Left Column - Feed (no cards, divider-based) */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm font-medium text-zinc-500">
                {filteredPosts.length} bài viết
              </span>
              <button className="flex items-center gap-2 rounded-lg border-2 border-black bg-blue-300 px-5 py-2.5 text-sm font-bold shadow-[2px_2px_0_0_#000] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none">
                Viết bài mới
              </button>
            </div>

            {/* Posts as feed items separated by dividers */}
            <div className="divide-y divide-zinc-200">
              {filteredPosts.map((post) => {
                const config = categoryConfig[post.category];
                const Icon = config.icon;
                return (
                  <article
                    key={post.id}
                    className="py-6 first:pt-0 cursor-pointer group"
                  >
                    {/* Top line: category tag + time */}
                    <div className="flex items-center gap-3 mb-3">
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
                    <h3 className="mb-3 text-lg font-bold leading-snug group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h3>

                    {/* Footer: author + actions */}
                    <div className="flex items-center justify-between text-xs text-zinc-400">
                      <div className="flex items-center gap-3">
                        <span className="font-medium text-zinc-600">{post.author}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {post.date}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1 hover:text-red-500 transition-colors cursor-pointer">
                          <Heart className="h-3.5 w-3.5" /> {post.likes}
                        </span>
                        <span className="flex items-center gap-1 hover:text-blue-500 transition-colors cursor-pointer">
                          <MessageSquare className="h-3.5 w-3.5" /> {post.comments}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-3.5 w-3.5" /> {post.views}
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:sticky lg:top-24 space-y-8 self-start bg-blue-50/70 rounded-2xl p-6 -mr-2">

            {/* Trending - simple list */}
            <div>
              <h3 className="font-bold text-sm text-blue-900 mb-4">
                Xu hướng
              </h3>
              <div className="space-y-4">
                {trendingPosts.map((post, index) => {
                  const config = categoryConfig[post.category];
                  return (
                    <div key={post.id} className="flex gap-3 cursor-pointer group">
                      <span className="text-2xl font-extrabold text-zinc-200 leading-none w-6 text-right flex-shrink-0">
                        {index + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-sm line-clamp-2 group-hover:text-blue-600 transition-colors leading-snug">
                          {post.title}
                        </p>
                        <div className="flex items-center gap-2 mt-1 text-xs text-zinc-400">
                          <span className={`${config.color}`}>{config.label}</span>
                          <span>·</span>
                          <span>{post.views} lượt xem</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-zinc-200" />

            {/* Category quick links - inline pills */}
            <div>
              <h3 className="font-bold text-sm text-zinc-500 uppercase tracking-wide mb-3">
                Chuyên mục
              </h3>
              <div className="flex flex-wrap gap-2">
                {allCategories.map((cat) => {
                  const config = categoryConfig[cat];
                  const Icon = config.icon;
                  const count = mockPosts.filter((p) => p.category === cat).length;
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
                      <span className="text-zinc-400 ml-0.5">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-zinc-200" />

            {/* CTA - minimal */}
            <div className="text-center">
              <p className="font-bold text-sm mb-1">Chưa tìm được phòng?</p>
              <p className="text-xs text-zinc-500 mb-3">Xem các bài đăng tìm bạn ở cùng</p>
              <Link
                href="/roommate"
                className="inline-flex items-center gap-1 text-sm font-bold text-blue-600 hover:underline"
              >
                Tìm Roommate <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Divider */}
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
