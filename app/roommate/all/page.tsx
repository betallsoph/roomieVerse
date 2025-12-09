"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUp } from "lucide-react";
import { mockListings } from "../../data/mockListings";
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

  // Filter listings based on mode
  const filteredListings = mockListings.filter((listing) => {
    return listing.category === "roommate" && listing.roommateType === mode;
  });

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
    <div className="min-h-screen bg-white">
      <MainHeader />

      <div className="mx-auto max-w-7xl px-6 py-8">
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
