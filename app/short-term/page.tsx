"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getListingsByCategory } from "../data/listings";
import { RoomListing } from "../data/types";
import MainHeader from "../components/MainHeader";
import ShareFooter from "../components/ShareFooter";
import ListingCard from "../components/ListingCard";
import ProfileReminderModal from "../components/ProfileReminderModal";
import { useProfileReminder } from "../hooks/useProfileReminder";
import { useAdminRedirect } from "../hooks/useAdminRedirect";
import { Home, MapPin, Calendar, Loader2, Clock } from "lucide-react";

export default function ShortTermPage() {
  useAdminRedirect();
  const router = useRouter();
  const [listings, setListings] = useState<RoomListing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { showReminder, dismissReminder } = useProfileReminder();

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const data = await getListingsByCategory("short-term");
      setListings(data);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <MainHeader />

      {/* Profile Reminder Modal */}
      <ProfileReminderModal isOpen={showReminder} onClose={dismissReminder} />

      {/* Hero Section */}
      <section className="bg-yellow-50 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="mb-4 text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl text-amber-800">
            Phòng ngắn ngày
          </h1>
          <p className="mb-8 max-w-3xl text-sm sm:text-base text-zinc-700">
            Cho thuê phòng theo ngày, tuần cho người cần chỗ ở tạm thời — công tác, du lịch, chờ tìm phòng dài hạn
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/short-term/create"
              className="flex items-center gap-2 rounded-lg border-2 border-black bg-yellow-300 px-6 py-3 text-sm font-bold shadow-[2px_2px_0_0_#000] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
            >
              Đăng cho thuê
            </Link>
          </div>
        </div>
      </section>

      {/* Blur transition */}
      <div className="h-8 bg-gradient-to-b from-yellow-50 to-white" />

      <div className="mx-auto max-w-7xl px-6 pb-16">
        {/* Listings */}
        <div>
          <div className="mb-8 space-y-2">
            <span className="text-sm font-medium text-zinc-600">
              {listings.length} tin đăng
            </span>
            <h2 className="text-2xl font-bold">Phòng cho thuê ngắn ngày</h2>
          </div>

          {/* Loading */}
          {isLoading && (
            <div className="text-center py-16">
              <Loader2 className="w-8 h-8 text-zinc-400 mx-auto mb-3 animate-spin" />
              <p className="text-zinc-500">Đang tải...</p>
            </div>
          )}

          {/* Empty state */}
          {!isLoading && listings.length === 0 && (
            <div className="py-16 text-center bg-zinc-50 rounded-xl border-2 border-dashed border-zinc-200">
              <Home className="mx-auto mb-4 h-16 w-16 text-zinc-300" />
              <p className="text-lg font-bold text-zinc-500">Chưa có phòng ngắn ngày nào</p>
              <p className="mt-2 text-sm text-zinc-400 mb-6">
                Bạn có phòng trống muốn cho thuê ngắn ngày?
              </p>
              <Link
                href="/short-term/create"
                className="inline-flex items-center gap-2 rounded-lg border-2 border-black bg-yellow-300 px-6 py-3 text-sm font-bold shadow-[2px_2px_0_0_#000]"
              >
                Đăng tin ngay
              </Link>
            </div>
          )}

          {/* Listings grid */}
          {!isLoading && listings.length > 0 && (
            <div className="grid gap-3 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
              {listings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} variant="yellow" />
              ))}
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="my-16 border-t-2 border-black" />

        {/* CTA Section */}
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-xl border-2 border-black bg-yellow-50 p-8">
            <h3 className="text-xl font-bold mb-3">Có phòng trống?</h3>
            <p className="text-sm text-zinc-600 mb-6">
              Đăng tin cho thuê phòng ngắn ngày, tiếp cận người cần chỗ ở tạm thời
            </p>
            <Link
              href="/short-term/create"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-black bg-yellow-300 px-6 py-3 text-sm font-bold shadow-[2px_2px_0_0_#000] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
            >
              Đăng tin cho thuê
            </Link>
          </div>
          <div className="rounded-xl border-2 border-black bg-blue-50 p-8">
            <h3 className="text-xl font-bold mb-3">Cần phòng dài hạn?</h3>
            <p className="text-sm text-zinc-600 mb-6">
              Tìm bạn ở cùng hoặc phòng cho thuê lâu dài
            </p>
            <Link
              href="/roommate"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-black bg-blue-300 px-6 py-3 text-sm font-bold shadow-[2px_2px_0_0_#000] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
            >
              Tìm bạn ở chung
            </Link>
          </div>
        </div>
      </div>

      <ShareFooter />
    </div>
  );
}
