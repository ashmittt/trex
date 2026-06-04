

interface ExtinctionPhase {
  time: string;
  title: string;
  description: string;
}

const extinctionTimeline: ExtinctionPhase[] = [
  {
    time: 'MINUTE 00',
    title: 'The Impact',
    description: 'A 10-kilometre asteroid strikes the Gulf of Mexico (Yucatán Peninsula) at 72,000 km/h. The energy released is equivalent to 100 teratons of TNT—billions of Hiroshima bombs.',
  },
  {
    time: 'HOUR 01',
    title: 'Fire & Water',
    description: 'A global shockwave triggers magnitude 11 earthquakes and super-tsunamis exceeding 150 metres in height. Superheated ejecta rains back down globally, raising temperatures to oven-like heat.',
  },
  {
    time: 'WEEK 01',
    title: 'The Great Soot',
    description: 'Vaporized rock, sulfur, and soot rise into the stratosphere, blocking 90% of solar radiation. Photosynthesis ceases completely. The sky turns pitch black.',
  },
  {
    time: 'YEAR 01',
    title: 'The Impact Winter',
    description: 'Stratospheric aerosols drop global temperatures by 15°C. Acid rain defoliates forests and acidifies shallow seas, collapsing food chains at their primary photosynthetic base.',
  },
  {
    time: 'YEAR 100,000',
    title: 'The Silent Earth',
    description: '75% of all species—including every land animal weighing over 25 kilograms—are permanently gone. Non-avian dinosaurs are extinct. The Mesozoic ends in silence.',
  },
];

export default function ExtinctionSection() {
  return (
    <section className="relative min-h-screen bg-[#0A0505] text-[#FAF8F5] flex flex-col justify-center border-t border-red-950 p-6 md:p-16 overflow-hidden">
      {/* Background Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none opacity-[0.015] text-mega font-bold uppercase text-red-700 z-0">
        Cataclysm
      </div>

      <div className="max-w-6xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Narrative */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <span className="text-[13px] font-mono tracking-[0.3em] text-red-600 uppercase">
              [ 08 // CHICXULUB IMPACT ]
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping" />
            <span className="text-[13px] font-mono tracking-widest text-[#FAF8F5]/50 uppercase">
              K-PG CATACLYSM
            </span>
          </div>

          <h2
            className="font-serif font-normal tracking-tight text-[#FAF8F5] leading-none"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
          >
            The Day the <br />
            <span className="font-cursive text-red-500 lowercase tracking-normal text-4xl md:text-7xl block mt-2">Sky Fell</span>
          </h2>

          <p className="text-[19px] font-serif text-[#D8D1C2] leading-relaxed italic max-w-sm">
            "66 million years ago, a single hour rewrote the next 100 million years of life. An entire world collapsed under a blanket of soot."
          </p>

          <p className="text-[16px] text-[#FAF8F5]/75 leading-relaxed max-w-sm font-mono">
            The Cretaceous-Paleogene extinction was not a slow decline. It was an instantaneous biological reset. What survived were the small, burrowing, and avian creatures.
          </p>
        </div>

        {/* Right Column: Chronological Countdown */}
        <div className="lg:col-span-7 flex flex-col gap-4 border border-red-950 bg-black/60 p-8 md:p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#E11D48_1px,transparent_1px),linear-gradient(to_bottom,#E11D48_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.01] pointer-events-none" />

          <div className="flex justify-between items-start border-b border-red-950 pb-4 mb-4">
            <span className="text-[12px] font-mono text-red-500/50 uppercase tracking-widest">
              Impact Chronology // SEC.K-PG
            </span>
            <span className="text-[12px] font-mono text-red-500 font-bold uppercase">
              CATACLYSMIC THRESHOLD
            </span>
          </div>

          <div className="flex flex-col gap-6">
            {extinctionTimeline.map((phase) => (
              <div key={phase.time} className="flex gap-6 items-start border-l border-red-900/55 pl-6 relative">
                {/* Visual marker dot */}
                <div className="w-2.5 h-2.5 rounded-full bg-red-600 border border-black absolute -left-[5.5px] top-1.5" />
                
                <div className="w-32 shrink-0">
                  <span className="text-[13px] font-mono text-red-500 tracking-wider block font-bold">{phase.time}</span>
                  <span className="text-[16px] font-serif text-[#FAF8F5] block font-normal mt-0.5">{phase.title}</span>
                </div>
                
                <p className="text-[15px] text-[#FAF8F5]/75 leading-relaxed flex-1 font-mono">
                  {phase.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
