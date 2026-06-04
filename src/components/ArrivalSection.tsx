import { motion } from 'motion/react';

interface ArrivalSectionProps {
  onStartJourney?: () => void;
}

export default function ArrivalSection({ onStartJourney }: ArrivalSectionProps) {
  return (
    <div className="relative w-full min-h-screen flex flex-col justify-between items-center text-center p-6 md:p-16 overflow-hidden">
      {/* Subtle grid mesh overlay for scientific/archival atmosphere */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#F5F2EA_1px,transparent_1px),linear-gradient(to_bottom,#F5F2EA_1px,transparent_1px)] bg-[size:5rem_5rem] opacity-[0.03] pointer-events-none" />

      {/* Top spacer */}
      <div className="h-20" />

      {/* Center content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl flex flex-col items-center gap-6 relative z-10"
      >
        <span className="text-[13px] font-mono tracking-[0.4em] text-[#A07C4F] uppercase">
          STAGE 01 // DEEP TIME INITIATION
        </span>

        <h1
          className="font-serif font-normal tracking-tight text-[#F5F2EA] leading-[1.0] select-none"
          style={{ fontSize: 'clamp(3.5rem, 8vw, 8.5rem)' }}
        >
          A Vanished <br />
          <span className="font-cursive text-yellow-400 lowercase tracking-normal text-5xl md:text-8xl mt-3 block">Planet</span>
        </h1>

        <p className="text-[20px] md:text-[24px] font-serif text-[#D8D1C2] italic max-w-2xl leading-relaxed mt-4">
          "The history of Earth is not written in words, but in layers of stone, fossils, and the ghosts of forgotten worlds."
        </p>

        <p className="text-[15px] font-mono tracking-widest text-[#A9A295] uppercase max-w-md leading-relaxed mt-2">
          An immersive chronological journey through 186 million years of the Mesozoic Era.
        </p>

        <button
          onClick={onStartJourney}
          className="group mt-8 border border-[#F5F2EA]/20 px-8 py-4 bg-transparent text-[#F5F2EA] hover:border-yellow-400 hover:text-yellow-400 transition-all duration-300 cursor-pointer font-mono tracking-widest text-xs uppercase"
        >
          Enter the Hallways of Time
        </button>
      </motion.div>

      {/* Bottom Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="flex flex-col items-center gap-2 mt-8 relative z-10"
      >
        <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#A9A295]">
          Scroll to Travel
        </span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-[#A9A295] to-transparent animate-pulse" />
      </motion.div>
    </div>
  );
}
