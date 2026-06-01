import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import NHMLogo from './NHMLogo';

interface HeaderProps {
  isMobileMenuOpen: boolean;
  onMenuToggle: () => void;
}

const navLinks = ['Visit', 'Exhibitions', 'Discover', 'Learn', 'About'];

const headerVariants = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

export default function Header({ isMobileMenuOpen, onMenuToggle }: HeaderProps) {
  return (
    <motion.header
      variants={headerVariants}
      initial="initial"
      animate="animate"
      className="relative pt-6 px-6 md:px-16 z-20"
    >
      {/* NHM Animated Logo */}
      <NHMLogo />

      {/* Sub-nav bar */}
      <motion.div
        variants={fadeUp}
        className="flex justify-between items-start mt-8"
      >
        {/* Left column */}
        <div
          className="w-[15%] hidden md:block"
          style={{ fontSize: '10px' }}
        >
          <p className="font-mono tracking-[0.2em] uppercase leading-relaxed text-gray-700">
            Natura<br />History<br />Museum
          </p>
        </div>

        {/* Arrow separator — desktop only */}
        <div className="hidden md:flex items-center w-[5%] justify-center pt-1">
          <ArrowRight size={14} strokeWidth={1} className="text-gray-400" />
        </div>

        {/* Center column */}
        <div className="flex-1 md:flex-none md:w-[30%]">
          <p
            className="text-gray-800 leading-relaxed font-mono"
            style={{ fontSize: '10px' }}
          >
            <span className="hidden md:block">
              Exploring the story of life<br />
              on earth through science,<br />
              discovery and wonder.
            </span>
            <span className="block md:hidden tracking-[0.2em] uppercase">
              Exploring the story of life<br />
              on earth through science,<br />
              discovery<br />
              and wonder.
            </span>
          </p>
        </div>

        {/* Arrow separator — desktop only */}
        <div className="hidden md:flex items-center w-[5%] justify-center pt-1">
          <ArrowRight size={14} strokeWidth={1} className="text-gray-400" />
        </div>

        {/* Right nav — desktop only */}
        <nav className="hidden md:flex flex-col w-[15%]" style={{ fontSize: '10px' }}>
          {navLinks.map((link) => (
            <a
              key={link}
              href="#"
              className="font-mono tracking-[0.2em] uppercase text-gray-800 hover:text-black hover:underline transition-colors duration-200 leading-relaxed"
            >
              {link}
            </a>
          ))}
        </nav>

        {/* Hamburger button */}
        <button
          id="mobile-menu-toggle"
          onClick={onMenuToggle}
          className="flex flex-col gap-[6px] cursor-pointer z-60 ml-4 group p-1"
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          <span
            className={`block h-[1.5px] bg-black transition-all duration-300 origin-center ${
              isMobileMenuOpen
                ? 'w-8 translate-y-[3.75px] rotate-45'
                : 'w-8 group-hover:w-6'
            }`}
          />
          <span
            className={`block h-[1.5px] bg-black transition-all duration-300 origin-center ${
              isMobileMenuOpen
                ? 'w-8 -translate-y-[3.75px] -rotate-45'
                : 'w-8 group-hover:w-10'
            }`}
          />
        </button>
      </motion.div>
    </motion.header>
  );
}
