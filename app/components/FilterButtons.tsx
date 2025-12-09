"use client";

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
      <div className="flex gap-6 border-b-2 border-black">
        <button
          onClick={() => onModeChange("have-room")}
          className={`pb-3 text-sm font-bold transition-all ${
            mode === "have-room"
              ? "border-b-4 border-blue-500 text-black"
              : "text-zinc-600 hover:text-black"
          }`}
        >
          Đã có phòng
        </button>
        <button
          onClick={() => onModeChange("find-partner")}
          className={`pb-3 text-sm font-bold transition-all ${
            mode === "find-partner"
              ? "border-b-4 border-blue-500 text-black"
              : "text-zinc-600 hover:text-black"
          }`}
        >
          Chưa có phòng
        </button>
      </div>

      {/* Mode Description */}
      <p className="text-sm text-zinc-600">
        {mode === "have-room"
          ? "Bạn có phòng/căn hộ sẵn, tìm người ở cùng"
          : "Bạn chưa có phòng, tìm bạn cùng đi thuê"}
      </p>
    </div>
  );
}
