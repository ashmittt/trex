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
        className="w-full fill-[#F5F2EA] relative"
        aria-label="Natural History Museum"
      >
        {/* Dinosaur Silhouette behind the logo */}
        <path 
          d="M 30,80 C 80,72 130,68 180,62 C 230,52 330,48 400,58 C 450,62 500,42 530,22 C 540,12 555,12 550,27 C 535,42 505,68 450,82 C 400,92 280,94 200,88 C 130,88 80,85 30,80 Z" 
          fill="#F5F2EA" 
          opacity="0.08" 
        />

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
