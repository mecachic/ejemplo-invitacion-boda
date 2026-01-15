import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import envelopeVideo from "@/assets/envelope-intro.mp4";

interface IntroOverlayProps {
  onComplete: () => void;
}

const EXIT_DELAY_MS = 800;
// Add a soft flash overlay during the last seconds of the intro video.
const FLASH_LAST_SECONDS = 2;

const IntroOverlay = ({ onComplete }: IntroOverlayProps) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [showFlash, setShowFlash] = useState(false);
  const [flashArmed, setFlashArmed] = useState(true);

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

    if (videoRef.current) {
      try {
        await videoRef.current.play();
      } catch {
        // Si por cualquier motivo el vídeo no puede reproducirse
        finish();
      }
    }
  };

  const handleEnded = () => {
    // Ensure flash is on at the end, then reveal the invitation.
    setShowFlash(true);
    window.setTimeout(() => finish(), 250);
  };

  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (!v || !flashArmed) return;
    if (!Number.isFinite(v.duration) || v.duration <= 0) return;

    const remaining = v.duration - v.currentTime;
    if (remaining <= FLASH_LAST_SECONDS) {
      setFlashArmed(false);
      setShowFlash(true);
    }
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
              // Mantener el vídeo visible durante la reproducción.
              // Si queremos darle elegancia, solo hacemos un zoom suave sin apagarlo.
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

            {/* Flash overlay (last 2 seconds + end) */}
            <AnimatePresence>
              {showFlash && (
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                >
                  <div className="absolute inset-0 bg-white" />
                  <div className="absolute inset-0 bg-gradient-to-r from-gold/20 via-white/70 to-gold/20" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroOverlay;


