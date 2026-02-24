"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
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
  Search,
  Loader2,
  MessageCircle,
  Facebook,
  Instagram,
  Users,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Zap,
  Droplets,
  Wifi,
  Car,
  Building2,
  Receipt,
  EyeOff,
  Eye,
  Trash2,
} from "lucide-react";
import MainHeader from "../../../components/MainHeader";
import ConfirmModal from "../../../components/ConfirmModal";
import ShareFooter from "../../../components/ShareFooter";
import ReportModal from "../../../components/ReportModal";
import { getListingById, getListingsByCategory, incrementViewCount, deleteListing, updateListing, hardDeleteListing } from "../../../data/listings";
import { toggleFavorite as toggleFav, isFavorited as checkFav } from "../../../data/favorites";
import { RoomListing } from "../../../data/types";
import { useAuth } from "../../../contexts/AuthContext";
import { createReport } from "../../../data/reports";
import { useAdminRedirect } from "../../../hooks/useAdminRedirect";

// Helper to map amenity value to label
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

// Helper to map preference values to labels
const preferenceLabels: Record<string, Record<string, string>> = {
  gender: { male: "Nam", female: "Nữ", any: "Không quan trọng" },
  status: { student: "Sinh viên", working: "Đã đi làm", both: "Vừa học vừa làm", other: "Khác" },
  schedule: { early: "Ngủ sớm, dậy sớm", late: "Cú đêm", flexible: "Linh hoạt" },
  cleanliness: { "very-clean": "Rất sạch sẽ", normal: "Bình thường", relaxed: "Thoải mái" },
  habits: { "no-smoke": "Không hút thuốc", "no-alcohol": "Không uống rượu bia", flexible: "Linh hoạt" },
  pets: { "no-pet": "Không nuôi thú cưng", "pet-ok": "Có thể nuôi thú cưng", any: "Không quan trọng" },
  moveInTime: { "early-month": "Đầu tháng", "end-month": "Cuối tháng", any: "Thời gian bất kỳ", asap: "Càng sớm càng tốt" },
};

interface Props {
  initialListing?: RoomListing | null;
}

