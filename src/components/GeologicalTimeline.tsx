import { motion } from 'motion/react';

interface StratumLayer {
  id: string;
  num: string;
  name: string;
  span: string;
  rockType: string;
  depth: string;
  details: string;
}

const strata: StratumLayer[] = [
  {
    id: 'triassic-stratum',
    num: 'I',
    name: 'Triassic Epoch',
    span: '252 Ma — 201 Ma',
    rockType: 'Red Sandstone & Basalt Fissures',
    depth: '480m — 700m depth',
    details: 'Marked by massive basalt flows from rift valleys and extreme aridity, laying down red sandstone beds as the supercontinent Pangaea fractured.',
  },
  {
    id: 'jurassic-stratum',
    num: 'II',
    name: 'Jurassic Epoch',
    span: '201 Ma — 145 Ma',
    rockType: 'Oolitic Limestone & Clay',
    depth: '250m — 480m depth',
    details: 'Deposition of vast shallow warm limestone beds. Flooded continents gave rise to lush inland ecosystems, fossilizing the largest terrestrial giants.',
  },
  {
    id: 'cretaceous-stratum',
    num: 'III',
    name: 'Cretaceous Epoch',
    span: '145 Ma — 66 Ma',
    rockType: 'Chalk, Dark Shale & Iridium Clay',
    depth: '120m — 250m depth',
    details: 'High marine abundance laying down thick chalk layers. Closes with a distinct boundary layer rich in iridium—the mark of cosmic impact.',
  },
];

export default function GeologicalTimeline() {
  return (
    <section 
      id="timeline" 
      className="relative min-h-screen bg-[#050505] text-[#F5F2EA] py-32 px-6 md:px-16 flex flex-col justify-center overflow-hidden border-t border-white/5"
    >
      <div className="max-w-6xl mx-auto w-full relative z-10 flex flex-col gap-20">
        
        {/* Intro Block */}
        <div className="flex flex-col gap-4 max-w-xl">
          <span className="font-mono text-xs tracking-[0.3em] text-[#C4903A] uppercase">
            Stage 04 // Horizontal Chronology
          </span>
          <h2 className="font-serif font-light text-4xl md:text-5xl uppercase tracking-wide leading-tight">
            The Geological <br />
            <span className="font-serif italic text-[#C4903A]">Spine</span>
          </h2>
          <div className="h-[1px] w-20 bg-[#C4903A]/30 my-2" />
          <p className="text-lg font-serif text-[#D8D1C2] italic leading-relaxed">
            "Traversing the lithified pages of Earth's history, from the volcanic dry rifts of the Triassic to the iridium boundary."
          </p>
        </div>

        {/* Horizontal Timeline Track */}
        <div className="relative mt-12">
          {/* Horizontal Line Spine */}
          <div className="absolute top-[18px] left-0 right-0 h-[1px] bg-white/10 z-0 hidden md:block" />

          {/* Stated Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative z-10">
            {strata.map((layer, index) => (
              <motion.div
                key={layer.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1.2, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-start gap-6 group"
              >
                {/* Intersection Node */}
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-full bg-[#050505] border border-white/10 group-hover:border-[#C4903A]/60 flex items-center justify-center font-mono text-xs text-[#9E8E78] group-hover:text-[#C4903A] transition-all duration-300 z-10">
                    {layer.num}
                  </div>
                  <span className="font-mono text-xs uppercase tracking-widest text-[#9E8E78]">
                    {layer.span}
                  </span>
                </div>

                {/* Big Age Header */}
                <div className="flex flex-col gap-1 mt-2">
                  <h3 className="font-serif text-3xl uppercase tracking-wide text-[#F5F2EA] group-hover:text-[#C4903A] transition-colors duration-300">
                    {layer.name}
                  </h3>
                  <span className="font-mono text-[10px] tracking-widest text-[#C4903A] uppercase">
                    {layer.rockType}
                  </span>
                </div>

                {/* Narrative Details */}
                <p className="font-sans text-sm text-[#A9A295] leading-relaxed">
                  {layer.details}
                </p>

                {/* Bottom Depth Reference */}
                <div className="mt-4 pt-4 border-t border-white/5 w-full flex justify-between font-mono text-[9px] text-[#9E8E78] uppercase">
                  <span>Stratum Depth</span>
                  <span className="text-white/70">{layer.depth}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
