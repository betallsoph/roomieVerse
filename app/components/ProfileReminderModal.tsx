'use client';

import { useRouter } from "next/navigation";
import Image from "next/image";
import { UserCircle } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

interface ProfileReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfileReminderModal({ isOpen, onClose }: ProfileReminderModalProps) {
  const router = useRouter();
  const { user } = useAuth();

  const handleCompleteNow = () => {
    setTimeout(() => {
      onClose();
      router.push("/profile?complete=true");
    }, 150);
  };

  const handleLater = () => {
    onClose();
    // Save to localStorage that user chose to complete later
    localStorage.setItem('profileReminderDismissed', Date.now().toString());
  };

  if (!isOpen) return null;

  const photoURL = user?.photoURL;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="relative w-full max-w-md rounded-xl border-[8px] border-black bg-white p-8">
        <div className="mb-6 text-center">
          {photoURL ? (
            <Image
              src={photoURL}
              alt="Avatar"
              width={64}
              height={64}
              className="mx-auto mb-4 h-16 w-16 rounded-full border-2 border-black object-cover"
            />
          ) : (
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-200 border-2 border-black">
              <UserCircle className="h-8 w-8" />
            </div>
          )}
          <h2 className="text-2xl font-bold mb-2">Hồ sơ chưa hoàn thiện</h2>
          <p className="text-sm text-zinc-600">
            Hoàn thiện hồ sơ để người khác biết bạn phù hợp với họ và tăng cơ hội tìm được roommate hoặc phòng lý tưởng.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={handleCompleteNow}
            className="btn-primary btn-click-sink text-base px-6 py-3 w-full"
          >
            Hoàn thiện hồ sơ ngay
          </button>
          <button
            onClick={handleLater}
            className="btn-secondary btn-click-sink text-base px-6 py-3 w-full"
          >
            Để sau
          </button>
        </div>
      </div>
    </div>
  );
}
