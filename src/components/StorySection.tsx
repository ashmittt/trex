import { motion } from 'motion/react';

export default function StorySection() {
  return (
    <section
      id="story"
      className="relative min-h-screen bg-[#050505] text-[#F5F2EA] py-32 px-6 md:px-16 flex flex-col justify-center overflow-hidden border-t border-white/5"
    >
      <div className="max-w-6xl mx-auto w-full flex flex-col gap-24">
        
        {/* Intro Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Metadata / Subtitle */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <span className="font-mono text-xs tracking-[0.3em] text-[#C4903A] uppercase">
              Stage 02 // Narrative Strata
            </span>
            <h2 className="font-serif font-light text-4xl md:text-5xl uppercase tracking-wide leading-tight text-[#F5F2EA]">
              The Pinnacle of <br />
              <span className="font-serif italic text-[#C4903A]">Evolutionary Power</span>
            </h2>
            <div className="h-[1px] w-20 bg-[#C4903A]/30 my-2" />
            <p className="text-xl md:text-2xl font-serif text-[#D8D1C2] italic leading-relaxed">
              "A creature that defined the absolute apex of predatory biology, frozen in perpetual stone."
            </p>
          </div>

          {/* Right Editorial Text */}
          <div className="lg:col-span-7 lg:pl-12 flex flex-col gap-6 text-[#A9A295] leading-relaxed text-sm md:text-base font-sans">
            <p>
              The Tyrannosaurus rex was not merely a predator; it was the ultimate biological realization of dinosaurian evolution. Spanning the final stages of the Late Cretaceous, it ruled a continent with sensory networks that could map prey miles away and a jaw force engineered to shatter solid bone.
            </p>
            <p>
              To study the T-Rex is to study the physics of scale. At forty feet in length and weighing over nine tons, its body pushed the mechanical limits of bipedal locomotion. Its existence marks the final, dramatic paragraph of a 165-million-year dynasty.
            </p>
          </div>
        </div>

        {/* Full-width Parallax-style Fossil Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative h-[65vh] w-full overflow-hidden rounded-sm border border-white/5 group"
        >
          {/* Atmospheric shadow overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505] z-10" />
          <div className="absolute inset-0 bg-[#050505]/20 z-10" />
          <motion.img
            src="/images/fossil.png"
            alt="Fossilized T-Rex Skull"
            className="w-full h-full object-cover filter grayscale brightness-[0.75] contrast-[1.1] transition-transform duration-[3s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
          />
          <div className="absolute bottom-6 left-6 z-20 font-mono text-[10px] tracking-[0.2em] text-[#D8D1C2] uppercase">
            [ Fig 04 // Articulated Cranium, Hell Creek Formation ]
          </div>
        </motion.div>

        {/* Closing Rhythm */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Paragraph */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-[#A9A295] leading-relaxed text-sm md:text-base font-sans">
            <p>
              Despite its legendary status, complete specimens remain exceptionally rare. Only a handful of articulated skeletons exist in public archives worldwide. Each fossil recovery is a meticulous reconstruction of a world lost to fire—a puzzle pieced together from fractured stone.
            </p>
          </div>

          {/* Right Metrics Block */}
          <div className="lg:col-span-5 lg:pl-24 flex items-baseline gap-6">
            <span className="font-serif font-light text-7xl md:text-8xl text-[#C4903A] leading-none">
              32
            </span>
            <div className="flex flex-col gap-1 font-mono">
              <span className="text-[10px] tracking-[0.2em] text-[#F5F2EA] uppercase font-bold">Known Adults</span>
              <span className="text-[9px] tracking-[0.1em] text-[#9E8E78] uppercase">In Global Collections</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
