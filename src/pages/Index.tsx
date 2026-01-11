import { useState } from 'react';
import IntroOverlay from '@/components/wedding/IntroOverlay';
import HeroSection from '@/components/wedding/HeroSection';
import CountdownSection from '@/components/wedding/CountdownSection';
import DetailsSection from '@/components/wedding/DetailsSection';
import TimelineSection from '@/components/wedding/TimelineSection';
import AccommodationSection from '@/components/wedding/AccommodationSection';
import FAQSection from '@/components/wedding/FAQSection';
import GiftsSection from '@/components/wedding/GiftsSection';
import RSVPSection from '@/components/wedding/RSVPSection';
import Footer from '@/components/wedding/Footer';

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Cinematic Intro Overlay */}
      {showIntro && <IntroOverlay onComplete={handleIntroComplete} />}

      {/* Main Website Content */}
      <main>
        <HeroSection />
        <CountdownSection />
        <DetailsSection />
        <TimelineSection />
        <AccommodationSection />
        <FAQSection />
        <GiftsSection />
        <RSVPSection />
        <Footer />
      </main>
    </div>
  );
};

export default Index;
