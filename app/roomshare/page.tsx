"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "../contexts/AuthContext";
import { mockListings, PropertyType } from "../data/mockListings";
import MainHeader from "../components/MainHeader";
import ShareFooter from "../components/ShareFooter";
import FilterTabs from "../components/FilterTabs";
import PostForm from "../components/PostForm";
import ListingCard from "../components/ListingCard";
import SplitCTASection from "../components/SplitCTASection";

export default function RoomSharePage() {
  const { isAuthenticated } = useAuth();
  const [propertyType, setPropertyType] = useState<PropertyType>("house");
  const [showForm, setShowForm] = useState(false);

  // Filter listings
  const filteredListings = mockListings.filter(
    (listing) =>
      listing.category === "roomshare" &&
      listing.propertyType === propertyType
  );

  // Helper functions for dynamic content
  const getTitlePlaceholder = () => {
    if (propertyType === "house") return "VD: Phòng trọ Q12 - 2.5tr full nội thất";
    return "VD: Phòng trong căn hộ Q7 Sunrise City";
  };

  const getListingBadge = () => {
    return propertyType === "house" ? "Nhà trọ/Nhà mặt đất" : "Chung cư";
  };

  const getListingTitle = () => {
    return propertyType === "house"
      ? "Phòng trong nhà trọ / nhà mặt đất"
      : "Phòng trong chung cư";
  };

  return (
    <div className="min-h-screen bg-white">
      <MainHeader />

      {/* Hero Section */}
      <section className="border-b-2 border-black bg-pink-lighter py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="mb-6 text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl">
            Tìm Phòng Share
          </h1>
          <p className="mb-8 max-w-2xl text-base sm:text-lg text-zinc-700">
            Tìm phòng riêng trong căn nhiều phòng
          </p>

          <FilterTabs
            activeType={propertyType}
            onTypeChange={setPropertyType}
          />

          {isAuthenticated ? (
            <button
              onClick={() => setShowForm(!showForm)}
              className="btn-pink text-base"
            >
              {showForm ? "Đóng form" : "Đăng tin ngay"}
            </button>
          ) : (
            <Link
              href="/auth?returnUrl=/roomshare"
              className="btn-pink text-base"
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
            formTitle="Đăng tin cho thuê phòng"
            titlePlaceholder={getTitlePlaceholder()}
            descriptionPlaceholder="Mô tả chi tiết về phòng: diện tích, tiện nghi, quy định..."
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
              <ListingCard key={listing.id} listing={listing} variant="pink" />
            ))}
          </div>
        </div>

        <SplitCTASection
          leftHeading="Chưa tìm được phòng phù hợp?"
          leftButton="Đăng tin ngay"
          leftReturnUrl="/roomshare"
          onPostClick={() => setShowForm(true)}
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
