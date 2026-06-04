import { useState, useEffect } from 'react';
import Header from '../components/Header';
import MobileMenu from '../components/MobileMenu';
import HeroVideo from '../components/HeroVideo';
import HeroContent from '../components/HeroContent';
import EnterTheHall from '../components/EnterTheHall';
import TheropodHall from '../components/TheropodHall';
import DiscoveryStory from '../components/DiscoveryStory';
import ScientificContext from '../components/ScientificContext';
import SupportingSpecies from '../components/SupportingSpecies';
import TimelineExtinction from '../components/TimelineExtinction';
import MuseumArchive from '../components/MuseumArchive';

export default function HomePage() {
  const [showVideo, setShowVideo] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Reveal video after 2800ms
  useEffect(() => {
    const timer = setTimeout(() => setShowVideo(true), 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative bg-[#050505] text-[#F5F2EA] min-h-screen">
      {/* ── STAGE 1: ARRIVAL (HERO) ── */}
      <section
        id="hero"
        className="relative w-full min-h-screen flex flex-col overflow-hidden"
      >
        {/* Background video layer */}
        <HeroVideo showVideo={showVideo} />

        {/* Header + logo */}
        <Header
          isMobileMenuOpen={isMobileMenuOpen}
          onMenuToggle={() => setIsMobileMenuOpen((v) => !v)}
        />

        {/* Mobile menu overlay */}
        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />

        {/* Hero text content */}
        <HeroContent />
      </section>

      {/* ── STAGE 2: ENTER THE HALL ── */}
      <EnterTheHall />

      {/* ── STAGE 3: ENCOUNTER THE SPECIMEN ── */}
      <TheropodHall />

      {/* ── STAGE 4: DISCOVERY STORY ── */}
      <DiscoveryStory />

      {/* ── STAGE 5: SCIENTIFIC CONTEXT ── */}
      <ScientificContext />

      {/* ── STAGE 6: SUPPORTING SPECIES ── */}
      <SupportingSpecies />

      {/* ── STAGE 7: TIMELINE & EXTINCTION ── */}
      <TimelineExtinction />

      {/* ── STAGE 8: MUSEUM ARCHIVE ── */}
      <MuseumArchive />
    </div>
  );
}
