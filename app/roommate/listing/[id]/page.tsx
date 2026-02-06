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
  ChevronRight
} from "lucide-react";
import MainHeader from "../../../components/MainHeader";
import ShareFooter from "../../../components/ShareFooter";
import ReportModal from "../../../components/ReportModal";
import { getListingById } from "../../../data/listings";
import { RoomListing } from "../../../data/types";
import { useAuth } from "../../../contexts/AuthContext";

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

export default function RoommateListingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { isAuthenticated } = useAuth();
  const [listing, setListing] = useState<RoomListing | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorited, setIsFavorited] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Fetch listing data
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const data = await getListingById(id);
      // Verify this is a roommate listing
      if (data && data.category !== "roommate") {
        // Redirect to correct route
        router.replace(`/roomshare/listing/${id}`);
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

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">

          {/* Left Column - Details */}
          <div className="space-y-8">
            {/* Image Gallery - only for have-room */}
            {isHaveRoom && (
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
            )}

            {/* Main Info Card */}
            <div className="rounded-xl border-2 border-black bg-white shadow-[var(--shadow-secondary)] overflow-hidden">
              {/* Price Header */}
              <div className="bg-blue-50 p-6 border-b-2 border-black">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-zinc-700 mb-1">
                      {isHaveRoom ? "Tiền thuê phòng" : "Ngân sách"}
                    </p>
                    <p className="text-3xl sm:text-4xl font-extrabold text-blue-600">{listing.price}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-zinc-700 mb-1">Đăng bởi</p>
                    <p className="text-xl font-bold flex items-center justify-end gap-2">
                      <User className="h-5 w-5" /> {listing.author}
                    </p>
                  </div>
                </div>
              </div>


              {/* Address Section */}
              <div className="p-6 border-b-2 border-black">
                <h3 className="mb-4 text-sm font-bold text-zinc-500">
                  {isHaveRoom ? "Địa chỉ" : "Khu vực mong muốn"}
                </h3>
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
                  {/* Fallback to old location field if new fields are empty */}
                  {!listing.city && !listing.district && !listing.specificAddress && listing.location && (
                    <div className="col-span-2">
                      <p className="text-zinc-500 mb-1">Địa chỉ</p>
                      <p className="font-semibold text-blue-700">{listing.location}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Room Info Section - only for have-room */}
              {isHaveRoom && (
                <div className="p-6 border-b-2 border-black">
                  <h3 className="mb-4 text-sm font-bold text-zinc-500">Thông tin phòng</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4 text-sm">
                    {/* 1. Loại hình */}
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

                    {/* 2. Diện tích */}
                    <div>
                      <p className="text-zinc-500 mb-1">Diện tích</p>
                      <p className="font-semibold text-blue-700">{listing.roomSize ? `${listing.roomSize} m²` : "---"}</p>
                    </div>

                    {/* 3. Số người đang ở */}
                    <div>
                      <p className="text-zinc-500 mb-1">Số người đang ở</p>
                      <p className="font-semibold text-blue-700">{listing.currentOccupants || "---"}</p>
                    </div>

                    {/* 4. Dọn vào */}
                    <div>
                      <p className="text-zinc-500 mb-1">Dọn vào</p>
                      <p className="font-semibold text-blue-700">{listing.moveInDate || "---"}</p>
                    </div>

                    {/* 5. Hợp đồng tối thiểu */}
                    <div>
                      <p className="text-zinc-500 mb-1">Hợp đồng tối thiểu</p>
                      <p className="font-semibold text-blue-700">{listing.minContractDuration || "---"}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Find Partner Info Section - only for find-partner */}
              {!isHaveRoom && (
                <div className="p-6 border-b-2 border-black">
                  <h3 className="mb-4 text-sm font-bold text-zinc-500">Thông tin tìm kiếm</h3>
                  <div className="grid grid-cols-2 gap-y-6 gap-x-4 text-sm">
                    {/* Loại hình mong muốn */}
                    {listing.propertyTypes && listing.propertyTypes.length > 0 && (
                      <div>
                        <p className="text-zinc-500 mb-1">Loại hình mong muốn</p>
                        <p className="font-semibold text-blue-700">
                          {listing.propertyTypes.map((type, idx) => (
                            <span key={type}>
                              {type === "house" && "Nhà mặt đất"}
                              {type === "room" && "Trọ"}
                              {type === "apartment" && "Chung cư"}
                              {type === "service-apartment" && "Căn hộ dịch vụ"}
                              {type === "dormitory" && "Ký túc xá"}
                              {type === "other" && "Loại hình khác"}
                              {idx < listing.propertyTypes!.length - 1 && ", "}
                            </span>
                          ))}
                        </p>
                      </div>
                    )}

                    {/* Thời gian mong muốn */}
                    {listing.moveInDate && (
                      <div>
                        <p className="text-zinc-500 mb-1">Thời gian mong muốn</p>
                        <p className="font-semibold text-blue-700">{listing.moveInDate}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Amenities - only for have-room */}
              {isHaveRoom && (
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
              )}
            </div>

            {/* Introduction Card - Separate */}
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
                    <Users className="h-5 w-5" /> {isHaveRoom ? "Mong muốn đối với bạn ở cùng" : "Mong muốn đối với bạn cùng thuê"}
                  </h2>
                </div>
                <div className="p-6 grid gap-4 sm:grid-cols-2">
                  {/* Gender */}
                  {listing.preferences.gender && listing.preferences.gender.length > 0 && (
                    <div>
                      <p className="text-sm text-zinc-500 mb-1">Giới tính</p>
                      <p className="font-semibold text-blue-700">
                        {listing.preferences.gender.map(v => preferenceLabels.gender[v] || v).join(", ")}
                      </p>
                    </div>
                  )}
                  {/* Status */}
                  {listing.preferences.status && listing.preferences.status.length > 0 && (
                    <div>
                      <p className="text-sm text-zinc-500 mb-1">Tình trạng</p>
                      <p className="font-semibold text-blue-700">
                        {listing.preferences.status.map(v => preferenceLabels.status[v] || v).join(", ")}
                        {listing.preferences.statusOther && ` (${listing.preferences.statusOther})`}
                      </p>
                    </div>
                  )}
                  {/* Schedule */}
                  {listing.preferences.schedule && listing.preferences.schedule.length > 0 && (
                    <div>
                      <p className="text-sm text-zinc-500 mb-1">Giờ giấc</p>
                      <p className="font-semibold text-blue-700">
                        {listing.preferences.schedule.map(v => preferenceLabels.schedule[v] || v).join(", ")}
                      </p>
                    </div>
                  )}
                  {/* Cleanliness */}
                  {listing.preferences.cleanliness && listing.preferences.cleanliness.length > 0 && (
                    <div>
                      <p className="text-sm text-zinc-500 mb-1">Mức độ sạch sẽ</p>
                      <p className="font-semibold text-blue-700">
                        {listing.preferences.cleanliness.map(v => preferenceLabels.cleanliness[v] || v).join(", ")}
                      </p>
                    </div>
                  )}
                  {/* Habits */}
                  {listing.preferences.habits && listing.preferences.habits.length > 0 && (
                    <div>
                      <p className="text-sm text-zinc-500 mb-1">Thói quen</p>
                      <p className="font-semibold text-blue-700">
                        {listing.preferences.habits.map(v => preferenceLabels.habits[v] || v).join(", ")}
                      </p>
                    </div>
                  )}
                  {/* Pets */}
                  {listing.preferences.pets && listing.preferences.pets.length > 0 && (
                    <div>
                      <p className="text-sm text-zinc-500 mb-1">Thú cưng</p>
                      <p className="font-semibold text-blue-700">
                        {listing.preferences.pets.map(v => preferenceLabels.pets[v] || v).join(", ")}
                      </p>
                    </div>
                  )}
                  {/* Move-in Time */}
                  {listing.preferences.moveInTime && listing.preferences.moveInTime.length > 0 && (
                    <div>
                      <p className="text-sm text-zinc-500 mb-1">
                        {isHaveRoom ? "Thời gian dọn vào" : "Thời gian mong muốn ở cùng"}
                      </p>
                      <p className="font-semibold text-blue-700">
                        {listing.preferences.moveInTime.map(v => preferenceLabels.moveInTime[v] || v).join(", ")}
                      </p>
                    </div>
                  )}
                  {/* Other */}
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
              <h2 className="mb-3 text-lg font-bold flex items-center gap-2">
                <Lightbulb className="h-5 w-5" /> Lưu ý khi liên hệ
              </h2>
              {isHaveRoom ? (
                <ul className="space-y-1.5 text-sm text-zinc-700">
                  <li>• Xem phòng trực tiếp trước khi quyết định</li>
                  <li>• Suy nghĩ kỹ hẳn chuyển cọc</li>
                  <li>• Hỏi rõ các chi phí phát sinh</li>
                </ul>
              ) : (
                <ul className="space-y-1.5 text-sm text-zinc-700">
                  <li>• Trao đổi kỹ về thói quen sinh hoạt</li>
                  <li>• Thống nhất ngân sách và khu vực trước</li>
                  <li>• Gặp mặt trực tiếp để hiểu nhau hơn</li>
                </ul>
              )}
            </div>
          </div>

          {/* Right Column - Contact & Actions */}
          <div className="space-y-4">
            {/* Contact Card - Sticky */}
            <div className="lg:sticky lg:top-32 rounded-xl border-2 border-black bg-blue-50 p-6 shadow-[var(--shadow-secondary)]">
              <h3 className="mb-1 text-sm font-bold uppercase tracking-wider text-zinc-600">
                Liên hệ ngay
              </h3>
              <p className="mb-5 text-xl font-bold">{listing.author}</p>

              {isAuthenticated ? (
                <>
                  <a
                    href={`tel:${listing.phone.replace(/\s/g, "")}`}
                    className="mb-3 flex w-full items-center justify-center gap-2 rounded-lg border-2 border-black bg-white px-5 py-3 text-lg font-bold shadow-[var(--shadow-secondary)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
                  >
                    <Phone className="h-5 w-5" /> {listing.phone}
                  </a>

                  {/* Zalo */}
                  {listing.zalo ? (
                    <a
                      href={`https://zalo.me/${listing.zalo.replace(/\s/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mb-3 flex w-full items-center justify-center gap-2 rounded-lg border-2 border-black bg-white px-5 py-3 font-bold shadow-[var(--shadow-secondary)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
                    >
                      <MessageCircle className="h-5 w-5" /> Zalo
                    </a>
                  ) : (
                    <div className="mb-3 flex w-full items-center justify-center gap-2 rounded-lg border-2 border-zinc-300 bg-zinc-100 px-5 py-3 font-bold text-zinc-400 cursor-not-allowed">
                      <MessageCircle className="h-5 w-5" /> Zalo
                    </div>
                  )}

                  {/* Facebook & Instagram */}
                  <div className="flex gap-3 mb-4">
                    {listing.facebook ? (
                      <a
                        href={listing.facebook.startsWith('http') ? listing.facebook : `https://facebook.com/${listing.facebook}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-1 items-center justify-center gap-2 rounded-lg border-2 border-black bg-white px-5 py-3 font-bold shadow-[var(--shadow-secondary)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
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
                        className="flex flex-1 items-center justify-center gap-2 rounded-lg border-2 border-black bg-white px-5 py-3 font-bold shadow-[var(--shadow-secondary)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
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
                  href={`/auth?returnUrl=/roommate/listing/${id}`}
                  className="mb-4 flex w-full items-center justify-center gap-2 rounded-lg border-2 border-black bg-white px-5 py-3 font-bold shadow-[var(--shadow-secondary)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
                >
                  <Lock className="h-5 w-5" /> Đăng nhập để xem SĐT
                </Link>
              )}

              <p className="text-xs leading-relaxed text-zinc-600 flex items-start gap-1">
                <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                roomieVerse không chịu trách nhiệm cho các giao dịch giữa người dùng.
              </p>

              {/* View User Profile Button */}
              {listing.userId && (
                <Link
                  href={`/user/${listing.userId}`}
                  className="mt-4 flex items-center justify-center gap-2 w-full rounded-lg border-2 border-black bg-purple-100 px-5 py-3 font-bold shadow-[var(--shadow-secondary)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
                >
                  <User className="h-5 w-5" /> Xem hồ sơ người đăng
                </Link>
              )}
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
