"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUp } from "lucide-react";
import { getListingsByCategory } from "../../data/listings";
import { RoomListing } from "../../data/types";
import MainHeader from "../../components/MainHeader";
import ShareFooter from "../../components/ShareFooter";
import FilterButtons from "../../components/FilterButtons";
import ListingCard from "../../components/ListingCard";
import ButtonV2 from "../../components/ButtonV2";

type FilterMode = "have-room" | "find-partner";

const ITEMS_PER_PAGE = 10;

export default function RoommateAllPage() {
  const searchParams = useSearchParams();
  const initialMode = (searchParams.get("mode") as FilterMode) || "have-room";
  const [mode, setMode] = useState<FilterMode>(initialMode);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [listings, setListings] = useState<RoomListing[]>([]);

  // Fetch data
  useEffect(() => {
    async function fetchData() {
      const data = await getListingsByCategory("roommate");
      setListings(data);
    }
    fetchData();
  }, []);

  // Update mode when URL changes
  useEffect(() => {
    const urlMode = searchParams.get("mode") as FilterMode;
    if (urlMode && (urlMode === "have-room" || urlMode === "find-partner")) {
      setMode(urlMode);
    }
  }, [searchParams]);

  // Reset visible count when mode changes
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [mode]);

  // Parse relative Vietnamese date to a sortable number (lower = more recent)
  const parsePostedDate = (dateStr: string): number => {
    if (dateStr === "Hôm nay") return 0;
    if (dateStr === "Hôm qua") return 1;
    const match = dateStr.match(/(\d+)\s*(giờ|ngày|tuần|tháng)/);
    if (match) {
      const num = parseInt(match[1]);
      const unit = match[2];
      if (unit === "giờ") return num / 24;
      if (unit === "ngày") return num;
      if (unit === "tuần") return num * 7;
      if (unit === "tháng") return num * 30;
    }
    return 999; // Unknown format → push to end
  };

  // Filter listings based on mode, then sort newest first
  const filteredListings = listings
    .filter((listing) => listing.roommateType === mode)
    .sort((a, b) => parsePostedDate(a.postedDate) - parsePostedDate(b.postedDate));

  // Get visible listings
  const visibleListings = filteredListings.slice(0, visibleCount);
  const hasMore = visibleCount < filteredListings.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getListingTitle = () => {
    return mode === "have-room"
      ? "Người có phòng tìm bạn ở cùng"
      : "Người tìm bạn cùng đi thuê";
  };

  return (
    <div className="min-h-screen bg-blue-50">
      <MainHeader />

      <div className="mx-auto max-w-7xl px-6 py-8 bg-blue-50">
        {/* Back link */}
        <Link
          href="/roommate"
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 hover:text-black"
        >
          <ArrowLeft className="h-4 w-4" /> Quay lại
        </Link>

        {/* Filter Buttons */}
        <div className="mt-6 mb-8">
          <FilterButtons mode={mode} onModeChange={setMode} />
        </div>

        {/* Listing Header */}
        <div className="mb-8 space-y-3">
          <span className="text-sm font-medium text-zinc-600">
            {filteredListings.length} kết quả
          </span>
          <h2 className="text-3xl font-bold">{getListingTitle()}</h2>
        </div>

        {/* Listings List */}
        <div className="space-y-4">
          {visibleListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} variant="blue" layout="list" />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-10 flex justify-center gap-4">
          <ButtonV2 variant="outline" color="blue" onClick={scrollToTop}>
            <ArrowUp className="h-4 w-4" /> Về đầu trang
          </ButtonV2>
          {hasMore && (
            <ButtonV2 variant="primary" color="blue" onClick={handleLoadMore}>
              Xem thêm
            </ButtonV2>
          )}
        </div>
      </div>

      <ShareFooter />
    </div>
  );
}
