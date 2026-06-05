import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useAnalytics } from '../context/AnalyticsContext';

export default function LegacySection() {
  const navigate = useNavigate();
  const { incrementCta } = useAnalytics();

  const handleExplore = () => {
    incrementCta('explore_archive');
    navigate('/exhibits');
  };

  return (
    <section id="legacy" className="relative min-h-screen bg-[#050505] text-[#F5F2EA] flex flex-col justify-center overflow-hidden border-t border-[#F5F2EA]/10">
      {/* Background warm ambiance layer */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,#3D2B1F_0%,transparent_50%)] opacity-20 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#E8E0D0_1px,transparent_1px),linear-gradient(to_bottom,#E8E0D0_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.015] pointer-events-none z-0" />

      <div className="relative z-10 px-8 md:px-24 py-24 max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="font-mono text-xs tracking-[0.4em] text-[#C4903A] uppercase block mb-6">
            STAGE 10 // DEEP TIME LEGACY
          </span>

          <h2
            className="font-serif font-light tracking-tight leading-[0.9] uppercase"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
          >
            The Story <br />
            <span className="font-serif italic text-[#C4903A] block mt-2">Continues</span>
          </h2>

          <p className="text-xl md:text-2xl font-serif font-light italic text-[#E8E0D0] leading-relaxed mt-8 max-w-2xl">
            Dinosaurs did not vanish. A single branch of feathered theropods survived the impact winter. Today, over 10,000 species of birds carry on the Mesozoic lineage. Every eagle, sparrow, and falcon is a living dinosaur.
          </p>
        </motion.div>

        {/* Curated highlights - slate/wooden frame structure */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
        >
          <div className="border border-[#F5F2EA]/10 bg-[#0A0A0A]/80 p-8 hover:border-[#C4903A]/30 transition-all duration-300 relative rounded-sm">
            <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#6B8C6E]" />
            <span className="font-mono text-[10px] text-[#6B8C6E] uppercase tracking-wider block mb-3 font-bold">
              [ L-01 ] Living Theropods
            </span>
            <h3 className="font-serif text-xl font-light uppercase mb-3">The Modern Skies</h3>
            <p className="text-sm text-[#9E8E78] leading-relaxed font-sans">
              From the Archaeopteryx to the modern raptor — 150 million years of flight evolution preserved in fossil and feather.
            </p>
          </div>

          <div className="border border-[#F5F2EA]/10 bg-[#0A0A0A]/80 p-8 hover:border-[#C4903A]/30 transition-all duration-300 relative rounded-sm">
            <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#C4903A]" />
            <span className="font-mono text-[10px] text-[#C4903A] uppercase tracking-wider block mb-3 font-bold">
              [ L-02 ] The Stone Record
            </span>
            <h3 className="font-serif text-xl font-light uppercase mb-3">Lithosphere Archive</h3>
            <p className="text-sm text-[#9E8E78] leading-relaxed font-sans">
              Less than one percent of prehistoric life has left a fossil record. Each specimen is a miracle of preservation.
            </p>
          </div>

          <div className="border border-[#F5F2EA]/10 bg-[#0A0A0A]/80 p-8 hover:border-[#C4903A]/30 transition-all duration-300 relative rounded-sm">
            <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#6B8C6E]" />
            <span className="font-mono text-[10px] text-[#6B8C6E] uppercase tracking-wider block mb-3 font-bold">
              [ L-03 ] Current Research
            </span>
            <h3 className="font-serif text-xl font-light uppercase mb-3">Active Discoveries</h3>
            <p className="text-sm text-[#9E8E78] leading-relaxed font-sans">
              New species are discovered every month. CT scanning reveals hidden structures, rewriting dinosaur biology.
            </p>
          </div>
        </motion.div>

        {/* CTA section - Button-in-button design */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 1 }}
          className="mt-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-t border-[#F5F2EA]/15 pt-12"
        >
          <p className="font-serif text-lg text-[#E8E0D0] italic max-w-md">
            The geological record is open. Explore the catalog of specimens compiled by the curatorial team.
          </p>
          <button
            onClick={handleExplore}
            className="group flex items-center gap-5 bg-[#C4903A] hover:bg-[#C4903A]/90 active:scale-[0.98] text-[#050505] pl-6 pr-3 py-3 rounded-full transition-all duration-300 font-mono tracking-widest text-[10px] uppercase cursor-pointer shadow-lg"
          >
            <span>Explore Specimen Archive</span>
            <div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center transition-all duration-300 transform group-hover:translate-x-1">
              <ArrowRight size={14} className="stroke-[2px] text-[#050505]" />
            </div>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
