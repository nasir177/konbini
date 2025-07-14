import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Splash = () => {
  const audioRef = useRef(null);
  const navigate = useNavigate();
  const [started, setStarted] = useState(false);

  const handleStart = async () => {
    setStarted(true);

    try {
      await audioRef.current?.play();
    } catch (err) {
      console.warn("Audio failed:", err);
    }

    setTimeout(() => {
      navigate("/home");
    }, 2000); // wait until sound & animation end
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Audio file */}
      <audio
        ref={audioRef}
        src="/sounds/welcome.mp3"
        preload="auto"
        style={{ display: "none" }}
      />

      {/* Responsive Background Image */}
      <picture>
        {/* Use mobile image for screens up to 1023px (covers most phones and tablets in portrait) */}
        <source media="(max-width: 1023px)" srcSet="/images/splash-mobile.png" />
        {/* Fallback for desktop/tablet landscape */}
        <img
          src="/images/splash-pc.png"
          alt="splash"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
      </picture>

      {/* Conditional: Only show door animation after start */}
      {started && (
        <>
          {/* Left door */}
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: "-100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute left-0 top-0 w-1/2 h-full bg-white/10 border-r border-white/20 backdrop-blur-sm z-10 flex items-center justify-end"
          >
            <div className="w-3 h-14 bg-white/80 rounded-r-md mr-2 shadow-md" />
          </motion.div>

          {/* Right door */}
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: "100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute right-0 top-0 w-1/2 h-full bg-white/10 border-l border-white/20 backdrop-blur-sm z-10 flex items-center justify-start"
          >
            <div className="w-3 h-14 bg-white/80 rounded-l-md ml-2 shadow-md" />
          </motion.div>
        </>
      )}

      {/* Center content */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center">
        {!started && (
          <button
            onClick={handleStart}
            className="px-8 py-3 text-white font-semibold rounded-xl backdrop-blur-lg bg-white/10 border border-white/30 shadow-md hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105"
          >
            Enter Store
          </button>
        )}
      </div>
    </div>
  );
};

export default Splash;
