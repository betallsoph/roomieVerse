"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import MainHeader from "../../components/MainHeader";
import ShareFooter from "../../components/ShareFooter";
import ProtectedRoute from "../../components/ProtectedRoute";
import { useAuth } from "../../contexts/AuthContext";
import BypassModerationToggle from "../../components/BypassModerationToggle";
import { createCommunityPost } from "../../data/community";
import { CommunityCategory } from "../../data/types";
import {
  ArrowLeft,
  Lightbulb,
  Flame,
  Star,
  ShoppingBag,
  BookOpen,
  MapPin,
  Loader2,
  Camera,
} from "lucide-react";
import Link from "next/link";

const categories: { key: CommunityCategory; label: string; icon: typeof Lightbulb; description: string }[] = [
  { key: "tips", label: "Mẹo hay", icon: Lightbulb, description: "Chia sẻ mẹo vặt, kinh nghiệm sống" },
  { key: "drama", label: "Drama", icon: Flame, description: "Kể chuyện, tâm sự, drama roommate" },
  { key: "review", label: "Review", icon: Star, description: "Review nhà trọ, chung cư, khu vực" },
  { key: "pass-do", label: "Pass đồ", icon: ShoppingBag, description: "Bán/cho đồ cũ, pass đồ nội thất" },
  { key: "blog", label: "Blog", icon: BookOpen, description: "Bài viết dài, chia sẻ sâu" },
];

