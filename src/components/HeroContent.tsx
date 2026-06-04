import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  return (
    <>
      {/* LEFT SIDEBAR */}
      <motion.div
        variants={leftSidebarVariants}
        initial="initial"
        animate="animate"
        className="relative pl-6 pr-6 md:pl-16 md:pr-4 mt-12 md:mt-16 w-full md:w-[650px] z-10"
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
        <motion.div variants={fadeUp} className="mb-4 overflow-hidden">
          <h2
            className="font-normal tracking-tight leading-[1] text-[#F5F2EA]"
            style={{ fontSize: 'clamp(3.8rem, 6vw, 6.8rem)' }}
          >
            TIMELESS<br />WONDERS
          </h2>
        </motion.div>

        {/* Description */}
        <motion.p
          variants={fadeUp}
          className="text-[#D8D1C2] w-[240px] leading-[1.6] mb-6"
          style={{ fontSize: '18px' }}
        >
          Step into the natural world and<br />
          discover the stories written<br />
          millions of years ago.
        </motion.p>

        {/* CTA Button */}
        <motion.div variants={fadeUp}>
          <button
            id="explore-now-btn"
            onClick={() => navigate('/exhibits')}
            aria-label="Explore exhibits"
            className="group relative flex items-center gap-3 bg-[#A07C4F] px-6 py-3.5 border border-[#A07C4F] rounded-md shadow-sm overflow-hidden
              hover:-translate-y-px hover:shadow-[3px_3px_0px_rgba(160,124,79,0.5)]
              active:translate-y-0 active:shadow-sm
              transition-all duration-300
              focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5F2EA]"
          >
            {/* Sliding background panel */}
            <span
              className="absolute inset-0 bg-[#F5F2EA] -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-700"
              style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }}
            />

            {/* Leaf icon */}
            <span className="relative z-10 transition-all duration-300 group-hover:scale-110 group-hover:-rotate-12 group-hover:-translate-y-px">
              <LeafIcon className="w-4 h-4 text-[#050505] transition-colors duration-300" />
            </span>

            {/* Text */}
            <span
              className="relative z-10 font-medium text-[#050505] transition-colors duration-300"
              style={{ fontSize: '18px' }}
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
          <p className="text-[15px] font-bold font-mono tracking-widest uppercase text-[#F5F2EA] mb-2">
            Tyrannosaurus Rex
          </p>
          <p className="text-[15px] text-[#A9A295] leading-[1.6] font-mono">
            Late Cretaceous period<br />68–66 million years ago
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div variants={fadeUp} className="flex flex-col gap-3 mb-8">
          <div>
            <p className="text-[13px] font-mono tracking-widest uppercase text-[#A9A295] mb-0.5">Length</p>
            <p className="text-[17px] font-medium text-[#D8D1C2]">12.3 m</p>
          </div>
          <div>
            <p className="text-[13px] font-mono tracking-widest uppercase text-[#A9A295] mb-0.5">Height</p>
            <p className="text-[17px] font-medium text-[#D8D1C2]">4.0 m</p>
          </div>
        </motion.div>

        {/* View Details */}
        <motion.div variants={fadeUp}>
          <button
            id="view-details-btn"
            onClick={() => navigate('/exhibits/trex')}
            aria-label="View Tyrannosaurus Rex exhibit details"
            className="group flex items-center gap-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5F2EA]"
          >
            <span className="w-10 h-10 rounded-full border border-[#A9A295]/60 flex items-center justify-center
              group-hover:border-[#A07C4F] group-hover:bg-[#A07C4F] transition-all duration-300">
              <Plus
                size={16}
                strokeWidth={1.5}
                className="text-[#D8D1C2] group-hover:text-[#050505] transition-colors duration-300"
              />
            </span>
            <span className="text-[14px] font-mono uppercase tracking-widest font-bold text-[#D8D1C2] group-hover:text-[#F5F2EA] transition-colors duration-200">
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
        <div className="w-12 h-12 rounded-full border border-[#A9A295]/40 flex items-center justify-center gap-[4px]" aria-hidden="true">
          <span className="w-[1px] h-[12px] bg-[#A9A295] block" />
          <span className="w-[1px] h-[12px] bg-[#A9A295] block" />
        </div>
        <p className="text-[13px] font-mono tracking-widest uppercase text-[#A9A295] font-semibold">
          Scroll to explore
        </p>
      </motion.div>
    </>
  );
}
