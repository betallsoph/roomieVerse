"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getListingsByCategory } from "../data/listings";
import { RoomListing } from "../data/types";
import MainHeader from "../components/MainHeader";
import ShareFooter from "../components/ShareFooter";
import FilterButtons from "../components/FilterButtons";
import ListingCard from "../components/ListingCard";
import SplitCTASection from "../components/SplitCTASection";
import ProfileReminderModal from "../components/ProfileReminderModal";
import PostTypeModal from "../components/PostTypeModal";
import { useProfileReminder } from "../hooks/useProfileReminder";
import { Search, X } from "lucide-react";
import { motion } from "framer-motion";

type FilterMode = "have-room" | "find-partner";

export default function RoommatePage() {
  const [mode, setMode] = useState<FilterMode>("have-room");
  const [listings, setListings] = useState<RoomListing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showPostTypeModal, setShowPostTypeModal] = useState(false);
  const { showReminder, dismissReminder } = useProfileReminder();
  const [showFilter, setShowFilter] = useState(false);
  const [showDistrict, setShowDistrict] = useState(false);
  const [showPrice, setShowPrice] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [bounceKey, setBounceKey] = useState(0);

  // Helper to close all filter panels and trigger bounce
  const closeAllFilters = () => {
    setShowFilter(false);
    setShowDistrict(false);
    setShowPrice(false);
    setShowSearch(false);
  };

  const triggerBounce = () => {
    setBounceKey(prev => prev + 1);
  };

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const data = await getListingsByCategory("roommate");
      setListings(data);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  // Filter listings based on mode
  const allFilteredListings = listings.filter((listing) => {
    return listing.roommateType === mode;
  });

  // Limit to 9 cards
  const displayedListings = allFilteredListings.slice(0, 9);
  const hasMore = allFilteredListings.length > 9;

  const getCTAHeading = () => {
    return mode === "have-room"
      ? "Chưa tìm được người ở cùng?"
      : "Chưa tìm được bạn cùng thuê?";
  };

  return (
    <div className="min-h-screen bg-white">
      <MainHeader />

      {/* Profile Reminder Modal */}
      <ProfileReminderModal isOpen={showReminder} onClose={dismissReminder} />

      {/* Hero Section */}
      <section className="bg-blue-50 pt-12 sm:pt-16 pb-8">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="mb-6 text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl">
            Tìm bạn ở cùng hoặc cùng đi thuê
          </h1>

          <FilterButtons
            mode={mode}
            onModeChange={setMode}
          />

          {/* Filter & Search Section */}
          <div className="mt-10 grid gap-6 md:grid-cols-2 items-stretch">
            {/* Left: Filter & Search Buttons */}
            <div className="space-y-3 min-h-[200px]">
              <p className="text-base font-bold text-blue-800">Bộ lọc nâng cao</p>
              {/* Buttons Row */}
              <div className="flex flex-wrap gap-3">
                <motion.button
                  onClick={() => { closeAllFilters(); setShowFilter(!showFilter); triggerBounce(); }}
                  whileTap={{ scale: 0.85 }}
                  transition={{ duration: 0.1 }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-black text-sm font-bold transition-all ${
                    showFilter ? "bg-blue-300" : "bg-white hover:bg-zinc-50"
                  }`}
                >
                  Khu vực
                </motion.button>
                <motion.button
                  onClick={() => { closeAllFilters(); setShowDistrict(!showDistrict); triggerBounce(); }}
                  whileTap={{ scale: 0.85 }}
                  transition={{ duration: 0.1 }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-black text-sm font-bold transition-all ${
                    showDistrict ? "bg-blue-300" : "bg-white hover:bg-zinc-50"
                  }`}
                >
                  Quận
                </motion.button>
                <motion.button
                  onClick={() => { closeAllFilters(); setShowPrice(!showPrice); triggerBounce(); }}
                  whileTap={{ scale: 0.85 }}
                  transition={{ duration: 0.1 }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-black text-sm font-bold transition-all ${
                    showPrice ? "bg-blue-300" : "bg-white hover:bg-zinc-50"
                  }`}
                >
                  Giá
                </motion.button>
                <motion.button
                  onClick={() => { closeAllFilters(); setShowSearch(!showSearch); triggerBounce(); }}
                  whileTap={{ scale: 0.85 }}
                  transition={{ duration: 0.1 }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-black text-sm font-bold transition-all ${
                    showSearch ? "bg-blue-300" : "bg-white hover:bg-zinc-50"
                  }`}
                >
                  <Search className="h-4 w-4" />
                  Tìm kiếm
                </motion.button>
              </div>

              {/* Expanded Filter - Khu vực */}
              {showFilter && (
                <motion.div
                  key={`filter-${bounceKey}`}
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 700, damping: 30 }}
                  className="p-4 rounded-lg border-2 border-black bg-white h-[120px]"
                >
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-bold">Chọn khu vực</p>
                    <button onClick={() => setShowFilter(false)} className="p-1 hover:bg-zinc-100 rounded">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <motion.button
                      whileTap={{ scale: 0.90 }}
                      transition={{ type: "spring", stiffness: 700, damping: 30 }}
                      className="px-4 py-2 rounded-full border-2 border-black bg-blue-300 text-sm font-bold"
                    >
                      Tất cả
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.90 }}
                      transition={{ type: "spring", stiffness: 700, damping: 30 }}
                      className="px-4 py-2 rounded-full border-2 border-black bg-white text-sm font-medium hover:bg-zinc-50 transition-colors"
                    >
                      TP. Hồ Chí Minh
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.90 }}
                      transition={{ type: "spring", stiffness: 700, damping: 30 }}
                      className="px-4 py-2 rounded-full border-2 border-black bg-white text-sm font-medium hover:bg-zinc-50 transition-colors"
                    >
                      Đà Lạt
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* Expanded Filter - Quận */}
              {showDistrict && (
                <motion.div
                  key={`district-${bounceKey}`}
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 700, damping: 30 }}
                  className="p-4 rounded-lg border-2 border-black bg-white h-[120px]"
                >
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-bold">Chọn quận</p>
                    <button onClick={() => setShowDistrict(false)} className="p-1 hover:bg-zinc-100 rounded">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <motion.button
                      whileTap={{ scale: 0.90 }}
                      transition={{ type: "spring", stiffness: 700, damping: 30 }}
                      className="px-4 py-2 rounded-full border-2 border-black bg-blue-300 text-sm font-bold"
                    >
                      Tất cả
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.90 }}
                      transition={{ type: "spring", stiffness: 700, damping: 30 }}
                      className="px-4 py-2 rounded-full border-2 border-black bg-white text-sm font-medium hover:bg-zinc-50 transition-colors"
                    >
                      Quận 1
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.90 }}
                      transition={{ type: "spring", stiffness: 700, damping: 30 }}
                      className="px-4 py-2 rounded-full border-2 border-black bg-white text-sm font-medium hover:bg-zinc-50 transition-colors"
                    >
                      Quận 3
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.90 }}
                      transition={{ type: "spring", stiffness: 700, damping: 30 }}
                      className="px-4 py-2 rounded-full border-2 border-black bg-white text-sm font-medium hover:bg-zinc-50 transition-colors"
                    >
                      Quận 7
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.90 }}
                      transition={{ type: "spring", stiffness: 700, damping: 30 }}
                      className="px-4 py-2 rounded-full border-2 border-black bg-white text-sm font-medium hover:bg-zinc-50 transition-colors"
                    >
                      Bình Thạnh
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.90 }}
                      transition={{ type: "spring", stiffness: 700, damping: 30 }}
                      className="px-4 py-2 rounded-full border-2 border-black bg-white text-sm font-medium hover:bg-zinc-50 transition-colors"
                    >
                      Thủ Đức
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* Expanded Filter - Giá */}
              {showPrice && (
                <motion.div
                  key={`price-${bounceKey}`}
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 700, damping: 30 }}
                  className="p-4 rounded-lg border-2 border-black bg-white h-[120px]"
                >
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-bold">Chọn mức giá</p>
                    <button onClick={() => setShowPrice(false)} className="p-1 hover:bg-zinc-100 rounded">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <motion.button
                      whileTap={{ scale: 0.90 }}
                      transition={{ type: "spring", stiffness: 700, damping: 30 }}
                      className="px-4 py-2 rounded-full border-2 border-black bg-blue-300 text-sm font-bold"
                    >
                      Tất cả
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.90 }}
                      transition={{ type: "spring", stiffness: 700, damping: 30 }}
                      className="px-4 py-2 rounded-full border-2 border-black bg-white text-sm font-medium hover:bg-zinc-50 transition-colors"
                    >
                      Dưới 3 triệu
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.90 }}
                      transition={{ type: "spring", stiffness: 700, damping: 30 }}
                      className="px-4 py-2 rounded-full border-2 border-black bg-white text-sm font-medium hover:bg-zinc-50 transition-colors"
                    >
                      3 - 5 triệu
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.90 }}
                      transition={{ type: "spring", stiffness: 700, damping: 30 }}
                      className="px-4 py-2 rounded-full border-2 border-black bg-white text-sm font-medium hover:bg-zinc-50 transition-colors"
                    >
                      5 - 7 triệu
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.90 }}
                      transition={{ type: "spring", stiffness: 700, damping: 30 }}
                      className="px-4 py-2 rounded-full border-2 border-black bg-white text-sm font-medium hover:bg-zinc-50 transition-colors"
                    >
                      Trên 7 triệu
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* Expanded Search */}
              {showSearch && (
                <motion.div
                  key={`search-${bounceKey}`}
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 700, damping: 30 }}
                  className="flex gap-2 h-[120px]"
                >
                  <input
                    type="text"
                    placeholder="Nhập từ khóa..."
                    className="flex-1 px-4 rounded-lg border-2 border-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <motion.button
                    whileTap={{ scale: 0.90 }}
                    transition={{ type: "spring", stiffness: 700, damping: 30 }}
                    className="px-6 rounded-lg border-2 border-black bg-blue-300 font-bold hover:bg-blue-400 transition-colors"
                  >
                    Tìm
                  </motion.button>
                </motion.div>
              )}
            </div>

            {/* Right: Placeholder for Ads/CTA */}
            <div className="hidden md:flex items-center justify-center p-4 rounded-xl border-2 border-dashed border-zinc-400 bg-white/50 min-h-[200px]">
              <span className="text-sm text-zinc-400">Google Ads / CTA</span>
            </div>
          </div>
        </div>
      </section>

      {/* Blur transition from hero to listing */}
      <div className="h-8 bg-gradient-to-b from-blue-50 to-white" />

      <div className="mx-auto max-w-7xl px-6 pb-16">

        {/* Listing Header */}
        <div className="mb-6">
          <span className="text-sm font-medium text-zinc-600">
            {allFilteredListings.length} kết quả
          </span>
        </div>

        {/* Listings Grid */}
        {displayedListings.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {displayedListings.map((listing) => (
              <ListingCard
                key={listing.id}
                listing={listing}
                variant="blue"
              />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <p className="text-lg text-zinc-500">Chưa có tin đăng nào trong mục này</p>
            <p className="mt-2 text-sm text-zinc-400">Hãy là người đầu tiên đăng tin!</p>
          </div>
        )}

        {/* View All Button */}
        {hasMore && (
          <div className="mt-10 text-center">
            <Link
              href={`/roommate/all?mode=${mode}`}
              className="inline-flex h-14 w-48 items-center justify-center gap-2 rounded-md border-2 border-blue-400 bg-white text-base font-semibold text-blue-400 transition-all duration-200 hover:bg-blue-400 hover:text-white"
              style={{ fontFamily: "var(--font-outfit), 'Outfit', sans-serif" }}
            >
              Xem tất cả
            </Link>
          </div>
        )}

        {/* Divider */}
        <div className="my-16 border-t-2 border-black" />

        {/* CTA Section */}
        <SplitCTASection
          leftHeading={getCTAHeading()}
          leftButton="Đăng tin ngay"
          leftReturnUrl="/roommate"
          onPostClick={() => setShowPostTypeModal(true)}
          rightHeading="Hoặc bạn đang tìm phòng?"
          rightButton="Tìm phòng"
          rightLink="/roomshare"
          variant="blue"
        />
      </div>

      {/* Roommate Type Modal */}
      <PostTypeModal
        isOpen={showPostTypeModal}
        onClose={() => setShowPostTypeModal(false)}
      />

      <ShareFooter />
    </div>
  );
}
