import { motion } from 'motion/react';

export default function TimelineExtinction() {
  const events = [
    {
      era: 'Triassic Period',
      range: '252–201 Mya',
      title: 'Dawn of the Dinosaurs',
      desc: 'Following the devastating Permian extinction, early archosaurs adapt. Small, agile bipedal dinosaurs emerge to fill empty ecological niches on the supercontinent Pangea.',
      accent: '#A07C4F',
    },
    {
      era: 'Jurassic Period',
      range: '201–145 Mya',
      title: 'Age of the Giants',
      desc: 'Warm, greenhouse climates trigger massive vegetation growth. Giant sauropods (Brachiosaurus, Diplodocus) dominate the land, and large carnivores like Allosaurus appear.',
      accent: '#A07C4F',
    },
    {
      era: 'Cretaceous Period',
      range: '145–66 Mya',
      title: 'Peak Diversification',
      desc: 'Continents drift into modern positions. Apex theropods reach extreme scales (T-Rex, Spinosaurus). Flowering plants emerge, completely changing terrestrial diets.',
      accent: '#A07C4F',
    },
    {
      era: 'K-Pg Boundary',
      range: '66 Million Years Ago',
      title: 'The Cataclysm',
      desc: 'A 10km asteroid impacts the Yucatan Peninsula, leaving the Chicxulub crater. The resulting nuclear winter, acid rain, and global fires trigger the sudden extinction of 75% of all species, ending the Mesozoic Era.',
      accent: '#8C3A2D', // Terracotta Red for extinction event
      highlight: true,
    },
  ];

  return (
    <section
      id="timeline-extinction"
      className="relative w-full bg-[#050505] py-28 px-6 md:px-16 border-t border-[#A07C4F]/10 z-20"
    >
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Header Block */}
        <div className="mb-20 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-2 mb-4"
          >
            <span className="font-mono text-sm tracking-[0.2em] text-[#A07C4F] uppercase">
              [ CHAPTER VII: CHRONOLOGY ]
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: 'easeOut', delay: 0.1 }}
            className="font-normal tracking-tight text-[#F5F2EA] mb-6 text-center"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
          >
            Timeline & Extinction
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="text-[#A9A295] max-w-2xl text-lg leading-relaxed text-center"
            style={{ fontSize: '18px' }}
          >
            Two hundred million years of dominant rule shattered in a single afternoon. The chronology of the Mesozoic leading to the cataclysmic boundary.
          </motion.p>
        </div>

        {/* Vertical Timeline Track */}
        <div className="relative max-w-4xl mx-auto pl-8 md:pl-0">
          
          {/* Main vertical track line */}
          <div className="absolute left-8 md:left-1/2 top-4 bottom-4 w-[1px] bg-gradient-to-b from-[#A07C4F]/20 via-[#A07C4F]/40 to-[#8C3A2D]/40 -translate-x-1/2" />

          {/* Timeline Nodes */}
          <div className="flex flex-col gap-16 relative z-10">
            {events.map((evt, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={evt.title}
                  className={`flex flex-col md:flex-row items-stretch w-full ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  
                  {/* Left or Right Content Card */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.9, ease: 'easeOut' }}
                    className="w-full md:w-1/2 flex flex-col justify-center px-4 md:px-12"
                  >
                    <div
                      className={`p-8 rounded-lg bg-[#0a0a0a] border ${
                        evt.highlight ? 'border-[#8C3A2D]/30 shadow-[0_4px_30px_rgba(140,58,45,0.05)]' : 'border-[#A07C4F]/5'
                      }`}
                    >
                      {/* Range & Era */}
                      <div className="flex items-center justify-between mb-4">
                        <span
                          className="font-mono text-xs tracking-widest uppercase font-bold"
                          style={{ color: evt.accent }}
                        >
                          {evt.era}
                        </span>
                        <span className="font-mono text-xs text-[#A9A295]">{evt.range}</span>
                      </div>

                      {/* Event Title */}
                      <h3
                        className="font-normal text-[#F5F2EA] mb-3"
                        style={{ fontSize: '24px' }}
                      >
                        {evt.title}
                      </h3>

                      {/* Description */}
                      <p className="text-[#A9A295] leading-relaxed" style={{ fontSize: '17px' }}>
                        {evt.desc}
                      </p>
                    </div>
                  </motion.div>

                  {/* Spacer for non-content column */}
                  <div className="hidden md:block w-1/2" />

                  {/* Centered Timeline Dot */}
                  <div className="absolute left-8 md:left-1/2 top-8 w-4 h-4 rounded-full bg-[#050505] border-2 -translate-x-1/2 z-20 flex items-center justify-center"
                    style={{ borderColor: evt.accent }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: evt.accent }} />
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
