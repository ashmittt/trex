import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import PageHeader from '../components/PageHeader';
import { dinosaursData } from '../data/dinosaurs';

interface Period {
  id: string;
  name: string;
  range: string;
  mya: string;
  color: string;
  accent: string;
  tagline: string;
  overview: string;
  keyEvents: string[];
  climate: string;
  species: string[];
}

const periods: Period[] = [
  {
    id: 'triassic',
    name: 'Triassic',
    range: '252 – 201 Ma',
    mya: '252',
    color: '#1a0f00',
    accent: '#c2410c',
    tagline: 'The Dawn of Dinosaurs',
    overview:
      'The Triassic period saw Earth recovering from the greatest mass extinction in its history — the Permian–Triassic event that wiped out over 90% of all species. From these ashes, the first dinosaurs emerged as small, bipedal reptiles competing in a world still dominated by other archosaurs. By the end of the Triassic, dinosaurs had diversified into the ancestors of every lineage that would follow.',
    keyEvents: [
      'Earth recovers from the Permian–Triassic extinction (252 Ma)',
      'First true dinosaurs appear — small bipedal theropods (230 Ma)',
      'Supercontinent Pangaea begins to fracture',
      'First mammals and pterosaurs emerge',
      'Triassic–Jurassic extinction event eliminates 76% of species (201 Ma)',
    ],
    climate: 'Hot, dry, and largely desert-like. A single massive ocean — Panthalassa — covered most of the globe. No polar ice caps. CO₂ levels were 4–6× higher than today.',
    species: [],
  },
  {
    id: 'jurassic',
    name: 'Jurassic',
    range: '201 – 145 Ma',
    mya: '201',
    color: '#001a0f',
    accent: '#15803d',
    tagline: 'The Age of Giants',
    overview:
      'The Jurassic period is synonymous with the age of giant dinosaurs. As Pangaea continued to split and lush vegetation spread across the newly formed continents, herbivorous sauropods grew to unprecedented sizes to exploit vast food resources. Stegosaurs roamed fern prairies while early birds — direct descendants of theropod dinosaurs — took to the skies.',
    keyEvents: [
      'Pangaea fully splits into Laurasia and Gondwana',
      'Massive sauropods like Brachiosaurus and Diplodocus dominate',
      'Stegosaurus thrives in fern-covered floodplains',
      'Archaeopteryx — the transitional bird — appears (150 Ma)',
      'First flowering plants (angiosperms) begin to emerge',
    ],
    climate: 'Warm and humid globally. Dense forests of conifers, ferns, and cycads. Sea levels rose significantly as Pangaea rifted. No glaciation at the poles.',
    species: ['stegosaurus', 'brachiosaurus'],
  },
  {
    id: 'cretaceous',
    name: 'Cretaceous',
    range: '145 – 66 Ma',
    mya: '145',
    color: '#0f001a',
    accent: '#7c3aed',
    tagline: 'The Final Chapter',
    overview:
      'The Cretaceous was the longest and most spectacular period of the Mesozoic — and it ended in the most dramatic extinction event in Earth\'s recent history. T-Rex and Triceratops were among its final giants. Flowering plants transformed ecosystems, warm shallow seas covered much of the continents, and birds diversified into a spectacular array of forms. Then, 66 million years ago, a 10-kilometre asteroid struck the Gulf of Mexico.',
    keyEvents: [
      'T-Rex and Triceratops rule North American ecosystems',
      'Flowering plants (angiosperms) become dominant globally',
      'Seas reach their highest levels — shallow oceans cover continents',
      'Spinosaurus emerges as largest known carnivorous dinosaur',
      'Chicxulub asteroid impact (66 Ma) — 75% of all species extinct',
    ],
    climate: 'Warm greenhouse climate. Sea levels were 200 metres higher than today. The poles were free of ice. Shallow epicontinental seas split North America into two landmasses.',
    species: ['trex', 'velociraptor', 'triceratops', 'spinosaurus'],
  },
];

