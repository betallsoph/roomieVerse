"use client";

import MainHeader from "../components/MainHeader";
import ShareFooter from "../components/ShareFooter";
import { Users, MessageSquare, Calendar, BookOpen, Award, TrendingUp, Heart, Share2, UserPlus, Sparkles, Lightbulb, Drama, GraduationCap, Newspaper, ShoppingBag, Flame, Star } from "lucide-react";
import Link from "next/link";

export default function CommunityPage() {
    const stats = [
        { icon: Users, value: "1,234+", label: "Thành viên", color: "bg-pink-200" },
        { icon: MessageSquare, value: "567", label: "Thảo luận", color: "bg-blue-200" },
        { icon: Calendar, value: "12", label: "Events", color: "bg-purple-200" },
        { icon: BookOpen, value: "45", label: "Bài viết", color: "bg-yellow-200" }
    ];

    const tipsPosts = [
        { title: "10 tips tiết kiệm tiền khi ở ghép", likes: 234, comments: 45 },
        { title: "Cách sắp xếp đồ trong phòng nhỏ", likes: 189, comments: 32 },
        { title: "Mẹo giặt đồ chung không lộn màu", likes: 156, comments: 28 }
    ];

    const dramaStories = [
        { title: "Roommate của mình đem bạn trai về ngủ mỗi đêm 😭", comments: 156, hot: true },
        { title: "Drama: Người yêu cũ của mình đang hẹn hò với roommate", comments: 234, hot: true },
        { title: "Roommate nấu ăn lúc 2h sáng, mình phải làm sao?", comments: 89, hot: false }
    ];

    return (
        <div className="min-h-screen bg-white">
            <MainHeader />

            {/* Hero Section */}
            <section className="section bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-16 md:py-24">
                <div className="wrapper text-center">
                    <div className="inline-block mb-6 rounded-full border-2 border-black bg-gradient-to-r from-purple-300 to-pink-300 px-6 py-3 text-base font-bold shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                        <Users className="w-5 h-5 inline mr-2" />
                        ROOMIEVERSE COMMUNITY
                    </div>

                    <h1 className="mb-6 text-4xl font-bold uppercase sm:text-5xl md:text-7xl leading-tight">
                        Cộng đồng
                        <br />
                        <span className="text-purple-500">của chúng ta</span>
                    </h1>

                    <p className="mb-10 text-lg font-bold text-zinc-700 sm:text-xl max-w-2xl mx-auto">
                        Nơi chia sẻ, kết nối và giải trí cùng hàng nghìn bạn đang tìm phòng và roommate
                    </p>
                </div>
            </section>

            {/* Stats */}
            <section className="section border-t-2 border-black bg-white py-12 md:py-16">
                <div className="wrapper">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className={`card ${stat.color} p-6 text-center transform ${index % 2 === 0 ? 'md:-rotate-1' : 'md:rotate-1'
                                    } hover:scale-105 transition-transform`}
                            >
                                <stat.icon className="w-10 h-10 mx-auto mb-3" />
                                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                                <div className="text-sm font-bold uppercase">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Main Content Grid - Bento Box Style */}
            <section className="section bg-blue-50 py-16 md:py-20 relative before:absolute before:top-0 before:left-0 before:right-0 before:h-20 before:bg-gradient-to-b before:from-white before:to-transparent before:pointer-events-none">
                <div className="wrapper">
                    <div className="grid md:grid-cols-12 gap-6">

                        {/* Kinh nghiệm & Mẹo hay - Large */}
                        <div className="md:col-span-7 card bg-gradient-to-br from-yellow-200 to-yellow-300 p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-white border-2 border-black rounded-xl">
                                    <Lightbulb className="w-8 h-8" />
                                </div>
                                <h2 className="text-2xl md:text-3xl font-bold uppercase">
                                    Kinh nghiệm & Mẹo hay
                                </h2>
                            </div>
                            <div className="space-y-3 mb-6">
                                {tipsPosts.map((post, index) => (
                                    <div key={index} className="card bg-white p-4">
                                        <h3 className="font-bold mb-2">{post.title}</h3>
                                        <div className="flex items-center gap-4 text-sm font-bold text-zinc-600">
                                            <span className="flex items-center gap-1">
                                                <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                                                {post.likes}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <MessageSquare className="w-4 h-4" />
                                                {post.comments}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Link href="/tips" className="block w-full text-center px-6 py-3 bg-white border-2 border-black rounded-lg font-bold hover:bg-black hover:text-white transition-colors">
                                Xem tất cả mẹo hay
                            </Link>
                        </div>

                        {/* Drama & Stories - Tall */}
                        <div className="md:col-span-5 md:row-span-2 card bg-gradient-to-br from-pink-200 to-pink-300 p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-white border-2 border-black rounded-xl">
                                    <Flame className="w-8 h-8 text-orange-500" />
                                </div>
                                <h2 className="text-2xl font-bold uppercase">
                                    Drama & Câu chuyện
                                </h2>
                            </div>
                            <div className="space-y-3 mb-6">
                                {dramaStories.map((story, index) => (
                                    <div key={index} className="card bg-white p-4">
                                        <div className="flex items-start gap-2 mb-2">
                                            {story.hot && (
                                                <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded border-2 border-black">
                                                    HOT
                                                </span>
                                            )}
                                            <h3 className="font-bold text-sm flex-1">{story.title}</h3>
                                        </div>
                                        <div className="text-sm font-bold text-zinc-600 flex items-center gap-1">
                                            <MessageSquare className="w-4 h-4" />
                                            {story.comments} bình luận
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Link href="/drama" className="block w-full text-center px-6 py-3 bg-white border-2 border-black rounded-lg font-bold hover:bg-black hover:text-white transition-colors">
                                Đọc thêm drama
                            </Link>
                        </div>

                        {/* Blog - Small */}
                        <div className="md:col-span-3 card bg-blue-200 p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <BookOpen className="w-6 h-6" />
                                <h2 className="text-xl font-bold uppercase">Blog</h2>
                            </div>
                            <p className="text-sm font-medium mb-4">
                                Bài viết sâu về trải nghiệm sống chung, tâm lý học...
                            </p>
                            <Link href="/blog" className="block w-full text-center px-4 py-2 bg-white border-2 border-black rounded-lg font-bold text-sm hover:bg-black hover:text-white transition-colors">
                                Đọc blog
                            </Link>
                        </div>

                        {/* Hướng dẫn - Medium */}
                        <div className="md:col-span-4 card bg-purple-200 p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <GraduationCap className="w-6 h-6" />
                                <h2 className="text-xl font-bold uppercase">Hướng dẫn</h2>
                            </div>
                            <p className="text-sm font-medium mb-4">
                                Step-by-step guides về mọi thứ
                            </p>
                            <Link href="/guides" className="block w-full text-center px-4 py-2 bg-white border-2 border-black rounded-lg font-bold text-sm hover:bg-black hover:text-white transition-colors">
                                Xem guides
                            </Link>
                        </div>

                        {/* Tin tức - Medium */}
                        <div className="md:col-span-4 card bg-gradient-to-br from-orange-200 to-red-200 p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <Newspaper className="w-6 h-6" />
                                <h2 className="text-xl font-bold uppercase">Tin tức</h2>
                            </div>
                            <p className="text-sm font-medium mb-4">
                                Updates mới nhất từ RoomieVerse và cộng đồng
                            </p>
                            <Link href="/whats-hot" className="block w-full text-center px-4 py-2 bg-white border-2 border-black rounded-lg font-bold text-sm hover:bg-black hover:text-white transition-colors">
                                Xem What's Hot
                            </Link>
                        </div>

                        {/* Góc pass đồ - Medium */}
                        <div className="md:col-span-4 card bg-green-200 p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <ShoppingBag className="w-6 h-6" />
                                <h2 className="text-xl font-bold uppercase">Góc pass đồ</h2>
                            </div>
                            <p className="text-sm font-medium mb-4">
                                Mua/bán/trao đổi đồ dùng giữa các roommate
                            </p>
                            <Link href="/marketplace" className="block w-full text-center px-4 py-2 bg-white border-2 border-black rounded-lg font-bold text-sm hover:bg-black hover:text-white transition-colors">
                                Vào chợ
                            </Link>
                        </div>

                        {/* Review nhà - Medium */}
                        <div className="md:col-span-4 card bg-gradient-to-br from-indigo-200 to-indigo-300 p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <Star className="w-6 h-6 fill-yellow-500 text-yellow-500" />
                                <h2 className="text-xl font-bold uppercase">Review nhà</h2>
                            </div>
                            <p className="text-sm font-medium mb-4">
                                Review trọ, chung cư, khu phố, chủ trọ từ cộng đồng
                            </p>
                            <Link href="/reviews" className="block w-full text-center px-4 py-2 bg-white border-2 border-black rounded-lg font-bold text-sm hover:bg-black hover:text-white transition-colors">
                                Xem reviews
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Upcoming Events */}
            <section className="section border-t-2 border-black bg-white py-16 md:py-20">
                <div className="wrapper">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold uppercase sm:text-4xl md:text-5xl mb-4">
                            Sự kiện sắp tới
                        </h2>
                        <p className="text-lg font-medium text-zinc-600">
                            Tham gia để gặp gỡ cộng đồng ngoài đời thực
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { title: "Roommate Meetup Sài Gòn", date: "15 Feb 2026", location: "Quận 1", attendees: 28, color: "bg-pink-100" },
                            { title: "Workshop: Sống chung hòa hợp", date: "22 Feb 2026", location: "Online", attendees: 45, color: "bg-blue-100" },
                            { title: "Happy Hour Networking", date: "1 Mar 2026", location: "Quận 7", attendees: 32, color: "bg-purple-100" }
                        ].map((event, index) => (
                            <div key={index} className={`card ${event.color} p-6`}>
                                <Calendar className="w-8 h-8 mb-4" />
                                <h3 className="text-xl font-bold mb-3">{event.title}</h3>
                                <div className="space-y-2 text-sm font-medium">
                                    <div>{event.date} • {event.location}</div>
                                    <div className="font-bold pt-2 border-t-2 border-black">
                                        {event.attendees} người tham gia
                                    </div>
                                </div>
                                <button className="mt-4 w-full px-4 py-2 bg-white border-2 border-black rounded-lg font-bold hover:bg-black hover:text-white transition-colors">
                                    Đăng ký
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Top Contributors */}
            <section className="section bg-gradient-to-br from-yellow-50 to-orange-50 py-16 md:py-20 border-t-2 border-black">
                <div className="wrapper">
                    <div className="text-center mb-12">
                        <div className="inline-block p-4 bg-white border-2 border-black rounded-2xl mb-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                            <Award className="w-12 h-12 mx-auto text-yellow-600" />
                        </div>
                        <h2 className="text-3xl font-bold uppercase sm:text-4xl md:text-5xl mb-4">
                            Top Contributors
                        </h2>
                        <p className="text-lg font-medium text-zinc-600">
                            Những thành viên tích cực nhất tháng này
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                        {[
                            { name: "Minh Nguyen", contributions: 45, avatar: "MN" },
                            { name: "Thu Tran", contributions: 38, avatar: "TT" },
                            { name: "An Pham", contributions: 32, avatar: "AP" },
                            { name: "Khoa Le", contributions: 28, avatar: "KL" }
                        ].map((member, index) => (
                            <div
                                key={index}
                                className={`card bg-white p-6 text-center transform ${index === 0 ? 'md:-rotate-2 md:scale-110' : ''
                                    } hover:scale-105 transition-all relative`}
                            >
                                {index === 0 && (
                                    <div className="absolute -top-3 -right-3">
                                        <div className="w-10 h-10 bg-yellow-300 border-2 border-black rounded-full flex items-center justify-center">
                                            <Sparkles className="w-5 h-5" />
                                        </div>
                                    </div>
                                )}
                                <div className="w-20 h-20 mx-auto mb-4 bg-purple-200 border-4 border-black rounded-full flex items-center justify-center text-2xl font-bold">
                                    {member.avatar}
                                </div>
                                <h3 className="text-lg font-bold mb-2">{member.name}</h3>
                                <div className="text-sm font-bold text-zinc-600">
                                    {member.contributions} đóng góp
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section border-t-2 border-black bg-white py-16 md:py-20">
                <div className="wrapper">
                    <div className="card bg-gradient-to-br from-purple-300 via-blue-300 to-pink-300 p-8 sm:p-12 lg:p-16 text-center">
                        <UserPlus className="w-20 h-20 mx-auto mb-6" />
                        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase mb-6 leading-tight">
                            Tham gia
                            <br />
                            <span className="text-white">Community ngay!</span>
                        </h2>
                        <p className="text-lg md:text-2xl font-bold mb-10 max-w-2xl mx-auto">
                            Kết nối, chia sẻ và giải trí cùng hàng nghìn người đang tìm roommate
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/auth"
                                className="btn-primary text-base sm:text-lg px-8 py-4 min-w-[200px]"
                            >
                                Đăng ký miễn phí
                            </Link>
                            <Link
                                href="/roommate"
                                className="rounded-xl border-2 border-black bg-white px-8 py-4 font-bold shadow-[var(--shadow-secondary)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none text-base sm:text-lg min-w-[200px]"
                            >
                                Khám phá ngay
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <ShareFooter />
        </div>
    );
}
