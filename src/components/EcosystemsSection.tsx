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
    color: '#F4D03F',
  },
  {
    id: 'coastal',
    name: 'Bahariya Coastal Deltas',
    location: 'North Africa (Egypt/Morocco)',
    period: 'Late Cretaceous (99-93 Ma)',
    climate: 'Tropical, hot river deltas with massive mangrove swamps and tidal flats.',
    vegetation: 'Ferns, giant mangrove analogues, and aquatic delta rushes.',
    inhabitants: ['Spinosaurus', 'Carcharodontosaurus', 'Paralititan', 'Onchopristis'],
    fieldNotes: 'Tidal channels dominated by massive, semi-aquatic Spinosaurus. It wades through brackish mangrove swamps, hunting giant sawfish and coelacanths, while Carcharodontosaurus patrols the drier inland floodplains.',
    color: '#1A1614',
  },
  {
    id: 'volcanic',
    name: 'Deccan Volcanic Highlands',
    location: 'Gondwana (Modern India)',
    period: 'End Cretaceous (66.5 Ma)',
    climate: 'Extremely hot, high sulfur levels, and acid rain cycles.',
    vegetation: 'Stressed conifer groves, ferns colonizing basalt flows, and early angiosperms.',
    inhabitants: ['Rajasaurus', 'Titanosaurs', 'Abelisaurids'],
    fieldNotes: 'Fissure eruptions from early Deccan Traps choke the skies in ash. Stressed Titanosaurs browse dying conifer groves along lava flows, while stocky Rajasaurus stalk weakened animals. A premonition of the final extinction.',
    color: '#D35400',
  },
];

export default function EcosystemsSection() {
  const [activeTab, setActiveTab] = useState<string>('floodplains');
  const activeEco = ecosystemsData.find((e) => e.id === activeTab) || ecosystemsData[0];

  return (
    <section className="relative min-h-screen bg-[#F5F2EA] text-[#1A1614] border-t border-[#1A1614]/15 p-6 md:p-16 flex flex-col justify-center overflow-hidden">
      <div className="max-w-6xl mx-auto w-full relative z-10">
        <span className="text-[13px] font-mono tracking-[0.4em] text-[#D35400] uppercase block mb-4">
          STAGE 05 // MESOZOIC ECOSYSTEMS
        </span>
        <h2
          className="font-serif font-normal tracking-tight text-[#1A1614] leading-none mb-12"
          style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
        >
          Environments <br />
          <span className="font-cursive text-[#D35400] lowercase tracking-normal text-4xl md:text-7xl block mt-2">not species</span>
        </h2>

        {/* Dynamic Selector Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Console Buttons */}
          <div className="lg:col-span-4 flex flex-col gap-2 border-r border-[#1A1614]/10 pr-0 lg:pr-6">
            {ecosystemsData.map((eco) => {
              const isActive = activeTab === eco.id;
              return (
                <button
                  key={eco.id}
                  onClick={() => setActiveTab(eco.id)}
                  aria-pressed={isActive}
                  className={`w-full text-left p-5 border border-[#1A1614]/10 transition-all duration-300 flex justify-between items-center cursor-pointer focus-visible:outline-none
                    ${isActive ? 'bg-[#1A1614] text-[#F5F2EA]' : 'bg-[#FAF8F5] text-[#1A1614] hover:border-[#D35400]/40'}`}
                >
                  <div>
                    <span className={`text-[12px] font-mono block ${isActive ? 'text-yellow-400' : 'text-[#D35400]'}`}>
                      {eco.period}
                    </span>
                    <span className="font-serif text-[18px] font-normal">{eco.name}</span>
                  </div>
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: eco.color }}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Content Sheet */}
          <div className="lg:col-span-8 bg-[#FAF8F5] border border-[#1A1614]/10 p-8 md:p-12 min-h-[400px] flex flex-col justify-between relative">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1A1614_1px,transparent_1px),linear-gradient(to_bottom,#1A1614_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.015] pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeEco.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col gap-6"
              >
                <div className="flex justify-between items-center border-b border-[#1A1614]/10 pb-4">
                  <span className="text-[12px] font-mono text-[#1A1614]/50 uppercase tracking-widest">
                    ARCHIVAL BINDER // ECO-SYS.{activeEco.id.toUpperCase()}
                  </span>
                  <span className="text-[12px] font-mono text-[#D35400] font-bold uppercase">
                    {activeEco.location}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <span className="text-[12px] font-mono text-[#D35400] uppercase block mb-1">Climatic System</span>
                    <p className="text-[16px] text-[#1A1614]/80 leading-relaxed">{activeEco.climate}</p>
                  </div>
                  <div>
                    <span className="text-[12px] font-mono text-[#D35400] uppercase block mb-1">Dominant Vegetation</span>
                    <p className="text-[16px] text-[#1A1614]/80 leading-relaxed">{activeEco.vegetation}</p>
                  </div>
                </div>

                <div>
                  <span className="text-[12px] font-mono text-[#D35400] uppercase block mb-2">Dominant Creatures Coexisting</span>
                  <div className="flex flex-wrap gap-2">
                    {activeEco.inhabitants.map((inh) => (
                      <span
                        key={inh}
                        className="text-[13px] font-mono text-[#1A1614]/75 border border-[#1A1614]/15 px-3 py-1 bg-[#F5F2EA] rounded-sm"
                      >
                        {inh}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-t border-[#1A1614]/10 pt-6 mt-2">
                  <span className="text-[12px] font-mono text-[#D35400] uppercase block mb-2">Curatorial Field Journal Entries</span>
                  <p className="text-[18px] font-serif text-[#1A1614]/85 leading-relaxed italic">
                    "{activeEco.fieldNotes}"
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="text-[11px] font-mono text-[#1A1614]/30 text-right mt-8">
              Palaeoecology Department · Registry No. {activeEco.id.toUpperCase()}-883
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
