import { motion } from 'motion/react';

export default function ScientificContext() {
  const stats = [
    {
      value: '57,000 N',
      label: 'Crushing Bite Force',
      description: 'The strongest terrestrial bite force ever calculated, capable of shattering bone and slicing directly through flesh and armor.',
    },
    {
      value: 'Hawk-Like',
      label: 'Binocular Vision',
      description: 'Forward-facing orbit structure gave T-Rex exceptional depth perception and stereoscopic vision, far superior to other theropods.',
    },
    {
      value: '25 km/h',
      label: 'Estimated Pursuit Speed',
      description: 'Bipedal muscular power allowed short bursts of sprint speed to close distance and ambush large, slow-moving herbivores.',
    },
    {
      value: '30 cm',
      label: 'Tooth Length',
      description: 'Bananas-sized teeth, including the deep-anchored root, allowed it to absorb immense impact forces during hunting.',
    },
  ];

  return (
    <section
      id="scientific-context"
      className="relative w-full bg-[#050505] py-28 px-6 md:px-16 border-t border-[#A07C4F]/10 z-20"
    >
      {/* Subtle radial background spotlight for texture */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-[#A07C4F]/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Two-column layout: Intro on left, Stats grid on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Context (4 cols) */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-2 mb-4"
            >
              <span className="font-mono text-sm tracking-[0.2em] text-[#A07C4F] uppercase">
                [ CHAPTER V: BIOMECHANICS ]
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: 'easeOut', delay: 0.1 }}
              className="font-normal tracking-tight text-[#F5F2EA] mb-6"
              style={{ fontSize: 'clamp(2.5rem, 4vw, 3.8rem)', lineHeight: 1.15 }}
            >
              The Science<br />of the Hunt
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-[#D8D1C2] leading-relaxed mb-8"
              style={{ fontSize: '18px' }}
            >
              Tyrannosaurus Rex was not merely a large predator—it was a highly refined evolutionary machine. Its massive neck muscles, jaw bone density, and visual depth combined to create an unbeatable apex hunter.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              className="border-t border-[#A07C4F]/20 pt-6"
            >
              <span className="font-mono text-xs tracking-widest text-[#A07C4F] uppercase">
                SOURCE DATA: CT SCAN & DENTAL ANALYSIS
              </span>
            </motion.div>
          </div>

          {/* Right Column: Dynamic Stats Blocks (8 cols) */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: idx * 0.15 }}
                className="p-8 rounded-lg bg-[#0a0a0a] border border-[#A07C4F]/5 hover:border-[#A07C4F]/20 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Large Value */}
                  <motion.div
                    className="font-normal text-[#A07C4F] mb-2 tracking-tight"
                    style={{ fontSize: 'clamp(2.5rem, 4.5vw, 4rem)' }}
                  >
                    {stat.value}
                  </motion.div>

                  {/* Stat Label */}
                  <h3 className="font-mono text-sm tracking-widest text-[#F5F2EA] uppercase mb-4">
                    {stat.label}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-[#A9A295] leading-relaxed" style={{ fontSize: '17px' }}>
                  {stat.description}
                </p>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
