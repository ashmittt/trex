import { useState, type ReactNode } from 'react';
import { motion } from 'motion/react';
import { useAnalytics } from '../context/AnalyticsContext';

interface SpecimenRecord {
  id: string;
  catalogNumber: string;
  name: string;
  recoveryLocation: string;
  dateRecovered: string;
  notes: string;
  scaleRatio: string;
  sketchSvg: ReactNode;
}

const specimens: SpecimenRecord[] = [
  {
    id: 'theropoda',
    catalogNumber: 'FOSSIL-ARC-TRX-082',
    name: 'Tyrannosaurus Rex (Articulated Jaw)',
    recoveryLocation: 'Hell Creek Formation, Garfield County, MT',
    dateRecovered: 'August 12, 2022',
    notes: 'Exhibits robust dentition. Nine complete teeth intact within the dentary. Pathological grooves on the lateral surface suggest combat lesions.',
    scaleRatio: '1:10 (Specimen length 1.2m)',
    sketchSvg: (
      <svg viewBox="0 0 120 80" className="w-full h-full stroke-[#C4903A] fill-none stroke-1">
        <path className="draw-svg" d="M 20,45 Q 40,25 90,30 Q 105,35 105,45 Q 90,60 50,55 Z" />
        <path className="draw-svg" d="M 20,45 Q 40,43 85,50" />
        <path className="draw-svg" d="M 40,43 L 42,48 L 45,43 L 47,48 L 50,43 L 53,48 L 56,43 L 59,48 L 62,43" />
        <path className="draw-svg" d="M 42,47 L 44,43 L 46,47 L 48,43 L 50,47 L 52,43 L 54,47" />
        <circle cx="95" cy="38" r="3" className="stroke-[#C4903A]" />
      </svg>
    ),
  },
  {
    id: 'sauropoda',
    catalogNumber: 'FOSSIL-ARC-BRA-104',
    name: 'Brachiosaurus altithorax (Femur)',
    recoveryLocation: 'Morrison Formation, Grand County, UT',
    dateRecovered: 'October 04, 2019',
    notes: 'Complete left femur measuring 2.03 meters. Dense cortical bone sections indicate fully grown adult. Weight projection estimates 58 tonnes.',
    scaleRatio: '1:20 (Fossil height 2.03m)',
    sketchSvg: (
      <svg viewBox="0 0 120 80" className="w-full h-full stroke-[#C4903A] fill-none stroke-1">
        <path className="draw-svg" d="M 50,15 C 40,15 40,25 45,28 L 45,52 C 40,55 40,65 50,65 C 60,65 60,55 55,52 L 55,28 C 60,25 60,15 50,15 Z" />
        <line x1="35" y1="15" x2="35" y2="65" className="stroke-white/20 stroke-1 stroke-dasharray-[2_2]" />
      </svg>
    ),
  },
  {
    id: 'avialae',
    catalogNumber: 'FOSSIL-ARC-ARC-001',
    name: 'Archaeopteryx lithographica (Feather Impress)',
    recoveryLocation: 'Solnhofen Plattenkalk, Bavaria, Germany',
    dateRecovered: 'September 1861',
    notes: 'Preserves fine asymmetrical barb details. Asymmetry confirms aerodynamic capacity, indicating early transition from cursorial body insulation to aerial lift.',
    scaleRatio: '1:1 (Specimen length 11.4cm)',
    sketchSvg: (
      <svg viewBox="0 0 120 80" className="w-full h-full stroke-[#C4903A] fill-none stroke-[0.75]">
        <path className="draw-svg" d="M 60,70 L 60,10" />
        <path className="draw-svg" d="M 60,65 Q 40,55 35,50 M 60,60 Q 40,50 35,45 M 60,50 Q 40,40 35,35 M 60,40 Q 40,30 35,25 M 60,30 Q 40,20 40,15" />
        <path className="draw-svg" d="M 60,65 Q 75,58 80,55 M 60,60 Q 75,53 80,50 M 60,50 Q 75,43 80,40 M 60,40 Q 75,33 80,30 M 60,30 Q 75,23 78,20" />
      </svg>
    ),
  },
];

