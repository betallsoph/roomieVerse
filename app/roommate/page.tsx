"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "../contexts/AuthContext";
import { mockListings, RoommateType } from "../data/mockListings";
import MainHeader from "../components/MainHeader";
import ShareFooter from "../components/ShareFooter";
import FilterButtons from "../components/FilterButtons";
import PostForm from "../components/PostForm";
import ListingCard from "../components/ListingCard";
import SplitCTASection from "../components/SplitCTASection";

export default function RoommatePage() {
  const { isAuthenticated } = useAuth();
  const [roommateType, setRoommateType] = useState<RoommateType>("have-room");
  const [showForm, setShowForm] = useState(false);

  // Filter listings
  const filteredListings = mockListings.filter(
    (listing) =>
      listing.category === "roommate" &&
      listing.roommateType === roommateType
  );

  // Helper functions for dynamic content
  const getFormTitle = () => {
    if (roommateType === "have-room") return "Đăng tin tìm người ở ghép";
    if (roommateType === "need-partner") return "Đăng tin tìm bạn cùng thuê";
    return "Đăng tin tìm người có phòng";
  };

  const getTitlePlaceholder = () => {
    if (roommateType === "have-room")
      return "VD: Có căn 2PN Bình Thạnh - tìm bạn nữ ở ghép";
    if (roommateType === "need-partner")
      return "VD: Nữ 25t tìm bạn nữ cùng đi thuê Q3";
    return "VD: Nữ 24t tìm phòng có sẵn ở Q3";
  };

  const getDescriptionPlaceholder = () => {
    if (roommateType === "have-room")
      return "Mô tả phòng, yêu cầu với người ở cùng...";
    if (roommateType === "need-partner")
      return "Mô tả bản thân, yêu cầu với người muốn cùng thuê...";
    return "Mô tả bản thân, yêu cầu về phòng bạn muốn tìm...";
  };

  const getListingBadge = () => {
    if (roommateType === "have-room") return "Có phòng";
    if (roommateType === "need-partner") return "Tìm bạn thuê";
    return "Tìm người có phòng";
  };

  const getListingTitle = () => {
    if (roommateType === "have-room") return "Người có phòng tìm bạn ở cùng";
    if (roommateType === "need-partner") return "Người tìm bạn cùng đi thuê";
    return "Người tìm phòng có sẵn";
  };

  const getCTAHeading = () => {
    if (roommateType === "have-room") return "Chưa tìm được người ở cùng?";
    if (roommateType === "need-partner") return "Chưa tìm được bạn cùng thuê?";
    return "Chưa tìm được phòng có sẵn?";
  };

  return (
    <div className="min-h-screen bg-white">
      <MainHeader />

      {/* Hero Section */}
      <section className="border-b-2 border-black bg-blue-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="mb-6 text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl">
            Tìm Roommate
          </h1>
          <p className="mb-8 max-w-2xl text-base sm:text-lg text-zinc-700">
            Tìm người để ở cùng hoặc cùng đi thuê
          </p>

          <FilterButtons
            activeType={roommateType}
            onTypeChange={setRoommateType}
          />

          {isAuthenticated ? (
            <button
              onClick={() => setShowForm(!showForm)}
              className="btn-primary text-base"
            >
              {showForm ? "Đóng form" : "Đăng tin ngay"}
            </button>
          ) : (
            <Link
              href="/auth?returnUrl=/roommate"
              className="btn-primary text-base"
            >
              Đăng nhập để đăng tin
            </Link>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-16">
        {/* Form đăng tin */}
        {isAuthenticated && showForm && (
          <PostForm
            formTitle={getFormTitle()}
            titlePlaceholder={getTitlePlaceholder()}
            descriptionPlaceholder={getDescriptionPlaceholder()}
            onClose={() => setShowForm(false)}
          />
        )}

        {/* Danh sách tin đăng */}
        <div>
          <div className="mb-10 space-y-3">
            <div className="inline-block rounded-sm border-2 border-black bg-white px-3 py-1 text-[10px] font-medium shadow-[var(--shadow-secondary)]">
              {getListingBadge()}
            </div>
            <h2 className="text-3xl font-bold">{getListingTitle()}</h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} variant="blue" />
            ))}
          </div>
        </div>

        <SplitCTASection
          leftHeading={getCTAHeading()}
          leftButton="Đăng tin ngay"
          leftReturnUrl="/roommate"
          onPostClick={() => setShowForm(true)}
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
