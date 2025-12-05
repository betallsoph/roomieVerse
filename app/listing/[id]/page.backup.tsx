import Link from "next/link";
import Image from "next/image";

// Mock data - sau này sẽ fetch từ database theo ID
const mockListingDetails = {
  "listing-1": {
    id: "listing-1",
    title: "Tìm bạn ở ghép loft Quận 3",
    budget: "11.5m / người",
    area: "Quận 3, TP.HCM",
    moveInDate: "15/12/2024",
    description:
      "Không gian có phòng làm việc riêng, ưu tiên người đi làm văn phòng nhưng thoải mái remote 2 ngày/tuần. Phòng full nội thất.",
    fullDescription: `Căn loft rộng rãi tại Quận 3, thiết kế hiện đại và thoáng mát. 
    
    🏠 Thông tin phòng:
    - Diện tích: 80m2
    - 2 phòng ngủ + 1 phòng làm việc chung
    - 2 toilet riêng biệt
    - Bếp đầy đủ thiết bị
    - Ban công rộng view đẹp
    
    🛋️ Nội thất:
    - Giường, tủ quần áo trong phòng ngủ
    - Máy lạnh, máy nước nóng
    - Tủ lạnh, máy giặt, lò vi sóng
    - Bàn làm việc riêng
    - Sofa, TV chung
    
    📍 Vị trí:
    - 5 phút đến Big C Điện Biên Phủ
    - 10 phút đến Công viên Tao Đàn
    - Gần nhiều quán ăn, cafe
    - Dễ dàng di chuyển đi Q1, Bình Thạnh
    
    👤 Tìm người:
    - Nam/Nữ đều được
    - 23-30 tuổi
    - Có công việc ổn định
    - Sạch sẽ, gọn gàng
    - Tôn trọng không gian chung`,
    phone: "0901 234 567",
    postedBy: "Minh Anh",
    postedDate: "2 ngày trước",
    images: [
      "/placeholder-room.jpg",
      "/placeholder-room.jpg",
      "/placeholder-room.jpg",
    ],
    amenities: ["Máy lạnh", "Máy giặt", "Tủ lạnh", "Wifi", "Bếp", "Ban công"],
    rules: ["Không hút thuốc trong nhà", "Không nuôi thú cưng", "Giữ vệ sinh chung"],
  },
  "1": {
    id: "1",
    title: "Tìm bạn nữ share căn 2PN ở Bình Thạnh",
    budget: "4.5 triệu",
    area: "Bình Thạnh, gần Điện Biên Phủ",
    moveInDate: "01/12/2024",
    description: "Phòng mới sạch sẽ, có máy lạnh, tủ lạnh chung. Mình làm remote nên thường ở nhà, thích người sạch sẽ, không ồn.",
    fullDescription: `Căn hộ 2 phòng ngủ tại Bình Thạnh, gần Điện Biên Phủ.
    
    🏠 Chi tiết:
    - Diện tích: 60m2
    - 2 phòng ngủ riêng biệt
    - 1 phòng tắm chung
    - Phòng khách + bếp
    
    🛋️ Tiện nghi:
    - Máy lạnh mỗi phòng
    - Tủ lạnh, máy giặt
    - Wifi tốc độ cao
    - Giường, tủ đồ riêng`,
    phone: "0901 234 567",
    postedBy: "Minh Anh",
    postedDate: "2 ngày trước",
    images: ["/placeholder-room.jpg"],
    amenities: ["Máy lạnh", "Máy giặt", "Tủ lạnh", "Wifi"],
    rules: ["Chỉ nữ", "Không hút thuốc"],
  },
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ListingDetailPage({ params }: PageProps) {
  const { id } = await params;
  const listing = mockListingDetails[id as keyof typeof mockListingDetails];

  if (!listing) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="rounded-xl border-2 border-black bg-white p-16 text-center shadow-[var(--shadow-secondary)]">
          <h1 className="mb-6 text-3xl font-bold">
            Không tìm thấy bài đăng
          </h1>
          <Link href="/home" className="btn-primary">
            Quay lại trang chủ
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Header */}
        <header className="mb-16 rounded-xl border-2 border-black bg-white px-8 py-5 shadow-[var(--shadow-secondary)]">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <Link href="/" className="flex items-center">
              <Image
                src="/rommieversepinkword.png"
                alt="roomieVerse"
                width={160}
                height={50}
                className="h-auto w-auto"
                priority
              />
            </Link>
            <nav className="flex flex-wrap items-center gap-6 text-sm font-medium">
              <Link href="/home" className="text-zinc-600 transition hover:text-black">
                ← Quay lại
              </Link>
              <Link href="/roommate" className="btn-primary">
                Đăng bài mới
              </Link>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <div className="grid gap-12 lg:grid-cols-[2fr_1fr]">
          {/* Left Column - Details */}
          <div className="space-y-8">
            {/* Image Gallery */}
            <div className="overflow-hidden rounded-xl border-2 border-black shadow-[var(--shadow-secondary)]">
              <div 
                className="flex h-96 w-full items-center justify-center bg-blue-50 text-9xl"
              >
                🏠
              </div>
              {/* Later: add image carousel */}
            </div>

            {/* Title & Basic Info */}
            <div className="rounded-xl border-2 border-black bg-white p-8 shadow-[var(--shadow-secondary)]">
              <div className="mb-6 flex items-start justify-between gap-4">
                <h1 className="text-3xl font-bold">
                  {listing.title}
                </h1>
                <div className="whitespace-nowrap rounded-lg border-2 border-black bg-blue-300 px-6 py-3 text-xl font-bold shadow-[var(--shadow-secondary)]">
                  {listing.budget}
                </div>
              </div>

              <div className="flex flex-wrap gap-6 text-sm text-zinc-600">
                <span className="flex items-center gap-1">📍 {listing.area}</span>
                <span className="flex items-center gap-1">📅 Dọn vào: {listing.moveInDate}</span>
                <span className="flex items-center gap-1">⏰ Đăng {listing.postedDate}</span>
              </div>
            </div>

            {/* Full Description */}
            <div className="rounded-xl border-2 border-black bg-white p-8 shadow-[var(--shadow-secondary)]">
              <h2 className="mb-6 text-2xl font-bold">
                Mô tả chi tiết
              </h2>
              <div className="prose max-w-none">
                <p className="whitespace-pre-line text-sm leading-relaxed text-zinc-700">
                  {listing.fullDescription}
                </p>
              </div>
            </div>

            {/* Amenities */}
            <div className="rounded-xl border-2 border-black bg-white p-8 shadow-[var(--shadow-secondary)]">
              <h2 className="mb-6 text-2xl font-bold">
                Tiện nghi
              </h2>
              <div className="flex flex-wrap gap-3">
                {listing.amenities.map((amenity) => (
                  <span 
                    key={amenity}
                    className="rounded-lg border-2 border-black bg-blue-300 px-4 py-2 text-sm font-bold"
                  >
                    ✓ {amenity}
                  </span>
                ))}
              </div>
            </div>

            {/* Rules */}
            <div className="rounded-xl border-2 border-black bg-white p-8 shadow-[var(--shadow-secondary)]">
              <h2 className="mb-6 text-2xl font-bold">
                Quy định
              </h2>
              <ul className="space-y-3">
                {listing.rules.map((rule, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm text-zinc-700">
                    <span className="text-blue-400">•</span>
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column - Contact */}
          <div className="space-y-8">
            {/* Contact Card */}
            <div className="sticky top-24 rounded-xl border-2 border-black bg-gradient-to-br from-blue-100 to-blue-200 p-8 shadow-[var(--shadow-primary)]">
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-zinc-600">Liên hệ</p>
                <h3 className="mb-6 text-2xl font-bold">
                  {listing.postedBy}
                </h3>
                
                
                <a
                  href={`tel:${listing.phone.replace(/\s/g, '')}`}
                  className="mb-4 block w-full rounded-lg border-2 border-black bg-blue-300 px-6 py-4 text-center text-lg font-bold shadow-[var(--shadow-secondary)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
                >
                  📞 {listing.phone}
                </a>

                <button
                  className="mb-6 block w-full rounded-lg border-2 border-black bg-white px-6 py-3 text-center font-medium transition-all hover:bg-zinc-50"
                >
                  💬 Nhắn tin
                </button>

                <p className="text-xs leading-relaxed text-zinc-700">
                  ⚠️ Lưu ý: Hãy cẩn thận với các giao dịch tiền mặt. Chỉ chuyển tiền sau khi đã xem phòng.
                </p>
              </div>
            </div>

            {/* Share Card */}
            <div className="rounded-xl border-2 border-black bg-white p-6 shadow-[var(--shadow-secondary)]">
              <h3 className="mb-4 text-lg font-bold">
                Chia sẻ bài đăng
              </h3>
              <div className="flex gap-3">
                <button className="btn-secondary flex-1 text-sm">
                  Facebook
                </button>
                <button className="btn-secondary flex-1 text-sm">
                  Copy link
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
