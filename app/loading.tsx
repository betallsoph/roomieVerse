import { Home } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <Home className="h-16 w-16 text-black mx-auto mb-6 animate-pulse" strokeWidth={1.5} />

        <h2 className="text-xl font-bold text-black mb-4">
          Chờ bọn mình xí xí nhé ^^
        </h2>

        <div className="flex justify-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-300 animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-3 h-3 rounded-full bg-pink-300 animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-3 h-3 rounded-full bg-blue-300 animate-bounce"></div>
        </div>
      </div>
    </div>
  );
}