export default function PaleontologyArchive() {
  const { incrementDrawer } = useAnalytics();
  const [activeSpecimen, setActiveSpecimen] = useState<string | null>(null);

  const handleHoverSpecimen = (id: string) => {
    setActiveSpecimen(id);
    incrementDrawer(id); // Logs the specimen hover event to telemetry
  };

  return (
    <section 
      id="archive" 
      className="relative min-h-screen bg-[#050505] text-[#F5F2EA] py-32 px-6 md:px-16 flex flex-col justify-center overflow-hidden border-t border-white/5"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#F5F2EA_1px,transparent_1px),linear-gradient(to_bottom,#F5F2EA_1px,transparent_1px)] bg-[size:6rem_6rem] opacity-[0.005] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-10 flex flex-col gap-24">
        
        {/* Header Block */}
        <div className="flex flex-col gap-4 max-w-xl">
          <span className="font-mono text-xs tracking-[0.3em] text-[#C4903A] uppercase">
            Stage 03 // Paleontology Archive
          </span>
          <h2 className="font-serif font-light text-4xl md:text-5xl uppercase tracking-wide leading-tight">
            Fossilized <br />
            <span className="font-serif italic text-[#C4903A]">Ledgers</span>
          </h2>
          <div className="h-[1px] w-20 bg-[#C4903A]/30 my-2" />
          <p className="text-lg font-serif text-[#D8D1C2] italic leading-relaxed">
            "An editorial curation of deep time fragments. Hover over an artifact to inspect catalog details and curate the anatomical ledger."
          </p>
        </div>

        {/* Specimens Staggered List */}
        <div className="flex flex-col gap-36 mt-12">
          {specimens.map((spec, index) => {
            const isEven = index % 2 === 0;
            const isHovered = activeSpecimen === spec.id;

            return (
              <div 
                key={spec.id}
                onMouseEnter={() => handleHoverSpecimen(spec.id)}
                onMouseLeave={() => setActiveSpecimen(null)}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center transition-all duration-700 ${
                  activeSpecimen && !isHovered ? 'opacity-35 blur-[1px]' : 'opacity-100'
                }`}
              >
                {/* Sketch Graphic Box (Staggered Column Order) */}
                <div className={`lg:col-span-6 flex justify-center ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  <motion.div
                    className="relative w-full h-[380px] bg-white/[0.01] hover:bg-white/[0.02] border border-white/5 hover:border-[#C4903A]/30 rounded-sm flex items-center justify-center p-8 transition-all duration-500 overflow-hidden group/tile cursor-pointer shadow-2xl"
                  >
                    {/* Inner glowing corner marks */}
                    <div className="absolute top-2 left-2 w-1.5 h-1.5 border-t border-l border-white/10 group-hover/tile:border-[#C4903A]/30 transition-colors" />
                    <div className="absolute top-2 right-2 w-1.5 h-1.5 border-t border-r border-white/10 group-hover/tile:border-[#C4903A]/30 transition-colors" />
                    <div className="absolute bottom-2 left-2 w-1.5 h-1.5 border-b border-l border-white/10 group-hover/tile:border-[#C4903A]/30 transition-colors" />
                    <div className="absolute bottom-2 right-2 w-1.5 h-1.5 border-b border-r border-white/10 group-hover/tile:border-[#C4903A]/30 transition-colors" />

                    <div className="w-full h-full max-h-56 transform transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/tile:scale-105">
                      {spec.sketchSvg}
                    </div>

                    <span className="absolute bottom-4 right-4 font-mono text-[9px] text-white/25 uppercase tracking-widest">
                      {spec.catalogNumber}
                    </span>
                  </motion.div>
                </div>

                {/* Metadata & Text Details */}
                <div className={`lg:col-span-6 flex flex-col gap-6 ${isEven ? 'lg:order-2 lg:pl-12' : 'lg:order-1 lg:pr-12'}`}>
                  <div className="flex flex-col gap-2">
                    <span className="font-mono text-[10px] tracking-widest text-[#C4903A] uppercase font-semibold">
                      Catalog // {spec.catalogNumber}
                    </span>
                    <h3 className="font-serif text-2xl uppercase tracking-wide text-[#F5F2EA]">
                      {spec.name}
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 gap-4 border-t border-b border-white/5 py-4 font-mono text-[11px] text-[#A9A295]">
                    <div>
                      <span className="text-[#9E8E78] block mb-1">RECOVERY SITE</span>
                      <span className="text-white/80 font-sans">{spec.recoveryLocation}</span>
                    </div>
                    <div>
                      <span className="text-[#9E8E78] block mb-1">SCALE PROFILE</span>
                      <span className="text-[#C4903A] font-bold">{spec.scaleRatio}</span>
                    </div>
                  </div>

                  <p className="font-sans text-sm text-[#A9A295] leading-relaxed">
                    {spec.notes}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
