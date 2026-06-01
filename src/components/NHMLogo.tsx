import { motion } from 'motion/react';

const letterBlock = {
  initial: { y: 120, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

const logoVariants = {
  initial: { scale: 1.03 },
  animate: {
    scale: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

export default function NHMLogo() {
  return (
    <motion.h1
      variants={logoVariants}
      initial="initial"
      animate="animate"
      className="w-full overflow-hidden"
      style={{ lineHeight: 0 }}
    >
      <svg
        viewBox="0 0 840 100"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full fill-[#111]"
        aria-label="Natural History Museum"
      >
        {/* Letter N — translate(0,0) */}
        <g transform="translate(0,0)">
          {/* Left vertical */}
          <motion.polygon variants={letterBlock} points="0,0 14,0 14,100 0,100" />
          {/* Right vertical */}
          <motion.polygon variants={letterBlock} points="200,0 214,0 214,100 200,100" />
          {/* Diagonal */}
          <motion.polygon variants={letterBlock} points="0,0 33,0 214,100 181,100" />
        </g>

        {/* Letter H — translate(280,0) */}
        <g transform="translate(280,0)">
          {/* Left vertical */}
          <motion.polygon variants={letterBlock} points="0,0 14,0 14,100 0,100" />
          {/* Right vertical */}
          <motion.polygon variants={letterBlock} points="200,0 214,0 214,100 200,100" />
          {/* Crossbar */}
          <motion.polygon variants={letterBlock} points="14,43 200,43 200,57 14,57" />
        </g>

        {/* Letter M — translate(560,0) */}
        <g transform="translate(560,0)">
          {/* Left vertical */}
          <motion.polygon variants={letterBlock} points="0,0 14,0 14,100 0,100" />
          {/* Right vertical */}
          <motion.polygon variants={letterBlock} points="266,0 280,0 280,100 266,100" />
          {/* Left diagonal */}
          <motion.polygon variants={letterBlock} points="0,0 26,0 153,100 127,100" />
          {/* Right diagonal */}
          <motion.polygon variants={letterBlock} points="254,0 280,0 153,100 127,100" />
        </g>
      </svg>
    </motion.h1>
  );
}
