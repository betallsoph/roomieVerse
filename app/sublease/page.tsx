"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getListingsByCategory } from "../data/listings";
import { RoomListing } from "../data/types";
import MainHeader from "../components/MainHeader";
import ShareFooter from "../components/ShareFooter";
import ListingCard from "../components/ListingCard";
import ProfileReminderModal from "../components/ProfileReminderModal";
import { useProfileReminder } from "../hooks/useProfileReminder";
import { useAdminRedirect } from "../hooks/useAdminRedirect";
import { Home, Loader2, ArrowRightLeft } from "lucide-react";

export default function SubleasePage() {
  useAdminRedirect();
  const [listings, setListings] = useState<RoomListing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { showReminder, dismissReminder } = useProfileReminder();

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const data = await getListingsByCategory("sublease");
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
      <section className="bg-emerald-50 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="mb-4 text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl text-green-800">
            Phòng sang lại
          </h1>
          <p className="mb-8 max-w-3xl text-sm sm:text-base text-zinc-700">
            Sang nhượng phòng trọ, chuyển hợp đồng — dành cho người cần chuyển đi và người đang tìm phòng sẵn
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/sublease/create"
              className="flex items-center gap-2 rounded-lg border-2 border-black bg-emerald-300 px-6 py-3 text-sm font-bold shadow-[2px_2px_0_0_#000] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
            >
              <ArrowRightLeft className="w-4 h-4" />
              Đăng sang lại phòng
            </Link>
          </div>
        </div>
      </section>

      {/* Blur transition */}
      <div className="h-8 bg-gradient-to-b from-emerald-50 to-white" />

      <div className="mx-auto max-w-7xl px-6 pb-16">
        {/* Listings */}
        <div>
          <div className="mb-8 space-y-2">
            <span className="text-sm font-medium text-zinc-600">
              {listings.length} tin đăng
            </span>
            <h2 className="text-2xl font-bold">Phòng đang sang lại</h2>
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
              <p className="text-lg font-bold text-zinc-500">Chưa có phòng sang lại nào</p>
              <p className="mt-2 text-sm text-zinc-400 mb-6">
                Bạn cần sang lại phòng cho người khác?
              </p>
              <Link
                href="/sublease/create"
                className="inline-flex items-center gap-2 rounded-lg border-2 border-black bg-emerald-300 px-6 py-3 text-sm font-bold shadow-[2px_2px_0_0_#000]"
              >
                Đăng tin ngay
              </Link>
            </div>
          )}

          {/* Listings grid */}
          {!isLoading && listings.length > 0 && (
            <div className="grid gap-3 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
              {listings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} variant="green" />
              ))}
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="my-16 border-t-2 border-black" />

        {/* CTA Section */}
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-xl border-2 border-black bg-emerald-50 p-8">
            <h3 className="text-xl font-bold mb-3">Cần sang lại phòng?</h3>
            <p className="text-sm text-zinc-600 mb-6">
              Đăng tin để tìm người thế chỗ nhanh chóng, chuyển hợp đồng thuê dễ dàng
            </p>
            <Link
              href="/sublease/create"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-black bg-emerald-300 px-6 py-3 text-sm font-bold shadow-[2px_2px_0_0_#000] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
            >
              Đăng tin sang lại
            </Link>
          </div>
          <div className="rounded-xl border-2 border-black bg-blue-50 p-8">
            <h3 className="text-xl font-bold mb-3">Tìm phòng mới?</h3>
            <p className="text-sm text-zinc-600 mb-6">
              Xem phòng cho thuê dài hạn hoặc tìm bạn ở chung
            </p>
            <Link
              href="/roomshare"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-black bg-blue-300 px-6 py-3 text-sm font-bold shadow-[2px_2px_0_0_#000] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
            >
              Tìm phòng share
            </Link>
          </div>
        </div>
      </div>

      <ShareFooter />
    </div>
  );
}
