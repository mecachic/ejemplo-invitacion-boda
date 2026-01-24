import { useRef } from "react";
import { motion } from "framer-motion";

import petalsVideo from "@/assets/petals-hero.mp4";

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

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
          <p className="text-label text-ivory/70 mb-3 tracking-[0.22em] uppercase">
            We&apos;re Getting Married
          </p>
        </motion.div>

        {/* Names (primary) */}
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.55 }}
          className="font-scriptDate text-[44px] md:text-[60px] lg:text-[72px] text-ivory leading-[1.05] font-medium"
        >
          <span className="inline-block">Giovanni</span>
          <span
            className="inline-block mx-4 md:mx-6 text-gold/85 font-medium tracking-[0.08em]"
            aria-hidden="true"
          >
            &amp;
          </span>
          <span className="inline-block">Sara</span>
        </motion.h1>

        {/* Date block (editorial proportions) */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="mt-10 flex flex-col items-center"
        >
          {/* Month */}
          <div className="font-display text-ivory/95 text-[18px] md:text-[22px] tracking-[0.28em] uppercase">
            June
          </div>

          {/* Diamond (top) */}
          <div
            className="w-2.5 h-2.5 rotate-45 bg-white opacity-85 mt-5 mb-4"
            aria-hidden="true"
          />

          {/* Day (optical centering correction) */}
          <div className="font-scriptDate text-ivory leading-none tracking-[-0.02em] text-[120px] md:text-[160px] lg:text-[190px] -mt-1 -mb-1">
            27
          </div>

          {/* Diamond (bottom) */}
          <div
            className="w-2.5 h-2.5 rotate-45 bg-white opacity-85 mt-4 mb-5"
            aria-hidden="true"
          />

          {/* Year */}
          <div className="font-display text-ivory/95 text-[22px] md:text-[28px] tracking-[0.22em]">
            2026
          </div>
        </motion.div>

        {/* Location */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9 }}
          className="text-body text-ivory/70 tracking-[0.22em] uppercase mt-10"
        >
          Masseria Falco • Cellole (CE)
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
          Scroll to Continue
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


