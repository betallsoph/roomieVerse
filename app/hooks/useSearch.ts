import { useState, useMemo, useCallback } from 'react';
import { RoomListing } from '../data/types';
import { searchListings, getSearchSuggestions } from '../lib/search';
import { filterListings, sortListings, ListingFilters, SortOption } from '../lib/filters';

interface UseSearchOptions {
  debounceMs?: number;
}

/**
 * Combined hook for search, filter, and sort
 * Provides a unified interface for listing discovery
 */
export function useListingSearch(
  listings: RoomListing[],
  options: UseSearchOptions = {}
) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<ListingFilters>({});
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  /**
   * Process listings through search -> filter -> sort pipeline
   */
  const processedListings = useMemo(() => {
    let result = listings;

    // Step 1: Apply fuzzy search if query exists
    if (searchQuery.trim()) {
      result = searchListings(result, searchQuery);
    }

    // Step 2: Apply filters
    result = filterListings(result, filters);

    // Step 3: Sort results (skip if search query exists - already sorted by relevance)
    if (!searchQuery.trim()) {
      result = sortListings(result, sortBy);
    }

    return result;
  }, [listings, searchQuery, filters, sortBy]);

  /**
   * Get search suggestions for autocomplete
   */
  const suggestions = useMemo(() => {
    if (!searchQuery.trim() || searchQuery.length < 2) {
      return [];
    }
    return getSearchSuggestions(listings, searchQuery, 5);
  }, [listings, searchQuery]);

  /**
   * Clear all search and filters
   */
  const clearAll = useCallback(() => {
    setSearchQuery('');
    setFilters({});
    setSortBy('newest');
  }, []);

  /**
   * Check if any filters are active
   */
  const hasActiveFilters = useMemo(() => {
    return (
      searchQuery.trim().length > 0 ||
      Object.keys(filters).some((key) => {
        const value = filters[key as keyof ListingFilters];
        return value !== undefined && value !== '' && value !== 'all';
      })
    );
  }, [searchQuery, filters]);

  return {
    // Results
    results: processedListings,
    totalCount: listings.length,
    filteredCount: processedListings.length,

    // Search
    searchQuery,
    setSearchQuery,
    suggestions,

    // Filters
    filters,
    setFilters,
    updateFilter: <K extends keyof ListingFilters>(
      key: K,
      value: ListingFilters[K]
    ) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    },

    // Sort
    sortBy,
    setSortBy,

    // Utils
    clearAll,
    hasActiveFilters,
  };
}
