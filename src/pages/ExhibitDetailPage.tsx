import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { getDinosaurBySlug, dinosaursData } from '../data/dinosaurs';

const dietColors: Record<string, { bg: string; text: string; border: string }> = {
  carnivore: { bg: 'bg-[#D35400]/10', text: 'text-[#D35400]', border: 'border-[#D35400]/30' },
  herbivore: { bg: 'bg-[#E8C547]/10', text: 'text-[#E8C547]', border: 'border-[#E8C547]/30' },
  omnivore: { bg: 'bg-[#A9A295]/10', text: 'text-[#A9A295]', border: 'border-[#A9A295]/30' },
};

export default function ExhibitDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const dinosaur = getDinosaurBySlug(slug ?? '');

  if (!dinosaur) {
    return (
      <main className="min-h-screen bg-[#151210] text-[#F5F2EA] flex flex-col font-mono">
        <title>Specimen Not Found — Natural History Museum</title>
        <PageHeader backLabel="All Exhibits" backTo="/exhibits" />
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <p className="text-[14px] tracking-widest uppercase text-[#E8C547] mb-4">
            Specimen Not Found
          </p>
          <h1
            className="font-serif font-normal tracking-tight text-[#F5F2EA] mb-8"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', lineHeight: 1.15 }}
          >
            This fossil<br />has gone missing.
          </h1>
          <button
            onClick={() => navigate('/exhibits')}
            className="text-[14px] tracking-widest uppercase text-[#A9A295] hover:text-[#F5F2EA] transition-colors duration-200 underline cursor-pointer"
          >
            Return to Exhibits
          </button>
        </div>
      </main>
    );
  }

  const dc = dietColors[dinosaur.diet] || { bg: 'bg-[#A9A295]/10', text: 'text-[#A9A295]', border: 'border-[#A9A295]/30' };
  const relatedDinos = dinosaur.relatedSpecies
    .map((s) => dinosaursData.find((d) => d.slug === s))
    .filter(Boolean);

  const stats = [
    { label: 'Period', value: dinosaur.period },
    { label: 'Time Range', value: dinosaur.periodRange },
    { label: 'Diet', value: dinosaur.diet.charAt(0).toUpperCase() + dinosaur.diet.slice(1) },
    { label: 'Length', value: dinosaur.length },
    { label: 'Height', value: dinosaur.height },
    { label: 'Weight', value: dinosaur.weight },
  ];

  return (
    <main className="min-h-screen bg-[#151210] text-[#F5F2EA] overflow-x-hidden">
      <title>{dinosaur.name} — Natural History Museum</title>

      <PageHeader backLabel="All Exhibits" backTo="/exhibits" />

      {/* Hero section */}
      <section className="relative border-b border-[#F5F2EA]/10 overflow-hidden bg-[#1A1614]/25">
        <div className="flex flex-col md:flex-row min-h-[60vh]">
          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
            className="flex-1 flex flex-col justify-end px-6 md:px-16 py-12 md:py-16 border-b md:border-b-0 md:border-r border-[#F5F2EA]/10"
          >
            {/* Era + diet */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[13px] font-mono tracking-widest uppercase text-[#A9A295] border border-[#A9A295]/20 px-2.5 py-1">
                {dinosaur.era}
              </span>
              <span className={`text-[13px] font-mono tracking-widest uppercase px-2.5 py-1 border ${dc.bg} ${dc.text} ${dc.border}`}>
                {dinosaur.diet}
              </span>
            </div>

            {/* Name - Serif + Script Combo */}
            <h1
              className="font-serif font-normal tracking-tight text-[#F5F2EA] mb-2"
              style={{ fontSize: 'clamp(3rem, 6vw, 6.2rem)', lineHeight: 1.0 }}
            >
              {dinosaur.name.split(' ').map((word, i) => (
                <span key={i} className="block">{word}</span>
              ))}
              <span className="font-script text-[#E8C547] text-[1.4em] lowercase normal-case italic block mt-2">excavated specimen</span>
            </h1>
            
            <p className="text-[15px] font-mono tracking-widest text-[#E8C547] uppercase mt-2">
              REGISTRY ENTRY: {dinosaur.periodRange}
            </p>
          </motion.div>

          {/* Right — hero image with visual placeholders/grid */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
            className="md:w-[45%] min-h-[350px] bg-[#1A1614]/60 flex items-center justify-center p-8 md:p-16 relative"
          >
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#E8C547_1px,transparent_1px),linear-gradient(to_bottom,#E8C547_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-[0.02] pointer-events-none" />
            
            {/* Visual backdrop panel like in the video */}
            <div className="absolute w-[60%] h-[70%] bg-[#E8C547]/5 border border-[#E8C547]/10 rounded-sm rotate-2" />

            <img
              src={dinosaur.heroImage}
              alt={`${dinosaur.name} specimen`}
              className="w-full h-full object-contain mix-blend-lighten max-h-[400px] relative z-10 filter drop-shadow-[0_15px_40px_rgba(232,197,71,0.12)]"
            />
          </motion.div>
        </div>
      </section>

      {/* Stats row - styled in monospace archive style */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.35 }}
        className="border-b border-[#F5F2EA]/10 font-mono bg-[#1A1614]/15"
        aria-label="Specimen statistics"
      >
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-x divide-y lg:divide-y-0 divide-[#F5F2EA]/10">
          {stats.map(({ label, value }) => (
            <div
              key={label}
              className="px-6 py-6 flex flex-col gap-2 border-[#F5F2EA]/10"
            >
              <p className="text-[13px] tracking-widest uppercase text-[#E8C547]">{label}</p>
              <p className="text-[18px] text-[#F5F2EA]">{value}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Body — two columns */}
      <div className="flex flex-col md:flex-row border-b border-[#F5F2EA]/10">
        {/* Left — Description + Fun Facts */}
        <div className="flex-1 px-6 md:px-16 py-12 md:py-16 border-b md:border-b-0 md:border-r border-[#F5F2EA]/10">
          {/* Description - Typewriter style */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.45 }}
          >
            <h2 className="text-[14px] font-mono tracking-widest uppercase text-[#E8C547] mb-6">
              About this Specimen
            </h2>
            <p
              className="text-[#D8D1C2] leading-[1.8] mb-16 font-mono text-[16px] max-w-[650px]"
            >
              {dinosaur.description}
            </p>
          </motion.div>

          {/* Fun Facts - Bento Box Styling (Alternating layouts like in the video) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.55 }}
          >
            <h2 className="text-[14px] font-mono tracking-widest uppercase text-[#E8C547] mb-6">
              Palaeontological Notes
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {dinosaur.funFacts.map((fact, i) => {
                const isEven = i % 2 === 0;
                return (
                  <div
                    key={i}
                    className={`flex gap-6 p-6 border transition-all duration-300
                      ${isEven 
                        ? 'bg-[#F5F2EA] text-[#151210] border-transparent' 
                        : 'bg-[#1A1614] text-[#F5F2EA] border-[#F5F2EA]/10'}`}
                  >
                    <span
                      className={`text-[14px] font-mono tracking-widest shrink-0 mt-0.5
                        ${isEven ? 'text-[#D35400]' : 'text-[#E8C547]'}`}
                      aria-hidden="true"
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <span className={`text-[12px] font-mono tracking-widest uppercase block mb-1 ${isEven ? 'text-[#151210]/60' : 'text-[#A9A295]'}`}>
                        Archival Note · Section {i + 1}09
                      </span>
                      <p className="text-[16px] leading-relaxed font-mono">{fact}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Right — Habitat + Related Species */}
        <div className="md:w-[360px] shrink-0 px-6 md:px-10 py-12 md:py-16 flex flex-col gap-12 bg-[#1A1614]/15">
          {/* Habitat */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.5 }}
          >
            <h2 className="text-[14px] font-mono tracking-widest uppercase text-[#E8C547] mb-4">
              Origin & Habitat
            </h2>
            <p className="text-[16px] font-mono text-[#D8D1C2] leading-relaxed">{dinosaur.habitat}</p>
          </motion.div>

          {/* Related species - Styled cards with backdrop shapes */}
          {relatedDinos.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.6 }}
            >
              <h2 className="text-[14px] font-mono tracking-widest uppercase text-[#E8C547] mb-6">
                Related Records
              </h2>
              <div className="flex flex-col gap-4">
                {relatedDinos.map((related, index) => {
                  if (!related) return null;
                  const isEven = index % 2 === 0;
                  return (
                    <button
                      key={related.slug}
                      onClick={() => navigate(`/exhibits/${related.slug}`)}
                      aria-label={`View ${related.name} exhibit`}
                      className={`group flex items-center justify-between border p-4 text-left cursor-pointer transition-all duration-300
                        ${isEven
                          ? 'bg-[#E8C547] text-[#151210] border-transparent'
                          : 'bg-[#F5F2EA] text-[#151210] border-[#151210]/15'}
                        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 flex items-center justify-center bg-black/5 relative overflow-hidden rounded-sm shrink-0">
                          <div className={`absolute w-2/3 h-2/3 ${isEven ? 'bg-[#D35400]/20' : 'bg-[#E8C547]/20'} rotate-6`} />
                          <img
                            src={related.image}
                            alt={related.name}
                            loading="lazy"
                            className="w-10 h-10 object-contain mix-blend-multiply opacity-80 group-hover:scale-110 transition-transform duration-300 relative z-10"
                          />
                        </div>
                        <div>
                          <p className="text-[16px] font-serif font-normal leading-tight">
                            {related.shortName}
                          </p>
                          <p className="text-[12px] font-mono tracking-widest uppercase text-[#151210]/60 mt-0.5">
                            {related.era}
                          </p>
                        </div>
                      </div>
                      <ArrowRight
                        size={14}
                        strokeWidth={1.5}
                        className="text-[#151210]/60 group-hover:translate-x-1 transition-transform duration-300"
                        aria-hidden="true"
                      />
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Footer strip */}
      <div className="px-8 py-8 flex items-center justify-between bg-[#151210] border-t border-[#F5F2EA]/10">
        <p className="font-mono tracking-widest text-[#A9A295] uppercase text-[12px]">
          NATURAL HISTORY MUSEUM — SPECIMEN CATALOG
        </p>
        <button
          onClick={() => navigate('/exhibits')}
          className="text-[14px] font-mono tracking-widest uppercase text-[#E8C547] hover:text-[#F5F2EA] transition-colors duration-200 flex items-center gap-2 cursor-pointer"
          aria-label="Return to all exhibits"
        >
          All Exhibits
          <ArrowRight size={12} strokeWidth={1.5} aria-hidden="true" />
        </button>
      </div>
    </main>
  );
}
