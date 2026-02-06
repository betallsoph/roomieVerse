"use client";

import { useState } from "react";
import { ArrowLeft, Home, Users } from "lucide-react";
import { useRouter } from "next/navigation";

interface PostTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = "main" | "roommate-type";

export default function PostTypeModal({ isOpen, onClose }: PostTypeModalProps) {
  const router = useRouter();
  const [step, setStep] = useState<Step>("main");

  if (!isOpen) return null;

  const handleReset = () => {
    setStep("main");
    onClose();
  };

  const handleSelectRoommate = () => {
    setTimeout(() => setStep("roommate-type"), 150);
  };

  const handleSelectRoomshare = () => {
    setTimeout(() => {
      handleReset();
      router.push("/roomshare");
    }, 100);
  };

  const handleSelectRoommateType = (type: "have-room" | "find-partner") => {
    setTimeout(() => {
      handleReset();
      router.push(`/roommate/create?type=${type}`);
    }, 100);
  };

  const handleBack = () => {
    setStep("main");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleReset}
      />

      {/* Modal */}
      <div
        key={step}
        className="relative z-10 w-full max-w-2xl mx-4 bg-white rounded-xl border-2 border-black shadow-[var(--shadow-primary)] p-8"
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
        `}</style>
        {/* Close button */}
        <button
          onClick={handleReset}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-zinc-100 transition-colors"
        >
          <span className="text-xl font-bold">×</span>
        </button>

        {/* Back button - only show on roommate-type step */}
        {step === "roommate-type" && (
          <button
            onClick={handleBack}
            className="absolute top-4 left-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-zinc-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}

        {/* Main Step */}
        {step === "main" && (
          <>
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold">Bạn muốn đăng bài gì?</h2>
            </div>

            {/* Options */}
            <div className="grid gap-4 md:grid-cols-2">
              {/* Option 1: Đăng bài kiếm người ở cùng */}
              <button
                onClick={handleSelectRoommate}
                className="group p-6 rounded-xl border-2 border-black bg-blue-100 transition-all btn-modal-flat"
              >
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-blue-300 border-2 border-black flex items-center justify-center">
                    <Users className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold">Đăng bài kiếm người ở cùng</h3>
                </div>
              </button>

              {/* Option 2: Đăng bài share phòng */}
              <button
                onClick={handleSelectRoomshare}
                className="group p-6 rounded-xl border-2 border-black bg-pink-100 transition-all btn-modal-flat"
              >
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-pink-300 border-2 border-black flex items-center justify-center">
                    <Home className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold">Đăng bài share phòng</h3>
                </div>
              </button>
            </div>
          </>
        )}

        {/* Roommate Type Step */}
        {step === "roommate-type" && (
          <>
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold">Tình trạng hiện tại của bạn...</h2>
            </div>

            {/* Options */}
            <div className="grid gap-4 md:grid-cols-2">
              {/* Option 1: Đã có phòng */}
              <button
                onClick={() => handleSelectRoommateType("have-room")}
                className="group p-6 rounded-xl border-2 border-black bg-blue-100 transition-all btn-modal-flat"
              >
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-blue-300 border-2 border-black flex items-center justify-center">
                    <Home className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">Bạn đã có phòng</h3>
                    <p className="text-sm text-zinc-600">
                      Bạn có phòng sẵn, muốn tìm người ở cùng
                    </p>
                  </div>
                </div>
              </button>

              {/* Option 2: Chưa có phòng */}
              <button
                onClick={() => handleSelectRoommateType("find-partner")}
                className="group p-6 rounded-xl border-2 border-black bg-blue-100 transition-all btn-modal-flat"
              >
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-blue-300 border-2 border-black flex items-center justify-center">
                    <Users className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">Bạn chưa có phòng</h3>
                    <p className="text-sm text-zinc-600">
                      Bạn muốn tìm bạn trước, rồi cùng nhau đi thuê phòng
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
