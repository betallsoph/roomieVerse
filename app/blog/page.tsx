'use client';

import { useState } from "react";
import Link from "next/link";
import MainHeader from "../components/MainHeader";
import ShareFooter from "../components/ShareFooter";
import { mockBlogPosts, BlogPost } from "../data/mockBlogPosts";

type CategoryFilter = "all" | "tips" | "story" | "guide" | "news";

const categoryLabels = {
  all: "Tất cả",
  tips: "Mẹo hay",
  story: "Câu chuyện",
  guide: "Hướng dẫn",
  news: "Tin tức"
};

const categoryColors = {
  tips: "bg-yellow-300",
  story: "bg-pink-300",
  guide: "bg-blue-300",
  news: "bg-green-300"
};

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("all");

  const filteredPosts = selectedCategory === "all"
    ? mockBlogPosts
    : mockBlogPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white">
      <MainHeader />

      {/* Hero Section */}
      <section className="bg-purple-50 py-16 sm:py-24 relative before:absolute before:bottom-0 before:left-0 before:right-0 before:h-20 before:bg-gradient-to-b before:from-transparent before:to-white before:pointer-events-none">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <h1 className="mb-4 text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl">
              Blog Community 📚
            </h1>
            <p className="max-w-2xl mx-auto text-base sm:text-lg text-zinc-700">
              Chia sẻ câu chuyện, kinh nghiệm và tips tìm phòng từ cộng đồng RoomieVerse
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            {(Object.keys(categoryLabels) as CategoryFilter[]).map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 text-sm font-bold rounded-lg border-2 border-black transition-all
                  ${selectedCategory === category
                    ? 'bg-purple-300 shadow-[var(--shadow-secondary)] translate-x-[2px] translate-y-[2px]'
                    : 'bg-white hover:bg-purple-100 shadow-[var(--shadow-secondary)] hover:translate-x-[2px] hover:translate-y-[2px]'
                  }`}
              >
                {categoryLabels[category]}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          {/* Stats */}
          <div className="mb-8 text-center">
            <p className="text-lg text-zinc-600">
              <span className="font-bold text-purple-600">{filteredPosts.length}</span> bài viết
            </p>
          </div>

          {/* Posts Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>

          {/* Empty State */}
          {filteredPosts.length === 0 && (
            <div className="card bg-white p-12 text-center">
              <h3 className="mb-4 text-2xl font-bold">Chưa có bài viết nào</h3>
              <p className="mb-6 text-base text-zinc-600">
                Hãy quay lại sau để đọc thêm nhiều bài viết thú vị!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-b from-white to-purple-50">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div className="card bg-purple-300 p-12">
            <h2 className="mb-4 text-3xl font-bold">
              Bạn có câu chuyện muốn chia sẻ? ✍️
            </h2>
            <p className="mb-8 text-lg text-zinc-700">
              Tham gia cộng đồng RoomieVerse và chia sẻ kinh nghiệm của bạn!
            </p>
            <Link
              href="/auth"
              className="btn-primary text-base px-8 py-4 inline-block"
            >
              Tham gia ngay
            </Link>
          </div>
        </div>
      </section>

      <ShareFooter />
    </div>
  );
}

function BlogCard({ post }: { post: BlogPost }) {
  const categoryColor = categoryColors[post.category];

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block rounded-xl border-2 border-black bg-white p-6 shadow-[var(--shadow-secondary)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
    >
      {/* Image Placeholder */}
      <div className={`mb-6 h-48 w-full overflow-hidden rounded-lg border-2 border-black ${categoryColor}`}>
        <div className="flex h-full w-full items-center justify-center text-6xl">
          {post.category === "tips" && "💡"}
          {post.category === "story" && "📖"}
          {post.category === "guide" && "🗺️"}
          {post.category === "news" && "📰"}
        </div>
      </div>

      {/* Category & Read Time */}
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className={`rounded-lg border-2 border-black ${categoryColor} px-3 py-1 text-xs font-bold`}>
          {categoryLabels[post.category]}
        </span>
        <span className="text-xs text-zinc-500">{post.readTime}</span>
      </div>

      {/* Title */}
      <h3 className="mb-3 text-lg font-bold leading-tight line-clamp-2 group-hover:text-purple-600 transition-colors">
        {post.title}
      </h3>

      {/* Excerpt */}
      <p className="mb-5 line-clamp-3 text-sm leading-relaxed text-zinc-700">
        {post.excerpt}
      </p>

      {/* Author & Date */}
      <div className="flex items-center justify-between border-t-2 border-gray-100 pt-4">
        <div>
          <p className="text-sm font-medium text-zinc-700">
            ✍️ {post.author}
          </p>
          <p className="text-xs text-zinc-500">{post.authorRole}</p>
        </div>
        <span className="text-xs text-zinc-500">{post.publishedDate}</span>
      </div>
    </Link>
  );
}
