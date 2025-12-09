"use client";

import { useState } from "react";
import Link from "next/link";
import { mockListings } from "../data/mockListings";
import MainHeader from "../components/MainHeader";
import ShareFooter from "../components/ShareFooter";
import FilterButtons from "../components/FilterButtons";
import ListingCard from "../components/ListingCard";
import SplitCTASection from "../components/SplitCTASection";

type FilterMode = "have-room" | "find-partner";

export default function RoommatePage() {
  const [mode, setMode] = useState<FilterMode>("have-room");

  // Filter listings based on mode
  const allFilteredListings = mockListings.filter((listing) => {
    return listing.category === "roommate" && listing.roommateType === mode;
  });

  // Limit to 9 cards
  const displayedListings = allFilteredListings.slice(0, 9);
  const hasMore = allFilteredListings.length > 9;

  const getListingTitle = () => {
    return mode === "have-room"
      ? "Người có phòng tìm bạn ở cùng"
      : "Người tìm bạn cùng đi thuê";
  };

  const getCTAHeading = () => {
    return mode === "have-room"
      ? "Chưa tìm được người ở cùng?"
      : "Chưa tìm được bạn cùng thuê?";
  };

  return (
    <div className="min-h-screen bg-white">
      <MainHeader />

      {/* Hero Section */}
      <section className="bg-blue-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="mb-6 text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl">
            Tìm bạn ở cùng
          </h1>
          <p className="mb-8 max-w-2xl text-base sm:text-lg text-zinc-700">
            Tìm người để ở cùng hoặc cùng đi thuê
          </p>

          <FilterButtons
            mode={mode}
            onModeChange={setMode}
          />
        </div>
      </section>

      {/* Blur transition from hero to listing */}
      <div className="h-16 bg-gradient-to-b from-blue-50 to-white" />

      <div className="mx-auto max-w-7xl px-6 pb-16">

        {/* Listing Header */}
        <div className="mb-8 space-y-3">
          <span className="text-sm font-medium text-zinc-600">
            {allFilteredListings.length} kết quả
          </span>
          <h2 className="text-3xl font-bold">{getListingTitle()}</h2>
        </div>

        {/* Listings Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {displayedListings.map((listing) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              variant="blue"
            />
          ))}
        </div>

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
          rightHeading="Hoặc bạn đang tìm phòng?"
          rightButton="Tìm phòng share"
          rightLink="/roomshare"
          variant="blue"
        />
      </div>

      <ShareFooter />
    </div>
  );
}
