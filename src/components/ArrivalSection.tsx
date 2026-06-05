import { motion } from 'motion/react';
import { useAnalytics } from '../context/AnalyticsContext';

interface ArrivalSectionProps {
  onStartJourney?: () => void;
}

export default function ArrivalSection({ onStartJourney }: ArrivalSectionProps) {
  const { incrementCta } = useAnalytics();

  const handleStart = () => {
    incrementCta('start_journey');
    if (onStartJourney) onStartJourney();
  };

  return (
    <div className="relative flex-1 flex flex-col justify-end px-6 md:px-16 pb-24 z-10 max-w-6xl mx-auto w-full">
      {/* Main Hero Content */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 w-full">
        
        {/* Left Side: Editorial Typography */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          className="max-w-xl"
        >
          <span className="font-mono text-xs tracking-[0.3em] text-[#C4903A] uppercase block mb-4">
            Stage 01 // Perpetual Strata
          </span>
          <h1
            className="font-serif font-light tracking-tight leading-[0.85] uppercase text-[#F5F2EA]"
            style={{ fontSize: 'clamp(3.5rem, 8.5vw, 7.5rem)' }}
          >
            The Age <br />
            <span className="font-serif italic text-[#C4903A]">of Giants</span>
          </h1>
        </motion.div>

        {/* Right Side: Narrative Quote & Minimalist CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
          className="max-w-md flex flex-col items-start gap-8 md:pb-4"
        >
          <p className="text-lg font-serif text-[#D8D1C2] leading-relaxed italic">
            "The history of Earth is not written in words, but in layers of stone, fossils, and the ghosts of forgotten worlds."
          </p>

          <button
            onClick={handleStart}
            className="group relative flex flex-col items-start focus:outline-none cursor-pointer"
            aria-label="Descend into the geological timeline"
          >
            <span className="font-mono text-xs tracking-[0.25em] text-[#F5F2EA] group-hover:text-[#C4903A] uppercase transition-colors duration-300">
              Descend into Deep Time
            </span>
            {/* Elegant thin line reveal */}
            <div className="h-[1px] w-16 bg-[#F5F2EA]/30 group-hover:bg-[#C4903A] group-hover:w-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] mt-2" />
          </button>
        </motion.div>

      </div>
    </div>
  );
}
