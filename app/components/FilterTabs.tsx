"use client";

import { motion } from "framer-motion";

type PropertyType = "house" | "apartment";

interface FilterTabsProps {
  activeType: PropertyType;
  onTypeChange: (type: PropertyType) => void;
  description?: React.ReactNode;
}

export default function FilterTabs({
  activeType,
  onTypeChange,
  description,
}: FilterTabsProps) {
  return (
    <div className="space-y-3 sm:space-y-6">
      {/* Pill-style Tabs */}
      <motion.div
        className="inline-flex rounded-xl border-2 border-black bg-white p-1 sm:p-1.5 text-sm sm:text-base font-bold tracking-wide shadow-[3px_3px_0_0_#000]"
        whileTap={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <motion.button
          type="button"
          onClick={() => onTypeChange("house")}
          whileTap={{ scale: 0.90 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className={`rounded-lg px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-3.5 transition-colors duration-200 cursor-pointer ${activeType === "house"
            ? "bg-pink-300 text-black border-2 border-black"
            : "text-black border-2 border-transparent hover:bg-zinc-100"
            }`}
        >
          Nhà mặt đất
        </motion.button>
        <motion.button
          type="button"
          onClick={() => onTypeChange("apartment")}
          whileTap={{ scale: 0.90 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className={`rounded-lg px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-3.5 transition-colors duration-200 cursor-pointer ${activeType === "apartment"
            ? "bg-pink-300 text-black border-2 border-black"
            : "text-black border-2 border-transparent hover:bg-zinc-100"
            }`}
        >
          Chung cư
        </motion.button>
      </motion.div>

      {/* Tab Description - hidden on mobile */}
      <div className="hidden sm:block text-sm text-zinc-600">
        {description ? description : (
          activeType === "house"
            ? "Tìm phòng trống trong nhà mặt đất (share phòng trống)"
            : "Tìm phòng trống trong căn hộ chung cư (share phòng trống)"
        )}
      </div>
    </div>
  );
}
