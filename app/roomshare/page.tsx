"use client";

import { useState } from "react";
import Link from "next/link";
import { mockListings, PropertyType } from "../data/mockListings";
import MainHeader from "../components/MainHeader";
import ShareFooter from "../components/ShareFooter";
import FilterTabs from "../components/FilterTabs";
import ListingCard from "../components/ListingCard";
import SplitCTASection from "../components/SplitCTASection";

export default function RoomSharePage() {
  const [propertyType, setPropertyType] = useState<PropertyType>("house");

  // Filter listings
  const allFilteredListings = mockListings.filter(
    (listing) =>
      listing.category === "roomshare" &&
      listing.propertyType === propertyType
  );

  // Limit to 9 cards
  const displayedListings = allFilteredListings.slice(0, 9);
  const hasMore = allFilteredListings.length > 9;

  const getListingTitle = () => {
    return propertyType === "house"
      ? "Phòng riêng trong nhà mặt đất"
      : "Phòng riêng trong chung cư";
  };

  return (
    <div className="min-h-screen bg-white">
      <MainHeader />

      {/* Hero Section */}
      <section className="bg-pink-lighter py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="mb-6 text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl">
            Tìm Phòng Share
          </h1>
          <p className="mb-8 max-w-2xl text-base sm:text-lg text-zinc-700">
            Tìm phòng share riêng trong căn nhiều phòng
          </p>

          <FilterTabs
            activeType={propertyType}
            onTypeChange={setPropertyType}
          />
        </div>
      </section>

      {/* Blur transition from hero to listing */}
      <div className="h-16 bg-gradient-to-b from-[rgb(254,248,252)] to-white" />

      <div className="mx-auto max-w-7xl px-6 pb-16">

        {/* Danh sách tin đăng */}
        <div>
          <div className="mb-10">
            <h2 className="text-3xl font-bold">{getListingTitle()}</h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {displayedListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} variant="pink" />
            ))}
          </div>

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
          leftHeading="Chưa tìm được phòng phù hợp?"
          leftButton="Đăng tin ngay"
          leftReturnUrl="/roomshare"
          rightHeading="Hoặc bạn đang tìm roommate?"
          rightButton="Tìm roommate"
          rightLink="/roommate"
          variant="pink"
        />
      </div>

      <ShareFooter />
    </div>
  );
}
