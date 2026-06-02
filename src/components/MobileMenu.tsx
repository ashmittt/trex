import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const navLinks: { label: string; to: string }[] = [
  { label: 'Visit', to: '/exhibits' },
  { label: 'Exhibitions', to: '/exhibits' },
  { label: 'Discover', to: '/timeline' },
  { label: 'Learn', to: '/timeline' },
  { label: 'About', to: '/about' },
];

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="mobile-nav"
          key="mobile-menu"
          role="navigation"
          aria-label="Mobile navigation"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="md:hidden bg-[#fcfcfc] border-b border-gray-200 shadow-xl z-50 px-6 py-8"
        >
          <nav className="flex flex-col space-y-6">
            {navLinks.map(({ label, to }) => (
              <Link
                key={label}
                to={to}
                onClick={onClose}
                className="text-sm font-mono tracking-[0.2em] uppercase text-gray-800 hover:text-black hover:underline transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                {label}
              </Link>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
