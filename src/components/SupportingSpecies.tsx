import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

export default function SupportingSpecies() {
  const navigate = useNavigate();

  return (
    <section
      id="supporting-species"
      className="relative w-full bg-[#050505] py-28 px-6 md:px-16 border-t border-[#A07C4F]/10 z-20"
    >
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Header Block */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-2 mb-4"
          >
            <span className="font-mono text-sm tracking-[0.2em] text-[#A07C4F] uppercase">
              [ CHAPTER VI: SUPPORTING SPECIES ]
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: 'easeOut', delay: 0.1 }}
            className="font-normal tracking-tight text-[#F5F2EA] mb-6"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
          >
            Coexisting Predators
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="text-[#A9A295] max-w-2xl text-lg leading-relaxed"
            style={{ fontSize: '18px' }}
          >
            The Cretaceous and Jurassic landscapes were shared with other fearsome theropods. Each occupied a unique ecological niche, from semi-aquatic titans to agile desert hunters.
          </motion.p>
        </div>

        {/* Asymmetric Showcase Container */}
        <div className="flex flex-col gap-24">
          
          {/* Card 1: Velociraptor (Split Layout, left aligned text) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="lg:col-span-5 order-2 lg:order-1"
            >
              <span className="font-mono text-xs tracking-widest text-[#A07C4F] uppercase block mb-3">
                SPECIMEN V-02 / LATE CRETACEOUS
              </span>
              <h3 className="font-normal text-[#F5F2EA] mb-4" style={{ fontSize: 'clamp(2rem, 3.5vw, 2.5rem)' }}>
                Velociraptor
              </h3>
              <p className="text-[#D8D1C2] leading-relaxed mb-6" style={{ fontSize: '18px' }}>
                Far smaller than modern media depicts, the true Velociraptor was roughly turkey-sized, feathered, and highly agile. It roamed the arid sands of Mongolia, using its signature sickle claw to pin small prey.
              </p>
              
              {/* Curator Info Table */}
              <div className="grid grid-cols-2 gap-4 border-t border-b border-[#A07C4F]/10 py-4 mb-6">
                <div>
                  <span className="font-mono text-xs text-[#A9A295] uppercase">Habitat</span>
                  <p className="text-[#F5F2EA] font-mono text-sm mt-0.5">Central Asia (Gobi)</p>
                </div>
                <div>
                  <span className="font-mono text-xs text-[#A9A295] uppercase">Weight / Height</span>
                  <p className="text-[#F5F2EA] font-mono text-sm mt-0.5">15 kg / 0.5 m</p>
                </div>
              </div>

              <button
                onClick={() => navigate('/exhibits/velociraptor')}
                className="inline-flex items-center gap-2 text-[#A07C4F] hover:text-[#F5F2EA] transition-colors duration-200 uppercase font-mono text-sm tracking-widest"
              >
                View Specimen Details <ArrowUpRight size={16} />
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="lg:col-span-7 order-1 lg:order-2 bg-[#0a0a0a] border border-[#A07C4F]/5 rounded-lg p-8 flex justify-center items-center min-h-[380px]"
            >
              <img
                src="https://res.cloudinary.com/dsdxaxkiz/image/upload/v1779624374/02_pmvxxl.png"
                alt="Velociraptor fossil skull rendering"
                className="max-h-[320px] object-contain filter drop-shadow-[0_15px_30px_rgba(160,124,79,0.05)]"
              />
            </motion.div>
          </div>

          {/* Card 2: Spinosaurus (Reverse layout, right aligned text) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="lg:col-span-7 bg-[#0a0a0a] border border-[#A07C4F]/5 rounded-lg p-8 flex justify-center items-center min-h-[380px]"
            >
              <img
                src="https://res.cloudinary.com/dsdxaxkiz/image/upload/v1779624236/03_hcp3jc.png"
                alt="Spinosaurus fossil skeleton rendering"
                className="max-h-[320px] object-contain filter drop-shadow-[0_15px_30px_rgba(160,124,79,0.05)]"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="lg:col-span-5"
            >
              <span className="font-mono text-xs tracking-widest text-[#A07C4F] uppercase block mb-3">
                SPECIMEN S-05 / EARLY CRETACEOUS
              </span>
              <h3 className="font-normal text-[#F5F2EA] mb-4" style={{ fontSize: 'clamp(2rem, 3.5vw, 2.5rem)' }}>
                Spinosaurus
              </h3>
              <p className="text-[#D8D1C2] leading-relaxed mb-6" style={{ fontSize: '18px' }}>
                The largest carnivorous dinosaur ever discovered, surpassing even T-Rex. Fitted with conical fish-snagging teeth and dense buoyancy-controlling bones, Spinosaurus was uniquely adapted to a semi-aquatic river dweller life in Cretaceous North Africa.
              </p>
              
              <div className="grid grid-cols-2 gap-4 border-t border-b border-[#A07C4F]/10 py-4 mb-6">
                <div>
                  <span className="font-mono text-xs text-[#A9A295] uppercase">Habitat</span>
                  <p className="text-[#F5F2EA] font-mono text-sm mt-0.5">Northern Africa (Sahara)</p>
                </div>
                <div>
                  <span className="font-mono text-xs text-[#A9A295] uppercase">Weight / Length</span>
                  <p className="text-[#F5F2EA] font-mono text-sm mt-0.5">14,000 kg / 15.0 m</p>
                </div>
              </div>

              <button
                onClick={() => navigate('/exhibits/spinosaurus')}
                className="inline-flex items-center gap-2 text-[#A07C4F] hover:text-[#F5F2EA] transition-colors duration-200 uppercase font-mono text-sm tracking-widest"
              >
                View Specimen Details <ArrowUpRight size={16} />
              </button>
            </motion.div>
          </div>

          {/* Card 3: Allosaurus (Full width banner/card layout) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="w-full bg-[#0a0a0a] border border-[#A07C4F]/10 hover:border-[#A07C4F]/20 transition-all duration-300 rounded-lg p-8 md:p-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
          >
            <div className="md:col-span-4 flex justify-center">
              <img
                src="https://res.cloudinary.com/dsdxaxkiz/image/upload/v1779624256/04_get63z.png"
                alt="Allosaurus skull fossil"
                className="max-h-[260px] object-contain filter drop-shadow-[0_15px_30px_rgba(160,124,79,0.05)]"
              />
            </div>

            <div className="md:col-span-8 flex flex-col justify-center">
              <span className="font-mono text-xs tracking-widest text-[#A07C4F] uppercase block mb-2">
                SPECIMEN A-08 / JURASSIC APEX
              </span>
              <h3 className="font-normal text-[#F5F2EA] mb-3" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.3rem)' }}>
                Allosaurus
              </h3>
              <p className="text-[#D8D1C2] leading-relaxed mb-6" style={{ fontSize: '18px' }}>
                The dominant predator of the Late Jurassic, pre-dating T-Rex by nearly eighty million years. Lightly built and equipped with blade-like recurved teeth, its upper jaw worked like an axe to drive down on prey.
              </p>

              <div className="flex flex-wrap gap-8 items-center justify-between border-t border-[#A07C4F]/10 pt-6">
                <div className="flex gap-8">
                  <div>
                    <span className="font-mono text-xs text-[#A9A295] uppercase">Habitat</span>
                    <p className="text-[#F5F2EA] font-mono text-sm mt-0.5">North America & Portugal</p>
                  </div>
                  <div>
                    <span className="font-mono text-xs text-[#A9A295] uppercase">Age</span>
                    <p className="text-[#F5F2EA] font-mono text-sm mt-0.5">155–145 Mya</p>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/exhibits/allosaurus')}
                  className="inline-flex items-center gap-2 text-[#A07C4F] hover:text-[#F5F2EA] transition-colors duration-200 uppercase font-mono text-sm tracking-widest mt-4 md:mt-0"
                >
                  View Details <ArrowUpRight size={16} />
                </button>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
