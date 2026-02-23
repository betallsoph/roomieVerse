"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getListingsByCategory } from "../data/listings";
import { RoomListing, PropertyType } from "../data/types";
import MainHeader from "../components/MainHeader";
import ShareFooter from "../components/ShareFooter";
import FilterTabs from "../components/FilterTabs";
import ListingCard from "../components/ListingCard";
import SplitCTASection from "../components/SplitCTASection";
import ProfileReminderModal from "../components/ProfileReminderModal";
import { useProfileReminder } from "../hooks/useProfileReminder";
import { useAdminRedirect } from "../hooks/useAdminRedirect";
import { Search, X } from "lucide-react";
import { motion } from "framer-motion";

function parsePrice(price: string): number {
  const num = parseInt(price.replace(/\D/g, ""));
  return isNaN(num) ? 0 : num;
}

export default function RoomSharePage() {
  useAdminRedirect();
  const router = useRouter();
  const [propertyType, setPropertyType] = useState<PropertyType>("house");
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
      const roommateData = await getListingsByCategory("roommate");
      const roomshareData = await getListingsByCategory("roomshare");
      const allListings = [...roommateData, ...roomshareData].filter(
        item => item.roommateType === "have-room"
      );
      const uniqueListings = Array.from(new Map(allListings.map(item => [item.id, item])).values());
      setListings(uniqueListings);
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

  // Filter listings by property type + advanced filters
  const allFilteredListings = useMemo(() => {
    return listings.filter((listing) => {
      // Property type filter
      if (listing.propertyTypes && listing.propertyTypes.length > 0) {
        if (propertyType === "house") {
          if (!listing.propertyTypes.some(t => t === "house" || t === "room")) return false;
        } else {
          if (!listing.propertyTypes.some(t => t === "apartment" || t === "service-apartment" || t === "dormitory")) return false;
        }
      } else if (listing.propertyType !== propertyType) return false;
      // City
      if (selectedCity && listing.city !== selectedCity) return false;
      // District
      if (selectedDistrict && listing.district !== selectedDistrict) return false;
      // Price
      if (selectedPrice) {
        const p = parsePrice(listing.price);
        if (selectedPrice === "under3" && p >= 3000000) return false;
        if (selectedPrice === "3to5" && (p < 3000000 || p > 5000000)) return false;
        if (selectedPrice === "5to7" && (p < 5000000 || p > 7000000)) return false;
        if (selectedPrice === "over7" && p <= 7000000) return false;
      }
      // Search
      if (activeSearch) {
        const q = activeSearch.toLowerCase();
        const searchable = [listing.title, listing.description, listing.location, listing.city, listing.district, listing.buildingName, listing.specificAddress].filter(Boolean).join(" ").toLowerCase();
        if (!searchable.includes(q)) return false;
      }
      return true;
    });
  }, [listings, propertyType, selectedCity, selectedDistrict, selectedPrice, activeSearch]);

  const hasActiveFilters = selectedCity || selectedDistrict || selectedPrice || activeSearch;
  const clearAllFilters = () => { setSelectedCity(null); setSelectedDistrict(null); setSelectedPrice(null); setSearchQuery(""); setActiveSearch(""); };

  // Limit to 9 cards
  const displayedListings = allFilteredListings.slice(0, 9);
  const hasMore = allFilteredListings.length > 9;

  const getListingTitle = () => {
    return propertyType === "house"
      ? "Share phòng trong nhà nguyên căn"
      : "Share phòng dư trong chung cư";
  };

  return (
    <div className="min-h-screen bg-white">
      <MainHeader />

      {/* Profile Reminder Modal */}
      <ProfileReminderModal isOpen={showReminder} onClose={dismissReminder} />

      {/* Hero Section */}
      <section className="bg-pink-50 py-8 sm:py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h1 className="mb-3 sm:mb-4 text-2xl font-extrabold leading-tight sm:text-4xl md:text-5xl text-pink-900">
            Tìm phòng dư cho thuê lại
          </h1>
          <p className="mb-6 sm:mb-8 max-w-3xl text-xs sm:text-base text-zinc-700">
            Dành cho các bạn đang thuê nhà nguyên căn/căn hộ có dư phòng và muốn tìm người ở phòng dư đó để đỡ tiền nhà
          </p>

          <FilterTabs
            activeType={propertyType}
            onTypeChange={setPropertyType}
            description={
              <span>
                <span className="font-bold text-pink-600">Lưu ý:</span> Không dành cho môi giới, cho thuê phòng trọ chuyên nghiệp hoặc cho thuê nguyên căn.
              </span>
            }
          />

          {/* Advanced Filters */}
          <div className="mt-6 sm:mt-10 space-y-3">
            <p className="text-base font-bold text-pink-800">Bộ lọc nâng cao</p>
            <div className="flex flex-wrap gap-3">
              <motion.button onClick={() => { closeAllFilters(); setShowFilter(!showFilter); triggerBounce(); }} whileTap={{ scale: 0.85 }} transition={{ duration: 0.1 }} className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-black text-sm font-bold transition-all ${showFilter || selectedCity ? "bg-pink-300" : "bg-white hover:bg-zinc-50"}`}>
                Khu vực{selectedCity && `: ${selectedCity}`}
              </motion.button>
              <motion.button onClick={() => { closeAllFilters(); setShowDistrict(!showDistrict); triggerBounce(); }} whileTap={{ scale: 0.85 }} transition={{ duration: 0.1 }} className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-black text-sm font-bold transition-all ${showDistrict || selectedDistrict ? "bg-pink-300" : "bg-white hover:bg-zinc-50"}`}>
                Quận{selectedDistrict && `: ${selectedDistrict}`}
              </motion.button>
              <motion.button onClick={() => { closeAllFilters(); setShowPrice(!showPrice); triggerBounce(); }} whileTap={{ scale: 0.85 }} transition={{ duration: 0.1 }} className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-black text-sm font-bold transition-all ${showPrice || selectedPrice ? "bg-pink-300" : "bg-white hover:bg-zinc-50"}`}>
                Giá{selectedPrice === "under3" ? ": < 3tr" : selectedPrice === "3to5" ? ": 3-5tr" : selectedPrice === "5to7" ? ": 5-7tr" : selectedPrice === "over7" ? ": > 7tr" : ""}
              </motion.button>
              <motion.button onClick={() => { closeAllFilters(); setShowSearch(!showSearch); triggerBounce(); }} whileTap={{ scale: 0.85 }} transition={{ duration: 0.1 }} className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-black text-sm font-bold transition-all ${showSearch || activeSearch ? "bg-pink-300" : "bg-white hover:bg-zinc-50"}`}>
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
                  <motion.button onClick={() => { setSelectedCity(null); setSelectedDistrict(null); }} whileTap={{ scale: 0.90 }} className={`px-4 py-2 rounded-full border-2 border-black text-sm font-bold ${!selectedCity ? "bg-pink-300" : "bg-white hover:bg-zinc-50"}`}>Tất cả</motion.button>
                  {cityOptions.map(city => (
                    <motion.button key={city} onClick={() => { setSelectedCity(city); setSelectedDistrict(null); }} whileTap={{ scale: 0.90 }} className={`px-4 py-2 rounded-full border-2 border-black text-sm font-medium transition-colors ${selectedCity === city ? "bg-pink-300 font-bold" : "bg-white hover:bg-zinc-50"}`}>{city}</motion.button>
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
                  <motion.button onClick={() => setSelectedDistrict(null)} whileTap={{ scale: 0.90 }} className={`px-4 py-2 rounded-full border-2 border-black text-sm font-bold ${!selectedDistrict ? "bg-pink-300" : "bg-white hover:bg-zinc-50"}`}>Tất cả</motion.button>
                  {districtOptions.map(district => (
                    <motion.button key={district} onClick={() => setSelectedDistrict(district)} whileTap={{ scale: 0.90 }} className={`px-4 py-2 rounded-full border-2 border-black text-sm font-medium transition-colors ${selectedDistrict === district ? "bg-pink-300 font-bold" : "bg-white hover:bg-zinc-50"}`}>{district}</motion.button>
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
                    <motion.button key={opt.label} onClick={() => setSelectedPrice(opt.key)} whileTap={{ scale: 0.90 }} className={`px-4 py-2 rounded-full border-2 border-black text-sm font-medium transition-colors ${selectedPrice === opt.key ? "bg-pink-300 font-bold" : "bg-white hover:bg-zinc-50"}`}>{opt.label}</motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {showSearch && (
              <motion.div key={`search-${bounceKey}`} initial={{ scale: 0.95 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 700, damping: 30 }} className="flex gap-2">
                <input autoComplete="off" type="text" placeholder="Nhập từ khóa..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") setActiveSearch(searchQuery.trim()); }} className="flex-1 px-4 rounded-lg border-2 border-black bg-white focus:outline-none focus:ring-2 focus:ring-pink-400" />
                <motion.button onClick={() => setActiveSearch(searchQuery.trim())} whileTap={{ scale: 0.90 }} className="px-6 rounded-lg border-2 border-black bg-pink-300 font-bold hover:bg-pink-400 transition-colors">Tìm</motion.button>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Blur transition from hero to listing */}
      <div className="h-6 sm:h-8 bg-gradient-to-b from-pink-50 to-white" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 pb-12 sm:pb-16">

        {/* Danh sách tin đăng */}
        <div>
          <div className="mb-8 space-y-2">
            <span className="text-sm font-medium text-zinc-600">
              {allFilteredListings.length} tin đăng
            </span>
            <h2 className="text-2xl font-bold">{getListingTitle()}</h2>
          </div>

          {displayedListings.length > 0 ? (
            <div className="grid gap-3 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
              {displayedListings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} variant="pink" />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center bg-zinc-50 rounded-xl border-2 border-dashed border-zinc-200">
              <p className="text-lg font-bold text-zinc-500">Chưa có phòng nào đang tìm người ở ghép :(</p>
              <p className="mt-2 text-sm text-zinc-400">
                Bạn có phòng trống? <Link href="/roommate/create?type=have-room" className="text-pink-500 underline font-bold">Đăng tin ngay</Link>
              </p>
            </div>
          )}

          {/* View All Button */}
          {hasMore && (
            <div className="mt-10 text-center">
              <Link
                href={`/roomshare/all?type=${propertyType}`}
                className="inline-flex h-14 w-48 items-center justify-center gap-2 rounded-md border-2 border-pink-400 bg-white text-base font-semibold text-pink-400 transition-all duration-200 hover:bg-pink-400 hover:text-white"
                style={{ fontFamily: "var(--font-outfit), 'Outfit', sans-serif" }}
              >
                Xem tất cả
              </Link>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="my-16 border-t-2 border-black" />

        <SplitCTASection
          leftHeading="Bạn có phòng dư muốn share?"
          leftSubheading=""
          leftButton="Đăng tin share phòng"
          leftReturnUrl="/roomshare/create"
          onPostClick={() => {
            router.push("/roomshare/create");
          }}
          rightHeading="Hay là đang tìm bạn ở cùng?"
          rightButton="Tìm bạn ở cùng ngay"
          rightLink="/roommate"
          rightSubheading=""
          variant="pink"
        />
      </div>

      <ShareFooter />
    </div>
  );
}
