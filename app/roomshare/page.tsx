"use client";

import { useState, useEffect } from "react";
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

export default function RoomSharePage() {
  const router = useRouter();
  const [propertyType, setPropertyType] = useState<PropertyType>("house");
  const [listings, setListings] = useState<RoomListing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { showReminder, dismissReminder } = useProfileReminder();

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      // Fetch all listings, we will filter client-side for now to ensure we get everything
      // In a real app, we should filter by category/type in the query
      const roommateData = await getListingsByCategory("roommate");
      const roomshareData = await getListingsByCategory("roomshare");

      // Combine and filter for 'have-room' (users offering a room)
      const allListings = [...roommateData, ...roomshareData].filter(
        item => item.roommateType === "have-room"
      );

      // Remove duplicates by ID
      const uniqueListings = Array.from(new Map(allListings.map(item => [item.id, item])).values());

      setListings(uniqueListings);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  // Filter listings by property type
  const allFilteredListings = listings.filter((listing) => {
    // Map existing propertyTypes array to single propertyType for filtering if needed
    // or check if propertyTypes includes the active type
    if (listing.propertyTypes && listing.propertyTypes.length > 0) {
      if (propertyType === "house") {
        return listing.propertyTypes.some(t => t === "house" || t === "room"); // Include 'house' and 'room' under House tab
      } else {
        return listing.propertyTypes.some(t => t === "apartment" || t === "service-apartment" || t === "dormitory"); // Include others under Apartment tab
      }
    }
    return listing.propertyType === propertyType;
  });

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
      <section className="bg-pink-50 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="mb-4 text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl text-pink-900">
            Tìm phòng dư cho thuê lại
          </h1>
          <p className="mb-8 max-w-3xl text-sm sm:text-base text-zinc-700">
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
        </div>
      </section>

      {/* Blur transition from hero to listing */}
      <div className="h-8 bg-gradient-to-b from-pink-50 to-white" />

      <div className="mx-auto max-w-7xl px-6 pb-16">

        {/* Danh sách tin đăng */}
        <div>
          <div className="mb-8 space-y-2">
            <span className="text-sm font-medium text-zinc-600">
              {allFilteredListings.length} tin đăng
            </span>
            <h2 className="text-2xl font-bold">{getListingTitle()}</h2>
          </div>

          {displayedListings.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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
