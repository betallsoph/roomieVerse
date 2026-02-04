"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUp } from "lucide-react";
import { getListingsByCategory } from "../../data/listings";
import { RoomListing, PropertyType } from "../../data/types";
import MainHeader from "../../components/MainHeader";
import ShareFooter from "../../components/ShareFooter";
import FilterTabs from "../../components/FilterTabs";
import ListingCard from "../../components/ListingCard";
import ButtonV2 from "../../components/ButtonV2";

const ITEMS_PER_PAGE = 10;

export default function RoomshareAllPage() {
  const searchParams = useSearchParams();
  const initialType = (searchParams.get("type") as PropertyType) || "house";
  const [propertyType, setPropertyType] = useState<PropertyType>(initialType);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [listings, setListings] = useState<RoomListing[]>([]);

  // Fetch data
  useEffect(() => {
    async function fetchData() {
      const data = await getListingsByCategory("roomshare");
      setListings(data);
    }
    fetchData();
  }, []);

  // Update type when URL changes
  useEffect(() => {
    const urlType = searchParams.get("type") as PropertyType;
    if (urlType && (urlType === "house" || urlType === "apartment")) {
      setPropertyType(urlType);
    }
  }, [searchParams]);

  // Reset visible count when type changes
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [propertyType]);

  // Filter listings
  const filteredListings = listings.filter(
    (listing) => listing.propertyType === propertyType
  );

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
    return propertyType === "house"
      ? "Phòng riêng trong nhà mặt đất"
      : "Phòng riêng trong chung cư";
  };

  return (
    <div className="min-h-screen bg-white">
      <MainHeader />

      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Back link */}
        <Link
          href="/roomshare"
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 hover:text-black"
        >
          <ArrowLeft className="h-4 w-4" /> Quay lại
        </Link>

        {/* Filter Tabs */}
        <div className="mt-6 mb-8">
          <FilterTabs activeType={propertyType} onTypeChange={setPropertyType} />
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
            <ListingCard key={listing.id} listing={listing} variant="pink" layout="list" />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-10 flex justify-center gap-4">
          <ButtonV2 variant="outline" color="pink" onClick={scrollToTop}>
            <ArrowUp className="h-4 w-4" /> Về đầu trang
          </ButtonV2>
          {hasMore && (
            <ButtonV2 variant="primary" color="pink" onClick={handleLoadMore}>
              Xem thêm
            </ButtonV2>
          )}
        </div>
      </div>

      <ShareFooter />
    </div>
  );
}
