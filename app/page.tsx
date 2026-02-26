"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { SparklesText } from "./components/sparkles-text";
import MainHeader from "./components/MainHeader";
import ShareFooter from "./components/ShareFooter";
import ProfileReminderModal from "./components/ProfileReminderModal";
import { useProfileReminder } from "./hooks/useProfileReminder";
import { useAdminRedirect } from "./hooks/useAdminRedirect";
import { getListings } from "./data/listings";
import { RoomListing } from "./data/types";
import { formatPrice } from "./lib/format";

function getListingRoute(listing: RoomListing) {
  const id = String(listing.id);
  if (listing.category === "roomshare") return `/roomshare/listing/${id}`;
  if (listing.category === "short-term") return `/short-term/listing/${id}`;
  if (listing.category === "sublease") return `/sublease/listing/${id}`;
  return `/roommate/listing/${id}`;
}

function getCategoryInfo(listing: RoomListing) {
  if (listing.category === "roomshare")
    return { label: "Tìm phòng", pill: "bg-pink-100 text-pink-700", price: "text-pink-700", accent: "bg-pink-400" };
  if (listing.category === "sublease")
    return { label: "Sang lại", pill: "bg-orange-100 text-orange-700", price: "text-orange-700", accent: "bg-orange-400" };
  if (listing.category === "short-term")
    return { label: "Ngắn ngày", pill: "bg-yellow-100 text-yellow-700", price: "text-yellow-700", accent: "bg-yellow-400" };
  if (listing.roommateType === "find-partner")
    return { label: "Tìm bạn ở ghép", pill: "bg-purple-100 text-purple-700", price: "text-purple-700", accent: "bg-purple-400" };
  return { label: "Có phòng sẵn", pill: "bg-blue-100 text-blue-700", price: "text-blue-700", accent: "bg-blue-400" };
}

