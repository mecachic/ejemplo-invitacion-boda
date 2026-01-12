import { useState } from "react";
import { motion } from "framer-motion";

import petalsImage from "@/assets/petals-bg.jpg";
import petalsVideo from "@/assets/petals-hero.mp4";

const HeroSection = () => {
  const [videoError, setVideoError] = useState(false);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        {!videoError ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={petalsImage}
            className="w-full h-full object-cover"
            onError={() => setVideoError(true)}
          >
            <source src={petalsVideo} type="video/mp4" />
          </video>
        ) : (
          <img
            src={petalsImage}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Overlay */}
      <div className="video-overlay" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <p className="text-label text-ivory/70 mb-4">We&apos;re Getting Married</p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="heading-script text-5xl md:text-7xl lg:text-8xl text-ivory mb-6"
        >
          Isabella &amp; Marco
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="divider-ornate text-gold mb-6"
        >
          <span className="text-2xl">✦</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="heading-display text-xl md:text-2xl text-ivory/90"
        >
          September 14, 2025
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="text-body text-ivory/70 mt-2"
        >
          Tuscany, Italy
        </motion.p>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center"
      >
        <p className="text-label text-ivory/60 mb-3">Scroll to Continue</p>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg
            className="w-6 h-6 text-ivory/40 mx-auto"
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
