import { motion } from 'motion/react';
import { MapPin, Compass, Calendar, Search } from 'lucide-react';

export default function DiscoveryStory() {
  const cards = [
    {
      icon: MapPin,
      label: 'Excavation Site',
      value: 'Hell Creek Formation',
      detail: 'Faith, South Dakota, USA (45°03\'N 102°07\'W)',
    },
    {
      icon: Calendar,
      label: 'Discovery Date',
      value: 'August 12, 1990',
      detail: 'Unearthed by explorer Sue Hendrickson',
    },
    {
      icon: Compass,
      label: 'Geological Era',
      value: 'Late Cretaceous',
      detail: 'Approximately 68–66 million years ago',
    },
    {
      icon: Search,
      label: 'Scientific Significance',
      value: '90% Bone Recovery',
      detail: 'Revealed complete biomechanics of large theropods',
    },
  ];

  return (
    <section
      id="discovery-story"
      className="relative w-full bg-[#050505] py-28 px-6 md:px-16 border-t border-[#A07C4F]/10 z-20"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Header Block */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-2 mb-4"
          >
            <span className="font-mono text-sm tracking-[0.2em] text-[#A07C4F] uppercase">
              [ CHAPTER IV: THE DISCOVERY ]
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: 'easeOut', delay: 0.1 }}
            className="font-normal tracking-tight text-[#F5F2EA] mb-6"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }} // 40px to 72px
          >
            Unearthing the Legend
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="text-[#A9A295] max-w-2xl text-lg leading-relaxed"
            style={{ fontSize: '18px' }}
          >
            The story of how the Tyrant King was reclaimed from the stone. Every bone unearthed from the mudstones of South Dakota reshaped our understanding of prehistoric life.
          </motion.p>
        </div>

        {/* Archival Journal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: idx * 0.1 }}
                className="group p-8 rounded-lg bg-[#0a0a0a] border border-[#A07C4F]/10 hover:border-[#A07C4F]/30 transition-all duration-300 flex flex-col justify-between min-h-[260px] relative overflow-hidden"
              >
                {/* Subtle light glaze on top corner */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#A07C4F]/[0.02] rounded-bl-full pointer-events-none group-hover:bg-[#A07C4F]/[0.05] transition-colors duration-300" />
                
                <div>
                  {/* Icon & Label */}
                  <div className="flex items-center justify-between mb-8">
                    <Icon size={24} className="text-[#A07C4F] strokeWidth={1.5}" />
                    <span className="font-mono text-xs tracking-widest text-[#A9A295] uppercase">
                      REF-0{idx + 1}
                    </span>
                  </div>

                  {/* Value */}
                  <h3 className="text-[#F5F2EA] font-normal mb-3" style={{ fontSize: '24px' }}>
                    {card.value}
                  </h3>
                </div>

                {/* Detail Footnote */}
                <div>
                  <p className="font-mono text-xs tracking-wider uppercase text-[#A07C4F] mb-1">
                    {card.label}
                  </p>
                  <p className="text-[#D8D1C2] leading-relaxed" style={{ fontSize: '15px' }}>
                    {card.detail}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Curator Field Note Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-12 p-8 rounded-lg bg-[#0a0a0a] border border-dashed border-[#A07C4F]/20 flex flex-col md:flex-row gap-6 items-start justify-between"
        >
          <div className="max-w-3xl">
            <h4 className="font-mono text-sm tracking-widest text-[#A07C4F] uppercase mb-2">
              Curator's Field Entry
            </h4>
            <p className="text-[#D8D1C2] italic leading-relaxed" style={{ fontSize: '18px' }}>
              "Sue's skull remains one of the greatest treasures of modern paleontology. Though the skull on the mounted skeleton is a cast due to the heavy weight of the original bones, the authentic cranium is displayed separately in a dedicated light-controlled vault. Its preservation is so perfect we can trace the path of individual cranial nerves."
            </p>
          </div>
          <div className="font-mono text-sm text-[#A9A295] shrink-0 border-l border-[#A07C4F]/20 pl-6 mt-2 md:mt-0">
            <p className="font-bold text-[#F5F2EA]">Dr. Alan Grant</p>
            <p className="mt-0.5">Department of Vertebrates</p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
