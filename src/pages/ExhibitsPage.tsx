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
  carnivore: { bg: 'bg-red-950/30', text: 'text-red-300', border: 'border-red-900/30' },
  herbivore: { bg: 'bg-emerald-950/30', text: 'text-emerald-300', border: 'border-emerald-900/30' },
  omnivore: { bg: 'bg-amber-950/30', text: 'text-amber-300', border: 'border-amber-900/30' },
};

function SupportingCard({ dinosaur, index }: { dinosaur: Dinosaur; index: number }) {
  const navigate = useNavigate();
  const dc = dietColors[dinosaur.diet] || { bg: 'bg-gray-900/30', text: 'text-gray-300', border: 'border-gray-800' };
  
  // Make unique archive ID based on name length and era
  const archiveNum = `NHM-${dinosaur.name.substring(0, 3).toUpperCase()}-${dinosaur.weight.replace(/[^0-9]/g, '') || '042'}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.05 }}
      className="group relative bg-[#0e0e0e] border border-gray-900 p-6 flex flex-col justify-between hover:border-gray-700 transition-all duration-300 cursor-pointer"
      onClick={() => navigate(`/exhibits/${dinosaur.slug}`)}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/exhibits/${dinosaur.slug}`)}
      tabIndex={0}
      role="button"
      aria-label={`View supporting specimen ${dinosaur.name}`}
    >
      <div>
        {/* Archival metadata line */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-[8px] font-mono tracking-widest text-gray-600 uppercase">
            {archiveNum}
          </span>
          <span className="text-[8px] font-mono tracking-widest text-gray-600 uppercase">
            {dinosaur.era}
          </span>
        </div>

        {/* Small inline image */}
        <div className="h-28 flex items-center justify-center bg-[#050505] border border-gray-950/50 mb-4 overflow-hidden relative">
          <img
            src={dinosaur.image}
            alt={dinosaur.name}
            loading="lazy"
            className="h-24 object-contain mix-blend-lighten opacity-50 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500"
          />
        </div>

        <span className={`inline-block text-[8px] font-mono tracking-widest uppercase px-2 py-0.5 mb-2 border ${dc.bg} ${dc.text} ${dc.border}`}>
          {dinosaur.diet}
        </span>
        <h4 className="font-medium text-white text-[15px] group-hover:text-gray-300 transition-colors duration-200">
          {dinosaur.name}
        </h4>
        <p className="text-[9px] font-mono tracking-widest text-gray-500 uppercase mt-0.5">
          {dinosaur.period}
        </p>
        <p className="text-[11px] text-gray-500 mt-3 line-clamp-2 leading-relaxed">
          {dinosaur.description}
        </p>
      </div>

      <div className="flex items-center gap-2 text-gray-600 group-hover:text-white transition-colors duration-300 mt-6">
        <span className="text-[9px] font-mono tracking-widest uppercase">Archive Entry</span>
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
    <main className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden relative">
      <title>Exhibits — Natural History Museum</title>

      <PageHeader />

      {/* ── HEADER ── */}
      <section className="px-6 md:px-16 pt-12 pb-0 border-b border-gray-900 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 pb-16"
        >
          <div>
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-gray-500 block mb-4">
              [ 02 ] Permanent Exhibition Wings
            </span>
            <h1
              className="font-medium tracking-tight text-white"
              style={{ fontSize: 'clamp(3rem, 5.5vw, 6rem)', lineHeight: 1.0 }}
            >
              THE ANCIENT<br />COLLECTION
            </h1>
          </div>
          <div className="md:text-right max-w-xs">
            <p className="text-gray-400 leading-relaxed mb-2" style={{ fontSize: '13px' }}>
              Explore {totalCount} permanent specimens categorized across five thematic wings, spanning 190 million years of history.
            </p>
            <p className="text-[10px] font-mono tracking-widest text-gray-600 uppercase">
              Est. 1887 · Curatorial Registry
            </p>
          </div>
        </motion.div>

        {/* Collection Statistics Strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 border-t border-gray-900"
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
              className={`px-6 py-6 flex flex-col gap-1 ${i < 3 ? 'border-r border-gray-900' : ''}`}
            >
              <span className="font-medium text-white" style={{ fontSize: 'clamp(1.4rem, 2.2vw, 2.2rem)', lineHeight: 1.1 }}>
                {value}
              </span>
              <span className="text-[9px] font-mono tracking-widest uppercase text-gray-500">{label}</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── WING SELECTION / GATES ── */}
      <section className="border-b border-gray-900 bg-[#070707] relative z-10" aria-label="Hall gateways">
        <div className="grid grid-cols-2 md:grid-cols-5 divide-x divide-y md:divide-y-0 divide-gray-900">
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
                  ${isActive ? 'bg-[#0a0a0a]' : 'hover:bg-[#0c0c0c]'}
                  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white`}
              >
                <span className="text-[8px] font-mono tracking-widest text-gray-600 uppercase mb-3 block">
                  {wing.label}
                </span>
                <h3
                  className={`font-medium tracking-tight mb-2 transition-colors duration-200 ${isActive ? 'text-white' : 'text-gray-400'}`}
                  style={{ fontSize: '15px' }}
                >
                  {wing.name}
                </h3>
                <p className="text-[10px] text-gray-600 line-clamp-2 leading-relaxed">
                  {wing.subtitle}
                </p>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-white" />
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
            <span className="text-white/[0.015] font-bold tracking-[0.2em] uppercase text-[15vw] leading-none block">
              {activeHall.eraWatermark}
            </span>
          </div>

          <div className="relative z-10">
            {/* 1. CINEMATIC HALL ENTRY INTRO */}
            <div className="px-6 md:px-16 pt-24 pb-16 border-b border-gray-900">
              <div className="max-w-3xl">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-gray-500">
                    EXHIBITION SPACE {activeHall.label.toUpperCase()}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-500" />
                  <span className="text-[9px] font-mono tracking-widest uppercase text-gray-500">
                    {activeHall.geologicalEra}
                  </span>
                </div>

                <h2
                  className="font-medium tracking-tight text-white mb-2 uppercase"
                  style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 1.0 }}
                >
                  {activeHall.name}
                </h2>
                <p className="text-[12px] font-mono tracking-widest text-gray-400 uppercase mb-8">
                  {activeHall.subtitle} · {activeHall.eraRange}
                </p>

                {/* Curator Statement block */}
                <div className="border-l-2 border-gray-800 pl-6 my-8">
                  <span className="text-[8px] font-mono tracking-widest uppercase text-gray-600 block mb-2">
                    Curatorial Overview
                  </span>
                  <p className="text-gray-400 italic leading-relaxed text-[13px] max-w-xl">
                    "{activeHall.curatorStatement}"
                  </p>
                </div>
              </div>
            </div>

            {/* 2. FEATURED CENTERPIECE SPECIMEN SHOWCASE */}
            {centerpiece && (
              <div className="border-b border-gray-900 bg-[#080808]/50">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                  
                  {/* Left Metadata Column */}
                  <div className="lg:col-span-5 p-8 md:p-16 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-gray-900">
                    <div>
                      <div className="flex items-center gap-2 mb-8">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                        <span className="text-[9px] font-mono tracking-widest uppercase text-gray-500">
                          Hall Centerpiece Specimen
                        </span>
                      </div>

                      <span className="text-[9px] font-mono tracking-widest uppercase text-gray-500">
                        {activeHall.geologicalEra}
                      </span>
                      <h3
                        className="font-medium tracking-tight text-white mt-2 mb-6"
                        style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', lineHeight: 1.1 }}
                      >
                        {centerpiece.name.toUpperCase()}
                      </h3>

                      {/* Curator annotations */}
                      <div className="space-y-4 mb-8">
                        <div>
                          <span className="text-[8px] font-mono tracking-widest uppercase text-gray-600 block mb-1">
                            Archival Identifier
                          </span>
                          <span className="text-[11px] font-mono text-gray-300">{activeHall.archiveId}</span>
                        </div>
                        <div>
                          <span className="text-[8px] font-mono tracking-widest uppercase text-gray-600 block mb-1">
                            Recovery Coordinates
                          </span>
                          <span className="text-[11px] font-mono text-gray-300 flex items-center gap-1.5">
                            <MapPin size={10} className="text-gray-500" />
                            {activeHall.coordinates}
                          </span>
                        </div>
                        <div>
                          <span className="text-[8px] font-mono tracking-widest uppercase text-gray-600 block mb-1">
                            Discovery Site & Year
                          </span>
                          <span className="text-[11px] text-gray-400">{activeHall.discoveryYear}</span>
                        </div>
                      </div>

                      <p className="text-[12px] text-gray-400 leading-relaxed mb-8 max-w-sm">
                        {centerpiece.description}
                      </p>
                    </div>

                    <button
                      onClick={() => navigate(`/exhibits/${centerpiece.slug}`)}
                      aria-label={`Enter detailed dossier on ${centerpiece.name}`}
                      className="group flex items-center gap-3 border border-gray-800 px-6 py-3 self-start hover:border-white transition-colors duration-300"
                    >
                      <span className="text-[9px] font-mono tracking-widest uppercase">Access Core Dossier</span>
                      <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform duration-200" />
                    </button>
                  </div>

                  {/* Right Image/Vibe Column */}
                  <div className="lg:col-span-7 h-[400px] lg:h-auto min-h-[450px] relative flex items-center justify-center p-8 bg-black overflow-hidden">
                    {/* Atmospheric grid pattern */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20 pointer-events-none" />
                    
                    {/* Oversized background text */}
                    <span className="absolute bottom-6 right-6 font-mono text-[9px] tracking-widest text-gray-800 uppercase">
                      Specimen Registry No: {activeHall.archiveId}
                    </span>

                    {/* Dominant centerpiece image */}
                    <img
                      src={centerpiece.heroImage || centerpiece.image}
                      alt={centerpiece.name}
                      className="max-h-[380px] lg:max-h-[450px] object-contain mix-blend-lighten relative z-10 filter drop-shadow-[0_10px_30px_rgba(255,255,255,0.05)]
                        hover:scale-102 transition-transform duration-700 ease-out"
                    />

                    {/* Archival corner markers */}
                    <div className="absolute top-6 left-6 w-4 h-4 border-t border-l border-gray-800" />
                    <div className="absolute top-6 right-6 w-4 h-4 border-t border-r border-gray-800" />
                    <div className="absolute bottom-6 left-6 w-4 h-4 border-b border-l border-gray-800" />
                    <div className="absolute bottom-6 right-6 w-4 h-4 border-b border-r border-gray-800" />
                  </div>

                </div>
              </div>
            )}

            {/* 3. SUPPORTING ARCHIVE SECTION */}
            {supportingSpecimens.length > 0 && (
              <div className="px-6 md:px-16 py-20">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                  <div>
                    <span className="text-[8px] font-mono tracking-widest uppercase text-gray-600 block mb-2">
                      [ 02-0{supportingSpecimens.length + 1} ]
                    </span>
                    <h3 className="font-medium text-white uppercase text-lg tracking-tight">
                      Supporting Wing Specimens
                    </h3>
                    <p className="text-[10px] font-mono tracking-widest text-gray-600 uppercase mt-0.5">
                      Archival specimens in {activeHall.name}
                    </p>
                  </div>

                  {/* Subtle Filter Console */}
                  <div className="flex flex-wrap gap-4 items-center">
                    <div className="relative max-w-[200px] w-full">
                      <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-600" />
                      <input
                        type="search"
                        placeholder="Search wing..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        aria-label="Filter wing specimens"
                        className="w-full bg-[#0d0d0d] border border-gray-900 pl-8 pr-3 py-1.5 text-[9px] font-mono tracking-wider text-white placeholder-gray-700
                          focus:outline-none focus:border-gray-800 transition-colors duration-200"
                      />
                    </div>

                    <div className="flex gap-1.5" role="group" aria-label="Filter supporting specimens by diet">
                      {(Object.keys(dietLabels) as DietFilter[]).map((d) => (
                        <button
                          key={d}
                          onClick={() => setDietFilter(d)}
                          aria-pressed={dietFilter === d}
                          className={`text-[8px] font-mono tracking-widest uppercase px-2.5 py-1.5 border transition-all duration-200
                            ${dietFilter === d ? 'border-gray-600 text-white bg-gray-900/50' : 'border-gray-950 text-gray-600 hover:border-gray-800 hover:text-gray-400'}`}
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
                  <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-gray-900">
                    <p className="text-[9px] font-mono tracking-widest uppercase text-gray-600 mb-2">
                      No matching supporting specimens in this wing
                    </p>
                    <button
                      onClick={clearFilters}
                      className="text-[9px] font-mono tracking-widest uppercase text-gray-500 hover:text-white transition-colors duration-200 underline"
                    >
                      Reset Console
                    </button>
                  </div>
                )}
              </div>
            )}

            {supportingSpecimens.length === 0 && (
              <div className="px-6 md:px-16 py-20 text-center border-t border-gray-900/50 bg-[#080808]/20">
                <p className="text-[10px] font-mono tracking-widest uppercase text-gray-600">
                  No additional supporting specimens catalogued in this wing.
                </p>
                <p className="text-[9px] text-gray-700 mt-2">
                  Excavations active in smoky hill chalk. Dossiers pending validation.
                </p>
              </div>
            )}

          </div>
        </motion.section>
      </AnimatePresence>

      {/* ── FOOTER ── */}
      <div className="px-8 py-8 border-t border-gray-900 flex items-center justify-between relative z-10 bg-[#0a0a0a]">
        <p className="font-mono tracking-widest text-gray-600 uppercase" style={{ fontSize: '10px' }}>
          NATURAL HISTORY MUSEUM — EXHIBITS REGISTRY (C) 2026
        </p>
        <p className="font-mono tracking-widest text-gray-700 uppercase hidden md:block" style={{ fontSize: '10px' }}>
          {totalCount} REGISTRIES · 5 WINGS · EST. 1887
        </p>
      </div>
    </main>
  );
}
