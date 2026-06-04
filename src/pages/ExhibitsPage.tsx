import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ArrowRight, MapPin } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { dinosaursData } from '../data/dinosaurs';
import { hallsData } from '../data/halls';
import type { Dinosaur } from '../types';

type DietFilter = 'all' | 'carnivore' | 'herbivore';

const dietLabels: Record<DietFilter, string> = {
  all: 'All Diets',
  carnivore: 'Carnivore Specimen',
  herbivore: 'Herbivore Specimen',
};

// Museara card themes based on the video
const cardThemes = [
  {
    cardBg: 'bg-[#F5F2EA] text-[#151210] border-[#151210]/15',
    titleColor: 'text-[#151210] font-serif font-normal',
    descColor: 'text-[#4A3E3D] font-mono',
    tagBg: 'bg-[#D35400] text-[#F5F2EA] border-[#D35400]/20',
    backdrop: 'bg-[#E8C547]/30',
    labelColor: 'text-[#7d6f66] font-mono',
    blendMode: 'mix-blend-multiply opacity-90',
  },
  {
    cardBg: 'bg-[#E8C547] text-[#151210] border-[#151210]/15',
    titleColor: 'text-[#151210] font-serif font-normal',
    descColor: 'text-[#3A2F2D] font-mono',
    tagBg: 'bg-[#151210] text-[#E8C547] border-[#151210]/30',
    backdrop: 'bg-[#D35400]/30',
    labelColor: 'text-[#151210]/60 font-mono',
    blendMode: 'mix-blend-multiply opacity-90',
  },
  {
    cardBg: 'bg-[#D35400] text-[#F5F2EA] border-transparent',
    titleColor: 'text-[#F5F2EA] font-serif font-normal',
    descColor: 'text-[#FBEEE6] font-mono',
    tagBg: 'bg-[#151210] text-[#F5F2EA] border-[#151210]/30',
    backdrop: 'bg-[#E8C547]/30',
    labelColor: 'text-[#FBEEE6]/80 font-mono',
    blendMode: 'mix-blend-lighten opacity-85',
  },
  {
    cardBg: 'bg-[#1A1614] text-[#F5F2EA] border-[#F5F2EA]/10',
    titleColor: 'text-[#F5F2EA] font-serif font-normal',
    descColor: 'text-[#A9A295] font-mono',
    tagBg: 'bg-[#E8C547] text-[#151210] border-[#E8C547]/20',
    backdrop: 'bg-[#8C3A2D]/40',
    labelColor: 'text-[#A07C4F] font-mono',
    blendMode: 'mix-blend-lighten opacity-75',
  },
];

