'use client';

import { SWRConfig } from 'swr';
import { ReactNode } from 'react';

interface SWRProviderProps {
  children: ReactNode;
}

export default function SWRProvider({ children }: SWRProviderProps) {
  return (
    <SWRConfig
      value={{
        // Revalidate on focus (when user switches back to tab)
        revalidateOnFocus: false,
        // Revalidate on reconnect (when network comes back)
        revalidateOnReconnect: true,
        // Retry failed requests
        errorRetryCount: 3,
        // Dedupe requests within 2 seconds
        dedupingInterval: 2000,
        // Keep data fresh for 5 minutes
        refreshInterval: 0, // Disable auto refresh, manual only
        // Show stale data while revalidating
        revalidateIfStale: true,
        // Cache data for 10 minutes
        provider: () => new Map(),
      }}
    >
      {children}
    </SWRConfig>
  );
}
