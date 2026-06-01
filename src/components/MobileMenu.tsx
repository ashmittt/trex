import { motion, AnimatePresence } from 'motion/react';

interface MobileMenuProps {
  isOpen: boolean;
}

const navLinks = ['Visit', 'Exhibitions', 'Discover', 'Learn', 'About'];

export default function MobileMenu({ isOpen }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="mobile-menu"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="md:hidden bg-[#fcfcfc] border-b border-gray-200 shadow-xl z-50 px-6 py-8"
        >
          <nav className="flex flex-col space-y-6">
            {navLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="text-sm font-mono tracking-[0.2em] uppercase text-gray-800 hover:text-black hover:underline transition-colors duration-200"
              >
                {link}
              </a>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
