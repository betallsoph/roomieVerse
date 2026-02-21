'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";

/**
 * Redirects staff users (mod/tester/admin) to /admin dashboard.
 * Use this on user-facing pages that staff should not access.
 */
export function useAdminRedirect() {
  const { isMod, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (isMod) {
      router.replace("/admin");
    }
  }, [isMod, isLoading, router]);

  return { isAdmin: isMod, isLoading };
}
