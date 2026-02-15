'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import MainHeader from "../components/MainHeader";
import ShareFooter from "../components/ShareFooter";
import ProtectedRoute from "../components/ProtectedRoute";
import { getListingById } from "../data/listings";
import { getUserFavorites, toggleFavorite } from "../data/favorites";
import { RoomListing } from "../data/types";
import { Heart, MapPin, Calendar, Home, HeartOff, Users, Loader2 } from "lucide-react";
import { useAdminRedirect } from "../hooks/useAdminRedirect";
import { useAuth } from "../contexts/AuthContext";

export default function FavoritesPage() {
  useAdminRedirect();
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<RoomListing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"all" | "roommate" | "roomshare" | "short-term" | "sublease">("all");

  // Load favorites from Firestore
  useEffect(() => {
    async function loadFavorites() {
      if (!user?.uid) {
        setIsLoading(false);
        return;
      }
      try {
        const favoriteIds = await getUserFavorites(user.uid);
        // Fetch each listing
        const listings = await Promise.all(
          favoriteIds.map((id) => getListingById(id))
        );
        setFavorites(listings.filter((l): l is RoomListing => l !== null));
      } catch (error) {
        console.error("Error loading favorites:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadFavorites();
  }, [user?.uid]);

  // Remove from favorites
  const handleRemoveFavorite = async (id: number | string) => {
    if (!user?.uid) return;
    await toggleFavorite(user.uid, String(id));
    setFavorites(prev => prev.filter(listing => listing.id !== id));
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
            <div className="mb-8">
              <h1 className="mb-4 text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl">
                Yêu thích của tôi
              </h1>
              <p className="max-w-2xl text-base sm:text-lg text-zinc-700">
                Những bài đăng bạn đã lưu để xem sau
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-2xl">
              <div className="card bg-white !p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-200 border-2 border-black">
                    <Heart className="h-5 w-5 fill-current text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{favorites.length}</p>
                    <p className="text-xs text-zinc-600 whitespace-nowrap">Tổng số đã lưu</p>
                  </div>
                </div>
              </div>
              <div className="card bg-white !p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-200 border-2 border-black">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {favorites.filter(f => f.category === "roommate").length}
                    </p>
                    <p className="text-xs text-zinc-600 whitespace-nowrap">Tìm bạn cùng phòng</p>
                  </div>
                </div>
              </div>
              <div className="card bg-white !p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-200 border-2 border-black">
                    <Home className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {favorites.filter(f => f.category === "roomshare").length}
                    </p>
                    <p className="text-xs text-zinc-600 whitespace-nowrap">Phòng trống</p>
                  </div>
                </div>
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
                Tất cả
              </button>
              <button
                onClick={() => setActiveTab("roommate")}
                className={`px-6 py-3 text-base font-bold rounded-lg border-2 border-black transition-all
                  ${activeTab === "roommate"
                    ? 'bg-blue-300 shadow-[var(--shadow-secondary)] translate-x-[2px] translate-y-[2px]'
                    : 'bg-white hover:bg-blue-100 shadow-[var(--shadow-secondary)] hover:translate-x-[2px] hover:translate-y-[2px]'
                  }`}
              >
                Tìm bạn
              </button>
              <button
                onClick={() => setActiveTab("roomshare")}
                className={`px-6 py-3 text-base font-bold rounded-lg border-2 border-black transition-all
                  ${activeTab === "roomshare"
                    ? 'bg-pink-300 shadow-[var(--shadow-secondary)] translate-x-[2px] translate-y-[2px]'
                    : 'bg-white hover:bg-pink-100 shadow-[var(--shadow-secondary)] hover:translate-x-[2px] hover:translate-y-[2px]'
                  }`}
              >
                Phòng trống
              </button>
              <button
                onClick={() => setActiveTab("short-term")}
                className={`px-6 py-3 text-base font-bold rounded-lg border-2 border-black transition-all
                  ${activeTab === "short-term"
                    ? 'bg-yellow-300 shadow-[var(--shadow-secondary)] translate-x-[2px] translate-y-[2px]'
                    : 'bg-white hover:bg-yellow-100 shadow-[var(--shadow-secondary)] hover:translate-x-[2px] hover:translate-y-[2px]'
                  }`}
              >
                Ngắn ngày
              </button>
              <button
                onClick={() => setActiveTab("sublease")}
                className={`px-6 py-3 text-base font-bold rounded-lg border-2 border-black transition-all
                  ${activeTab === "sublease"
                    ? 'bg-emerald-300 shadow-[var(--shadow-secondary)] translate-x-[2px] translate-y-[2px]'
                    : 'bg-white hover:bg-emerald-100 shadow-[var(--shadow-secondary)] hover:translate-x-[2px] hover:translate-y-[2px]'
                  }`}
              >
                Sang lại
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
  onRemove: (id: number | string) => void;
}) {
  const imageBg = listing.category === "roomshare" ? "bg-pink-100" : listing.category === "short-term" ? "bg-yellow-100" : listing.category === "sublease" ? "bg-emerald-100" : "bg-blue-100";
  const priceBadgeBg = listing.category === "roomshare" ? "bg-pink-300" : listing.category === "short-term" ? "bg-yellow-300" : listing.category === "sublease" ? "bg-emerald-300" : "bg-blue-300";
  const listingRoute = listing.category === "sublease" ? "sublease" : listing.category === "short-term" ? "short-term" : listing.category === "roomshare" ? "roomshare" : "roommate";

  return (
    <div className="card bg-white p-6">
      {/* Image Section */}
      <Link href={`/${listingRoute}/listing/${listing.id}`}>
        <div className={`mb-6 h-48 w-full overflow-hidden rounded-lg border-2 border-black ${imageBg}`}>
          <div className="flex h-full w-full items-center justify-center">
            <Home className="h-16 w-16 text-zinc-400" />
          </div>
        </div>
      </Link>

      <div className="mb-4 flex items-start justify-between gap-3">
        <span className={`rounded-lg border-2 border-black ${priceBadgeBg} px-4 py-2 text-sm font-bold`}>
          {listing.price}
        </span>
        <span className="text-xs text-zinc-500">{listing.postedDate}</span>
      </div>

      <Link href={`/${listingRoute}/listing/${listing.id}`}>
        <h3 className="mb-3 text-lg font-bold leading-tight hover:text-blue-600 transition-colors">
          {listing.title}
        </h3>
      </Link>

      <div className="mb-4 space-y-2 text-sm text-zinc-600">
        <p className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          {listing.location}
        </p>
        <p className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          Dọn vào: {listing.moveInDate}
        </p>
      </div>

      <p className="mb-5 line-clamp-2 text-sm leading-relaxed text-zinc-700">
        {listing.description}
      </p>

      <div className="flex items-center gap-2 border-t-2 border-gray-100 pt-4">
        <Link
          href={`/${listingRoute}/listing/${listing.id}`}
          className="flex-1 btn-primary text-xs text-center"
        >
          Xem chi tiết
        </Link>
        <button
          onClick={() => onRemove(listing.id)}
          className="btn-red text-xs px-4 py-2 flex items-center gap-1"
          title="Xóa khỏi yêu thích"
        >
          <HeartOff className="h-4 w-4" />
          Bỏ lưu
        </button>
      </div>
    </div>
  );
}

function EmptyState({ activeTab }: { activeTab: string }) {
  return (
    <div className="card bg-white p-12 text-center">
      <div className="mb-6 flex justify-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-pink-100 border-2 border-black">
          <HeartOff className="h-10 w-10 text-pink-400" />
        </div>
      </div>
      <h3 className="mb-4 text-2xl font-bold">
        {activeTab === "all"
          ? "Chưa có bài đăng nào được lưu"
          : activeTab === "roommate"
          ? "Chưa lưu bài tìm bạn nào"
          : "Chưa lưu phòng trống nào"
        }
      </h3>
      <p className="mb-6 text-base text-zinc-600">
        {activeTab === "all"
          ? "Hãy khám phá và lưu những bài đăng bạn thích!"
          : "Hãy xem thêm các bài đăng và lưu những cái bạn quan tâm!"
        }
      </p>
      <div className="flex gap-4 justify-center flex-wrap">
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
          Tìm phòng
        </Link>
      </div>
    </div>
  );
}
