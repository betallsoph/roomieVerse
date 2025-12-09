'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import MainHeader from "../components/MainHeader";
import ShareFooter from "../components/ShareFooter";
import ProtectedRoute from "../components/ProtectedRoute";
import { mockListings, RoomListing } from "../data/mockListings";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<RoomListing[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | "roommate" | "roomshare">("all");

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      const favoriteIds = JSON.parse(savedFavorites) as number[];
      const favoritedListings = mockListings.filter(listing =>
        favoriteIds.includes(listing.id)
      );
      setFavorites(favoritedListings);
    }
  }, []);

  // Remove from favorites
  const handleRemoveFavorite = (id: number) => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      const favoriteIds = JSON.parse(savedFavorites) as number[];
      const updatedIds = favoriteIds.filter(fid => fid !== id);
      localStorage.setItem('favorites', JSON.stringify(updatedIds));

      // Update UI
      setFavorites(prev => prev.filter(listing => listing.id !== id));
    }
  };

  // Filter favorites based on active tab
  const filteredFavorites = activeTab === "all"
    ? favorites
    : favorites.filter(listing => listing.category === activeTab);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-white">
        <MainHeader />

        {/* Hero Section */}
        <section className="bg-pink-50 py-16 sm:py-24 relative before:absolute before:bottom-0 before:left-0 before:right-0 before:h-20 before:bg-gradient-to-b before:from-transparent before:to-white before:pointer-events-none">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center mb-8">
              <h1 className="mb-4 text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl">
                Yêu thích của tôi ❤️
              </h1>
              <p className="max-w-2xl mx-auto text-base sm:text-lg text-zinc-700">
                Những bài đăng bạn đã lưu để xem sau
              </p>
            </div>

            {/* Stats */}
            <div className="flex justify-center gap-6 flex-wrap">
              <div className="card bg-white px-8 py-4 text-center">
                <p className="text-3xl font-bold text-pink-600">{favorites.length}</p>
                <p className="text-sm text-zinc-600">Tổng số đã lưu</p>
              </div>
              <div className="card bg-white px-8 py-4 text-center">
                <p className="text-3xl font-bold text-blue-600">
                  {favorites.filter(f => f.category === "roommate").length}
                </p>
                <p className="text-sm text-zinc-600">Tìm bạn cùng phòng</p>
              </div>
              <div className="card bg-white px-8 py-4 text-center">
                <p className="text-3xl font-bold text-pink-600">
                  {favorites.filter(f => f.category === "roomshare").length}
                </p>
                <p className="text-sm text-zinc-600">Phòng chia sẻ</p>
              </div>
            </div>
          </div>
        </section>

        {/* Filters & Listings */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6">
            {/* Category Tabs */}
            <div className="mb-8 flex flex-wrap justify-center gap-3">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-6 py-3 text-base font-bold rounded-lg border-2 border-black transition-all
                  ${activeTab === "all"
                    ? 'bg-purple-300 shadow-[var(--shadow-secondary)] translate-x-[2px] translate-y-[2px]'
                    : 'bg-white hover:bg-purple-100 shadow-[var(--shadow-secondary)] hover:translate-x-[2px] hover:translate-y-[2px]'
                  }`}
              >
                Tất cả ({favorites.length})
              </button>
              <button
                onClick={() => setActiveTab("roommate")}
                className={`px-6 py-3 text-base font-bold rounded-lg border-2 border-black transition-all
                  ${activeTab === "roommate"
                    ? 'bg-blue-300 shadow-[var(--shadow-secondary)] translate-x-[2px] translate-y-[2px]'
                    : 'bg-white hover:bg-blue-100 shadow-[var(--shadow-secondary)] hover:translate-x-[2px] hover:translate-y-[2px]'
                  }`}
              >
                Tìm bạn ({favorites.filter(f => f.category === "roommate").length})
              </button>
              <button
                onClick={() => setActiveTab("roomshare")}
                className={`px-6 py-3 text-base font-bold rounded-lg border-2 border-black transition-all
                  ${activeTab === "roomshare"
                    ? 'bg-pink-300 shadow-[var(--shadow-secondary)] translate-x-[2px] translate-y-[2px]'
                    : 'bg-white hover:bg-pink-100 shadow-[var(--shadow-secondary)] hover:translate-x-[2px] hover:translate-y-[2px]'
                  }`}
              >
                Phòng chia sẻ ({favorites.filter(f => f.category === "roomshare").length})
              </button>
            </div>

            {/* Listings Grid */}
            {filteredFavorites.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredFavorites.map((listing) => (
                  <FavoriteCard
                    key={listing.id}
                    listing={listing}
                    onRemove={handleRemoveFavorite}
                  />
                ))}
              </div>
            ) : (
              <EmptyState activeTab={activeTab} />
            )}
          </div>
        </section>

        <ShareFooter />
      </div>
    </ProtectedRoute>
  );
}

function FavoriteCard({
  listing,
  onRemove
}: {
  listing: RoomListing;
  onRemove: (id: number) => void;
}) {
  const imageBg = listing.category === "pink" ? "bg-pink-50" : "bg-blue-50";
  const priceBadgeBg = listing.category === "roomshare" ? "bg-pink-300" : "bg-blue-300";

  return (
    <div className="group rounded-xl border-2 border-black bg-white p-6 shadow-[var(--shadow-secondary)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none">
      {/* Image Section */}
      <Link href={`/listing/${listing.id}`}>
        <div className={`mb-6 h-48 w-full overflow-hidden rounded-lg border-2 border-black ${imageBg}`}>
          <div className="flex h-full w-full items-center justify-center text-6xl">
            🏡
          </div>
        </div>
      </Link>

      <div className="mb-4 flex items-start justify-between gap-3">
        <span className={`rounded-lg border-2 border-black ${priceBadgeBg} px-4 py-2 text-sm font-bold shadow-[var(--shadow-secondary)]`}>
          {listing.price}
        </span>
        <span className="text-xs text-zinc-500">{listing.postedDate}</span>
      </div>

      <Link href={`/listing/${listing.id}`}>
        <h3 className="mb-3 text-lg font-bold leading-tight hover:text-blue-600 transition-colors">
          {listing.title}
        </h3>
      </Link>

      <div className="mb-4 space-y-1 text-sm text-zinc-600">
        <p>📍 {listing.location}</p>
        <p>📅 Dọn vào: {listing.moveInDate}</p>
      </div>

      <p className="mb-5 line-clamp-2 text-sm leading-relaxed text-zinc-700">
        {listing.description}
      </p>

      <div className="flex items-center gap-2 border-t-2 border-gray-100 pt-4">
        <Link
          href={`/listing/${listing.id}`}
          className="flex-1 btn-primary text-xs text-center"
        >
          Xem chi tiết
        </Link>
        <button
          onClick={() => onRemove(listing.id)}
          className="btn-red text-xs px-4 py-2"
          title="Xóa khỏi yêu thích"
        >
          ❤️ Bỏ lưu
        </button>
      </div>
    </div>
  );
}

function EmptyState({ activeTab }: { activeTab: string }) {
  return (
    <div className="card bg-white p-12 text-center">
      <div className="mb-6 text-8xl">💔</div>
      <h3 className="mb-4 text-2xl font-bold">
        {activeTab === "all"
          ? "Chưa có bài đăng nào được lưu"
          : activeTab === "roommate"
          ? "Chưa lưu bài tìm bạn nào"
          : "Chưa lưu phòng chia sẻ nào"
        }
      </h3>
      <p className="mb-6 text-base text-zinc-600">
        {activeTab === "all"
          ? "Hãy khám phá và lưu những bài đăng bạn thích!"
          : "Hãy xem thêm các bài đăng và lưu những cái bạn quan tâm!"
        }
      </p>
      <div className="flex gap-4 justify-center">
        <Link
          href="/roommate"
          className="btn-primary text-base px-8 py-4"
        >
          Tìm bạn cùng phòng
        </Link>
        <Link
          href="/roomshare"
          className="btn-pink text-base px-8 py-4"
        >
          Tìm phòng chia sẻ
        </Link>
      </div>
    </div>
  );
}
