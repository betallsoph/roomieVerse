"use client";

import { useState } from "react";
import { X, SlidersHorizontal, Search, DollarSign, MapPin, Users, Calendar } from "lucide-react";

export interface FilterState {
  priceMin: number;
  priceMax: number;
  location: string;
  gender: "all" | "male" | "female";
  moveInDate: string;
  keywords: string;
}

interface AdvancedFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onClose?: () => void;
  isMobile?: boolean;
}

const DISTRICTS = [
  "Tất cả quận",
  "Quận 1",
  "Quận 2",
  "Quận 3",
  "Quận 4",
  "Quận 5",
  "Quận 6",
  "Quận 7",
  "Quận 8",
  "Quận 9",
  "Quận 10",
  "Quận 11",
  "Quận 12",
  "Bình Thạnh",
  "Gò Vấp",
  "Phú Nhuận",
  "Tân Bình",
  "Tân Phú",
  "Thủ Đức",
];

export default function AdvancedFilters({
  filters,
  onFiltersChange,
  onClose,
  isMobile = false,
}: AdvancedFiltersProps) {
  const [localFilters, setLocalFilters] = useState<FilterState>(filters);

  const handleApply = () => {
    onFiltersChange(localFilters);
    if (onClose) onClose();
  };

  const handleReset = () => {
    const resetFilters: FilterState = {
      priceMin: 0,
      priceMax: 10,
      location: "",
      gender: "all",
      moveInDate: "",
      keywords: "",
    };
    setLocalFilters(resetFilters);
    onFiltersChange(resetFilters);
  };

  const updateFilter = (key: keyof FilterState, value: any) => {
    setLocalFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className={`${isMobile ? 'fixed inset-0 z-50 bg-white' : ''}`}>
      {/* Mobile Header */}
      {isMobile && (
        <div className="sticky top-0 z-10 border-b-2 border-black bg-blue-50 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <SlidersHorizontal className="h-6 w-6" />
              <h2 className="text-xl font-bold">Bộ lọc nâng cao</h2>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg border-2 border-black bg-white p-2 hover:bg-gray-100 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      {/* Filter Content */}
      <div className={`${isMobile ? 'overflow-y-auto px-6 py-6' : ''} space-y-6`}>
        {/* Desktop Title */}
        {!isMobile && (
          <div className="flex items-center gap-2 mb-4">
            <SlidersHorizontal className="h-5 w-5" />
            <h3 className="text-lg font-bold">Bộ lọc nâng cao</h3>
          </div>
        )}

        {/* Keywords Search */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-bold">
            <Search className="h-4 w-4" />
            Tìm kiếm
          </label>
          <input
            type="text"
            value={localFilters.keywords}
            onChange={(e) => updateFilter("keywords", e.target.value)}
            placeholder="có ban công, gần chợ..."
            className="w-full rounded-xl border-2 border-black px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>

        {/* Price Range */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-bold">
            <DollarSign className="h-4 w-4" />
            Khoảng giá (triệu/tháng)
          </label>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <input
                type="number"
                value={localFilters.priceMin}
                onChange={(e) => updateFilter("priceMin", Number(e.target.value))}
                min="0"
                max="20"
                className="w-full rounded-xl border-2 border-black px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="Từ"
              />
              <span className="font-bold">-</span>
              <input
                type="number"
                value={localFilters.priceMax}
                onChange={(e) => updateFilter("priceMax", Number(e.target.value))}
                min="0"
                max="20"
                className="w-full rounded-xl border-2 border-black px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="Đến"
              />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-zinc-600">
                <span>{localFilters.priceMin} triệu</span>
                <span>{localFilters.priceMax} triệu</span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                value={localFilters.priceMax}
                onChange={(e) => updateFilter("priceMax", Number(e.target.value))}
                className="w-full accent-blue-400"
              />
            </div>
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-bold">
            <MapPin className="h-4 w-4" />
            Khu vực
          </label>
          <select
            value={localFilters.location}
            onChange={(e) => updateFilter("location", e.target.value)}
            className="w-full rounded-xl border-2 border-black px-4 py-2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            {DISTRICTS.map((district) => (
              <option key={district} value={district === "Tất cả quận" ? "" : district}>
                {district}
              </option>
            ))}
          </select>
        </div>

        {/* Gender Preference */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-bold">
            <Users className="h-4 w-4" />
            Giới tính
          </label>
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => updateFilter("gender", "all")}
              className={`rounded-xl border-2 border-black px-4 py-3 text-sm font-bold transition-all ${
                localFilters.gender === "all"
                  ? "bg-blue-300 shadow-[var(--shadow-secondary)]"
                  : "bg-white hover:bg-gray-50"
              }`}
            >
              Tất cả
            </button>
            <button
              onClick={() => updateFilter("gender", "male")}
              className={`rounded-xl border-2 border-black px-4 py-3 text-sm font-bold transition-all ${
                localFilters.gender === "male"
                  ? "bg-blue-300 shadow-[var(--shadow-secondary)]"
                  : "bg-white hover:bg-gray-50"
              }`}
            >
              Nam
            </button>
            <button
              onClick={() => updateFilter("gender", "female")}
              className={`rounded-xl border-2 border-black px-4 py-3 text-sm font-bold transition-all ${
                localFilters.gender === "female"
                  ? "bg-pink-300 shadow-[var(--shadow-secondary)]"
                  : "bg-white hover:bg-gray-50"
              }`}
            >
              Nữ
            </button>
          </div>
        </div>

        {/* Move-in Date */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-bold">
            <Calendar className="h-4 w-4" />
            Ngày dọn vào
          </label>
          <input
            type="date"
            value={localFilters.moveInDate}
            onChange={(e) => updateFilter("moveInDate", e.target.value)}
            className="w-full rounded-xl border-2 border-black px-4 py-2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className={`${isMobile ? 'sticky bottom-0 border-t-2 border-black bg-white px-6 py-4' : 'mt-6'}`}>
        <div className="flex gap-3">
          <button
            onClick={handleReset}
            className="flex-1 rounded-xl border-2 border-black bg-white px-6 py-3 font-bold transition-all hover:bg-gray-50"
          >
            Đặt lại
          </button>
          <button
            onClick={handleApply}
            className="flex-1 rounded-xl border-2 border-black bg-blue-300 px-6 py-3 font-bold shadow-[var(--shadow-secondary)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
          >
            Áp dụng
          </button>
        </div>
      </div>
    </div>
  );
}
