import { motion } from 'motion/react';

interface EvolutionStage {
  mya: string;
  name: string;
  representative: string;
  skeletalChanges: string[];
  description: string;
  notes: string;
}

const evolutionStages: EvolutionStage[] = [
  {
    mya: '230 Ma',
    name: 'Early Theropoda',
    representative: 'Coelophysis / Herrerasaurus',
    skeletalChanges: [
      'Hollow, thin-walled limb bones',
      'Three-toed foot structure (theropod blueprint)',
      'Highly flexible neck vertebrae',
    ],
    description: 'The foundation of the avian lineage. Small, fast, bipedal cursorial reptiles. Hollow bones evolve not for flight, but to reduce mass and increase agility on the ground.',
    notes: 'Excavated in Ghost Ranch, NM. Specimen reveals hollow bone cavities indicating high-velocity metabolism.',
  },
  {
    mya: '160 Ma',
    name: 'Feathered Coelurosauria',
    representative: 'Anchiornis / Sinosauropteryx',
    skeletalChanges: [
      'Presence of branching proto-feathers (insulation)',
      'Elongated forelimbs and hands',
      'Wishbone (clavicle fusion) fully formed',
    ],
    description: 'Feathers appear as simple filamentous structures. Used primarily for thermal regulation and social display. Dinosaurs start to look avian, but are entirely flightless.',
    notes: 'Liaoning Province, China. Melanosomes preserve evidence of reddish-brown feather rings.',
  },
  {
    mya: '150 Ma',
    name: 'Transitional Avialae',
    representative: 'Archaeopteryx lithographica',
    skeletalChanges: [
      'Asymmetrical flight feathers (aerodynamics)',
      'Reversed hallux (perching toe)',
      'Retained bony tail and jaw teeth',
    ],
    description: 'The iconic link. A creature possessing dinosaurian teeth, claws, and a long bony tail, but fully formed flight feathers capable of gliding or low-powered flight.',
    notes: 'Solnhofen Limestone, Germany (1861). Feather impressions show advanced aerofoil profile.',
  },
  {
    mya: '66 Ma – Present',
    name: 'Avian Dinosaurs',
    representative: 'Neornithes (Modern Birds)',
    skeletalChanges: [
      'Tail fused into pygostyle (tail fan base)',
      'Toothless keratin beak (mass reduction)',
      'Keeled sternum (flight muscle attachment)',
    ],
    description: 'The survivors of the asteroid. Non-avian dinosaurs went extinct, but feathered theropods lived on. Every eagle, falcon, and sparrow outside your window is a living theropod.',
    notes: 'Continuous biological thread spanning from the Cretaceous extinction directly to modern ecosystem profiles.',
  },
];

export default function EvolutionSection() {
  return (
    <section id="evolution" className="relative min-h-screen bg-bg-shale text-txt-parchment border-t border-txt-parchment/10 py-24 px-8 md:px-24 flex flex-col justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#E8E0D0_1px,transparent_1px),linear-gradient(to_bottom,#E8E0D0_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.015] pointer-events-none" />

      {/* Background Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none opacity-[0.012] text-mega font-bold uppercase text-txt-parchment z-0">
        Descendants
      </div>

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <span className="font-mono text-xs tracking-[0.4em] text-annotation uppercase block mb-4">
          STAGE 07 // THE EVOLUTIONARY LINE
        </span>
        <h2
          className="font-serif font-light tracking-tight text-txt-parchment leading-none mb-16 uppercase"
          style={{ fontSize: 'clamp(2.5rem, 5.5vw, 5rem)' }}
        >
          Feathered <br />
          <span className="font-serif italic text-annotation block mt-2">Descendants</span>
        </h2>

        {/* Lineage Branching Visual Map */}
        <div className="relative w-full mb-16 h-36 hidden md:block">
          <svg viewBox="0 0 1000 120" className="w-full h-full fill-none stroke-[1] stroke-annotation">
            {/* The main lineage line */}
            <path className="draw-svg" d="M 50,60 Q 200,60 300,30 T 550,90 T 800,40 T 950,60" />
            
            {/* Node Dots */}
            <circle cx="50" cy="60" r="3" className="fill-bg-shale stroke-annotation stroke-2" />
            <circle cx="300" cy="30" r="3" className="fill-bg-shale stroke-annotation stroke-2" />
            <circle cx="550" cy="90" r="3" className="fill-bg-shale stroke-annotation stroke-2" />
            <circle cx="800" cy="40" r="3" className="fill-bg-shale stroke-annotation stroke-2" />
            
            {/* Labels */}
            <text x="50" y="90" className="font-mono text-[9px] fill-txt-limestone tracking-widest text-center">ARCHOSAURIA</text>
            <text x="300" y="15" className="font-mono text-[9px] fill-txt-limestone tracking-widest">COELUROSAURIA</text>
            <text x="550" y="115" className="font-mono text-[9px] fill-txt-limestone tracking-widest">AVIALAE</text>
            <text x="800" y="15" className="font-mono text-[9px] fill-txt-limestone tracking-widest">NEORNITHES</text>
          </svg>
        </div>

        {/* Notebook Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {evolutionStages.map((stage, idx) => (
            <motion.div
              key={stage.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              className="border border-txt-parchment/10 bg-black/40 p-6 hover:border-annotation/40 transition-all duration-300 flex flex-col justify-between relative"
            >
              {/* Notebook binding margin decoration */}
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-annotation/20" />

              <div className="pl-3">
                <div className="flex justify-between items-baseline border-b border-txt-parchment/10 pb-3 mb-4">
                  <span className="font-mono text-sm font-bold text-annotation">{stage.mya}</span>
                  <span className="font-mono text-[10px] text-txt-limestone/40 uppercase tracking-widest">
                    STAGE 0{idx + 1}
                  </span>
                </div>

                <h3 className="font-serif text-2xl text-txt-parchment font-light leading-tight mb-1 uppercase">
                  {stage.name}
                </h3>
                <p className="font-mono text-xs text-accent-amber mb-4 italic">{stage.representative}</p>

                <p className="text-[15px] text-txt-parchment/80 leading-relaxed font-sans mb-6">
                  {stage.description}
                </p>
              </div>

              <div className="pl-3 border-t border-txt-parchment/10 pt-4 mt-2">
                <span className="font-mono text-[10px] text-annotation uppercase block mb-2 font-bold">Anatomical Marker</span>
                <ul className="text-xs font-mono text-txt-limestone/75 space-y-1.5">
                  {stage.skeletalChanges.map((change) => (
                    <li key={change} className="flex gap-2 items-start">
                      <span className="text-annotation font-bold">•</span>
                      <span>{change}</span>
                    </li>
                  ))}
                </ul>

                <span className="font-mono text-[9px] text-txt-limestone/40 uppercase block mt-6">
                  JOURNAL NOTE: {stage.notes}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
