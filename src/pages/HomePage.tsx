import { useState, useEffect } from 'react';
import Header from '../components/Header';
import MobileMenu from '../components/MobileMenu';
import HeroVideo from '../components/HeroVideo';
import ArrivalSection from '../components/ArrivalSection';
import TriassicSection from '../components/TriassicSection';
import JurassicSection from '../components/JurassicSection';
import CretaceousSection from '../components/CretaceousSection';
import EcosystemsSection from '../components/EcosystemsSection';
import EvolutionSection from '../components/EvolutionSection';
import AgeOfGiantsSection from '../components/AgeOfGiantsSection';
import ExtinctionSection from '../components/ExtinctionSection';
import LegacySection from '../components/LegacySection';

export default function HomePage() {
  const [showVideo, setShowVideo] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Reveal video after 2800ms
  useEffect(() => {
    const timer = setTimeout(() => setShowVideo(true), 2800);
    return () => clearTimeout(timer);
  }, []);

  const handleStartJourney = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

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
        <ArrivalSection onStartJourney={handleStartJourney} />
      </section>

      {/* ── STAGE 2: TRIASSIC ERA ── */}
      <TriassicSection />

      {/* ── STAGE 3: JURASSIC ERA ── */}
      <JurassicSection />

      {/* ── STAGE 4: CRETACEOUS ERA ── */}
      <CretaceousSection />

      {/* ── STAGE 5: ECOSYSTEMS OF THE MESOZOIC ── */}
      <EcosystemsSection />

      {/* ── STAGE 6: EVOLUTION ── */}
      <EvolutionSection />

      {/* ── STAGE 7: THE AGE OF GIANTS ── */}
      <AgeOfGiantsSection />

      {/* ── STAGE 8: EXTINCTION EVENT ── */}
      <ExtinctionSection />

      {/* ── STAGE 9: LEGACY ── */}
      <LegacySection />
    </div>
  );
}
