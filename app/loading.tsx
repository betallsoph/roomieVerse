import { Home } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        {/* Animated Logo/Spinner */}
        <div className="mb-8">
          <div className="inline-block rounded-xl border-2 border-black bg-blue-50 p-6 shadow-[var(--shadow-secondary)] animate-pulse">
            <Home className="h-16 w-16 text-black" strokeWidth={1.5} />
          </div>
        </div>

        {/* Loading Text */}
        <h2 className="text-xl font-bold text-black mb-4">
          Đang tải...
        </h2>

        {/* Loading Dots Animation */}
        <div className="flex justify-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-300 border-2 border-black animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-3 h-3 rounded-full bg-pink-300 border-2 border-black animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-3 h-3 rounded-full bg-blue-300 border-2 border-black animate-bounce"></div>
        </div>
      </div>
    </div>
  );
}
