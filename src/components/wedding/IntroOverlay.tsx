import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import envelopeVideo from "@/assets/envelope-intro.mp4";

interface IntroOverlayProps {
  onComplete: () => void;
}

const EXIT_DELAY_MS = 800;

// Flash starts in the last 0.5s and ramps up smoothly
const FLASH_LAST_SECONDS = 0.5;

const clamp01 = (x: number) => Math.max(0, Math.min(1, x));

const IntroOverlay = ({ onComplete }: IntroOverlayProps) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  // Controls flash strength and expansion during the last FLASH_LAST_SECONDS
  const [flashOpacity, setFlashOpacity] = useState(0);
  const [flashScale, setFlashScale] = useState(0.2);

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    document.body.classList.add("scroll-locked");
    return () => {
      document.body.classList.remove("scroll-locked");
    };
  }, []);

  const finish = () => {
    setIsExiting(true);
    setTimeout(() => {
      document.body.classList.remove("scroll-locked");
      onComplete();
    }, EXIT_DELAY_MS);
  };

  const handleClick = async () => {
    if (isClicked) return;
    setIsClicked(true);

    const v = videoRef.current;
    if (v) {
      try {
        await v.play();
      } catch {
        finish();
      }
    }
  };

  const handleEnded = () => {
    // ensure it fully covers at the very end
    setFlashOpacity(1);
    setFlashScale(2.2);
    window.setTimeout(() => finish(), 80);
  };

  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (!v) return;
    if (!Number.isFinite(v.duration) || v.duration <= 0) return;

    const remaining = v.duration - v.currentTime;

    const progress = clamp01((FLASH_LAST_SECONDS - remaining) / FLASH_LAST_SECONDS);

    // Smooth ramp: gentle start, full cover at end (not explosive)
    const eased = progress * progress;

    // Scale from small center glow to large full-screen expansion
    // 0.2 -> 2.2 makes it cover the entire viewport by the end
    const scale = 0.2 + eased * 2.0;

    setFlashOpacity(eased);
    setFlashScale(scale);
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-50 cursor-pointer"
          onClick={handleClick}
          role="button"
          aria-label="Open invitation"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-charcoal" />

          {/* Envelope Video */}
          <div className="relative w-full h-full flex items-center justify-center">
            <motion.div
              className="relative w-full h-full"
              animate={isClicked ? { scale: 1.03, opacity: 1 } : { scale: 1, opacity: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            >
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                playsInline
                preload="auto"
                muted
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleEnded}
              >
                <source src={envelopeVideo} type="video/mp4" />
              </video>

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-charcoal/30" />
            </motion.div>

            {/* Tap to open */}
            <motion.div
              className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isClicked ? 0 : 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <p className="text-label text-ivory/80 mb-2">Tap to Open</p>

              <motion.div
                className="w-8 h-8 mx-auto border border-ivory/40 rounded-full flex items-center justify-center"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <svg
                  className="w-4 h-4 text-ivory/60"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 4v16m0 0l-4-4m4 4l4-4"
                  />
                </svg>
              </motion.div>
            </motion.div>

            {/* Radial progressive flash (center -> expands) */}
            <div className="absolute inset-0 pointer-events-none">
              <motion.div
                className="absolute left-1/2 top-1/2"
                style={{
                  // anchor in center
                  x: "-50%",
                  y: "-50%",
                  width: "120vmax",
                  height: "120vmax",
                  borderRadius: "9999px",
                  background:
                    "radial-gradient(circle at center, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.55) 22%, rgba(255,255,255,0.18) 45%, rgba(255,255,255,0.0) 70%)",
                  filter: "blur(2px)",
                }}
                animate={{
                  opacity: flashOpacity,
                  scale: flashScale,
                }}
                transition={{ duration: 0.06, ease: "linear" }}
              />
              {/* optional warm tint layer (subtle) */}
              <motion.div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(circle at center, rgba(208,168,88,0.25) 0%, rgba(208,168,88,0.10) 35%, rgba(208,168,88,0.0) 70%)",
                  mixBlendMode: "screen",
                }}
                animate={{ opacity: flashOpacity * 0.6 }}
                transition={{ duration: 0.06, ease: "linear" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroOverlay;


