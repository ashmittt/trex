import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import NHMLogo from './NHMLogo';

interface HeaderProps {
  isMobileMenuOpen: boolean;
  onMenuToggle: () => void;
}

const navLinks: { label: string; to: string }[] = [
  { label: 'Visit', to: '/exhibits' },
  { label: 'Exhibitions', to: '/exhibits' },
  { label: 'Discover', to: '/timeline' },
  { label: 'Learn', to: '/timeline' },
  { label: 'About', to: '/about' },
];

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
    transition: { duration: 0.8, ease: 'easeOut' as const },
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
        <div className="w-[15%] hidden md:block" style={{ fontSize: '14px' }}>
          <p className="font-mono tracking-[0.2em] uppercase leading-relaxed text-[#A9A295]">
            Natura<br />History<br />Museum
          </p>
        </div>

        {/* Arrow separator — desktop only */}
        <div className="hidden md:flex items-center w-[5%] justify-center pt-1">
          <ArrowRight size={14} strokeWidth={1} className="text-[#A9A295]" />
        </div>

        {/* Center column */}
        <div className="flex-1 md:flex-none md:w-[30%]">
          <p className="text-[#D8D1C2] leading-relaxed font-mono" style={{ fontSize: '14px' }}>
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
          <ArrowRight size={14} strokeWidth={1} className="text-[#A9A295]" />
        </div>

        {/* Right nav — desktop only */}
        <nav
          className="hidden md:flex flex-col w-[15%]"
          style={{ fontSize: '14px' }}
          aria-label="Main navigation"
        >
          {navLinks.map(({ label, to }) => (
            <Link
              key={label}
              to={to}
              className="font-mono tracking-[0.2em] uppercase text-[#D8D1C2] hover:text-[#F5F2EA] hover:underline transition-colors duration-200 leading-relaxed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5F2EA]"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Hamburger button */}
        <button
          id="mobile-menu-toggle"
          onClick={onMenuToggle}
          className="flex flex-col gap-[6px] cursor-pointer z-60 ml-4 group p-1"
          aria-label="Toggle navigation menu"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-nav"
        >
          <span
            className={`block h-[1.5px] bg-[#F5F2EA] transition-all duration-300 origin-center ${
              isMobileMenuOpen
                ? 'w-8 translate-y-[3.75px] rotate-45'
                : 'w-8 group-hover:w-6'
            }`}
          />
          <span
            className={`block h-[1.5px] bg-[#F5F2EA] transition-all duration-300 origin-center ${
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
