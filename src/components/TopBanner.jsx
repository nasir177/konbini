// Import React hooks and icon
import { useEffect, useState } from "react";
import { X } from "lucide-react"; // Close icon

export default function TopBanner() {
    // State to control banner visibility
    const [visible, setVisible] = useState(true);
    // State to track countdown timer (in seconds), initialized to 9:09:21
    const [timeLeft, setTimeLeft] = useState(10 * 60 * 60 + 9 * 60 + 21); // 9:09:21

    // Effect to handle countdown timer
    useEffect(() => {
        // If banner is not visible, do nothing
        if (!visible) return;
        // Set up interval to decrement timer every second
        const interval = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0)); // Decrement if above 0
        }, 1000);
        // Clean up interval on unmount or when visible changes
        return () => clearInterval(interval);
    }, [visible]);

    // Helper function to format seconds as HH:MM:SS
    const formatTime = (seconds) => {
        const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
        const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
        const s = String(seconds % 60).padStart(2, "0");
        return `${h}:${m}:${s}`;
    };

    // If banner is not visible, render nothing
    if (!visible) return null;

    // Render the banner
    return (
        <div className="bg-green-500 text-white flex justify-center items-center px-4 py-2 text-sm font-medium sticky top-0 z-50">
            {/* Banner message and countdown */}
            <span className="text-center flex items-center gap-4">
                🎉 Get $20 off across your first 2 orders
                <span className="bg-orange-700 px-2 py-1 rounded text-xs font-semibold tracking-wider">
                    {formatTime(timeLeft)}
                </span>
            </span>
            {/* Close button */}
            <button
                onClick={() => setVisible(false)}
                className="hover:text-gray-200 absolute right-4"
                style={{ position: "absolute", right: 16 }}
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    );
}