export default function LandingPage() {
  useAdminRedirect();
  const { showReminder, dismissReminder } = useProfileReminder();

  // Fetch latest listings from Firestore
  const [latestListings, setLatestListings] = useState<RoomListing[]>([]);

  useEffect(() => {
    getListings().then(all => setLatestListings(all.slice(0, 8))).catch(() => {});
  }, []);

  // Carousel state
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll, { passive: true });
    checkScroll();
    return () => el.removeEventListener("scroll", checkScroll);
  }, [checkScroll]);

  // Auto-scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const interval = setInterval(() => {
      if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 10) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: 300, behavior: "smooth" });
      }
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -300 : 300, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white">
      <MainHeader />

      {/* Profile Reminder Modal */}
      <ProfileReminderModal isOpen={showReminder} onClose={dismissReminder} />

      {/* Hero Section */}
      <section className="section bg-blue-50 py-12 sm:py-24 md:py-32">
        <div className="wrapper text-center">
          <h1 className="mb-6 sm:mb-8 font-bold leading-tight text-black">
            Không chỉ là tìm phòng...
            <br className="hidden min-[500px]:block" />
            Mà còn là{" "}
            <SparklesText
              className="font-bold"
              sparklesCount={15}
              colors={{ first: "#9E7AFF", second: "#FE8BBB" }}
            >
              tìm người đồng hành.
            </SparklesText>
          </h1>

          <p className="mb-8 sm:mb-10 text-base sm:text-lg md:text-2xl font-medium text-zinc-600 max-w-3xl mx-auto">
            Nơi lý tưởng để tìm người ở ghép, tìm phòng trống...
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <a
              href="#cta-section"
              className="btn-primary text-center w-full sm:w-[200px]"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('cta-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Bắt đầu tìm ngay
            </a>
            <a
              href="#how-it-works"
              className="btn-secondary text-center w-full sm:w-[200px]"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Khám phá thêm
            </a>
          </div>
        </div>
      </section>

      {/* Tin nổi bật Carousel */}
      <section className="section border-t-2 border-black bg-white py-12 sm:py-16 md:py-20 overflow-hidden">
        <div className="wrapper">
          {/* Section header */}
          <div className="mb-8 sm:mb-10 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold sm:text-4xl md:text-5xl">
                Tin mới nhất
              </h2>
              <p className="mt-1 sm:mt-2 text-xs sm:text-sm font-medium text-zinc-500">
                Những tin đăng vừa được cập nhật
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                className="w-10 h-10 rounded-full border-2 border-black bg-white flex items-center justify-center hover:bg-blue-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Cuộn trái"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                className="w-10 h-10 rounded-full border-2 border-black bg-white flex items-center justify-center hover:bg-blue-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Cuộn phải"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Scrollable row */}
          {latestListings.length > 0 ? (
            <div
              ref={scrollRef}
              className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {latestListings.map((listing) => {
                const cat = getCategoryInfo(listing);
                return (
                  <Link
                    key={listing.id}
                    href={getListingRoute(listing)}
                    className="flex-shrink-0 w-[220px] sm:w-[280px] snap-start group"
                  >
                    <div className="h-[220px] sm:h-[240px] rounded-xl border-2 border-black bg-white overflow-hidden card-bounce flex flex-col">
                      <div className="flex-1 p-4 flex flex-col">
                        <span className={`self-start text-[11px] font-bold px-2.5 py-0.5 rounded-full ${cat.pill} mb-2`}>
                          {cat.label}
                        </span>
                        <h3 className="font-bold text-sm leading-snug line-clamp-2 mb-auto">
                          {listing.title}
                        </h3>
                        <div className="mt-3 space-y-1.5">
                          <p className="flex items-center gap-1.5 text-xs text-zinc-500 truncate">
                            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                            {listing.location}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className={`text-base font-bold ${cat.price}`}>
                              {formatPrice(listing.price)}
                            </span>
                            <span className="text-[11px] text-zinc-400">
                              {listing.postedDate}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}

              {/* View All CTA */}
              <Link
                href="/roommate"
                className="flex-shrink-0 w-[220px] sm:w-[280px] snap-start"
              >
                <div className="h-[220px] sm:h-[240px] rounded-xl border-2 border-dashed border-zinc-300 bg-zinc-50 flex flex-col items-center justify-center text-center hover:border-blue-400 hover:bg-blue-50 transition-all duration-200">
                  <div className="w-12 h-12 rounded-full border-2 border-black bg-blue-100 flex items-center justify-center mb-3">
                    <ChevronRight className="w-5 h-5 text-blue-700" />
                  </div>
                  <h3 className="font-bold text-sm mb-0.5">Xem tất cả</h3>
                  <p className="text-xs text-zinc-500">Khám phá thêm tin đăng</p>
                </div>
              </Link>
            </div>
          ) : (
            <div className="rounded-xl border-2 border-dashed border-zinc-300 bg-zinc-50 py-12 text-center">
              <p className="text-zinc-400 font-medium">Chưa có tin đăng nào</p>
              <Link href="/roommate/create" className="text-sm text-blue-600 font-bold hover:underline mt-2 inline-block">
                Đăng tin đầu tiên
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="section border-t-2 border-black bg-white py-12 sm:py-16 md:py-20">
        <div className="wrapper">
          <h2 className="mb-8 sm:mb-12 text-center text-2xl font-bold uppercase sm:text-4xl md:text-5xl">
            Cách hoạt động
          </h2>

          <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
            <div className="card group bg-pink-200">
              <span className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-black bg-blue-300 text-2xl font-bold">
                01
              </span>
              <h3 className="mb-3 mt-4 text-xl font-bold sm:text-2xl">
                Đăng ký tài khoản
              </h3>
              <p className="mb-4 text-sm font-medium leading-relaxed text-zinc-700 sm:text-base">
                Tạo tài khoản miễn phí chỉ với email. Hoặc đăng nhập dễ dàng bằng Google và số điện thoại.
              </p>
              <div className="inline-block rounded-lg border-2 border-black bg-white px-3 py-1.5 text-sm font-bold">
                ⏱ 1 phút
              </div>
            </div>

            <div className="card group bg-pink-200">
              <span className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-black bg-pink-300 text-2xl font-bold">
                02
              </span>
              <h3 className="mb-3 mt-4 text-xl font-bold sm:text-2xl">
                Tìm phòng hoặc bạn ghép
              </h3>
              <p className="mb-4 text-sm font-medium leading-relaxed text-zinc-700 sm:text-base">
                Đa dạng lựa chọn từ tin đăng có sẵn từ các bạn khác, hoặc đăng bài tìm nếu chưa có ai phù hợp.
              </p>
              <div className="inline-block rounded-lg border-2 border-black bg-white px-3 py-1.5 text-sm font-bold">
                ⏱ 5 phút
              </div>
            </div>

            <div className="card group bg-purple-200">
              <span className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-black bg-blue-300 text-2xl font-bold">
                03
              </span>
              <h3 className="mb-3 mt-4 text-xl font-bold sm:text-2xl">
                Liên hệ người quan tâm
              </h3>
              <p className="mb-4 text-sm font-medium leading-relaxed text-zinc-700 sm:text-base">
                Nhận liên hệ từ người quan tâm hoặc ngược lại. Trao đổi trực tiếp.
              </p>
              <div className="inline-block rounded-lg border-2 border-black bg-white px-3 py-1.5 text-sm font-bold">
                ⏱ Ngay lập tức
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-choose-us" className="section bg-blue-50 py-12 sm:py-16 md:py-20 relative before:absolute before:top-0 before:left-0 before:right-0 before:h-20 before:bg-gradient-to-b before:from-white before:to-transparent before:pointer-events-none">
        <div className="wrapper">
          <h2 className="mb-8 text-center text-2xl font-bold uppercase sm:mb-12 sm:text-4xl md:mb-16 md:text-5xl">
            Tại sao chọn chúng tôi?
          </h2>

          <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
            <div className="card group bg-white">
              <div className="mb-4 transition-transform duration-300 group-hover:scale-110">
                <Image
                  src="/assets/easymatch.png"
                  alt="Match chính xác"
                  width={100}
                  height={100}
                  className="h-25 w-25"
                />
              </div>
              <h3 className="mb-3 text-xl font-bold sm:text-2xl">
                Match chính xác.
                <br />
                <span className="text-blue-400">Nhanh chóng.</span>
              </h3>
              <p className="text-sm font-medium leading-relaxed text-zinc-600 sm:text-base">
                Dễ dàng kiếm được người thật sự phù hợp với bạn thông qua các thông tin về lối sống, thói quen...
              </p>
            </div>

            <div className="card group bg-white">
              <div className="mb-4 transition-transform duration-300 group-hover:scale-110">
                <Image
                  src="/assets/verify.png"
                  alt="Cộng đồng được chọn lọc"
                  width={100}
                  height={100}
                  className="h-25 w-25"
                />
              </div>
              <h3 className="mb-3 text-xl font-bold sm:text-2xl">
                Cộng đồng
                <br />
                <span className="text-purple-500">được chọn lọc.</span>
              </h3>
              <p className="text-sm font-medium leading-relaxed text-zinc-600 sm:text-base">
                Mọi thành viên đều được xác minh, ưu tiên chính chủ. Kết nối trực tiếp - không trung gian.
              </p>
            </div>

            <div className="card group bg-white">
              <div className="mb-4 transition-transform duration-300 group-hover:scale-110">
                <Image
                  src="/assets/simple.png"
                  alt="Đơn giản dễ dàng"
                  width={100}
                  height={100}
                  className="h-25 w-25"
                />
              </div>
              <h3 className="mb-3 text-xl font-bold sm:text-2xl">
                Đơn giản.
                <br />
                <span className="text-pink-500">Dễ dàng.</span>
              </h3>
              <p className="text-sm font-medium leading-relaxed text-zinc-600 sm:text-base">
                Tạo hồ sơ trong 5 phút. Kết nối trong 24-48 giờ. Zero đồng cho 2 bài đăng đầu tiên.
              </p>
            </div>
          </div>

          {/* Learn more button */}
          <div className="mt-10 text-center">
            <Link
              href="/about"
              className="btn-secondary"
            >
              Tìm hiểu thêm về roomieVerse
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta-section" className="section border-t-2 border-black py-12 sm:py-16 md:py-20">
        <div className="wrapper">
          <div className="card bg-gradient-to-br from-blue-300 to-blue-400 p-6 text-center sm:p-12 lg:p-16">
            <h2 className="mb-4 text-2xl font-black uppercase sm:mb-6 sm:text-4xl md:text-5xl">
              Bạn đang tìm gì?
            </h2>
            <p className="mb-6 text-sm font-bold sm:mb-10 sm:text-lg md:text-xl">
              Chọn mục đích phù hợp với bạn
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              <Link
                href="/roommate"
                className="btn-primary text-sm sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto sm:min-w-[200px]"
              >
                Tìm roommate
              </Link>
              <Link
                href="/roomshare"
                className="btn-pink text-sm sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto sm:min-w-[200px]"
              >
                Tìm phòng
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ShareFooter />
    </div>
  );
}
