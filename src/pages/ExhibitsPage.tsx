import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { Search, X, ArrowRight } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { dinosaursData } from '../data/dinosaurs';
import type { Dinosaur } from '../types';

type DietFilter = 'all' | 'carnivore' | 'herbivore';
type EraFilter = 'all' | 'Triassic' | 'Jurassic' | 'Cretaceous';

const dietLabels: Record<DietFilter, string> = {
  all: 'All Species',
  carnivore: 'Carnivores',
  herbivore: 'Herbivores',
};

const dietColors: Record<string, { bg: string; text: string; border: string }> = {
  carnivore: { bg: 'bg-red-950/30', text: 'text-red-300', border: 'border-red-800/40' },
  herbivore: { bg: 'bg-emerald-950/30', text: 'text-emerald-300', border: 'border-emerald-800/40' },
  omnivore: { bg: 'bg-amber-950/30', text: 'text-amber-300', border: 'border-amber-800/40' },
};

// Museum Wings — organise collection into thematic halls
const museumWings = [
  {
    id: 'theropods',
    label: 'Wing I',
    name: 'Theropod Hall',
    description: 'Bipedal carnivores from the smallest raptors to the largest land predators in history.',
    count: '4 specimens',
    slugs: ['trex', 'velociraptor', 'spinosaurus', 'allosaurus'],
  },
  {
    id: 'sauropods',
    label: 'Wing II',
    name: 'Sauropod Gallery',
    description: 'The great long-necked giants — the largest animals to ever walk the surface of the Earth.',
    count: '2 specimens',
    slugs: ['brachiosaurus', 'diplodocus'],
  },
  {
    id: 'armoured',
    label: 'Wing III',
    name: 'Armoured Creatures',
    description: 'Ceratopsians, ankylosaurs, and stegosaurs — the heavily defended herbivores of the Mesozoic.',
    count: '3 specimens',
    slugs: ['triceratops', 'stegosaurus', 'ankylosaurus'],
  },
  {
    id: 'hadrosaurs',
    label: 'Wing IV',
    name: 'Hadrosaur &amp; Marginocephalia',
    description: 'Duck-billed dinosaurs and dome-headed species — the most socially complex dinosaurs known.',
    count: '2 specimens',
    slugs: ['parasaurolophus', 'pachycephalosaurus'],
  },
  {
    id: 'flying',
    label: 'Wing V',
    name: 'Flying Reptiles',
    description: 'Pterosaurs and their kin — masters of the Mesozoic skies for 160 million years.',
    count: '1 specimen',
    slugs: ['pteranodon'],
  },
];

// Featured collections — editorially curated spotlights
const featuredCollections = [
  {
    id: 'apex',
    label: 'Featured Collection',
    title: 'Apex Predators',
    subtitle: 'The largest, most powerful carnivores to ever walk the Earth.',
    slugs: ['trex', 'spinosaurus', 'allosaurus'],
    accent: 'text-red-400',
    border: 'border-red-900/30',
  },
  {
    id: 'giants',
    label: 'Featured Collection',
    title: 'The Giants',
    subtitle: 'Herbivores that grew to sizes almost impossible to comprehend.',
    slugs: ['brachiosaurus', 'diplodocus', 'ankylosaurus'],
    accent: 'text-emerald-400',
    border: 'border-emerald-900/30',
  },
  {
    id: 'last-survivors',
    label: 'Featured Collection',
    title: 'Last of Their Kind',
    subtitle: 'Species alive at the moment the asteroid struck — 66 million years ago.',
    slugs: ['trex', 'triceratops', 'ankylosaurus', 'pachycephalosaurus'],
    accent: 'text-purple-400',
    border: 'border-purple-900/30',
  },
];

