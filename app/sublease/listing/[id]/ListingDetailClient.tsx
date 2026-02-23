"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Flag,
  MapPin,
  Clock,
  Home,
  Phone,
  Lock,
  Heart,
  Share2,
  ArrowLeft,
  AlertTriangle,
  Search,
  Loader2,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  FileText,
  User,
  EyeOff,
  Eye,
  Trash2,
} from "lucide-react";
import MainHeader from "../../../components/MainHeader";
import ShareFooter from "../../../components/ShareFooter";
import ReportModal from "../../../components/ReportModal";
import { getListingById, getListingsByCategory, incrementViewCount, deleteListing, updateListing, hardDeleteListing } from "../../../data/listings";
import { toggleFavorite as toggleFav, isFavorited as checkFav } from "../../../data/favorites";
import { RoomListing } from "../../../data/types";
import { useAuth } from "../../../contexts/AuthContext";
import { createReport } from "../../../data/reports";
import { useAdminRedirect } from "../../../hooks/useAdminRedirect";

const amenityLabels: Record<string, string> = {
  ac: "Điều hòa",
  wifi: "Wifi",
  washing: "Máy giặt",
  fridge: "Tủ lạnh",
  kitchen: "Bếp",
  parking: "Chỗ đậu xe",
  pool: "Hồ bơi",
  gym: "Gym",
  elevator: "Thang máy",
  security: "Bảo vệ 24/7",
  balcony: "Ban công",
  furnished: "Nội thất",
  "private-wc": "WC riêng",
};

interface Props {
  initialListing?: RoomListing | null;
}

