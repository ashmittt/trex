import { useState, useEffect } from 'react';
import Header from '../components/Header';
import MobileMenu from '../components/MobileMenu';
import HeroVideo from '../components/HeroVideo';
import ArrivalSection from '../components/ArrivalSection';
import StorySection from '../components/StorySection';
import PaleontologyArchive from '../components/PaleontologyArchive';
import GeologicalTimeline from '../components/GeologicalTimeline';
import CretaceousSection from '../components/CretaceousSection';
import Footer from '../components/Footer';

// Silent behavioral tracking hook
import useBehavioralAnalytics from '../hooks/useBehavioralAnalytics';

export default function HomePage() {
  const [showVideo, setShowVideo] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 1. Silent telemetry tracking hook call
  useBehavioralAnalytics();

  useEffect(() => {
    const timer = setTimeout(() => setShowVideo(true), 2800);
    return () => clearTimeout(timer);
  }, []);

  const handleStartJourney = () => {
    const el = document.getElementById('story');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative bg-[#050505] text-[#F5F2EA] min-h-screen font-sans selection:bg-[#C4903A]/20 selection:text-[#F5F2EA]">
      
      {/* ── STAGE 01: ARRIVAL (HERO) ── */}
      <section
        id="hero"
        className="relative w-full min-h-screen flex flex-col overflow-hidden"
      >
        <HeroVideo showVideo={showVideo} />
        <Header
          isMobileMenuOpen={isMobileMenuOpen}
          onMenuToggle={() => setIsMobileMenuOpen((v) => !v)}
        />
        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />
        <ArrivalSection onStartJourney={handleStartJourney} />
      </section>

      {/* ── STAGE 02: EDITORIAL NARRATIVE (WHY T-REX MATTERS) ── */}
      <StorySection />

      {/* ── STAGE 03: COLLECTION (MUSEUM SPECIMENS) ── */}
      <PaleontologyArchive />

      {/* ── STAGE 04: TIMELINE (GEOLOGICAL SCALE SPINE) ── */}
      <GeologicalTimeline />

      {/* ── STAGE 05: IMMERSIVE DISCOVERY (K-PG BOUNDARY CATACLYSM) ── */}
      <CretaceousSection />

      {/* ── STAGE 06: RESTRAINED MUSEUM FOOTER ── */}
      <Footer />

    </div>
  );
}
