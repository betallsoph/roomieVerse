import type { Metadata } from "next";
import { getPostServer } from "../../lib/server-data";
import PostDetailClient from "./PostDetailClient";

const categoryLabels: Record<string, string> = {
  tips: "Mẹo hay",
  drama: "Drama",
  review: "Review",
  "pass-do": "Pass đồ",
  blog: "Blog",
};

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const post = await getPostServer(id);

  if (!post) {
    return { title: "Không tìm thấy bài viết" };
  }

  const title = post.title;
  const description = post.preview || post.content.slice(0, 160);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      locale: "vi_VN",
      authors: [post.authorName],
      publishedTime: post.createdAt,
      tags: [categoryLabels[post.category] || post.category],
      images: post.images?.[0] ? [{ url: post.images[0], width: 800, height: 600 }] : undefined,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getPostServer(id);

  return (
    <>
      {post && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: post.title,
              description: post.preview || post.content.slice(0, 160),
              author: {
                "@type": "Person",
                name: post.authorName,
              },
              datePublished: post.createdAt,
              dateModified: post.updatedAt || post.createdAt,
              url: `https://roomieverse.app/community/${id}`,
              ...(post.images?.[0] && { image: post.images[0] }),
              interactionStatistic: [
                { "@type": "InteractionCounter", interactionType: "https://schema.org/LikeAction", userInteractionCount: post.likes },
                { "@type": "InteractionCounter", interactionType: "https://schema.org/CommentAction", userInteractionCount: post.comments },
              ],
            }),
          }}
        />
      )}
      <PostDetailClient initialPost={post} />
    </>
  );
}