function SupportingCard({ dinosaur, index }: { dinosaur: Dinosaur; index: number }) {
  const navigate = useNavigate();
  const theme = cardThemes[index % cardThemes.length];
  
  // Make unique archive ID based on name length and era
  const archiveNum = `CAT. ${dinosaur.name.substring(0, 3).toUpperCase()}-${dinosaur.weight.replace(/[^0-9]/g, '') || '042'}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.05 }}
      className={`group relative p-6 flex flex-col justify-between border transition-all duration-300 cursor-pointer ${theme.cardBg} hover:scale-[1.02]`}
      onClick={() => navigate(`/exhibits/${dinosaur.slug}`)}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/exhibits/${dinosaur.slug}`)}
      tabIndex={0}
      role="button"
      aria-label={`View supporting specimen ${dinosaur.name}`}
    >
      <div>
        {/* Archival metadata line */}
        <div className="flex justify-between items-center mb-4">
          <span className={`text-[13px] tracking-widest uppercase ${theme.labelColor}`}>
            {archiveNum}
          </span>
          <span className={`text-[13px] tracking-widest uppercase ${theme.labelColor}`}>
            {dinosaur.era}
          </span>
        </div>

        {/* Small inline image with backdrop block */}
        <div className="h-32 flex items-center justify-center bg-black/5 relative mb-4 overflow-visible">
          {/* Colored backdrop block bleeding/aligned like the video */}
          <div className={`absolute w-[45%] h-[60%] ${theme.backdrop} rounded-sm rotate-3 group-hover:rotate-6 transition-transform duration-300`} />
          <img
            src={dinosaur.image}
            alt={dinosaur.name}
            loading="lazy"
            className={`h-28 object-contain relative z-10 group-hover:scale-110 transition-all duration-500 ${theme.blendMode}`}
          />
        </div>

        <span className={`inline-block text-[12px] font-mono tracking-widest uppercase px-2 py-0.5 mb-2 border ${theme.tagBg}`}>
          {dinosaur.diet}
        </span>

        {/* Serif title with cursive highlight */}
        <h4 className={`text-[28px] leading-tight mb-1 ${theme.titleColor}`}>
          {dinosaur.name}{' '}
          <span className="font-script text-[1.3em] lowercase text-[#D35400] group-hover:text-[#E8C547] transition-colors block mt-1">
            {dinosaur.diet === 'carnivore' ? 'predator' : 'herbivore'}
          </span>
        </h4>

        {/* Typewriter description */}
        <p className={`text-[15px] mt-4 leading-relaxed line-clamp-2 ${theme.descColor}`}>
          {dinosaur.description}
        </p>
      </div>

      <div className={`flex items-center gap-2 mt-6 ${theme.labelColor} group-hover:text-[#E8C547] transition-colors duration-300`}>
        <span className="text-[13px] tracking-widest uppercase">Inspect Record</span>
        <span className="w-4 h-[1px] bg-current inline-block group-hover:w-6 transition-all duration-300" />
      </div>
    </motion.article>
  );
}

