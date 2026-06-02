import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Bone, Dna, Leaf, ArrowUpRight } from 'lucide-react';
import { chaptersData } from '../data/chapters';
import SandTransitionImage from './SandTransitionImage';

interface CollectionSectionProps {
  activeChapter: number;
  setActiveChapter: (index: number) => void;
}

// Icon buttons: Bone=carnivores, Dna=all, Leaf=herbivores
const chapterCircleButtons = [
  { Icon: Bone, label: 'Carnivores', filter: '?diet=carnivore' },
  { Icon: Dna, label: 'All Species', filter: '' },
  { Icon: Leaf, label: 'Herbivores', filter: '?diet=herbivore' },
];

export default function CollectionSection({
  activeChapter,
  setActiveChapter,
}: CollectionSectionProps) {
  const padded = String(activeChapter + 1).padStart(2, '0');
  const navigate = useNavigate();

  return (
    <section
      id="collection"
      className="relative w-full bg-[#0a0a0a] text-white flex flex-col z-30"
    >
      {/* PTERODACTYL IMAGE — overlapping from above */}
      <motion.div
        initial={{ y: '-65%', opacity: 0 }}
        whileInView={{ y: '-78%', opacity: 1 }}
        viewport={{ once: true, margin: '100px' }}
        transition={{ duration: 1.4, ease: 'easeOut' }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[160vw] md:w-[1100px] pointer-events-none z-0"
      >
        <img
          src="https://res.cloudinary.com/dsdxaxkiz/image/upload/v1779625001/ChatGPT_Image_May_23_2026_12_24_44_PM_1_lv1dne.png"
          alt="Pterodactyl prehistoric flying reptile"
          className="w-full"
        />
      </motion.div>

      {/* HEADING AREA */}
      <div className="relative px-8 md:px-16 pt-32 md:pt-48 mb-16 z-10">
        <div className="flex flex-col xl:flex-row xl:justify-between xl:items-start gap-8 xl:gap-16">
          {/* Left — Main heading */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="font-medium tracking-tight text-white"
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 4rem)',
              lineHeight: 1.15,
              maxWidth: '700px',
            }}
          >
            Curated from millions of years
            <br />
            of wonder{' '}
            <span className="inline-flex items-center gap-2 md:gap-3 align-middle mx-2 md:mx-4 -translate-y-1">
              {chapterCircleButtons.map(({ Icon, label, filter }) => (
                <button
                  key={label}
                  onClick={() => navigate(`/exhibits${filter}`)}
                  aria-label={`Browse ${label}`}
                  title={label}
                  className="w-10 h-10 md:w-14 md:h-14 rounded-full border border-gray-600 bg-black text-gray-400
                    hover:bg-white hover:text-black hover:border-white transition-all duration-300 flex items-center justify-center
                    focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <Icon size={22} strokeWidth={1.5} />
                </button>
              ))}
            </span>
            {' '}& discovery.
          </motion.h2>

          {/* Right — Tagline + pills */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
            className="flex flex-col xl:items-end gap-6"
          >
            <p
              className="font-mono tracking-widest text-gray-400 uppercase leading-relaxed"
              style={{ fontSize: '9px' }}
            >
              WE DON'T JUST DISPLAY FOSSILS<br />
              WE SHARE EARTH'S STORY
            </p>
            <div className="flex flex-wrap gap-3">
              {(['Educational', 'Authentic', 'Inspiring'] as const).map((tag) => (
                <button
                  key={tag}
                  onClick={() => navigate('/about')}
                  aria-label={`${tag} — learn about us`}
                  className="px-5 py-2 rounded-full border border-gray-600 font-mono tracking-widest uppercase text-gray-300
                    hover:bg-white hover:text-black hover:border-white transition-all duration-300
                    focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  style={{ fontSize: '9px' }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* DIVIDER */}
      <div className="h-[1px] bg-gray-800 mx-0" />

      {/* TWO-COLUMN PANEL */}
      <div className="relative flex flex-col md:flex-row z-10">
        {/* LEFT PANEL — chapter image */}
        <div className="relative md:w-[35%] border-b md:border-b-0 md:border-r border-gray-800 min-h-[400px] md:min-h-[500px] flex flex-col justify-between p-8">
          {/* Stars top */}
          <p className="text-gray-500 text-xl tracking-[0.3em] font-mono" aria-hidden="true">***</p>

          {/* Chapter image — sand dissolve */}
          <div className="relative flex-1 my-4" style={{ minHeight: '280px' }}>
            <AnimatePresence mode="wait">
              <SandTransitionImage
                key={`chapter-${activeChapter}`}
                src={chaptersData[activeChapter].image}
                alt={chaptersData[activeChapter].name}
              />
            </AnimatePresence>
          </div>

          {/* Chapter counter */}
          <div className="flex items-center gap-2">
            <div className="overflow-hidden h-[14px] relative">
              <AnimatePresence mode="wait">
                <motion.span
                  key={padded}
                  initial={{ y: 14 }}
                  animate={{ y: 0 }}
                  exit={{ y: -14 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  className="block font-mono tracking-widest uppercase text-[#888] absolute"
                  style={{ fontSize: '10px' }}
                >
                  {padded}
                </motion.span>
              </AnimatePresence>
            </div>
            <span className="font-mono text-[#333]" style={{ fontSize: '10px' }}>/</span>
            <span
              className="font-mono tracking-widest uppercase text-[#888]"
              style={{ fontSize: '10px' }}
            >
              05
            </span>
          </div>
        </div>

        {/* RIGHT PANEL — chapter list */}
        <div className="md:w-[65%] flex flex-col">
          {/* Top bar */}
          <div className="border-b border-gray-800 px-8 py-6 flex items-center justify-between">
            <p
              className="font-mono text-gray-400 tracking-widest"
              style={{ fontSize: '10px' }}
            >
              Explore the past. Understand the present.
            </p>
            <AnimatePresence mode="wait">
              <motion.p
                key={`chapter-label-${activeChapter}`}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25 }}
                className="font-mono text-gray-400 tracking-widest"
                style={{ fontSize: '10px' }}
              >
                Chapter {padded}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Chapter list */}
          <div className="flex flex-col">
            {chaptersData.map((chapter, index) => {
              const isActive = index === activeChapter;
              return (
                <button
                  key={chapter.name}
                  id={`chapter-${index}`}
                  onClick={() => {
                    setActiveChapter(index);
                    navigate('/exhibits');
                  }}
                  aria-pressed={isActive}
                  className={`relative group flex items-center justify-between border-b border-gray-800/80 px-8 py-8 text-left transition-colors duration-300
                    ${isActive ? 'text-white' : 'text-[#444] hover:text-[#999]'}
                    focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white`}
                >
                  <span
                    className="font-medium tracking-tight"
                    style={{ fontSize: 'clamp(1.3rem, 2vw, 2rem)' }}
                  >
                    {chapter.name}
                  </span>

                  <AnimatePresence>
                    {isActive && (
                      <motion.span
                        key={`arrow-${index}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ArrowUpRight
                          size={22}
                          strokeWidth={1}
                          className="text-gray-400"
                        />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* DIVIDER */}
      <div className="h-[1px] bg-gray-800" />

      {/* BOTTOM FOOTER */}
      <div className="px-8 py-8 bg-[#0a0a0a]">
        <p
          className="font-mono tracking-widest text-gray-500 uppercase"
          style={{ fontSize: '10px' }}
        >
          DIGGING INTO OUR PLANET'S PAST
        </p>
      </div>
    </section>
  );
}
