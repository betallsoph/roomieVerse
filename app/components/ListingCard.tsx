"use client";

import { Home, MapPin, Calendar, User } from "lucide-react";

interface ListingCardProps {
  listing: {
    id: number | string;
    title: string;
    author: string;
    price: string;
    location: string;
    moveInDate: string;
    description: string;
    phone: string;
    postedDate: string;
  };
  variant?: "blue" | "pink";
  layout?: "grid" | "list";
}

export default function ListingCard({ listing, variant = "blue", layout = "grid" }: ListingCardProps) {
  const cardBg = variant === "pink" ? "bg-pink-50" : "bg-blue-50";
  const priceBadgeBg = variant === "pink" ? "bg-pink-300" : "bg-blue-300";

  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setTimeout(() => {
      window.location.href = `/listing/${listing.id}`;
    }, 150);
  };

  // List layout (horizontal)
  if (layout === "list") {
    return (
      <a
        href={`/listing/${listing.id}`}
        onClick={handleCardClick}
        className={`group flex gap-5 rounded-xl border-2 border-black ${cardBg} p-4 shadow-[var(--shadow-secondary)] card-bounce`}
      >
        {/* Image Section */}
        <div className="h-32 w-40 flex-shrink-0 overflow-hidden rounded-lg border-2 border-black bg-white">
          <div className="flex h-full w-full items-center justify-center">
            <Home className="h-12 w-12 text-zinc-400" strokeWidth={1.5} />
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col justify-between">
          {/* Top: Title + Price */}
          <div>
            <div className="mb-2 flex items-start justify-between gap-3">
              <h3 className="text-lg font-bold leading-tight line-clamp-1">{listing.title}</h3>
              <span className={`flex-shrink-0 rounded-lg border-2 border-black ${priceBadgeBg} px-3 py-1 text-sm font-bold shadow-[var(--shadow-secondary)]`}>
                {listing.price}
              </span>
            </div>

            {/* Location & Move-in */}
            <div className="flex flex-wrap gap-4 text-sm text-zinc-600">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                {listing.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {listing.moveInDate}
              </span>
            </div>
          </div>

          {/* Bottom: Author + Date */}
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <User className="h-3.5 w-3.5" />
            <span>{listing.author}</span>
            <span>•</span>
            <span>{listing.postedDate}</span>
          </div>
        </div>
      </a>
    );
  }

  // Grid layout (default)
  return (
    <a
      href={`/listing/${listing.id}`}
      onClick={handleCardClick}
      className={`group block rounded-xl border-2 border-black ${cardBg} p-6 shadow-[var(--shadow-secondary)] card-bounce`}
    >
      {/* Image Section */}
      <div className="mb-5 h-48 w-full overflow-hidden rounded-lg border-2 border-black bg-white">
        <div className="flex h-full w-full items-center justify-center">
          <Home className="h-24 w-24 text-zinc-400" strokeWidth={1.5} />
        </div>
      </div>

      {/* Header: Price + Author + Date */}
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className={`rounded-lg border-2 border-black ${priceBadgeBg} px-3 py-1.5 text-sm font-bold shadow-[var(--shadow-secondary)]`}>
          {listing.price}
        </span>
        <div className="flex items-center gap-2 text-xs text-zinc-500">
          <User className="h-3.5 w-3.5" />
          <span>{listing.author}</span>
          <span>•</span>
          <span>{listing.postedDate}</span>
        </div>
      </div>

      {/* Title */}
      <h3 className="mb-4 pb-4 border-b-2 border-gray-300 text-lg font-bold leading-tight">{listing.title}</h3>

      {/* Location & Move-in date */}
      <div className="mb-4 space-y-1.5 text-sm text-zinc-600">
        <p className="flex items-center gap-2">
          <MapPin className="h-4 w-4 flex-shrink-0" />
          {listing.location}
        </p>
        <p className="flex items-center gap-2">
          <Calendar className="h-4 w-4 flex-shrink-0" />
          Dọn vào: {listing.moveInDate}
        </p>
      </div>

      {/* Description */}
      <p className="mb-2 line-clamp-2 text-sm leading-relaxed text-zinc-700">
        {listing.description}
      </p>
    </a>
  );
}
