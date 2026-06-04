
export default function TriassicSection() {
  return (
    <section className="relative min-h-screen bg-[#14110F] text-[#F5F2EA] flex flex-col justify-center border-t border-[#F5F2EA]/10 p-6 md:p-16 overflow-hidden">
      {/* Background Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none opacity-[0.02] text-mega font-bold uppercase text-[#FAF8F5] z-0">
        Pangaea
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Column: Narrative */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <span className="text-[13px] font-mono tracking-[0.3em] text-[#D35400] uppercase">
              [ 02 // 252 MA TO 201 MA ]
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#D35400]" />
            <span className="text-[13px] font-mono tracking-widest text-[#FAF8F5]/50 uppercase">
              TRIASSIC PERIOD
            </span>
          </div>

          <h2
            className="font-serif font-normal tracking-tight text-[#FAF8F5] leading-none"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
          >
            Out of the <br />
            <span className="font-cursive text-yellow-400 lowercase tracking-normal text-4xl md:text-7xl block mt-2">Ashes</span>
          </h2>

          <p className="text-[19px] font-serif text-[#D8D1C2] leading-relaxed italic max-w-lg">
            "Earth recovering from the Great Dying. Pangaea was dry, hot, and dominated by rifts of volcanic fire. But life found a foothold."
          </p>

          <p className="text-[17px] text-[#FAF8F5]/80 leading-relaxed max-w-lg">
            Following the Permian mass extinction—which wiped out 96% of marine life—the Triassic period witnessed the slow, fragile rebirth of the biosphere. Continents were fused into the supercontinent Pangaea. In the dry interior deserts, the first true dinosaurs emerged: small, nimble, and bipedal, running beneath the shadows of massive crocodile ancestors.
          </p>

          {/* Triassic Stats Panel */}
          <div className="grid grid-cols-2 gap-4 border-t border-[#F5F2EA]/15 pt-6 mt-4">
            <div>
              <span className="text-[12px] font-mono text-[#D35400] block uppercase tracking-wider">Atmospheric CO₂</span>
              <span className="text-[18px] font-mono text-[#FAF8F5]">1,500 ppm (5× Modern)</span>
            </div>
            <div>
              <span className="text-[12px] font-mono text-[#D35400] block uppercase tracking-wider">Global Temp</span>
              <span className="text-[18px] font-mono text-[#FAF8F5]">+10°C relative to today</span>
            </div>
          </div>
        </div>

        {/* Right Column: Scientific Drawing/Field Notes */}
        <div className="lg:col-span-6 flex flex-col gap-6 bg-[#1A1614] border border-[#F5F2EA]/10 p-8 md:p-12 relative overflow-hidden">
          {/* Grid lines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#F5F2EA_1px,transparent_1px),linear-gradient(to_bottom,#F5F2EA_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-[0.02] pointer-events-none" />

          <div className="flex justify-between items-start border-b border-[#F5F2EA]/10 pb-4 mb-4">
            <span className="text-[12px] font-mono text-[#FAF8F5]/40 uppercase tracking-widest">
              Field Specimen Annotation // TRI-252
            </span>
            <span className="text-[12px] font-mono text-yellow-400 font-bold uppercase">
              SYS: ARCHOSAURIA
            </span>
          </div>

          <div className="h-48 flex items-center justify-center border border-[#F5F2EA]/5 bg-black/35 relative overflow-hidden">
            {/* Styled silhouette diagram */}
            <div className="text-[11px] font-mono text-red-500/70 absolute top-4 left-4 uppercase tracking-widest">
              Lystrosaurus / Coelophysis Line
            </div>
            {/* We place a nice running vector track or diagram text */}
            <div className="font-mono text-[14px] text-yellow-400/80 tracking-widest text-center select-none leading-relaxed">
              [ PANGAEA SUPERCONTINENT MAP ] <br />
              <span className="text-xs text-[#FAF8F5]/40">Rifting active: Central Atlantic Magmatic Province</span>
            </div>
            {/* Draw a subtle map outline in text */}
            <div className="absolute bottom-4 right-4 text-[11px] font-mono text-[#FAF8F5]/30">
              252.0 Ma · Epoch 1
            </div>
          </div>

          <div>
            <h4 className="font-serif text-[22px] text-[#FAF8F5] mb-2 font-normal">
              The Pangaean Wilderness
            </h4>
            <p className="text-[15px] text-[#FAF8F5]/70 leading-relaxed font-mono">
              Inland regions were massive sand deserts with extreme heat cycles. Herbivores like Lystrosaurus survived in river channels, while early carnivorous dinosaurs evolved high-metabolism bipedal strides to cover long desert distances.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
