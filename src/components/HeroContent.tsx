import { motion } from 'motion/react';
import { Plus } from 'lucide-react';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const leftSidebarVariants = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.15, delayChildren: 0.6 },
  },
};

const rightSidebarVariants = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.15, delayChildren: 0.9 },
  },
};

// Leaf/plant SVG icon
function LeafIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20C19 20 22 3 22 3c-1 2-8 4-8 4s-5 0-5 8c0 0 2-5 10-7z" />
    </svg>
  );
}

export default function HeroContent() {
  return (
    <>
      {/* LEFT SIDEBAR */}
      <motion.div
        variants={leftSidebarVariants}
        initial="initial"
        animate="animate"
        className="relative px-6 md:px-16 mt-20 sm:mt-28 md:mt-32 w-full md:w-[320px] z-10"
      >
        {/* Section indicator */}
        <motion.div
          variants={fadeUp}
          className="flex items-center gap-3 mb-6"
        >
          <span className="text-xs font-mono tracking-[0.2em] uppercase text-gray-500">01</span>
          <span className="w-16 h-[1.5px] bg-black/20 block" />
        </motion.div>

        {/* Main headline */}
        <motion.div variants={fadeUp} className="mb-6 overflow-hidden">
          <h2
            className="font-normal tracking-tight leading-[1] text-[#111]"
            style={{ fontSize: 'clamp(3rem, 5vw, 5rem)' }}
          >
            TIMELESS<br />WONDERS
          </h2>
        </motion.div>

        {/* Description */}
        <motion.p
          variants={fadeUp}
          className="text-gray-700 w-[240px] leading-[1.6] mb-8"
          style={{ fontSize: '13px' }}
        >
          Step into the natural world and<br />
          discover the stories written<br />
          millions of years ago.
        </motion.p>

        {/* CTA Button */}
        <motion.div variants={fadeUp}>
          <button
            id="explore-now-btn"
            className="group relative flex items-center gap-3 bg-[#1a1a1a] px-6 py-3.5 border border-[#1a1a1a] rounded-md shadow-sm overflow-hidden
              hover:-translate-y-px hover:shadow-[3px_3px_0px_rgba(17,17,17,0.5)]
              active:translate-y-0 active:shadow-sm
              transition-all duration-300"
          >
            {/* Sliding background panel */}
            <span
              className="absolute inset-0 bg-[#fcfcfc] -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-700"
              style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }}
            />

            {/* Leaf icon */}
            <span className="relative z-10 transition-all duration-300 group-hover:scale-110 group-hover:-rotate-12 group-hover:-translate-y-px">
              <LeafIcon className="w-4 h-4 text-white group-hover:text-[#111] transition-colors duration-300" />
            </span>

            {/* Text */}
            <span
              className="relative z-10 font-medium text-white group-hover:text-[#111] transition-colors duration-300"
              style={{ fontSize: '15px' }}
            >
              Explore Now
            </span>
          </button>
        </motion.div>
      </motion.div>

      {/* RIGHT SIDEBAR — desktop only */}
      <motion.div
        variants={rightSidebarVariants}
        initial="initial"
        animate="animate"
        className="hidden md:flex flex-col w-[200px] mt-12 md:mt-20 absolute right-16 top-0 z-10"
        style={{ marginTop: 'calc(4rem + 100px + 2rem + 5rem)' }}
      >
        {/* Specimen info */}
        <motion.div variants={fadeUp} className="mb-6">
          <p className="text-[10px] font-bold font-mono tracking-widest uppercase text-[#111] mb-2">
            Tyrannosaurus Rex
          </p>
          <p className="text-[12px] text-gray-600 leading-[1.6] font-mono">
            Late Cretaceous period<br />68–66 million years ago
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div variants={fadeUp} className="flex flex-col gap-3 mb-8">
          <div>
            <p className="text-[10px] font-mono tracking-widest uppercase text-gray-500 mb-0.5">Length</p>
            <p className="text-[13px] font-medium text-[#111]">12.3 m</p>
          </div>
          <div>
            <p className="text-[10px] font-mono tracking-widest uppercase text-gray-500 mb-0.5">Height</p>
            <p className="text-[13px] font-medium text-[#111]">4.0 m</p>
          </div>
        </motion.div>

        {/* View Details */}
        <motion.div variants={fadeUp}>
          <button
            id="view-details-btn"
            className="group flex items-center gap-3"
          >
            <span className="w-10 h-10 rounded-full border border-gray-400 flex items-center justify-center
              group-hover:border-black group-hover:bg-[#111] transition-all duration-300">
              <Plus
                size={16}
                strokeWidth={1.5}
                className="text-gray-600 group-hover:text-white transition-colors duration-300"
              />
            </span>
            <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-[#111]">
              View Details
            </span>
          </button>
        </motion.div>
      </motion.div>

      {/* BOTTOM — Scroll to explore (desktop only) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8, ease: 'easeOut' }}
        className="hidden md:flex items-center gap-4 absolute bottom-10 left-16 z-10"
      >
        {/* Pause icon circle */}
        <div className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center gap-[4px]">
          <span className="w-[1px] h-[12px] bg-gray-600 block" />
          <span className="w-[1px] h-[12px] bg-gray-600 block" />
        </div>
        <p className="text-[10px] font-mono tracking-widest uppercase text-gray-500 font-semibold">
          Scroll to explore
        </p>
      </motion.div>
    </>
  );
}
