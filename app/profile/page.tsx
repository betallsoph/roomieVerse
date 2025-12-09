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
    title: "Có căn 2PN Bình Thạnh - tìm bạn nữ ở ghép",
    price: "4.5 triệu",
    location: "Bình Thạnh, gần Điện Biên Phủ",
    moveInDate: "01/12/2024",
    description: "Phòng mới sạch sẽ, có máy lạnh, tủ lạnh chung. Mình làm remote nên thường ở nhà, thích người sạch sẽ, không ồn.",
    postedDate: "2 ngày trước",
    status: "Đang hiển thị",
  },
  {
    id: 2,
    title: "Share studio Thảo Điền - cần 1 bạn nam",
    price: "6 triệu",
    location: "Thảo Điền, Q.2",
    moveInDate: "15/12/2024",
    description: "Studio 40m2, view đẹp. Mình designer làm việc tại nhà. Tìm bạn ngăn nắp, có thu nhập ổn định.",
    postedDate: "5 ngày trước",
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
    // Quay về trang trước hoặc về trang chủ
    if (window.history.length > 2) {
      router.back();
    } else {
      router.push("/");
    }
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

            {/* Quick Actions */}
            <div className="mt-6 grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
              <Link
                href="/favorites"
                className="card bg-pink-100 p-6 hover:bg-pink-200 transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <div className="text-4xl">❤️</div>
                  <div>
                    <h3 className="text-lg font-bold group-hover:text-pink-600 transition-colors">
                      Yêu thích của tôi
                    </h3>
                    <p className="text-sm text-zinc-600">
                      Xem các bài đăng đã lưu
                    </p>
                  </div>
                </div>
              </Link>
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
                        <Link 
                          href={`/listing/${listing.id}`}
                          className="text-xl font-bold hover:text-blue-600 transition-colors"
                        >
                          {listing.title}
                        </Link>
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
