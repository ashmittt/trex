import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ArrowRight, MapPin } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { dinosaursData } from '../data/dinosaurs';
import { hallsData } from '../data/halls';
import type { Dinosaur } from '../types';

type DietFilter = 'all' | 'carnivore' | 'herbivore';
type EraFilter = 'all' | 'Triassic' | 'Jurassic' | 'Cretaceous';

const dietLabels: Record<DietFilter, string> = {
  all: 'All Diets',
  carnivore: 'Carnivore Specimen',
  herbivore: 'Herbivore Specimen',
};

const dietColors: Record<string, { bg: string; text: string; border: string }> = {
  carnivore: { bg: 'bg-[#8C3A2D]/15', text: 'text-[#8C3A2D]', border: 'border-[#8C3A2D]/30' },
  herbivore: { bg: 'bg-[#A07C4F]/15', text: 'text-[#A07C4F]', border: 'border-[#A07C4F]/30' },
  omnivore: { bg: 'bg-[#A9A295]/15', text: 'text-[#A9A295]', border: 'border-[#A9A295]/30' },
};

function SupportingCard({ dinosaur, index }: { dinosaur: Dinosaur; index: number }) {
  const navigate = useNavigate();
  const dc = dietColors[dinosaur.diet] || { bg: 'bg-[#A9A295]/15', text: 'text-[#A9A295]', border: 'border-[#A9A295]/30' };

  // Make unique archive ID based on name length and era
  const archiveNum = `NHM-${dinosaur.name.substring(0, 3).toUpperCase()}-${dinosaur.weight.replace(/[^0-9]/g, '') || '042'}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.05 }}
      className="group relative bg-[#0a0a0a] border border-[#A07C4F]/10 p-6 flex flex-col justify-between hover:border-[#A07C4F]/30 transition-all duration-300 cursor-pointer"
      onClick={() => navigate(`/exhibits/${dinosaur.slug}`)}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/exhibits/${dinosaur.slug}`)}
      tabIndex={0}
      role="button"
      aria-label={`View supporting specimen ${dinosaur.name}`}
    >
      <div>
        {/* Archival metadata line */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-[14px] font-mono tracking-widest text-[#A9A295] uppercase">
            {archiveNum}
          </span>
          <span className="text-[14px] font-mono tracking-widest text-[#A9A295] uppercase">
            {dinosaur.era}
          </span>
        </div>

        {/* Small inline image */}
        <div className="h-28 flex items-center justify-center bg-[#050505] border border-[#A07C4F]/5 mb-4 overflow-hidden relative">
          <img
            src={dinosaur.image}
            alt={dinosaur.name}
            loading="lazy"
            className="h-24 object-contain mix-blend-lighten opacity-50 group-hover:opacity-85 group-hover:scale-105 transition-all duration-500"
          />
        </div>

        <span className={`inline-block text-[14px] font-mono tracking-widest uppercase px-2 py-0.5 mb-2 border ${dc.bg} ${dc.text} ${dc.border}`}>
          {dinosaur.diet}
        </span>
        <h4 className="font-normal text-[#F5F2EA] text-[26px] group-hover:text-[#A07C4F] transition-colors duration-200">
          {dinosaur.name}
        </h4>
        <p className="text-[14px] font-mono tracking-widest text-[#A9A295] uppercase mt-0.5">
          {dinosaur.period}
        </p>
        <p className="text-[18px] text-[#D8D1C2] mt-3 line-clamp-2 leading-relaxed">
          {dinosaur.description}
        </p>
      </div>

      <div className="flex items-center gap-2 text-[#A9A295] group-hover:text-[#F5F2EA] transition-colors duration-300 mt-6">
        <span className="text-[14px] font-mono tracking-widest uppercase">Archive Entry</span>
        <span className="w-3 h-[1px] bg-current inline-block group-hover:w-5 transition-all duration-300" />
      </div>
    </motion.article>
  );
}

