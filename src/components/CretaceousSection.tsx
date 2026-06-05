import { motion } from 'motion/react';
import { useAnalytics } from '../context/AnalyticsContext';

interface ChronologyItem {
  time: string;
  title: string;
  desc: string;
}

const impactTimeline: ChronologyItem[] = [
  {
    time: 'Minute 00',
    title: 'The Chicxulub Strike',
    desc: 'A 10-kilometer asteroid collides with the Yucatán Peninsula at 72,000 km/h, releasing energy equivalent to 100 teratons of TNT and triggering global megatsunamis.',
  },
  {
    time: 'Year 01',
    title: 'The Great Soot & Darkness',
    desc: 'Stratospheric aerosols and soot block 90% of solar radiation. Global temperatures plummet by 15°C. Photosynthesis ceases, collapsing food chains at their primary base.',
  },
  {
    time: 'Year 100,000',
    title: 'The Biological Reset',
    desc: '75% of all species—including every non-avian dinosaur—are permanently erased. Small, burrowing mammals survive, inheriting the quiet planet.',
  },
];

export default function CretaceousSection() {
  const { trackCustomEvent } = useAnalytics();

  const handleTimelineHover = (title: string) => {
    trackCustomEvent('extinction_inspection', `Hovered over K-Pg event: ${title}`);
  };

  return (
    <section
      id="cretaceous"
      className="relative min-h-screen bg-[#050505] text-[#F5F2EA] flex flex-col justify-center py-40 px-6 md:px-16 overflow-hidden border-t border-white/5"
    >
      {/* Immersive background layer */}
      <div className="absolute inset-0 z-0">
        <motion.img
          initial={{ scale: 1.05 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
          src="/images/extinction.png"
          alt="The Chicxulub cosmic impact aftermath"
          className="w-full h-full object-cover opacity-15 filter grayscale-[25%]"
        />
        {/* Soft atmospheric gradients mimicking museum spotlighting */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/90 to-transparent z-1" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505] z-1" />
      </div>

      <div className="max-w-6xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        
        {/* Left Column: Atmospheric Narrative */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <span className="font-mono text-xs tracking-[0.3em] text-[#C4903A] uppercase">
            Stage 05 // The K-Pg Threshold
          </span>
          <h2 className="font-serif font-light text-4xl md:text-5xl uppercase tracking-wide leading-tight text-[#F5F2EA]">
            The Day the <br />
            <span className="font-serif italic text-red-500 block mt-2">Sky Fell</span>
          </h2>
          <div className="h-[1px] w-20 bg-red-950/40 my-2" />
          <p className="text-xl md:text-2xl font-serif text-[#D8D1C2] italic leading-relaxed">
            "Sixty-six million years ago, a single hour rewrote the next hundred million years of life."
          </p>
          <p className="font-sans text-sm text-[#A9A295] leading-relaxed">
            The Cretaceous-Paleogene extinction event was not a slow decline. It was an instantaneous cosmic shock wave. The resulting stratospheric dust blanketed the planet, turning midday into pitch black winter and resetting the biosphere for a new evolutionary lineage.
          </p>
        </div>

        {/* Right Column: Restrained Editorial Chronology */}
        <div className="lg:col-span-7 lg:pl-12 flex flex-col gap-12">
          <div className="flex justify-between items-center border-b border-white/5 pb-3">
            <span className="font-mono text-[10px] text-[#9E8E78] uppercase tracking-widest">
              IMPACT TRAJECTORY // SEGMENT SEC.K-PG
            </span>
            <span className="font-mono text-[9px] text-red-500 font-bold uppercase tracking-wider">
              Cataclysm Index
            </span>
          </div>

          <div className="flex flex-col gap-10">
            {impactTimeline.map((item) => (
              <div
                key={item.time}
                onMouseEnter={() => handleTimelineHover(item.title)}
                className="group flex flex-col md:flex-row gap-4 items-start border-l border-white/5 hover:border-red-500/20 pl-6 transition-all duration-500 cursor-pointer"
              >
                <div className="w-24 shrink-0 font-mono">
                  <span className="text-[10px] text-red-500/80 tracking-wider block font-bold">
                    {item.time.toUpperCase()}
                  </span>
                </div>

                <div className="flex-1 flex flex-col gap-2">
                  <h3 className="font-serif text-lg text-white/90 group-hover:text-red-400 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="font-sans text-xs text-[#A9A295] leading-relaxed group-hover:text-white/80 transition-colors">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
