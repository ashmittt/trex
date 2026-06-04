

export default function CretaceousSection() {
  return (
    <section className="relative min-h-screen bg-[#140D0B] text-[#F5F2EA] flex flex-col justify-center border-t border-[#F5F2EA]/10 p-6 md:p-16 overflow-hidden">
      {/* Background Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none opacity-[0.02] text-mega font-bold uppercase text-[#FAF8F5] z-0">
        Zenith
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Column: Narrative */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <span className="text-[13px] font-mono tracking-[0.3em] text-[#8C3A2D] uppercase">
              [ 04 // 145 MA TO 66 MA ]
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#8C3A2D]" />
            <span className="text-[13px] font-mono tracking-widest text-[#FAF8F5]/50 uppercase">
              CRETACEOUS PERIOD
            </span>
          </div>

          <h2
            className="font-serif font-normal tracking-tight text-[#FAF8F5] leading-none"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
          >
            The Peak of <br />
            <span className="font-cursive text-yellow-400 lowercase tracking-normal text-4xl md:text-7xl block mt-2">Diversity</span>
          </h2>

          <p className="text-[19px] font-serif text-[#D8D1C2] leading-relaxed italic max-w-lg">
            "A world in full bloom. The arrival of flowers transformed Earth's forests, creating complex webs of life that supported the most specialized predators and armor-plated giants."
          </p>

          <p className="text-[17px] text-[#FAF8F5]/80 leading-relaxed max-w-lg">
            The Cretaceous period was the longest and most biologically diverse era of the Mesozoic. Flowering plants (angiosperms) co-evolved alongside insect pollinators, rapidly changing the global flora. In response, herbivorous lineages evolved complex grinding batteries (hadrosaurs) and heavy defensive plates (ceratopsians, ankylosaurs) to withstand specialized, giant theropod predators.
          </p>

          <div className="grid grid-cols-2 gap-4 border-t border-[#F5F2EA]/15 pt-6 mt-4">
            <div>
              <span className="text-[12px] font-mono text-[#8C3A2D] block uppercase tracking-wider">Atmospheric CO₂</span>
              <span className="text-[18px] font-mono text-[#FAF8F5]">900 ppm (3× Modern)</span>
            </div>
            <div>
              <span className="text-[12px] font-mono text-[#8C3A2D] block uppercase tracking-wider">Flora Shift</span>
              <span className="text-[18px] font-mono text-[#FAF8F5]">Rise of Angiosperms</span>
            </div>
          </div>
        </div>

        {/* Right Column: Three-Tier Ecological Mapping */}
        <div className="lg:col-span-6 flex flex-col gap-6 bg-[#1A110F] border border-[#FAF8F5]/10 p-8 md:p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#FAF8F5_1px,transparent_1px),linear-gradient(to_bottom,#FAF8F5_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-[0.02] pointer-events-none" />

          <div className="flex justify-between items-start border-b border-[#FAF8F5]/10 pb-4 mb-4">
            <span className="text-[12px] font-mono text-[#FAF8F5]/40 uppercase tracking-widest">
              Biogeographical Mapping // CRET-145
            </span>
            <span className="text-[12px] font-mono text-yellow-400 font-bold uppercase">
              SYS: COEXISTENCE
            </span>
          </div>

          <div className="space-y-4 font-mono text-[14px]">
            {/* Sky */}
            <div className="border-l border-[#8C3A2D] pl-4">
              <span className="text-[#8C3A2D] font-bold block mb-1">AEROSPHERE // THE CLOUDS</span>
              <span className="text-xs text-[#FAF8F5]/75">
                Pterosaurs like Pteranodon (7m wingspan) dominate coastal drafts. Early birds diversify alongside them, occupying smaller niches.
              </span>
            </div>

            {/* Land */}
            <div className="border-l border-[#8C3A2D] pl-4">
              <span className="text-[#8C3A2D] font-bold block mb-1">TERRA // FLOODPLAINS &amp; WOODLANDS</span>
              <span className="text-xs text-[#FAF8F5]/75">
                The domain of Helena (T-Rex), Triceratops herds, and heavy Ankylosaurs. Complex forest understories support smaller feathered dromaeosaurids.
              </span>
            </div>

            {/* Water */}
            <div className="border-l border-[#8C3A2D] pl-4">
              <span className="text-[#8C3A2D] font-bold block mb-1">AQUATIC // DELTAS &amp; CHANNELS</span>
              <span className="text-xs text-[#FAF8F5]/75">
                Semi-aquatic giants like Spinosaurus wading through coastal swamps and river basins, hunting coelacanths and giant sawfish.
              </span>
            </div>
          </div>

          <div className="absolute bottom-4 right-4 text-[11px] font-mono text-[#FAF8F5]/30">
            Niobrara &amp; Hell Creek Profiles
          </div>
        </div>
      </div>
    </section>
  );
}
