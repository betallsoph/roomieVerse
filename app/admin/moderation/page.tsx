"use client";

import { useState, useEffect, useMemo } from "react";
import MainHeader from "../../components/MainHeader";
import ShareFooter from "../../components/ShareFooter";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../contexts/AuthContext";
import { getPendingListings, approveListing, rejectListing, hardDeleteListing } from "../../data/listings";
import { RoomListing } from "../../data/types";
import {
  ArrowLeft, Shield, CheckCircle, XCircle, Eye, Clock, MapPin, Calendar, Loader2,
  Home, Users, Building2, UserSearch
} from "lucide-react";

// Listing sub-filter
type ListingFilter = "all" | "have-room" | "find-partner" | "roomshare-house" | "roomshare-apartment";

const listingFilters: { key: ListingFilter; label: string; icon: React.ElementType }[] = [
  { key: "all", label: "Tất cả", icon: Shield },
  { key: "have-room", label: "Có phòng sẵn", icon: Home },
  { key: "find-partner", label: "Tìm bạn ở ghép", icon: UserSearch },
  { key: "roomshare-house", label: "Phòng nhà mặt đất", icon: Building2 },
  { key: "roomshare-apartment", label: "Phòng chung cư", icon: Building2 },
];

function getListingFlowLabel(post: RoomListing): string {
  if (post.category === "roommate") {
    return post.roommateType === "have-room" ? "Có phòng sẵn" : "Tìm bạn ở ghép";
  }
  // roomshare
  const isApartment = post.propertyTypes?.includes("apartment");
  return isApartment ? "Phòng chung cư" : "Phòng nhà mặt đất";
}

function getListingFlowColor(post: RoomListing): string {
  if (post.category === "roommate") {
    return post.roommateType === "have-room" ? "bg-blue-100 border-blue-300" : "bg-purple-100 border-purple-300";
  }
  const isApartment = post.propertyTypes?.includes("apartment");
  return isApartment ? "bg-pink-100 border-pink-300" : "bg-orange-100 border-orange-300";
}

function matchesFilter(post: RoomListing, filter: ListingFilter): boolean {
  if (filter === "all") return true;
  if (filter === "have-room") return post.category === "roommate" && post.roommateType === "have-room";
  if (filter === "find-partner") return post.category === "roommate" && post.roommateType === "find-partner";
  if (filter === "roomshare-house") return post.category === "roomshare" && !post.propertyTypes?.includes("apartment");
  if (filter === "roomshare-apartment") return post.category === "roomshare" && (post.propertyTypes?.includes("apartment") ?? false);
  return true;
}

