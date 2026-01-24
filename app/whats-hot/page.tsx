"use client";

import MainHeader from "../components/MainHeader";
import ShareFooter from "../components/ShareFooter";
import { Sparkles, Rocket, Calendar, Bell, Gift, Star, Users, MessageSquare, TrendingUp, Zap, Heart, Flame, Video, Shield, PartyPopper } from "lucide-react";
import Link from "next/link";

export default function WhatsHotPage() {
    return (
        <div className="min-h-screen bg-white">
            <MainHeader />

            {/* Hero Section */}
            <section className="section bg-blue-50 py-16 md:py-24 overflow-hidden">
                <div className="wrapper text-center relative">
                    <div className="inline-block mb-6 rounded-full border-2 border-black bg-gradient-to-r from-purple-300 to-pink-300 px-6 py-3 text-base font-bold shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] transition-all flex items-center gap-2 mx-auto w-fit">
                        <Sparkles className="w-5 h-5" />
                        WHAT'S HOT AT ROOMIEVERSE
                    </div>

                    <h1 className="mb-6 text-4xl font-bold uppercase sm:text-5xl md:text-7xl leading-tight">
                        Những điều
                        <br />
                        <span className="text-blue-500">thú vị</span> đang tới!
                    </h1>

                    <p className="mb-10 text-lg font-bold text-zinc-700 sm:text-xl max-w-2xl mx-auto">
                        Updates mới nhất, tính năng sắp ra mắt, và những điều bạn không thể bỏ lỡ!
                    </p>
                </div>
            </section>

            {/* Stats - Messy Grid Layout */}
            <section className="section border-t-2 border-black bg-white py-12 md:py-16">
                <div className="wrapper">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                        {/* Stat 1 - Larger */}
                        <div className="col-span-2 md:col-span-1 card bg-pink-200 p-8 transform md:-rotate-2">
                            <Users className="w-10 h-10 mb-3" />
                            <div className="text-5xl font-bold mb-2">1,234+</div>
                            <div className="text-sm font-bold uppercase">Happy Users</div>
                        </div>

                        {/* Stat 2 - Higher position */}
                        <div className="card bg-blue-200 p-6 transform md:rotate-1 md:-translate-y-4">
                            <TrendingUp className="w-8 h-8 mb-3" />
                            <div className="text-4xl font-bold mb-2">567+</div>
                            <div className="text-sm font-bold uppercase">Listings</div>
                        </div>

                        {/* Stat 3 - Normal */}
                        <div className="card bg-purple-200 p-6 transform md:-rotate-1">
                            <Heart className="w-8 h-8 mb-3 text-red-600 fill-red-600" />
                            <div className="text-4xl font-bold mb-2">89+</div>
                            <div className="text-sm font-bold uppercase">Matches</div>
                        </div>

                        {/* Stat 4 - Lower position */}
                        <div className="card bg-yellow-200 p-6 transform md:rotate-2 md:translate-y-4">
                            <Zap className="w-8 h-8 mb-3" />
                            <div className="text-4xl font-bold mb-2">3</div>
                            <div className="text-sm font-bold uppercase">Cities</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Upcoming Features - Bento Box Style */}
            <section className="section bg-blue-50 py-16 md:py-20 relative before:absolute before:top-0 before:left-0 before:right-0 before:h-20 before:bg-gradient-to-b before:from-white before:to-transparent before:pointer-events-none">
                <div className="wrapper">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold uppercase sm:text-4xl md:text-5xl">
                            Tính năng mới
                        </h2>
                    </div>

                    {/* Asymmetric grid */}
                    <div className="grid md:grid-cols-12 gap-6">
                        {/* Feature 1 - Big */}
                        <div className="md:col-span-7 card bg-gradient-to-br from-purple-200 to-purple-300 p-8">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="p-3 rounded-xl border-2 border-black bg-white">
                                    <Sparkles className="w-8 h-8" />
                                </div>
                                <div className="flex-1">
                                    <span className="inline-block mb-2 rounded-lg border-2 border-black bg-yellow-200 px-3 py-1 text-xs font-bold">
                                        Q2 2026
                                    </span>
                                    <h3 className="text-2xl font-bold mb-3">
                                        Smart Matching Algorithm
                                    </h3>
                                    <p className="text-base font-medium">
                                        AI-powered roommate matching dựa trên lifestyle preferences và personality traits.
                                        Tìm người phù hợp chưa bao giờ dễ dàng đến thế!
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Feature 2 - Tall */}
                        <div className="md:col-span-5 md:row-span-2 card bg-blue-200 p-8">
                            <div className="p-3 rounded-xl border-2 border-black bg-white inline-block mb-4">
                                <Video className="w-10 h-10" />
                            </div>
                            <span className="inline-block mb-3 rounded-lg border-2 border-black bg-green-200 px-3 py-1 text-xs font-bold">
                                COMING Q1 2026
                            </span>
                            <h3 className="text-2xl font-bold mb-4">
                                Video Tours 360°
                            </h3>
                            <p className="text-base font-medium mb-6">
                                Upload video 360° của phòng để người thuê có trải nghiệm xem phòng trực quan nhất.
                                Như đi xem phòng thật!
                            </p>
                            <div className="mt-auto pt-4 border-t-2 border-black">
                                <div className="text-sm font-bold flex items-center gap-2">
                                    <Zap className="w-4 h-4" />
                                    Virtual Reality Ready
                                </div>
                            </div>
                        </div>

                        {/* Feature 3 - Wide */}
                        <div className="md:col-span-7 card bg-pink-200 p-8">
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-xl border-2 border-black bg-white">
                                    <Users className="w-8 h-8" />
                                </div>
                                <div className="flex-1">
                                    <span className="inline-block mb-2 rounded-lg border-2 border-black bg-purple-200 px-3 py-1 text-xs font-bold">
                                        PLANNING - Q3 2026
                                    </span>
                                    <h3 className="text-xl font-bold mb-2">
                                        Community Events
                                    </h3>
                                    <p className="text-sm font-medium">
                                        Meetup, networking events để gặp gỡ ngoài đời thực!
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Feature 4 - Small accent */}
                        <div className="md:col-span-6 card bg-gradient-to-br from-green-200 to-green-300 p-6">
                            <div className="flex items-start gap-3">
                                <MessageSquare className="w-8 h-8 flex-shrink-0" />
                                <div>
                                    <span className="inline-block mb-2 rounded-lg border-2 border-black bg-white px-2 py-1 text-xs font-bold">
                                        Q1 2026
                                    </span>
                                    <h3 className="text-lg font-bold mb-2">In-App Messaging</h3>
                                    <p className="text-sm font-medium">Chat ngay trong app!</p>
                                </div>
                            </div>
                        </div>

                        {/* Feature 5 - Small accent */}
                        <div className="md:col-span-6 card bg-yellow-200 p-6">
                            <div className="flex items-start gap-3">
                                <Shield className="w-8 h-8 flex-shrink-0" />
                                <div>
                                    <span className="inline-block mb-2 rounded-lg border-2 border-black bg-white px-2 py-1 text-xs font-bold">
                                        Q2 2026
                                    </span>
                                    <h3 className="text-lg font-bold mb-2">Verified Profiles</h3>
                                    <p className="text-sm font-medium">Xác minh CCCD/CMND</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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

            {/* Gift Section - Playful */}
            <section className="section bg-gradient-to-br from-yellow-50 to-orange-50 py-16 md:py-20 border-t-2 border-black relative overflow-hidden">
                <div className="wrapper relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-block p-6 bg-white border-2 border-black rounded-2xl mb-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                            <Gift className="w-16 h-16 mx-auto" />
                        </div>

                        <h2 className="text-3xl md:text-5xl font-black uppercase mb-6">
                            Early Adopter
                            <br />
                            <span className="text-orange-500">Rewards!</span>
                        </h2>

                        <p className="text-lg md:text-xl font-bold mb-8 text-zinc-700">
                            Là người dùng ban đầu = Nhận ưu đãi đặc biệt khi Premium ra mắt!
                        </p>

                        <div className="inline-flex items-center gap-3 rounded-xl border-2 border-black bg-gradient-to-r from-yellow-200 to-yellow-300 px-8 py-4 text-lg font-bold shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] transition-all">
                            <Star className="w-6 h-6 text-yellow-600 fill-yellow-600" />
                            Lifetime Premium Badge
                            <Star className="w-6 h-6 text-yellow-600 fill-yellow-600" />
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section - Bold */}
            <section className="section border-t-2 border-black py-16 md:py-20 bg-white">
                <div className="wrapper">
                    <div className="card bg-gradient-to-br from-blue-300 via-purple-300 to-pink-300 p-8 sm:p-12 lg:p-16 text-center relative overflow-hidden">
                        {/* Decorative circles */}
                        <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full -translate-y-20 translate-x-20 opacity-20"></div>
                        <div className="absolute bottom-0 left-0 w-60 h-60 bg-black rounded-full translate-y-30 -translate-x-30 opacity-10"></div>

                        <div className="relative z-10">
                            <Bell className="w-20 h-20 mx-auto mb-6 animate-bounce" />
                            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase mb-6 leading-tight">
                                Đừng bỏ lỡ
                                <br />
                                <span className="text-white">updates mới!</span>
                            </h2>
                            <p className="text-lg md:text-2xl font-bold mb-10 max-w-2xl mx-auto">
                                Subscribe để nhận thông báo về tính năng mới nhất
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                <Link
                                    href="/community"
                                    className="btn-primary text-base sm:text-lg px-8 py-4 min-w-[200px] transform hover:scale-105 transition-transform"
                                >
                                    Join Community
                                </Link>
                                <Link
                                    href="/roommate"
                                    className="rounded-xl border-2 border-black bg-white px-8 py-4 font-bold shadow-[var(--shadow-secondary)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none text-base sm:text-lg min-w-[200px]"
                                >
                                    Bắt đầu ngay
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <ShareFooter />
        </div>
    );
}