export default function TimelinePage() {
  const [activePeriod, setActivePeriod] = useState<string | null>(null);
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <title>Timeline — Natural History Museum</title>

      <PageHeader />

      {/* Hero heading */}
      <div className="px-6 md:px-16 pt-12 pb-16 border-b border-gray-800">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
        >
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-gray-500 block mb-4">
            [ 03 ] Geological Timeline
          </span>
          <h1
            className="font-medium tracking-tight text-white"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', lineHeight: 1.05 }}
          >
            252 MILLION<br />YEARS OF HISTORY
          </h1>
          <p className="text-gray-500 mt-4 font-mono max-w-md leading-relaxed" style={{ fontSize: '12px' }}>
            From the dawn of dinosaurs to their dramatic extinction — explore the three great periods of the Mesozoic Era.
          </p>
        </motion.div>
      </div>

      {/* Period selector tabs */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.25 }}
        className="grid grid-cols-3 border-b border-gray-800"
        role="tablist"
        aria-label="Geological periods"
      >
        {periods.map((period) => (
          <button
            key={period.id}
            role="tab"
            aria-selected={activePeriod === period.id}
            aria-controls={`panel-${period.id}`}
            onClick={() =>
              setActivePeriod(activePeriod === period.id ? null : period.id)
            }
            className={`group flex flex-col px-4 md:px-8 py-6 border-r last:border-r-0 border-gray-800 text-left transition-all duration-300
              ${activePeriod === period.id
                ? 'bg-[#111]'
                : 'hover:bg-[#0f0f0f]'
              }
              focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-white`}
          >
            <span
              className="font-mono tracking-widest uppercase mb-1"
              style={{ fontSize: '9px', color: period.accent }}
            >
              {period.range}
            </span>
            <span
              className="font-medium tracking-tight text-white"
              style={{ fontSize: 'clamp(1rem, 2.5vw, 1.8rem)', lineHeight: 1.15 }}
            >
              {period.name}
            </span>
            <span className="text-[10px] font-mono text-gray-600 mt-1 hidden md:block">
              {period.tagline}
            </span>
          </button>
        ))}
      </motion.div>

      {/* Period detail panels */}
      {periods.map((period) => (
        <div
          key={period.id}
          id={`panel-${period.id}`}
          role="tabpanel"
          aria-label={`${period.name} period`}
          hidden={activePeriod !== period.id}
        >
          {activePeriod === period.id && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="border-b border-gray-800"
            >
              {/* Overview */}
              <div className="grid md:grid-cols-2 border-b border-gray-800">
                <div className="px-6 md:px-16 py-12 border-b md:border-b-0 md:border-r border-gray-800">
                  <h2 className="text-[10px] font-mono tracking-widest uppercase mb-6" style={{ color: period.accent }}>
                    Overview
                  </h2>
                  <p className="text-gray-300 leading-[1.8]" style={{ fontSize: '13px' }}>
                    {period.overview}
                  </p>
                </div>
                <div className="px-6 md:px-16 py-12">
                  <h2 className="text-[10px] font-mono tracking-widest uppercase text-gray-500 mb-6">
                    Climate &amp; Environment
                  </h2>
                  <p className="text-gray-400 leading-[1.8]" style={{ fontSize: '12px' }}>
                    {period.climate}
                  </p>
                </div>
              </div>

              {/* Key events */}
              <div className="px-6 md:px-16 py-12 border-b border-gray-800">
                <h2 className="text-[10px] font-mono tracking-widest uppercase text-gray-500 mb-8">
                  Key Events
                </h2>
                <div className="flex flex-col">
                  {period.keyEvents.map((event, i) => (
                    <div
                      key={i}
                      className="flex gap-6 py-5 border-b border-gray-800 last:border-b-0 items-start"
                    >
                      <span
                        className="text-[10px] font-mono tracking-widest shrink-0 mt-0.5"
                        style={{ color: period.accent }}
                        aria-hidden="true"
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <p className="text-[12px] text-gray-300 leading-relaxed">{event}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notable species */}
              {period.species.length > 0 && (
                <div className="px-6 md:px-16 py-12">
                  <h2 className="text-[10px] font-mono tracking-widest uppercase text-gray-500 mb-8">
                    Notable Species
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {period.species.map((slug) => {
                      const dino = dinosaursData.find((d) => d.slug === slug);
                      if (!dino) return null;
                      return (
                        <button
                          key={slug}
                          onClick={() => navigate(`/exhibits/${slug}`)}
                          aria-label={`View ${dino.name} exhibit`}
                          className="group flex flex-col border border-gray-800 bg-[#111] p-4 hover:border-gray-600 transition-all duration-300 text-left
                            focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                        >
                          <img
                            src={dino.image}
                            alt={dino.name}
                            loading="lazy"
                            className="w-full h-24 object-contain mix-blend-lighten mb-3 opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                          />
                          <p className="text-[11px] font-medium text-white group-hover:text-gray-300 transition-colors duration-300">
                            {dino.shortName}
                          </p>
                          <p className="text-[9px] font-mono tracking-widest uppercase text-gray-600 mt-0.5">
                            {dino.diet}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Extinction callout for Cretaceous */}
              {period.id === 'cretaceous' && (
                <div className="px-6 md:px-16 py-10 bg-[#0f0008] border-t border-purple-900/30">
                  <div className="max-w-2xl">
                    <p className="text-[9px] font-mono tracking-widest uppercase text-purple-400 mb-3">
                      K–Pg Extinction Event · 66 Million Years Ago
                    </p>
                    <p className="text-[12px] text-gray-400 leading-relaxed">
                      A 10-kilometre asteroid struck the Yucatán Peninsula with the force of a billion atomic bombs. The impact winter that followed collapsed food chains globally. Within 100,000 years, 75% of all species on Earth — including all non-avian dinosaurs — were extinct. What survived became the ancestors of every bird, mammal, and reptile alive today.
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </div>
      ))}

      {/* Full timeline strip */}
      <div className="px-6 md:px-16 py-16 border-b border-gray-800">
        <h2 className="text-[10px] font-mono tracking-widest uppercase text-gray-500 mb-12">
          The Mesozoic Era at a Glance
        </h2>
        <div className="relative">
          {/* Axis line */}
          <div className="absolute top-5 left-0 right-0 h-[1px] bg-gray-800" aria-hidden="true" />

          <div className="grid grid-cols-3 gap-1 relative">
            {periods.map((period, i) => (
              <motion.div
                key={period.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col"
              >
                {/* Dot on axis */}
                <div
                  className="w-2.5 h-2.5 rounded-full border-2 mb-8 relative z-10"
                  style={{ borderColor: period.accent, backgroundColor: '#0a0a0a' }}
                  aria-hidden="true"
                />
                <span className="text-[10px] font-mono tracking-widest uppercase mb-1" style={{ color: period.accent }}>
                  {period.mya} Ma
                </span>
                <span className="font-medium text-white text-lg">{period.name}</span>
                <span className="text-[10px] font-mono text-gray-600 mt-1">{period.tagline}</span>
              </motion.div>
            ))}
          </div>

          {/* Extinction marker */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="absolute right-0 top-0 flex flex-col items-end"
          >
            <div
              className="w-2.5 h-2.5 rounded-full border-2 border-purple-500 mb-8"
              style={{ backgroundColor: '#0a0a0a' }}
              aria-hidden="true"
            />
            <span className="text-[10px] font-mono tracking-widest uppercase text-purple-400 mb-1">
              66 Ma
            </span>
            <span className="text-[11px] font-mono text-gray-500">K–Pg Extinction</span>
          </motion.div>
        </div>
      </div>

      {/* ── GEOLOGICAL ERAS — DEEP TIME ── */}
      <section className="px-6 md:px-16 py-16 border-b border-gray-800">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <h2 className="text-[10px] font-mono tracking-widest uppercase text-gray-500 mb-4">
            Geological Eras — Deep Time Context
          </h2>
          <p className="text-gray-600 font-mono max-w-lg leading-relaxed" style={{ fontSize: '11px' }}>
            The Mesozoic represents only a fraction of Earth's history. To understand the dinosaurs, you must understand the deeper context in which they arose.
          </p>
        </motion.div>

        <div className="flex flex-col">
          {[
            {
              name: 'Hadean',
              range: '4,500 – 4,000 Ma',
              description: 'Earth forms from accretion of solar material. The surface is a global magma ocean, bombarded by meteorites. No life. No oceans. No continents. An alien world unrecognisable as Earth.',
              significance: 'Origin of Earth',
              accent: '#4a1942',
            },
            {
              name: 'Archean',
              range: '4,000 – 2,500 Ma',
              description: 'The oceans form. The first simple prokaryotic life emerges — single-celled organisms without a nucleus. Cyanobacteria begin producing oxygen as a metabolic by-product, a process that will ultimately transform the planet\'s atmosphere.',
              significance: 'First Life',
              accent: '#1a3a4a',
            },
            {
              name: 'Proterozoic',
              range: '2,500 – 541 Ma',
              description: 'The "Great Oxidation Event" transforms Earth\'s atmosphere. Eukaryotic cells evolve. The first multicellular organisms appear. The supercontinent Rodinia forms and breaks apart. The entire globe freezes in "Snowball Earth" events.',
              significance: 'Complex Cells Emerge',
              accent: '#1a3a1a',
            },
            {
              name: 'Paleozoic',
              range: '541 – 252 Ma',
              description: 'The Cambrian Explosion produces the blueprint of every animal body plan that exists today. Fish dominate the seas. Plants colonise land. Insects take to the sky. Vertebrates evolve limbs and conquer the land. The era ends with the greatest extinction in Earth\'s history — the Permian-Triassic event.',
              significance: 'Animal Life Diversifies',
              accent: '#3a2a00',
            },
            {
              name: 'Mesozoic',
              range: '252 – 66 Ma',
              description: 'From the ashes of the Permian extinction, dinosaurs rise to dominate every terrestrial ecosystem on Earth for 186 million years. Mammals evolve but remain small and nocturnal. The first birds appear. Flowering plants transform the world\'s vegetation. Then, an asteroid ends everything.',
              significance: 'The Age of Dinosaurs',
              accent: '#1a0a2a',
              highlight: true,
            },
            {
              name: 'Cenozoic',
              range: '66 Ma – Present',
              description: 'With the dinosaurs gone, mammals diversify explosively. Grasslands spread. Whales return to the sea. Primates evolve. Ice ages reshape landscapes. Finally, our own species emerges — and within a geological instant, transforms the planet more profoundly than any asteroid.',
              significance: 'Age of Mammals',
              accent: '#001830',
            },
          ].map(({ name, range, description, significance, accent, highlight }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className={`flex flex-col md:flex-row gap-8 md:gap-16 py-8 border-b border-gray-800 last:border-b-0 ${highlight ? 'bg-[#0d0d12]' : ''}`}
            >
              <div className="md:w-[200px] shrink-0">
                <div
                  className="w-2 h-2 rounded-full mb-3"
                  style={{ backgroundColor: accent }}
                  aria-hidden="true"
                />
                <p className="font-medium text-white mb-1" style={{ fontSize: '14px' }}>{name}</p>
                <p className="text-[9px] font-mono tracking-widest uppercase text-gray-600 mb-1">{range}</p>
                <p className="text-[9px] font-mono tracking-widest uppercase" style={{ color: accent === '#1a0a2a' ? '#9f7aea' : '#555' }}>
                  {significance}
                </p>
                {highlight && (
                  <span className="inline-block text-[8px] font-mono tracking-widest uppercase text-purple-400 border border-purple-900/40 px-2 py-0.5 mt-2">
                    Our Focus
                  </span>
                )}
              </div>
              <p className="text-[12px] text-gray-400 leading-relaxed flex-1">{description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── PRE-MESOZOIC CONTEXT ── */}
      <section className="px-6 md:px-16 py-16 border-b border-gray-800">
        <div className="grid md:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-[10px] font-mono tracking-widest uppercase text-gray-500 mb-8">
              The Great Dying
            </h2>
            <p
              className="font-medium tracking-tight text-white mb-6"
              style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.5rem)', lineHeight: 1.2 }}
            >
              96% of all marine species.<br />70% of all land species.<br />Gone in 60,000 years.
            </p>
            <p className="text-[12px] text-gray-400 leading-relaxed">
              The Permian–Triassic extinction event — 252 million years ago — was the single most catastrophic event in the history of complex life. Triggered by massive volcanic eruptions in what is now Siberia, it produced runaway greenhouse warming, ocean acidification, and atmospheric collapse. It is from this devastation that the dinosaurs ultimately emerged — filling the ecological vacuum left by 90% of Earth's species.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <h2 className="text-[10px] font-mono tracking-widest uppercase text-gray-500 mb-8">
              Scale of Deep Time
            </h2>
            <div className="flex flex-col gap-4">
              {[
                { label: 'Age of the Universe', value: '13,800 Ma' },
                { label: 'Age of Earth', value: '4,500 Ma' },
                { label: 'First Life', value: '3,700 Ma' },
                { label: 'First Dinosaurs', value: '230 Ma' },
                { label: 'T-Rex alive', value: '68–66 Ma' },
                { label: 'First Homo sapiens', value: '0.3 Ma' },
                { label: 'Agricultural civilisation', value: '0.012 Ma' },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between border-b border-gray-800/50 pb-3">
                  <span className="text-[11px] text-gray-400">{label}</span>
                  <span className="text-[10px] font-mono tracking-widest text-gray-600">{value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer strip */}
      <div className="px-8 py-8 border-t border-gray-800">
        <p className="font-mono tracking-widest text-gray-600 uppercase" style={{ fontSize: '10px' }}>
          NATURAL HISTORY MUSEUM — GEOLOGICAL RECORD (C) 2026
        </p>
      </div>
    </main>
  );
}
