"use client";

import { useState, useEffect } from "react";
import MainHeader from "../../components/MainHeader";
import ShareFooter from "../../components/ShareFooter";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../contexts/AuthContext";
import { getPendingListings, approveListing, rejectListing, hardDeleteListing } from "../../data/listings";
import { RoomListing } from "../../data/types";
import { ArrowLeft, Shield, CheckCircle, XCircle, Eye, Flag, Clock, MapPin, Calendar, Loader2 } from "lucide-react";

export default function ModerationPage() {
  const { user, isAdmin, isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [pendingPosts, setPendingPosts] = useState<RoomListing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [approvedToday, setApprovedToday] = useState(0);

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

    if (isAdmin) {
      fetchPending();
    }
  }, [isAdmin]);

  const handleApprove = async (listingId: string) => {
    if (!user) return;
    setActionLoading(listingId);
    try {
      await approveListing(listingId, user.uid);
      setPendingPosts(prev => prev.filter(p => String(p.id) !== listingId));
      setApprovedToday(prev => prev + 1);
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

  if (authLoading || (!isAuthenticated || !isAdmin)) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-300 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <MainHeader />

      <section className="py-12 md:py-16 border-b-2 border-black">
        <div className="wrapper max-w-5xl">
          {/* Header */}
          <div className="mb-10">
            <Link href="/admin" className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-500 hover:text-black transition-colors mb-6">
              <ArrowLeft className="w-4 h-4" />
              Quay lại
            </Link>
            <div className="flex items-center gap-3 mb-2">
              <Shield className="w-8 h-8" strokeWidth={1.5} />
              <h1 className="text-3xl md:text-4xl font-black">Kiểm Duyệt Nội Dung</h1>
            </div>
            <p className="text-zinc-600">Duyệt bài đăng và xử lý báo cáo từ người dùng</p>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 mb-10 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-zinc-400" />
              <span className="text-zinc-600">Chờ duyệt:</span>
              <span className="font-bold text-lg">{pendingPosts.length}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-zinc-400" />
              <span className="text-zinc-600">Đã duyệt phiên này:</span>
              <span className="font-bold text-lg">{approvedToday}</span>
            </div>
          </div>

          {/* Loading state */}
          {isLoading && (
            <div className="text-center py-16">
              <Loader2 className="w-8 h-8 text-zinc-400 mx-auto mb-3 animate-spin" />
              <p className="text-zinc-500">Đang tải...</p>
            </div>
          )}

          {/* Pending Posts */}
          {!isLoading && pendingPosts.length > 0 && (
            <div className="mb-12">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5" /> Bài Đăng Chờ Duyệt
              </h2>
              <div className="border-2 border-black rounded-xl overflow-hidden">
                {pendingPosts.map((post, idx) => {
                  const postId = String(post.id);
                  const isRejecting = rejectingId === postId;
                  const isActionLoading = actionLoading === postId;
                  const detailRoute = post.category === "roomshare"
                    ? `/roomshare/listing/${postId}`
                    : `/roommate/listing/${postId}`;

                  return (
                    <div
                      key={postId}
                      className={`p-5 ${idx !== pendingPosts.length - 1 ? 'border-b-2 border-black' : ''} hover:bg-zinc-50 transition-colors`}
                    >
                      {/* Main row */}
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`px-2 py-0.5 text-xs font-bold rounded border border-black ${post.category === "roommate" ? "bg-blue-100" : "bg-pink-100"}`}>
                              {post.category === "roommate" ? "Roommate" : "Roomshare"}
                            </span>
                            {post.roommateType && (
                              <span className="px-2 py-0.5 text-xs font-bold rounded border border-zinc-300 bg-zinc-100">
                                {post.roommateType === "have-room" ? "Có phòng" : "Tìm phòng"}
                              </span>
                            )}
                            <span className="text-xs text-zinc-400">{post.postedDate}</span>
                          </div>
                          <h3 className="font-bold truncate">{post.title}</h3>
                          <p className="text-sm text-zinc-500">bởi {post.author} • {post.userId}</p>
                          {/* Extra info */}
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

                      {/* Reject reason input */}
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
                            Xác nhận từ chối
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
            </div>
          )}

          {/* Empty State */}
          {!isLoading && pendingPosts.length === 0 && (
            <div className="text-center py-16">
              <Shield className="w-16 h-16 text-zinc-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-zinc-500 mb-2">Không có bài đăng chờ duyệt</h3>
              <p className="text-sm text-zinc-400">Tất cả bài đăng đã được xử lý</p>
            </div>
          )}
        </div>
      </section>

      <ShareFooter />
    </div>
  );
}
