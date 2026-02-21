"use client";

import { Home, Users } from "lucide-react";
import { useRouter } from "next/navigation";

interface PostTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PostTypeModal({ isOpen, onClose }: PostTypeModalProps) {
  const router = useRouter();

  if (!isOpen) return null;

  const handleSelectRoommateType = (type: "have-room" | "find-partner") => {
    setTimeout(() => {
      onClose();
      router.push(`/roommate/create?type=${type}`);
    }, 100);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="relative z-10 w-full max-w-2xl mx-3 sm:mx-4 bg-white rounded-xl border-2 border-black shadow-[var(--shadow-primary)] p-5 sm:p-8"
        style={{
          animation: 'modalBounce 0.25s ease-out',
        }}
      >
        <style jsx>{`
          @keyframes modalBounce {
            0% {
              transform: scale(0.95);
              opacity: 0.8;
            }
            50% {
              transform: scale(1.02);
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }
          @keyframes wiggle {
            0%, 100% {
              transform: rotate(0deg);
            }
            25% {
              transform: rotate(-3deg);
            }
            75% {
              transform: rotate(3deg);
            }
          }
        `}</style>
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-zinc-100 transition-colors"
        >
          <span className="text-xl font-bold">×</span>
        </button>

        {/* Header */}
        <div className="text-center mb-5 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold">Tình trạng hiện tại của bạn...</h2>
        </div>

        {/* Options */}
        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
          {/* Option 1: Đã có phòng */}
          <button
            onClick={() => handleSelectRoommateType("have-room")}
            className="group p-4 sm:p-6 rounded-xl border-2 border-black bg-blue-100 transition-all btn-modal-flat"
          >
            <div className="flex sm:flex-col items-center sm:text-center gap-3 sm:gap-4">
              <Home className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600 flex-shrink-0 group-hover:animate-[wiggle_0.4s_ease-in-out]" />
              <div className="text-left sm:text-center">
                <h3 className="text-base sm:text-lg font-bold mb-1 sm:mb-2">Đã có phòng</h3>
                <p className="text-xs sm:text-sm text-zinc-600">
                  Bạn có phòng sẵn, muốn tìm người ở cùng
                </p>
              </div>
            </div>
          </button>

          {/* Option 2: Chưa có phòng */}
          <button
            onClick={() => handleSelectRoommateType("find-partner")}
            className="group p-4 sm:p-6 rounded-xl border-2 border-black bg-blue-100 transition-all btn-modal-flat"
          >
            <div className="flex sm:flex-col items-center sm:text-center gap-3 sm:gap-4">
              <Users className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600 flex-shrink-0 group-hover:animate-[wiggle_0.4s_ease-in-out]" />
              <div className="text-left sm:text-center">
                <h3 className="text-base sm:text-lg font-bold mb-1 sm:mb-2">Chưa có phòng</h3>
                <p className="text-xs sm:text-sm text-zinc-600">
                  Bạn muốn tìm bạn trước, rồi cùng nhau đi thuê phòng
                </p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
