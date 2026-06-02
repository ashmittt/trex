import { useState, useEffect } from 'react';
import Header from '../components/Header';
import MobileMenu from '../components/MobileMenu';
import HeroVideo from '../components/HeroVideo';
import HeroContent from '../components/HeroContent';
import ExploreSection from '../components/ExploreSection';
import CollectionSection from '../components/CollectionSection';

export default function HomePage() {
  const [showVideo, setShowVideo] = useState(false);
  const [activeChapter, setActiveChapter] = useState(2);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Reveal video after 2800ms
  useEffect(() => {
    const timer = setTimeout(() => setShowVideo(true), 2800);
    return () => clearTimeout(timer);
  }, []);

  // Auto-cycle chapters every 3500ms
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveChapter((prev) => (prev + 1) % 5);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      {/* ── SECTION 1: HERO ── */}
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

      {/* ── SECTION 2: EXPLORE OUR WORLD ── */}
      <ExploreSection />

      {/* ── SECTION 3: ANCIENT COLLECTION ── */}
      <CollectionSection
        activeChapter={activeChapter}
        setActiveChapter={setActiveChapter}
      />
    </div>
  );
}
