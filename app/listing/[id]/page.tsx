"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { getListingById } from "../../data/listings";
import MainHeader from "../../components/MainHeader";
import ShareFooter from "../../components/ShareFooter";

/**
 * Legacy route: /listing/[id]
 * This page redirects to the new category-based routes:
 * - /roommate/listing/[id] for roommate listings
 * - /roomshare/listing/[id] for roomshare listings
 */
export default function ListingRedirectPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function redirectToNewRoute() {
      // Check ID prefix first for quick redirect
      if (id.startsWith("rm-")) {
        router.replace(`/roommate/listing/${id}`);
        return;
      }
      if (id.startsWith("rs-")) {
        router.replace(`/roomshare/listing/${id}`);
        return;
      }

      // No prefix, need to fetch listing to determine category
      const listing = await getListingById(id);
      if (listing) {
        if (listing.category === "roomshare") {
          router.replace(`/roomshare/listing/${id}`);
        } else {
          router.replace(`/roommate/listing/${id}`);
        }
      } else {
        setNotFound(true);
      }
    }

    redirectToNewRoute();
  }, [id, router]);

  if (notFound) {
    return (
      <div className="min-h-screen bg-white">
        <MainHeader />
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="rounded-xl border-2 border-black bg-white p-16 text-center shadow-[var(--shadow-primary)]">
            <h1 className="mb-4 text-3xl font-bold">Không tìm thấy bài đăng</h1>
            <p className="mb-8 text-zinc-600">Bài đăng này có thể đã bị xóa hoặc không tồn tại.</p>
            <a href="/roommate" className="btn-primary">
              Xem các bài đăng khác
            </a>
          </div>
        </div>
        <ShareFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <MainHeader />
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-zinc-400" />
      </div>
      <ShareFooter />
    </div>
  );
}
