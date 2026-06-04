import { motion } from 'motion/react';

interface EvolutionStage {
  mya: string;
  name: string;
  representative: string;
  skeletalChanges: string[];
  description: string;
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
  },
];

export default function EvolutionSection() {
  return (
    <section className="relative min-h-screen bg-[#FAF8F5] text-[#1A1614] border-t border-[#1A1614]/15 p-6 md:p-16 flex flex-col justify-center overflow-hidden">
      {/* Background Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none opacity-[0.02] text-mega font-bold uppercase text-[#1A1614] z-0">
        Descendants
      </div>

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <span className="text-[13px] font-mono tracking-[0.4em] text-[#8C3A2D] uppercase block mb-4">
          STAGE 06 // THE EVOLUTIONARY LINE
        </span>
        <h2
          className="font-serif font-normal tracking-tight text-[#1A1614] leading-none mb-12"
          style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
        >
          Feathered <br />
          <span className="font-cursive text-[#8C3A2D] lowercase tracking-normal text-4xl md:text-7xl block mt-2">Descendants</span>
        </h2>

        {/* Horizontal Evolution Track */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {evolutionStages.map((stage, idx) => (
            <motion.div
              key={stage.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="border border-[#1A1614]/10 bg-[#F5F2EA] p-6 hover:border-[#8C3A2D]/40 transition-colors duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-baseline border-b border-[#1A1614]/10 pb-3 mb-4">
                  <span className="text-[14px] font-mono font-bold text-[#8C3A2D]">{stage.mya}</span>
                  <span className="text-[11px] font-mono text-[#1A1614]/40 uppercase tracking-widest">
                    STAGE 0{idx + 1}
                  </span>
                </div>

                <h3 className="font-serif text-[22px] text-[#1A1614] font-normal leading-tight mb-1">
                  {stage.name}
                </h3>
                <p className="text-[13px] font-mono text-[#1A1614]/50 mb-4">{stage.representative}</p>

                <p className="text-[15px] text-[#1A1614]/75 leading-relaxed font-serif mb-6">
                  {stage.description}
                </p>
              </div>

              <div>
                <span className="text-[12px] font-mono text-[#8C3A2D] uppercase block mb-2">Anatomical Marker</span>
                <ul className="text-xs font-mono text-[#1A1614]/70 space-y-1.5">
                  {stage.skeletalChanges.map((change) => (
                    <li key={change} className="flex gap-2 items-start">
                      <span className="text-[#8C3A2D] font-bold">·</span>
                      <span>{change}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
