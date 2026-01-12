import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import envelopeVideo from "@/assets/envelope-intro.mp4";

interface IntroOverlayProps {
  onComplete: () => void;
}

const EXIT_DELAY_MS = 800;

const IntroOverlay = ({ onComplete }: IntroOverlayProps) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

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
              animate={isClicked ? { scale: 1.1, opacity: 0 } : { scale: 1, opacity: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            >
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                playsInline
                preload="auto"
                muted
                onEnded={finish}
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

            {/* Opening overlay */}
            <AnimatePresence>
              {isClicked && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 flex items-center justify-center bg-charcoal"
                >
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                  >
                    <motion.div
                      className="w-20 h-20 mx-auto mb-6 border border-gold/40 rounded-full flex items-center justify-center"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, ease: "linear" }}
                    >
                      <div className="w-3 h-3 bg-gold rounded-full" />
                    </motion.div>

                    <p className="heading-script text-2xl text-ivory/80">
                      Opening your invitation...
                    </p>
                  </motion.div>
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