export default function ModerationPage() {
  const { user, isAdmin, isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [listingFilter, setListingFilter] = useState<ListingFilter>("all");
  const [pendingPosts, setPendingPosts] = useState<RoomListing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [approvedCount, setApprovedCount] = useState(0);

  // Auth guard
  useEffect(() => {
    if (!authLoading && (!isAuthenticated || !isAdmin)) {
      router.push("/");
    }
  }, [authLoading, isAuthenticated, isAdmin, router]);

  // Fetch pending listings
  useEffect(() => {
    async function fetchPending() {
      try {
        const listings = await getPendingListings();
        setPendingPosts(listings);
      } catch (error) {
        console.error("Error fetching pending listings:", error);
      } finally {
        setIsLoading(false);
      }
    }
    if (isAdmin) fetchPending();
  }, [isAdmin]);

  // Filtered posts
  const filteredPosts = useMemo(
    () => pendingPosts.filter(p => matchesFilter(p, listingFilter)),
    [pendingPosts, listingFilter]
  );

  // Count per filter
  const filterCounts = useMemo(() => {
    const counts: Record<ListingFilter, number> = {
      all: pendingPosts.length,
      "have-room": 0,
      "find-partner": 0,
      "roomshare-house": 0,
      "roomshare-apartment": 0,
    };
    for (const p of pendingPosts) {
      if (p.category === "roommate" && p.roommateType === "have-room") counts["have-room"]++;
      else if (p.category === "roommate") counts["find-partner"]++;
      else if (p.propertyTypes?.includes("apartment")) counts["roomshare-apartment"]++;
      else counts["roomshare-house"]++;
    }
    return counts;
  }, [pendingPosts]);

  const handleApprove = async (listingId: string) => {
    if (!user) return;
    setActionLoading(listingId);
    try {
      await approveListing(listingId, user.uid);
      setPendingPosts(prev => prev.filter(p => String(p.id) !== listingId));
      setApprovedCount(prev => prev + 1);
    } catch (error) {
      console.error("Error approving listing:", error);
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (listingId: string) => {
    if (!user || !rejectReason.trim()) return;
    setActionLoading(listingId);
    try {
      await rejectListing(listingId, user.uid, rejectReason.trim());
      setPendingPosts(prev => prev.filter(p => String(p.id) !== listingId));
      setRejectingId(null);
      setRejectReason("");
    } catch (error) {
      console.error("Error rejecting listing:", error);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (listingId: string) => {
    if (!confirm("Xóa vĩnh viễn bài đăng này?")) return;
    setActionLoading(listingId);
    try {
      await hardDeleteListing(listingId);
      setPendingPosts(prev => prev.filter(p => String(p.id) !== listingId));
    } catch (error) {
      console.error("Error deleting listing:", error);
    } finally {
      setActionLoading(null);
    }
  };

  if (authLoading || !isAuthenticated || !isAdmin) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-300 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <MainHeader />

      <section className="py-12 md:py-16">
        <div className="wrapper max-w-5xl">
          {/* Header */}
          <div className="mb-8">
            <Link href="/admin" className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-500 hover:text-black transition-colors mb-6">
              <ArrowLeft className="w-4 h-4" />
              Quay lại Dashboard
            </Link>
            <h1 className="text-3xl md:text-4xl font-black mb-2">Kiểm Duyệt Tin Đăng Chính</h1>
            <p className="text-zinc-600">Duyệt bài tìm phòng, tìm bạn ở ghép</p>
          </div>
              {/* Stats bar */}
              <div className="flex flex-wrap gap-6 mb-6 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-zinc-400" />
                  <span className="text-zinc-600">Chờ duyệt:</span>
                  <span className="font-bold">{pendingPosts.length}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-zinc-400" />
                  <span className="text-zinc-600">Đã duyệt phiên này:</span>
                  <span className="font-bold">{approvedCount}</span>
                </div>
              </div>

              {/* Sub-filters */}
              <div className="flex flex-wrap gap-2 mb-6">
                {listingFilters.map(f => (
                  <button
                    key={f.key}
                    onClick={() => setListingFilter(f.key)}
                    className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-lg border-2 transition-all ${
                      listingFilter === f.key
                        ? "border-black bg-zinc-900 text-white"
                        : "border-zinc-300 bg-white text-zinc-600 hover:border-black"
                    }`}
                  >
                    <f.icon className="w-3.5 h-3.5" />
                    {f.label}
                    <span className={`ml-0.5 text-[10px] px-1.5 py-0.5 rounded-full ${
                      listingFilter === f.key ? "bg-white/20" : "bg-zinc-100"
                    }`}>
                      {filterCounts[f.key]}
                    </span>
                  </button>
                ))}
              </div>

              {/* Loading */}
              {isLoading && (
                <div className="text-center py-16">
                  <Loader2 className="w-8 h-8 text-zinc-400 mx-auto mb-3 animate-spin" />
                  <p className="text-zinc-500">Đang tải...</p>
                </div>
              )}

              {/* Listing items */}
              {!isLoading && filteredPosts.length > 0 && (
                <div className="border-2 border-black rounded-xl overflow-hidden">
                  {filteredPosts.map((post, idx) => {
                    const postId = String(post.id);
                    const isRejecting = rejectingId === postId;
                    const isActionLoading = actionLoading === postId;
                    const detailRoute = post.category === "roomshare"
                      ? `/roomshare/listing/${postId}`
                      : `/roommate/listing/${postId}`;

                    return (
                      <div
                        key={postId}
                        className={`p-5 ${idx !== filteredPosts.length - 1 ? "border-b-2 border-black" : ""} hover:bg-zinc-50 transition-colors`}
                      >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1.5">
                              <span className={`px-2 py-0.5 text-xs font-bold rounded border ${getListingFlowColor(post)}`}>
                                {getListingFlowLabel(post)}
                              </span>
                              <span className="text-xs text-zinc-400">{post.postedDate}</span>
                            </div>
                            <h3 className="font-bold truncate mb-0.5">{post.title}</h3>
                            <p className="text-sm text-zinc-500">bởi {post.author}</p>
                            <div className="mt-2 flex flex-wrap gap-3 text-xs text-zinc-500">
                              {(post.city || post.location) && (
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  {post.district ? `${post.district}, ${post.city}` : post.location}
                                </span>
                              )}
                              {post.moveInDate && (
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  {post.moveInDate}
                                </span>
                              )}
                              {post.price && (
                                <span className="font-bold text-zinc-700">{post.price}</span>
                              )}
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex gap-2 flex-shrink-0">
                            <Link
                              href={detailRoute}
                              target="_blank"
                              className="px-3 py-2 text-sm font-semibold border-2 border-black rounded-lg hover:bg-zinc-100 transition-colors flex items-center gap-1"
                            >
                              <Eye className="w-4 h-4" /> Xem
                            </Link>
                            <button
                              onClick={() => handleApprove(postId)}
                              disabled={isActionLoading}
                              className="px-3 py-2 text-sm font-semibold border-2 border-black rounded-lg bg-green-100 hover:bg-green-200 transition-colors flex items-center gap-1 disabled:opacity-50"
                            >
                              {isActionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                              Duyệt
                            </button>
                            <button
                              onClick={() => setRejectingId(isRejecting ? null : postId)}
                              disabled={isActionLoading}
                              className="px-3 py-2 text-sm font-semibold border-2 border-black rounded-lg hover:bg-red-100 transition-colors flex items-center gap-1 disabled:opacity-50"
                            >
                              <XCircle className="w-4 h-4" /> Từ chối
                            </button>
                          </div>
                        </div>

                        {/* Reject reason */}
                        {isRejecting && (
                          <div className="mt-4 flex gap-2">
                            <input
                              type="text"
                              value={rejectReason}
                              onChange={(e) => setRejectReason(e.target.value)}
                              placeholder="Lý do từ chối..."
                              className="flex-1 px-3 py-2 text-sm border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
                            />
                            <button
                              onClick={() => handleReject(postId)}
                              disabled={!rejectReason.trim() || isActionLoading}
                              className="px-4 py-2 text-sm font-semibold border-2 border-black rounded-lg bg-red-100 hover:bg-red-200 transition-colors disabled:opacity-50"
                            >
                              Xác nhận
                            </button>
                            <button
                              onClick={() => handleDelete(postId)}
                              disabled={isActionLoading}
                              className="px-4 py-2 text-sm font-semibold border-2 border-black rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors disabled:opacity-50"
                            >
                              Xóa hẳn
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Empty */}
              {!isLoading && filteredPosts.length === 0 && (
                <div className="text-center py-16 border-2 border-dashed border-zinc-200 rounded-xl">
                  <Shield className="w-12 h-12 text-zinc-300 mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-zinc-500 mb-1">
                    {listingFilter === "all" ? "Không có bài đăng chờ duyệt" : "Không có bài đăng nào trong mục này"}
                  </h3>
                  <p className="text-sm text-zinc-400">
                    {listingFilter === "all" ? "Tất cả bài đăng đã được xử lý" : "Thử chọn mục khác hoặc quay về \"Tất cả\""}
                  </p>
                </div>
              )}
        </div>
      </section>

      <ShareFooter />
    </div>
  );
}
