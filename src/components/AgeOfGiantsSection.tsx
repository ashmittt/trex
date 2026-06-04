import { motion } from 'motion/react';

export default function AgeOfGiantsSection() {
  const comparisons = [
    { name: 'Human', height: '1.8 m', weight: '80 kg', pct: 'h-[11%]', color: 'bg-gray-600' },
    { name: 'African Elephant', height: '3.3 m', weight: '6,000 kg', pct: 'h-[20%]', color: 'bg-[#A07C4F]' },
    { name: 'Tyrannosaurus Rex', height: '4.0 m', weight: '8,000 kg', pct: 'h-[25%]', color: 'bg-[#8C3A2D]' },
    { name: 'Brachiosaurus', height: '16.0 m', weight: '62,000 kg', pct: 'h-[100%]', color: 'bg-yellow-400' },
  ];

  return (
    <section className="relative min-h-screen bg-[#050505] text-[#F5F2EA] flex flex-col justify-center border-t border-[#F5F2EA]/10 p-6 md:p-16 overflow-hidden">
      {/* Background Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none opacity-[0.02] text-mega font-bold uppercase text-[#FAF8F5] z-0">
        Scale
      </div>

      <div className="max-w-6xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Narrative */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <span className="text-[13px] font-mono tracking-[0.3em] text-yellow-400 uppercase">
              [ 07 // SCALE BIAS ]
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
            <span className="text-[13px] font-mono tracking-widest text-[#FAF8F5]/50 uppercase">
              THE AGE OF GIANTS
            </span>
          </div>

          <h2
            className="font-serif font-normal tracking-tight text-[#FAF8F5] leading-none animate-fade"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
          >
            A World of <br />
            <span className="font-cursive text-yellow-400 lowercase tracking-normal text-4xl md:text-7xl block mt-2">Titanism</span>
          </h2>

          <p className="text-[19px] font-serif text-[#D8D1C2] leading-relaxed italic max-w-sm">
            "We are but dust. Walk beneath the limbs of creatures so massive that their footprints were lakes, and their heartbeats could shake the soil."
          </p>

          <p className="text-[16px] text-[#FAF8F5]/75 leading-relaxed max-w-sm font-mono">
            Mesozoic gigantism was enabled by high levels of oxygen, carbon dioxide, and abundant warmth. The sauropods achieved weights exceeding 60 tonnes—dwarfing every land mammal in earth's history.
          </p>
        </div>

        {/* Right Column: Comparative Height Blocks */}
        <div className="lg:col-span-7 h-[500px] flex items-end justify-between border border-[#FAF8F5]/10 bg-black/40 p-8 md:p-12 relative overflow-hidden">
          {/* Vertical Grid Ticks */}
          <div className="absolute left-4 top-8 bottom-8 flex flex-col justify-between font-mono text-[10px] text-[#FAF8F5]/40 select-none">
            <span>[ 16.0m ]</span>
            <span>[ 12.0m ]</span>
            <span>[ 8.0m ]</span>
            <span>[ 4.0m ]</span>
            <span>[ 0.0m ]</span>
          </div>

          {/* Scale columns */}
          <div className="flex-1 ml-12 h-full flex items-end justify-around gap-6">
            {comparisons.map((c, idx) => (
              <div key={c.name} className="h-full flex flex-col justify-end items-center text-center w-24">
                {/* Visual comparative height block */}
                <motion.div
                  initial={{ height: 0 }}
                  whileInView={{ height: c.pct.replace('h-[', '').replace('%]', '') + '%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: idx * 0.15 }}
                  className={`w-4 md:w-8 ${c.color} opacity-80 rounded-sm mb-4`}
                />
                
                <span className="text-[12px] font-mono text-yellow-400 font-bold block">{c.height}</span>
                <span className="text-[13px] font-serif text-[#FAF8F5] leading-tight block mt-1">{c.name}</span>
                <span className="text-[11px] font-mono text-[#FAF8F5]/45 block mt-0.5">{c.weight}</span>
              </div>
            ))}
          </div>

          <div className="absolute top-4 right-4 text-[11px] font-mono text-[#FAF8F5]/30">
            Dimension Profile: Sauropoda vs Mammalia
          </div>
        </div>

      </div>
    </section>
  );
}
