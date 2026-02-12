"use client";

import { Home, MapPin, Calendar, User, Wallet } from "lucide-react";

interface ListingCardProps {
  listing: {
    id: number | string;
    title: string;
    author: string;
    price: string;
    location: string;
    city?: string;
    district?: string;
    moveInDate: string;
    description: string;
    introduction?: string;
    phone: string;
    postedDate: string;
    category?: "roommate" | "roomshare";
    roommateType?: "have-room" | "find-partner";
  };
  variant?: "blue" | "pink";
  layout?: "grid" | "list";
}

// Helper to get correct route based on listing id prefix or category
function getListingRoute(listing: ListingCardProps["listing"]): string {
  const id = String(listing.id);
  // Check prefix first
  if (id.startsWith("rm-")) {
    return `/roommate/listing/${id}`;
  }
  if (id.startsWith("rs-")) {
    return `/roomshare/listing/${id}`;
  }
  // Fall back to category
  if (listing.category === "roomshare") {
    return `/roomshare/listing/${id}`;
  }
  // Default to roommate
  return `/roommate/listing/${id}`;
}

export default function ListingCard({ listing, variant = "blue", layout = "grid" }: ListingCardProps) {
  const cardBg = variant === "pink" ? "bg-pink-50" : "bg-white";
  const priceBadgeBg = variant === "pink" ? "bg-pink-300" : "bg-blue-300";
  const accentColor = variant === "pink" ? "text-pink-600" : "text-blue-700";
  const accentBorder = variant === "pink" ? "border-pink-600" : "border-blue-700";
  const accentBg = variant === "pink" ? "bg-pink-100" : "bg-blue-100";
  const accentIconColor = variant === "pink" ? "text-pink-400" : "text-blue-300";
  const listingRoute = getListingRoute(listing);
  const isFindPartner = listing.roommateType === "find-partner";

  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setTimeout(() => {
      window.location.href = listingRoute;
    }, 150);
  };

  // Get display location
  const displayLocation = listing.district && listing.city
    ? `${listing.district}, ${listing.city}`
    : listing.location;

  // List layout (horizontal)
  if (layout === "list") {
    if (isFindPartner) {
      // Find-partner list layout - Avatar instead of room image
      return (
        <a
          href={listingRoute}
          onClick={handleCardClick}
          className={`group flex gap-5 rounded-xl border-2 border-black ${cardBg} p-4 shadow-[var(--shadow-secondary)] card-bounce`}
        >
          {/* Avatar Section */}
          <div className={`h-32 w-32 flex-shrink-0 overflow-hidden rounded-full border-2 border-black ${accentBg} flex items-center justify-center`}>
            <span className={`text-4xl font-bold ${accentColor}`}>
              {listing.author?.charAt(0)?.toUpperCase() || "?"}
            </span>
          </div>

          {/* Content */}
          <div className="flex flex-1 gap-5">
            {/* Left Column: Info */}
            <div className="flex flex-1 flex-col justify-between min-w-0">
              {/* Top: Title */}
              <div>
                <h3 className="text-lg font-bold leading-tight line-clamp-1 mb-2">{listing.title}</h3>

                {/* Location & Move-in */}
                <div className="mt-1 space-y-0.5">
                  <p className="text-xs font-bold text-zinc-500">Địa điểm & thời gian mong muốn</p>
                  <span className="flex items-center gap-1.5 text-sm text-blue-700">
                    <MapPin className="h-4 w-4" />
                    {displayLocation}
                  </span>
                  <span className="flex items-center gap-1.5 text-sm text-blue-700">
                    <Calendar className="h-4 w-4" />
                    {listing.moveInDate}
                  </span>
                </div>
              </div>

              {/* Bottom: Author + Date + Price */}
              <div className="flex items-end justify-between">
                <div className="flex items-center gap-2 text-xs text-zinc-500">
                  <User className="h-3.5 w-3.5" />
                  <span>{listing.author}</span>
                  <span>•</span>
                  <span>{listing.postedDate}</span>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs font-bold text-zinc-500">Ngân sách</p>
                  <span className="inline-flex items-end gap-1">
                    <span className="text-xl font-bold text-blue-700">
                      {listing.price}
                    </span>
                    <span className="text-xs text-zinc-400 mb-0.5">/ tháng</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Vertical Divider */}
            <div className="hidden sm:block w-px bg-zinc-300 self-stretch" />

            {/* Right Column: Description */}
            <div className="hidden sm:flex flex-1 flex-col justify-center min-w-0">
              <p className="text-xs font-bold text-zinc-500 mb-1">Giới thiệu</p>
              <p className="text-sm leading-relaxed text-zinc-700 font-medium line-clamp-4">
                {listing.introduction || listing.description}
              </p>
            </div>
          </div>
        </a>
      );
    }

    // Have-room list layout (original)
    return (
      <a
        href={listingRoute}
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
              <span className="flex-shrink-0 text-xl font-bold text-blue-700">
                {listing.price}
              </span>
            </div>

            {/* Location */}
            <div className="text-sm">
              <span className="flex items-center gap-1.5 text-blue-700">
                <MapPin className="h-4 w-4" />
                {listing.location}
              </span>
            </div>
            {/* Move-in */}
            <div className="text-sm text-zinc-500">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                Mong muốn bạn dọn vào: <span className="text-blue-700">{listing.moveInDate}</span>
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

  // Grid layout - Find Partner (person-focused)
  if (isFindPartner) {
    return (
      <a
        href={listingRoute}
        onClick={handleCardClick}
        className="group block rounded-xl border-[3px] border-zinc-800 bg-white p-6 card-bounce"
      >
        {/* Header: Avatar + Author Info */}
        <div className="mb-5 flex items-center gap-4">
          {/* Avatar */}
          <div className={`h-16 w-16 flex-shrink-0 overflow-hidden rounded-full border-2 ${accentBorder} bg-white flex items-center justify-center`}>
            <span className={`text-2xl font-bold ${accentColor}`}>
              {listing.author?.charAt(0)?.toUpperCase() || "?"}
            </span>
          </div>
          {/* Author name + date */}
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-lg truncate">{listing.author}</h4>
            <p className="text-xs text-zinc-500">{listing.postedDate}</p>
          </div>
        </div>

        {/* Title */}
        <h3 className={`mb-3 text-lg font-bold leading-tight line-clamp-2 min-h-[3.5rem] ${accentColor}`}>{listing.title}</h3>

        {/* Introduction/Description */}
        <div className="mb-4 pb-4 border-b-2 border-gray-300">
          <p className="line-clamp-3 text-sm leading-relaxed text-zinc-700">
            {listing.introduction || listing.description}
          </p>
        </div>

        {/* Location & Move-in date */}
        <div className="mb-4 pb-4 border-b-2 border-gray-300 space-y-1.5 text-sm">
          <p className="font-bold text-zinc-800">Địa điểm & thời gian chuyển vào mong muốn</p>
          <p className={`flex items-center gap-2 ${accentColor}`}>
            <MapPin className="h-4 w-4 flex-shrink-0" />
            <span className="truncate">{displayLocation}</span>
          </p>
          <p className={`flex items-center gap-2 ${accentColor}`}>
            <Calendar className="h-4 w-4 flex-shrink-0" />
            {listing.moveInDate}
          </p>
        </div>

        {/* Budget */}
        <div className="space-y-1.5 text-sm">
          <p className="font-bold text-zinc-800">Ngân sách tối đa</p>
          <p className={`flex items-center gap-2 ${accentColor}`}>
            <Wallet className="h-4 w-4 flex-shrink-0" />
            {listing.price}
          </p>
        </div>
      </a>
    );
  }

  // Grid layout - Have Room (original - room-focused)
  return (
    <a
      href={listingRoute}
      onClick={handleCardClick}
      className="group block rounded-xl border-[3px] border-zinc-800 bg-white p-6 card-bounce"
    >
      {/* Image Section */}
      <div className={`mb-5 h-48 w-full overflow-hidden rounded-lg border-2 ${accentBorder} ${cardBg}`}>
        <div className="flex h-full w-full items-center justify-center">
          <Home className={`h-24 w-24 ${accentIconColor}`} strokeWidth={1.5} />
        </div>
      </div>

      {/* Header: Price + Author + Date */}
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className={`text-xl font-bold ${accentColor}`}>
          {listing.price}
        </span>
        <div className="flex items-center gap-2 text-xs text-zinc-500">
          <User className="h-3.5 w-3.5" />
          <span>{listing.author}</span>
          <span>•</span>
          <span>{listing.postedDate}</span>
        </div>
      </div>

      {/* Title - Fixed 2 lines */}
      <h3 className="mb-4 pb-4 border-b-2 border-gray-300 text-lg font-bold leading-tight line-clamp-2 min-h-[3.5rem]">{listing.title}</h3>

      {/* Location & Move-in date */}
      <div className="mb-4 space-y-1.5 text-sm">
        <p className={`flex items-center gap-2 ${accentColor}`}>
          <MapPin className="h-4 w-4 flex-shrink-0" />
          {listing.location}
        </p>
        <p className={`flex items-center gap-2 ${accentColor}`}>
          <Calendar className="h-4 w-4 flex-shrink-0" />
          Dọn vào: {listing.moveInDate}
        </p>
      </div>

      {/* Description */}
      <p className="mb-2 line-clamp-3 text-sm leading-relaxed text-zinc-700">
        {listing.description}
      </p>
    </a>
  );
}
