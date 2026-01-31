import { useRef } from "react";
import { motion } from "framer-motion";

import petalsVideo from "@/assets/petals-hero.mp4";
import { useI18n } from "@/i18n/I18nContext";

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { t } = useI18n();

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
        >
          <source src={petalsVideo} type="video/mp4" />
        </video>
      </div>

      {/* Overlay (editorial gradient for readability) */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/75 via-charcoal/35 to-charcoal/20" />

      {/* Content (starts from the top; floats over the video) */}
      <div className="relative z-10 h-full flex flex-col items-center justify-start text-center px-6 pt-[10vh] md:pt-[12vh]">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          <p className="text-label text-gold mb-3 tracking-[0.26em] uppercase">
            {t("hero.label")}
          </p>
        </motion.div>

        {/* Names (primary) */}
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.55 }}
          className="font-display italic text-[46px] md:text-[62px] lg:text-[74px] text-ivory leading-[1.04] font-medium"
        >
          <span className="inline-block">Giovanni</span>
          <span className="inline-block mx-3 md:mx-4" aria-hidden="true">
            &amp;
          </span>
          <span className="inline-block">Sara</span>
        </motion.h1>

        {/* Date block (editorial proportions) */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="mt-10 flex flex-col items-center gap-7"
        >
          {/* Month with fine lines */}
          <div className="flex items-center justify-center gap-5 font-body text-gold text-[14px] md:text-[16px] tracking-[0.34em] uppercase">
            <span className="gold-fade-line w-16 md:w-24" aria-hidden="true" />
            <span>{t("hero.month")}</span>
            <span className="gold-fade-line w-16 md:w-24" aria-hidden="true" />
          </div>

          {/* Day */}
          <div className="font-display italic text-[46px] md:text-[62px] lg:text-[74px] text-ivory leading-[1.04] font-medium">
            <span className="inline-block">27</span>
          </div>

          {/* Year with fine lines */}
          <div className="flex items-center justify-center gap-5 font-body font-medium text-gold text-[15px] md:text-[17px] tracking-[0.26em] tabular-nums uppercase">
            <span className="gold-fade-line w-16 md:w-24" aria-hidden="true" />
            <span>2026</span>
            <span className="gold-fade-line w-16 md:w-24" aria-hidden="true" />
          </div>
        </motion.div>

        {/* Spacer to push the location down (keeps hierarchy clean) */}
        <div className="flex-1" aria-hidden="true" />

        {/* Location */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9 }}
          className="font-body text-gold tracking-[0.26em] uppercase mb-[12vh] text-[11px] md:text-[12px]"
        >
          {t("hero.location")}
        </motion.p>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center"
      >
        <p className="text-[10px] md:text-xs font-medium uppercase tracking-[0.26em] text-ivory/50 mb-3">
          {t("hero.scroll")}
        </p>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg
            className="w-6 h-6 text-ivory/30 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;

