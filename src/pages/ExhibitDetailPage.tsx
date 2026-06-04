import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { getDinosaurBySlug, dinosaursData } from '../data/dinosaurs';

const dietColors: Record<string, { bg: string; text: string; border: string }> = {
  carnivore: { bg: 'bg-[#8C3A2D]/10', text: 'text-[#8C3A2D]', border: 'border-[#8C3A2D]/20' },
  herbivore: { bg: 'bg-[#A07C4F]/10', text: 'text-[#A07C4F]', border: 'border-[#A07C4F]/20' },
  omnivore: { bg: 'bg-[#1A1614]/5', text: 'text-[#1A1614]/70', border: 'border-[#1A1614]/10' },
};

export default function ExhibitDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const dinosaur = getDinosaurBySlug(slug ?? '');

  if (!dinosaur) {
    return (
      <main className="min-h-screen bg-[#F5F2EA] text-[#1A1614] flex flex-col">
        <title>Specimen Not Found — Natural History Museum</title>
        <PageHeader backLabel="All Exhibits" backTo="/exhibits" />
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <p className="text-[14px] font-mono tracking-widest uppercase text-[#D35400] mb-4">
            Specimen Not Found
          </p>
          <h1
            className="font-serif font-normal tracking-tight text-[#1A1614] mb-8 leading-tight"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)' }}
          >
            This fossil<br />has gone missing.
          </h1>
          <button
            onClick={() => navigate('/exhibits')}
            className="text-[14px] font-mono tracking-widest uppercase text-[#D35400] hover:text-[#1A1614] transition-colors duration-200 underline cursor-pointer"
          >
            Return to Exhibits
          </button>
        </div>
      </main>
    );
  }

  const dc = dietColors[dinosaur.diet] || { bg: 'bg-[#1A1614]/5', text: 'text-[#1A1614]/70', border: 'border-[#1A1614]/10' };
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
    <main className="min-h-screen bg-[#F5F2EA] text-[#1A1614]">
      <title>{dinosaur.name} — Natural History Museum</title>

      <PageHeader backLabel="All Exhibits" backTo="/exhibits" />

      {/* Hero section */}
      <section className="relative border-b border-[#1A1614]/15 overflow-hidden">
        <div className="flex flex-col md:flex-row min-h-[60vh]">
          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
            className="flex-1 flex flex-col justify-end px-6 md:px-16 py-12 md:py-16 border-b md:border-b-0 md:border-r border-[#1A1614]/15 relative z-10"
          >
            {/* Era + diet */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[14px] font-mono tracking-widest uppercase text-[#1A1614]/55 border border-[#1A1614]/15 px-2 py-1">
                {dinosaur.era}
              </span>
              <span className={`text-[14px] font-mono tracking-widest uppercase px-2 py-1 border ${dc.bg} ${dc.text} ${dc.border}`}>
                {dinosaur.diet}
              </span>
              <span className="text-[13px] font-mono text-[#D35400]/80">ARCHIVAL RECORD</span>
            </div>

            {/* Name */}
            <h1
              className="font-serif font-normal tracking-tight text-[#1A1614] mb-2 leading-[1.0]"
              style={{ fontSize: 'clamp(3.5rem, 6vw, 6rem)' }}
            >
              {dinosaur.name.split(' ').map((word, i) => (
                <span key={i} className="block">
                  {word}
                </span>
              ))}
            </h1>
            <span className="font-cursive text-4xl text-[#D35400] mb-4 block lowercase">authenticated specimen</span>
            
            <p className="text-[15px] font-mono tracking-widest text-[#D35400] uppercase mt-2">
              {dinosaur.periodRange}
            </p>
          </motion.div>

          {/* Right — hero image with floating cutout and backdrop block */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
            className="md:w-[45%] min-h-[350px] bg-[#FAF8F5] flex items-center justify-center p-8 md:p-16 relative overflow-hidden"
          >
            {/* Yellow backdrop rectangle */}
            <div className="absolute w-[60%] h-[60%] bg-[#F4D03F]/20 rounded-md rotate-6 z-0" />
            
            <img
              src={dinosaur.heroImage}
              alt={`${dinosaur.name} specimen`}
              className="w-full h-full object-contain relative z-10 mix-blend-multiply max-h-[400px] filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.12)] animate-float"
            />
          </motion.div>
        </div>
      </section>

      {/* Stats row */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.35 }}
        className="border-b border-[#1A1614]/15 bg-[#FAF8F5]"
        aria-label="Specimen statistics"
      >
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-x divide-y md:divide-y-0 divide-[#1A1614]/15">
          {stats.map(({ label, value }) => (
            <div
              key={label}
              className="px-6 py-6 flex flex-col gap-2 border-t md:border-t-0 border-[#1A1614]/15"
            >
              <p className="text-[14px] font-mono tracking-widest uppercase text-[#D35400]">{label}</p>
              <p className="text-[18px] font-serif text-[#1A1614] font-normal">{value}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Body — two columns */}
      <div className="flex flex-col md:flex-row">
        {/* Left — Description + Fun Facts */}
        <div className="flex-1 px-6 md:px-16 py-12 md:py-16 border-b md:border-b-0 md:border-r border-[#1A1614]/15">
          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.45 }}
          >
            <h2 className="text-[14px] font-mono tracking-widest uppercase text-[#D35400] mb-6">
              About this Specimen
            </h2>
            <p
              className="text-[#1A1614]/85 leading-[1.8] mb-16 font-serif"
              style={{ fontSize: '20px', maxWidth: '650px' }}
            >
              {dinosaur.description}
            </p>
          </motion.div>

          {/* Fun Facts */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.55 }}
          >
            <h2 className="text-[14px] font-mono tracking-widest uppercase text-[#D35400] mb-6">
              Palaeontological Notes
            </h2>
            <div className="flex flex-col gap-4">
              {dinosaur.funFacts.map((fact, i) => (
                <div
                  key={i}
                  className="flex gap-4 p-5 border border-[#1A1614]/10 bg-[#FAF8F5] hover:border-[#D35400]/40 transition-all duration-300"
                >
                  <span
                    className="text-[14px] font-mono tracking-widest text-[#D35400] shrink-0 mt-0.5"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-[18px] text-[#1A1614]/75 leading-relaxed">{fact}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right — Habitat + Related Species */}
        <div className="md:w-[340px] shrink-0 px-6 md:px-10 py-12 md:py-16 flex flex-col gap-12 bg-[#FAF8F5]">
          {/* Habitat */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.5 }}
          >
            <h2 className="text-[14px] font-mono tracking-widest uppercase text-[#D35400] mb-4">
              Habitat
            </h2>
            <p className="text-[18px] text-[#1A1614]/75 leading-relaxed">{dinosaur.habitat}</p>
          </motion.div>

          {/* Related species */}
          {relatedDinos.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.6 }}
            >
              <h2 className="text-[14px] font-mono tracking-widest uppercase text-[#D35400] mb-6">
                Related Species
              </h2>
              <div className="flex flex-col gap-3">
                {relatedDinos.map((related) => {
                  if (!related) return null;
                  return (
                    <button
                      key={related.slug}
                      onClick={() => navigate(`/exhibits/${related.slug}`)}
                      aria-label={`View ${related.name} exhibit`}
                      className="group flex items-center justify-between border border-[#1A1614]/10 p-4 bg-[#FAF8F5]
                        hover:border-[#D35400]/40 transition-all duration-300 text-left cursor-pointer
                        focus-visible:outline-none"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#F4D03F]/10 rounded-sm flex items-center justify-center relative overflow-hidden shrink-0">
                          <img
                            src={related.image}
                            alt={related.name}
                            loading="lazy"
                            className="w-10 h-10 object-contain mix-blend-multiply opacity-80 group-hover:scale-105 transition-all duration-300 animate-float"
                          />
                        </div>
                        <div>
                          <p className="text-[16px] font-serif text-[#1A1614] group-hover:text-[#D35400] transition-colors duration-300 leading-tight">
                            {related.shortName}
                          </p>
                          <p className="text-[13px] font-mono tracking-widest uppercase text-[#1A1614]/50">
                            {related.era}
                          </p>
                        </div>
                      </div>
                      <ArrowRight
                        size={14}
                        strokeWidth={1}
                        className="text-[#1A1614]/40 group-hover:text-[#D35400] group-hover:translate-x-0.5 transition-all duration-300"
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
      <div className="px-8 py-8 border-t border-[#1A1614]/15 flex items-center justify-between bg-[#FAF8F5]">
        <p className="font-mono tracking-widest text-[#1A1614]/55 uppercase" style={{ fontSize: '12px' }}>
          NATURAL HISTORY MUSEUM — SPECIMEN RECORD
        </p>
        <button
          onClick={() => navigate('/exhibits')}
          className="text-[14px] font-mono tracking-widest uppercase text-[#1A1614]/65 hover:text-[#D35400] transition-colors duration-200 flex items-center gap-2 cursor-pointer"
          aria-label="Return to all exhibits"
        >
          All Exhibits
          <ArrowRight size={12} strokeWidth={1.5} aria-hidden="true" className="text-[#D35400]" />
        </button>
      </div>
    </main>
  );
}
