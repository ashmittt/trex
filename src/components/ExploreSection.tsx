import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Bone, Dna, Gem, Leaf, BookOpen } from 'lucide-react';

interface Pill {
  icon: React.ElementType;
  label: string;
  to: string;
}

const pills: Pill[] = [
  { icon: Bone, label: 'Dinosaurs', to: '/exhibits' },
  { icon: Dna, label: 'Ancient Life', to: '/exhibits' },
  { icon: Gem, label: 'Minerals', to: '/exhibits' },
  { icon: Leaf, label: 'Fossils', to: '/exhibits' },
  { icon: BookOpen, label: 'Learn More', to: '/timeline' },
];

const pillContainerVariants = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
};

const pillVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

export default function ExploreSection() {
  const navigate = useNavigate();

  return (
    <section
      id="explore"
      className="relative w-full min-h-[75vh] md:min-h-screen bg-[#fcfcfc] flex flex-col items-center pt-24 md:pt-32 pb-0 z-20"
    >
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="flex items-center gap-2 mb-12"
        style={{ fontSize: '10px' }}
      >
        <span className="font-mono tracking-[0.2em] text-gray-500">[ 02 ]</span>
        <span className="font-mono tracking-[0.2em] uppercase font-bold text-gray-900 md:text-[11px]">
          Explore Our World
        </span>
      </motion.div>

      {/* Main heading */}
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="font-medium tracking-tight text-[#111] text-center px-6 mb-10 md:mb-16"
        style={{
          fontSize: 'clamp(2rem, 4.2vw, 4.2rem)',
          lineHeight: 1.1,
          maxWidth: '1000px',
        }}
      >
        Unearth the stories of our planet's
        <br className="hidden md:block" /> past through fossils, minerals,
        <br className="hidden md:block" /> and ancient wonders.
      </motion.h2>

      {/* Action pills */}
      <motion.div
        variants={pillContainerVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: '-60px' }}
        className="flex flex-wrap justify-center gap-3 md:gap-4 mb-10 md:mb-24 px-6"
      >
        {pills.map(({ icon: Icon, label, to }) => (
          <motion.button
            key={label}
            variants={pillVariants}
            id={`pill-${label.toLowerCase().replace(' ', '-')}`}
            onClick={() => navigate(to)}
            aria-label={label}
            className="group flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-300 text-[11px] font-medium uppercase tracking-wider bg-white/50 backdrop-blur-sm text-gray-800
              hover:border-black hover:bg-black hover:text-white transition-all duration-300 cursor-pointer
              focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            <Icon
              size={14}
              strokeWidth={2}
              className="transition-colors duration-300"
            />
            {label}
          </motion.button>
        ))}
      </motion.div>

      {/* Spacer — room for pterodactyl overlap from Section 3 */}
      <div className="min-h-[220px] md:min-h-[450px] w-full" />

      {/* Bottom text — desktop only, absolute */}
      <div className="absolute bottom-0 left-0 right-0 px-8 md:px-16 pb-8 md:pb-12 pointer-events-none">
        <div className="hidden md:flex justify-between">
          <span
            className="font-mono tracking-widest uppercase text-gray-500 font-medium"
            style={{ fontSize: '10px' }}
          >
            WE DON'T JUST TELL STORIES.
          </span>
          <span
            className="font-mono tracking-widest uppercase text-gray-500 font-medium"
            style={{ fontSize: '10px' }}
          >
            PALEONTOLOGY (C) 2026
          </span>
        </div>
      </div>
    </section>
  );
}
