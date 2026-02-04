"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Flag,
  MapPin,
  Calendar,
  Clock,
  Home,
  Phone,
  Lock,
  Heart,
  Share2,
  ArrowLeft,
  User,
  Lightbulb,
  AlertTriangle,
  Check,
  Search,
  Loader2
} from "lucide-react";
import MainHeader from "../../../components/MainHeader";
import ShareFooter from "../../../components/ShareFooter";
import ReportModal from "../../../components/ReportModal";
import { getListingById } from "../../../data/listings";
import { RoomListing } from "../../../data/types";
import { useAuth } from "../../../contexts/AuthContext";

// Helper function to get category badge
function getCategoryBadge(listing: RoomListing) {
  if (listing.propertyType === "house") return { text: "Nhà trọ", color: "bg-pink-300" };
  return { text: "Chung cư", color: "bg-pink-200" };
}

// Generate mock amenities based on description
function getAmenities(listing: RoomListing): string[] {
  const amenities: string[] = [];
  const desc = listing.description.toLowerCase();

  if (desc.includes("máy lạnh") || desc.includes("điều hòa")) amenities.push("Máy lạnh");
  if (desc.includes("tủ lạnh")) amenities.push("Tủ lạnh");
  if (desc.includes("máy giặt")) amenities.push("Máy giặt");
  if (desc.includes("wifi") || desc.includes("internet")) amenities.push("Wifi");
  if (desc.includes("bếp") || desc.includes("nấu ăn")) amenities.push("Bếp");
  if (desc.includes("ban công")) amenities.push("Ban công");
  if (desc.includes("view")) amenities.push("View đẹp");
  if (desc.includes("nội thất")) amenities.push("Full nội thất");
  if (desc.includes("gym") || desc.includes("hồ bơi")) amenities.push("Tiện ích cao cấp");

  // Default amenities if none found
  if (amenities.length === 0) {
    amenities.push("Wifi", "Máy lạnh");
  }

  return amenities;
}

