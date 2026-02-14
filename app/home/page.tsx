'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAdminRedirect } from "../hooks/useAdminRedirect";

export default function HomePage() {
  useAdminRedirect();
  const router = useRouter();

  useEffect(() => {
    router.push("/");
  }, [router]);

  return null;
}
