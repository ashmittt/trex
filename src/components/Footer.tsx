import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#050505] text-[#F5F2EA] border-t border-white/5 py-24 px-6 md:px-16 overflow-hidden">
      <div className="max-w-6xl mx-auto w-full flex flex-col gap-16">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Identity Block */}
          <div className="md:col-span-5 flex flex-col gap-6">
            <span className="font-serif tracking-[0.2em] uppercase text-lg text-[#F5F2EA] font-light">
              Natural History <span className="font-serif italic text-[#C4903A]">Museum</span>
            </span>
            <p className="font-mono text-xs text-[#9E8E78] uppercase leading-relaxed max-w-xs">
              Cromwell Road, London SW7 5BD<br />
              United Kingdom // Deep Time Division
            </p>
          </div>

          {/* Navigation Links Column */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <span className="font-mono text-[10px] tracking-[0.2em] text-[#C4903A] uppercase font-bold">
              Exhibits
            </span>
            <nav className="flex flex-col gap-2 font-mono text-xs text-[#A9A295]" aria-label="Footer Navigation">
              <Link to="/exhibits" className="hover:text-white transition-colors uppercase tracking-wider">Visit Gallery</Link>
              <Link to="/timeline" className="hover:text-white transition-colors uppercase tracking-wider">Discover Spine</Link>
              <Link to="/about" className="hover:text-white transition-colors uppercase tracking-wider">About Gallery</Link>
              <Link to="/dashboard" className="hover:text-[#C4903A] transition-colors uppercase tracking-wider">Telemetry Console</Link>
            </nav>
          </div>

          {/* Research & Database Column */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <span className="font-mono text-[10px] tracking-[0.2em] text-[#C4903A] uppercase font-bold">
              Scientific Archives
            </span>
            <p className="font-mono text-xs text-[#A9A295] leading-relaxed uppercase">
              All bone and mineral specimens displayed are cataloged within the NHM Fossil Database. Ledgers available for academic request under Protocol 1887.
            </p>
          </div>

        </div>

        {/* Separator */}
        <div className="h-[1px] w-full bg-white/5" />

        {/* Bottom Credits Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 font-mono text-[9px] text-[#9E8E78] uppercase tracking-widest">
          <span>
            © {new Date().getFullYear()} Natural History Museum. All Rights Specified.
          </span>
          <span>
            Record ID: NHM-EXH-DS01 // Version IX
          </span>
        </div>

      </div>
    </footer>
  );
}
