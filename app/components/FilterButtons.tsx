"use client";

import { motion } from "framer-motion";

type FilterMode = "have-room" | "find-partner";

interface FilterButtonsProps {
  mode: FilterMode;
  onModeChange: (mode: FilterMode) => void;
}

export default function FilterButtons({
  mode,
  onModeChange,
}: FilterButtonsProps) {
  return (
    <div className="space-y-6">
      {/* Mode Tabs */}
      <motion.div
        className="inline-flex rounded-xl border-2 border-black bg-white p-1 sm:p-1.5 text-sm sm:text-base font-bold tracking-wide shadow-[3px_3px_0_0_#000]"
        whileTap={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <motion.button
          type="button"
          onClick={() => onModeChange("have-room")}
          whileTap={{ scale: 0.90 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className={`rounded-lg px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-3.5 transition-colors duration-200 cursor-pointer ${mode === "have-room"
            ? "bg-blue-300 text-black border-2 border-black"
            : "text-black border-2 border-transparent hover:bg-zinc-100"
            }`}
        >
          Đã có phòng sẵn
        </motion.button>
        <motion.button
          type="button"
          onClick={() => onModeChange("find-partner")}
          whileTap={{ scale: 0.90 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className={`rounded-lg px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-3.5 transition-colors duration-200 cursor-pointer ${mode === "find-partner"
            ? "bg-blue-300 text-black border-2 border-black"
            : "text-black border-2 border-transparent hover:bg-zinc-100"
            }`}
        >
          Chưa có phòng
        </motion.button>
      </motion.div>

      {/* Mode Description */}
      <p className="text-sm text-zinc-600">
        {mode === "have-room"
          ? "Người đăng tin có phòng/căn hộ sẵn, tìm người ở cùng và chỉ việc dọn vào"
          : "Chưa ai có phòng sẵn, tìm bạn ghép rồi cùng nhau đi thuê sau"}
      </p>
    </div>
  );
}
