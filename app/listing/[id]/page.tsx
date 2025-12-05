"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import MainHeader from "../../components/MainHeader";
import ShareFooter from "../../components/ShareFooter";
import { mockListings, RoomListing } from "../../data/mockListings";

// Helper function to get category badge
function getCategoryBadge(listing: RoomListing) {
  if (listing.category === "roommate") {
    if (listing.roommateType === "have-room") return { text: "Có phòng", color: "bg-blue-300" };
    if (listing.roommateType === "need-partner") return { text: "Tìm bạn thuê", color: "bg-purple-300" };
    return { text: "Tìm người có phòng", color: "bg-pink-300" };
  }
  // roomshare
  if (listing.propertyType === "house") return { text: "Nhà trọ", color: "bg-green-300" };
  return { text: "Chung cư", color: "bg-yellow-300" };
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

export default function ListingDetailPage() {
  const params = useParams();
  const id = Number(params.id);
  
  // Find listing from mockListings
  const listing = mockListings.find((l) => l.id === id);

  if (!listing) {
    return (
      <div className="min-h-screen bg-white">
        <MainHeader />
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="rounded-xl border-2 border-black bg-white p-16 text-center shadow-[var(--shadow-primary)]">
            <div className="mb-6 text-6xl">🔍</div>
            <h1 className="mb-4 text-3xl font-bold">Không tìm thấy bài đăng</h1>
            <p className="mb-8 text-zinc-600">Bài đăng này có thể đã bị xóa hoặc không tồn tại.</p>
            <Link href="/roommate" className="btn-primary">
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
  const backLink = listing.category === "roommate" ? "/roommate" : "/roomshare";

  return (
    <div className="min-h-screen bg-white">
      <MainHeader />

      {/* Hero Section */}
      <section className="border-b-2 border-black bg-blue-50 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-6">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2 text-sm text-zinc-600">
            <Link href="/" className="hover:text-black">Trang chủ</Link>
            <span>/</span>
            <Link href={backLink} className="hover:text-black">
              {listing.category === "roommate" ? "Tìm Roommate" : "Tìm Phòng Share"}
            </Link>
            <span>/</span>
            <span className="text-black font-medium">Chi tiết</span>
          </div>

          {/* Title & Badge */}
          <div className="flex flex-wrap items-start gap-4 mb-6">
            <span className={`rounded-lg border-2 border-black ${badge.color} px-4 py-2 text-sm font-bold shadow-[var(--shadow-secondary)]`}>
              {badge.text}
            </span>
          </div>
          
          <h1 className="mb-6 text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
            {listing.title}
          </h1>

          <div className="flex flex-wrap gap-6 text-sm sm:text-base text-zinc-700">
            <span className="flex items-center gap-2">
              📍 {listing.location}
            </span>
            <span className="flex items-center gap-2">
              📅 Dọn vào: {listing.moveInDate}
            </span>
            <span className="flex items-center gap-2">
              ⏰ Đăng {listing.postedDate}
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
            <div className="overflow-hidden rounded-xl border-2 border-black bg-blue-100 shadow-[var(--shadow-secondary)]">
              <div className="flex h-72 sm:h-96 w-full items-center justify-center text-8xl sm:text-9xl">
                🏠
              </div>
            </div>

            {/* Price Card */}
            <div className="rounded-xl border-2 border-black bg-pink-200 p-6 sm:p-8 shadow-[var(--shadow-primary)]">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-zinc-700 mb-1">Giá thuê/tháng</p>
                  <p className="text-3xl sm:text-4xl font-extrabold">{listing.price}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-zinc-700 mb-1">Đăng bởi</p>
                  <p className="text-xl font-bold">✍️ {listing.author}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="rounded-xl border-2 border-black bg-white p-6 sm:p-8 shadow-[var(--shadow-secondary)]">
              <h2 className="mb-6 text-2xl font-bold">Mô tả chi tiết</h2>
              <p className="text-base leading-relaxed text-zinc-700 whitespace-pre-line">
                {listing.description}
              </p>
            </div>

            {/* Amenities */}
            <div className="rounded-xl border-2 border-black bg-white p-6 sm:p-8 shadow-[var(--shadow-secondary)]">
              <h2 className="mb-6 text-2xl font-bold">Tiện nghi</h2>
              <div className="flex flex-wrap gap-3">
                {amenities.map((amenity) => (
                  <span
                    key={amenity}
                    className="rounded-lg border-2 border-black bg-blue-300 px-4 py-2 text-sm font-bold"
                  >
                    ✓ {amenity}
                  </span>
                ))}
              </div>
            </div>

            {/* Tips */}
            <div className="rounded-xl border-2 border-black bg-yellow-100 p-6 sm:p-8 shadow-[var(--shadow-secondary)]">
              <h2 className="mb-4 text-xl font-bold">💡 Lưu ý khi liên hệ</h2>
              <ul className="space-y-2 text-sm text-zinc-700">
                <li>• Hãy xem phòng trực tiếp trước khi quyết định</li>
                <li>• Không chuyển tiền cọc khi chưa ký hợp đồng</li>
                <li>• Hỏi rõ về các chi phí phát sinh (điện, nước, internet...)</li>
                <li>• Xác nhận rõ thời hạn hợp đồng và điều khoản</li>
              </ul>
            </div>
          </div>

          {/* Right Column - Contact (Sticky) + Share (Fixed) */}
          <div className="space-y-6">
            {/* Contact Card - STICKY */}
            <div className="lg:sticky lg:top-40 rounded-xl border-2 border-black bg-gradient-to-br from-blue-200 to-blue-300 p-6 sm:p-8 shadow-[var(--shadow-primary)]">
              <h3 className="mb-2 text-sm font-bold uppercase tracking-wider text-zinc-700">
                Liên hệ ngay
              </h3>
              <p className="mb-6 text-2xl font-bold">{listing.author}</p>

              {/* Phone Button */}
              <a
                href={`tel:${listing.phone.replace(/\s/g, "")}`}
                className="mb-4 flex w-full items-center justify-center gap-3 rounded-xl border-2 border-black bg-white px-6 py-4 text-xl font-bold shadow-[var(--shadow-secondary)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
              >
                📞 {listing.phone}
              </a>

              {/* Message Button */}
              <button className="mb-6 w-full rounded-xl border-2 border-black bg-pink-300 px-6 py-3 font-bold shadow-[var(--shadow-secondary)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none">
                💬 Nhắn tin Zalo
              </button>

              {/* Warning */}
              <p className="text-xs leading-relaxed text-zinc-700">
                ⚠️ roomieVerse không chịu trách nhiệm cho các giao dịch giữa người dùng. Hãy cẩn thận!
              </p>
            </div>

            {/* Share Card - NOT STICKY */}
            <div className="rounded-xl border-2 border-black bg-white p-6 shadow-[var(--shadow-secondary)]">
              <h3 className="mb-4 text-lg font-bold">Chia sẻ bài đăng</h3>
              <div className="flex gap-3">
                <button className="flex-1 rounded-lg border-2 border-black bg-blue-100 px-4 py-3 text-sm font-bold transition-all hover:bg-blue-200">
                  Facebook
                </button>
                <button className="flex-1 rounded-lg border-2 border-black bg-zinc-100 px-4 py-3 text-sm font-bold transition-all hover:bg-zinc-200">
                  Copy link
                </button>
              </div>
            </div>

            {/* Back Button - NOT STICKY */}
            <Link
              href={backLink}
              className="block w-full rounded-xl border-2 border-black bg-white px-6 py-4 text-center font-bold shadow-[var(--shadow-secondary)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
            >
              ← Quay lại danh sách
            </Link>
          </div>
        </div>
      </div>

      <ShareFooter />
    </div>
  );
}