export default function SubleaseListingDetailPage({ initialListing }: Props) {
  useAdminRedirect();
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { isAuthenticated, user, isMod, isAdmin } = useAuth();
  const [listing, setListing] = useState<RoomListing | null>(initialListing ?? null);
  const [similarListings, setSimilarListings] = useState<RoomListing[]>([]);
  const [isLoading, setIsLoading] = useState(!initialListing);
  const [isFavorited, setIsFavorited] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const data = await getListingById(id);
      if (data && data.category !== "sublease") {
        const route = data.category === "short-term" ? "short-term" : data.category === "roomshare" ? "roomshare" : "roommate";
        router.replace(`/${route}/listing/${id}`);
        return;
      }
      setListing(data);

      const allListings = await getListingsByCategory("sublease");
      const similar = allListings
        .filter((item) => String(item.id) !== String(id))
        .slice(0, 3);
      setSimilarListings(similar);

      setIsLoading(false);

      if (data) {
        incrementViewCount(String(data.id));
      }
    }
    fetchData();
  }, [id, router]);

  useEffect(() => {
    if (!user?.uid) return;
    checkFav(user.uid, id).then(setIsFavorited).catch(() => {});
  }, [id, user?.uid]);

  const toggleFavorite = async () => {
    if (!user?.uid) return;
    const newState = await toggleFav(user.uid, id);
    setIsFavorited(newState);
  };

  const isOwner = !!(user?.uid && listing?.userId && user.uid === listing.userId);
  const canManage = isOwner || isMod;

  const handleHideListing = async () => {
    if (!listing) return;
    await updateListing(String(listing.id), { status: "hidden" });
    router.push("/profile");
  };

  const handleUnhideListing = async () => {
    if (!listing) return;
    await updateListing(String(listing.id), { status: "active" });
    setListing({ ...listing, status: "active" });
  };

  const handleDeleteListing = async () => {
    if (!listing || !confirm("Bạn có chắc muốn xóa bài đăng này?")) return;
    await deleteListing(String(listing.id));
    router.push("/profile");
  };

  const handleHardDelete = async () => {
    if (!listing || !confirm("Xóa vĩnh viễn bài đăng này? Hành động không thể hoàn tác.")) return;
    await hardDeleteListing(String(listing.id));
    router.push("/sublease");
  };

  const getDisplayAmenities = (): string[] => {
    if (listing?.amenities && listing.amenities.length > 0) {
      return listing.amenities.map((a) => amenityLabels[a] || a);
    }
    return [];
  };

  const nextImage = () => {
    const images = listing?.images || [];
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };
  const prevImage = () => {
    const images = listing?.images || [];
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
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
            <Link href="/sublease" className="inline-flex items-center gap-2 rounded-lg border-2 border-black bg-emerald-300 px-6 py-3 font-bold shadow-[2px_2px_0_0_#000]">
              Xem các bài đăng khác
            </Link>
          </div>
        </div>
        <ShareFooter />
      </div>
    );
  }

  const displayAmenities = getDisplayAmenities();
  const images = listing.images || [];
  const hasImages = images.length > 0;

  return (
    <div className="min-h-screen bg-white">
      <MainHeader />

      {/* Hero Section */}
      <section className="border-b-2 border-black bg-emerald-50 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-6">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2 text-sm text-zinc-600">
            <Link href="/" className="hover:text-black">Trang chủ</Link>
            <span>/</span>
            <Link href="/sublease" className="hover:text-black">Phòng sang lại</Link>
            <span>/</span>
            <span className="text-black font-medium">Chi tiết</span>
          </div>

          {/* Back Button + Posted Date */}
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => router.back()}
              className="btn-secondary !inline-flex !py-2 !px-6 items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" /> Quay lại
            </button>
            <span className="flex items-center gap-2 text-sm text-zinc-600">
              <Clock className="h-4 w-4" /> Đăng {listing.postedDate}
            </span>
          </div>

          <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
            {listing.title}
          </h1>
        </div>
      </section>

      {/* Rejected Banner */}
      {listing.status === "rejected" && isOwner && (
        <div className="bg-red-50 border-b-2 border-red-300">
          <div className="mx-auto max-w-7xl px-6 py-3 flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-red-800">
                Bài đăng đã bị từ chối.
              </p>
              {listing.rejectionReason && (
                <p className="text-sm text-red-600 mt-0.5">
                  Lý do: {listing.rejectionReason}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* Left Column - Details */}
          <div className="space-y-8">
            {/* Image Gallery */}
            <div className="overflow-hidden rounded-xl border-2 border-black bg-white shadow-[var(--shadow-secondary)]">
              {hasImages ? (
                <div className="relative">
                  <div className="h-72 sm:h-96 w-full">
                    <Image
                      src={images[currentImageIndex]}
                      alt={`Hình ${currentImageIndex + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 border-2 border-black shadow-md hover:bg-white"
                      >
                        <ChevronLeft className="h-6 w-6" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 border-2 border-black shadow-md hover:bg-white"
                      >
                        <ChevronRight className="h-6 w-6" />
                      </button>
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {images.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentImageIndex(idx)}
                            className={`w-3 h-3 rounded-full border-2 border-black ${idx === currentImageIndex ? "bg-emerald-400" : "bg-white"}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="flex h-72 sm:h-96 w-full items-center justify-center bg-zinc-50">
                  <Home className="h-32 w-32 text-zinc-300" strokeWidth={1} />
                </div>
              )}
            </div>

            {/* Room Info Card */}
            <div className="rounded-xl border-2 border-black bg-white p-6">
              <h3 className="text-lg font-bold mb-4 text-green-600">
                Thông tin phòng sang lại
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4 text-sm">
                <div>
                  <p className="text-zinc-500 mb-1">Giá thuê</p>
                  <p className="text-xl font-bold text-green-600">{listing.price}</p>
                </div>
                {(listing.city || listing.district) && (
                  <div>
                    <p className="text-zinc-500 mb-1">Khu vực</p>
                    <p className="font-semibold text-zinc-800">
                      {[listing.district, listing.city].filter(Boolean).join(", ")}
                    </p>
                  </div>
                )}
                {listing.specificAddress && (
                  <div>
                    <p className="text-zinc-500 mb-1">Địa chỉ</p>
                    <p className="font-semibold text-zinc-800">{listing.specificAddress}</p>
                  </div>
                )}
                {listing.moveInDate && (
                  <div>
                    <p className="text-zinc-500 mb-1">Dọn vào</p>
                    <p className="font-semibold text-zinc-800">{listing.moveInDate}</p>
                  </div>
                )}
                {listing.minContractDuration && (
                  <div>
                    <p className="text-zinc-500 mb-1">HĐ còn lại</p>
                    <p className="font-semibold text-zinc-800 flex items-center gap-1">
                      <FileText className="h-4 w-4 text-green-600" />
                      {listing.minContractDuration}
                    </p>
                  </div>
                )}
              </div>

              {/* Amenities */}
              {displayAmenities.length > 0 && (
                <div className="mt-6 pt-4 border-t border-zinc-100">
                  <p className="text-sm font-bold text-zinc-500 mb-3">Tiện nghi</p>
                  <div className="flex flex-wrap gap-2">
                    {displayAmenities.map((amenity) => (
                      <span
                        key={amenity}
                        className="px-3 py-1 bg-emerald-50 text-green-600 rounded-full text-sm font-medium"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Description Card */}
            <div className="rounded-xl border-2 border-black bg-white p-6">
              <h3 className="text-lg font-bold mb-3 text-green-600">Mô tả</h3>
              <p className="text-base leading-relaxed text-zinc-700 whitespace-pre-line">
                {listing.description}
              </p>
            </div>

            {/* Tips */}
            <div className="rounded-xl border-2 border-black bg-red-50 p-5 shadow-[var(--shadow-secondary)]">
              <h2 className="mb-3 text-lg font-bold">Lưu ý khi nhận sang lại phòng</h2>
              <ul className="space-y-1.5 text-sm text-zinc-700">
                <li>• Xem phòng trực tiếp trước khi quyết định</li>
                <li>• Kiểm tra hợp đồng thuê gốc và điều khoản chuyển nhượng</li>
                <li>• Xác nhận với chủ nhà về việc đổi tên hợp đồng</li>
                <li>• Không đặt cọc hoặc chuyển tiền trước khi xem phòng</li>
                <li>• Kiểm tra tình trạng phòng, thiết bị trước khi nhận</li>
              </ul>
            </div>
          </div>

          {/* Right Column - Contact & Actions */}
          <div className="lg:sticky lg:top-24 space-y-4">
            {/* Contact Card */}
            <div className="rounded-xl border-2 border-black bg-emerald-50 p-6 shadow-[var(--shadow-secondary)]">
              {listing.userId ? (
                <Link href={`/user/${listing.userId}`} className="mb-5 flex items-center gap-3 group">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center border-2 border-black group-hover:border-green-600 transition-colors">
                    <span className="text-lg font-bold text-green-600">{listing.author?.charAt(0)?.toUpperCase() || "?"}</span>
                  </div>
                  <div>
                    <p className="text-xl font-bold group-hover:text-green-600 transition-colors">{listing.author}</p>
                    <p className="text-xs text-zinc-500 flex items-center gap-1"><User className="h-3 w-3" /> Xem hồ sơ</p>
                  </div>
                </Link>
              ) : (
                <p className="mb-5 text-xl font-bold">{listing.author}</p>
              )}

              {isAuthenticated ? (
                <>
                  <a
                    href={`tel:${listing.phone.replace(/\s/g, "")}`}
                    className="mb-3 flex w-full items-center justify-center gap-2 rounded-lg border-2 border-black bg-white px-5 py-3 text-lg font-bold shadow-[var(--shadow-secondary)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
                  >
                    <Phone className="h-5 w-5" /> {listing.phone}
                  </a>
                  {listing.zalo && (
                    <a
                      href={`https://zalo.me/${listing.zalo.replace(/\s/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mb-3 flex w-full items-center justify-center gap-2 rounded-lg border-2 border-black bg-white px-5 py-3 font-bold shadow-[var(--shadow-secondary)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
                    >
                      <MessageCircle className="h-5 w-5" /> Zalo
                    </a>
                  )}
                </>
              ) : (
                <Link
                  href={`/auth?returnUrl=/sublease/listing/${id}`}
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
            <div className="space-y-2">
              <div className="flex gap-2">
                <button
                  onClick={toggleFavorite}
                  className={`flex-1 flex items-center justify-center gap-2 rounded-lg border-2 border-black px-3 py-2.5 text-sm font-bold transition-all hover:translate-x-[2px] hover:translate-y-[2px] shadow-[var(--shadow-secondary)] hover:shadow-none
                    ${isFavorited ? "bg-emerald-300" : "bg-white"}`}
                >
                  <Heart className={`h-4 w-4 ${isFavorited ? "fill-current" : ""}`} />
                  {isFavorited ? "Đã lưu" : "Lưu"}
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 rounded-lg border-2 border-black bg-white px-3 py-2.5 text-sm font-bold transition-all hover:translate-x-[2px] hover:translate-y-[2px] shadow-[var(--shadow-secondary)] hover:shadow-none">
                  <Share2 className="h-4 w-4" /> Chia sẻ
                </button>
              </div>
              <button
                onClick={() => setShowReportModal(true)}
                className="w-full flex items-center justify-center gap-2 rounded-lg border-2 border-black bg-red-50 px-3 py-2.5 text-sm font-bold text-red-600 transition-all hover:translate-x-[2px] hover:translate-y-[2px] shadow-[var(--shadow-secondary)] hover:shadow-none"
              >
                <Flag className="h-4 w-4" /> Báo cáo
              </button>
            </div>

            {/* Owner / Admin Actions */}
            {canManage && listing && (
              <div className="rounded-xl border-2 border-black bg-zinc-50 p-4 space-y-2">
                <p className="text-xs font-bold text-zinc-500 mb-2">
                  {isMod && !isOwner ? "Quản trị viên" : "Quản lý bài đăng"}
                </p>
                {listing.status === "hidden" ? (
                  <button
                    onClick={handleUnhideListing}
                    className="w-full flex items-center justify-center gap-2 rounded-lg border-2 border-black bg-blue-100 px-3 py-2.5 text-sm font-bold transition-all hover:translate-x-[2px] hover:translate-y-[2px] shadow-[var(--shadow-secondary)] hover:shadow-none"
                  >
                    <Eye className="h-4 w-4" /> Hiện lại bài đăng
                  </button>
                ) : listing.status !== "deleted" ? (
                  <button
                    onClick={handleHideListing}
                    className="w-full flex items-center justify-center gap-2 rounded-lg border-2 border-black bg-yellow-100 px-3 py-2.5 text-sm font-bold transition-all hover:translate-x-[2px] hover:translate-y-[2px] shadow-[var(--shadow-secondary)] hover:shadow-none"
                  >
                    <EyeOff className="h-4 w-4" /> Ẩn bài đăng
                  </button>
                ) : null}
                {listing.status !== "deleted" && (
                  <button
                    onClick={handleDeleteListing}
                    className="w-full flex items-center justify-center gap-2 rounded-lg border-2 border-black bg-red-100 px-3 py-2.5 text-sm font-bold text-red-600 transition-all hover:translate-x-[2px] hover:translate-y-[2px] shadow-[var(--shadow-secondary)] hover:shadow-none"
                  >
                    <Trash2 className="h-4 w-4" /> Xóa bài đăng
                  </button>
                )}
                {isAdmin && (
                  <button
                    onClick={handleHardDelete}
                    className="w-full flex items-center justify-center gap-2 rounded-lg border-2 border-black bg-red-500 text-white px-3 py-2.5 text-sm font-bold transition-all hover:translate-x-[2px] hover:translate-y-[2px] shadow-[var(--shadow-secondary)] hover:shadow-none"
                  >
                    <Trash2 className="h-4 w-4" /> Xóa vĩnh viễn
                  </button>
                )}
              </div>
            )}

            {/* Ad Placeholder */}
            <div className="p-4 rounded-lg border-2 border-dashed border-zinc-300 bg-zinc-50 text-center">
              <p className="text-xs text-zinc-400 mb-2">Quảng cáo</p>
              <div className="h-[250px] flex items-center justify-center text-zinc-300 text-sm">
                Google Ads
              </div>
            </div>

            {/* Similar Listings */}
            {similarListings.length > 0 && (
              <div className="pt-4 border-t border-zinc-200">
                <h3 className="text-sm font-bold text-zinc-500 mb-3">Tin tương tự</h3>
                <div className="space-y-3">
                  {similarListings.map((item) => (
                    <Link
                      key={item.id}
                      href={`/sublease/listing/${item.id}`}
                      className="block p-3 rounded-lg border-2 border-black bg-white hover:bg-emerald-50 transition-colors"
                    >
                      <p className="font-bold text-sm line-clamp-2 mb-1">{item.title}</p>
                      <div className="flex items-center justify-between text-xs text-zinc-500">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {item.district || item.city || "Chưa rõ"}
                        </span>
                        <span className="font-bold text-green-600">{item.price}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Report Modal */}
      {showReportModal && (
        <ReportModal
          listingId={listing.id}
          listingTitle={listing.title}
          onClose={() => setShowReportModal(false)}
          onSubmit={async (data) => {
            await createReport({
              listingId: String(data.listingId),
              reportedBy: user?.uid || "anonymous",
              reason: data.reason,
              details: data.details || undefined,
            });
          }}
        />
      )}

      <ShareFooter />
    </div>
  );
}
