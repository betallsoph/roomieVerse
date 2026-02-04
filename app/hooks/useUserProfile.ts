import useSWR from 'swr';
import { UserProfile } from '../data/types';
import { getUserProfile, saveUserProfile } from '../data/users';

// SWR cache key
export const USER_PROFILE_KEY = (uid: string) => `user-profile-${uid}`;

/**
 * Hook to fetch user profile with SWR caching
 * Reduces Firestore reads by caching profile data
 */
export function useUserProfile(uid: string | null) {
  const { data, error, isLoading, mutate } = useSWR<UserProfile | null>(
    uid ? USER_PROFILE_KEY(uid) : null,
    () => (uid ? getUserProfile(uid) : null),
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000, // 1 minute
      revalidateIfStale: false, // Don't auto-revalidate stale data
    }
  );

  /**
   * Update profile and refresh cache
   */
  const updateProfile = async (profile: UserProfile) => {
    await saveUserProfile(profile);
    // Optimistically update the cache
    mutate(profile, false);
  };

  return {
    profile: data,
    isLoading,
    isError: error,
    mutate,
    updateProfile,
  };
}