function DinosaurCard({ dinosaur, index }: { dinosaur: Dinosaur; index: number }) {
  const navigate = useNavigate();
  const dc = dietColors[dinosaur.diet];

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.04 }}
      className="group relative bg-[#111] border border-gray-800 overflow-hidden cursor-pointer
        hover:border-gray-600 transition-all duration-500"
      onClick={() => navigate(`/exhibits/${dinosaur.slug}`)}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/exhibits/${dinosaur.slug}`)}
      tabIndex={0}
      role="button"
      aria-label={`View ${dinosaur.name} exhibit`}
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden bg-[#0a0a0a]">
        <img
          src={dinosaur.image}
          alt={dinosaur.name}
          loading="lazy"
          className="w-full h-full object-contain mix-blend-lighten p-6
            group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute top-4 left-4">
          <span className="text-[9px] font-mono tracking-widest uppercase text-gray-500 bg-black/60 px-2 py-1 border border-gray-800">
            {dinosaur.era}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 border-t border-gray-800">
        <span className={`inline-block text-[9px] font-mono tracking-widest uppercase px-2 py-0.5 mb-3 border ${dc.bg} ${dc.text} ${dc.border}`}>
          {dinosaur.diet}
        </span>
        <h3
          className="font-medium tracking-tight text-white mb-1 group-hover:text-gray-300 transition-colors duration-300"
          style={{ fontSize: 'clamp(1rem, 1.6vw, 1.3rem)', lineHeight: 1.2 }}
        >
          {dinosaur.name}
        </h3>
        <p className="text-[10px] font-mono tracking-widest text-gray-500 uppercase mb-4">
          {dinosaur.period} · {dinosaur.periodRange}
        </p>
        <div className="flex gap-5 mb-4">
          <div>
            <p className="text-[9px] font-mono tracking-widest uppercase text-gray-600 mb-0.5">Length</p>
            <p className="text-[12px] font-medium text-gray-300">{dinosaur.length}</p>
          </div>
          <div>
            <p className="text-[9px] font-mono tracking-widest uppercase text-gray-600 mb-0.5">Weight</p>
            <p className="text-[12px] font-medium text-gray-300">{dinosaur.weight}</p>
          </div>
        </div>
        <p className="text-[11px] text-gray-500 leading-relaxed line-clamp-2 mb-4">
          {dinosaur.description}
        </p>
        <div className="flex items-center gap-2 text-gray-500 group-hover:text-white transition-colors duration-300">
          <span className="text-[9px] font-mono tracking-widest uppercase">View Exhibit</span>
          <span className="w-4 h-[1px] bg-current inline-block transition-all duration-300 group-hover:w-6" />
        </div>
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
  const [wingFilter, setWingFilter] = useState<string>('all');

  useEffect(() => {
    const dietParam = searchParams.get('diet');
    if (dietParam === 'carnivore' || dietParam === 'herbivore') {
      setDietFilter(dietParam);
    }
  }, [searchParams]);

  const filtered = useMemo(() => {
    return dinosaursData.filter((d) => {
      const matchesSearch = d.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDiet = dietFilter === 'all' || d.diet === dietFilter;
      const matchesEra = eraFilter === 'all' || d.era === eraFilter;
      const matchesWing = wingFilter === 'all' || (museumWings.find(w => w.id === wingFilter)?.slugs.includes(d.slug) ?? false);
      return matchesSearch && matchesDiet && matchesEra && matchesWing;
    });
  }, [searchQuery, dietFilter, eraFilter, wingFilter]);

  const clearFilters = () => {
    setSearchQuery('');
    setDietFilter('all');
    setEraFilter('all');
    setWingFilter('all');
  };

  const hasActiveFilters = searchQuery || dietFilter !== 'all' || eraFilter !== 'all' || wingFilter !== 'all';

  // Collection stats
  const carnivoreCount = dinosaursData.filter(d => d.diet === 'carnivore').length;
  const herbivoreCount = dinosaursData.filter(d => d.diet === 'herbivore').length;
  const cretaceousCount = dinosaursData.filter(d => d.era === 'Cretaceous').length;
  const jurassicCount = dinosaursData.filter(d => d.era === 'Jurassic').length;

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <title>Exhibits — Natural History Museum</title>

      <PageHeader />

      {/* ── HERO ── */}
      <section className="px-6 md:px-16 pt-12 pb-0 border-b border-gray-800">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 pb-16"
        >
          <div>
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-gray-500 block mb-4">
              [ 02 ] The Collection
            </span>
            <h1
              className="font-medium tracking-tight text-white"
              style={{ fontSize: 'clamp(3rem, 6vw, 6.5rem)', lineHeight: 1.0 }}
            >
              THE ANCIENT<br />COLLECTION
            </h1>
          </div>
          <div className="md:text-right max-w-xs">
            <p className="text-gray-400 leading-relaxed mb-2" style={{ fontSize: '13px' }}>
              {dinosaursData.length} permanent specimens across five museum wings, spanning 190 million years of Mesozoic history.
            </p>
            <p className="text-[10px] font-mono tracking-widest text-gray-600 uppercase">
              Est. 1887 · Continuously Expanded
            </p>
          </div>
        </motion.div>

        {/* Collection Statistics strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 border-t border-gray-800"
          aria-label="Collection statistics"
        >
          {[
            { value: String(dinosaursData.length), label: 'Total Specimens' },
            { value: String(carnivoreCount), label: 'Carnivores' },
            { value: String(herbivoreCount), label: 'Herbivores' },
            { value: `${jurassicCount}/${cretaceousCount}`, label: 'Jurassic / Cretaceous' },
          ].map(({ value, label }, i) => (
            <div
              key={label}
              className={`px-6 py-6 flex flex-col gap-1 ${i < 3 ? 'border-r border-gray-800' : ''}`}
            >
              <span className="font-medium text-white" style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.5rem)', lineHeight: 1.1 }}>
                {value}
              </span>
              <span className="text-[9px] font-mono tracking-widest uppercase text-gray-500">{label}</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── MUSEUM WINGS ── */}
      <section className="border-b border-gray-800" aria-label="Museum wings">
        <div className="px-6 md:px-16 pt-16 pb-8">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[10px] font-mono tracking-widest uppercase text-gray-500 mb-12"
          >
            Five Permanent Wings
          </motion.h2>
        </div>
        <div className="flex flex-col">
          {museumWings.map((wing, i) => (
            <motion.button
              key={wing.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              onClick={() => setWingFilter(wingFilter === wing.id ? 'all' : wing.id)}
              aria-pressed={wingFilter === wing.id}
              className={`group flex items-center justify-between border-b border-gray-800 last:border-b-0 px-6 md:px-16 py-6 text-left transition-all duration-300
                ${wingFilter === wing.id ? 'bg-[#111]' : 'hover:bg-[#0d0d0d]'}
                focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-white`}
            >
              <div className="flex items-start gap-8 md:gap-16">
                <span className="text-[9px] font-mono tracking-widest uppercase text-gray-600 shrink-0 mt-1">{wing.label}</span>
                <div>
                  <h3
                    className={`font-medium tracking-tight transition-colors duration-300 ${wingFilter === wing.id ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}
                    style={{ fontSize: 'clamp(1rem, 2vw, 1.6rem)', lineHeight: 1.2 }}
                    dangerouslySetInnerHTML={{ __html: wing.name }}
                  />
                  <p className="text-[11px] text-gray-600 mt-1 max-w-lg">{wing.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 shrink-0 ml-4">
                <span className="text-[9px] font-mono tracking-widest uppercase text-gray-600 hidden md:block">{wing.count}</span>
                <ArrowRight
                  size={14}
                  strokeWidth={1}
                  className={`transition-all duration-300 ${wingFilter === wing.id ? 'text-white translate-x-0.5' : 'text-gray-700 group-hover:text-gray-400'}`}
                  aria-hidden="true"
                />
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      {/* ── FEATURED COLLECTIONS ── */}
      <section className="px-6 md:px-16 py-16 border-b border-gray-800" aria-label="Featured collections">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-[10px] font-mono tracking-widest uppercase text-gray-500 mb-12"
        >
          Curated Collections
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-6">
          {featuredCollections.map((col, i) => {
            const specimens = col.slugs.map(s => dinosaursData.find(d => d.slug === s)).filter(Boolean) as Dinosaur[];
            return (
              <motion.div
                key={col.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className={`border ${col.border} bg-[#0d0d0d] p-8 flex flex-col`}
              >
                <span className={`text-[9px] font-mono tracking-widest uppercase mb-4 ${col.accent}`}>
                  {col.label}
                </span>
                <h3
                  className="font-medium tracking-tight text-white mb-2"
                  style={{ fontSize: 'clamp(1.3rem, 2vw, 1.8rem)', lineHeight: 1.15 }}
                >
                  {col.title}
                </h3>
                <p className="text-[11px] text-gray-500 leading-relaxed mb-8 flex-1">{col.subtitle}</p>
                {/* Mini specimen grid */}
                <div className="flex gap-2 mb-6">
                  {specimens.slice(0, 3).map(spec => (
                    <div key={spec.slug} className="w-16 h-16 border border-gray-800 bg-black flex items-center justify-center">
                      <img
                        src={spec.image}
                        alt={spec.name}
                        loading="lazy"
                        className="w-12 h-12 object-contain mix-blend-lighten opacity-60"
                      />
                    </div>
                  ))}
                  {specimens.length > 3 && (
                    <div className="w-16 h-16 border border-gray-800 bg-black flex items-center justify-center">
                      <span className="text-[10px] font-mono text-gray-600">+{specimens.length - 3}</span>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => navigate('/exhibits')}
                  aria-label={`Browse ${col.title}`}
                  className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors duration-300 group/btn"
                >
                  <span className="text-[9px] font-mono tracking-widest uppercase">Browse Collection</span>
                  <ArrowRight size={10} strokeWidth={1.5} className="group-hover/btn:translate-x-0.5 transition-transform duration-200" aria-hidden="true" />
                </button>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── SEARCH + FILTER ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="px-6 md:px-16 py-6 border-b border-gray-800 flex flex-col md:flex-row gap-4 md:items-center md:justify-between"
      >
        <div className="flex items-center gap-4">
          <div className="relative max-w-xs w-full">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" aria-hidden="true" />
            <input
              id="exhibit-search"
              type="search"
              placeholder="Search species..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search dinosaur species"
              className="w-full bg-transparent border border-gray-700 pl-9 pr-4 py-2.5 text-[11px] font-mono tracking-wider text-white placeholder-gray-600
                focus:outline-none focus:border-gray-400 transition-colors duration-200"
            />
          </div>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              aria-label="Clear all filters"
              className="flex items-center gap-1 text-[9px] font-mono tracking-widest uppercase text-gray-500 hover:text-white transition-colors duration-200"
            >
              <X size={10} />Clear
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex gap-2" role="group" aria-label="Filter by diet">
            {(Object.keys(dietLabels) as DietFilter[]).map((d) => (
              <button
                key={d}
                onClick={() => setDietFilter(d)}
                aria-pressed={dietFilter === d}
                className={`text-[9px] font-mono tracking-widest uppercase px-3 py-1.5 border transition-all duration-200
                  ${dietFilter === d ? 'border-white text-white bg-white/10' : 'border-gray-700 text-gray-500 hover:border-gray-500 hover:text-gray-300'}
                  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white`}
              >
                {dietLabels[d]}
              </button>
            ))}
          </div>
          <div className="flex gap-2" role="group" aria-label="Filter by era">
            {(['Triassic', 'Jurassic', 'Cretaceous'] as EraFilter[]).map((e) => (
              <button
                key={e}
                onClick={() => setEraFilter(eraFilter === e ? 'all' : e)}
                aria-pressed={eraFilter === e}
                className={`text-[9px] font-mono tracking-widest uppercase px-3 py-1.5 border transition-all duration-200
                  ${eraFilter === e ? 'border-white text-white bg-white/10' : 'border-gray-700 text-gray-500 hover:border-gray-500 hover:text-gray-300'}
                  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white`}
              >
                {e}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Results count */}
      <div className="px-6 md:px-16 py-4 border-b border-gray-800/50">
        <p className="text-[10px] font-mono tracking-widest text-gray-600 uppercase">
          {filtered.length} specimen{filtered.length !== 1 ? 's' : ''} found
          {wingFilter !== 'all' && ` · ${museumWings.find(w => w.id === wingFilter)?.name}`}
        </p>
      </div>

      {/* ── SPECIMEN GRID ── */}
      <div className="px-6 md:px-16 py-12">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map((d, i) => (
              <DinosaurCard key={d.slug} dinosaur={d} index={i} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <p className="text-[10px] font-mono tracking-widest uppercase text-gray-600 mb-4">
              No specimens found
            </p>
            <button
              onClick={clearFilters}
              className="text-[10px] font-mono tracking-widest uppercase text-gray-500 hover:text-white transition-colors duration-200 underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-8 py-8 border-t border-gray-800 flex items-center justify-between">
        <p className="font-mono tracking-widest text-gray-600 uppercase" style={{ fontSize: '10px' }}>
          NATURAL HISTORY MUSEUM — DINOSAUR COLLECTION (C) 2026
        </p>
        <p className="font-mono tracking-widest text-gray-700 uppercase hidden md:block" style={{ fontSize: '10px' }}>
          {dinosaursData.length} SPECIMENS · 5 WINGS · 190 MILLION YEARS
        </p>
      </div>
    </main>
  );
}
