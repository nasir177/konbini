import { useEffect, useState } from "react";
import { X } from "lucide-react"; // Close icon

export default function TopBanner() {
  const [visible, setVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState(10 * 60 * 60 + 9 * 60 + 21); // 9:09:21

  useEffect(() => {
    if (!visible) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [visible]);

  const formatTime = (seconds) => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  if (!visible) return null;

  return (
    <div className="sticky top-0 z-[50] bg-green-500 text-white px-4 py-2 text-sm font-medium">
      <div className="max-w-7xl mx-auto flex justify-center items-center relative">
        <span className="text-center flex items-center gap-4">
          🎉 Get $20 off across your first 2 orders
          <span className="bg-orange-700 px-2 py-1 rounded text-xs font-semibold tracking-wider">
            {formatTime(timeLeft)}
          </span>
        </span>
        <button
          onClick={() => setVisible(false)}
          className="absolute right-2 top-1/2 -translate-y-1/2 hover:text-gray-200"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
