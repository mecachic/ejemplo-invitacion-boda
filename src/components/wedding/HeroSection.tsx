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

      {/* Overlay (darker for readability, still elegant) */}
      <div className="absolute inset-0 bg-charcoal/55 backdrop-brightness-75" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
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

        {/* Date (primary) */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="heading-display text-3xl md:text-4xl lg:text-5xl text-ivory mb-5 tracking-[0.14em] uppercase font-medium"
        >
          June 27, 2026
        </motion.p>

        {/* Names (secondary, premium, slightly thicker for readability) */}
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.55 }}
          className="heading-display text-4xl md:text-6xl lg:text-7xl text-ivory leading-[1.05] font-medium"
        >
          <span className="inline-block">Sara</span>
          <span
            className="inline-block mx-4 md:mx-6 text-gold/85 font-medium tracking-[0.08em]"
            aria-hidden="true"
          >
            &amp;
          </span>
          <span className="inline-block">Giovanni</span>
        </motion.h1>

        {/* Subtle ornament */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.75 }}
          className="text-gold/75 mt-5 mb-5"
        >
          <span className="text-lg md:text-xl">✦</span>
        </motion.div>

        {/* Location */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9 }}
          className="text-body text-ivory/75 tracking-[0.08em] uppercase"
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
        <p className="text-label text-ivory/55 mb-3 tracking-[0.18em] uppercase">
          Scroll to Continue
        </p>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg
            className="w-6 h-6 text-ivory/35 mx-auto"
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

