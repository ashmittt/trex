import { AnimatePresence, motion } from 'motion/react';

interface HeroVideoProps {
  showVideo: boolean;
}

export default function HeroVideo({ showVideo }: HeroVideoProps) {
  return (
    <AnimatePresence>
      {showVideo && (
        <motion.div
          key="hero-video"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            src="https://res.cloudinary.com/dsdxaxkiz/video/upload/v1779624998/magnific_use-img-2-as-the-exact-ba_Piu3X0W42C_wnrc8f.mp4"
          />
          {/* Subtle overlay to keep text readable */}
          <div className="absolute inset-0 bg-[#fcfcfc]/30" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
