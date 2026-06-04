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
  bgActive: string;
  textActive: string;
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
    color: '#D35400',
    accent: '#D35400',
    bgActive: 'bg-[#D35400] text-[#F5F2EA]',
    textActive: 'text-[#D35400]',
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
    color: '#E8C547',
    accent: '#E8C547',
    bgActive: 'bg-[#E8C547] text-[#151210]',
    textActive: 'text-[#E8C547]',
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
    color: '#8C3A2D',
    accent: '#8C3A2D',
    bgActive: 'bg-[#8C3A2D] text-[#F5F2EA]',
    textActive: 'text-[#8C3A2D]',
    tagline: 'The Final Chapter',
    overview:
      "The Cretaceous was the longest and most spectacular period of the Mesozoic — and it ended in the most dramatic extinction event in Earth's recent history. T-Rex and Triceratops were among its final giants. Flowering plants transformed ecosystems, warm shallow seas covered much of the continents, and birds diversified into a spectacular array of forms. Then, 66 million years ago, a 10-kilometre asteroid struck the Gulf of Mexico.",
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
    <main className="min-h-screen bg-[#151210] text-[#F5F2EA] overflow-x-hidden">
      <title>Timeline — Natural History Museum</title>

      <PageHeader />

      {/* Hero heading */}
      <div className="px-6 md:px-16 pt-12 pb-16 border-b border-[#F5F2EA]/10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
        >
          <span className="text-[14px] font-mono tracking-[0.3em] uppercase text-[#E8C547] block mb-4">
            [ 03 ] Geological Timeline
          </span>
          
          <h1
            className="font-serif font-normal tracking-tight text-[#F5F2EA]"
            style={{ fontSize: 'clamp(3rem, 6.5vw, 6.5rem)', lineHeight: 1.05 }}
          >
            252 MILLION<br />YEARS OF{' '}
            <span className="font-script text-[#E8C547] text-[1.3em] lowercase normal-case italic block md:inline-block md:translate-y-2 mt-1">history</span>
          </h1>

          <p className="text-[#D8D1C2] mt-4 font-mono max-w-lg leading-relaxed text-[16px] md:text-[18px]">
            From the dawn of dinosaurs to their dramatic extinction — explore the three great periods of the Mesozoic Era.
          </p>
        </motion.div>
      </div>

      {/* Period selector tabs (Bento-style like in the video) */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.25 }}
        className="grid grid-cols-3 border-b border-[#F5F2EA]/10"
        role="tablist"
        aria-label="Geological periods"
      >
        {periods.map((period) => {
          const isActive = activePeriod === period.id;
          return (
            <button
              key={period.id}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${period.id}`}
              onClick={() =>
                setActivePeriod(activePeriod === period.id ? null : period.id)
              }
              className={`group flex flex-col px-4 md:px-8 py-6 border-r last:border-r-0 border-[#F5F2EA]/10 text-left transition-all duration-300 cursor-pointer
                ${isActive
                  ? period.bgActive
                  : 'hover:bg-[#1a1614]/80 text-[#D8D1C2]'
                }
                focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-white`}
            >
              <span
                className={`font-mono tracking-widest uppercase mb-1 text-[13px] md:text-[14px]
                  ${isActive ? 'text-current/80' : 'text-[#E8C547]'}`}
              >
                {period.range}
              </span>
              <span
                className="font-serif font-normal tracking-tight text-2xl md:text-4xl"
                style={{ lineHeight: 1.15 }}
              >
                {period.name}
              </span>
              <span className={`text-[14px] font-mono mt-1 hidden md:block ${isActive ? 'text-current/75' : 'text-[#A9A295]'}`}>
                {period.tagline}
              </span>
            </button>
          );
        })}
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
              className="border-b border-[#F5F2EA]/10"
            >
              {/* Overview - Alternating bento layout */}
              <div className="grid md:grid-cols-2 border-b border-[#F5F2EA]/10">
                <div className="px-6 md:px-16 py-12 border-b md:border-b-0 md:border-r border-[#F5F2EA]/10 bg-[#1A1614]/30">
                  <h2 className="text-[14px] font-mono tracking-widest uppercase mb-6" style={{ color: period.accent }}>
                    Overview dossier
                  </h2>
                  <p className="text-[#D8D1C2] leading-[1.8] font-mono text-[16px] md:text-[18px]">
                    {period.overview}
                  </p>
                </div>
                <div className="px-6 md:px-16 py-12 bg-[#F5F2EA] text-[#151210]">
                  <h2 className="text-[14px] font-mono tracking-widest uppercase text-[#D35400] mb-6">
                    Climate &amp; Environment
                  </h2>
                  <p className="text-[#3A2F2D] leading-[1.8] font-mono text-[16px] md:text-[18px]">
                    {period.climate}
                  </p>
                </div>
              </div>

              {/* Key events list */}
              <div className="px-6 md:px-16 py-12 border-b border-[#F5F2EA]/10">
                <h2 className="text-[14px] font-mono tracking-widest uppercase text-[#E8C547] mb-8">
                  Key Events
                </h2>
                <div className="flex flex-col">
                  {period.keyEvents.map((event, i) => (
                    <div
                      key={i}
                      className="flex gap-6 py-5 border-b border-[#F5F2EA]/10 last:border-b-0 items-start font-mono"
                    >
                      <span
                        className="text-[14px] tracking-widest shrink-0 mt-0.5"
                        style={{ color: period.accent }}
                        aria-hidden="true"
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <p className="text-[16px] text-[#D8D1C2] leading-relaxed">{event}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notable species */}
              {period.species.length > 0 && (
                <div className="px-6 md:px-16 py-12 bg-[#1A1614]/20">
                  <h2 className="text-[14px] font-mono tracking-widest uppercase text-[#E8C547] mb-8">
                    Notable Species in Hall
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {period.species.map((slug, i) => {
                      const dino = dinosaursData.find((d) => d.slug === slug);
                      if (!dino) return null;
                      const isEven = i % 2 === 0;
                      return (
                        <button
                          key={slug}
                          onClick={() => navigate(`/exhibits/${slug}`)}
                          aria-label={`View ${dino.name} exhibit`}
                          className={`group flex flex-col border p-4 hover:scale-[1.02] transition-all duration-300 text-left cursor-pointer
                            ${isEven 
                              ? 'bg-[#F5F2EA] text-[#151210] border-transparent' 
                              : 'bg-[#1A1614] text-[#F5F2EA] border-[#F5F2EA]/10'}`}
                          focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white
                        >
                          <div className="w-full h-24 flex items-center justify-center bg-black/5 relative mb-3 overflow-hidden rounded-sm">
                            <div className={`absolute w-[45%] h-[60%] ${isEven ? 'bg-[#D35400]/25' : 'bg-[#E8C547]/25'} rotate-6`} />
                            <img
                              src={dino.image}
                              alt={dino.name}
                              loading="lazy"
                              className={`w-20 h-20 object-contain relative z-10 opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300
                                ${isEven ? 'mix-blend-multiply' : 'mix-blend-lighten'}`}
                            />
                          </div>
                          <p className="text-[16px] font-serif font-normal group-hover:text-[#D35400] transition-colors">
                            {dino.shortName}
                          </p>
                          <p className={`text-[12px] font-mono tracking-widest uppercase mt-0.5 ${isEven ? 'text-[#151210]/60' : 'text-[#A9A295]'}`}>
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
                <div className="px-6 md:px-16 py-10 bg-[#8C3A2D]/10 border-t border-[#8C3A2D]/30">
                  <div className="max-w-3xl">
                    <p className="text-[14px] font-mono tracking-widest uppercase text-[#8C3A2D] mb-3">
                      K–Pg Extinction Event · 66 Million Years Ago
                    </p>
                    <p className="text-[16px] md:text-[18px] text-[#D8D1C2] leading-relaxed font-mono">
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
      <div className="px-6 md:px-16 py-16 border-b border-[#F5F2EA]/10">
        <h2 className="text-[14px] font-mono tracking-widest uppercase text-[#E8C547] mb-12">
          The Mesozoic Era at a Glance
        </h2>
        <div className="relative">
          {/* Axis line */}
          <div className="absolute top-5 left-0 right-0 h-[1px] bg-[#F5F2EA]/15" aria-hidden="true" />

          <div className="grid grid-cols-3 gap-1 relative">
            {periods.map((period, i) => (
              <motion.div
                key={period.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col font-mono"
              >
                {/* Dot on axis */}
                <div
                  className="w-2.5 h-2.5 rounded-full border-2 mb-8 relative z-10"
                  style={{ borderColor: period.accent, backgroundColor: '#151210' }}
                  aria-hidden="true"
                />
                <span className="text-[14px] tracking-widest uppercase mb-1" style={{ color: period.accent }}>
                  {period.mya} Ma
                </span>
                <span className="font-serif text-[#F5F2EA] text-2xl font-normal">{period.name}</span>
                <span className="text-[14px] text-[#A9A295] mt-1">{period.tagline}</span>
              </motion.div>
            ))}
          </div>

          {/* Extinction marker */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="absolute right-0 top-0 flex flex-col items-end font-mono"
          >
            <div
              className="w-2.5 h-2.5 rounded-full border-2 border-[#8C3A2D] mb-8"
              style={{ backgroundColor: '#151210' }}
              aria-hidden="true"
            />
            <span className="text-[14px] tracking-widest uppercase text-[#8C3A2D] mb-1">
              66 Ma
            </span>
            <span className="text-[14px] text-[#A9A295]">K–Pg Extinction</span>
          </motion.div>
        </div>
      </div>

      {/* ── GEOLOGICAL ERAS — DEEP TIME ── */}
      <section className="px-6 md:px-16 py-16 border-b border-[#F5F2EA]/10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 font-mono"
        >
          <h2 className="text-[14px] tracking-widest uppercase text-[#E8C547] mb-4">
            Geological Eras — Deep Time Context
          </h2>
          <p className="text-[#A9A295] max-w-lg leading-relaxed text-[15px]">
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
              accent: '#8C3A2D',
            },
            {
              name: 'Archean',
              range: '4,000 – 2,500 Ma',
              description: 'The oceans form. The first simple prokaryotic life emerges — single-celled organisms without a nucleus. Cyanobacteria begin producing oxygen as a metabolic by-product, a process that will ultimately transform the planet\'s atmosphere.',
              significance: 'First Life',
              accent: '#E8C547',
            },
            {
              name: 'Proterozoic',
              range: '2,500 – 541 Ma',
              description: 'The "Great Oxidation Event" transforms Earth\'s atmosphere. Eukaryotic cells evolve. The first multicellular organisms appear. The supercontinent Rodinia forms and breaks apart. The entire globe freezes in "Snowball Earth" events.',
              significance: 'Complex Cells Emerge',
              accent: '#E8C547',
            },
            {
              name: 'Paleozoic',
              range: '541 – 252 Ma',
              description: 'The Cambrian Explosion produces the blueprint of every animal body plan that exists today. Fish dominate the seas. Plants colonise land. Insects take to the sky. Vertebrates evolve limbs and conquer the land. The era ends with the greatest extinction in Earth\'s history — the Permian-Triassic event.',
              significance: 'Animal Life Diversifies',
              accent: '#D35400',
            },
            {
              name: 'Mesozoic',
              range: '252 – 66 Ma',
              description: 'From the ashes of the Permian extinction, dinosaurs rise to dominate every terrestrial ecosystem on Earth for 186 million years. Mammals evolve but remain small and nocturnal. The first birds appear. Flowering plants transform the world\'s vegetation. Then, an asteroid ends everything.',
              significance: 'The Age of Dinosaurs',
              accent: '#E8C547',
              highlight: true,
            },
            {
              name: 'Cenozoic',
              range: '66 Ma – Present',
              description: 'With the dinosaurs gone, mammals diversify explosively. Grasslands spread. Whales return to the sea. Primates evolve. Ice ages reshape landscapes. Finally, our own species emerges — and within a geological instant, transforms the planet more profoundly than any asteroid.',
              significance: 'Age of Mammals',
              accent: '#A9A295',
            },
          ].map(({ name, range, description, significance, accent, highlight }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className={`flex flex-col md:flex-row gap-8 md:gap-16 py-8 border-b border-[#F5F2EA]/10 last:border-b-0 ${highlight ? 'bg-[#E8C547]/5 px-4' : ''}`}
            >
              <div className="md:w-[220px] shrink-0 font-mono">
                <div
                  className="w-2 h-2 rounded-full mb-3 animate-pulse"
                  style={{ backgroundColor: accent }}
                  aria-hidden="true"
                />
                <p className="font-serif text-[#F5F2EA] mb-1 text-[20px] font-normal">{name}</p>
                <p className="text-[14px] tracking-widest uppercase text-[#A9A295] mb-1">{range}</p>
                <p className="text-[14px] tracking-widest uppercase" style={{ color: accent }}>
                  {significance}
                </p>
                {highlight && (
                  <span className="inline-block text-[13px] tracking-widest uppercase text-[#E8C547] border border-[#E8C547]/30 px-2 py-0.5 mt-2">
                    Our Focus
                  </span>
                )}
              </div>
              <p className="text-[16px] md:text-[18px] text-[#D8D1C2] leading-relaxed flex-1 font-mono">{description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── PRE-MESOZOIC CONTEXT ── */}
      <section className="px-6 md:px-16 py-16 border-b border-[#F5F2EA]/10">
        <div className="grid md:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-[14px] font-mono tracking-widest uppercase text-[#E8C547] mb-8">
              The Great Dying
            </h2>
            <p
              className="font-serif font-normal tracking-tight text-[#F5F2EA] mb-6"
              style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', lineHeight: 1.2 }}
            >
              96% of all marine species.<br />70% of all land species.<br />Gone in 60,000 years.
            </p>
            <p className="text-[16px] md:text-[18px] text-[#D8D1C2] leading-relaxed font-mono">
              The Permian–Triassic extinction event — 252 million years ago — was the single most catastrophic event in the history of complex life. Triggered by massive volcanic eruptions in what is now Siberia, it produced runaway greenhouse warming, ocean acidification, and atmospheric collapse. It is from this devastation that the dinosaurs ultimately emerged — filling the ecological vacuum left by 90% of Earth's species.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <h2 className="text-[14px] font-mono tracking-widest uppercase text-[#E8C547] mb-8">
              Scale of Deep Time
            </h2>
            <div className="flex flex-col gap-4 font-mono">
              {[
                { label: 'Age of the Universe', value: '13,800 Ma' },
                { label: 'Age of Earth', value: '4,500 Ma' },
                { label: 'First Life', value: '3,700 Ma' },
                { label: 'First Dinosaurs', value: '230 Ma' },
                { label: 'T-Rex alive', value: '68–66 Ma' },
                { label: 'First Homo sapiens', value: '0.3 Ma' },
                { label: 'Agricultural civilisation', value: '0.012 Ma' },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between border-b border-[#F5F2EA]/10 pb-3">
                  <span className="text-[16px] md:text-[18px] text-[#D8D1C2]">{label}</span>
                  <span className="text-[14px] tracking-widest text-[#E8C547]">{value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer strip */}
      <div className="px-8 py-8 bg-[#151210] border-t border-[#F5F2EA]/10">
        <p className="font-mono tracking-widest text-[#A9A295] uppercase text-[12px]">
          NATURAL HISTORY MUSEUM — GEOLOGICAL RECORD (C) 2026
        </p>
      </div>
    </main>
  );
}
