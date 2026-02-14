"use client";

import MainHeader from "../components/MainHeader";
import ShareFooter from "../components/ShareFooter";
import { Sparkles, Rocket, Calendar, Bell, Gift, Star, Users, MessageSquare, TrendingUp, Zap, Heart, Flame, Video, Shield, PartyPopper } from "lucide-react";
import Link from "next/link";
import { useAdminRedirect } from "../hooks/useAdminRedirect";

export default function WhatsHotPage() {
    useAdminRedirect();
    return (
        <div className="min-h-screen bg-white">
            <MainHeader />

            {/* Hero Section */}
            <section className="py-12 sm:py-16 bg-blue-50 relative border-b-2 border-black">
                <div className="mx-auto max-w-7xl px-6">
                    {/* Breadcrumb */}
                    <div className="mb-6 flex items-center gap-2 text-sm text-zinc-600">
                        <Link href="/" className="hover:text-black transition-colors">Trang chủ</Link>
                        <span>/</span>
                        <span className="text-black font-medium">What's Hot</span>
                    </div>

                    <h1 className="mb-4 text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
                        Những điều thú vị<br />
                        <span className="text-blue-600">đang tới!</span>
                    </h1>

                    <p className="text-base text-zinc-600 max-w-2xl">
                        Updates mới nhất, tính năng sắp ra mắt, và những điều bạn không thể bỏ lỡ tại roomieVerse!
                    </p>
                </div>

                {/* Blur gradient transition */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-white" />
            </section>

            {/* Upcoming Features - Bento Style */}
            <section className="py-12 md:py-16 bg-blue-50 relative">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="mb-12">
                        <h2 className="text-3xl font-extrabold sm:text-4xl md:text-5xl">
                            Tính năng mới
                        </h2>
                        <p className="mt-3 text-base text-zinc-600">
                            Những gì chúng mình đang xây dựng cho bạn
                        </p>
                    </div>

                    {/* Grid Layout */}
                    <div className="grid md:grid-cols-12 gap-6">
                        {/* Feature 1 - Large */}
                        <div className="md:col-span-7 rounded-xl border-2 border-black bg-white p-8 shadow-[var(--shadow-secondary)]">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 p-3 rounded-lg border-2 border-black bg-purple-100">
                                    <Sparkles className="w-7 h-7 text-purple-600" />
                                </div>
                                <div className="flex-1">
                                    <span className="inline-block mb-3 px-3 py-1 rounded-full border-2 border-black bg-yellow-200 text-xs font-bold">
                                        Q2 2026
                                    </span>
                                    <h3 className="text-2xl font-bold mb-3">
                                        Smart Matching Algorithm
                                    </h3>
                                    <p className="text-base text-zinc-700">
                                        AI-powered roommate matching dựa trên lifestyle preferences và personality traits.
                                        Tìm người phù hợp chưa bao giờ dễ dàng đến thế!
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Feature 2 - Tall */}
                        <div className="md:col-span-5 md:row-span-2 rounded-xl border-2 border-black bg-white p-8 shadow-[var(--shadow-secondary)]">
                            <div className="flex-shrink-0 p-3 rounded-lg border-2 border-black bg-blue-100 inline-block mb-4">
                                <Video className="w-9 h-9 text-blue-600" />
                            </div>
                            <span className="inline-block mb-3 px-3 py-1 rounded-full border-2 border-black bg-green-200 text-xs font-bold">
                                COMING Q1 2026
                            </span>
                            <h3 className="text-2xl font-bold mb-4">
                                Video Tours 360°
                            </h3>
                            <p className="text-base text-zinc-700 mb-6">
                                Upload video 360° của phòng để người thuê có trải nghiệm xem phòng trực quan nhất.
                                Như đi xem phòng thật!
                            </p>
                            <div className="pt-4 border-t-2 border-zinc-200">
                                <div className="flex items-center gap-2 text-sm font-bold text-blue-600">
                                    <Zap className="w-4 h-4" />
                                    Virtual Reality Ready
                                </div>
                            </div>
                        </div>

                        {/* Feature 3 - Wide */}
                        <div className="md:col-span-7 rounded-xl border-2 border-black bg-white p-6 shadow-[var(--shadow-secondary)]">
                            <div className="flex items-center gap-4">
                                <div className="flex-shrink-0 p-3 rounded-lg border-2 border-black bg-pink-100">
                                    <Users className="w-7 h-7 text-pink-600" />
                                </div>
                                <div className="flex-1">
                                    <span className="inline-block mb-2 px-3 py-1 rounded-full border-2 border-black bg-purple-200 text-xs font-bold">
                                        PLANNING - Q3 2026
                                    </span>
                                    <h3 className="text-xl font-bold mb-1">
                                        Community Events
                                    </h3>
                                    <p className="text-sm text-zinc-700">
                                        Meetup, networking events để gặp gỡ ngoài đời thực!
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Feature 4 & 5 - Small */}
                        <div className="md:col-span-6 rounded-xl border-2 border-black bg-white p-6 shadow-[var(--shadow-secondary)]">
                            <div className="flex items-start gap-3">
                                <MessageSquare className="w-7 h-7 text-green-600 flex-shrink-0" />
                                <div>
                                    <span className="inline-block mb-2 px-3 py-1 rounded-full border-2 border-black bg-green-100 text-xs font-bold">
                                        Q1 2026
                                    </span>
                                    <h3 className="text-lg font-bold mb-2">In-App Messaging</h3>
                                    <p className="text-sm text-zinc-700">Chat ngay trong app!</p>
                                </div>
                            </div>
                        </div>

                        <div className="md:col-span-6 rounded-xl border-2 border-black bg-white p-6 shadow-[var(--shadow-secondary)]">
                            <div className="flex items-start gap-3">
                                <Shield className="w-7 h-7 text-yellow-600 flex-shrink-0" />
                                <div>
                                    <span className="inline-block mb-2 px-3 py-1 rounded-full border-2 border-black bg-yellow-100 text-xs font-bold">
                                        Q2 2026
                                    </span>
                                    <h3 className="text-lg font-bold mb-2">Verified Profiles</h3>
                                    <p className="text-sm text-zinc-700">Xác minh CCCD/CMND</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Gradient transition */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-white" />
            </section>

            {/* Hot News - Timeline Style */}
            <section className="section border-t-2 border-black bg-white py-16 md:py-20">
                <div className="wrapper">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold uppercase sm:text-4xl md:text-5xl">
                            Tin tức nổi bật
                        </h2>
                    </div>

                    <div className="max-w-4xl mx-auto space-y-8">
                        {/* News 1 */}
                        <div className="flex gap-4 md:gap-6">
                            <div className="flex-shrink-0 text-center">
                                <div className="inline-block px-4 py-2 bg-green-300 border-2 border-black rounded-lg font-bold text-sm mb-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                                    NEW
                                </div>
                                <div className="text-xs font-bold text-zinc-600">JAN 2026</div>
                            </div>
                            <div className="flex-1 card bg-green-100 p-6 md:p-8">
                                <div className="flex items-start gap-3 mb-3">
                                    <PartyPopper className="w-6 h-6 flex-shrink-0" />
                                    <h3 className="text-xl md:text-2xl font-bold">
                                        RoomieVerse chính thức ra mắt!
                                    </h3>
                                </div>
                                <p className="text-sm md:text-base font-medium text-zinc-700">
                                    Chào mừng bạn đến với nền tảng kết nối roommate thông minh nhất Việt Nam! Chúng mình cam kết mang đến trải nghiệm tốt nhất.
                                </p>
                            </div>
                        </div>

                        {/* News 2 */}
                        <div className="flex gap-4 md:gap-6 md:flex-row-reverse">
                            <div className="flex-shrink-0 text-center">
                                <div className="inline-block px-4 py-2 bg-blue-300 border-2 border-black rounded-lg font-bold text-sm mb-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                                    SOON
                                </div>
                                <div className="text-xs font-bold text-zinc-600">Q2 2026</div>
                            </div>
                            <div className="flex-1 card bg-blue-100 p-6 md:p-8">
                                <div className="flex items-start gap-3 mb-3">
                                    <Rocket className="w-6 h-6 flex-shrink-0" />
                                    <h3 className="text-xl md:text-2xl font-bold">
                                        Mobile App iOS & Android
                                    </h3>
                                </div>
                                <p className="text-sm md:text-base font-medium text-zinc-700">
                                    Push notifications, offline mode, và smart filters. Download để không bỏ lỡ tin đăng mới!
                                </p>
                            </div>
                        </div>

                        {/* News 3 */}
                        <div className="flex gap-4 md:gap-6">
                            <div className="flex-shrink-0 text-center">
                                <div className="inline-block px-4 py-2 bg-purple-300 border-2 border-black rounded-lg font-bold text-sm mb-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                                    NEXT
                                </div>
                                <div className="text-xs font-bold text-zinc-600">Q3 2026</div>
                            </div>
                            <div className="flex-1 card bg-purple-100 p-6 md:p-8">
                                <div className="flex items-start gap-3 mb-3">
                                    <Sparkles className="w-6 h-6 flex-shrink-0" />
                                    <h3 className="text-xl md:text-2xl font-bold">
                                        Premium Features
                                    </h3>
                                </div>
                                <p className="text-sm md:text-base font-medium text-zinc-700">
                                    Verified badges, priority support, advanced filters. Early adopters nhận ưu đãi đặc biệt!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Gift Section - Early Adopter */}
            <section className="py-12 md:py-16 bg-gradient-to-br from-yellow-50 to-orange-50 border-t-2 border-black">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="rounded-xl border-2 border-black bg-white p-8 md:p-12 shadow-[var(--shadow-secondary)]">
                        <div className="max-w-3xl mx-auto text-center">
                            <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-full border-2 border-black bg-yellow-100">
                                <Gift className="w-10 h-10 text-yellow-600" />
                            </div>

                            <h2 className="text-3xl font-extrabold mb-4 sm:text-4xl md:text-5xl">
                                Early Adopter Rewards
                            </h2>

                            <p className="text-base text-zinc-600 mb-8 md:text-lg">
                                Là người dùng ban đầu = Nhận ưu đãi đặc biệt khi Premium ra mắt!
                            </p>

                            <div className="grid sm:grid-cols-3 gap-4 mb-8">
                                <div className="rounded-lg border-2 border-black bg-blue-50 p-4">
                                    <Star className="w-8 h-8 mx-auto mb-2 text-blue-600 fill-blue-600" />
                                    <p className="text-sm font-bold">Lifetime Badge</p>
                                </div>
                                <div className="rounded-lg border-2 border-black bg-purple-50 p-4">
                                    <Zap className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                                    <p className="text-sm font-bold">Priority Support</p>
                                </div>
                                <div className="rounded-lg border-2 border-black bg-pink-50 p-4">
                                    <Sparkles className="w-8 h-8 mx-auto mb-2 text-pink-600" />
                                    <p className="text-sm font-bold">Exclusive Features</p>
                                </div>
                            </div>

                            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-black bg-yellow-200 font-bold shadow-[var(--shadow-secondary)] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all">
                                <Star className="w-5 h-5 text-yellow-600 fill-yellow-600" />
                                <span>Đăng ký ngay để nhận ưu đãi</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-12 md:py-16 bg-white border-t-2 border-black">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="rounded-xl border-2 border-black bg-blue-50 p-8 sm:p-12 lg:p-16 text-center shadow-[var(--shadow-secondary)]">
                        <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full border-2 border-black bg-white">
                            <Bell className="w-8 h-8 text-blue-600" />
                        </div>

                        <h2 className="text-3xl font-extrabold mb-4 sm:text-4xl md:text-5xl">
                            Đừng bỏ lỡ updates mới!
                        </h2>

                        <p className="text-base text-zinc-600 mb-8 max-w-2xl mx-auto md:text-lg">
                            Subscribe để nhận thông báo về tính năng mới nhất và các ưu đãi đặc biệt từ roomieVerse
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/community"
                                className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-4 min-w-[200px]"
                            >
                                <Users className="w-5 h-5" />
                                Join Community
                            </Link>
                            <Link
                                href="/roommate"
                                className="btn-secondary inline-flex items-center justify-center gap-2 px-8 py-4 min-w-[200px]"
                            >
                                <Rocket className="w-5 h-5" />
                                Bắt đầu ngay
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <ShareFooter />
        </div>
    );
}
