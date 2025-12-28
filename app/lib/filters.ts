import { RoomListing } from '../data/types';

export interface ListingFilters {
  // Price filter (in millions VND)
  priceMin?: number;
  priceMax?: number;
  // Location filter
  location?: string;
  // Gender preference
  gender?: 'all' | 'male' | 'female';
  // Move-in date (ISO string)
  moveInDate?: string;
  // Keywords for text search
  keywords?: string;
  // Category
  category?: 'roommate' | 'roomshare';
  // Roommate type
  roommateType?: 'have-room' | 'find-partner';
  // Property type
  propertyType?: 'house' | 'apartment';
  // Status
  status?: 'active' | 'hidden' | 'deleted';
}

/**
 * Parse price string to number (in millions)
 * Examples: "4.5tr" -> 4.5, "4,5 triệu" -> 4.5, "4.500.000đ" -> 4.5
 */
export function parsePrice(priceStr: string): number {
  if (!priceStr) return 0;

  // Remove common suffixes and normalize
  const normalized = priceStr
    .toLowerCase()
    .replace(/triệu|tr|trieu|đ|vnd|\/tháng|\/thang/g, '')
    .replace(/\./g, '') // Remove thousand separators
    .replace(/,/g, '.') // Convert comma to decimal point
    .trim();

  const num = parseFloat(normalized);

  // If the number is very large (> 100), it's probably in full VND
  if (num > 100) {
    return num / 1000000;
  }

  return isNaN(num) ? 0 : num;
}

/**
 * Filter listings based on criteria
 * Performs client-side filtering for fast UX
 */
export function filterListings(
  listings: RoomListing[],
  filters: ListingFilters
): RoomListing[] {
  return listings.filter((listing) => {
    // Category filter
    if (filters.category && listing.category !== filters.category) {
      return false;
    }

    // Roommate type filter
    if (filters.roommateType && listing.roommateType !== filters.roommateType) {
      return false;
    }

    // Property type filter
    if (filters.propertyType && listing.propertyType !== filters.propertyType) {
      return false;
    }

    // Status filter (default: only show active)
    if (filters.status) {
      if (listing.status !== filters.status) return false;
    } else {
      // By default, only show active or undefined status
      if (listing.status && listing.status !== 'active') return false;
    }

    // Price filter
    if (filters.priceMin !== undefined || filters.priceMax !== undefined) {
      const price = parsePrice(listing.price);
      if (filters.priceMin !== undefined && price < filters.priceMin) {
        return false;
      }
      if (filters.priceMax !== undefined && price > filters.priceMax) {
        return false;
      }
    }

    // Location filter (case-insensitive partial match)
    if (filters.location) {
      const locationLower = listing.location.toLowerCase();
      const filterLower = filters.location.toLowerCase();
      if (!locationLower.includes(filterLower)) {
        return false;
      }
    }

    // Keywords filter (search in title, description, location)
    if (filters.keywords) {
      const keywordsLower = filters.keywords.toLowerCase();
      const searchableText = [
        listing.title,
        listing.description,
        listing.location,
        listing.author,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      // Check if all keywords are present
      const keywords = keywordsLower.split(/\s+/).filter(k => k.length > 0);
      for (const keyword of keywords) {
        if (!searchableText.includes(keyword)) {
          return false;
        }
      }
    }

    return true;
  });
}

/**
 * Sort listings by different criteria
 */
export type SortOption = 'newest' | 'oldest' | 'price-asc' | 'price-desc';

export function sortListings(
  listings: RoomListing[],
  sortBy: SortOption
): RoomListing[] {
  const sorted = [...listings];

  switch (sortBy) {
    case 'newest':
      return sorted.sort((a, b) => {
        const dateA = new Date(a.postedDate).getTime();
        const dateB = new Date(b.postedDate).getTime();
        return dateB - dateA;
      });
    case 'oldest':
      return sorted.sort((a, b) => {
        const dateA = new Date(a.postedDate).getTime();
        const dateB = new Date(b.postedDate).getTime();
        return dateA - dateB;
      });
    case 'price-asc':
      return sorted.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    case 'price-desc':
      return sorted.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    default:
      return sorted;
  }
}
