"use client";

import { ShieldCheck } from "lucide-react";

interface BypassModerationToggleProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}

export default function BypassModerationToggle({ enabled, onChange }: BypassModerationToggleProps) {
  return (
    <label className="flex items-center gap-2 px-3 py-2 rounded-lg border-2 border-dashed border-amber-400 bg-amber-50 cursor-pointer select-none text-sm">
      <input
        type="checkbox"
        checked={enabled}
        onChange={(e) => onChange(e.target.checked)}
        className="accent-amber-500 w-4 h-4"
      />
      <ShieldCheck className="w-4 h-4 text-amber-600 flex-shrink-0" />
      <span className="font-medium text-amber-800">Bypass kiểm duyệt</span>
    </label>
  );
}
