import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import NHMLogo from './NHMLogo';

interface PageHeaderProps {
  /** Show a back arrow + label above the logo */
  backLabel?: string;
  backTo?: string;
}

const navLinks: { label: string; to: string }[] = [
  { label: 'Visit', to: '/exhibits' },
  { label: 'Exhibitions', to: '/exhibits' },
  { label: 'Discover', to: '/timeline' },
  { label: 'About', to: '/about' },
];

export default function PageHeader({ backLabel, backTo = '/' }: PageHeaderProps) {
  const navigate = useNavigate();

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="relative pt-6 px-6 md:px-16 z-20"
    >
      {/* Back link */}
      {backLabel && (
        <button
          onClick={() => navigate(backTo)}
          className="flex items-center gap-2 mb-4 text-[#1A1614]/65 hover:text-[#1A1614] transition-colors duration-200 group cursor-pointer"
          aria-label={`Back to ${backLabel}`}
        >
          <ArrowLeft
            size={14}
            strokeWidth={1.5}
            className="group-hover:-translate-x-0.5 transition-transform duration-200 text-[#D35400]"
          />
          <span className="text-[14px] font-mono tracking-[0.2em] uppercase">
            {backLabel}
          </span>
        </button>
      )}

      {/* Logo */}
      <Link to="/" aria-label="Natural History Museum — Home" className="block">
        <NHMLogo fillClass="fill-[#1A1614]" />
      </Link>

      {/* Sub-nav */}
      <div className="flex justify-end items-center mt-6 gap-6">
        <nav className="hidden md:flex gap-8" style={{ fontSize: '14px' }}>
          {navLinks.map(({ label, to }) => (
            <Link
              key={label}
              to={to}
              className="font-mono tracking-[0.2em] uppercase text-[#1A1614]/75 hover:text-[#D35400] hover:underline transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A1614]"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </motion.header>
  );
}
