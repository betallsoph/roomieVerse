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
    Home,
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
                const userListings = await getListingsByUserId(userId, true);
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
                    <div className="rounded-xl border-2 border-black bg-white p-16 text-center">
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

            {/* Hero Section - Simple blue like listing pages */}
            <section className="border-b-2 border-black bg-blue-50 py-12 sm:py-16">
                <div className="mx-auto max-w-4xl px-6">
                    {/* Back Button */}
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-1.5 text-sm font-medium text-zinc-600 hover:text-black transition-colors mb-6"
                    >
                        <ArrowLeft className="h-4 w-4" /> Quay lại
                    </button>

                    {/* Profile Header */}
                    <div className="flex items-center gap-6">
                        {/* Avatar */}
                        <div className="w-20 h-20 flex-shrink-0 rounded-full border-2 border-black bg-white flex items-center justify-center">
                            {profile.photoURL ? (
                                <img
                                    src={profile.photoURL}
                                    alt={profile.displayName}
                                    className="w-full h-full rounded-full object-cover"
                                />
                            ) : (
                                <span className="text-2xl font-bold text-blue-700">
                                    {getUserInitials(profile.displayName)}
                                </span>
                            )}
                        </div>

                        {/* Name & Info */}
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-extrabold">{profile.displayName}</h1>
                            <div className="mt-2 flex flex-wrap gap-4 text-sm text-zinc-600">
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

                    {/* Lifestyle - No wrapper card */}
                    <div>
                        <h2 className="text-lg font-bold mb-4 text-blue-700">
                            Lối sống
                        </h2>

                        {profile.lifestyle ? (
                            <div className="space-y-4">
                                {/* Cleanliness - Visual slider like setup page */}
                                {profile.lifestyle.cleanliness && profile.lifestyle.cleanliness.length > 0 && (
                                    <div>
                                        <span className="text-sm text-zinc-500 flex items-center gap-1.5 mb-3">
                                            <Home className="h-4 w-4" /> Mức độ sạch sẽ
                                        </span>
                                        {profile.lifestyle.cleanliness.map((item: string) => {
                                            // 4 levels: messy=0, relaxed=1, normal=2, very-clean=3
                                            const level = item === "very-clean" ? 3 : item === "normal" ? 2 : item === "relaxed" ? 1 : 0;
                                            // Soft colors: messy=red, relaxed=pink, normal=green, very-clean=blue
                                            const dotColors = ['bg-red-400', 'bg-pink-300', 'bg-green-300', 'bg-blue-300'];
                                            // Gradient colors for the bar (hex values)
                                            const hexColors = ['#f87171', '#f9a8d4', '#86efac', '#93c5fd'];
                                            // Build gradient based on level
                                            const gradientStops = hexColors.slice(0, level + 1).map((color, i) =>
                                                `${color} ${(i / Math.max(level, 1)) * 100}%`
                                            ).join(', ');
                                            const barGradient = level === 0
                                                ? hexColors[0]
                                                : `linear-gradient(to right, ${gradientStops})`;
                                            return (
                                                <div key={item} className="px-2">
                                                    {/* Track with dots - same structure as setup page */}
                                                    <div className="relative h-6 flex items-center">
                                                        {/* Track line */}
                                                        <div className="absolute left-3 right-3 h-2 bg-zinc-200 rounded-full border-2 border-black" />
                                                        {/* Filled track with gradient */}
                                                        <div
                                                            className="absolute left-3 h-2 rounded-full border-2 border-black"
                                                            style={{
                                                                width: `calc(${(level / 3) * 100}% - 12px)`,
                                                                background: barGradient
                                                            }}
                                                        />
                                                        {/* Dots */}
                                                        <div className="relative w-full flex justify-between">
                                                            {[0, 1, 2, 3].map((index) => (
                                                                <div key={index} className="w-8 h-8 flex items-center justify-center">
                                                                    <div
                                                                        className={`rounded-full border-2 border-black z-10
                                                                            ${level === index
                                                                                ? `w-8 h-8 ${dotColors[index]} shadow-[inset_0_0_0_3px_white,2px_2px_0_0_#000]`
                                                                                : level > index
                                                                                    ? `w-6 h-6 ${dotColors[index]}`
                                                                                    : 'w-6 h-6 bg-white'
                                                                            }`}
                                                                    />
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    {/* Labels - aligned with dots using negative margin */}
                                                    <div className="flex justify-between mt-3 -mx-6">
                                                        {['Bừa bộn', 'Thoải mái', 'Bình thường', 'Siêu sạch sẽ'].map((label, index) => {
                                                            const textColors = ['text-red-500', 'text-pink-400', 'text-green-500', 'text-blue-500'];
                                                            return (
                                                                <span
                                                                    key={label}
                                                                    className={`text-center w-20 text-xs whitespace-nowrap ${level === index ? `font-bold ${textColors[index]}` : 'text-zinc-400'}`}
                                                                >
                                                                    {label}
                                                                </span>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}

                                {/* Schedule */}
                                {profile.lifestyle.schedule && profile.lifestyle.schedule.length > 0 && (
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="text-sm text-zinc-500 w-28 flex items-center gap-1.5">
                                            <Clock className="h-4 w-4" /> Giờ giấc:
                                        </span>
                                        {profile.lifestyle.schedule.map((item: string) => (
                                            <span
                                                key={item}
                                                className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                                            >
                                                {item === "early" && "Ngủ sớm, dậy sớm"}
                                                {item === "late" && "Cú đêm"}
                                                {item === "flexible" && "Linh hoạt"}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {/* Habits */}
                                {profile.lifestyle.habits && profile.lifestyle.habits.length > 0 && (
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="text-sm text-zinc-500 w-28 flex items-center gap-1.5">
                                            <Shield className="h-4 w-4" /> Thói quen:
                                        </span>
                                        {profile.lifestyle.habits.map((item: string) => (
                                            <span
                                                key={item}
                                                className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                                            >
                                                {item === "no-smoke" && "Không hút thuốc"}
                                                {item === "no-alcohol" && "Không uống rượu bia"}
                                                {item === "flexible" && "Linh hoạt"}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {/* Other Habits */}
                                {profile.lifestyle.otherHabits && (
                                    <div>
                                        <p className="text-sm text-zinc-500 mb-1">Khác:</p>
                                        <p className="text-zinc-700 leading-relaxed">{profile.lifestyle.otherHabits}</p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-zinc-500">
                                <p>Người dùng chưa cập nhật thông tin lối sống</p>
                            </div>
                        )}
                    </div>

                    {/* Divider */}
                    {listings.length > 0 && (
                        <div className="border-t border-zinc-200" />
                    )}

                    {/* Listings by User - No wrapper card */}
                    {listings.length > 0 && (
                        <div>
                            <h2 className="text-lg font-bold mb-4 text-blue-700">
                                Tin đăng ({listings.length})
                            </h2>
                            <div className="grid gap-4 sm:grid-cols-2">
                                {listings.map((listing) => (
                                    <Link
                                        key={listing.id}
                                        href={`/${listing.category}/listing/${listing.id}`}
                                        className="rounded-lg border-2 border-black bg-white p-4 transition-colors hover:bg-blue-50"
                                    >
                                        <h3 className="font-bold mb-2 line-clamp-2">{listing.title}</h3>
                                        <div className="space-y-1 text-sm text-zinc-600">
                                            <div className="flex items-center gap-2">
                                                <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                                                <span className="line-clamp-1">{listing.location}</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="font-bold text-blue-700">{listing.price}</span>
                                                <span className="text-xs">{listing.postedDate}</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <ShareFooter />
        </div>
    );
}