export default function CreateCommunityPostPage() {
  const router = useRouter();
  const { user, isTester } = useAuth();
  const [bypassMod, setBypassMod] = useState(true);

  const [category, setCategory] = useState<CommunityCategory | null>(null);

  // Pre-select category from URL param (e.g. /community/create?category=blog)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get("category") as CommunityCategory | null;
    if (cat && categories.some(c => c.key === cat)) {
      setCategory(cat);
    }
  }, []);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState<number>(0);
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const showLocation = category === "review" || category === "pass-do";
  const showPrice = category === "pass-do";
  const showRating = category === "review";

  const canSubmit = category && title.trim().length >= 5 && content.trim().length >= 20;

  const handleSubmit = async () => {
    if (!canSubmit || !user || isSubmitting) return;

    setIsSubmitting(true);
    try {
      // Upload images to R2
      const { uploadImages } = await import('../../lib/imageUpload');
      const postIdPrefix = `cp-${Date.now()}`;
      const uploadedImages = images.length > 0
        ? await uploadImages(images, "community", postIdPrefix)
        : [];

      const postId = await createCommunityPost({
        authorId: user.uid,
        authorName: user.displayName || "Ẩn danh",
        authorPhoto: user.photoURL || undefined,
        category,
        title: title.trim(),
        content: content.trim(),
        location: location.trim() || undefined,
        price: price.trim() || undefined,
        rating: showRating && rating > 0 ? rating : undefined,
        images: uploadedImages.length > 0 ? uploadedImages : undefined,
      }, isTester && bypassMod);

      router.push(`/community/${postId}`);
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Đăng bài thất bại. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-white">
        <MainHeader />

        <section className="py-12 md:py-16">
          <div className="wrapper max-w-3xl">
            {/* Header */}
            <div className="mb-8">
              <Link
                href="/community"
                className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-500 hover:text-black transition-colors mb-6"
              >
                <ArrowLeft className="w-4 h-4" />
                Quay lại Cộng đồng
              </Link>
              <h1 className="text-3xl md:text-4xl font-black mb-2">Viết bài mới</h1>
              <p className="text-zinc-600">Chia sẻ kinh nghiệm, kể chuyện hoặc pass đồ cho cộng đồng</p>
            </div>

            {/* Category Selection */}
            <div className="mb-8">
              <label className="block text-sm font-bold mb-3">
                Chuyên mục <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  const isSelected = category === cat.key;
                  return (
                    <button
                      key={cat.key}
                      onClick={() => setCategory(cat.key)}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        isSelected
                          ? "border-black bg-orange-50 shadow-[2px_2px_0_0_#000]"
                          : "border-zinc-200 hover:border-black"
                      }`}
                    >
                      <Icon className={`w-5 h-5 mb-2 ${isSelected ? "text-orange-600" : "text-zinc-400"}`} />
                      <p className="font-bold text-sm">{cat.label}</p>
                      <p className="text-xs text-zinc-500 mt-0.5">{cat.description}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Title */}
            <div className="mb-6">
              <label className="block text-sm font-bold mb-2">
                Tiêu đề <span className="text-red-500">*</span>
              </label>
              <input
                autoComplete="off" type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Tiêu đề bài viết..."
                maxLength={150}
                className="w-full px-4 py-3 border-2 border-black rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
              />
              <p className="text-xs text-zinc-400 mt-1">{title.length}/150 ký tự (tối thiểu 5)</p>
            </div>

            {/* Content */}
            <div className="mb-6">
              <label className="block text-sm font-bold mb-2">
                Nội dung <span className="text-red-500">*</span>
              </label>
              <textarea
                autoComplete="off" value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Viết nội dung bài đăng..."
                rows={10}
                className="w-full px-4 py-3 border-2 border-black rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 resize-none"
              />
              <p className="text-xs text-zinc-400 mt-1">{content.length} ký tự (tối thiểu 20)</p>
            </div>

            {/* Location (for review, pass-do) */}
            {showLocation && (
              <div className="mb-6">
                <label className="block text-sm font-bold mb-2">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Địa điểm
                </label>
                <input
                  autoComplete="off" type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="VD: Quận 7, TP.HCM"
                  className="w-full px-4 py-3 border-2 border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-black"
                />
              </div>
            )}

            {/* Price (for pass-do) */}
            {showPrice && (
              <div className="mb-6">
                <label className="block text-sm font-bold mb-2">Giá</label>
                <input
                  autoComplete="off" type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="VD: 2.000.000đ"
                  className="w-full px-4 py-3 border-2 border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-black"
                />
              </div>
            )}

            {/* Rating (for review) */}
            {showRating && (
              <div className="mb-6">
                <label className="block text-sm font-bold mb-2">Đánh giá</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= rating ? "text-yellow-500 fill-yellow-500" : "text-zinc-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Images */}
            <div className="mb-6">
              <label className="block text-sm font-bold mb-2">Hình ảnh</label>
              {images.length > 0 && (
                <div className="grid grid-cols-3 gap-3 mb-3">
                  {images.map((img, idx) => (
                    <div key={idx} className="relative group">
                      <img src={img} alt={`Preview ${idx + 1}`} className="w-full h-32 object-cover rounded-lg border-2 border-black" />
                      <button
                        type="button"
                        onClick={() => setImages(images.filter((_, i) => i !== idx))}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-sm font-bold"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {images.length < 5 && (
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-zinc-300 rounded-xl cursor-pointer hover:border-black hover:bg-zinc-50 transition-all">
                  <Camera className="w-8 h-8 mb-2 text-zinc-400" />
                  <p className="text-sm text-zinc-500">Click để chọn ảnh ({images.length}/5)</p>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file && images.length < 5) {
                        const reader = new FileReader();
                        reader.onloadend = () => setImages([...images, reader.result as string]);
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </label>
              )}
            </div>

            {/* Submit */}
            {isTester && (
              <div className="mb-4">
                <BypassModerationToggle enabled={bypassMod} onChange={setBypassMod} />
              </div>
            )}
            <div className="flex gap-3 pt-4 border-t-2 border-zinc-100">
              <Link
                href="/community"
                className="flex-1 text-center px-6 py-3 font-bold border-2 border-black rounded-xl hover:bg-zinc-50 transition-colors"
              >
                Hủy
              </Link>
              <button
                onClick={handleSubmit}
                disabled={!canSubmit || isSubmitting}
                className="flex-1 px-6 py-3 font-bold border-2 border-black rounded-xl bg-orange-300 shadow-[2px_2px_0_0_#000] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:translate-x-[2px] active:translate-y-[2px] active:shadow-none disabled:opacity-50 disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[2px_2px_0_0_#000] flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Đang đăng...
                  </>
                ) : (
                  "Đăng bài"
                )}
              </button>
            </div>
          </div>
        </section>

        <ShareFooter />
      </div>
    </ProtectedRoute>
  );
}
