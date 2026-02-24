"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import MainHeader from "../../components/MainHeader";
import ShareFooter from "../../components/ShareFooter";
import ProtectedRoute from "../../components/ProtectedRoute";
import { useAuth } from "../../contexts/AuthContext";
import BypassModerationToggle from "../../components/BypassModerationToggle";
import { createListing } from "../../data/listings";
import { cities, getDistrictsByLabel } from "../../data/locations";
import {
  ArrowLeft,
  MapPin,
  Loader2,
  Home,
  Phone,
} from "lucide-react";
import { useAdminRedirect } from "../../hooks/useAdminRedirect";

export default function CreateShortTermPage() {
  useAdminRedirect();
  const router = useRouter();
  const { user, isAuthenticated, isTester } = useAuth();
  const [bypassMod, setBypassMod] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth?returnUrl=/short-term/create");
    }
  }, [isAuthenticated, router]);

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [specificAddress, setSpecificAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [zalo, setZalo] = useState("");
  const [amenities, setAmenities] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const availableDistricts = city ? getDistrictsByLabel(city) : [];

  const amenityOptions = [
    { value: "ac", label: "Điều hòa" },
    { value: "wifi", label: "Wifi" },
    { value: "washing", label: "Máy giặt" },
    { value: "fridge", label: "Tủ lạnh" },
    { value: "kitchen", label: "Bếp" },
    { value: "private-wc", label: "WC riêng" },
    { value: "furnished", label: "Nội thất" },
    { value: "parking", label: "Chỗ đậu xe" },
    { value: "security", label: "Bảo vệ 24/7" },
    { value: "elevator", label: "Thang máy" },
  ];

  const toggleAmenity = (value: string) => {
    setAmenities((prev) =>
      prev.includes(value) ? prev.filter((a) => a !== value) : [...prev, value]
    );
  };

  const canSubmit =
    title.trim().length >= 5 &&
    description.trim().length >= 20 &&
    price.trim() &&
    city &&
    phone.trim();

  const handleSubmit = async () => {
    if (!canSubmit || !user || isSubmitting) return;
    setIsSubmitting(true);
    try {
      const location = [district, city].filter(Boolean).join(", ");
      const id = await createListing({
        userId: user.uid,
        category: "short-term",
        title: title.trim(),
        description: description.trim(),
        price: price.trim(),
        location,
        city,
        district,
        specificAddress: specificAddress.trim() || undefined,
        phone: phone.trim(),
        zalo: zalo.trim() || undefined,
        moveInDate: "Linh hoạt",
        author: user.displayName || "Ẩn danh",
        postedDate: new Date().toLocaleDateString("vi-VN"),
        amenities: amenities.length > 0 ? amenities : undefined,
      }, isTester && bypassMod);
      router.push(`/short-term/listing/${id}`);
    } catch (error) {
      console.error("Error creating short-term listing:", error);
      alert("Đăng tin thất bại. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-white">
        <MainHeader />

        <section className="py-12 md:py-16">
          <div className="wrapper max-w-3xl">
            {/* Header */}
            <div className="mb-8">
              <Link
                href="/short-term"
                className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-500 hover:text-black transition-colors mb-6"
              >
                <ArrowLeft className="w-4 h-4" />
                Quay lại
              </Link>
              <h1 className="text-3xl md:text-4xl font-black mb-2">
                Đăng cho thuê ngắn ngày
              </h1>
              <p className="text-zinc-600">
                Cho thuê phòng theo ngày, tuần cho người cần chỗ ở tạm thời
              </p>
            </div>

            {/* Title */}
            <div className="mb-6">
              <label className="block text-sm font-bold mb-2">
                Tiêu đề <span className="text-red-500">*</span>
              </label>
              <input
                autoComplete="off" type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="VD: Phòng studio đầy đủ nội thất Q1 - 300k/ngày"
                maxLength={150}
                className="w-full px-4 py-3 border-2 border-black rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300"
              />
              <p className="text-xs text-zinc-400 mt-1">
                {title.length}/150 ký tự (tối thiểu 5)
              </p>
            </div>

            {/* Price */}
            <div className="mb-6">
              <label className="block text-sm font-bold mb-2">
                Giá cho thuê <span className="text-red-500">*</span>
              </label>
              <input
                autoComplete="off" type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="VD: 300.000đ/ngày hoặc 1.500.000đ/tuần"
                className="w-full px-4 py-3 border-2 border-black rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300"
              />
            </div>

            {/* Location */}
            <div className="mb-6">
              <label className="block text-sm font-bold mb-2">
                <MapPin className="w-4 h-4 inline mr-1" />
                Khu vực <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <select
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                    setDistrict("");
                  }}
                  className="px-4 py-3 border-2 border-black rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300"
                >
                  <option value="">Chọn tỉnh/thành</option>
                  {cities.map((c) => (
                    <option key={c.label} value={c.label}>
                      {c.label}
                    </option>
                  ))}
                </select>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  disabled={!city}
                  className="px-4 py-3 border-2 border-black rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300 disabled:opacity-50"
                >
                  <option value="">Chọn quận/huyện</option>
                  {availableDistricts.map((d) => (
                    <option key={d.value} value={d.label}>
                      {d.label}
                    </option>
                  ))}
                </select>
              </div>
              <input
                autoComplete="off" type="text"
                value={specificAddress}
                onChange={(e) => setSpecificAddress(e.target.value)}
                placeholder="Địa chỉ cụ thể (không bắt buộc)"
                className="w-full px-4 py-3 border-2 border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-black"
              />
            </div>

            {/* Description */}
            <div className="mb-6">
              <label className="block text-sm font-bold mb-2">
                Mô tả phòng <span className="text-red-500">*</span>
              </label>
              <textarea
                autoComplete="off" value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Mô tả phòng, tiện nghi, điều kiện thuê, thời gian cho thuê..."
                rows={6}
                className="w-full px-4 py-3 border-2 border-black rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300 resize-none"
              />
              <p className="text-xs text-zinc-400 mt-1">
                {description.length} ký tự (tối thiểu 20)
              </p>
            </div>

            {/* Amenities */}
            <div className="mb-6">
              <label className="block text-sm font-bold mb-3">Tiện nghi</label>
              <div className="flex flex-wrap gap-2">
                {amenityOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => toggleAmenity(opt.value)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium border-2 transition-colors ${
                      amenities.includes(opt.value)
                        ? "border-black bg-yellow-200 text-yellow-900"
                        : "border-zinc-200 text-zinc-600 hover:border-black"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="mb-6">
              <label className="block text-sm font-bold mb-2">
                <Phone className="w-4 h-4 inline mr-1" />
                Số điện thoại <span className="text-red-500">*</span>
              </label>
              <input
                autoComplete="off" type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Số điện thoại liên hệ"
                className="w-full px-4 py-3 border-2 border-black rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300"
              />
            </div>

            <div className="mb-8">
              <label className="block text-sm font-bold mb-2">Zalo</label>
              <input
                autoComplete="off" type="text"
                value={zalo}
                onChange={(e) => setZalo(e.target.value)}
                placeholder="Số Zalo (không bắt buộc)"
                className="w-full px-4 py-3 border-2 border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-black"
              />
            </div>

            {/* Submit */}
            {isTester && (
              <div className="mb-4">
                <BypassModerationToggle enabled={bypassMod} onChange={setBypassMod} />
              </div>
            )}
            <div className="flex gap-3 pt-4 border-t-2 border-zinc-100">
              <Link
                href="/short-term"
                className="flex-1 text-center px-6 py-3 font-bold border-2 border-black rounded-xl hover:bg-zinc-50 transition-colors"
              >
                Hủy
              </Link>
              <button
                onClick={handleSubmit}
                disabled={!canSubmit || isSubmitting}
                className="flex-1 px-6 py-3 font-bold border-2 border-black rounded-xl bg-yellow-300 shadow-[2px_2px_0_0_#000] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:translate-x-[2px] active:translate-y-[2px] active:shadow-none disabled:opacity-50 disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[2px_2px_0_0_#000] flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Đang đăng...
                  </>
                ) : (
                  "Đăng tin"
                )}
              </button>
            </div>
          </div>
        </section>

        <ShareFooter />
      </div>
    </ProtectedRoute>
  );
}
