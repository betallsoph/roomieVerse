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
  Check,
  Search,
  Loader2,
  MessageCircle,
  Facebook,
  Instagram,
  DollarSign,
  Users,
  Sparkles,
  BedDouble,
  ChevronLeft,
  ChevronRight,
  EyeOff,
  Eye,
  Trash,
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
import { getUserProfile } from "../../../data/users";
import { formatPrice } from "../../../lib/format";

// Helper function to get category badge
function getCategoryBadge(listing: RoomListing) {
  if (listing.roommateType === "have-room") {
    return { text: "Có phòng sẵn", color: "bg-blue-300" };
  }
  return { text: "Tìm bạn cùng thuê", color: "bg-blue-200" };
}

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

export default function RoommateListingDetailPage({ initialListing }: Props) {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { isAuthenticated, user, isMod, isAdmin, isLoading: authLoading } = useAuth();
  const [listing, setListing] = useState<RoomListing | null>(initialListing ?? null);
  const [similarListings, setSimilarListings] = useState<RoomListing[]>([]);
  const [isLoading, setIsLoading] = useState(!initialListing);
  const [isFavorited, setIsFavorited] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [authorPhoto, setAuthorPhoto] = useState<string | null>(null);

  // Fetch listing data (wait for auth so Firestore rules can verify owner/admin)
  useEffect(() => {
    if (authLoading) return;
    async function fetchData() {
      // If we already have initialListing from server, use it directly
      let data = listing;
      if (!data) {
        setIsLoading(true);
        data = await getListingById(id);
        // Verify this is a roommate listing
        if (data && data.category !== "roommate") {
          router.replace(`/roomshare/listing/${id}`);
          return;
        }
        setListing(data);
      }

      // Fetch similar listings (same roommateType, prioritize same city)
      if (data) {
        const allListings = await getListingsByCategory("roommate");
        const similar = allListings
          .filter(l => l.id !== data.id && l.roommateType === data.roommateType)
          .sort((a, b) => {
            const aMatch = a.city === data.city ? 1 : 0;
            const bMatch = b.city === data.city ? 1 : 0;
            return bMatch - aMatch;
          })
          .slice(0, 3);
        setSimilarListings(similar);
      }

      setIsLoading(false);

      // Fetch author photo
      if (data?.userId) {
        getUserProfile(data.userId).then(p => setAuthorPhoto(p?.photoURL || null)).catch(() => {});
      }

      // Track view (may fail for pending listings — that's fine)
      if (data && data.status === "active") {
        incrementViewCount(String(data.id)).catch(() => {});
      }
    }
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, router, authLoading]);

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

  // ... (existing helper methods)

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
        router.push("/roommate");
      }
    } catch (error) {
      console.error("Error deleting listing:", error);
      alert("Có lỗi xảy ra khi xóa bài đăng");
      setIsDeleting(false);
    }
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
  const isHaveRoom = listing.roommateType === "have-room";

  // Get amenities from listing data or fallback to description-based
  const getDisplayAmenities = () => {
    if (listing.amenities && listing.amenities.length > 0) {
      return listing.amenities
        .filter(a => a !== 'other')
        .map(a => amenityLabels[a] || a);
    }
    // Fallback for old listings
    const amenities: string[] = [];
    const desc = listing.description.toLowerCase();
    if (desc.includes("máy lạnh") || desc.includes("điều hòa")) amenities.push("Máy lạnh");
    if (desc.includes("wifi")) amenities.push("Wifi");
    return amenities.length > 0 ? amenities : ["Wifi", "Điều hòa"];
  };

  const displayAmenities = getDisplayAmenities();

  // Image navigation
  const images = listing.images && listing.images.length > 0 ? listing.images : [];
  const hasImages = images.length > 0;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="min-h-screen bg-white">
      <MainHeader />

      {/* Hero Section - Blue theme for roommate */}
      <section className="border-b-2 border-black bg-blue-50 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-6">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2 text-sm text-zinc-600">
            <Link href="/" className="hover:text-black">Trang chủ</Link>
            <span>/</span>
            <Link href="/roommate" className="hover:text-black">Tìm Roommate</Link>
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

      {/* Pending Banner */}
      {listing.status === "pending" && isOwner && (
        <div className="bg-amber-50 border-b-2 border-amber-300">
          <div className="mx-auto max-w-7xl px-6 py-3 flex items-center gap-3">
            <Clock className="h-5 w-5 text-amber-600 flex-shrink-0" />
            <p className="text-sm font-medium text-amber-800">
              Bài đăng đang chờ duyệt. Bọn mình sẽ duyệt sớm nhất có thể!
            </p>
          </div>
        </div>
      )}

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

      {/* Main Content - Different layouts for have-room vs find-partner */}
      {isHaveRoom ? (
        /* ========== HAVE-ROOM LAYOUT ========== */
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
                              className={`w-3 h-3 rounded-full border-2 border-black ${idx === currentImageIndex ? 'bg-blue-400' : 'bg-white'}`}
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

              {/* Main Info Card */}
              <div className="rounded-xl border-2 border-black bg-white shadow-[var(--shadow-secondary)] overflow-hidden">
                {/* Price Header */}
                <div className="bg-blue-50 p-6 border-b-2 border-black">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-zinc-700 mb-1">Tiền thuê phòng</p>
                      <p className="text-3xl sm:text-4xl font-extrabold text-blue-600">{formatPrice(listing.price)}<span className="text-base font-medium text-zinc-400 ml-1">/ tháng</span></p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-zinc-700 mb-1">Đăng bởi</p>
                      {listing.userId ? (
                        <Link href={`/user/${listing.userId}`} className="text-xl font-bold flex items-center justify-end gap-2 hover:text-blue-600 transition-colors">
                          <User className="h-5 w-5" /> {listing.author}
                        </Link>
                      ) : (
                        <p className="text-xl font-bold flex items-center justify-end gap-2">
                          <User className="h-5 w-5" /> {listing.author}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Address Section */}
                <div className="p-6 border-b-2 border-black">
                  <h3 className="mb-4 text-sm font-bold text-zinc-500">Địa chỉ</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {listing.city && (
                      <div>
                        <p className="text-zinc-500 mb-1">Thành phố</p>
                        <p className="font-semibold text-blue-700">{listing.city}</p>
                      </div>
                    )}
                    {listing.district && (
                      <div>
                        <p className="text-zinc-500 mb-1">Quận - Huyện - Xã</p>
                        <p className="font-semibold text-blue-700">{listing.district}</p>
                      </div>
                    )}
                    {listing.specificAddress && (
                      <div>
                        <p className="text-zinc-500 mb-1">Số nhà - Tên đường</p>
                        <p className="font-semibold text-blue-700">{listing.specificAddress}</p>
                      </div>
                    )}
                    {listing.buildingName && (
                      <div>
                        <p className="text-zinc-500 mb-1">Tên toà nhà/Chung cư - Block</p>
                        <p className="font-semibold text-blue-700">{listing.buildingName}</p>
                      </div>
                    )}
                    {listing.addressOther && (
                      <div className="col-span-2">
                        <p className="text-zinc-500 mb-1">Khác</p>
                        <p className="font-semibold text-blue-700">{listing.addressOther}</p>
                      </div>
                    )}
                    {!listing.city && !listing.district && !listing.specificAddress && listing.location && (
                      <div className="col-span-2">
                        <p className="text-zinc-500 mb-1">Địa chỉ</p>
                        <p className="font-semibold text-blue-700">{listing.location}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Room Info Section */}
                <div className="p-6 border-b-2 border-black">
                  <h3 className="mb-4 text-sm font-bold text-zinc-500">Thông tin phòng</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4 text-sm">
                    <div>
                      <p className="text-zinc-500 mb-1">Loại hình</p>
                      <p className="font-semibold text-blue-700">
                        {listing.propertyTypes && listing.propertyTypes.length > 0 ? (
                          listing.propertyTypes.map((type, idx) => (
                            <span key={type}>
                              {type === "house" && "Nhà mặt đất"}
                              {type === "room" && "Trọ"}
                              {type === "apartment" && "Chung cư"}
                              {type === "service-apartment" && "Căn hộ dịch vụ"}
                              {type === "other" && "Loại hình khác"}
                              {idx < listing.propertyTypes!.length - 1 && ", "}
                            </span>
                          ))
                        ) : (
                          "---"
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="text-zinc-500 mb-1">Diện tích</p>
                      <p className="font-semibold text-blue-700">{listing.roomSize ? `${listing.roomSize} m²` : "---"}</p>
                    </div>
                    <div>
                      <p className="text-zinc-500 mb-1">Số người đang ở</p>
                      <p className="font-semibold text-blue-700">{listing.currentOccupants ? `${listing.currentOccupants} người` : "---"}</p>
                    </div>
                    <div>
                      <p className="text-zinc-500 mb-1">Dọn vào</p>
                      <p className="font-semibold text-blue-700">{listing.moveInDate || "---"}</p>
                    </div>
                    <div>
                      <p className="text-zinc-500 mb-1">Hợp đồng tối thiểu</p>
                      <p className="font-semibold text-blue-700">{listing.minContractDuration ? `${listing.minContractDuration} tháng` : "---"}</p>
                    </div>
                  </div>
                </div>

                {/* Amenities */}
                <div className="p-6">
                  <h3 className="mb-3 text-sm font-bold text-zinc-500">Tiện nghi</h3>
                  <div className="flex flex-wrap gap-2">
                    {displayAmenities.map((amenity) => (
                      <span
                        key={amenity}
                        className="rounded-lg border-2 border-black bg-blue-100 px-3 py-1.5 text-sm font-medium"
                      >
                        {amenity}
                      </span>
                    ))}
                    {listing.amenitiesOther && (
                      <span className="rounded-lg border-2 border-black bg-yellow-100 px-3 py-1.5 text-sm font-medium">
                        {listing.amenitiesOther}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Introduction Card */}
              <div className="rounded-xl border-2 border-black bg-white shadow-[var(--shadow-secondary)] overflow-hidden">
                <div className="bg-purple-50 p-6 border-b-2 border-black">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <Sparkles className="h-5 w-5" /> Giới thiệu
                  </h2>
                </div>
                <div className="p-6">
                  <p className="text-base leading-relaxed text-zinc-700 whitespace-pre-line">
                    {listing.introduction || listing.description}
                  </p>
                </div>
              </div>

              {/* Roommate Preferences Card */}
              {listing.preferences && (
                <div className="rounded-xl border-2 border-black bg-white shadow-[var(--shadow-secondary)] overflow-hidden">
                  <div className="bg-blue-50 p-6 border-b-2 border-black">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                      <Users className="h-5 w-5" /> Mong muốn đối với bạn ở cùng
                    </h2>
                  </div>
                  <div className="p-6 grid gap-4 sm:grid-cols-2">
                    {listing.preferences.gender && listing.preferences.gender.length > 0 && (
                      <div>
                        <p className="text-sm text-zinc-500 mb-1">Giới tính</p>
                        <p className="font-semibold text-blue-700">
                          {listing.preferences.gender.map(v => preferenceLabels.gender[v] || v).join(", ")}
                        </p>
                      </div>
                    )}
                    {listing.preferences.status && listing.preferences.status.length > 0 && (
                      <div>
                        <p className="text-sm text-zinc-500 mb-1">Tình trạng</p>
                        <p className="font-semibold text-blue-700">
                          {listing.preferences.status.map(v => preferenceLabels.status[v] || v).join(", ")}
                          {listing.preferences.statusOther && ` (${listing.preferences.statusOther})`}
                        </p>
                      </div>
                    )}
                    {listing.preferences.schedule && listing.preferences.schedule.length > 0 && (
                      <div>
                        <p className="text-sm text-zinc-500 mb-1">Giờ giấc</p>
                        <p className="font-semibold text-blue-700">
                          {listing.preferences.schedule.map(v => preferenceLabels.schedule[v] || v).join(", ")}
                        </p>
                      </div>
                    )}
                    {listing.preferences.cleanliness && listing.preferences.cleanliness.length > 0 && (
                      <div>
                        <p className="text-sm text-zinc-500 mb-1">Mức độ sạch sẽ</p>
                        <p className="font-semibold text-blue-700">
                          {listing.preferences.cleanliness.map(v => preferenceLabels.cleanliness[v] || v).join(", ")}
                        </p>
                      </div>
                    )}
                    {listing.preferences.habits && listing.preferences.habits.length > 0 && (
                      <div>
                        <p className="text-sm text-zinc-500 mb-1">Thói quen</p>
                        <p className="font-semibold text-blue-700">
                          {listing.preferences.habits.map(v => preferenceLabels.habits[v] || v).join(", ")}
                        </p>
                      </div>
                    )}
                    {listing.preferences.pets && listing.preferences.pets.length > 0 && (
                      <div>
                        <p className="text-sm text-zinc-500 mb-1">Thú cưng</p>
                        <p className="font-semibold text-blue-700">
                          {listing.preferences.pets.map(v => preferenceLabels.pets[v] || v).join(", ")}
                        </p>
                      </div>
                    )}
                    {listing.preferences.moveInTime && listing.preferences.moveInTime.length > 0 && (
                      <div>
                        <p className="text-sm text-zinc-500 mb-1">Thời gian dọn vào</p>
                        <p className="font-semibold text-blue-700">
                          {listing.preferences.moveInTime.map(v => preferenceLabels.moveInTime[v] || v).join(", ")}
                        </p>
                      </div>
                    )}
                    {listing.preferences.other && (
                      <div className="sm:col-span-2">
                        <p className="text-sm text-zinc-500 mb-1">Yêu cầu khác</p>
                        <p className="font-semibold text-blue-700">{listing.preferences.other}</p>
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
                  <li>• Suy nghĩ kỹ hẳn chuyển cọc</li>
                  <li>• Hỏi rõ các chi phí phát sinh</li>
                </ul>
              </div>
            </div>

            {/* Right Column - Contact & Actions (have-room) */}
            <div className="lg:sticky lg:top-24 space-y-4">
              {/* Contact Card */}
              <div className="rounded-xl border-2 border-black bg-blue-50 p-6 shadow-[var(--shadow-secondary)]">
                {/* Author avatar + name */}
                <div className="mb-5 flex items-center gap-3">
                  {listing.userId ? (
                    <Link href={`/user/${listing.userId}`} className="flex items-center gap-3 group">
                      <div className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center border-2 border-black group-hover:border-blue-600 transition-colors overflow-hidden flex-shrink-0">
                        {authorPhoto ? (
                          <Image src={authorPhoto} alt={listing.author} width={44} height={44} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-lg font-bold text-blue-600">
                            {listing.author?.charAt(0)?.toUpperCase() || "?"}
                          </span>
                        )}
                      </div>
                      <p className="text-xl font-bold group-hover:text-blue-600 transition-colors">{listing.author}</p>
                    </Link>
                  ) : (
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center border-2 border-black flex-shrink-0">
                        <span className="text-lg font-bold text-blue-600">
                          {listing.author?.charAt(0)?.toUpperCase() || "?"}
                        </span>
                      </div>
                      <p className="text-xl font-bold">{listing.author}</p>
                    </div>
                  )}
                </div>

                {isAuthenticated ? (
                  <>
                    <a
                      href={`tel:${listing.phone.replace(/\s/g, "")}`}
                      className="mb-3 flex w-full items-center justify-center gap-2 rounded-lg border-2 border-black bg-white px-5 py-3 text-lg font-bold shadow-[var(--shadow-secondary)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
                    >
                      <Phone className="h-5 w-5" /> {listing.phone}
                    </a>

                    {listing.zalo && (
                      <a
                        href={`https://zalo.me/${listing.zalo.replace(/\s/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mb-3 flex w-full items-center justify-center gap-2 rounded-lg border-2 border-black bg-white px-5 py-3 font-bold transition-colors hover:bg-zinc-50"
                      >
                        <MessageCircle className="h-5 w-5" /> Zalo
                      </a>
                    )}

                    {(listing.facebook || listing.instagram) && (
                      <div className="flex gap-3 mb-3">
                        {listing.facebook && (
                          <a
                            href={listing.facebook.startsWith('http') ? listing.facebook : `https://facebook.com/${listing.facebook}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-1 items-center justify-center gap-2 rounded-lg border-2 border-black bg-white px-5 py-3 font-bold transition-colors hover:bg-zinc-50"
                          >
                            <Facebook className="h-5 w-5" /> Facebook
                          </a>
                        )}
                        {listing.instagram && (
                          <a
                            href={listing.instagram.startsWith('http') ? listing.instagram : `https://instagram.com/${listing.instagram}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-1 items-center justify-center gap-2 rounded-lg border-2 border-black bg-white px-5 py-3 font-bold transition-colors hover:bg-zinc-50"
                          >
                            <Instagram className="h-5 w-5" /> Instagram
                          </a>
                        )}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={`/auth?returnUrl=/roommate/listing/${id}`}
                    className="mb-4 flex w-full items-center justify-center gap-2 rounded-lg border-2 border-black bg-white px-5 py-3 font-bold transition-colors hover:bg-zinc-50"
                  >
                    <Lock className="h-5 w-5" /> Đăng nhập để xem SĐT
                  </Link>
                )}

                <p className="text-xs leading-relaxed text-zinc-600 flex items-start gap-1">
                  <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  roomieVerse không chịu trách nhiệm cho các giao dịch giữa người dùng.
                </p>

                {/* Admin / Owner Actions */}
                {canManage && listing && (
                  <div className="border-t border-zinc-200 pt-4 mt-4">
                    <p className="text-xs font-bold text-zinc-500 mb-2">
                      {isMod && !isOwner ? "Quản trị viên" : "Quản lý bài đăng"}
                    </p>
                    <div className="flex gap-2">
                      {listing.status === "hidden" ? (
                        <button
                          onClick={handleUnhideListing}
                          className="group flex-1 flex items-center justify-center gap-2 rounded-lg border-2 border-black bg-blue-100 px-3 py-2.5 text-sm font-bold"
                        >
                          <EyeOff className="h-4 w-4 group-hover:hidden transition-transform" />
                          <Eye className="h-4 w-4 hidden group-hover:block group-hover:scale-110 transition-transform" />
                          Hiện lại
                        </button>
                      ) : listing.status !== "deleted" ? (
                        <button
                          onClick={handleHideListing}
                          className="group flex-1 flex items-center justify-center gap-2 rounded-lg border-2 border-black bg-yellow-100 px-3 py-2.5 text-sm font-bold"
                        >
                          <Eye className="h-4 w-4 group-hover:hidden transition-transform" />
                          <EyeOff className="h-4 w-4 hidden group-hover:block group-hover:scale-110 transition-transform" />
                          Ẩn bài đăng
                        </button>
                      ) : null}
                      {listing.status !== "deleted" && (
                        <button
                          onClick={handleDeleteListing}
                          className="group flex-1 flex items-center justify-center gap-2 rounded-lg border-2 border-black bg-red-100 px-3 py-2.5 text-sm font-bold text-red-600"
                        >
                          <Trash className="h-4 w-4 group-hover:hidden transition-transform" />
                          <Trash2 className="h-4 w-4 hidden group-hover:block group-hover:scale-110 transition-transform" />
                          Xóa bài đăng
                        </button>
                      )}
                    </div>
                    {isAdmin && (
                      <button
                        onClick={handleHardDelete}
                        className="w-full mt-2 flex items-center justify-center gap-2 rounded-lg border-2 border-black bg-red-500 text-white px-3 py-2.5 text-sm font-bold transition-colors hover:bg-red-600"
                      >
                        <Trash2 className="h-4 w-4" /> Xóa vĩnh viễn
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Actions Card */}
              <div className="rounded-xl border-2 border-black bg-white p-4 space-y-2">
                <div className="flex gap-2">
                  <button
                    onClick={toggleFavorite}
                    className={`flex-1 flex items-center justify-center gap-2 rounded-lg border-2 border-black px-3 py-2.5 text-sm font-bold transition-colors
                      ${isFavorited ? 'bg-pink-300 hover:bg-pink-400' : 'bg-white hover:bg-zinc-50'}`}
                  >
                    <Heart className={`h-4 w-4 ${isFavorited ? 'fill-current' : ''}`} />
                    {isFavorited ? 'Đã lưu' : 'Lưu'}
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 rounded-lg border-2 border-black bg-white px-3 py-2.5 text-sm font-bold transition-colors hover:bg-zinc-50">
                    <Share2 className="h-4 w-4" /> Chia sẻ
                  </button>
                </div>
                <button
                  onClick={() => setShowReportModal(true)}
                  className="w-full flex items-center justify-center gap-2 rounded-lg border-2 border-black bg-red-50 px-3 py-2.5 text-sm font-bold text-red-600 transition-colors hover:bg-red-100"
                >
                  <Flag className="h-4 w-4" /> Báo cáo
                </button>
              </div>

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
                        href={`/roommate/listing/${item.id}`}
                        className="block p-3 rounded-lg border-2 border-black bg-white hover:bg-blue-50 transition-colors"
                      >
                        <p className="font-bold text-sm line-clamp-2 mb-1">{item.title}</p>
                        <div className="flex items-center justify-between text-xs text-zinc-500">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {item.district || item.city || "Chưa rõ"}
                          </span>
                          <span className="font-bold text-blue-600">{formatPrice(item.price)}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* ========== FIND-PARTNER LAYOUT - 2 Column Like Have-Room ========== */
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
            {/* Left Column - Details */}
            <div className="space-y-6">
              {/* Introduction Card - Separate */}
              <div className="rounded-xl border-2 border-black bg-white p-6">
                <h3 className="text-lg font-bold mb-3 text-blue-700">
                  Về mình
                </h3>
                <p className="text-base leading-relaxed text-zinc-700 whitespace-pre-line">
                  {listing.introduction || listing.description}
                </p>
                {listing.userId && (
                  <Link
                    href={`/user/${listing.userId}`}
                    className="inline-flex items-center gap-2 mt-4 text-sm font-bold text-blue-600 hover:underline"
                  >
                    <User className="h-4 w-4" /> Xem hồ sơ lối sống của {listing.author}
                  </Link>
                )}
              </div>

              {/* Preferences Card - Combined */}
              <div className="rounded-xl border-2 border-black bg-white overflow-hidden">
                {/* Looking For Header */}
                <div className={`p-6 ${listing.preferences ? 'border-b-2 border-black' : ''}`}>
                  <h3 className="text-lg font-bold mb-4 text-blue-700">
                    Mong muốn của mình
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-zinc-500 mb-1">Ngân sách</p>
                      <p className="text-xl font-bold text-blue-600">{formatPrice(listing.price)}<span className="text-xs font-medium text-zinc-400 ml-1">/ tháng</span></p>
                    </div>
                    {(listing.city || listing.district) && (
                      <div>
                        <p className="text-zinc-500 mb-1">Khu vực</p>
                        <p className="font-semibold text-zinc-800">
                          {[listing.district, listing.city].filter(Boolean).join(", ")}
                        </p>
                      </div>
                    )}
                    {listing.propertyTypes && listing.propertyTypes.length > 0 && (
                      <div>
                        <p className="text-zinc-500 mb-1">Loại hình</p>
                        <p className="font-semibold text-zinc-800">
                          {listing.propertyTypes.map((type) => {
                            if (type === "house") return "Nhà";
                            if (type === "room") return "Trọ";
                            if (type === "apartment") return "Chung cư";
                            if (type === "service-apartment") return "CHDC";
                            if (type === "dormitory") return "KTX";
                            return type;
                          }).join(", ")}
                        </p>
                      </div>
                    )}
                    {listing.moveInDate && (
                      <div>
                        <p className="text-zinc-500 mb-1">Thời gian kiếm ra phòng</p>
                        <p className="font-semibold text-zinc-800">{listing.moveInDate}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Roommate Preferences */}
                {listing.preferences && (
                  <div className="p-6">
                    <h3 className="text-lg font-bold mb-4 text-blue-700">
                      Mong muốn bạn cùng thuê
                    </h3>
                    <div className="space-y-3">
                      {listing.preferences.gender && listing.preferences.gender.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-sm text-zinc-500 w-24">Giới tính:</span>
                          {listing.preferences.gender.map(v => (
                            <span key={v} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                              {preferenceLabels.gender[v] || v}
                            </span>
                          ))}
                        </div>
                      )}
                      {listing.preferences.status && listing.preferences.status.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-sm text-zinc-500 w-24">Tình trạng:</span>
                          {listing.preferences.status.map(v => (
                            <span key={v} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                              {preferenceLabels.status[v] || v}
                            </span>
                          ))}
                        </div>
                      )}
                      {listing.preferences.schedule && listing.preferences.schedule.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-sm text-zinc-500 w-24">Giờ giấc:</span>
                          {listing.preferences.schedule.map(v => (
                            <span key={v} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                              {preferenceLabels.schedule[v] || v}
                            </span>
                          ))}
                        </div>
                      )}
                      {listing.preferences.cleanliness && listing.preferences.cleanliness.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-sm text-zinc-500 w-24">Sạch sẽ:</span>
                          {listing.preferences.cleanliness.map(v => (
                            <span key={v} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                              {preferenceLabels.cleanliness[v] || v}
                            </span>
                          ))}
                        </div>
                      )}
                      {listing.preferences.habits && listing.preferences.habits.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-sm text-zinc-500 w-24">Thói quen:</span>
                          {listing.preferences.habits.map(v => (
                            <span key={v} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                              {preferenceLabels.habits[v] || v}
                            </span>
                          ))}
                        </div>
                      )}
                      {listing.preferences.pets && listing.preferences.pets.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-sm text-zinc-500 w-24">Thú cưng:</span>
                          {listing.preferences.pets.map(v => (
                            <span key={v} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
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
              </div>

              {/* Tips */}
              <div className="rounded-xl border-2 border-black bg-red-50 p-5 shadow-[var(--shadow-secondary)]">
                <h2 className="mb-3 text-lg font-bold">
                  Lưu ý khi liên hệ
                </h2>
                <ul className="space-y-1.5 text-sm text-zinc-700">
                  <li>• Trao đổi kỹ về thói quen sinh hoạt</li>
                  <li>• Thống nhất ngân sách và khu vực trước</li>
                  <li>• Gặp mặt trực tiếp để hiểu nhau hơn</li>
                </ul>
              </div>
            </div>

            {/* Right Column - Contact & Actions */}
            <div className="lg:sticky lg:top-24 space-y-5">
              {/* Profile Avatar - Centered */}
              <div className="text-center">
                {listing.userId ? (
                  <Link href={`/user/${listing.userId}`} className="inline-block group">
                    <div className="w-20 h-20 mx-auto rounded-full bg-blue-100 flex items-center justify-center border-2 border-black group-hover:border-blue-600 transition-colors">
                      <span className="text-2xl font-bold text-blue-600">
                        {listing.author?.charAt(0)?.toUpperCase() || "?"}
                      </span>
                    </div>
                    <h3 className="mt-3 text-xl font-bold group-hover:text-blue-600 transition-colors">{listing.author}</h3>
                  </Link>
                ) : (
                  <>
                    <div className="w-20 h-20 mx-auto rounded-full bg-blue-100 flex items-center justify-center border-2 border-black">
                      <span className="text-2xl font-bold text-blue-600">
                        {listing.author?.charAt(0)?.toUpperCase() || "?"}
                      </span>
                    </div>
                    <h3 className="mt-3 text-xl font-bold">{listing.author}</h3>
                  </>
                )}
              </div>

              {/* Contact */}
              <div className="space-y-3">
                {isAuthenticated ? (
                  <>
                    <a
                      href={`tel:${listing.phone.replace(/\s/g, "")}`}
                      className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-black bg-blue-100 px-5 py-3 text-lg font-bold shadow-[var(--shadow-secondary)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
                    >
                      <Phone className="h-5 w-5" /> {listing.phone}
                    </a>

                    {/* Social links */}
                    <div className="flex justify-center gap-8 py-2">
                      {listing.zalo ? (
                        <a
                          href={`https://zalo.me/${listing.zalo.replace(/\s/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="icon-wiggle flex items-center gap-2 font-bold text-zinc-700 hover:text-black transition-colors"
                        >
                          <MessageCircle className="h-5 w-5" /> Zalo
                        </a>
                      ) : (
                        <span className="flex items-center gap-2 font-bold text-zinc-300">
                          <MessageCircle className="h-5 w-5" /> Zalo
                        </span>
                      )}
                      {listing.facebook ? (
                        <a
                          href={listing.facebook.startsWith('http') ? listing.facebook : `https://facebook.com/${listing.facebook}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="icon-wiggle flex items-center gap-2 font-bold text-zinc-700 hover:text-black transition-colors"
                        >
                          <Facebook className="h-5 w-5" /> Facebook
                        </a>
                      ) : (
                        <span className="flex items-center gap-2 font-bold text-zinc-300">
                          <Facebook className="h-5 w-5" /> Facebook
                        </span>
                      )}
                      {listing.instagram ? (
                        <a
                          href={listing.instagram.startsWith('http') ? listing.instagram : `https://instagram.com/${listing.instagram}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="icon-wiggle flex items-center gap-2 font-bold text-zinc-700 hover:text-black transition-colors"
                        >
                          <Instagram className="h-5 w-5" /> Instagram
                        </a>
                      ) : (
                        <span className="flex items-center gap-2 font-bold text-zinc-300">
                          <Instagram className="h-5 w-5" /> Instagram
                        </span>
                      )}
                    </div>

                  </>
                ) : (
                  <Link
                    href={`/auth?returnUrl=/roommate/listing/${id}`}
                    className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-black bg-blue-100 px-5 py-3 font-bold shadow-[var(--shadow-secondary)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
                  >
                    <Lock className="h-5 w-5" /> Đăng nhập để xem liên hệ
                  </Link>
                )}

                {/* Warning - always visible */}
                <p className="text-xs text-center text-zinc-400 pt-2">
                  roomieVerse không chịu trách nhiệm cho các giao dịch giữa người dùng.
                </p>
              </div>

              {/* Actions */}
              <div className="flex justify-center gap-8 pt-3 border-t border-zinc-200">
                <button
                  onClick={toggleFavorite}
                  className={`icon-wiggle flex items-center gap-2 font-bold transition-colors ${isFavorited ? 'text-pink-500' : 'text-zinc-700 hover:text-black'}`}
                >
                  <Heart className={`h-5 w-5 ${isFavorited ? 'fill-current' : ''}`} />
                  {isFavorited ? 'Đã lưu' : 'Lưu'}
                </button>
                <button
                  onClick={() => setShowReportModal(true)}
                  className="icon-wiggle flex items-center gap-2 font-bold text-zinc-700 hover:text-red-500 transition-colors"
                >
                  <Flag className="h-5 w-5" /> Báo cáo
                </button>
              </div>

              {/* Ad Placeholder */}
              <div className="mt-5 p-4 rounded-lg border-2 border-dashed border-zinc-300 bg-zinc-50 text-center">
                <p className="text-xs text-zinc-400 mb-2">Quảng cáo</p>
                {/* Google AdSense code goes here */}
                <div className="h-[250px] flex items-center justify-center text-zinc-300 text-sm">
                  Google Ads
                </div>
              </div>

              {/* Similar Listings */}
              {similarListings.length > 0 && (
                <div className="pt-5 border-t border-zinc-200">
                  <h3 className="text-sm font-bold text-zinc-500 mb-3">Tin tương tự</h3>
                  <div className="space-y-3">
                    {similarListings.map((item) => (
                      <Link
                        key={item.id}
                        href={`/roommate/listing/${item.id}`}
                        className="block p-3 rounded-lg border-2 border-black bg-white hover:bg-blue-50 transition-colors"
                      >
                        <p className="font-bold text-sm line-clamp-2 mb-1">{item.title}</p>
                        <div className="flex items-center justify-between text-xs text-zinc-500">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {item.district || item.city || "Chưa rõ"}
                          </span>
                          <span className="font-bold text-blue-600">{formatPrice(item.price)}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

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

