'use client';

import { use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import MainHeader from "../../components/MainHeader";
import ShareFooter from "../../components/ShareFooter";
import { mockBlogPosts } from "../../data/mockBlogPosts";

const categoryColors = {
  tips: "bg-yellow-300",
  story: "bg-pink-300",
  guide: "bg-blue-300",
  news: "bg-green-300"
};

const categoryLabels = {
  tips: "Mẹo hay",
  story: "Câu chuyện",
  guide: "Hướng dẫn",
  news: "Tin tức"
};

export default function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();

  const post = mockBlogPosts.find(p => p.slug === resolvedParams.slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-white">
        <MainHeader />
        <section className="py-24">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h1 className="mb-4 text-4xl font-bold">Không tìm thấy bài viết</h1>
            <p className="mb-8 text-lg text-zinc-600">
              Bài viết này không tồn tại hoặc đã bị xóa.
            </p>
            <Link href="/blog" className="btn-primary text-base px-8 py-4">
              Quay lại Blog
            </Link>
          </div>
        </section>
        <ShareFooter />
      </div>
    );
  }

  const categoryColor = categoryColors[post.category];
  const relatedPosts = mockBlogPosts
    .filter(p => p.id !== post.id && p.category === post.category)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      <MainHeader />

      {/* Article Header */}
      <article className="py-16">
        <div className="mx-auto max-w-4xl px-6">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="mb-8 btn-secondary text-sm px-4 py-2"
          >
            ← Quay lại
          </button>

          {/* Category Badge */}
          <div className="mb-6">
            <span className={`inline-block rounded-lg border-2 border-black ${categoryColor} px-4 py-2 text-sm font-bold`}>
              {categoryLabels[post.category]}
            </span>
          </div>

          {/* Title */}
          <h1 className="mb-6 text-4xl sm:text-5xl font-extrabold leading-tight">
            {post.title}
          </h1>

          {/* Meta Info */}
          <div className="mb-8 flex flex-wrap items-center gap-4 text-sm text-zinc-600">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-black bg-purple-300 text-lg font-bold">
                {post.author.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-zinc-900">{post.author}</p>
                <p className="text-xs text-zinc-500">{post.authorRole}</p>
              </div>
            </div>
            <span>•</span>
            <span>{post.publishedDate}</span>
            <span>•</span>
            <span>⏱️ {post.readTime}</span>
          </div>

          {/* Featured Image */}
          <div className={`mb-12 h-96 w-full overflow-hidden rounded-xl border-4 border-black ${categoryColor}`}>
            <div className="flex h-full w-full items-center justify-center text-9xl">
              {post.category === "tips" && "💡"}
              {post.category === "story" && "📖"}
              {post.category === "guide" && "🗺️"}
              {post.category === "news" && "📰"}
            </div>
          </div>

          {/* Excerpt */}
          <div className="mb-8 card bg-purple-50 p-6">
            <p className="text-lg font-medium text-zinc-800 leading-relaxed">
              {post.excerpt}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <div
              className="blog-content leading-relaxed text-zinc-800"
              dangerouslySetInnerHTML={{
                __html: post.content
                  .split('\n')
                  .map(line => {
                    // Headers
                    if (line.startsWith('# ')) {
                      return `<h1 class="text-3xl font-bold mb-4 mt-8">${line.slice(2)}</h1>`;
                    }
                    if (line.startsWith('## ')) {
                      return `<h2 class="text-2xl font-bold mb-3 mt-6">${line.slice(3)}</h2>`;
                    }
                    if (line.startsWith('### ')) {
                      return `<h3 class="text-xl font-bold mb-2 mt-4">${line.slice(4)}</h3>`;
                    }
                    // Bold
                    if (line.startsWith('**') && line.endsWith('**')) {
                      return `<p class="font-bold mb-3">${line.slice(2, -2)}</p>`;
                    }
                    // Lists
                    if (line.startsWith('- ')) {
                      return `<li class="ml-6 mb-2">${line.slice(2)}</li>`;
                    }
                    // Checkbox
                    if (line.startsWith('□ ')) {
                      return `<li class="ml-6 mb-2">☐ ${line.slice(2)}</li>`;
                    }
                    // Emojis at start (headings)
                    if (line.match(/^[❌✅⭐]/)) {
                      return `<p class="font-bold text-lg mb-2">${line}</p>`;
                    }
                    // Horizontal rule
                    if (line.trim() === '---') {
                      return `<hr class="my-8 border-t-2 border-black" />`;
                    }
                    // Empty line
                    if (line.trim() === '') {
                      return '<br />';
                    }
                    // Regular paragraph
                    return `<p class="mb-4">${line}</p>`;
                  })
                  .join('')
              }}
            />
          </div>

          {/* Tags */}
          <div className="mt-12 pt-8 border-t-2 border-gray-200">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border-2 border-black bg-gray-100 px-3 py-1 text-sm font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Share & Actions */}
          <div className="mt-8 card bg-purple-50 p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold mb-2">Bài viết hữu ích?</p>
                <div className="flex gap-3">
                  <button className="btn-primary text-sm px-4 py-2">
                    👍 Hay
                  </button>
                  <button className="btn-secondary text-sm px-4 py-2">
                    📤 Chia sẻ
                  </button>
                </div>
              </div>
              <Link href="/blog" className="btn-secondary text-sm px-6 py-2">
                Đọc thêm bài khác
              </Link>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-purple-50">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="mb-8 text-3xl font-bold text-center">
              Bài viết liên quan
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.slug}`}
                  className="group block rounded-xl border-2 border-black bg-white p-6 shadow-[var(--shadow-secondary)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
                >
                  <div className={`mb-4 h-32 w-full overflow-hidden rounded-lg border-2 border-black ${categoryColors[relatedPost.category]}`}>
                    <div className="flex h-full w-full items-center justify-center text-4xl">
                      {relatedPost.category === "tips" && "💡"}
                      {relatedPost.category === "story" && "📖"}
                      {relatedPost.category === "guide" && "🗺️"}
                      {relatedPost.category === "news" && "📰"}
                    </div>
                  </div>
                  <h3 className="mb-2 text-lg font-bold leading-tight line-clamp-2 group-hover:text-purple-600 transition-colors">
                    {relatedPost.title}
                  </h3>
                  <p className="text-sm text-zinc-600 line-clamp-2">
                    {relatedPost.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <ShareFooter />
    </div>
  );
}
