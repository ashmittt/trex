import { AnimatePresence, motion } from 'motion/react';

interface HeroVideoProps {
  showVideo: boolean;
}

export default function HeroVideo({ showVideo }: HeroVideoProps) {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-[#050505]">
      {/* High-fidelity background image placeholder - loaded immediately */}
      <img
        src="/images/trex-hero.png"
        alt="Prehistoric landscape placeholder"
        className="absolute inset-0 w-full h-full object-cover opacity-30 filter contrast-125"
      />
      {/* Soft depth gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#050505_90%)] z-5" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent z-5" />

      {/* Film grain/noise overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('data:image/svg+xml;utf8,<svg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22><filter id=%22noise%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/></svg>')] z-10" />

      <AnimatePresence>
        {showVideo && (
          <motion.div
            key="hero-video"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full z-1"
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
              src="https://res.cloudinary.com/dsdxaxkiz/video/upload/v1779624998/magnific_use-img-2-as-the-exact-ba_Piu3X0W42C_wnrc8f.mp4"
            />
            {/* Dark overlay for video legibility */}
            <div className="absolute inset-0 bg-[#050505]/75" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
