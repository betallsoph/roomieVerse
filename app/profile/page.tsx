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
import ConfirmModal from "../components/ConfirmModal";
import { useAuth } from "../contexts/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import { Heart, Loader2, Check, MapPin, Calendar, Home, HeartOff, EyeOff, Eye, Trash2 } from "lucide-react";
import { getUserProfile, saveUserProfile } from "../data/users";
import { getListings, getListingsByUserId, deleteListing, updateListing } from "../data/listings";
import { UserProfile, RoomListing } from "../data/types";
import { useAdminRedirect } from "../hooks/useAdminRedirect";

export default function ProfilePage() {
  useAdminRedirect();
  const { user, logout, checkProfileComplete } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showCompleteProfileModal, setShowCompleteProfileModal] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [showPostTypeModal, setShowPostTypeModal] = useState(false);
  const [profileData, setProfileData] = useState<UserProfile | null>(null);
  const [myListings, setMyListings] = useState<RoomListing[]>([]);
  const [favorites, setFavorites] = useState<RoomListing[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Lifestyle form state
  const [schedule, setSchedule] = useState<string>("");
  const [cleanlinessLevel, setCleanlinessLevel] = useState<number>(2);
  const [habits, setHabits] = useState<string[]>([]);
  const [otherHabits, setOtherHabits] = useState("");
  const [isSavingLifestyle, setIsSavingLifestyle] = useState(false);
  const [lifestyleSaved, setLifestyleSaved] = useState(false);

  const cleanlinessLabels = ["Bừa bộn", "Thoải mái", "Bình thường", "Siêu sạch sẽ"];
  const cleanlinessValues = ["messy", "relaxed", "normal", "very-clean"];

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
          // Load lifestyle data if exists
          if (profile.lifestyle) {
            setSchedule(profile.lifestyle.schedule?.[0] || "");
            const cleanVal = profile.lifestyle.cleanliness?.[0];
            if (cleanVal === "messy") setCleanlinessLevel(0);
            else if (cleanVal === "relaxed") setCleanlinessLevel(1);
            else if (cleanVal === "very-clean") setCleanlinessLevel(3);
            else setCleanlinessLevel(2);
            setHabits(profile.lifestyle.habits || []);
            setOtherHabits(profile.lifestyle.otherHabits || "");
          }
          // Check if profile is incomplete
          if (!profile.gender || !profile.birthYear || !profile.occupation) {
            setShowCompleteProfileModal(true);
          } else if (shouldOpenCompleteModal) {
            router.replace('/profile');
          }
        } else {
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

        // Load favorites from localStorage
        const savedFavorites = localStorage.getItem('favorites');
        if (savedFavorites) {
          const favoriteIds = JSON.parse(savedFavorites) as (number | string)[];
          const allListings = await getListings();
          const favoritedListings = allListings.filter(listing =>
            favoriteIds.includes(listing.id as number) || favoriteIds.includes(listing.id as string)
          );
          setFavorites(favoritedListings);
        }
      } catch (error) {
        console.error("Error loading profile data:", error);
        const newProfile: UserProfile = {
          uid: user.uid,
          email: user.email || '',
          displayName: user.displayName || '',
          photoURL: user.photoURL || undefined,
        };
        setProfileData(newProfile);
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
      await saveUserProfile(updatedProfile);
      setProfileData(updatedProfile);
      // Force refresh auth context state
      await checkProfileComplete();
      setShowCompleteProfileModal(false);
    } catch (error) {
      console.error("Error saving profile:", error);
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
      // Force refresh auth context state
      await checkProfileComplete();
      setShowEditProfileModal(false);
    } catch (error) {
      console.error("Error saving profile:", error);
      setProfileData(updatedProfile);
      setShowEditProfileModal(false);
    }
  };

  const toggleHabit = (value: string) => {
    if (habits.includes(value)) {
      setHabits(habits.filter((v) => v !== value));
    } else {
      setHabits([...habits, value]);
    }
  };

  const handleSaveLifestyle = async () => {
    if (!user || !profileData) return;

    setIsSavingLifestyle(true);

    const updatedProfile: UserProfile = {
      ...profileData,
      lifestyle: {
        schedule: schedule ? [schedule] : [],
        cleanliness: [cleanlinessValues[cleanlinessLevel]],
        habits,
        otherHabits,
      },
    };

    try {
      await saveUserProfile(updatedProfile);
      setProfileData(updatedProfile);
      setLifestyleSaved(true);
      setTimeout(() => setLifestyleSaved(false), 2000);
    } catch (error) {
      console.error("Error saving lifestyle:", error);
    }

    setIsSavingLifestyle(false);
  };

  const handleRemoveFavorite = (id: number | string) => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      const favoriteIds = JSON.parse(savedFavorites) as (number | string)[];
      const updatedIds = favoriteIds.filter(fid => fid !== id);
      localStorage.setItem('favorites', JSON.stringify(updatedIds));
      setFavorites(prev => prev.filter(listing => listing.id !== id));
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
      case 'pending':
        return { text: 'Chờ duyệt', color: 'bg-orange-200' };
      case 'rejected':
        return { text: 'Bị từ chối', color: 'bg-red-200' };
      case 'hidden':
        return { text: 'Đã ẩn', color: 'bg-yellow-200' };
      case 'deleted':
        return { text: 'Đã xóa', color: 'bg-red-200' };
      default:
        return { text: 'Đang hiển thị', color: 'bg-green-200' };
    }
  };

  const getListingRoute = (listing: RoomListing) => {
    const cat = listing.category === "sublease" ? "sublease" : listing.category === "short-term" ? "short-term" : listing.category === "roomshare" ? "roomshare" : "roommate";
    return `/${cat}/listing/${listing.id}`;
  };

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case "roomshare": return "bg-pink-300";
      case "short-term": return "bg-yellow-300";
      case "sublease": return "bg-emerald-300";
      default: return "bg-blue-300";
    }
  };

  const [listingToDelete, setListingToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleHideListing = async (id: string) => {
    await updateListing(id, { status: "hidden" });
    setMyListings(prev => prev.map(l => String(l.id) === id ? { ...l, status: "hidden" as const } : l));
  };

  const handleUnhideListing = async (id: string) => {
    await updateListing(id, { status: "active" });
    setMyListings(prev => prev.map(l => String(l.id) === id ? { ...l, status: "active" as const } : l));
  };

  const handleDeleteClick = (id: string) => {
    setListingToDelete(id);
  };

  const confirmDelete = async () => {
    if (!listingToDelete) return;

    setIsDeleting(true);
    try {
      await deleteListing(listingToDelete);
      setMyListings(prev => prev.filter(l => String(l.id) !== listingToDelete));
      setListingToDelete(null);
    } catch (error) {
      console.error("Error deleting listing:", error);
      alert("Có lỗi xảy ra khi xóa bài đăng");
    } finally {
      setIsDeleting(false);
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

        {/* Delete Confirmation Modal */}
        <ConfirmModal
          isOpen={!!listingToDelete}
          onClose={() => setListingToDelete(null)}
          onConfirm={confirmDelete}
          title="Xóa bài đăng?"
          message="Bạn có chắc chắn muốn xóa bài đăng này không? Hành động này không thể hoàn tác."
          confirmText="Xóa ngay"
          isProcessing={isDeleting}
        />

        {/* Hero Section */}
        <section className="bg-blue-50 pt-8 sm:pt-16 md:pt-24 pb-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">

            <div className="mb-6 sm:mb-8">
              <h1 className="mb-2 sm:mb-4 text-2xl font-extrabold leading-tight sm:text-5xl md:text-6xl">
                Hồ sơ của bạn
              </h1>
              <p className="max-w-2xl text-sm sm:text-lg text-zinc-700">
                Quản lý thông tin cá nhân và các bài đăng của bạn
              </p>
            </div>

            {/* Profile Info Card */}
            <div className="rounded-xl border-[6px] border-black bg-white p-5 sm:p-8">
              <div className="flex flex-col gap-4 sm:gap-6 sm:flex-row sm:items-center sm:justify-between">
                {/* Avatar + Info: stacked on mobile, horizontal on desktop */}
                <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:gap-4">
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
                  <div className="text-center sm:text-left">
                    <h2 className="text-xl sm:text-2xl font-bold">{displayName}</h2>
                    {user?.email && (
                      <p className="text-xs sm:text-sm text-zinc-500 break-all">{user.email}</p>
                    )}
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="btn-red btn-click-sink text-sm sm:text-base px-6 py-2.5 sm:py-3 w-full sm:w-auto"
                >
                  Đăng xuất
                </button>
              </div>
            </div>

            {/* Personal Info Section */}
            <div className="mt-4 sm:mt-6 card bg-white p-5 sm:p-8">
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
                <div>
                  <p className="text-sm text-zinc-500 mb-1">Giới tính</p>
                  <p className="text-base font-medium">{profileData?.gender || 'Chưa cập nhật'}</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-500 mb-1">Năm sinh</p>
                  <p className="text-base font-medium">{profileData?.birthYear || 'Chưa cập nhật'}</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-500 mb-1">Nghề nghiệp hiện tại</p>
                  <p className="text-base font-medium">{profileData?.occupation || 'Chưa cập nhật'}</p>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t-2 border-zinc-200 my-8" />

              {/* Lifestyle Section */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Hồ sơ lối sống</h3>
              </div>

              <div className="space-y-8">
                {/* Cleanliness Slider */}
                <div>
                  <label className="block text-sm font-bold mb-3">
                    Mức độ sạch sẽ
                  </label>
                  <div className="px-2">
                    <div className="relative h-4 flex items-center">
                      <div className="absolute left-2 right-2 h-2 bg-zinc-200 rounded-full border-2 border-black" />
                      <div
                        className="absolute left-2 h-2 bg-blue-300 rounded-full border-2 border-black"
                        style={{ width: `calc(${(cleanlinessLevel / 3) * 100}% - 8px)` }}
                      />
                      <div className="relative w-full flex justify-between">
                        {[0, 1, 2, 3].map((index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => setCleanlinessLevel(index)}
                            className={`w-6 h-6 rounded-full border-2 border-black transition-all cursor-pointer z-10
                              ${cleanlinessLevel === index
                                ? "bg-blue-500 shadow-[2px_2px_0_0_#000] scale-110"
                                : cleanlinessLevel > index
                                  ? "bg-blue-300 hover:bg-blue-400"
                                  : "bg-white hover:bg-zinc-100"
                              }`}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between mt-3 -mx-8">
                      {cleanlinessLabels.map((label, index) => (
                        <button
                          key={label}
                          type="button"
                          onClick={() => setCleanlinessLevel(index)}
                          className={`text-sm cursor-pointer transition-all text-center w-24 whitespace-nowrap ${cleanlinessLevel === index
                            ? "font-bold text-blue-600"
                            : "text-zinc-500 hover:text-zinc-700"
                            }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Schedule */}
                <div>
                  <label className="block text-sm font-bold mb-3">
                    Giờ giấc sinh hoạt
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { value: "early", label: "Ngủ sớm, dậy sớm" },
                      { value: "late", label: "Cú đêm" },
                      { value: "flexible", label: "Linh hoạt" },
                    ].map((option) => (
                      <label
                        key={option.value}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 cursor-pointer transition-colors ${schedule === option.value
                          ? "border-blue-500 bg-blue-50"
                          : "border-black bg-white hover:bg-zinc-50"
                          }`}
                      >
                        <input
                          type="radio"
                          name="schedule"
                          checked={schedule === option.value}
                          onChange={() => setSchedule(option.value)}
                          className="w-4 h-4 appearance-none border-2 border-black rounded-full checked:bg-blue-500 checked:border-blue-500 cursor-pointer"
                        />
                        <span className="text-sm">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Habits */}
                <div>
                  <label className="block text-sm font-bold mb-3">
                    Thói quen
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { value: "smoke", label: "Hút thuốc" },
                      { value: "drink", label: "Uống rượu bia" },
                      { value: "loud", label: "Ồn ào, hay mở nhạc" },
                      { value: "quiet", label: "Yên lặng" },
                      { value: "gamer", label: "Hay chơi game" },
                      { value: "long-shower", label: "Tắm lâu" },
                      { value: "cook", label: "Hay nấu ăn" },
                      { value: "wfh", label: "Làm việc tại nhà" },
                      { value: "invite-friends", label: "Hay mời bạn về chơi" },
                      { value: "introvert", label: "Thích ở một mình" },
                    ].map((option) => (
                      <label
                        key={option.value}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 cursor-pointer transition-colors ${habits.includes(option.value)
                          ? "border-blue-500 bg-blue-50"
                          : "border-black bg-white hover:bg-zinc-50"
                          }`}
                      >
                        <input
                          type="checkbox"
                          checked={habits.includes(option.value)}
                          onChange={() => toggleHabit(option.value)}
                          className="w-4 h-4 rounded-full appearance-none border-2 border-black checked:bg-blue-500 checked:border-blue-500 cursor-pointer"
                        />
                        <span className="text-sm">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Pet */}
                <div>
                  <label className="block text-sm font-bold mb-3">
                    Thú cưng
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { value: "has-pet", label: "Đang nuôi thú cưng" },
                      { value: "want-pet", label: "Muốn nuôi thú cưng" },
                      { value: "no-pet", label: "Không nuôi thú cưng" },
                      { value: "pet-allergy", label: "Dị ứng lông thú cưng" },
                    ].map((option) => (
                      <label
                        key={option.value}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 cursor-pointer transition-colors ${habits.includes(option.value)
                          ? "border-blue-500 bg-blue-50"
                          : "border-black bg-white hover:bg-zinc-50"
                          }`}
                      >
                        <input
                          type="checkbox"
                          checked={habits.includes(option.value)}
                          onChange={() => toggleHabit(option.value)}
                          className="w-4 h-4 rounded-full appearance-none border-2 border-black checked:bg-blue-500 checked:border-blue-500 cursor-pointer"
                        />
                        <span className="text-sm">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Other Habits */}
                <div>
                  <label className="block text-sm font-bold mb-3">Khác</label>
                  <input
                    type="text"
                    value={otherHabits}
                    onChange={(e) => setOtherHabits(e.target.value)}
                    placeholder="Thói quen hoặc sở thích khác của bạn..."
                    className="w-full px-4 py-3 rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                {/* Save Button */}
                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleSaveLifestyle}
                    disabled={isSavingLifestyle}
                    className="btn-primary flex items-center justify-center gap-2 min-w-[160px] px-6 py-3 relative"
                  >
                    <span className={isSavingLifestyle ? "opacity-0" : ""}>
                      {lifestyleSaved ? (
                        <span className="flex items-center gap-2">
                          <Check className="h-4 w-4" /> Đã lưu
                        </span>
                      ) : (
                        "Lưu lối sống"
                      )}
                    </span>
                    {isSavingLifestyle && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Listings & Favorites Section */}
        <section className="bg-blue-50 pt-8 sm:pt-10 pb-12 sm:pb-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="border-t-2 border-zinc-300 mb-8 sm:mb-12" />
            <h2 className="mb-3 sm:mb-4 text-2xl font-extrabold leading-tight sm:text-5xl md:text-6xl">Bài đăng của tôi & Bài đã lưu</h2>
            <p className="mb-6 sm:mb-8 max-w-2xl text-sm sm:text-lg text-zinc-700">Bài đăng của bạn ở trên. Những bài bạn đã lưu nằm ở dưới, hãy kéo xuống để xem.</p>
            <div className="card bg-white p-4 sm:p-8">

              {/* My Listings */}
              <div className="mb-8">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-xl font-bold">Bài đăng của tôi</h3>
                  <button
                    onClick={() => setShowPostTypeModal(true)}
                    className="btn-primary text-sm px-5 py-2.5"
                  >
                    Đăng bài mới
                  </button>
                </div>

                {myListings.length > 0 ? (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {myListings.map((listing) => {
                      const statusDisplay = getStatusDisplay(listing.status);
                      const route = getListingRoute(listing);
                      const catColor = getCategoryColor(listing.category);
                      const listingId = String(listing.id);
                      return (
                        <div
                          key={listing.id}
                          className="rounded-lg border-2 border-black bg-white p-4 shadow-[3px_3px_0_0_#000] transition-all"
                        >
                          <div className="mb-3 flex items-start justify-between gap-2">
                            <span className={`rounded-md border-2 border-black ${catColor} px-3 py-1 text-xs font-bold`}>
                              {listing.price}
                            </span>
                            <span className={`rounded-md border-2 border-black ${statusDisplay.color} px-2 py-0.5 text-xs font-bold`}>
                              {statusDisplay.text}
                            </span>
                          </div>
                          <Link href={route}>
                            <h4 className="mb-2 text-sm font-bold leading-tight line-clamp-2 hover:text-blue-600 transition-colors">
                              {listing.title}
                            </h4>
                          </Link>
                          <div className="space-y-1 text-xs text-zinc-500 mb-3">
                            <p className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {listing.location}
                            </p>
                            <p className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {listing.moveInDate}
                            </p>
                          </div>
                          {/* Actions */}
                          <div className="flex items-center gap-1.5 border-t border-zinc-100 pt-3">
                            <Link
                              href={route}
                              className="flex-1 text-center text-xs font-bold px-2 py-1.5 rounded-md border border-zinc-200 hover:bg-zinc-50 transition-colors"
                            >
                              Xem
                            </Link>
                            {listing.status === "hidden" ? (
                              <button
                                onClick={() => handleUnhideListing(listingId)}
                                className="flex items-center gap-1 text-xs font-bold px-2 py-1.5 rounded-md border border-zinc-200 hover:bg-blue-50 text-blue-600 transition-colors"
                              >
                                <Eye className="h-3 w-3" /> Hiện
                              </button>
                            ) : listing.status === "active" ? (
                              <button
                                onClick={() => handleHideListing(listingId)}
                                className="flex items-center gap-1 text-xs font-bold px-2 py-1.5 rounded-md border border-zinc-200 hover:bg-yellow-50 text-yellow-700 transition-colors"
                              >
                                <EyeOff className="h-3 w-3" /> Ẩn
                              </button>
                            ) : null}
                            {listing.status !== "deleted" && (
                              <button
                                onClick={() => handleDeleteClick(listingId)}
                                className="flex items-center gap-1 text-xs font-bold px-2 py-1.5 rounded-md border border-zinc-200 hover:bg-red-50 text-red-500 transition-colors"
                              >
                                <Trash2 className="h-3 w-3" /> Xóa
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div
                        key={i}
                        className="rounded-lg border-2 border-dashed border-zinc-300 bg-zinc-50 p-4 flex flex-col items-center justify-center h-40"
                      >
                        <Home className="h-8 w-8 text-zinc-300 mb-2" />
                        <p className="text-xs text-zinc-400">Chưa có bài đăng</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="border-t-2 border-zinc-200 my-8" />

              {/* Saved / Favorites */}
              <div>
                <div className="mb-6 flex items-center gap-3">
                  <h3 className="text-xl font-bold">Bài đã lưu</h3>
                  {favorites.length > 0 && (
                    <span className="rounded-full border-2 border-black bg-pink-200 px-3 py-0.5 text-sm font-bold">
                      {favorites.length}
                    </span>
                  )}
                </div>

                {favorites.length > 0 ? (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {favorites.map((listing) => {
                      const catColor = getCategoryColor(listing.category);
                      const route = getListingRoute(listing);
                      return (
                        <div key={listing.id} className="rounded-lg border-2 border-black bg-white p-4 shadow-[3px_3px_0_0_#000]">
                          <div className="mb-3 flex items-start justify-between gap-2">
                            <span className={`rounded-md border-2 border-black ${catColor} px-3 py-1 text-xs font-bold`}>
                              {listing.price}
                            </span>
                            <button
                              onClick={() => handleRemoveFavorite(listing.id)}
                              className="text-zinc-400 hover:text-red-500 transition-colors"
                              title="Bỏ lưu"
                            >
                              <HeartOff className="h-4 w-4" />
                            </button>
                          </div>

                          <Link href={route}>
                            <h4 className="mb-2 text-sm font-bold leading-tight hover:text-blue-600 transition-colors line-clamp-2">
                              {listing.title}
                            </h4>
                          </Link>

                          <div className="space-y-1 text-xs text-zinc-500">
                            <p className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {listing.location}
                            </p>
                            <p className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {listing.moveInDate}
                            </p>
                          </div>

                          <Link
                            href={listing.category === "roommate"
                              ? `/roommate/listing/${listing.id}`
                              : `/roomshare/listing/${listing.id}`
                            }
                            className="mt-3 block w-full text-center rounded-md border-2 border-black bg-zinc-100 py-1.5 text-xs font-bold hover:bg-zinc-200 transition-colors"
                          >
                            Xem chi tiết
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="mb-4 flex justify-center">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-pink-100 border-2 border-black">
                        <Heart className="h-7 w-7 text-pink-400" />
                      </div>
                    </div>
                    <p className="text-sm text-zinc-500 mb-4">Chưa có bài đăng nào được lưu</p>
                    <div className="flex gap-3 justify-center">
                      <Link href="/roommate" className="btn-primary text-xs px-4 py-2">
                        Tìm bạn cùng phòng
                      </Link>
                      <Link href="/roomshare" className="btn-pink text-xs px-4 py-2">
                        Tìm phòng
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <ShareFooter />
      </div>
    </ProtectedRoute>
  );
}
