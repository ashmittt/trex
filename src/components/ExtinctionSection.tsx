import { motion } from 'motion/react';
import { useAnalytics } from '../context/AnalyticsContext';

interface ExtinctionPhase {
  time: string;
  title: string;
  description: string;
}

const extinctionTimeline: ExtinctionPhase[] = [
  {
    time: 'MINUTE 00',
    title: 'The Impact',
    description: 'A 10-kilometre asteroid strikes the Gulf of Mexico (Yucatán Peninsula) at 72,000 km/h. The energy released is equivalent to 100 teratons of TNT.',
  },
  {
    time: 'HOUR 01',
    title: 'Fire & Water',
    description: 'A global shockwave triggers magnitude 11 earthquakes and super-tsunamis exceeding 150 metres in height. Superheated ejecta rains back down globally.',
  },
  {
    time: 'WEEK 01',
    title: 'The Great Soot',
    description: 'Vaporized rock, sulfur, and soot rise into the stratosphere, blocking 90% of solar radiation. Photosynthesis ceases completely. The sky turns pitch black.',
  },
  {
    time: 'YEAR 01',
    title: 'The Impact Winter',
    description: 'Stratospheric aerosols drop global temperatures by 15°C. Acid rain defoliates forests and acidifies shallow seas, collapsing food chains at their primary base.',
  },
  {
    time: 'YEAR 100,000',
    title: 'The Silent Earth',
    description: '75% of all species—including every land animal weighing over 25 kilograms—are permanently gone. Non-avian dinosaurs are extinct.',
  },
];

export default function ExtinctionSection() {
  const { trackCustomEvent } = useAnalytics();

  const handlePhaseHover = (title: string) => {
    trackCustomEvent('extinction_inspection', `Inspected extinction chronology event: ${title}`);
  };

  return (
    <section
      id="extinction"
      className="relative min-h-screen bg-[#050505] text-[#F5F2EA] flex flex-col justify-center py-32 px-8 md:px-24 border-t border-[#F5F2EA]/10 overflow-hidden"
    >
      {/* Environmental background layer */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/extinction.png"
          alt="Chicxulub asteroid impact cataclysm"
          className="w-full h-full object-cover opacity-15 filter grayscale-[15%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/85 to-transparent z-1" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505] z-1" />
      </div>

      <div className="max-w-6xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Column: Plaque Description (Double-Bezel Architecture) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 p-2 bg-[#0D0B08]/40 border border-red-950/60 rounded-[2rem] shadow-2xl relative"
        >
          {/* Inner Core */}
          <div className="bg-[#0D0B08] border border-white/5 rounded-[calc(2rem-8px)] p-8 md:p-10 shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)] flex flex-col gap-6">
            <div className="flex justify-between items-center border-b border-red-950/30 pb-4">
              <span className="font-mono text-xs text-red-500 uppercase tracking-[0.2em] font-semibold">
                EXHIBIT REF: EXT-066
              </span>
              <span className="font-mono text-xs text-[#E8E0D0] uppercase tracking-widest">
                WING 1 // GALLERY D
              </span>
            </div>

            <span className="font-mono text-xs tracking-[0.3em] text-red-500 uppercase mt-2">
              [ Stage 09 // Chicxulub Impact ]
            </span>

            <h2
              className="font-serif font-light tracking-tight text-[#F5F2EA] leading-none uppercase"
              style={{ fontSize: 'clamp(2.2rem, 4vw, 4rem)' }}
            >
              The Day the <br />
              <span className="font-serif italic text-red-500 block mt-2">Sky Fell</span>
            </h2>

            <p className="text-xl md:text-2xl font-serif text-[#E8E0D0] leading-relaxed italic">
              "66 million years ago, a single hour rewrote the next 100 million years of life. An entire world collapsed under a blanket of soot."
            </p>

            <p className="text-base text-[#E8E0D0]/85 leading-relaxed font-sans">
              The Cretaceous-Paleogene extinction was not a slow decline. It was an instantaneous biological reset. What survived were the small, burrowing, and avian creatures.
            </p>
          </div>
        </motion.div>

        {/* Right Column: Chronological Timeline Display (Double-Bezel Architecture) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 p-2 bg-[#050505]/45 border border-red-950/30 rounded-[2rem] shadow-xl relative"
        >
          {/* Inner Core */}
          <div className="bg-[#0A0A0A] border border-white/5 rounded-[calc(2rem-8px)] p-8 md:p-12 flex flex-col gap-6">
            <div className="flex justify-between items-start border-b border-red-950/30 pb-4 mb-2">
              <span className="font-mono text-xs text-red-500/85 uppercase tracking-widest font-semibold">
                IMPACT CHRONOLOGY // SEC.K-PG
              </span>
              <span className="font-mono text-xs text-red-500 font-bold uppercase tracking-wider">
                CATACLYSMIC THRESHOLD
              </span>
            </div>

            <div className="flex flex-col gap-6">
              {extinctionTimeline.map((phase) => (
                <div 
                  key={phase.time} 
                  onMouseEnter={() => handlePhaseHover(phase.title)}
                  className="flex gap-6 items-start border-l border-red-950/40 pl-6 relative group/phase cursor-pointer"
                >
                  {/* Visual marker dot */}
                  <div className="w-2.5 h-2.5 rounded-full bg-red-800 group-hover/phase:bg-red-500 absolute -left-[5.5px] top-1.5 transition-colors duration-300" />
                  
                  <div className="w-32 shrink-0 font-mono">
                    <span className="text-[10px] text-red-500 tracking-wider block font-bold">{phase.time}</span>
                    <span className="text-xs md:text-sm font-serif text-[#F5F2EA] block font-normal mt-0.5 uppercase tracking-wide group-hover/phase:text-red-400 transition-colors">{phase.title}</span>
                  </div>
                  
                  <p className="text-xs md:text-sm text-[#E8E0D0]/80 group-hover/phase:text-[#F5F2EA] leading-relaxed flex-1 font-sans transition-colors">
                    {phase.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
