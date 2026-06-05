import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Ecosystem {
  id: string;
  name: string;
  location: string;
  period: string;
  climate: string;
  vegetation: string;
  inhabitants: string[];
  fieldNotes: string;
  color: string;
}

const ecosystemsData: Ecosystem[] = [
  {
    id: 'floodplains',
    name: 'Hell Creek Floodplains',
    location: 'Western North America (Laramidia)',
    period: 'Late Cretaceous (68-66 Ma)',
    climate: 'Subtropical, warm and humid with distinct wet and dry seasons.',
    vegetation: 'Conifer forests, early deciduous trees, broadleaf evergreens, and palm trees.',
    inhabitants: ['Tyrannosaurus Rex', 'Triceratops', 'Ankylosaurus', 'Edmontosaurus'],
    fieldNotes: 'Herds of Triceratops browse low palm shrubs along massive river channels, moving constantly to avoid ambush by Tyrannosaurus. Armored Ankylosaurs graze closer to dense forest fringes. The air is heavy with the scent of pine and early magnolias.',
    color: '#8C3A2D',
  },
  {
    id: 'forests',
    name: 'Morrison Conifer Forests',
    location: 'Western United States (Wyoming/Utah)',
    period: 'Late Jurassic (155-148 Ma)',
    climate: 'Semi-arid, marked by long dry seasons and short, intense monsoon seasons.',
    vegetation: 'Ginkgos, cycads, giant conifers (Araucaria), and massive fern savannahs.',
    inhabitants: ['Diplodocus', 'Stegosaurus', 'Allosaurus', 'Brachiosaurus'],
    fieldNotes: 'Sauropods move like gentle mountains, stripping evergreen needles from the high canopy. Stegosaurus sweeps the forest floor for low ferns, its tail spikes ready to ward off packs of Allosaurus tracking the herds from the dry scrub margins.',
    color: '#A07C4F',
  },
  {
    id: 'deserts',
    name: 'Djadokhta Sand Dunes',
    location: 'Central Asia (Mongolia/Gobi)',
    period: 'Late Cretaceous (75-71 Ma)',
    climate: 'Arid, hot desert with sparse rainfall and seasonal dust storms.',
    vegetation: 'Drought-resistant shrubs, early scrub herbs, and sparse water-channel reeds.',
    inhabitants: ['Velociraptor', 'Protoceratops', 'Oviraptor', 'Pinacosaurus'],
    fieldNotes: 'A harsh dune sea. Small, feathered Velociraptors hunt in family groups, using their speed to corner Protoceratops in rocky dry-wash beds. Strong seasonal winds create massive sand avalanches that preserve nesting parents.',
    color: '#C4903A',
  },
];

export default function EcosystemsSection() {
  const [activeTab, setActiveTab] = useState<string>('floodplains');
  const activeEco = ecosystemsData.find((e) => e.id === activeTab) || ecosystemsData[0];

  return (
    <section id="ecosystems" className="relative min-h-screen bg-bg-shale text-txt-parchment border-t border-txt-parchment/10 py-24 px-8 md:px-24 flex flex-col justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#E8E0D0_1px,transparent_1px),linear-gradient(to_bottom,#E8E0D0_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.015] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <span className="font-mono text-xs tracking-[0.4em] text-accent-amber uppercase block mb-4">
          STAGE 06 // BIOMATERIAL LAYER
        </span>
        
        <h2
          className="font-serif font-light tracking-tight text-txt-parchment leading-none mb-12 uppercase"
          style={{ fontSize: 'clamp(2.5rem, 5.5vw, 5rem)' }}
        >
          Environments <br />
          <span className="font-serif italic text-accent-amber block mt-2">not species</span>
        </h2>

        {/* Dynamic Selector Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Console Buttons (Ledger Index Style) */}
          <div className="lg:col-span-4 flex flex-col gap-3 border-r border-txt-parchment/10 pr-0 lg:pr-8">
            {ecosystemsData.map((eco) => {
              const isActive = activeTab === eco.id;
              return (
                <button
                  key={eco.id}
                  onClick={() => setActiveTab(eco.id)}
                  aria-pressed={isActive}
                  className={`w-full text-left p-6 border transition-all duration-300 flex justify-between items-center cursor-pointer focus-visible:outline-none font-mono
                    ${isActive 
                      ? 'bg-txt-parchment text-bg-shale border-txt-parchment' 
                      : 'bg-black/30 border-txt-parchment/10 text-txt-limestone hover:border-accent-amber/50 hover:text-txt-parchment'}`}
                >
                  <div>
                    <span className={`text-[10px] block font-bold mb-1 ${isActive ? 'text-accent-amber' : 'text-annotation'}`}>
                      {eco.period}
                    </span>
                    <span className="font-serif text-lg font-normal tracking-wide block">{eco.name}</span>
                  </div>
                  <span
                    className="w-2.5 h-2.5 rounded-full border border-bg-shale"
                    style={{ backgroundColor: eco.color }}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Content Sheet (Scientific binder folio layout) */}
          <div className="lg:col-span-8 bg-black/45 border border-txt-parchment/10 p-8 md:p-12 min-h-[450px] flex flex-col justify-between relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#E8E0D0_1px,transparent_1px),linear-gradient(to_bottom,#E8E0D0_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.015] pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeEco.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col gap-6"
              >
                <div className="flex justify-between items-center border-b border-txt-parchment/10 pb-4">
                  <span className="font-mono text-[10px] text-txt-limestone/50 uppercase tracking-widest">
                    ARCHIVAL BINDER // ECO-SYS.{activeEco.id.toUpperCase()}
                  </span>
                  <span className="font-mono text-[10px] text-accent-amber font-bold uppercase tracking-wider">
                    {activeEco.location}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-sans">
                  <div>
                    <span className="font-mono text-[10px] text-accent-amber uppercase block mb-1.5 font-bold">Climatic System</span>
                    <p className="text-base text-txt-parchment/85 leading-relaxed">{activeEco.climate}</p>
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-accent-amber uppercase block mb-1.5 font-bold">Dominant Vegetation</span>
                    <p className="text-base text-txt-parchment/85 leading-relaxed">{activeEco.vegetation}</p>
                  </div>
                </div>

                <div>
                  <span className="font-mono text-[10px] text-accent-amber uppercase block mb-3 font-bold">Dominant Creatures Coexisting</span>
                  <div className="flex flex-wrap gap-2.5">
                    {activeEco.inhabitants.map((inh) => (
                      <span
                        key={inh}
                        className="font-mono text-[11px] text-txt-parchment/80 border border-txt-parchment/15 px-3 py-1.5 bg-black/40 rounded-sm"
                      >
                        {inh}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-t border-txt-parchment/10 pt-6 mt-2">
                  <span className="font-mono text-[10px] text-annotation uppercase block mb-2.5 font-bold">Curatorial Field Journal Entries</span>
                  <p className="text-lg md:text-xl font-serif text-txt-limestone leading-relaxed italic">
                    "{activeEco.fieldNotes}"
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="font-mono text-[9px] text-txt-limestone/30 text-right mt-8 uppercase tracking-wider">
              Palaeoecology Department · Registry No. {activeEco.id.toUpperCase()}-883
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
