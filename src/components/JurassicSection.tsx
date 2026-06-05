import { motion } from 'motion/react';
import { useAnalytics } from '../context/AnalyticsContext';

interface ScaleComparison {
  name: string;
  height: string;
  weight: string;
  pct: string;
  color: string;
}

const comparisons: ScaleComparison[] = [
  { name: 'Human', height: '1.8m', weight: '80kg', pct: 'h-[11%]', color: 'bg-[#9E8E78]' },
  { name: 'African Elephant', height: '3.3m', weight: '6,000kg', pct: 'h-[20%]', color: 'bg-[#6B8C6E]/80' },
  { name: 'Allosaurus', height: '4.0m', weight: '2,500kg', pct: 'h-[25%]', color: 'bg-[#C4903A]/70' },
  { name: 'Brachiosaurus', height: '16.0m', weight: '62,000kg', pct: 'h-[100%]', color: 'bg-[#C4903A]' },
];

export default function JurassicSection() {
  const { trackCustomEvent } = useAnalytics();

  const handleScaleHover = (name: string) => {
    trackCustomEvent('scale_inspection', `Hovered and reviewed ${name} scale statistics`);
  };

  return (
    <section
      id="jurassic"
      className="relative min-h-screen bg-[#050505] text-[#F5F2EA] flex flex-col justify-center py-32 px-8 md:px-24 border-t border-[#F5F2EA]/10 overflow-hidden"
    >
      {/* Environmental background layer */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/jurassic.png"
          alt="Lush Jurassic forest canopy with Brachiosaurus"
          className="w-full h-full object-cover opacity-20 filter grayscale-[20%]"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-[#050505] via-[#050505]/80 to-transparent z-1" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505] z-1" />
      </div>

      <div className="max-w-6xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Column: Exhibit Plaque (Double-Bezel Architecture) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 p-2 bg-[#0D0B08]/40 border border-[#6B8C6E]/30 rounded-[2rem] shadow-2xl relative"
        >
          {/* Inner Core */}
          <div className="bg-[#0D0B08] border border-white/5 rounded-[calc(2rem-8px)] p-8 md:p-10 shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)] flex flex-col gap-6">
            <div className="flex justify-between items-center border-b border-[#F5F2EA]/15 pb-4">
              <span className="font-mono text-xs text-[#6B8C6E] uppercase tracking-[0.2em] font-semibold">
                EXHIBIT REF: JUR-105
              </span>
              <span className="font-mono text-xs text-[#E8E0D0] uppercase tracking-widest">
                WING 1 // GALLERY B
              </span>
            </div>

            <span className="font-mono text-xs tracking-[0.3em] text-[#6B8C6E] uppercase mt-2">
              [ Stage 04 // 201 Ma to 145 Ma ]
            </span>

            <h2
              className="font-serif font-light tracking-tight text-[#F5F2EA] leading-none uppercase"
              style={{ fontSize: 'clamp(2.2rem, 4vw, 4rem)' }}
            >
              The Forest <br />
              <span className="font-serif italic text-[#C4903A] block mt-2">of Giants</span>
            </h2>

            <p className="text-xl md:text-2xl font-serif text-[#E8E0D0] leading-relaxed italic">
              "A greenhouse planet choked in green. High rainfall and humidity nurtured towering forests, calling forth gargantuan life."
            </p>

            <p className="text-base text-[#E8E0D0]/80 leading-relaxed font-sans">
              As Pangaea fragmented, ocean currents shifted, warming the globe and bringing heavy rainfall to the dry interiors. Vast evergreen forests spread across the continents. To exploit this sudden abundance of high-altitude foliage, sauropod dinosaurs grew to sizes never seen before or since—becoming living skyscrapers.
            </p>

            {/* Canopy Stratigraphy Display */}
            <div className="space-y-4 font-mono text-[11px] border-t border-[#F5F2EA]/15 pt-6 mt-4">
              <span className="text-xs text-[#6B8C6E] uppercase tracking-wider block mb-2">Canopy Stratigraphy</span>
              <div className="border-l-2 border-[#C4903A] pl-4 py-1">
                <div className="flex justify-between text-[#F5F2EA] font-semibold">
                  <span>Canopy Layer (15m - 30m)</span>
                  <span className="text-[#C4903A]">Brachiosaurus</span>
                </div>
                <p className="text-xs text-[#9E8E78] mt-0.5 font-sans leading-normal">
                  Araucaria & Ginkgo conifers. High-pressure cardiopulmonary flow required for browsing.
                </p>
              </div>
              <div className="border-l-2 border-[#6B8C6E] pl-4 py-1">
                <div className="flex justify-between text-[#F5F2EA] font-semibold">
                  <span>Understory (5m - 15m)</span>
                  <span className="text-[#6B8C6E]">Diplodocus</span>
                </div>
                <p className="text-xs text-[#9E8E78] mt-0.5 font-sans leading-normal">
                  Tree ferns & tall cycads. Horizontal neck sweep feeding pattern.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Physical Scale Indicator Display (Double-Bezel Architecture) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 p-2 bg-[#050505]/45 border border-white/10 rounded-[2rem] shadow-xl relative h-[550px] w-full"
        >
          {/* Inner Core */}
          <div className="bg-[#0A0A0A] border border-white/5 rounded-[calc(2rem-8px)] p-8 md:p-12 w-full h-full flex flex-col justify-end items-stretch relative overflow-hidden">
            {/* Vertical Grid Ticks */}
            <div className="absolute left-6 top-8 bottom-20 flex flex-col justify-between font-mono text-[10px] text-[#9E8E78] select-none z-10">
              <span>[ 16.0m ]</span>
              <span>[ 12.0m ]</span>
              <span>[ 8.0m ]</span>
              <span>[ 4.0m ]</span>
              <span>[ 0.0m ]</span>
            </div>

            {/* Scale columns */}
            <div className="flex-1 ml-16 h-full flex items-end justify-around gap-4 pb-6 z-10">
              {comparisons.map((c, idx) => (
                <div 
                  key={c.name} 
                  onMouseEnter={() => handleScaleHover(c.name)}
                  className="h-full flex flex-col justify-end items-center text-center w-24 group/bar cursor-pointer"
                >
                  {/* Visual comparative height block */}
                  <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: c.pct.replace('h-[', '').replace('%]', '') + '%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: idx * 0.15 }}
                    className={`w-4 md:w-8 ${c.color} rounded-sm mb-4 border border-[#F5F2EA]/10 group-hover/bar:brightness-125 transition-all duration-300 shadow-[0_0_15px_rgba(196,144,58,0.15)]`}
                  />
                  
                  <span className="text-[10px] font-mono text-[#C4903A] font-bold block">{c.height}</span>
                  <span className="text-xs font-serif text-[#F5F2EA] leading-tight block mt-1 uppercase group-hover/bar:text-[#C4903A] transition-colors">{c.name}</span>
                  <span className="text-[9px] font-mono text-[#9E8E78] block mt-0.5">{c.weight}</span>
                </div>
              ))}
            </div>

            <div className="absolute bottom-4 right-6 text-[10px] font-mono text-[#9E8E78] uppercase">
              Dimension Profile: Sauropoda vs Mammalia
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
