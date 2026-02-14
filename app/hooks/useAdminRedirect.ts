'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";

/**
 * Redirects admin users to /admin dashboard.
 * Use this on user-facing pages that admin should not access.
 */
export function useAdminRedirect() {
  const { isAdmin, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (isAdmin) {
      router.replace("/admin");
    }
  }, [isAdmin, isLoading, router]);

  return { isAdmin, isLoading };
}
