"use client";

import MainHeader from "../components/MainHeader";
import ShareFooter from "../components/ShareFooter";
import { Sparkles, Rocket, Calendar, Bell, Gift, Star, Users, MessageSquare, TrendingUp, Zap, Heart, Flame, Video, Shield, PartyPopper, Pin } from "lucide-react";
import Link from "next/link";
import { useAdminRedirect } from "../hooks/useAdminRedirect";

export default function WhatsHotPage() {
    useAdminRedirect();
    return (
        <div className="min-h-screen bg-white">
            <MainHeader />

            {/* Bảng tin - Bulletin Board Style */}
            <section className="bg-purple-50 py-10 sm:py-16 md:py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6">
                    <div className="text-center mb-8 sm:mb-12">
                        <h2 className="text-2xl font-bold uppercase sm:text-4xl md:text-5xl">
                            Bảng tin
                        </h2>
                        <p className="mt-2 text-sm sm:text-base text-zinc-600">Bảng tin tổ dân phố roomieVerse</p>
                    </div>

                    <div className="max-w-5xl mx-auto">
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                            {/* Note 1 */}
                            <div className="relative -rotate-2 hover:rotate-0 transition-transform duration-300">
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                                    <div className="w-6 h-6 rounded-full bg-red-400 border-2 border-red-600 shadow-md" />
                                </div>
                                <div className="bg-white border border-zinc-200 rounded-sm p-5 pt-6 shadow-[4px_4px_8px_rgba(0,0,0,0.1)] min-h-[180px]">
                                    <p className="text-xs font-bold text-zinc-500 mb-2">24/02/2026</p>
                                    <h3 className="text-base font-bold mb-2 text-red-700">Nội quy cộng đồng</h3>
                                    <p className="text-sm text-zinc-700 leading-relaxed">
                                        Vui lòng đăng tin chân thực, không spam. Tôn trọng lẫn nhau. Vi phạm sẽ bị khoá tài khoản!
                                    </p>
                                </div>
                            </div>

                            {/* Note 2 */}
                            <div className="relative rotate-1 hover:rotate-0 transition-transform duration-300">
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                                    <div className="w-6 h-6 rounded-full bg-blue-400 border-2 border-blue-600 shadow-md" />
                                </div>
                                <div className="bg-white border border-zinc-200 rounded-sm p-5 pt-6 shadow-[4px_4px_8px_rgba(0,0,0,0.1)] min-h-[180px]">
                                    <p className="text-xs font-bold text-zinc-500 mb-2">20/02/2026</p>
                                    <h3 className="text-base font-bold mb-2 text-blue-700">Mẹo tìm phòng hiệu quả</h3>
                                    <p className="text-sm text-zinc-700 leading-relaxed">
                                        Điền đầy đủ thông tin, upload ảnh rõ ràng, và mô tả chi tiết lối sống để tìm bạn ở phù hợp nhanh hơn!
                                    </p>
                                </div>
                            </div>

                            {/* Note 3 */}
                            <div className="relative -rotate-1 hover:rotate-0 transition-transform duration-300">
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                                    <div className="w-6 h-6 rounded-full bg-green-400 border-2 border-green-600 shadow-md" />
                                </div>
                                <div className="bg-white border border-zinc-200 rounded-sm p-5 pt-6 shadow-[4px_4px_8px_rgba(0,0,0,0.1)] min-h-[180px]">
                                    <p className="text-xs font-bold text-zinc-500 mb-2">15/02/2026</p>
                                    <h3 className="text-base font-bold mb-2 text-green-700">Cẩn thận lừa đảo!</h3>
                                    <p className="text-sm text-zinc-700 leading-relaxed">
                                        Không chuyển cọc khi chưa xem phòng. Gặp mặt trực tiếp trước khi quyết định. Báo cáo tin đáng ngờ cho admin!
                                    </p>
                                </div>
                            </div>

                            {/* Note 4 */}
                            <div className="relative rotate-2 hover:rotate-0 transition-transform duration-300">
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                                    <div className="w-6 h-6 rounded-full bg-pink-400 border-2 border-pink-600 shadow-md" />
                                </div>
                                <div className="bg-white border border-zinc-200 rounded-sm p-5 pt-6 shadow-[4px_4px_8px_rgba(0,0,0,0.1)] min-h-[180px]">
                                    <p className="text-xs font-bold text-zinc-500 mb-2">10/02/2026</p>
                                    <h3 className="text-base font-bold mb-2 text-pink-700">Tuyển Mod cộng đồng</h3>
                                    <p className="text-sm text-zinc-700 leading-relaxed">
                                        roomieVerse đang tìm các bạn mod nhiệt tình, yêu cộng đồng. Inbox fanpage để ứng tuyển nhé!
                                    </p>
                                </div>
                            </div>

                            {/* Note 5 */}
                            <div className="relative -rotate-[1.5deg] hover:rotate-0 transition-transform duration-300">
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                                    <div className="w-6 h-6 rounded-full bg-purple-400 border-2 border-purple-600 shadow-md" />
                                </div>
                                <div className="bg-white border border-zinc-200 rounded-sm p-5 pt-6 shadow-[4px_4px_8px_rgba(0,0,0,0.1)] min-h-[180px]">
                                    <p className="text-xs font-bold text-zinc-500 mb-2">05/02/2026</p>
                                    <h3 className="text-base font-bold mb-2 text-purple-700">Cập nhật hệ thống</h3>
                                    <p className="text-sm text-zinc-700 leading-relaxed">
                                        Đã thêm tính năng lọc theo quận, tìm kiếm nâng cao, và cải thiện tốc độ tải trang. Trải nghiệm mượt hơn!
                                    </p>
                                </div>
                            </div>

                            {/* Note 6 */}
                            <div className="relative rotate-[1.5deg] hover:rotate-0 transition-transform duration-300">
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                                    <div className="w-6 h-6 rounded-full bg-orange-400 border-2 border-orange-600 shadow-md" />
                                </div>
                                <div className="bg-white border border-zinc-200 rounded-sm p-5 pt-6 shadow-[4px_4px_8px_rgba(0,0,0,0.1)] min-h-[180px]">
                                    <p className="text-xs font-bold text-zinc-500 mb-2">01/02/2026</p>
                                    <h3 className="text-base font-bold mb-2 text-orange-700">Feedback & Góp ý</h3>
                                    <p className="text-sm text-zinc-700 leading-relaxed">
                                        Bạn có ý tưởng hay? Gặp lỗi? Hãy góp ý tại mục Cộng đồng hoặc inbox trực tiếp. Mọi ý kiến đều quý giá!
                                    </p>
                                </div>
                            </div>

                            {/* Note 7 */}
                            <div className="relative rotate-1 hover:rotate-0 transition-transform duration-300">
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                                    <div className="w-6 h-6 rounded-full bg-teal-400 border-2 border-teal-600 shadow-md" />
                                </div>
                                <div className="bg-white border border-zinc-200 rounded-sm p-5 pt-6 shadow-[4px_4px_8px_rgba(0,0,0,0.1)] min-h-[180px]">
                                    <p className="text-xs font-bold text-zinc-500 mb-2">28/01/2026</p>
                                    <h3 className="text-base font-bold mb-2 text-teal-700">Xác minh danh tính</h3>
                                    <p className="text-sm text-zinc-700 leading-relaxed">
                                        Tài khoản đã xác minh sẽ được ưu tiên hiển thị. Xác minh CCCD để tăng độ tin cậy cho hồ sơ của bạn!
                                    </p>
                                </div>
                            </div>

                            {/* Note 8 */}
                            <div className="relative -rotate-2 hover:rotate-0 transition-transform duration-300">
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                                    <div className="w-6 h-6 rounded-full bg-amber-400 border-2 border-amber-600 shadow-md" />
                                </div>
                                <div className="bg-white border border-zinc-200 rounded-sm p-5 pt-6 shadow-[4px_4px_8px_rgba(0,0,0,0.1)] min-h-[180px]">
                                    <p className="text-xs font-bold text-zinc-500 mb-2">20/01/2026</p>
                                    <h3 className="text-base font-bold mb-2 text-amber-700">Sắp có: Chat trực tiếp</h3>
                                    <p className="text-sm text-zinc-700 leading-relaxed">
                                        Tính năng nhắn tin trực tiếp giữa các user sắp ra mắt. Không cần trao đổi qua app khác nữa!
                                    </p>
                                </div>
                            </div>

                            {/* Note 9 */}
                            <div className="relative rotate-[1.5deg] hover:rotate-0 transition-transform duration-300">
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                                    <div className="w-6 h-6 rounded-full bg-rose-400 border-2 border-rose-600 shadow-md" />
                                </div>
                                <div className="bg-white border border-zinc-200 rounded-sm p-5 pt-6 shadow-[4px_4px_8px_rgba(0,0,0,0.1)] min-h-[180px]">
                                    <p className="text-xs font-bold text-zinc-500 mb-2">15/01/2026</p>
                                    <h3 className="text-base font-bold mb-2 text-rose-700">Chào mừng 1000 users!</h3>
                                    <p className="text-sm text-zinc-700 leading-relaxed">
                                        Cảm ơn cộng đồng đã đồng hành! roomieVerse đã cán mốc 1000 người dùng đăng ký. Cùng phát triển nhé!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tính năng mới */}
            <section className="py-8 sm:py-12 md:py-16 bg-white border-t-2 border-black">
                <div className="mx-auto max-w-7xl px-4 sm:px-6">
                    <div className="mb-8 sm:mb-12">
                        <h2 className="text-2xl font-extrabold sm:text-4xl md:text-5xl">
                            Tính năng mới
                        </h2>
                        <p className="mt-2 sm:mt-3 text-sm sm:text-base text-zinc-600">
                            Những gì chúng mình đang xây dựng cho bạn
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
                        {/* News 1 - Left */}
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

                        {/* News 2 - Right */}
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

                        {/* News 3 - Left */}
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
            <section className="py-8 sm:py-12 md:py-16 bg-gradient-to-br from-yellow-50 to-orange-50 border-t-2 border-black">
                <div className="mx-auto max-w-7xl px-4 sm:px-6">
                    <div className="rounded-xl border-2 border-black bg-white p-5 sm:p-8 md:p-12 shadow-[var(--shadow-secondary)]">
                        <div className="max-w-3xl mx-auto text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 mb-4 sm:mb-6 rounded-full border-2 border-black bg-yellow-100">
                                <Gift className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-600" />
                            </div>

                            <h2 className="text-2xl font-extrabold mb-3 sm:mb-4 sm:text-4xl md:text-5xl">
                                Early Adopter Rewards
                            </h2>

                            <p className="text-sm sm:text-base text-zinc-600 mb-6 sm:mb-8 md:text-lg">
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

                            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-black bg-yellow-200 font-bold shadow-[var(--shadow-secondary)] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all">
                                <Star className="w-5 h-5 text-yellow-600 fill-yellow-600" />
                                <span>Đăng ký ngay để nhận ưu đãi</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-8 sm:py-12 md:py-16 bg-white border-t-2 border-black">
                <div className="mx-auto max-w-7xl px-4 sm:px-6">
                    <div className="rounded-xl border-2 border-black bg-blue-50 p-6 sm:p-12 lg:p-16 text-center shadow-[var(--shadow-secondary)]">
                        <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 mb-4 sm:mb-6 rounded-full border-2 border-black bg-white">
                            <Bell className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
                        </div>

                        <h2 className="text-2xl font-extrabold mb-3 sm:mb-4 sm:text-4xl md:text-5xl">
                            Đừng bỏ lỡ updates mới!
                        </h2>

                        <p className="text-sm sm:text-base text-zinc-600 mb-6 sm:mb-8 max-w-2xl mx-auto md:text-lg">
                            Subscribe để nhận thông báo về tính năng mới nhất và các ưu đãi đặc biệt từ roomieVerse
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                            <Link
                                href="/community"
                                className="btn-primary inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto sm:min-w-[200px]"
                            >
                                <Users className="w-5 h-5" />
                                Join Community
                            </Link>
                            <Link
                                href="/roommate"
                                className="btn-secondary inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto sm:min-w-[200px]"
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
