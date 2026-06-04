import { motion } from 'motion/react';

export default function TheropodHall() {
  return (
    <section
      id="theropod-hall"
      className="relative w-full min-h-screen flex flex-col justify-center bg-[#050505] py-20 px-6 md:px-16 overflow-hidden z-20"
    >
      {/* Background Soft Spotlight Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] rounded-full bg-[#A07C4F]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Column: Specimen Title & Scale Label (35% width / 4 cols) */}
        <div className="lg:col-span-4 flex flex-col justify-center">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex items-center gap-2 mb-4"
          >
            <span className="font-mono text-sm tracking-[0.2em] text-[#A07C4F] uppercase">
              [ Specimen Centred ]
            </span>
          </motion.div>

          {/* Major Title */}
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.1 }}
            className="font-normal tracking-tight text-[#F5F2EA] mb-6"
            style={{
              fontSize: 'clamp(2.8rem, 4.5vw, 4rem)', // 44px to 64px
              lineHeight: 1.1,
            }}
          >
            Tyrannosaurus<br />
            <span className="text-[#A07C4F]">Rex</span>
          </motion.h2>

          {/* Plaque text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
            className="text-[#D8D1C2] mb-8 leading-relaxed"
            style={{ fontSize: '18px' }}
          >
            The apex predator of the Late Cretaceous, standing as the ultimate symbol of prehistoric power. A colossal theropod measuring over twelve metres, designed entirely around the physics of the hunt.
          </motion.p>

          {/* Scale comparison footnote */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="border-l-2 border-[#A07C4F]/30 pl-4 py-1"
          >
            <p className="font-mono text-xs tracking-wider uppercase text-[#A9A295]">Scale Index</p>
            <p className="font-mono text-sm text-[#F5F2EA] mt-1">1:1 Physical Exhibition Cast</p>
          </motion.div>
        </div>

        {/* Right Column: Massive Specimen Image (65% width / 8 cols) */}
        <div className="lg:col-span-8 flex justify-center items-center relative">
          {/* Subtle Watermark Label behind the skeleton */}
          <div className="absolute select-none font-mono text-[10vw] tracking-widest text-[#F5F2EA]/[0.015] font-black uppercase pointer-events-none z-0">
            APEX
          </div>

          {/* T-Rex Skeleton Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full relative z-10 flex justify-center"
          >
            <img
              src="https://res.cloudinary.com/dsdxaxkiz/image/upload/v1779624247/01_udnber.png"
              alt="Tyrannosaurus Rex Fossil Centerpiece"
              className="w-full max-h-[75vh] object-contain filter drop-shadow-[0_20px_50px_rgba(160,124,79,0.15)] select-none pointer-events-none"
            />
          </motion.div>
        </div>
        
      </div>
    </section>
  );
}