export default function ExhibitsPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [dietFilter, setDietFilter] = useState<DietFilter>('all');
  const [activeHallId, setActiveHallId] = useState('theropods');

  // Sync state if user redirected with filters from another page
  useEffect(() => {
    const dietParam = searchParams.get('diet');
    if (dietParam === 'carnivore' || dietParam === 'herbivore') {
      setDietFilter(dietParam);
      if (dietParam === 'herbivore') {
        setActiveHallId('sauropods');
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

  // Apply search/diet filtering exclusively to supporting items
  const filteredSupporting = useMemo(() => {
    return supportingSpecimens.filter((d) => {
      const matchesSearch = d.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDiet = dietFilter === 'all' || d.diet === dietFilter;
      return matchesSearch && matchesDiet;
    });
  }, [supportingSpecimens, searchQuery, dietFilter]);

  const clearFilters = () => {
    setSearchQuery('');
    setDietFilter('all');
  };

  const totalCount = dinosaursData.length;

  return (
    <main className="min-h-screen bg-[#151210] text-[#F5F2EA] overflow-x-hidden relative">
      <title>Exhibits — Natural History Museum</title>

      <PageHeader />

      {/* ── HEADER ── */}
      <section className="px-6 md:px-16 pt-12 pb-0 border-b border-[#F5F2EA]/10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 pb-16"
        >
          <div>
            <span className="text-[14px] font-mono tracking-[0.3em] uppercase text-[#E8C547] block mb-4">
              [ 02 ] Permanent Exhibition Wings
            </span>
            <h1
              className="font-serif font-normal tracking-tight text-[#F5F2EA]"
              style={{ fontSize: 'clamp(3.5rem, 6.5vw, 6.5rem)', lineHeight: 1.05 }}
            >
              Explore our — <br />
              <span className="font-script text-[#E8C547] text-[1.4em] lowercase normal-case italic block md:inline-block md:translate-y-2 mt-1">treasures</span> of history
            </h1>
          </div>
          <div className="md:text-right max-w-xs font-mono">
            <p className="text-[#D8D1C2] leading-relaxed mb-3 text-[16px]">
              Explore {totalCount} permanent specimens categorized across five thematic wings, spanning 190 million years of history.
            </p>
            <p className="text-[14px] tracking-widest text-[#A9A295] uppercase">
              12.IDP-3838 — EST. 1887
            </p>
          </div>
        </motion.div>
      </section>

      {/* ── TICKER SCROLLING BANNER 1 (Like in the video) ── */}
      <div className="w-full bg-[#E8C547] text-[#151210] py-3.5 overflow-hidden border-y border-[#151210]/20 relative z-10">
        <div className="animate-ticker flex gap-12 font-mono uppercase tracking-widest text-[14px] font-bold">
          <span>✦ ANCIENT RECORDS MUSEARA EXHIBITION ✦ EXPLORE SPECIMEN ARCHIVE ✦ GEOLOGICAL DEEP TIME DOSSIERS ✦</span>
          <span>✦ ANCIENT RECORDS MUSEARA EXHIBITION ✦ EXPLORE SPECIMEN ARCHIVE ✦ GEOLOGICAL DEEP TIME DOSSIERS ✦</span>
        </div>
      </div>

      {/* ── WING SELECTION ── */}
      <section className="border-b border-[#F5F2EA]/10 bg-[#1A1614]/60 relative z-10" aria-label="Hall gateways">
        <div className="grid grid-cols-2 md:grid-cols-5 divide-x divide-y md:divide-y-0 divide-[#F5F2EA]/10 border-b border-[#F5F2EA]/10">
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
                className={`flex flex-col items-start text-left p-6 md:p-8 transition-all duration-300 relative cursor-pointer
                  ${isActive ? 'bg-[#151210] text-[#E8C547]' : 'hover:bg-[#1a1614]/80 text-[#D8D1C2]'}
                  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E8C547]`}
              >
                <span className="text-[13px] font-mono tracking-widest text-[#E8C547] uppercase mb-3 block">
                  {wing.label}
                </span>
                <h3
                  className="font-serif font-normal tracking-tight mb-2 transition-colors duration-200"
                  style={{ fontSize: '24px' }}
                >
                  {wing.name}
                </h3>
                <p className="text-[14px] font-mono text-[#A9A295] line-clamp-2 leading-relaxed">
                  {wing.subtitle}
                </p>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#E8C547]" />
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
            <span className="text-[#F5F2EA]/[0.05] font-bold tracking-[0.25em] uppercase text-[15vw] leading-none block">
              {activeHall.eraWatermark}
            </span>
          </div>

          <div className="relative z-10">
            {/* 1. CINEMATIC HALL ENTRY INTRO */}
            <div className="px-6 md:px-16 pt-24 pb-16 border-b border-[#F5F2EA]/10">
              <div className="max-w-3xl">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-[14px] font-mono tracking-[0.3em] uppercase text-[#E8C547]">
                    EXHIBITION SPACE {activeHall.label.toUpperCase()}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E8C547]/50" />
                  <span className="text-[14px] font-mono tracking-widest uppercase text-[#A9A295]">
                    {activeHall.geologicalEra}
                  </span>
                </div>

                <h2
                  className="font-serif font-normal tracking-tight text-[#F5F2EA] mb-2 uppercase text-[40px] md:text-[56px] leading-none"
                >
                  {activeHall.name}
                </h2>
                <p className="text-[15px] font-mono tracking-widest text-[#E8C547] uppercase mb-8">
                  {activeHall.subtitle} · {activeHall.eraRange}
                </p>

                {/* Curator Statement block */}
                <div className="border-l-2 border-[#E8C547]/40 pl-6 my-8">
                  <span className="text-[14px] font-mono tracking-widest uppercase text-[#E8C547] block mb-2">
                    Curator Notes
                  </span>
                  <p className="text-[#D8D1C2] italic leading-relaxed text-[18px] max-w-xl">
                    "{activeHall.curatorStatement}"
                  </p>
                </div>
              </div>
            </div>

            {/* 2. FEATURED CENTERPIECE SPECIMEN SHOWCASE */}
            {centerpiece && (
              <div className="border-b border-[#F5F2EA]/10 bg-[#1A1614]/30">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                  
                  {/* Left Metadata Column */}
                  <div className="lg:col-span-5 p-8 md:p-16 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#F5F2EA]/10 bg-[#151210]/40">
                    <div>
                      <div className="flex items-center gap-2 mb-8">
                        <span className="w-2 h-2 rounded-full bg-[#D35400] animate-pulse" />
                        <span className="text-[14px] font-mono tracking-widest uppercase text-[#A9A295]">
                          Hall Centerpiece Specimen
                        </span>
                      </div>

                      <span className="text-[14px] font-mono tracking-widest uppercase text-[#E8C547]">
                        {activeHall.geologicalEra}
                      </span>
                      
                      {/* Title with cursive note */}
                      <h3
                        className="font-serif font-normal tracking-tight text-[#F5F2EA] mt-2 mb-6"
                        style={{ fontSize: 'clamp(2.5rem, 4.5vw, 3.8rem)', lineHeight: 1.1 }}
                      >
                        {centerpiece.name.toUpperCase()}
                        <span className="font-script text-[0.85em] lowercase text-[#D35400] block mt-1">the focal specimen</span>
                      </h3>

                      {/* Curator annotations in Monospace */}
                      <div className="space-y-4 mb-8 border-y border-[#F5F2EA]/10 py-6 font-mono">
                        <div>
                          <span className="text-[13px] tracking-widest uppercase text-[#E8C547] block mb-1">
                            Archival Identifier
                          </span>
                          <span className="text-[16px] text-[#F5F2EA]">{activeHall.archiveId}</span>
                        </div>
                        <div>
                          <span className="text-[13px] tracking-widest uppercase text-[#E8C547] block mb-1">
                            Recovery Coordinates
                          </span>
                          <span className="text-[16px] text-[#D8D1C2] flex items-center gap-1.5">
                            <MapPin size={12} className="text-[#E8C547]" />
                            {activeHall.coordinates}
                          </span>
                        </div>
                        <div>
                          <span className="text-[13px] tracking-widest uppercase text-[#E8C547] block mb-1">
                            Discovery Site & Year
                          </span>
                          <span className="text-[16px] text-[#D8D1C2]">{activeHall.discoveryYear}</span>
                        </div>
                      </div>

                      {/* Typewriter description */}
                      <p className="text-[16px] font-mono text-[#A9A295] leading-relaxed mb-8 max-w-sm">
                        {centerpiece.description}
                      </p>
                    </div>

                    <button
                      onClick={() => navigate(`/exhibits/${centerpiece.slug}`)}
                      aria-label={`Enter detailed dossier on ${centerpiece.name}`}
                      className="group flex items-center gap-3 border border-[#E8C547]/20 bg-[#151210] px-6 py-3.5 self-start hover:border-[#E8C547] hover:bg-[#E8C547]/10 transition-all duration-300 cursor-pointer"
                    >
                      <span className="text-[14px] font-mono tracking-widest uppercase text-[#D8D1C2] group-hover:text-[#F5F2EA]">Access Core Dossier</span>
                      <ArrowRight size={14} className="text-[#E8C547] group-hover:translate-x-1 transition-transform duration-200" />
                    </button>
                  </div>

                  {/* Right Image Column with the video's architectural look */}
                  <div className="lg:col-span-7 h-[400px] lg:h-auto min-h-[480px] relative flex items-center justify-center p-8 bg-[#1A1614] overflow-hidden">
                    {/* Atmospheric grid pattern */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#E8C547_1px,transparent_1px),linear-gradient(to_bottom,#E8C547_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.03] pointer-events-none" />
                    
                    {/* Yellow/Orange backdrop block inside placeholder layout */}
                    <div className="absolute w-[60%] h-[75%] bg-[#E8C547]/5 border border-[#E8C547]/10 rounded-sm -rotate-2" />

                    <span className="absolute bottom-6 right-6 font-mono text-[13px] tracking-widest text-[#E8C547]/40 uppercase">
                      Specimen Registry No: {activeHall.archiveId}
                    </span>

                    {/* Dominant centerpiece image */}
                    <img
                      src={centerpiece.heroImage || centerpiece.image}
                      alt={centerpiece.name}
                      className="max-h-[380px] lg:max-h-[460px] object-contain mix-blend-lighten relative z-10 filter drop-shadow-[0_15px_40px_rgba(232,197,71,0.12)]
                        hover:scale-[1.03] transition-transform duration-700 ease-out"
                    />

                    {/* Archival corner markers */}
                    <div className="absolute top-6 left-6 w-4 h-4 border-t border-l border-[#E8C547]/25" />
                    <div className="absolute top-6 right-6 w-4 h-4 border-t border-r border-[#E8C547]/25" />
                    <div className="absolute bottom-6 left-6 w-4 h-4 border-b border-l border-[#E8C547]/25" />
                    <div className="absolute bottom-6 right-6 w-4 h-4 border-b border-r border-[#E8C547]/25" />
                  </div>

                </div>
              </div>
            )}

            {/* 3. SUPPORTING ARCHIVE SECTION */}
            {supportingSpecimens.length > 0 && (
              <div className="px-6 md:px-16 py-20">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                  <div>
                    <span className="text-[14px] font-mono tracking-widest uppercase text-[#E8C547] block mb-2">
                      [ 02-0{supportingSpecimens.length + 1} ]
                    </span>
                    <h3 className="font-serif text-[#F5F2EA] uppercase text-[36px] tracking-tight">
                      Supporting Wing Specimens
                    </h3>
                    <p className="text-[14px] font-mono tracking-widest text-[#A9A295] uppercase mt-0.5">
                      Archival records catalogued in {activeHall.name}
                    </p>
                  </div>

                  {/* Filter Console */}
                  <div className="flex flex-wrap gap-4 items-center">
                    <div className="relative max-w-[200px] w-full">
                      <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#A9A295]" />
                      <input
                        type="search"
                        placeholder="Search records..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        aria-label="Filter wing specimens"
                        className="w-full bg-[#1A1614] border border-[#E8C547]/20 pl-8 pr-3 py-1.5 text-[14px] font-mono tracking-wider text-[#F5F2EA] placeholder-[#A9A295]/40
                          focus:outline-none focus:border-[#E8C547] transition-colors duration-200"
                      />
                    </div>

                    <div className="flex gap-1.5" role="group" aria-label="Filter supporting specimens by diet">
                      {(Object.keys(dietLabels) as DietFilter[]).map((d) => (
                        <button
                          key={d}
                          onClick={() => setDietFilter(d)}
                          aria-pressed={dietFilter === d}
                          className={`text-[13px] font-mono tracking-widest uppercase px-2.5 py-1.5 border transition-all duration-200 cursor-pointer
                            ${dietFilter === d ? 'border-[#E8C547] text-[#151210] bg-[#E8C547]' : 'border-[#E8C547]/20 text-[#A9A295] hover:border-[#E8C547]/50 hover:text-[#D8D1C2]'}`}
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
                  <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-[#E8C547]/20 font-mono">
                    <p className="text-[14px] tracking-widest uppercase text-[#E8C547] mb-2">
                      No matching records found in this wing
                    </p>
                    <button
                      onClick={clearFilters}
                      className="text-[14px] tracking-widest uppercase text-[#A9A295] hover:text-[#F5F2EA] transition-colors duration-200 underline"
                    >
                      Reset Console
                    </button>
                  </div>
                )}
              </div>
            )}

            {supportingSpecimens.length === 0 && (
              <div className="px-6 md:px-16 py-20 text-center border-t border-[#F5F2EA]/10 bg-[#1A1614]/10 font-mono">
                <p className="text-[14px] tracking-widest uppercase text-[#E8C547]">
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
      <div className="px-8 py-8 border-t border-[#F5F2EA]/15 flex items-center justify-between relative z-10 bg-[#151210]">
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
