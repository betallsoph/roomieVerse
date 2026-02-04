import Fuse, { IFuseOptions } from 'fuse.js';
import { RoomListing } from '../data/types';

/**
 * Fuse.js configuration for fuzzy search
 * Optimized for Vietnamese text search
 */
const fuseOptions: IFuseOptions<RoomListing> = {
  // Which keys to search in
  keys: [
    { name: 'title', weight: 0.4 },
    { name: 'description', weight: 0.3 },
    { name: 'location', weight: 0.2 },
    { name: 'author', weight: 0.1 },
  ],
  // Fuzzy matching threshold (0 = exact match, 1 = match anything)
  threshold: 0.4,
  // Minimum characters before search kicks in
  minMatchCharLength: 2,
  // Include score in results for debugging/sorting
  includeScore: true,
  // Ignore location in string (search anywhere)
  ignoreLocation: true,
  // Use extended search syntax
  useExtendedSearch: false,
  // Find individual words
  findAllMatches: true,
};

// Singleton Fuse instance (lazy initialized)
let fuseInstance: Fuse<RoomListing> | null = null;
let cachedListings: RoomListing[] = [];

/**
 * Initialize or update Fuse index
 * Call this when listings data changes
 */
export function initializeSearch(listings: RoomListing[]): void {
  // Only reinitialize if listings changed
  if (listings !== cachedListings) {
    fuseInstance = new Fuse(listings, fuseOptions);
    cachedListings = listings;
  }
}

/**
 * Perform fuzzy search on listings
 * Returns listings sorted by relevance
 */
export function searchListings(
  listings: RoomListing[],
  query: string
): RoomListing[] {
  if (!query || query.trim().length < 2) {
    return listings;
  }

  // Initialize/update Fuse if needed
  initializeSearch(listings);

  if (!fuseInstance) {
    return listings;
  }

  const results = fuseInstance.search(query.trim());
  return results.map((result) => result.item);
}

/**
 * Get search suggestions based on partial input
 * Returns top N matching items
 */
export function getSearchSuggestions(
  listings: RoomListing[],
  query: string,
  limit: number = 5
): { title: string; location: string; id: number | string }[] {
  if (!query || query.trim().length < 1) {
    return [];
  }

  initializeSearch(listings);

  if (!fuseInstance) {
    return [];
  }

  const results = fuseInstance.search(query.trim(), { limit });
  return results.map((result) => ({
    title: result.item.title,
    location: result.item.location,
    id: result.item.id,
  }));
}

/**
 * Highlight matching text in search results
 * Returns HTML string with <mark> tags
 */
export function highlightMatch(text: string, query: string): string {
  if (!query || !text) return text;

  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  let result = text;

  for (const word of words) {
    const regex = new RegExp(`(${escapeRegex(word)})`, 'gi');
    result = result.replace(regex, '<mark class="bg-yellow-200">$1</mark>');
  }

  return result;
}

/**
 * Escape special regex characters
 */
function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
