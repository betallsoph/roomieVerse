"use client";

type PropertyType = "house" | "apartment";

interface FilterTabsProps {
  activeType: PropertyType;
  onTypeChange: (type: PropertyType) => void;
}

export default function FilterTabs({
  activeType,
  onTypeChange,
}: FilterTabsProps) {
  return (
    <div className="mb-8 flex gap-6 border-b-2 border-black">
      <button
        onClick={() => onTypeChange("house")}
        className={`pb-3 text-sm font-bold transition-all ${
          activeType === "house"
            ? "border-b-4 border-pink-500 text-black"
            : "text-zinc-600 hover:text-black"
        }`}
      >
        Nhà mặt đất
      </button>
      <button
        onClick={() => onTypeChange("apartment")}
        className={`pb-3 text-sm font-bold transition-all ${
          activeType === "apartment"
            ? "border-b-4 border-pink-500 text-black"
            : "text-zinc-600 hover:text-black"
        }`}
      >
        Chung cư
      </button>
    </div>
  );
}