export default function RoomshareListingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { isAuthenticated } = useAuth();
  const [listing, setListing] = useState<RoomListing | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorited, setIsFavorited] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  // Fetch listing data
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const data = await getListingById(id);
      // Verify this is a roomshare listing
      if (data && data.category !== "roomshare") {
        // Redirect to correct route
        router.replace(`/roommate/listing/${id}`);
        return;
      }
      setListing(data);
      setIsLoading(false);
    }
    fetchData();
  }, [id, router]);

  // Check if listing is favorited
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      const favoriteIds = JSON.parse(savedFavorites) as (string | number)[];
      setIsFavorited(favoriteIds.includes(id));
    }
  }, [id]);

  // Toggle favorite
  const toggleFavorite = () => {
    const savedFavorites = localStorage.getItem('favorites');
    let favoriteIds: (string | number)[] = savedFavorites ? JSON.parse(savedFavorites) : [];

    if (isFavorited) {
      favoriteIds = favoriteIds.filter(fid => fid !== id);
    } else {
      favoriteIds.push(id);
    }

    localStorage.setItem('favorites', JSON.stringify(favoriteIds));
    setIsFavorited(!isFavorited);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <MainHeader />
        <div className="flex min-h-[60vh] items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-zinc-400" />
        </div>
        <ShareFooter />
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen bg-white">
        <MainHeader />
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="rounded-xl border-2 border-black bg-white p-16 text-center shadow-[var(--shadow-primary)]">
            <Search className="mx-auto mb-6 h-16 w-16 text-zinc-400" />
            <h1 className="mb-4 text-3xl font-bold">Không tìm thấy bài đăng</h1>
            <p className="mb-8 text-zinc-600">Bài đăng này có thể đã bị xóa hoặc không tồn tại.</p>
            <Link href="/roomshare" className="btn-pink">
              Xem các bài đăng khác
            </Link>
          </div>
        </div>
        <ShareFooter />
      </div>
    );
  }

  const badge = getCategoryBadge(listing);
  const amenities = getAmenities(listing);

  return (
    <div className="min-h-screen bg-white">
      <MainHeader />

      {/* Hero Section - Pink theme for roomshare */}
      <section className="border-b-2 border-black bg-pink-50 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-6">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2 text-sm text-zinc-600">
            <Link href="/" className="hover:text-black">Trang chủ</Link>
            <span>/</span>
            <Link href="/roomshare" className="hover:text-black">Tìm Phòng</Link>
            <span>/</span>
            <span className="text-black font-medium">Chi tiết</span>
          </div>

          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="btn-secondary !inline-flex !py-2 !px-6 items-center gap-2 mb-6"
          >
            <ArrowLeft className="h-4 w-4" /> Quay lại
          </button>

          <h1 className="mb-6 text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
            {listing.title}
          </h1>

          <div className="flex flex-wrap gap-6 text-sm sm:text-base text-zinc-700">
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4" /> {listing.location}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="h-4 w-4" /> Dọn vào: {listing.moveInDate}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4" /> Đăng {listing.postedDate}
            </span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">

          {/* Left Column - Details */}
          <div className="space-y-8">
            {/* Image Placeholder */}
            <div className="overflow-hidden rounded-xl border-2 border-black bg-white shadow-[var(--shadow-secondary)]">
              <div className="flex h-72 sm:h-96 w-full items-center justify-center bg-zinc-50">
                <Home className="h-32 w-32 text-zinc-300" strokeWidth={1} />
              </div>
            </div>

            {/* Main Info Card */}
            <div className="rounded-xl border-2 border-black bg-white shadow-[var(--shadow-secondary)] overflow-hidden">
              {/* Price Header */}
              <div className="bg-pink-50 p-6 border-b-2 border-black">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-zinc-700 mb-1">Giá thuê/tháng</p>
                    <p className="text-3xl sm:text-4xl font-extrabold">{listing.price}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-zinc-700 mb-1">Đăng bởi</p>
                    <p className="text-xl font-bold flex items-center justify-end gap-2">
                      <User className="h-5 w-5" /> {listing.author}
                    </p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="p-6 border-b-2 border-black">
                <h2 className="mb-4 text-xl font-bold">Mô tả chi tiết</h2>
                <p className="text-base leading-relaxed text-zinc-700 whitespace-pre-line">
                  {listing.description}
                </p>
              </div>

              {/* Amenities */}
              <div className="p-6">
                <h2 className="mb-4 text-xl font-bold">Tiện nghi</h2>
                <div className="flex flex-wrap gap-2">
                  {amenities.map((amenity) => (
                    <span
                      key={amenity}
                      className="rounded-lg border-2 border-black bg-pink-100 px-3 py-1.5 text-sm font-medium"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="rounded-xl border-2 border-black bg-red-50 p-5 shadow-[var(--shadow-secondary)]">
              <h2 className="mb-3 text-lg font-bold flex items-center gap-2">
                <Lightbulb className="h-5 w-5" /> Lưu ý khi liên hệ
              </h2>
              <ul className="space-y-1.5 text-sm text-zinc-700">
                <li>• Xem phòng trực tiếp trước khi quyết định</li>
                <li>• Không chuyển tiền cọc khi chưa ký hợp đồng</li>
                <li>• Hỏi rõ các chi phí phát sinh</li>
              </ul>
            </div>
          </div>

          {/* Right Column - Contact & Actions */}
          <div className="space-y-4">
            {/* Contact Card - Sticky */}
            <div className="lg:sticky lg:top-32 rounded-xl border-2 border-black bg-pink-50 p-6 shadow-[var(--shadow-secondary)]">
              <h3 className="mb-1 text-sm font-bold uppercase tracking-wider text-zinc-600">
                Liên hệ ngay
              </h3>
              <p className="mb-5 text-xl font-bold">{listing.author}</p>

              {isAuthenticated ? (
                <a
                  href={`tel:${listing.phone.replace(/\s/g, "")}`}
                  className="mb-4 flex w-full items-center justify-center gap-2 rounded-lg border-2 border-black bg-white px-5 py-3 text-lg font-bold shadow-[var(--shadow-secondary)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
                >
                  <Phone className="h-5 w-5" /> {listing.phone}
                </a>
              ) : (
                <Link
                  href={`/auth?returnUrl=/roomshare/listing/${id}`}
                  className="mb-4 flex w-full items-center justify-center gap-2 rounded-lg border-2 border-black bg-white px-5 py-3 font-bold shadow-[var(--shadow-secondary)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
                >
                  <Lock className="h-5 w-5" /> Đăng nhập để xem SĐT
                </Link>
              )}

              <p className="text-xs leading-relaxed text-zinc-600 flex items-start gap-1">
                <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                roomieVerse không chịu trách nhiệm cho các giao dịch giữa người dùng.
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={toggleFavorite}
                className={`flex-1 flex items-center justify-center gap-2 rounded-lg border-2 border-black px-3 py-2.5 text-sm font-bold transition-all hover:translate-x-[2px] hover:translate-y-[2px] shadow-[var(--shadow-secondary)] hover:shadow-none
                  ${isFavorited ? 'bg-pink-300' : 'bg-white'}`}
              >
                <Heart className={`h-4 w-4 ${isFavorited ? 'fill-current' : ''}`} />
                {isFavorited ? 'Đã lưu' : 'Lưu'}
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 rounded-lg border-2 border-black bg-white px-3 py-2.5 text-sm font-bold transition-all hover:translate-x-[2px] hover:translate-y-[2px] shadow-[var(--shadow-secondary)] hover:shadow-none">
                <Share2 className="h-4 w-4" /> Chia sẻ
              </button>
              <button
                onClick={() => setShowReportModal(true)}
                className="flex items-center justify-center gap-2 rounded-lg border-2 border-black bg-red-50 px-3 py-2.5 text-sm font-bold text-red-600 transition-all hover:translate-x-[2px] hover:translate-y-[2px] shadow-[var(--shadow-secondary)] hover:shadow-none"
              >
                <Flag className="h-4 w-4" />
              </button>
            </div>

            {/* View More Button */}
            <Link
              href="/roomshare/all"
              className="flex items-center justify-center gap-2 w-full rounded-lg border-2 border-black bg-white px-5 py-3 font-bold shadow-[var(--shadow-secondary)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
            >
              Xem thêm tin khác
            </Link>
          </div>
        </div>
      </div>

      {/* Report Modal */}
      {showReportModal && (
        <ReportModal
          listingId={listing.id}
          listingTitle={listing.title}
          onClose={() => setShowReportModal(false)}
          onSubmit={(data) => {
            console.log("Report submitted:", data);
          }}
        />
      )}

      <ShareFooter />
    </div>
  );
}