export default function ExhibitsPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [dietFilter, setDietFilter] = useState<DietFilter>('all');
  const [eraFilter, setEraFilter] = useState<EraFilter>('all');
  const [activeHallId, setActiveHallId] = useState('theropods');

  // Sync state if user redirected with filters from another page
  useEffect(() => {
    const dietParam = searchParams.get('diet');
    if (dietParam === 'carnivore' || dietParam === 'herbivore') {
      setDietFilter(dietParam);
      // Auto switch hall if the centerpiece or major components match
      if (dietParam === 'herbivore') {
        setActiveHallId('sauropods'); // Herbivores dominate sauropod/armoured
      } else {
        setActiveHallId('theropods');
      }
    }
  }, [searchParams]);

  // Find active hall configuration
  const activeHall = useMemo(() => {
    return hallsData.find((h) => h.id === activeHallId) || hallsData[0];
  }, [activeHallId]);

  // Find centerpiece details
  const centerpiece = useMemo(() => {
    return dinosaursData.find((d) => d.slug === activeHall.centerpieceSlug);
  }, [activeHall]);

  // Find supporting specimens details
  const supportingSpecimens = useMemo(() => {
    return activeHall.supportingSlugs
      .map((slug) => dinosaursData.find((d) => d.slug === slug))
      .filter((d): d is Dinosaur => !!d);
  }, [activeHall]);

  // Apply search/diet/era filtering exclusively to supporting items
  const filteredSupporting = useMemo(() => {
    return supportingSpecimens.filter((d) => {
      const matchesSearch = d.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDiet = dietFilter === 'all' || d.diet === dietFilter;
      const matchesEra = eraFilter === 'all' || d.era === eraFilter;
      return matchesSearch && matchesDiet && matchesEra;
    });
  }, [supportingSpecimens, searchQuery, dietFilter, eraFilter]);

  const clearFilters = () => {
    setSearchQuery('');
    setDietFilter('all');
    setEraFilter('all');
  };

  // Master stats
  const totalCount = dinosaursData.length;
  const carnivoreCount = dinosaursData.filter((d) => d.diet === 'carnivore').length;
  const herbivoreCount = dinosaursData.filter((d) => d.diet === 'herbivore').length;

  return (
    <main className="min-h-screen bg-[#050505] text-[#F5F2EA] overflow-x-hidden relative">
      <title>Exhibits — Natural History Museum</title>

      <PageHeader />

      {/* ── HEADER ── */}
      <section className="px-6 md:px-16 pt-12 pb-0 border-b border-[#A07C4F]/10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 pb-16"
        >
          <div>
            <span className="text-[14px] font-mono tracking-[0.3em] uppercase text-[#A07C4F] block mb-4">
              [ 02 ] Permanent Exhibition Wings
            </span>
            <h1
              className="font-normal tracking-tight text-[#F5F2EA]"
              style={{ fontSize: 'clamp(4rem, 7vw, 6.8rem)', lineHeight: 1.0 }}
            >
              THE ANCIENT<br />COLLECTION
            </h1>
          </div>
          <div className="md:text-right max-w-xs">
            <p className="text-[#D8D1C2] leading-relaxed mb-2" style={{ fontSize: '18px' }}>
              Explore {totalCount} permanent specimens categorized across five thematic wings, spanning 190 million years of history.
            </p>
            <p className="text-[14px] font-mono tracking-widest text-[#A9A295] uppercase">
              Est. 1887 · Curatorial Registry
            </p>
          </div>
        </motion.div>

        {/* Collection Statistics Strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 border-t border-[#A07C4F]/10"
          aria-label="Collection stats"
        >
          {[
            { value: String(totalCount), label: 'Total Catalogued' },
            { value: String(carnivoreCount), label: 'Theropoda & Carnivores' },
            { value: String(herbivoreCount), label: 'Herbivorous Giants' },
            { value: '5 Wings', label: 'Permanent Halls' },
          ].map(({ value, label }, i) => (
            <div
              key={label}
              className={`px-6 py-6 flex flex-col gap-1 ${i < 3 ? 'border-r border-[#A07C4F]/10' : ''}`}
            >
              <span className="font-semibold text-[#F5F2EA]" style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)', lineHeight: 1.1 }}>
                {value}
              </span>
              <span className="text-[14px] font-mono tracking-widest uppercase text-[#A9A295]">{label}</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── WING SELECTION / GATES ── */}
      <section className="border-b border-[#A07C4F]/10 bg-[#070707]/40 relative z-10" aria-label="Hall gateways">
        <div className="grid grid-cols-2 md:grid-cols-5 divide-x divide-y md:divide-y-0 divide-[#A07C4F]/10">
          {hallsData.map((wing) => {
            const isActive = activeHallId === wing.id;
            return (
              <button
                key={wing.id}
                onClick={() => {
                  setActiveHallId(wing.id);
                  clearFilters();
                }}
                aria-pressed={isActive}
                className={`flex flex-col items-start text-left p-6 md:p-8 transition-all duration-300 relative
                  ${isActive ? 'bg-[#0a0a0a]' : 'hover:bg-[#0c0c0c]/40'}
                  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#A07C4F]`}
              >
                <span className="text-[14px] font-mono tracking-widest text-[#A07C4F] uppercase mb-3 block">
                  {wing.label}
                </span>
                <h3
                  className={`font-normal tracking-tight mb-2 transition-colors duration-200 ${isActive ? 'text-[#F5F2EA]' : 'text-[#A9A295]'}`}
                  style={{ fontSize: '24px' }}
                >
                  {wing.name}
                </h3>
                <p className="text-[15px] text-[#A9A295] line-clamp-2 leading-relaxed">
                  {wing.subtitle}
                </p>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#A07C4F]" />
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* ── ACTIVE HALL ZONE ── */}
      <AnimatePresence mode="wait">
        <motion.section
          key={activeHall.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative min-h-[500px]"
          aria-label={`${activeHall.name} Exhibition`}
        >
          {/* GEOLOGICAL WATERMARK TEXT */}
          <div className="absolute top-12 left-1/2 -translate-x-1/2 w-full text-center pointer-events-none select-none z-0">
            <span className="text-[#F5F2EA]/[0.11] font-bold tracking-[0.2em] uppercase text-[15vw] leading-none block">
              {activeHall.eraWatermark}
            </span>
          </div>

          <div className="relative z-10">
            {/* 1. CINEMATIC HALL ENTRY INTRO */}
            <div className="px-6 md:px-16 pt-24 pb-16 border-b border-[#A07C4F]/10">
              <div className="max-w-3xl">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-[14px] font-mono tracking-[0.3em] uppercase text-[#A07C4F]">
                    EXHIBITION SPACE {activeHall.label.toUpperCase()}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A07C4F]/50" />
                  <span className="text-[14px] font-mono tracking-widest uppercase text-[#A9A295]">
                    {activeHall.geologicalEra}
                  </span>
                </div>

                <h2
                  className="font-normal tracking-tight text-[#F5F2EA] mb-2 uppercase"
                  style={{ fontSize: 'clamp(2.8rem, 5vw, 4.5rem)', lineHeight: 1.0 }}
                >
                  {activeHall.name}
                </h2>
                <p className="text-[16px] font-mono tracking-widest text-[#A07C4F] uppercase mb-8">
                  {activeHall.subtitle} · {activeHall.eraRange}
                </p>

                {/* Curator Statement block */}
                <div className="border-l-2 border-[#A07C4F]/30 pl-6 my-8">
                  <span className="text-[14px] font-mono tracking-widest uppercase text-[#A07C4F] block mb-2">
                    Curatorial Overview
                  </span>
                  <p className="text-[#D8D1C2] italic leading-relaxed text-[18px] max-w-xl">
                    "{activeHall.curatorStatement}"
                  </p>
                </div>
              </div>
            </div>

            {/* 2. FEATURED CENTERPIECE SPECIMEN SHOWCASE */}
            {centerpiece && (
              <div className="border-b border-[#A07C4F]/10 bg-[#0a0a0a]/30">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">

                  {/* Left Metadata Column */}
                  <div className="lg:col-span-5 p-8 md:p-16 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#A07C4F]/10">
                    <div>
                      <div className="flex items-center gap-2 mb-8">
                        <span className="w-2 h-2 rounded-full bg-[#8C3A2D] animate-pulse" />
                        <span className="text-[14px] font-mono tracking-widest uppercase text-[#A9A295]">
                          Hall Centerpiece Specimen
                        </span>
                      </div>

                      <span className="text-[14px] font-mono tracking-widest uppercase text-[#A07C4F]">
                        {activeHall.geologicalEra}
                      </span>
                      <h3
                        className="font-normal tracking-tight text-[#F5F2EA] mt-2 mb-6"
                        style={{ fontSize: 'clamp(2.5rem, 4.5vw, 3.8rem)', lineHeight: 1.1 }}
                      >
                        {centerpiece.name.toUpperCase()}
                      </h3>

                      {/* Curator annotations */}
                      <div className="space-y-4 mb-8">
                        <div>
                          <span className="text-[14px] font-mono tracking-widest uppercase text-[#A07C4F] block mb-1">
                            Archival Identifier
                          </span>
                          <span className="text-[16px] font-mono text-[#F5F2EA]">{activeHall.archiveId}</span>
                        </div>
                        <div>
                          <span className="text-[14px] font-mono tracking-widest uppercase text-[#A07C4F] block mb-1">
                            Recovery Coordinates
                          </span>
                          <span className="text-[16px] font-mono text-[#D8D1C2] flex items-center gap-1.5">
                            <MapPin size={12} className="text-[#A07C4F]" />
                            {activeHall.coordinates}
                          </span>
                        </div>
                        <div>
                          <span className="text-[14px] font-mono tracking-widest uppercase text-[#A07C4F] block mb-1">
                            Discovery Site & Year
                          </span>
                          <span className="text-[16px] text-[#D8D1C2]">{activeHall.discoveryYear}</span>
                        </div>
                      </div>

                      <p className="text-[18px] text-[#A9A295] leading-relaxed mb-8 max-w-sm">
                        {centerpiece.description}
                      </p>
                    </div>

                    <button
                      onClick={() => navigate(`/exhibits/${centerpiece.slug}`)}
                      aria-label={`Enter detailed dossier on ${centerpiece.name}`}
                      className="group flex items-center gap-3 border border-[#A07C4F]/20 bg-[#0a0a0a] px-6 py-3 self-start hover:border-[#A07C4F] hover:bg-[#A07C4F]/10 transition-colors duration-300"
                    >
                      <span className="text-[14px] font-mono tracking-widest uppercase text-[#D8D1C2] group-hover:text-[#F5F2EA]">Access Core Dossier</span>
                      <ArrowRight size={14} className="text-[#A07C4F] group-hover:translate-x-1 transition-transform duration-200" />
                    </button>
                  </div>

                  {/* Right Image/Vibe Column */}
                  <div className="lg:col-span-7 h-[400px] lg:h-auto min-h-[450px] relative flex items-center justify-center p-8 bg-black overflow-hidden">
                    {/* Atmospheric grid pattern */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#A07C4F_1px,transparent_1px),linear-gradient(to_bottom,#A07C4F_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.03] pointer-events-none" />

                    {/* Oversized background text */}
                    <span className="absolute bottom-6 right-6 font-mono text-[14px] tracking-widest text-[#A07C4F]/40 uppercase">
                      Specimen Registry No: {activeHall.archiveId}
                    </span>

                    {/* Dominant centerpiece image */}
                    <img
                      src={centerpiece.heroImage || centerpiece.image}
                      alt={centerpiece.name}
                      className="max-h-[380px] lg:max-h-[450px] object-contain mix-blend-lighten relative z-10 filter drop-shadow-[0_10px_30px_rgba(160,124,79,0.1)]
                        hover:scale-102 transition-transform duration-700 ease-out"
                    />

                    {/* Archival corner markers */}
                    <div className="absolute top-6 left-6 w-4 h-4 border-t border-l border-[#A07C4F]/25" />
                    <div className="absolute top-6 right-6 w-4 h-4 border-t border-r border-[#A07C4F]/25" />
                    <div className="absolute bottom-6 left-6 w-4 h-4 border-b border-l border-[#A07C4F]/25" />
                    <div className="absolute bottom-6 right-6 w-4 h-4 border-b border-r border-[#A07C4F]/25" />
                  </div>

                </div>
              </div>
            )}

            {/* 3. SUPPORTING ARCHIVE SECTION */}
            {supportingSpecimens.length > 0 && (
              <div className="px-6 md:px-16 py-20">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                  <div>
                    <span className="text-[14px] font-mono tracking-widest uppercase text-[#A07C4F] block mb-2">
                      [ 02-0{supportingSpecimens.length + 1} ]
                    </span>
                    <h3 className="font-normal text-[#F5F2EA] uppercase text-2xl tracking-tight">
                      Supporting Wing Specimens
                    </h3>
                    <p className="text-[14px] font-mono tracking-widest text-[#A9A295] uppercase mt-0.5">
                      Archival specimens in {activeHall.name}
                    </p>
                  </div>

                  {/* Subtle Filter Console */}
                  <div className="flex flex-wrap gap-4 items-center">
                    <div className="relative max-w-[200px] w-full">
                      <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#A9A295]" />
                      <input
                        type="search"
                        placeholder="Search wing..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        aria-label="Filter wing specimens"
                        className="w-full bg-[#0a0a0a] border border-[#A07C4F]/20 pl-8 pr-3 py-1.5 text-[14px] font-mono tracking-wider text-[#F5F2EA] placeholder-[#A9A295]/40
                          focus:outline-none focus:border-[#A07C4F] transition-colors duration-200"
                      />
                    </div>

                    <div className="flex gap-1.5" role="group" aria-label="Filter supporting specimens by diet">
                      {(Object.keys(dietLabels) as DietFilter[]).map((d) => (
                        <button
                          key={d}
                          onClick={() => setDietFilter(d)}
                          aria-pressed={dietFilter === d}
                          className={`text-[13px] font-mono tracking-widest uppercase px-2.5 py-1.5 border transition-all duration-200 cursor-pointer
                            ${dietFilter === d ? 'border-[#A07C4F] text-[#F5F2EA] bg-[#A07C4F]/10' : 'border-[#A07C4F]/10 text-[#A9A295] hover:border-[#A07C4F]/30 hover:text-[#D8D1C2]'}`}
                        >
                          {d === 'all' ? 'All' : d}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {filteredSupporting.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredSupporting.map((spec, i) => (
                      <SupportingCard key={spec.slug} dinosaur={spec} index={i} />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-[#A07C4F]/20">
                    <p className="text-[14px] font-mono tracking-widest uppercase text-[#A07C4F] mb-2">
                      No matching supporting specimens in this wing
                    </p>
                    <button
                      onClick={clearFilters}
                      className="text-[14px] font-mono tracking-widest uppercase text-[#A9A295] hover:text-[#F5F2EA] transition-colors duration-200 underline"
                    >
                      Reset Console
                    </button>
                  </div>
                )}
              </div>
            )}

            {supportingSpecimens.length === 0 && (
              <div className="px-6 md:px-16 py-20 text-center border-t border-[#A07C4F]/10 bg-[#0a0a0a]/10">
                <p className="text-[14px] font-mono tracking-widest uppercase text-[#A07C4F]">
                  No additional supporting specimens catalogued in this wing.
                </p>
                <p className="text-[15px] text-[#A9A295] mt-2">
                  Excavations active in smoky hill chalk. Dossiers pending validation.
                </p>
              </div>
            )}

          </div>
        </motion.section>
      </AnimatePresence>

      {/* ── FOOTER ── */}
      <div className="px-8 py-8 border-t border-[#A07C4F]/15 flex items-center justify-between relative z-10 bg-[#050505]">
        <p className="font-mono tracking-widest text-[#A9A295] uppercase" style={{ fontSize: '12px' }}>
          NATURAL HISTORY MUSEUM — EXHIBITS REGISTRY (C) 2026
        </p>
        <p className="font-mono tracking-widest text-[#A9A295]/80 uppercase hidden md:block" style={{ fontSize: '12px' }}>
          {totalCount} REGISTRIES · 5 WINGS · EST. 1887
        </p>
      </div>
    </main>
  );
}
