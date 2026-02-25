"use client";

import { useState, useEffect, useMemo } from "react";
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
import { useAdminRedirect } from "../hooks/useAdminRedirect";
import { Search, X, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

type FilterMode = "have-room" | "find-partner";

// Parse price string to number (in VND)
function parsePrice(price: string): number {
  const num = parseInt(price.replace(/\D/g, ""));
  return isNaN(num) ? 0 : num;
}

export default function RoommatePage() {
  useAdminRedirect();
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

  // Filter states
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSearch, setActiveSearch] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

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

  // Dynamic city & district options from actual data
  const cityOptions = useMemo(() => {
    const cities = new Set<string>();
    listings.forEach(l => { if (l.city) cities.add(l.city); });
    return Array.from(cities).sort();
  }, [listings]);

  const districtOptions = useMemo(() => {
    const districts = new Set<string>();
    const source = selectedCity
      ? listings.filter(l => l.city === selectedCity)
      : listings;
    source.forEach(l => { if (l.district) districts.add(l.district); });
    return Array.from(districts).sort();
  }, [listings, selectedCity]);

  // Filter listings based on mode + filters
  const allFilteredListings = useMemo(() => {
    return listings.filter((listing) => {
      // Mode filter
      if (listing.roommateType !== mode) return false;
      // City filter
      if (selectedCity && listing.city !== selectedCity) return false;
      // District filter
      if (selectedDistrict && listing.district !== selectedDistrict) return false;
      // Price filter
      if (selectedPrice) {
        const p = parsePrice(listing.price);
        if (selectedPrice === "under3" && p >= 3000000) return false;
        if (selectedPrice === "3to5" && (p < 3000000 || p > 5000000)) return false;
        if (selectedPrice === "5to7" && (p < 5000000 || p > 7000000)) return false;
        if (selectedPrice === "over7" && p <= 7000000) return false;
      }
      // Search filter
      if (activeSearch) {
        const q = activeSearch.toLowerCase();
        const searchable = [listing.title, listing.description, listing.location, listing.city, listing.district, listing.buildingName, listing.specificAddress].filter(Boolean).join(" ").toLowerCase();
        if (!searchable.includes(q)) return false;
      }
      return true;
    });
  }, [listings, mode, selectedCity, selectedDistrict, selectedPrice, activeSearch]);

  // Check if any filter is active
  const hasActiveFilters = selectedCity || selectedDistrict || selectedPrice || activeSearch;

  const clearAllFilters = () => {
    setSelectedCity(null);
    setSelectedDistrict(null);
    setSelectedPrice(null);
    setSearchQuery("");
    setActiveSearch("");
  };

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
      <section className="bg-blue-50 pt-4 sm:pt-12 md:pt-16 pb-4 sm:pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h1 className="mb-3 sm:mb-6 text-2xl font-extrabold leading-tight sm:text-5xl md:text-6xl">
            Tìm bạn ở cùng hoặc cùng đi thuê
          </h1>

          <FilterButtons
            mode={mode}
            onModeChange={setMode}
          />

          {/* Filter & Search Section */}
          <div className="mt-3 sm:mt-10 grid gap-2 sm:gap-6 md:grid-cols-2 items-stretch">
            {/* Left: Filter & Search Buttons */}
            <div>
              <button onClick={() => setShowMobileFilters(!showMobileFilters)} className={`sm:hidden flex items-center gap-2 w-full px-4 py-2.5 rounded-lg border-2 border-black text-sm font-bold transition-all ${hasActiveFilters ? "bg-blue-300" : "bg-white"}`}>
                Bộ lọc nâng cao
                {hasActiveFilters && <span className="ml-1 text-xs font-normal">(đang lọc)</span>}
                <ChevronDown className={`h-4 w-4 ml-auto transition-transform duration-200 ${showMobileFilters ? "rotate-180" : ""}`} />
              </button>
              <div className={`${showMobileFilters ? "block" : "hidden"} sm:block space-y-2 sm:space-y-3 mt-2 sm:mt-0`}>
                <p className="hidden sm:block text-base font-bold text-blue-800">Bộ lọc nâng cao</p>
                {/* Buttons Row */}
                <div className="flex flex-wrap gap-3">
                <motion.button
                  onClick={() => { closeAllFilters(); setShowFilter(!showFilter); triggerBounce(); }}
                  whileTap={{ scale: 0.85 }}
                  transition={{ duration: 0.1 }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-black text-sm font-bold transition-all ${showFilter || selectedCity ? "bg-blue-300" : "bg-white hover:bg-zinc-50"
                    }`}
                >
                  Khu vực{selectedCity && `: ${selectedCity}`}
                </motion.button>
                <motion.button
                  onClick={() => { closeAllFilters(); setShowDistrict(!showDistrict); triggerBounce(); }}
                  whileTap={{ scale: 0.85 }}
                  transition={{ duration: 0.1 }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-black text-sm font-bold transition-all ${showDistrict || selectedDistrict ? "bg-blue-300" : "bg-white hover:bg-zinc-50"
                    }`}
                >
                  Quận{selectedDistrict && `: ${selectedDistrict}`}
                </motion.button>
                <motion.button
                  onClick={() => { closeAllFilters(); setShowPrice(!showPrice); triggerBounce(); }}
                  whileTap={{ scale: 0.85 }}
                  transition={{ duration: 0.1 }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-black text-sm font-bold transition-all ${showPrice || selectedPrice ? "bg-blue-300" : "bg-white hover:bg-zinc-50"
                    }`}
                >
                  Giá{selectedPrice && selectedPrice === "under3" ? ": < 3tr" : selectedPrice === "3to5" ? ": 3-5tr" : selectedPrice === "5to7" ? ": 5-7tr" : selectedPrice === "over7" ? ": > 7tr" : ""}
                </motion.button>
                <motion.button
                  onClick={() => { closeAllFilters(); setShowSearch(!showSearch); triggerBounce(); }}
                  whileTap={{ scale: 0.85 }}
                  transition={{ duration: 0.1 }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-black text-sm font-bold transition-all ${showSearch || activeSearch ? "bg-blue-300" : "bg-white hover:bg-zinc-50"
                    }`}
                >
                  <Search className="h-4 w-4" />
                  {activeSearch ? `"${activeSearch}"` : "Tìm kiếm"}
                </motion.button>
                {hasActiveFilters && (
                  <motion.button
                    onClick={clearAllFilters}
                    whileTap={{ scale: 0.85 }}
                    transition={{ duration: 0.1 }}
                    className="flex items-center gap-1 px-3 py-2 rounded-lg border-2 border-red-300 text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 transition-all"
                  >
                    <X className="h-3.5 w-3.5" />
                    Xóa lọc
                  </motion.button>
                )}
              </div>

              {/* Expanded Filter - Khu vực */}
              {showFilter && (
                <motion.div
                  key={`filter-${bounceKey}`}
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 700, damping: 30 }}
                  className="p-4 rounded-lg border-2 border-black bg-white"
                >
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-bold">Chọn khu vực</p>
                    <button onClick={() => setShowFilter(false)} className="p-1 hover:bg-zinc-100 rounded">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <motion.button
                      onClick={() => { setSelectedCity(null); setSelectedDistrict(null); }}
                      whileTap={{ scale: 0.90 }}
                      transition={{ type: "spring", stiffness: 700, damping: 30 }}
                      className={`px-4 py-2 rounded-full border-2 border-black text-sm font-bold ${!selectedCity ? "bg-blue-300" : "bg-white hover:bg-zinc-50"}`}
                    >
                      Tất cả
                    </motion.button>
                    {cityOptions.map(city => (
                      <motion.button
                        key={city}
                        onClick={() => { setSelectedCity(city); setSelectedDistrict(null); }}
                        whileTap={{ scale: 0.90 }}
                        transition={{ type: "spring", stiffness: 700, damping: 30 }}
                        className={`px-4 py-2 rounded-full border-2 border-black text-sm font-medium transition-colors ${selectedCity === city ? "bg-blue-300 font-bold" : "bg-white hover:bg-zinc-50"}`}
                      >
                        {city}
                      </motion.button>
                    ))}
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
                  className="p-4 rounded-lg border-2 border-black bg-white"
                >
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-bold">Chọn quận</p>
                    <button onClick={() => setShowDistrict(false)} className="p-1 hover:bg-zinc-100 rounded">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <motion.button
                      onClick={() => setSelectedDistrict(null)}
                      whileTap={{ scale: 0.90 }}
                      transition={{ type: "spring", stiffness: 700, damping: 30 }}
                      className={`px-4 py-2 rounded-full border-2 border-black text-sm font-bold ${!selectedDistrict ? "bg-blue-300" : "bg-white hover:bg-zinc-50"}`}
                    >
                      Tất cả
                    </motion.button>
                    {districtOptions.map(district => (
                      <motion.button
                        key={district}
                        onClick={() => setSelectedDistrict(district)}
                        whileTap={{ scale: 0.90 }}
                        transition={{ type: "spring", stiffness: 700, damping: 30 }}
                        className={`px-4 py-2 rounded-full border-2 border-black text-sm font-medium transition-colors ${selectedDistrict === district ? "bg-blue-300 font-bold" : "bg-white hover:bg-zinc-50"}`}
                      >
                        {district}
                      </motion.button>
                    ))}
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
                  className="p-4 rounded-lg border-2 border-black bg-white"
                >
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-bold">Chọn mức giá</p>
                    <button onClick={() => setShowPrice(false)} className="p-1 hover:bg-zinc-100 rounded">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {([
                      { key: null, label: "Tất cả" },
                      { key: "under3", label: "Dưới 3 triệu" },
                      { key: "3to5", label: "3 - 5 triệu" },
                      { key: "5to7", label: "5 - 7 triệu" },
                      { key: "over7", label: "Trên 7 triệu" },
                    ] as const).map(opt => (
                      <motion.button
                        key={opt.label}
                        onClick={() => setSelectedPrice(opt.key)}
                        whileTap={{ scale: 0.90 }}
                        transition={{ type: "spring", stiffness: 700, damping: 30 }}
                        className={`px-4 py-2 rounded-full border-2 border-black text-sm font-medium transition-colors ${selectedPrice === opt.key ? "bg-blue-300 font-bold" : "bg-white hover:bg-zinc-50"}`}
                      >
                        {opt.label}
                      </motion.button>
                    ))}
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
                  className="flex gap-2"
                >
                  <input
                    autoComplete="off" type="text"
                    placeholder="Nhập từ khóa..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") setActiveSearch(searchQuery.trim()); }}
                    className="flex-1 px-4 rounded-lg border-2 border-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />

                  <motion.button
                    onClick={() => setActiveSearch(searchQuery.trim())}
                    whileTap={{ scale: 0.90 }}
                    transition={{ type: "spring", stiffness: 700, damping: 30 }}
                    className="px-6 rounded-lg border-2 border-black bg-blue-300 font-bold hover:bg-blue-400 transition-colors"
                  >
                    Tìm
                  </motion.button>
                </motion.div>
              )}
              </div>
            </div>

            {/* Right: Placeholder for Ads/CTA */}
            <div className="hidden md:flex items-center justify-center p-4 rounded-xl border-2 border-dashed border-zinc-400 bg-white/50 min-h-[200px]">
              <span className="text-sm text-zinc-400">Google Ads / CTA</span>
            </div>
          </div>
        </div>
      </section>

      {/* Blur transition from hero to listing */}
      <div className="h-3 sm:h-8 bg-gradient-to-b from-blue-50 to-white" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 pb-12 sm:pb-16">

        {/* Listing Header */}
        <div className="mb-6">
          <span className="text-sm font-medium text-zinc-600">
            {allFilteredListings.length} kết quả
          </span>
        </div>

        {/* Listings Grid */}
        {displayedListings.length > 0 ? (
          <div className="grid gap-3 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
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
          leftSubheading=""
          leftButton="Đăng tin ngay"
          leftReturnUrl="/roommate"
          onPostClick={() => setShowPostTypeModal(true)}
          rightHeading="Hoặc bạn đang tìm phòng?"
          rightButton="Tìm phòng"
          rightLink="/roomshare"
          rightSubheading=""
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
