'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import MainHeader from "../components/MainHeader";
import ShareFooter from "../components/ShareFooter";
import ProtectedRoute from "../components/ProtectedRoute";
import CompleteProfileModal from "../components/CompleteProfileModal";
import EditProfileModal from "../components/EditProfileModal";
import PostTypeModal from "../components/PostTypeModal";
import { useAuth } from "../contexts/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import { Heart, Loader2, Sparkles } from "lucide-react";
import { getUserProfile, saveUserProfile } from "../data/users";
import { getListingsByUserId } from "../data/listings";
import { UserProfile, RoomListing } from "../data/types";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showCompleteProfileModal, setShowCompleteProfileModal] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [showPostTypeModal, setShowPostTypeModal] = useState(false);
  const [profileData, setProfileData] = useState<UserProfile | null>(null);
  const [myListings, setMyListings] = useState<RoomListing[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Check if redirected from reminder modal
  const shouldOpenCompleteModal = searchParams.get('complete') === 'true';

  // Load profile and listings from Firestore
  useEffect(() => {
    async function loadData() {
      if (!user) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      try {
        // Load profile from Firestore
        const profile = await getUserProfile(user.uid);

        if (profile) {
          setProfileData(profile);
          // Check if profile is incomplete - show modal if incomplete OR if redirected with ?complete=true
          if (!profile.gender || !profile.birthYear || !profile.occupation) {
            setShowCompleteProfileModal(true);
          } else if (shouldOpenCompleteModal) {
            // Profile already complete, clear the query param
            router.replace('/profile');
          }
        } else {
          // Create initial profile from Firebase Auth data
          const newProfile: UserProfile = {
            uid: user.uid,
            email: user.email || '',
            displayName: user.displayName || '',
            photoURL: user.photoURL || undefined,
          };
          setProfileData(newProfile);
          setShowCompleteProfileModal(true);
        }

        // Load user's listings
        const listings = await getListingsByUserId(user.uid);
        setMyListings(listings);
      } catch (error) {
        console.error("Error loading profile data:", error);
        // Still show page with Firebase Auth data
        const newProfile: UserProfile = {
          uid: user.uid,
          email: user.email || '',
          displayName: user.displayName || '',
          photoURL: user.photoURL || undefined,
        };
        setProfileData(newProfile);
        // Still show complete modal on error if redirected
        if (shouldOpenCompleteModal) {
          setShowCompleteProfileModal(true);
        }
      }

      setIsLoading(false);
    }

    loadData();
  }, [user, shouldOpenCompleteModal, router]);

  const handleLogout = () => {
    setTimeout(() => {
      logout();
      if (window.history.length > 2) {
        router.back();
      } else {
        router.push("/");
      }
    }, 150);
  };

  const handleCompleteProfileSubmit = async (data: { gender: string; birthYear: string; occupation: string }) => {
    if (!user || !profileData) return;

    const updatedProfile: UserProfile = {
      ...profileData,
      gender: data.gender,
      birthYear: data.birthYear,
      occupation: data.occupation,
    };

    try {
      // Save to Firestore
      await saveUserProfile(updatedProfile);
      setProfileData(updatedProfile);
      setShowCompleteProfileModal(false);
    } catch (error) {
      console.error("Error saving profile:", error);
      // Still update local state even if Firestore fails
      setProfileData(updatedProfile);
      setShowCompleteProfileModal(false);
    }
  };

  const handleEditProfileSave = async (data: { gender: string; birthYear: string; occupation: string }) => {
    if (!user || !profileData) return;

    const updatedProfile: UserProfile = {
      ...profileData,
      gender: data.gender,
      birthYear: data.birthYear,
      occupation: data.occupation,
    };

    try {
      await saveUserProfile(updatedProfile);
      setProfileData(updatedProfile);
      setShowEditProfileModal(false);
    } catch (error) {
      console.error("Error saving profile:", error);
      setProfileData(updatedProfile);
      setShowEditProfileModal(false);
    }
  };

  const handleModalClose = () => {
    setShowCompleteProfileModal(false);
  };

  // Get display name or fallback
  const displayName = profileData?.displayName || user?.displayName || 'Người dùng';
  const photoURL = profileData?.photoURL || user?.photoURL;

  // Get status display text and color
  const getStatusDisplay = (status?: string) => {
    switch (status) {
      case 'active':
        return { text: 'Đang hiển thị', color: 'bg-green-200' };
      case 'hidden':
        return { text: 'Đã ẩn', color: 'bg-yellow-200' };
      case 'deleted':
        return { text: 'Đã xóa', color: 'bg-red-200' };
      default:
        return { text: 'Đang hiển thị', color: 'bg-green-200' };
    }
  };

  if (isLoading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-white">
          <MainHeader />
          <div className="flex min-h-[60vh] items-center justify-center">
            <Loader2 className="h-12 w-12 animate-spin text-zinc-400" />
          </div>
          <ShareFooter />
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-white">
        <MainHeader />

        {/* Complete Profile Modal - only for first time */}
        <CompleteProfileModal
          isOpen={showCompleteProfileModal}
          onClose={handleModalClose}
          onComplete={handleCompleteProfileSubmit}
        />

        {/* Edit Profile Modal - for editing existing data */}
        <EditProfileModal
          isOpen={showEditProfileModal}
          onClose={() => setShowEditProfileModal(false)}
          onSave={handleEditProfileSave}
          initialData={{
            gender: profileData?.gender || '',
            birthYear: profileData?.birthYear || '',
            occupation: profileData?.occupation || ''
          }}
        />

        {/* Roommate Type Modal */}
        <PostTypeModal
          isOpen={showPostTypeModal}
          onClose={() => setShowPostTypeModal(false)}
        />

        {/* Hero Section */}
        <section className="bg-blue-50 py-16 sm:py-24 relative before:absolute before:bottom-0 before:left-0 before:right-0 before:h-20 before:bg-gradient-to-b before:from-transparent before:to-white before:pointer-events-none">
          <div className="mx-auto max-w-7xl px-6">

            <div className="mb-8">
              <h1 className="mb-4 text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl">
                Hồ sơ của bạn
              </h1>
              <p className="max-w-2xl text-base sm:text-lg text-zinc-700">
                Quản lý thông tin cá nhân và các bài đăng của bạn
              </p>
            </div>

            {/* Profile Info Card */}
            <div className="rounded-xl border-[6px] border-black bg-white p-8">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  {photoURL ? (
                    <Image
                      src={photoURL}
                      alt={displayName}
                      width={80}
                      height={80}
                      className="h-20 w-20 rounded-full border-2 border-black object-cover"
                    />
                  ) : (
                    <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-black bg-blue-300 text-3xl font-bold">
                      {displayName.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <h2 className="text-2xl font-bold">{displayName}</h2>
                    {user?.email && (
                      <p className="text-sm text-zinc-500">{user.email}</p>
                    )}
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="btn-red btn-click-sink text-base px-6 py-3"
                >
                  Đăng xuất
                </button>
              </div>
            </div>

            {/* Personal Info Section */}
            <div className="mt-6 card bg-white p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Thông tin cá nhân</h3>
                <button
                  onClick={() => setShowEditProfileModal(true)}
                  className="btn-secondary text-sm px-4 py-2"
                >
                  Chỉnh sửa
                </button>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {/* Giới tính */}
                <div>
                  <p className="text-sm text-zinc-500 mb-1">Giới tính</p>
                  <p className="text-base font-medium">{profileData?.gender || 'Chưa cập nhật'}</p>
                </div>

                {/* Năm sinh */}
                <div>
                  <p className="text-sm text-zinc-500 mb-1">Năm sinh</p>
                  <p className="text-base font-medium">{profileData?.birthYear || 'Chưa cập nhật'}</p>
                </div>

                {/* Nghề nghiệp */}
                <div>
                  <p className="text-sm text-zinc-500 mb-1">Nghề nghiệp hiện tại</p>
                  <p className="text-base font-medium">{profileData?.occupation || 'Chưa cập nhật'}</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-6 grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
              <div
                onClick={() => setTimeout(() => router.push('/favorites'), 150)}
                className="card bg-pink-100 p-6 hover:bg-pink-200 transition-all group shadow-[4px_4px_0_0_#000] btn-click-sink cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-300 border-2 border-black transition-transform group-hover:scale-110">
                    <Heart className="h-6 w-6 fill-current text-pink-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold group-hover:text-pink-600 transition-colors">
                      Yêu thích của tôi
                    </h3>
                    <p className="text-sm text-zinc-600">
                      Xem các bài đăng đã lưu
                    </p>
                  </div>
                </div>
              </div>

              <div
                onClick={() => setTimeout(() => router.push('/profile/lifestyle'), 150)}
                className="card bg-blue-100 p-6 hover:bg-blue-200 transition-all group shadow-[4px_4px_0_0_#000] btn-click-sink cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-300 border-2 border-black transition-transform group-hover:scale-110">
                    <Sparkles className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold group-hover:text-blue-600 transition-colors">
                      Hồ sơ lối sống
                    </h3>
                    <p className="text-sm text-zinc-600">
                      Thói quen & sở thích của bạn
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Listings Section */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-3xl font-bold">Bài đăng của tôi</h2>
              <button
                onClick={() => setShowPostTypeModal(true)}
                className="btn-primary text-base px-6 py-3"
              >
                Đăng bài mới
              </button>
            </div>

            {/* Listings Grid */}
            {myListings.length > 0 ? (
              <div className="grid gap-6">
                {myListings.map((listing) => {
                  const statusDisplay = getStatusDisplay(listing.status);
                  return (
                    <div key={listing.id} className="card bg-white p-6">
                      <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="mb-2 flex items-center gap-2">
                            <Link
                              href={`/listing/${listing.id}`}
                              className="text-xl font-bold hover:text-blue-600 transition-colors"
                            >
                              {listing.title}
                            </Link>
                            <span className={`rounded-md border-2 border-black ${statusDisplay.color} px-2 py-1 text-xs font-bold`}>
                              {statusDisplay.text}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-3 text-sm text-zinc-600">
                            <span>{listing.location}</span>
                            <span>{listing.moveInDate}</span>
                            <span>{listing.postedDate}</span>
                          </div>
                        </div>
                        <Link
                          href={`/listing/${listing.id}`}
                          className="rounded-lg border-2 border-black bg-blue-300 px-4 py-2 font-bold hover:shadow-[var(--shadow-secondary)] transition-all"
                        >
                          {listing.price}
                        </Link>
                      </div>

                      <Link href={`/listing/${listing.id}`}>
                        <p className="mb-4 text-sm text-zinc-700 hover:text-zinc-900 transition-colors cursor-pointer">
                          {listing.description}
                        </p>
                      </Link>

                      <div className="flex flex-wrap gap-3">
                        <button className="btn-primary text-sm px-4 py-2">
                          Chỉnh sửa
                        </button>
                        <Link
                          href={`/listing/${listing.id}`}
                          className="btn-secondary text-sm px-4 py-2"
                        >
                          Xem chi tiết
                        </Link>
                        <button className="btn-secondary text-sm px-4 py-2">
                          Tạm ẩn
                        </button>
                        <button className="btn-gray text-sm px-4 py-2">
                          Xóa
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="card bg-white p-12 text-center">
                <h3 className="text-2xl font-bold">Chưa có bài đăng nào</h3>
              </div>
            )}
          </div>
        </section>

        <ShareFooter />
      </div>
    </ProtectedRoute>
  );
}
