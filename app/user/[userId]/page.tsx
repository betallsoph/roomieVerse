"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
    ArrowLeft,
    User,
    Calendar,
    Briefcase,
    MapPin,
    Clock,
    Sparkles,
    Home,
    MessageCircle,
    Shield,
    Loader2
} from "lucide-react";
import MainHeader from "../../components/MainHeader";
import ShareFooter from "../../components/ShareFooter";
import { getUserProfile } from "../../lib/userProfile";
import { UserProfile, RoomListing } from "../../data/types";
import { getListingsByUserId } from "../../data/listings";

export default function UserProfilePage() {
    const params = useParams();
    const router = useRouter();
    const userId = params.userId as string;
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [listings, setListings] = useState<RoomListing[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            const profileData = await getUserProfile(userId);
            setProfile(profileData);

            if (profileData) {
                const userListings = await getListingsByUserId(userId);
                console.log(`[UserProfile] Found ${userListings.length} listings for user ${userId}:`, userListings);
                setListings(userListings);
            }

            setIsLoading(false);
        }
        fetchData();
    }, [userId]);

    // Helper: Get user initials from name
    const getUserInitials = (name: string) => {
        const words = name.trim().split(' ');
        if (words.length >= 2) {
            return (words[0][0] + words[words.length - 1][0]).toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    };

    // Helper: Get display values
    const getGenderDisplay = (gender?: string) => {
        if (gender === "male") return "Nam";
        if (gender === "female") return "Nữ";
        if (gender === "other") return "Khác";
        return "Chưa cập nhật";
    };

    const getAgeDisplay = (birthYear?: string) => {
        if (!birthYear) return "Chưa cập nhật";
        const age = new Date().getFullYear() - parseInt(birthYear);
        return `${age} tuổi`;
    };

    if (isLoading) {
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

    if (!profile) {
        return (
            <div className="min-h-screen bg-white">
                <MainHeader />
                <div className="flex min-h-[60vh] items-center justify-center">
                    <div className="rounded-xl border-2 border-black bg-white p-16 text-center shadow-[var(--shadow-primary)]">
                        <User className="mx-auto mb-6 h-16 w-16 text-zinc-400" />
                        <h1 className="mb-4 text-3xl font-bold">Không tìm thấy người dùng</h1>
                        <p className="mb-8 text-zinc-600">Người dùng này có thể đã xóa tài khoản hoặc không tồn tại.</p>
                        <Link href="/" className="btn-primary">
                            Về trang chủ
                        </Link>
                    </div>
                </div>
                <ShareFooter />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <MainHeader />

            {/* Hero Section */}
            <section className="border-b-2 border-black bg-gradient-to-br from-purple-50 to-pink-50 py-12 sm:py-16">
                <div className="mx-auto max-w-4xl px-6">
                    {/* Back Button */}
                    <button
                        onClick={() => router.back()}
                        className="btn-secondary !inline-flex !py-2 !px-6 items-center gap-2 mb-6"
                    >
                        <ArrowLeft className="h-4 w-4" /> Quay lại
                    </button>

                    {/* Profile Header */}
                    <div className="flex items-start gap-6">
                        <div className="flex-shrink-0">
                            {/* Avatar - No gradient/shadow, show initials */}
                            <div className="w-24 h-24 rounded-full border-4 border-black bg-purple-200 flex items-center justify-center">
                                {profile.photoURL ? (
                                    <img
                                        src={profile.photoURL}
                                        alt={profile.displayName}
                                        className="w-full h-full rounded-full object-cover"
                                    />
                                ) : (
                                    <span className="text-3xl font-extrabold text-black">
                                        {getUserInitials(profile.displayName)}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="flex-1">
                            <h1 className="text-3xl sm:text-4xl font-extrabold mb-2">{profile.displayName}</h1>
                            <div className="flex flex-wrap gap-4 text-sm text-zinc-600">
                                <span className="flex items-center gap-1">
                                    <User className="h-4 w-4" /> {getGenderDisplay(profile.gender)}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4" /> {getAgeDisplay(profile.birthYear)}
                                </span>
                                {profile.occupation && (
                                    <span className="flex items-center gap-1">
                                        <Briefcase className="h-4 w-4" /> {profile.occupation}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <div className="mx-auto max-w-4xl px-6 py-12">
                <div className="space-y-6">

                    {/* Lifestyle Card */}
                    <div className="card bg-white">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <Sparkles className="h-6 w-6 text-purple-500" />
                            Lối sống
                        </h2>

                        {profile.lifestyle ? (
                            <div className="space-y-6">
                                {/* Schedule */}
                                {profile.lifestyle.schedule && profile.lifestyle.schedule.length > 0 && (
                                    <div>
                                        <label className="block text-sm font-bold mb-2 flex items-center gap-2">
                                            <Clock className="h-4 w-4" /> Giờ giấc
                                        </label>
                                        <div className="flex flex-wrap gap-2">
                                            {profile.lifestyle.schedule.map((item: string) => (
                                                <span
                                                    key={item}
                                                    className="px-3 py-1.5 text-sm rounded-lg border-2 border-black bg-purple-100 font-medium"
                                                >
                                                    {item === "early" && "Ngủ sớm, dậy sớm"}
                                                    {item === "late" && "Cú đêm"}
                                                    {item === "flexible" && "Linh hoạt"}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Cleanliness */}
                                {profile.lifestyle.cleanliness && profile.lifestyle.cleanliness.length > 0 && (
                                    <div>
                                        <label className="block text-sm font-bold mb-2 flex items-center gap-2">
                                            <Home className="h-4 w-4" /> Mức độ sạch sẽ
                                        </label>
                                        <div className="flex flex-wrap gap-2">
                                            {profile.lifestyle.cleanliness.map((item: string) => (
                                                <span
                                                    key={item}
                                                    className="px-3 py-1.5 text-sm rounded-lg border-2 border-black bg-pink-100 font-medium"
                                                >
                                                    {item === "very-clean" && "Rất sạch sẽ"}
                                                    {item === "normal" && "Bình thường"}
                                                    {item === "relaxed" && "Thoải mái"}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Habits */}
                                {profile.lifestyle.habits && profile.lifestyle.habits.length > 0 && (
                                    <div>
                                        <label className="block text-sm font-bold mb-2 flex items-center gap-2">
                                            <Shield className="h-4 w-4" /> Thói quen
                                        </label>
                                        <div className="flex flex-wrap gap-2">
                                            {profile.lifestyle.habits.map((item: string) => (
                                                <span
                                                    key={item}
                                                    className="px-3 py-1.5 text-sm rounded-lg border-2 border-black bg-blue-100 font-medium"
                                                >
                                                    {item === "no-smoke" && "Không hút thuốc"}
                                                    {item === "no-alcohol" && "Không uống rượu bia"}
                                                    {item === "flexible" && "Linh hoạt"}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Other Habits */}
                                {profile.lifestyle.otherHabits && (
                                    <div>
                                        <label className="block text-sm font-bold mb-2">Khác</label>
                                        <p className="text-zinc-700 leading-relaxed">{profile.lifestyle.otherHabits}</p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="text-center py-12 text-zinc-500">
                                <Sparkles className="h-12 w-12 mx-auto mb-4 text-zinc-300" />
                                <p>Người dùng chưa cập nhật thông tin lối sống</p>
                            </div>
                        )}
                    </div>

                    {/* Listings by User */}
                    {listings.length > 0 && (
                        <div className="card bg-white">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <Home className="h-6 w-6 text-blue-500" />
                                Tin đăng ({listings.length})
                            </h2>
                            <div className="grid gap-4 sm:grid-cols-2">
                                {listings.map((listing) => (
                                    <Link
                                        key={listing.id}
                                        href={`/${listing.category}/listing/${listing.id}`}
                                        className="rounded-lg border-2 border-black bg-white p-4 transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none shadow-[var(--shadow-secondary)]"
                                    >
                                        <h3 className="font-bold mb-2 line-clamp-2">{listing.title}</h3>
                                        <div className="space-y-1 text-sm text-zinc-600">
                                            <div className="flex items-center gap-2">
                                                <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                                                <span className="line-clamp-1">{listing.location}</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="font-bold text-blue-600">{listing.price}</span>
                                                <span className="text-xs">{listing.postedDate}</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Contact Note */}
                    <div className="card bg-yellow-50 !p-5">
                        <div className="flex items-start gap-3">
                            <MessageCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                            <div>
                                <h3 className="font-bold mb-1">Liên hệ qua tin đăng</h3>
                                <p className="text-sm text-zinc-600">
                                    Để liên hệ với người dùng này, hãy tìm tin đăng của họ và sử dụng thông tin liên lạc được cung cấp.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ShareFooter />
        </div>
    );
}
