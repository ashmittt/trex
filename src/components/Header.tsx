import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import NHMLogo from './NHMLogo';
import { useAnalytics } from '../context/AnalyticsContext';

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
  const [isScrolled, setIsScrolled] = useState(false);
  const { incrementCta } = useAnalytics();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {!isScrolled ? (
        <motion.header
          key="full-header"
          variants={headerVariants}
          initial="initial"
          animate="animate"
          exit={{ opacity: 0, y: -20 }}
          className="relative pt-6 px-6 md:px-16 z-20 w-full"
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
                Natural<br />History<br />Museum
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
              onClick={() => {
                incrementCta('mobile_menu');
                onMenuToggle();
              }}
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
      ) : (
        // Floating glass capsule navbar
        <motion.div
          key="floating-header"
          initial={{ opacity: 0, y: -40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -40, scale: 0.95 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-4 left-1/2 -translate-x-1/2 w-[90%] md:w-[70%] max-w-5xl rounded-full bg-[#0D0B08]/85 backdrop-blur-xl border border-[#F5F2EA]/10 px-6 py-3 shadow-[0_12px_40px_rgba(0,0,0,0.6)] z-50 flex items-center justify-between"
        >
          {/* Left: Mini Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 font-serif tracking-[0.25em] text-[#F5F2EA] hover:text-[#C4903A] transition-colors font-medium text-sm md:text-base uppercase"
          >
            <span>N.H.M</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#C4903A]" />
          </Link>

          {/* Center: Horizonal navigation (Desktop) */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Main floating navigation">
            {navLinks.map(({ label, to }) => (
              <Link
                key={label}
                to={to}
                className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#D8D1C2] hover:text-[#F5F2EA] hover:underline transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-[#F5F2EA]"
              >
                {label}
              </Link>
            ))}
            {/* Direct Dashboard Link */}
            <Link
              to="/dashboard"
              className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#C4903A] hover:text-[#F5F2EA] border border-[#C4903A]/30 px-3 py-1 rounded-full bg-[#C4903A]/5 hover:bg-[#C4903A]/20 transition-all duration-200"
            >
              Dashboard
            </Link>
          </nav>

          {/* Right: Hamburger button */}
          <div className="flex items-center gap-4">
            {/* Dashboard Link for mobile */}
            <Link
              to="/dashboard"
              className="md:hidden font-mono text-[9px] tracking-[0.15em] uppercase text-[#C4903A] border border-[#C4903A]/30 px-2 py-0.5 rounded-full"
            >
              Dashboard
            </Link>
            <button
              id="floating-menu-toggle"
              onClick={() => {
                incrementCta('mobile_menu');
                onMenuToggle();
              }}
              className="flex flex-col gap-[5px] cursor-pointer group p-1"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span
                className={`block h-[1.5px] bg-[#F5F2EA] transition-all duration-300 origin-center ${
                  isMobileMenuOpen
                    ? 'w-6 translate-y-[3.25px] rotate-45'
                    : 'w-6 group-hover:w-4'
                }`}
              />
              <span
                className={`block h-[1.5px] bg-[#F5F2EA] transition-all duration-300 origin-center ${
                  isMobileMenuOpen
                    ? 'w-6 -translate-y-[3.25px] -rotate-45'
                    : 'w-6 group-hover:w-8'
                }`}
              />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
