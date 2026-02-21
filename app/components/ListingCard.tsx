"use client";

import { Home, MapPin, Calendar, User, Wallet } from "lucide-react";
import { formatPrice } from "../lib/format";

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
    category?: "roommate" | "roomshare" | "short-term" | "sublease";
    roommateType?: "have-room" | "find-partner";
  };
  variant?: "blue" | "pink" | "yellow" | "green";
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
  if (id.startsWith("st-")) {
    return `/short-term/listing/${id}`;
  }
  if (id.startsWith("sl-")) {
    return `/sublease/listing/${id}`;
  }
  // Fall back to category
  if (listing.category === "roomshare") {
    return `/roomshare/listing/${id}`;
  }
  if (listing.category === "short-term") {
    return `/short-term/listing/${id}`;
  }
  if (listing.category === "sublease") {
    return `/sublease/listing/${id}`;
  }
  // Default to roommate
  return `/roommate/listing/${id}`;
}

export default function ListingCard({ listing, variant = "blue", layout = "grid" }: ListingCardProps) {
  const cardBg = variant === "pink" ? "bg-pink-50" : variant === "yellow" ? "bg-yellow-50" : variant === "green" ? "bg-emerald-50" : "bg-white";
  const priceBadgeBg = variant === "pink" ? "bg-pink-300" : variant === "yellow" ? "bg-yellow-300" : variant === "green" ? "bg-emerald-300" : "bg-blue-300";
  const accentColor = variant === "pink" ? "text-pink-600" : variant === "yellow" ? "text-amber-600" : variant === "green" ? "text-green-600" : "text-blue-700";
  const accentBorder = variant === "pink" ? "border-pink-600" : variant === "yellow" ? "border-amber-500" : variant === "green" ? "border-green-500" : "border-blue-700";
  const accentBg = variant === "pink" ? "bg-pink-100" : variant === "yellow" ? "bg-amber-100" : variant === "green" ? "bg-emerald-100" : "bg-blue-100";
  const accentIconColor = variant === "pink" ? "text-pink-400" : variant === "yellow" ? "text-amber-400" : variant === "green" ? "text-emerald-400" : "text-blue-300";
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
          className={`group flex gap-3 sm:gap-5 rounded-xl border-2 border-black ${cardBg} p-3 sm:p-4 shadow-[var(--shadow-secondary)] card-bounce`}
        >
          {/* Avatar Section */}
          <div className={`h-20 w-20 sm:h-32 sm:w-32 flex-shrink-0 overflow-hidden rounded-full border-2 border-black ${accentBg} flex items-center justify-center`}>
            <span className={`text-2xl sm:text-4xl font-bold ${accentColor}`}>
              {listing.author?.charAt(0)?.toUpperCase() || "?"}
            </span>
          </div>

          {/* Content */}
          <div className="flex flex-1 gap-5 min-w-0">
            {/* Left Column: Info */}
            <div className="flex flex-1 flex-col justify-between min-w-0">
              {/* Top: Title */}
              <div>
                <h3 className="text-base sm:text-lg font-bold leading-tight line-clamp-1 mb-1 sm:mb-2">{listing.title}</h3>

                {/* Location & Move-in */}
                <div className="mt-1 space-y-0.5">
                  <p className="text-xs font-bold text-zinc-500 hidden sm:block">Địa điểm & thời gian mong muốn</p>
                  <span className="flex items-center gap-1.5 text-xs sm:text-sm text-blue-700">
                    <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                    <span className="truncate">{displayLocation}</span>
                  </span>
                  <span className="flex items-center gap-1.5 text-xs sm:text-sm text-blue-700">
                    <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                    {listing.moveInDate}
                  </span>
                </div>
              </div>

              {/* Bottom: Author + Date + Price */}
              <div className="flex items-end justify-between mt-2 sm:mt-0">
                <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-zinc-500">
                  <User className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  <span className="truncate max-w-[80px] sm:max-w-none">{listing.author}</span>
                  <span>•</span>
                  <span>{listing.postedDate}</span>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="inline-flex items-end gap-1">
                    <span className="text-base sm:text-xl font-bold text-blue-700">
                      {formatPrice(listing.price)}
                    </span>
                    <span className="text-[10px] sm:text-xs text-zinc-400 mb-0.5">/ tháng</span>
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
        className={`group flex gap-3 sm:gap-5 rounded-xl border-2 border-black ${cardBg} p-3 sm:p-4 shadow-[var(--shadow-secondary)] card-bounce`}
      >
        {/* Image Section */}
        <div className="h-24 w-28 sm:h-32 sm:w-40 flex-shrink-0 overflow-hidden rounded-lg border-2 border-black bg-white">
          <div className="flex h-full w-full items-center justify-center">
            <Home className="h-8 w-8 sm:h-12 sm:w-12 text-zinc-400" strokeWidth={1.5} />
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col justify-between min-w-0">
          {/* Top: Title + Price */}
          <div>
            <div className="mb-1 sm:mb-2 flex items-start justify-between gap-2 sm:gap-3">
              <h3 className="text-base sm:text-lg font-bold leading-tight line-clamp-1">{listing.title}</h3>
              <span className="flex-shrink-0 text-base sm:text-xl font-bold text-blue-700">
                {formatPrice(listing.price)}
              </span>
            </div>

            {/* Location */}
            <div className="text-xs sm:text-sm">
              <span className="flex items-center gap-1.5 text-blue-700">
                <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                <span className="truncate">{displayLocation}</span>
              </span>
            </div>
            {/* Move-in */}
            <div className="text-xs sm:text-sm text-zinc-500">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                <span className="hidden sm:inline">Mong muốn bạn dọn vào: </span>
                <span className="sm:hidden">Dọn vào: </span>
                <span className="text-blue-700">{listing.moveInDate}</span>
              </span>
            </div>
          </div>

          {/* Bottom: Author + Date */}
          <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-zinc-500 mt-2 sm:mt-0">
            <User className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            <span className="truncate max-w-[80px] sm:max-w-none">{listing.author}</span>
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
        className="group flex flex-col rounded-xl border-[3px] border-zinc-800 bg-white p-4 sm:p-6 card-bounce h-full"
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
        <h3 className={`mb-3 text-lg font-bold leading-tight line-clamp-3 min-h-[5rem] ${accentColor}`}>{listing.title}</h3>

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
            <span className="line-clamp-1">{displayLocation}</span>
          </p>
          {listing.moveInDate && (
            <p className={`flex items-center gap-2 ${accentColor}`}>
              <Calendar className="h-4 w-4 flex-shrink-0" />
              {listing.moveInDate}
            </p>
          )}
        </div>

        {/* Budget */}
        <div className="mt-auto space-y-1.5 text-sm">
          <p className="font-bold text-zinc-800">Ngân sách tối đa</p>
          <p className={`flex items-center gap-2 ${accentColor}`}>
            <Wallet className="h-4 w-4 flex-shrink-0" />
            {formatPrice(listing.price)}
          </p>
        </div>
      </a>
    );
  }

  // Grid layout - Have Room (original - room-focused)
  // Mobile: compact horizontal layout | Desktop: vertical card
  return (
    <a
      href={listingRoute}
      onClick={handleCardClick}
      className="group flex flex-row sm:flex-col rounded-xl border-2 sm:border-[3px] border-zinc-800 bg-white p-3 sm:p-6 card-bounce h-full gap-3 sm:gap-0"
    >
      {/* Image Section */}
      <div className={`w-24 h-24 sm:w-full sm:h-48 sm:mb-5 flex-shrink-0 overflow-hidden rounded-lg border sm:border-2 ${accentBorder} ${cardBg}`}>
        <div className="flex h-full w-full items-center justify-center">
          <Home className={`h-10 w-10 sm:h-24 sm:w-24 ${accentIconColor}`} strokeWidth={1.5} />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 min-w-0 justify-between">
        {/* Mobile: Price on top */}
        <div className="sm:hidden mb-1">
          <span className={`text-base font-bold ${accentColor}`}>
            {formatPrice(listing.price)}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-sm sm:text-lg font-bold leading-tight line-clamp-2 sm:line-clamp-3 sm:min-h-[5rem] sm:mb-4 sm:pb-4 sm:border-b-2 sm:border-gray-300">{listing.title}</h3>

        {/* Location & Move-in date */}
        <div className="mt-1 sm:mt-0 sm:mb-4 space-y-0.5 sm:space-y-1.5 text-xs sm:text-sm">
          <p className={`flex items-center gap-1.5 sm:gap-2 ${accentColor}`}>
            <MapPin className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
            <span className="line-clamp-1">{displayLocation}</span>
          </p>
          {listing.moveInDate && (
            <p className={`flex items-center gap-1.5 sm:gap-2 ${accentColor}`}>
              <Calendar className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
              <span className="sm:hidden">{listing.moveInDate}</span>
              <span className="hidden sm:inline">Dọn vào: {listing.moveInDate}</span>
            </p>
          )}
        </div>

        {/* Mobile: Author + Date | Desktop: Price + Author header */}
        <div className="flex items-center gap-1.5 text-[11px] text-zinc-500 mt-1 sm:hidden">
          <User className="h-3 w-3" />
          <span className="truncate">{listing.author}</span>
          <span>•</span>
          <span>{listing.postedDate}</span>
        </div>

        {/* Desktop only: Price + Author header */}
        <div className="hidden sm:flex mb-4 items-center justify-between gap-3">
          <span className={`text-xl font-bold ${accentColor}`}>
            {formatPrice(listing.price)}
          </span>
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <User className="h-3.5 w-3.5" />
            <span>{listing.author}</span>
            <span>•</span>
            <span>{listing.postedDate}</span>
          </div>
        </div>

        {/* Description - desktop only */}
        <p className="hidden sm:block mt-auto line-clamp-3 text-sm leading-relaxed text-zinc-700">
          {listing.description}
        </p>
      </div>
    </a>
  );
}