export default function RoomshareListingDetailPage({ initialListing }: Props) {
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

  // Fetch listing data
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const data = await getListingById(id);
      if (data && data.category !== "roomshare") {
        router.replace(`/roommate/listing/${id}`);
        return;
      }
      setListing(data);

      // Fetch similar listings
      const allListings = await getListingsByCategory("roomshare");
      const similar = allListings
        .filter(item => String(item.id) !== String(id))
        .slice(0, 3);
      setSimilarListings(similar);

      setIsLoading(false);

      // Track view
      if (data) {
        incrementViewCount(String(data.id));
      }
    }
    fetchData();
  }, [id, router]);

  // Check if listing is favorited
  useEffect(() => {
    if (!user?.uid) return;
    checkFav(user.uid, id).then(setIsFavorited).catch(() => { });
  }, [id, user?.uid]);

  // Toggle favorite
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

  const [deleteType, setDeleteType] = useState<'soft' | 'hard' | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteListing = () => {
    setDeleteType('soft');
  };

  const handleHardDelete = () => {
    setDeleteType('hard');
  };

  const confirmDelete = async () => {
    if (!deleteType || !listing) return;

    setIsDeleting(true);
    try {
      if (deleteType === 'soft') {
        await deleteListing(String(listing.id));
        router.push("/profile");
      } else {
        await hardDeleteListing(String(listing.id));
        router.push("/roomshare");
      }
    } catch (error) {
      console.error("Error deleting listing:", error);
      alert("Có lỗi xảy ra khi xóa bài đăng");
      setIsDeleting(false);
    }
  };

  // Get amenities from listing data
  const getDisplayAmenities = (): string[] => {
    if (listing?.amenities && listing.amenities.length > 0) {
      return listing.amenities.map(a => amenityLabels[a] || a);
    }
    // Fallback: parse from description
    const fallback: string[] = [];
    const desc = (listing?.description || "").toLowerCase();
    if (desc.includes("máy lạnh") || desc.includes("điều hòa")) fallback.push("Điều hòa");
    if (desc.includes("wifi")) fallback.push("Wifi");
    if (desc.includes("máy giặt")) fallback.push("Máy giặt");
    if (desc.includes("tủ lạnh")) fallback.push("Tủ lạnh");
    if (desc.includes("bếp")) fallback.push("Bếp");
    if (fallback.length === 0) fallback.push("Wifi", "Điều hòa");
    return fallback;
  };

  const nextImage = () => {
    const images = listing?.images || [];
    setCurrentImageIndex(prev => (prev + 1) % images.length);
  };
  const prevImage = () => {
    const images = listing?.images || [];
    setCurrentImageIndex(prev => (prev - 1 + images.length) % images.length);
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

  const displayAmenities = getDisplayAmenities();
  const images = listing.images || [];
  const hasImages = images.length > 0;
  const costs = listing.costs;

  return (
    <div className="min-h-screen bg-white">
      <MainHeader />

      {/* Hero Section - Pink theme */}
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
                            className={`w-3 h-3 rounded-full border-2 border-black ${idx === currentImageIndex ? 'bg-pink-400' : 'bg-white'}`}
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

            {/* Introduction Card */}
            <div className="rounded-xl border-2 border-black bg-white p-6">
              <h3 className="text-lg font-bold mb-3 text-pink-700">
                Về người đăng
              </h3>
              <p className="text-base leading-relaxed text-zinc-700 whitespace-pre-line">
                {listing.introduction || listing.description}
              </p>
              {listing.othersIntro && (
                <div className="pt-4 mt-4 border-t border-zinc-200">
                  <h4 className="text-sm font-bold text-zinc-500 mb-2">Về những người ở phòng khác</h4>
                  <p className="text-base leading-relaxed text-zinc-700 whitespace-pre-line">
                    {listing.othersIntro}
                  </p>
                </div>
              )}
              {listing.userId && (
                <Link
                  href={`/user/${listing.userId}`}
                  className="inline-flex items-center gap-2 mt-4 text-sm font-bold text-pink-600 hover:underline"
                >
                  <User className="h-4 w-4" /> Xem hồ sơ lối sống của {listing.author}
                </Link>
              )}
            </div>

            {/* Room Info Card */}
            <div className="rounded-xl border-2 border-black bg-white p-6">
              <h3 className="text-lg font-bold mb-4 text-pink-700">
                Thông tin phòng
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4 text-sm">
                <div>
                  <p className="text-zinc-500 mb-1">Tiền thuê</p>
                  <p className="text-xl font-bold text-pink-600">{listing.price}</p>
                </div>
                {(listing.city || listing.district) && (
                  <div>
                    <p className="text-zinc-500 mb-1">Khu vực</p>
                    <p className="font-semibold text-zinc-800">
                      {[listing.district, listing.city].filter(Boolean).join(", ")}
                    </p>
                  </div>
                )}
                <div>
                  <p className="text-zinc-500 mb-1">Loại hình</p>
                  <p className="font-semibold text-zinc-800">
                    {listing.propertyType === "house" ? "Nhà trọ" : "Chung cư"}
                  </p>
                </div>
                {listing.specificAddress && (
                  <div>
                    <p className="text-zinc-500 mb-1">Địa chỉ</p>
                    <p className="font-semibold text-zinc-800">{listing.specificAddress}</p>
                  </div>
                )}
                {listing.buildingName && (
                  <div>
                    <p className="text-zinc-500 mb-1">Toà nhà/Block</p>
                    <p className="font-semibold text-zinc-800">{listing.buildingName}</p>
                  </div>
                )}
                {listing.totalRooms && (
                  <div>
                    <p className="text-zinc-500 mb-1">Tổng số phòng</p>
                    <p className="font-semibold text-zinc-800">{listing.totalRooms} phòng</p>
                  </div>
                )}
                {listing.roomSize && (
                  <div>
                    <p className="text-zinc-500 mb-1">Diện tích phòng dư</p>
                    <p className="font-semibold text-zinc-800">{listing.roomSize} m²</p>
                  </div>
                )}
                {listing.currentOccupants && (
                  <div>
                    <p className="text-zinc-500 mb-1">Số người đang ở</p>
                    <p className="font-semibold text-zinc-800">{listing.currentOccupants} người</p>
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
                    <p className="text-zinc-500 mb-1">Hợp đồng tối thiểu</p>
                    <p className="font-semibold text-zinc-800">{listing.minContractDuration}</p>
                  </div>
                )}
                {costs?.deposit && (
                  <div>
                    <p className="text-zinc-500 mb-1">Tiền cọc</p>
                    <p className="font-semibold text-zinc-800">{costs.deposit}</p>
                  </div>
                )}
              </div>

              {/* Costs inline */}
              {costs && (costs.electricity || costs.water || costs.internet || costs.parking || costs.management || costs.service || costs.other) && (
                <div className="mt-6 pt-4 border-t border-zinc-100">
                  <p className="text-sm font-bold text-zinc-500 mb-3">Chi phí sinh hoạt</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-4 text-sm">
                    {costs.electricity && (
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-pink-400 flex-shrink-0" />
                        <div>
                          <p className="text-zinc-500 text-xs">Điện</p>
                          <p className="font-semibold text-zinc-800">{costs.electricity}</p>
                        </div>
                      </div>
                    )}
                    {costs.water && (
                      <div className="flex items-center gap-2">
                        <Droplets className="h-4 w-4 text-pink-400 flex-shrink-0" />
                        <div>
                          <p className="text-zinc-500 text-xs">Nước</p>
                          <p className="font-semibold text-zinc-800">{costs.water}</p>
                        </div>
                      </div>
                    )}
                    {costs.internet && (
                      <div className="flex items-center gap-2">
                        <Wifi className="h-4 w-4 text-pink-400 flex-shrink-0" />
                        <div>
                          <p className="text-zinc-500 text-xs">Internet</p>
                          <p className="font-semibold text-zinc-800">{costs.internet}</p>
                        </div>
                      </div>
                    )}
                    {costs.service && (
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-pink-400 flex-shrink-0" />
                        <div>
                          <p className="text-zinc-500 text-xs">Dịch vụ</p>
                          <p className="font-semibold text-zinc-800">{costs.service}</p>
                        </div>
                      </div>
                    )}
                    {costs.parking && (
                      <div className="flex items-center gap-2">
                        <Car className="h-4 w-4 text-pink-400 flex-shrink-0" />
                        <div>
                          <p className="text-zinc-500 text-xs">Gửi xe</p>
                          <p className="font-semibold text-zinc-800">{costs.parking}</p>
                        </div>
                      </div>
                    )}
                    {costs.management && (
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-pink-400 flex-shrink-0" />
                        <div>
                          <p className="text-zinc-500 text-xs">Phí quản lý</p>
                          <p className="font-semibold text-zinc-800">{costs.management}</p>
                        </div>
                      </div>
                    )}
                    {costs.other && (
                      <div className="flex items-center gap-2 col-span-2">
                        <Receipt className="h-4 w-4 text-pink-400 flex-shrink-0" />
                        <div>
                          <p className="text-zinc-500 text-xs">Khác</p>
                          <p className="font-semibold text-zinc-800">{costs.other}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Amenities inline */}
              <div className="mt-6 pt-4 border-t border-zinc-100">
                <p className="text-sm font-bold text-zinc-500 mb-3">Tiện nghi</p>
                <div className="flex flex-wrap gap-2">
                  {displayAmenities.map((amenity) => (
                    <span
                      key={amenity}
                      className="px-3 py-1 bg-pink-50 text-pink-700 rounded-full text-sm font-medium"
                    >
                      {amenity}
                    </span>
                  ))}
                  {listing.amenitiesOther && (
                    <span className="px-3 py-1 bg-yellow-50 text-yellow-700 rounded-full text-sm font-medium">
                      {listing.amenitiesOther}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Preferences Card */}
            {listing.preferences && (
              <div className="rounded-xl border-2 border-black bg-white p-6">
                <h3 className="text-lg font-bold mb-4 text-pink-700">
                  Yêu cầu đối với bạn thuê phòng
                </h3>
                <div className="space-y-3">
                  {listing.preferences.gender && listing.preferences.gender.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm text-zinc-500 w-24">Giới tính:</span>
                      {listing.preferences.gender.map(v => (
                        <span key={v} className="px-3 py-1 bg-pink-50 text-pink-700 rounded-full text-sm font-medium">
                          {preferenceLabels.gender[v] || v}
                        </span>
                      ))}
                    </div>
                  )}
                  {listing.preferences.status && listing.preferences.status.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm text-zinc-500 w-24">Tình trạng:</span>
                      {listing.preferences.status.map(v => (
                        <span key={v} className="px-3 py-1 bg-pink-50 text-pink-700 rounded-full text-sm font-medium">
                          {preferenceLabels.status[v] || v}
                        </span>
                      ))}
                    </div>
                  )}
                  {listing.preferences.schedule && listing.preferences.schedule.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm text-zinc-500 w-24">Giờ giấc:</span>
                      {listing.preferences.schedule.map(v => (
                        <span key={v} className="px-3 py-1 bg-pink-50 text-pink-700 rounded-full text-sm font-medium">
                          {preferenceLabels.schedule[v] || v}
                        </span>
                      ))}
                    </div>
                  )}
                  {listing.preferences.cleanliness && listing.preferences.cleanliness.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm text-zinc-500 w-24">Sạch sẽ:</span>
                      {listing.preferences.cleanliness.map(v => (
                        <span key={v} className="px-3 py-1 bg-pink-50 text-pink-700 rounded-full text-sm font-medium">
                          {preferenceLabels.cleanliness[v] || v}
                        </span>
                      ))}
                    </div>
                  )}
                  {listing.preferences.habits && listing.preferences.habits.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm text-zinc-500 w-24">Thói quen:</span>
                      {listing.preferences.habits.map(v => (
                        <span key={v} className="px-3 py-1 bg-pink-50 text-pink-700 rounded-full text-sm font-medium">
                          {preferenceLabels.habits[v] || v}
                        </span>
                      ))}
                    </div>
                  )}
                  {listing.preferences.pets && listing.preferences.pets.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm text-zinc-500 w-24">Thú cưng:</span>
                      {listing.preferences.pets.map(v => (
                        <span key={v} className="px-3 py-1 bg-pink-50 text-pink-700 rounded-full text-sm font-medium">
                          {preferenceLabels.pets[v] || v}
                        </span>
                      ))}
                    </div>
                  )}
                  {listing.preferences.other && (
                    <div className="pt-3 mt-2 border-t border-zinc-100">
                      <p className="text-sm text-zinc-500 mb-1">Yêu cầu khác:</p>
                      <p className="text-zinc-800">{listing.preferences.other}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Tips */}
            <div className="rounded-xl border-2 border-black bg-red-50 p-5 shadow-[var(--shadow-secondary)]">
              <h2 className="mb-3 text-lg font-bold">
                Lưu ý khi liên hệ
              </h2>
              <ul className="space-y-1.5 text-sm text-zinc-700">
                <li>• Xem phòng trực tiếp trước khi quyết định</li>
                <li>• Không chuyển tiền cọc khi chưa ký hợp đồng</li>
                <li>• Hỏi rõ các chi phí phát sinh</li>
              </ul>
            </div>
          </div>

          {/* Right Column - Contact & Actions */}
          <div className="lg:sticky lg:top-24 space-y-4">
            {/* Contact Card */}
            <div className="rounded-xl border-2 border-black bg-pink-50 p-6 shadow-[var(--shadow-secondary)]">
              {listing.userId ? (
                <Link href={`/user/${listing.userId}`} className="mb-5 flex items-center gap-3 group">
                  <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center border-2 border-black group-hover:border-pink-600 transition-colors">
                    <span className="text-lg font-bold text-pink-700">{listing.author?.charAt(0)?.toUpperCase() || "?"}</span>
                  </div>
                  <div>
                    <p className="text-xl font-bold group-hover:text-pink-700 transition-colors">{listing.author}</p>
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
                    className="mb-3 flex w-full items-center justify-center gap-2 rounded-lg border-2 border-black bg-white px-5 py-3 text-lg font-bold shadow-[var(--shadow-secondary)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
                  >
                    <Phone className="h-5 w-5" /> {listing.phone}
                  </a>

                  {listing.zalo ? (
                    <a
                      href={`https://zalo.me/${listing.zalo.replace(/\s/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mb-3 flex w-full items-center justify-center gap-2 rounded-lg border-2 border-black bg-white px-5 py-3 font-bold shadow-[var(--shadow-secondary)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
                    >
                      <MessageCircle className="h-5 w-5" /> Zalo
                    </a>
                  ) : (
                    <div className="mb-3 flex w-full items-center justify-center gap-2 rounded-lg border-2 border-zinc-300 bg-zinc-100 px-5 py-3 font-bold text-zinc-400 cursor-not-allowed">
                      <MessageCircle className="h-5 w-5" /> Zalo
                    </div>
                  )}

                  <div className="flex gap-3 mb-4">
                    {listing.facebook ? (
                      <a
                        href={listing.facebook.startsWith('http') ? listing.facebook : `https://facebook.com/${listing.facebook}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-1 items-center justify-center gap-2 rounded-lg border-2 border-black bg-white px-5 py-3 font-bold shadow-[var(--shadow-secondary)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
                      >
                        <Facebook className="h-5 w-5" /> Facebook
                      </a>
                    ) : (
                      <div className="flex flex-1 items-center justify-center gap-2 rounded-lg border-2 border-zinc-300 bg-zinc-100 px-5 py-3 font-bold text-zinc-400 cursor-not-allowed">
                        <Facebook className="h-5 w-5" /> Facebook
                      </div>
                    )}

                    {listing.instagram ? (
                      <a
                        href={listing.instagram.startsWith('http') ? listing.instagram : `https://instagram.com/${listing.instagram}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-1 items-center justify-center gap-2 rounded-lg border-2 border-black bg-white px-5 py-3 font-bold shadow-[var(--shadow-secondary)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
                      >
                        <Instagram className="h-5 w-5" /> Instagram
                      </a>
                    ) : (
                      <div className="flex flex-1 items-center justify-center gap-2 rounded-lg border-2 border-zinc-300 bg-zinc-100 px-5 py-3 font-bold text-zinc-400 cursor-not-allowed">
                        <Instagram className="h-5 w-5" /> Instagram
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <Link
                  href={`/auth?returnUrl=/roomshare/listing/${id}`}
                  className="mb-4 flex w-full items-center justify-center gap-2 rounded-lg border-2 border-black bg-white px-5 py-3 font-bold shadow-[var(--shadow-secondary)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
                >
                  <Lock className="h-5 w-5" /> Đăng nhập để xem SĐT
                </Link>
              )}

              <p className="text-xs leading-relaxed text-zinc-600 flex items-start gap-1">
                <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                roomieVerse không chịu trách nhiệm cho các giao dịch giữa người dùng.
              </p>

              {listing.userId && (
                <Link
                  href={`/user/${listing.userId}`}
                  className="mt-4 flex items-center justify-center gap-2 w-full rounded-lg border-2 border-black bg-purple-100 px-5 py-3 font-bold shadow-[var(--shadow-secondary)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
                >
                  <User className="h-5 w-5" /> Xem hồ sơ người đăng
                </Link>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-2">
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
                      href={`/roomshare/listing/${item.id}`}
                      className="block p-3 rounded-lg border-2 border-black bg-white hover:bg-pink-50 transition-colors"
                    >
                      <p className="font-bold text-sm line-clamp-2 mb-1">{item.title}</p>
                      <div className="flex items-center justify-between text-xs text-zinc-500">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {item.district || item.city || "Chưa rõ"}
                        </span>
                        <span className="font-bold text-pink-600">{item.price}</span>
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

      <ConfirmModal
        isOpen={!!deleteType}
        onClose={() => setDeleteType(null)}
        onConfirm={confirmDelete}
        title={deleteType === 'hard' ? "Xóa vĩnh viễn?" : "Xóa bài đăng?"}
        message={deleteType === 'hard'
          ? "Bạn có chắc chắn muốn xóa vĩnh viễn bài đăng này? Hành động này không thể hoàn tác."
          : "Bạn có chắc chắn muốn xóa bài đăng này không? Hành động này không thể hoàn tác."}
        confirmText="Xóa ngay"
        isProcessing={isDeleting}
      />

      <ShareFooter />
    </div>
  );
}
