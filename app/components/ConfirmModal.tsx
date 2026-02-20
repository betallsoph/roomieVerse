"use client";

import { AlertTriangle } from "lucide-react";

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    isProcessing?: boolean;
}

export default function ConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = "Xác nhận",
    cancelText = "Hủy",
    isProcessing = false,
}: ConfirmModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <div className="relative w-full max-w-md rounded-xl border-4 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                {/* Icon + Title */}
                <div className="mb-2 flex items-center gap-3">
                    <AlertTriangle className="h-7 w-7 flex-shrink-0 text-red-500" />
                    <h2 className="text-2xl font-bold">{title}</h2>
                </div>

                {/* Message */}
                <p className="mb-8 text-sm text-zinc-600">{message}</p>

                {/* Buttons */}
                <div className="flex flex-col gap-3">
                    <button
                        onClick={onConfirm}
                        disabled={isProcessing}
                        className="btn-primary btn-click-sink text-base px-6 py-3 w-full disabled:opacity-50"
                    >
                        {isProcessing ? "Đang xử lý..." : confirmText}
                    </button>
                    <button
                        onClick={onClose}
                        disabled={isProcessing}
                        className="btn-secondary btn-click-sink text-base px-6 py-3 w-full disabled:opacity-50"
                    >
                        {cancelText}
                    </button>
                </div>
            </div>
        </div>
    );
}
