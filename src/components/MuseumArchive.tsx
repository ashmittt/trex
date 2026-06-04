import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

export default function MuseumArchive() {
  const navigate = useNavigate();

  const links = [
    {
      num: '01',
      title: 'Fossil Archives',
      desc: 'Browse individual specimens, fossils, and catalogued species from all wings.',
      to: '/exhibits',
    },
    {
      num: '02',
      title: 'Geological Timeline',
      desc: 'Follow the comprehensive chronological development of Earth from Triassic to modern day.',
      to: '/timeline',
    },
    {
      num: '03',
      title: 'Expedition Journal',
      desc: 'Read the staff journal entries detailing active excavation campaigns and findings.',
      to: '/about',
    },
    {
      num: '04',
      title: 'Paleontology Staff',
      desc: 'Meet our lead researchers, curators, and laboratory staff members.',
      to: '/about',
    },
  ];

  return (
    <section
      id="museum-archive"
      className="relative w-full bg-[#050505] py-32 px-6 md:px-16 border-t border-[#A07C4F]/10 z-20"
    >
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Header Block */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-2 mb-4"
          >
            <span className="font-mono text-sm tracking-[0.2em] text-[#A07C4F] uppercase">
              [ CHAPTER VIII: ARCHIVE ]
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: 'easeOut', delay: 0.1 }}
            className="font-normal tracking-tight text-[#F5F2EA] mb-6"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
          >
            Museum Archives
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="text-[#A9A295] max-w-2xl text-lg leading-relaxed"
            style={{ fontSize: '18px' }}
          >
            Delve deeper into the collections. Access laboratory archives, chronological timelines, and staff research logs to complete your journey.
          </motion.p>
        </div>

        {/* Archives Drawer List */}
        <div className="flex flex-col border-t border-[#A07C4F]/20">
          {links.map((link, idx) => (
            <motion.button
              key={link.title}
              onClick={() => navigate(link.to)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="w-full text-left flex flex-col md:flex-row items-start md:items-center justify-between py-8 border-b border-[#A07C4F]/10 hover:border-[#A07C4F]/30 group transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5F2EA]"
            >
              {/* Left Column: Number & Title */}
              <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12 mb-4 md:mb-0">
                <span className="font-mono text-sm tracking-widest text-[#A07C4F]">
                  {link.num}
                </span>
                <div>
                  <h3 className="font-normal text-[#D8D1C2] group-hover:text-[#F5F2EA] transition-colors duration-200" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}>
                    {link.title}
                  </h3>
                  <p className="text-[#A9A295] mt-1 hidden md:block" style={{ fontSize: '16px' }}>
                    {link.desc}
                  </p>
                </div>
              </div>

              {/* Right Column: Click Action indicator */}
              <div className="flex items-center gap-3 self-end md:self-center">
                <span className="font-mono text-xs tracking-widest text-[#A9A295] uppercase group-hover:text-[#F5F2EA] transition-colors duration-200">
                  Open Vault
                </span>
                <ArrowUpRight
                  size={20}
                  className="text-[#A9A295] group-hover:text-[#A07C4F] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
                />
              </div>
            </motion.button>
          ))}
        </div>

        {/* Footer Subtext */}
        <div className="mt-16 flex flex-col md:flex-row justify-between items-center text-[#A9A295] font-mono text-sm gap-4">
          <p className="tracking-widest uppercase">
            NATURAL HISTORY MUSEUM © 2026
          </p>
          <p className="tracking-widest uppercase">
            LONDON · CHICAGO · FAITH
          </p>
        </div>

      </div>
    </section>
  );
}
