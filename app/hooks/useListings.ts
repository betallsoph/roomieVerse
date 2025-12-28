import useSWR from 'swr';
import { RoomListing } from '../data/types';
import { getListings, getListingsByCategory, getListingById, getListingsByUserId } from '../data/listings';

// SWR cache keys
export const LISTINGS_KEY = 'listings';
export const LISTINGS_BY_CATEGORY_KEY = (category: string) => `listings-${category}`;
export const LISTING_BY_ID_KEY = (id: number) => `listing-${id}`;
export const LISTINGS_BY_USER_KEY = (userId: string) => `listings-user-${userId}`;

/**
 * Hook to fetch all listings
 * Uses SWR for caching and deduplication
 */
export function useListings() {
  const { data, error, isLoading, mutate } = useSWR<RoomListing[]>(
    LISTINGS_KEY,
    () => getListings(),
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000, // 1 minute
    }
  );

  return {
    listings: data || [],
    isLoading,
    isError: error,
    mutate, // Use this to manually refresh data
  };
}

/**
 * Hook to fetch listings by category (roommate or roomshare)
 */
export function useListingsByCategory(category: 'roommate' | 'roomshare') {
  const { data, error, isLoading, mutate } = useSWR<RoomListing[]>(
    LISTINGS_BY_CATEGORY_KEY(category),
    () => getListingsByCategory(category),
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  );

  return {
    listings: data || [],
    isLoading,
    isError: error,
    mutate,
  };
}

/**
 * Hook to fetch a single listing by ID
 */
export function useListingById(id: number | null) {
  const { data, error, isLoading, mutate } = useSWR<RoomListing | null>(
    id ? LISTING_BY_ID_KEY(id) : null,
    () => (id ? getListingById(id) : null),
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  );

  return {
    listing: data,
    isLoading,
    isError: error,
    mutate,
  };
}

/**
 * Hook to fetch listings by user ID
 */
export function useListingsByUser(userId: string | null) {
  const { data, error, isLoading, mutate } = useSWR<RoomListing[]>(
    userId ? LISTINGS_BY_USER_KEY(userId) : null,
    () => (userId ? getListingsByUserId(userId) : []),
    {
      revalidateOnFocus: false,
      dedupingInterval: 30000, // 30 seconds for user's own listings
    }
  );

  return {
    listings: data || [],
    isLoading,
    isError: error,
    mutate,
  };
}
