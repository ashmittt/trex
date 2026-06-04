import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function LegacySection() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen bg-[#F5F2EA] text-[#1A1614] border-t border-[#1A1614]/15 p-6 md:p-16 flex flex-col justify-center overflow-hidden">
      {/* Background Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none opacity-[0.02] text-mega font-bold uppercase text-[#1A1614] z-0">
        Legacy
      </div>

      <div className="max-w-5xl mx-auto w-full relative z-10 flex flex-col gap-12">
        <div>
          <span className="text-[13px] font-mono tracking-[0.4em] text-[#D35400] uppercase block mb-4">
            STAGE 09 // MODERN CONTINUITY
          </span>
          <h2
            className="font-serif font-normal tracking-tight text-[#1A1614] leading-none"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
          >
            The Story <br />
            <span className="font-cursive text-[#D35400] lowercase tracking-normal text-4xl md:text-7xl block mt-2">Continues</span>
          </h2>
        </div>

        {/* Legacy Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pillar 1 */}
          <div className="border border-[#1A1614]/10 bg-[#FAF8F5] p-8 flex flex-col gap-4">
            <span className="text-[14px] font-mono text-[#D35400] font-bold uppercase">[ L-01 ] Living Theropods</span>
            <h3 className="font-serif text-[22px] font-normal leading-tight">The Modern Skies</h3>
            <p className="text-[16px] text-[#1A1614]/75 leading-relaxed font-serif">
              Dinosaurs did not disappear. A single branch of avian theropods survived the impact winter. Today, over 10,000 species of birds carry on the lineage.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="border border-[#1A1614]/10 bg-[#FAF8F5] p-8 flex flex-col gap-4">
            <span className="text-[14px] font-mono text-[#D35400] font-bold uppercase">[ L-02 ] The Stone Record</span>
            <h3 className="font-serif text-[22px] font-normal leading-tight">The Lithosphere Archive</h3>
            <p className="text-[16px] text-[#1A1614]/75 leading-relaxed font-serif">
              Fossilization is an extreme rarity. Only a fraction of one percent of all prehistoric life has left a record in stone, waiting to be read.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="border border-[#1A1614]/10 bg-[#FAF8F5] p-8 flex flex-col gap-4">
            <span className="text-[14px] font-mono text-[#D35400] font-bold uppercase">[ L-03 ] Current Research</span>
            <h3 className="font-serif text-[22px] font-normal leading-tight">Active Discoveries</h3>
            <p className="text-[16px] text-[#1A1614]/75 leading-relaxed font-serif">
              Every month, new fossil sites are discovered, and modern CT scans reveal new structural details, rewriting our understanding of dinosaur biology.
            </p>
          </div>
        </div>

        {/* CTA to Gallery */}
        <div className="border-t border-[#1A1614]/15 pt-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mt-4">
          <p className="text-[18px] text-[#1A1614]/80 leading-relaxed font-serif max-w-md">
            The geological record is open. Explore the catalog of specimens compiled by the curatorial team.
          </p>
          <button
            onClick={() => navigate('/exhibits')}
            className="group flex items-center gap-4 bg-[#1A1614] border border-[#1A1614] text-[#FAF8F5] px-8 py-4 hover:bg-transparent hover:text-[#1A1614] transition-all duration-300 font-mono tracking-widest text-xs uppercase cursor-pointer"
          >
            Explore Specimen Archive
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
