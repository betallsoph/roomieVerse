"use client";

import { useState } from "react";
import { X, Flag, AlertTriangle, Megaphone, ShieldAlert, Ban, Copy, XCircle, MessageSquare, CheckCircle } from "lucide-react";
import { createReport } from "../data/reports";
import { useAuth } from "../contexts/AuthContext";

interface ReportModalProps {
  listingId: number | string;
  listingTitle: string;
  onClose: () => void;
  onSubmit?: (data: ReportData) => void;
}

export interface ReportData {
  listingId: number | string;
  reason: string;
  details: string;
  reporterEmail?: string;
}

const REPORT_REASONS = [
  {
    id: "spam",
    label: "Spam hoặc quảng cáo",
    icon: Megaphone,
    description: "Nội dung lặp lại, quảng cáo không liên quan",
  },
  {
    id: "scam",
    label: "Lừa đảo",
    icon: ShieldAlert,
    description: "Thông tin gian dối, yêu cầu chuyển tiền trước",
  },
  {
    id: "inappropriate",
    label: "Nội dung không phù hợp",
    icon: Ban,
    description: "Nội dung vi phạm, không phù hợp với cộng đồng",
  },
  {
    id: "duplicate",
    label: "Tin trùng lặp",
    icon: Copy,
    description: "Bài đăng này đã được đăng nhiều lần",
  },
  {
    id: "wrong-info",
    label: "Thông tin sai lệch",
    icon: XCircle,
    description: "Giá, địa chỉ hoặc thông tin khác không đúng",
  },
  {
    id: "other",
    label: "Khác",
    icon: MessageSquare,
    description: "Lý do khác",
  },
];

export default function ReportModal({
  listingId,
  listingTitle,
  onClose,
  onSubmit,
}: ReportModalProps) {
  const { user } = useAuth();
  const [selectedReason, setSelectedReason] = useState<string>("");
  const [details, setDetails] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedReason) {
      alert("Vui lòng chọn lý do báo cáo");
      return;
    }

    setIsSubmitting(true);

    try {
      await createReport({
        listingId: String(listingId),
        reportedBy: user?.uid || "anonymous",
        reason: selectedReason,
        details: details || undefined,
      });

      if (onSubmit) {
        onSubmit({ listingId, reason: selectedReason, details, reporterEmail: email || undefined });
      }

      setIsSuccess(true);
      setTimeout(() => onClose(), 2000);
    } catch (error) {
      console.error("Report error:", error);
      alert("Gửi báo cáo thất bại. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl border-2 border-black bg-white shadow-[var(--shadow-primary)]">
        {/* Header */}
        <div className="sticky top-0 z-10 border-b-2 border-black bg-red-50 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Flag className="h-6 w-6 text-red-600" />
              <h2 className="text-xl font-bold">Báo cáo bài đăng</h2>
            </div>
            <button
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-lg border-2 border-black bg-white p-2 hover:bg-gray-100 transition-colors disabled:opacity-50"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Success State */}
        {isSuccess ? (
          <div className="p-12 text-center">
            <div className="mb-4 flex justify-center">
              <CheckCircle className="h-16 w-16 text-green-600" strokeWidth={2} />
            </div>
            <h3 className="mb-2 text-2xl font-bold">Đã gửi báo cáo!</h3>
            <p className="text-zinc-600">
              Cảm ơn bạn đã giúp cộng đồng roomieVerse an toàn hơn.
              <br />
              Chúng tôi sẽ xem xét và xử lý trong thời gian sớm nhất.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Listing Info */}
            <div className="rounded-lg border-2 border-black bg-yellow-50 p-4">
              <p className="text-sm font-medium text-zinc-600 mb-1">
                Bạn đang báo cáo bài đăng:
              </p>
              <p className="font-bold text-sm line-clamp-2">{listingTitle}</p>
            </div>

            {/* Reason Selection */}
            <div>
              <label className="mb-3 block text-sm font-bold">
                Lý do báo cáo <span className="text-red-500">*</span>
              </label>
              <div className="grid gap-3 sm:grid-cols-2">
                {REPORT_REASONS.map((reason) => {
                  const IconComponent = reason.icon;
                  return (
                    <button
                      key={reason.id}
                      type="button"
                      onClick={() => setSelectedReason(reason.id)}
                      className={`rounded-xl border-2 border-black p-4 text-left transition-all ${
                        selectedReason === reason.id
                          ? "bg-red-100 shadow-[var(--shadow-secondary)]"
                          : "bg-white hover:bg-gray-50"
                      }`}
                    >
                      <div className="mb-2 flex items-center gap-2">
                        <IconComponent className="h-5 w-5 text-zinc-700" strokeWidth={2} />
                        <span className="font-bold text-sm">{reason.label}</span>
                      </div>
                      <p className="text-xs text-zinc-600">{reason.description}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Details */}
            <div>
              <label className="mb-2 block text-sm font-bold">
                Chi tiết (không bắt buộc)
              </label>
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                rows={4}
                placeholder="Mô tả chi tiết về vấn đề bạn gặp phải..."
                className="w-full rounded-xl border-2 border-black px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-300 resize-none"
              />
            </div>

            {/* Email (Optional) */}
            <div>
              <label className="mb-2 block text-sm font-bold">
                Email của bạn (không bắt buộc)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                className="w-full rounded-xl border-2 border-black px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-300"
              />
              <p className="mt-1 text-xs text-zinc-500">
                Chúng tôi có thể liên hệ bạn nếu cần thêm thông tin
              </p>
            </div>

            {/* Warning */}
            <div className="rounded-lg border-2 border-black bg-blue-50 p-4">
              <div className="flex gap-3">
                <AlertTriangle className="h-5 w-5 flex-shrink-0 text-blue-600" />
                <div className="text-xs text-zinc-700 space-y-1">
                  <p className="font-bold">Lưu ý:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Báo cáo sai sự thật có thể bị xử lý</li>
                    <li>Mọi báo cáo sẽ được xem xét trong 24-48 giờ</li>
                    <li>Thông tin của bạn sẽ được bảo mật</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="flex-1 rounded-xl border-2 border-black bg-white px-6 py-3 font-bold transition-all hover:bg-gray-50 disabled:opacity-50"
              >
                Hủy
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !selectedReason}
                className="flex-1 rounded-xl border-2 border-black bg-red-500 px-6 py-3 font-bold text-white shadow-[var(--shadow-secondary)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none disabled:opacity-50 disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[var(--shadow-secondary)]"
              >
                {isSubmitting ? "Đang gửi..." : "Gửi báo cáo"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
