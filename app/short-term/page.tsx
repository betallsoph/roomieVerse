"use client";

import { useState, useEffect, useMemo } from "react";
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
import { Home, MapPin, Calendar, Loader2, Clock, Search, X } from "lucide-react";
import { motion } from "framer-motion";

function parsePrice(price: string): number {
  const num = parseInt(price.replace(/\D/g, ""));
  return isNaN(num) ? 0 : num;
}

export default function ShortTermPage() {
  useAdminRedirect();
  const router = useRouter();
  const [listings, setListings] = useState<RoomListing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { showReminder, dismissReminder } = useProfileReminder();

  // Filter states
  const [showFilter, setShowFilter] = useState(false);
  const [showDistrict, setShowDistrict] = useState(false);
  const [showPrice, setShowPrice] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [bounceKey, setBounceKey] = useState(0);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSearch, setActiveSearch] = useState("");

  const closeAllFilters = () => { setShowFilter(false); setShowDistrict(false); setShowPrice(false); setShowSearch(false); };
  const triggerBounce = () => setBounceKey(prev => prev + 1);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const data = await getListingsByCategory("short-term");
      setListings(data);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  const cityOptions = useMemo(() => {
    const cities = new Set<string>();
    listings.forEach(l => { if (l.city) cities.add(l.city); });
    return Array.from(cities).sort();
  }, [listings]);

  const districtOptions = useMemo(() => {
    const districts = new Set<string>();
    const source = selectedCity ? listings.filter(l => l.city === selectedCity) : listings;
    source.forEach(l => { if (l.district) districts.add(l.district); });
    return Array.from(districts).sort();
  }, [listings, selectedCity]);

  const filteredListings = useMemo(() => {
    return listings.filter((listing) => {
      if (selectedCity && listing.city !== selectedCity) return false;
      if (selectedDistrict && listing.district !== selectedDistrict) return false;
      if (selectedPrice) {
        const p = parsePrice(listing.price);
        if (selectedPrice === "under3" && p >= 3000000) return false;
        if (selectedPrice === "3to5" && (p < 3000000 || p > 5000000)) return false;
        if (selectedPrice === "5to7" && (p < 5000000 || p > 7000000)) return false;
        if (selectedPrice === "over7" && p <= 7000000) return false;
      }
      if (activeSearch) {
        const q = activeSearch.toLowerCase();
        const searchable = [listing.title, listing.description, listing.location, listing.city, listing.district, listing.buildingName, listing.specificAddress].filter(Boolean).join(" ").toLowerCase();
        if (!searchable.includes(q)) return false;
      }
      return true;
    });
  }, [listings, selectedCity, selectedDistrict, selectedPrice, activeSearch]);

  const hasActiveFilters = selectedCity || selectedDistrict || selectedPrice || activeSearch;
  const clearAllFilters = () => { setSelectedCity(null); setSelectedDistrict(null); setSelectedPrice(null); setSearchQuery(""); setActiveSearch(""); };

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

          {/* Advanced Filters */}
          <div className="mt-6 sm:mt-10 space-y-3">
            <p className="text-base font-bold text-amber-800">Bộ lọc nâng cao</p>
            <div className="flex flex-wrap gap-3">
              <motion.button onClick={() => { closeAllFilters(); setShowFilter(!showFilter); triggerBounce(); }} whileTap={{ scale: 0.85 }} transition={{ duration: 0.1 }} className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-black text-sm font-bold transition-all ${showFilter || selectedCity ? "bg-yellow-300" : "bg-white hover:bg-zinc-50"}`}>
                Khu vực{selectedCity && `: ${selectedCity}`}
              </motion.button>
              <motion.button onClick={() => { closeAllFilters(); setShowDistrict(!showDistrict); triggerBounce(); }} whileTap={{ scale: 0.85 }} transition={{ duration: 0.1 }} className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-black text-sm font-bold transition-all ${showDistrict || selectedDistrict ? "bg-yellow-300" : "bg-white hover:bg-zinc-50"}`}>
                Quận{selectedDistrict && `: ${selectedDistrict}`}
              </motion.button>
              <motion.button onClick={() => { closeAllFilters(); setShowPrice(!showPrice); triggerBounce(); }} whileTap={{ scale: 0.85 }} transition={{ duration: 0.1 }} className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-black text-sm font-bold transition-all ${showPrice || selectedPrice ? "bg-yellow-300" : "bg-white hover:bg-zinc-50"}`}>
                Giá{selectedPrice === "under3" ? ": < 3tr" : selectedPrice === "3to5" ? ": 3-5tr" : selectedPrice === "5to7" ? ": 5-7tr" : selectedPrice === "over7" ? ": > 7tr" : ""}
              </motion.button>
              <motion.button onClick={() => { closeAllFilters(); setShowSearch(!showSearch); triggerBounce(); }} whileTap={{ scale: 0.85 }} transition={{ duration: 0.1 }} className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-black text-sm font-bold transition-all ${showSearch || activeSearch ? "bg-yellow-300" : "bg-white hover:bg-zinc-50"}`}>
                <Search className="h-4 w-4" />
                {activeSearch ? `"${activeSearch}"` : "Tìm kiếm"}
              </motion.button>
              {hasActiveFilters && (
                <motion.button onClick={clearAllFilters} whileTap={{ scale: 0.85 }} transition={{ duration: 0.1 }} className="flex items-center gap-1 px-3 py-2 rounded-lg border-2 border-red-300 text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 transition-all">
                  <X className="h-3.5 w-3.5" /> Xóa lọc
                </motion.button>
              )}
            </div>

            {showFilter && (
              <motion.div key={`filter-${bounceKey}`} initial={{ scale: 0.95 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 700, damping: 30 }} className="p-4 rounded-lg border-2 border-black bg-white">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-bold">Chọn khu vực</p>
                  <button onClick={() => setShowFilter(false)} className="p-1 hover:bg-zinc-100 rounded"><X className="h-4 w-4" /></button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <motion.button onClick={() => { setSelectedCity(null); setSelectedDistrict(null); }} whileTap={{ scale: 0.90 }} className={`px-4 py-2 rounded-full border-2 border-black text-sm font-bold ${!selectedCity ? "bg-yellow-300" : "bg-white hover:bg-zinc-50"}`}>Tất cả</motion.button>
                  {cityOptions.map(city => (
                    <motion.button key={city} onClick={() => { setSelectedCity(city); setSelectedDistrict(null); }} whileTap={{ scale: 0.90 }} className={`px-4 py-2 rounded-full border-2 border-black text-sm font-medium transition-colors ${selectedCity === city ? "bg-yellow-300 font-bold" : "bg-white hover:bg-zinc-50"}`}>{city}</motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {showDistrict && (
              <motion.div key={`district-${bounceKey}`} initial={{ scale: 0.95 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 700, damping: 30 }} className="p-4 rounded-lg border-2 border-black bg-white">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-bold">Chọn quận</p>
                  <button onClick={() => setShowDistrict(false)} className="p-1 hover:bg-zinc-100 rounded"><X className="h-4 w-4" /></button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <motion.button onClick={() => setSelectedDistrict(null)} whileTap={{ scale: 0.90 }} className={`px-4 py-2 rounded-full border-2 border-black text-sm font-bold ${!selectedDistrict ? "bg-yellow-300" : "bg-white hover:bg-zinc-50"}`}>Tất cả</motion.button>
                  {districtOptions.map(district => (
                    <motion.button key={district} onClick={() => setSelectedDistrict(district)} whileTap={{ scale: 0.90 }} className={`px-4 py-2 rounded-full border-2 border-black text-sm font-medium transition-colors ${selectedDistrict === district ? "bg-yellow-300 font-bold" : "bg-white hover:bg-zinc-50"}`}>{district}</motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {showPrice && (
              <motion.div key={`price-${bounceKey}`} initial={{ scale: 0.95 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 700, damping: 30 }} className="p-4 rounded-lg border-2 border-black bg-white">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-bold">Chọn mức giá</p>
                  <button onClick={() => setShowPrice(false)} className="p-1 hover:bg-zinc-100 rounded"><X className="h-4 w-4" /></button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {([{ key: null, label: "Tất cả" }, { key: "under3", label: "Dưới 3 triệu" }, { key: "3to5", label: "3 - 5 triệu" }, { key: "5to7", label: "5 - 7 triệu" }, { key: "over7", label: "Trên 7 triệu" }] as const).map(opt => (
                    <motion.button key={opt.label} onClick={() => setSelectedPrice(opt.key)} whileTap={{ scale: 0.90 }} className={`px-4 py-2 rounded-full border-2 border-black text-sm font-medium transition-colors ${selectedPrice === opt.key ? "bg-yellow-300 font-bold" : "bg-white hover:bg-zinc-50"}`}>{opt.label}</motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {showSearch && (
              <motion.div key={`search-${bounceKey}`} initial={{ scale: 0.95 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 700, damping: 30 }} className="flex gap-2">
                <input autoComplete="off" type="text" placeholder="Nhập từ khóa..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") setActiveSearch(searchQuery.trim()); }} className="flex-1 px-4 rounded-lg border-2 border-black bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400" />
                <motion.button onClick={() => setActiveSearch(searchQuery.trim())} whileTap={{ scale: 0.90 }} className="px-6 rounded-lg border-2 border-black bg-yellow-300 font-bold hover:bg-yellow-400 transition-colors">Tìm</motion.button>
              </motion.div>
            )}
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
              {filteredListings.length} tin đăng
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
          {!isLoading && filteredListings.length === 0 && (
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
          {!isLoading && filteredListings.length > 0 && (
            <div className="grid gap-3 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredListings.map((listing) => (
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
