

export default function JurassicSection() {
  return (
    <section className="relative min-h-screen bg-[#08100C] text-[#F5F2EA] flex flex-col justify-center border-t border-[#F5F2EA]/10 p-6 md:p-16 overflow-hidden">
      {/* Background Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none opacity-[0.02] text-mega font-bold uppercase text-[#FAF8F5] z-0">
        Giants
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Column: Forest Layer Mapping */}
        <div className="lg:col-span-6 flex flex-col gap-6 bg-[#0E1A14] border border-[#FAF8F5]/10 p-8 md:p-12 relative">
          <div className="flex justify-between items-center border-b border-[#FAF8F5]/10 pb-4 mb-4">
            <span className="text-[12px] font-mono text-[#FAF8F5]/40 uppercase tracking-widest">
              Forest Stratigraphy // JUR-201
            </span>
            <span className="text-[12px] font-mono text-yellow-400 font-bold uppercase">
              ECOSYSTEM: MORRISON
            </span>
          </div>

          {/* Interactive Forest Height Stratum Diagram */}
          <div className="space-y-4 font-mono text-[14px]">
            {/* Canopy */}
            <div className="border-l-2 border-yellow-400 pl-4 py-1">
              <div className="flex justify-between text-[#FAF8F5] font-semibold">
                <span>Canopy Layer (15m - 30m)</span>
                <span className="text-yellow-400">Brachiosaurus</span>
              </div>
              <p className="text-xs text-[#FAF8F5]/60 mt-0.5">
                Araucaria & Ginkgo conifers. High-pressure cardiopulmonary flow required for browsing.
              </p>
            </div>

            {/* Mid-tier */}
            <div className="border-l-2 border-[#D35400] pl-4 py-1">
              <div className="flex justify-between text-[#FAF8F5] font-semibold">
                <span>Understory (5m - 15m)</span>
                <span className="text-[#D35400]">Diplodocus</span>
              </div>
              <p className="text-xs text-[#FAF8F5]/60 mt-0.5">
                Tree ferns & tall cycads. Horizontal neck sweep feeding pattern.
              </p>
            </div>

            {/* Ground */}
            <div className="border-l-2 border-gray-500 pl-4 py-1">
              <div className="flex justify-between text-[#FAF8F5] font-semibold">
                <span>Forest Floor (0m - 5m)</span>
                <span className="text-gray-400">Stegosaurus</span>
              </div>
              <p className="text-xs text-[#FAF8F5]/60 mt-0.5">
                Ferns, clubmosses, and low cycad shrubbery. Digestion optimized for low-lying cellulose.
              </p>
            </div>
          </div>

          <div className="absolute bottom-4 right-4 text-[11px] font-mono text-[#FAF8F5]/30">
            Morrison Formation Profile
          </div>
        </div>

        {/* Right Column: Narrative */}
        <div className="lg:col-span-6 flex flex-col gap-6 lg:pl-6">
          <div className="flex items-center gap-3">
            <span className="text-[13px] font-mono tracking-[0.3em] text-yellow-400 uppercase">
              [ 03 // 201 MA TO 145 MA ]
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
            <span className="text-[13px] font-mono tracking-widest text-[#FAF8F5]/50 uppercase">
              JURASSIC PERIOD
            </span>
          </div>

          <h2
            className="font-serif font-normal tracking-tight text-[#FAF8F5] leading-none"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
          >
            The Forest <br />
            <span className="font-cursive text-yellow-400 lowercase tracking-normal text-4xl md:text-7xl block mt-2">of Giants</span>
          </h2>

          <p className="text-[19px] font-serif text-[#D8D1C2] leading-relaxed italic max-w-lg">
            "A greenhouse planet choked in green. High rainfall and humidity nurtured towering forests of conifer and cycad, calling forth gargantuan life."
          </p>

          <p className="text-[17px] text-[#FAF8F5]/80 leading-relaxed max-w-lg">
            As Pangaea fragmented, ocean currents shifted, warming the globe and bringing heavy rainfall to the dry interiors. Vast evergreen forests spread across the continents. To exploit this sudden abundance of high-altitude foliage, sauropod dinosaurs grew to sizes never seen before or since—becoming living skyscrapers wandering through a landscape of ferns and giants.
          </p>

          <div className="grid grid-cols-2 gap-4 border-t border-[#F5F2EA]/15 pt-6 mt-4">
            <div>
              <span className="text-[12px] font-mono text-yellow-400 block uppercase tracking-wider">Atmospheric CO₂</span>
              <span className="text-[18px] font-mono text-[#FAF8F5]">1,200 ppm (4× Modern)</span>
            </div>
            <div>
              <span className="text-[12px] font-mono text-yellow-400 block uppercase tracking-wider">Browsing Reach</span>
              <span className="text-[18px] font-mono text-[#FAF8F5]">Up to 16.0 metres vertical</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
