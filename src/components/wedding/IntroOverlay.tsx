import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import envelopeVideo from "@/assets/envelope-intro.mp4";
import FlashTransition from "@/components/wedding/FlashTransition";
import { useI18n } from "@/i18n/I18nContext";

interface IntroOverlayProps {
  onComplete: () => void;
}

const EXIT_DELAY_MS = 800;

// Trigger flash in the last 0.5s of the video
const FLASH_LAST_SECONDS = 0.5;

// Flash duration (ms) - you can fine tune later (480–720 works well)
// Flash duration (ms)
// Usamos una duración ligeramente más larga para que el flash pueda:
// 1) hacer un destello bonito
// 2) cubrir toda la pantalla
// 3) revelar la portada con un fade-out suave
const FLASH_DURATION_MS = 900;

const IntroOverlay = ({ onComplete }: IntroOverlayProps) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  // Flash state
  const [flashActive, setFlashActive] = useState(false);
  const [flashArmed, setFlashArmed] = useState(true);

  const videoRef = useRef<HTMLVideoElement>(null);
  const { t } = useI18n();

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
        // If the video can't play, proceed anyway
        finish();
      }
    }
  };

  const triggerFlash = () => {
    if (!flashArmed) return;
    setFlashArmed(false);
    setFlashActive(true);
  };

  const handleEnded = () => {
    // If for any reason timeUpdate didn't trigger, ensure flash at end.
    triggerFlash();
  };

  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (!v || !flashArmed) return;
    if (!Number.isFinite(v.duration) || v.duration <= 0) return;

    const remaining = v.duration - v.currentTime;
    if (remaining <= FLASH_LAST_SECONDS) {
      triggerFlash();
    }
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed left-1/2 -translate-x-1/2 w-full flex justify-center inset-0 z-50 cursor-pointer"
          onClick={handleClick}
          role="button"
          aria-label={t('intro.aria.open')}
        >
          {/* Background */}
          <div className="absolute inset-0 bg-charcoal" />

          {/* Envelope Video */}
          <div className="relative w-full h-full flex items-center justify-center">
            <motion.div
              className="relative w-full h-full"
              // Keep video visible during playback. When flash starts, fade video slightly.
              animate={
                isClicked
                  ? { scale: 1.03, opacity: flashActive ? 0.35 : 1 }
                  : { scale: 1, opacity: 1 }
              }
              transition={{ duration: 0.8, ease: "easeInOut" }}
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
              <p className="text-label text-ivory/80 mb-2">{t('intro.tap')}</p>

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

            {/* Flash overlay (radial expanding) */}
            <FlashTransition
              active={flashActive}
              durationMs={FLASH_DURATION_MS}
              origin="50% 50%"
              onDone={finish}
              blockPointerEvents
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroOverlay;


