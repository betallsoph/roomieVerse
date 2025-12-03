'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import MainHeader from "../components/MainHeader";
import ShareFooter from "../components/ShareFooter";
import ProtectedRoute from "../components/ProtectedRoute";
import CompleteProfileModal from "../components/CompleteProfileModal";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/navigation";

const myListings = [
  {
    id: 1,
    title: "Tìm bạn ở ghép loft Quận 3",
    price: "11.5 triệu",
    location: "Quận 3, TP.HCM",
    moveInDate: "15/12/2024",
    description: "Không gian có phòng làm việc riêng, ưu tiên người đi làm văn phòng nhưng thoải mái remote 2 ngày/tuần.",
    postedDate: "2 ngày trước",
    status: "Đang hiển thị",
  },
  {
    id: 2,
    title: "Cần người share căn studio Q.2",
    price: "9 triệu",
    location: "Quận 2, TP.HCM",
    moveInDate: "01/01/2025",
    description: "Studio rộng 45m2, view sông, có gym và hồ bơi. Tìm 1 bạn sạch sẽ, không hút thuốc.",
    postedDate: "1 tuần trước",
    status: "Đang hiển thị",
  },
];

export default function ProfilePage() {
  const { logout } = useAuth();
  const router = useRouter();
  const [showCompleteProfileModal, setShowCompleteProfileModal] = useState(false);
  const [profileData, setProfileData] = useState({
    gender: '',
    birthYear: '',
    occupation: ''
  });

  // Check if profile is incomplete on mount
  useEffect(() => {
    const isIncomplete = localStorage.getItem('profileIncomplete') === 'true';
    const hasProfileData = localStorage.getItem('profileData');

    if (isIncomplete || !hasProfileData) {
      setShowCompleteProfileModal(true);
    } else {
      // Load existing profile data
      const saved = JSON.parse(hasProfileData);
      setProfileData(saved);
    }
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/auth");
  };

  const handleCompleteProfileSubmit = (data: { gender: string; birthYear: string; occupation: string }) => {
    // Save profile data
    localStorage.setItem('profileData', JSON.stringify(data));
    localStorage.removeItem('profileIncomplete');
    setProfileData(data);
    setShowCompleteProfileModal(false);

    // TODO: Save to backend/database
    console.log('Profile completed:', data);
  };

  const handleModalClose = () => {
    setShowCompleteProfileModal(false);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-white">
        <MainHeader />

        {/* Complete Profile Modal */}
        <CompleteProfileModal
          isOpen={showCompleteProfileModal}
          onClose={handleModalClose}
          onComplete={handleCompleteProfileSubmit}
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
                  <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-black bg-blue-300 text-3xl font-bold">
                    A
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Nguyễn Văn A</h2>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="btn-red text-base px-6 py-3"
                >
                  Đăng xuất
                </button>
              </div>
            </div>

            {/* Personal Info Section */}
            <div className="mt-6 card bg-white p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Thông tin cá nhân</h3>
                <button className="btn-secondary text-sm px-4 py-2">
                  Chỉnh sửa
                </button>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {/* Giới tính */}
                <div>
                  <p className="text-sm text-zinc-500 mb-1">Giới tính</p>
                  <p className="text-base font-medium">{profileData.gender || 'Chưa cập nhật'}</p>
                </div>

                {/* Năm sinh */}
                <div>
                  <p className="text-sm text-zinc-500 mb-1">Năm sinh</p>
                  <p className="text-base font-medium">{profileData.birthYear || 'Chưa cập nhật'}</p>
                </div>

                {/* Nghề nghiệp */}
                <div>
                  <p className="text-sm text-zinc-500 mb-1">Nghề nghiệp hiện tại</p>
                  <p className="text-base font-medium">{profileData.occupation || 'Chưa cập nhật'}</p>
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
              <Link href="/roommate" className="btn-primary text-base px-6 py-3">
                Đăng bài mới
              </Link>
            </div>

            {/* Listings Grid */}
            <div className="grid gap-6">
              {myListings.map((listing) => (
                <div key={listing.id} className="card bg-white p-6">
                  <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="mb-2 flex items-center gap-2">
                        <h3 className="text-xl font-bold">{listing.title}</h3>
                        <span className="rounded-md border-2 border-black bg-green-200 px-2 py-1 text-xs font-bold">
                          {listing.status}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-3 text-sm text-zinc-600">
                        <span>{listing.location}</span>
                        <span>{listing.moveInDate}</span>
                        <span>{listing.postedDate}</span>
                      </div>
                    </div>
                    <div className="rounded-lg border-2 border-black bg-blue-300 px-4 py-2 font-bold">
                      {listing.price}
                    </div>
                  </div>

                  <p className="mb-4 text-sm text-zinc-700">{listing.description}</p>

                  <div className="flex flex-wrap gap-3">
                    <button className="btn-primary text-sm px-4 py-2">
                      Chỉnh sửa
                    </button>
                    <button className="btn-secondary text-sm px-4 py-2">
                      Tạm ẩn
                    </button>
                    <button className="btn-gray text-sm px-4 py-2">
                      Xóa
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {myListings.length === 0 && (
              <div className="card bg-white p-12 text-center">
                <h3 className="mb-4 text-2xl font-bold">Chưa có bài đăng nào</h3>
                <p className="mb-6 text-base text-zinc-600">
                  Bắt đầu đăng tin để tìm roommate phù hợp!
                </p>
                <Link href="/roommate" className="btn-primary text-base px-8 py-4">
                  Đăng bài đầu tiên
                </Link>
              </div>
            )}
          </div>
        </section>

        <ShareFooter />
      </div>
    </ProtectedRoute>
  );
}
