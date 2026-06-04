import { motion } from 'motion/react';

export default function EnterTheHall() {
  return (
    <section
      id="enter-hall"
      className="relative w-full min-h-[60vh] flex flex-col justify-center items-center px-6 md:px-16 py-24 bg-[#050505] z-20 border-t border-[#A07C4F]/10"
    >
      <div className="max-w-4xl w-full text-center flex flex-col items-center">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex items-center gap-3 mb-8"
        >
          <span className="font-mono text-sm tracking-[0.3em] text-[#A07C4F] uppercase">
            [ Chapter II: The Threshold ]
          </span>
        </motion.div>

        {/* Major Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.1 }}
          className="font-normal tracking-tight text-[#F5F2EA] mb-8"
          style={{
            fontSize: 'clamp(3rem, 5vw, 4.5rem)', // 48px to 72px
            lineHeight: 1.15,
          }}
        >
          Entering the Theropod Hall
        </motion.h2>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
          className="w-24 h-[1px] bg-[#A07C4F]/30 mb-8"
        />

        {/* Description text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.3 }}
          className="text-[#D8D1C2] max-w-2xl leading-[1.8] text-center"
          style={{ fontSize: '18px' }}
        >
          Step beyond the threshold of the digital archive. The ambient light fades, the vault opens, and the whispers of deep time gather in the shadows. Ahead lies the sanctum of the dinosaurs—where the absolute titans of prehistory still reign.
        </motion.p>
      </div>
    </section>
  );
}
