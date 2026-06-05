import { motion } from 'motion/react';
import { useAnalytics } from '../context/AnalyticsContext';

export default function TriassicSection() {
  const { trackCustomEvent } = useAnalytics();

  const handleMapHover = () => {
    trackCustomEvent('map_inspection', 'Inspected Pangaea Rift System Map specimen');
  };

  return (
    <section
      id="triassic"
      className="relative min-h-screen bg-[#050505] text-[#F5F2EA] flex flex-col justify-center py-32 px-8 md:px-24 border-t border-[#F5F2EA]/10 overflow-hidden"
    >
      {/* Environmental background layer */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/triassic.png"
          alt="Triassic volcanic wilderness"
          className="w-full h-full object-cover opacity-20 filter grayscale-[20%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent z-1" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505] z-1" />
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10 w-full">
        
        {/* Left Column: Curatorial Museum Plaque (Double-Bezel Architecture) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 p-2 bg-[#0D0B08]/40 border border-[#C4903A]/20 rounded-[2rem] shadow-2xl relative group"
        >
          {/* Inner Core */}
          <div className="bg-[#0D0B08] border border-white/5 rounded-[calc(2rem-8px)] p-8 md:p-10 shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)] flex flex-col gap-6">
            {/* Registry label */}
            <div className="flex justify-between items-center border-b border-[#F5F2EA]/15 pb-4">
              <span className="font-mono text-xs text-[#C4903A] uppercase tracking-[0.2em] font-semibold">
                EXHIBIT REF: TRI-252
              </span>
              <span className="font-mono text-xs text-[#E8E0D0] uppercase tracking-widest">
                WING 1 // GALLERY A
              </span>
            </div>

            <span className="font-mono text-xs tracking-[0.3em] text-[#C4903A] uppercase mt-2">
              [ Stage 03 // 252 Ma to 201 Ma ]
            </span>

            <h2
              className="font-serif font-light tracking-tight text-[#F5F2EA] leading-none uppercase"
              style={{ fontSize: 'clamp(2.2rem, 4vw, 4rem)' }}
            >
              Out of the <br />
              <span className="font-serif italic text-[#C4903A] block mt-2">Ashes</span>
            </h2>

            <p className="text-xl md:text-2xl font-serif text-[#E8E0D0] leading-relaxed italic">
              "Earth recovering from the Great Dying. Pangaea was dry, hot, and dominated by rifts of volcanic fire."
            </p>

            <p className="text-base text-[#E8E0D0]/80 leading-relaxed font-sans">
              Following the Permian mass extinction—which wiped out 96% of marine life—the Triassic period witnessed the slow, fragile rebirth of the biosphere. Continents were fused into the supercontinent Pangaea. In the dry interior deserts, the first true dinosaurs emerged: small, nimble, and bipedal, running beneath the shadows of massive crocodile ancestors.
            </p>

            {/* Environmental data log */}
            <div className="grid grid-cols-2 gap-6 border-t border-[#F5F2EA]/15 pt-6 mt-4 font-mono text-[10px]">
              <div>
                <span className="text-[#C4903A] block uppercase tracking-wider mb-1">Atmospheric CO₂</span>
                <span className="text-[#F5F2EA] text-xs">1,500 ppm (5× Modern)</span>
              </div>
              <div>
                <span className="text-[#C4903A] block uppercase tracking-wider mb-1">Global Temp</span>
                <span className="text-[#F5F2EA] text-xs">+10°C relative to today</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Specimen Showcase & Scientific Map (Double-Bezel Architecture) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 p-2 bg-[#050505]/45 border border-white/10 rounded-[2rem] shadow-xl backdrop-blur-sm relative group"
        >
          {/* Inner Core */}
          <div className="bg-[#0A0A0A] border border-white/5 rounded-[calc(2rem-8px)] p-8 md:p-10 flex flex-col gap-6">
            <div className="flex justify-between items-start border-b border-[#F5F2EA]/10 pb-4">
              <span className="font-mono text-xs text-[#9E8E78] uppercase tracking-widest">
                LITHOLOGY RECORD // PANGAEA SURVEY
              </span>
              <span className="font-mono text-xs text-[#C4903A] font-bold uppercase">
                SYS: ARCHOSAURIA
              </span>
            </div>

            {/* Interactive drawing window - Double-Bezel layout on itself */}
            <div 
              onMouseEnter={handleMapHover}
              className="h-64 flex items-center justify-center border border-[#F5F2EA]/10 bg-[#050505] relative overflow-hidden p-6 rounded-[1rem] group-hover:border-[#C4903A]/30 transition-colors duration-500 cursor-crosshair"
            >
              <svg viewBox="0 0 100 60" className="w-full h-full stroke-[#C4903A] fill-none stroke-[0.75]">
                <path className="draw-svg" d="M 20,30 Q 30,10 50,15 T 80,25 T 75,45 T 40,42 Z" />
                <path className="draw-svg" d="M 32,22 Q 42,27 52,24 T 62,32" />
                <path className="draw-svg" d="M 27,37 Q 37,35 47,39" />
                <circle cx="50" cy="24" r="1.5" className="fill-[#C4903A]" />
                <text x="54" y="26" className="font-mono text-[4px] fill-[#C4903A] tracking-wider font-bold">PANGAEA SUPERCONTINENT</text>
                <text x="25" y="48" className="font-mono text-[3px] fill-[#9E8E78] tracking-widest">RIFT SYSTEM ACTIVE</text>
              </svg>
              <div className="absolute bottom-4 right-4 font-mono text-[10px] text-[#9E8E78]">
                252.0 Ma · Early Triassic
              </div>
            </div>

            <div>
              <h4 className="font-serif text-lg text-[#F5F2EA] mb-2 uppercase tracking-wide">
                The Pangaean Wilderness
              </h4>
              <p className="text-sm text-[#E8E0D0] leading-relaxed font-sans">
                Inland regions were massive sand deserts with extreme heat cycles. Herbivores like Lystrosaurus survived in river channels, while early carnivorous dinosaurs evolved high-metabolism bipedal strides to cover long desert distances.
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
