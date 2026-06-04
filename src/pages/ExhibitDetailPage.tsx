import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { getDinosaurBySlug, dinosaursData } from '../data/dinosaurs';

const dietColors: Record<string, { bg: string; text: string; border: string }> = {
  carnivore: { bg: 'bg-[#8C3A2D]/15', text: 'text-[#8C3A2D]', border: 'border-[#8C3A2D]/30' },
  herbivore: { bg: 'bg-[#A07C4F]/15', text: 'text-[#A07C4F]', border: 'border-[#A07C4F]/30' },
  omnivore: { bg: 'bg-[#A9A295]/15', text: 'text-[#A9A295]', border: 'border-[#A9A295]/30' },
};

export default function ExhibitDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const dinosaur = getDinosaurBySlug(slug ?? '');

  if (!dinosaur) {
    return (
      <main className="min-h-screen bg-[#050505] text-[#F5F2EA] flex flex-col">
        <title>Specimen Not Found — Natural History Museum</title>
        <PageHeader backLabel="All Exhibits" backTo="/exhibits" />
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <p className="text-[14px] font-mono tracking-widest uppercase text-[#A07C4F] mb-4">
            Specimen Not Found
          </p>
          <h1
            className="font-normal tracking-tight text-[#F5F2EA] mb-8"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', lineHeight: 1.15 }}
          >
            This fossil<br />has gone missing.
          </h1>
          <button
            onClick={() => navigate('/exhibits')}
            className="text-[14px] font-mono tracking-widest uppercase text-[#A9A295] hover:text-[#F5F2EA] transition-colors duration-200 underline cursor-pointer"
          >
            Return to Exhibits
          </button>
        </div>
      </main>
    );
  }

  const dc = dietColors[dinosaur.diet] || { bg: 'bg-[#A9A295]/15', text: 'text-[#A9A295]', border: 'border-[#A9A295]/30' };
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
    <main className="min-h-screen bg-[#050505] text-[#F5F2EA]">
      <title>{dinosaur.name} — Natural History Museum</title>

      <PageHeader backLabel="All Exhibits" backTo="/exhibits" />

      {/* Hero section */}
      <section className="relative border-b border-[#A07C4F]/15 overflow-hidden">
        <div className="flex flex-col md:flex-row min-h-[60vh]">
          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
            className="flex-1 flex flex-col justify-end px-6 md:px-16 py-12 md:py-16 border-b md:border-b-0 md:border-r border-[#A07C4F]/15"
          >
            {/* Era + diet */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[14px] font-mono tracking-widest uppercase text-[#A9A295] border border-[#A9A295]/20 px-2 py-1">
                {dinosaur.era}
              </span>
              <span className={`text-[14px] font-mono tracking-widest uppercase px-2 py-1 border ${dc.bg} ${dc.text} ${dc.border}`}>
                {dinosaur.diet}
              </span>
            </div>

            {/* Name */}
            <h1
              className="font-normal tracking-tight text-[#F5F2EA] mb-2"
              style={{ fontSize: 'clamp(3.5rem, 6vw, 6.5rem)', lineHeight: 1.0 }}
            >
              {dinosaur.name.split(' ').map((word, i) => (
                <span key={i} className="block">{word}</span>
              ))}
            </h1>
            <p className="text-[15px] font-mono tracking-widest text-[#A07C4F] uppercase mt-2">
              {dinosaur.periodRange}
            </p>
          </motion.div>

          {/* Right — hero image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
            className="md:w-[45%] min-h-[350px] bg-[#0a0a0a]/30 flex items-center justify-center p-8 md:p-16"
          >
            <img
              src={dinosaur.heroImage}
              alt={`${dinosaur.name} specimen`}
              className="w-full h-full object-contain mix-blend-lighten max-h-[400px] filter drop-shadow-[0_15px_40px_rgba(160,124,79,0.1)]"
            />
          </motion.div>
        </div>
      </section>

      {/* Stats row */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.35 }}
        className="border-b border-[#A07C4F]/15"
        aria-label="Specimen statistics"
      >
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {stats.map(({ label, value }, i) => (
            <div
              key={label}
              className={`px-6 py-6 flex flex-col gap-2 ${i < stats.length - 1 ? 'border-b lg:border-b-0 lg:border-r border-[#A07C4F]/15' : ''}`}
            >
              <p className="text-[14px] font-mono tracking-widest uppercase text-[#A07C4F]">{label}</p>
              <p className="text-[18px] font-normal text-[#F5F2EA]">{value}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Body — two columns */}
      <div className="flex flex-col md:flex-row">
        {/* Left — Description + Fun Facts */}
        <div className="flex-1 px-6 md:px-16 py-12 md:py-16 border-b md:border-b-0 md:border-r border-[#A07C4F]/15">
          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.45 }}
          >
            <h2 className="text-[14px] font-mono tracking-widest uppercase text-[#A07C4F] mb-6">
              About this Specimen
            </h2>
            <p
              className="text-[#D8D1C2] leading-[1.8] mb-16"
              style={{ fontSize: '18px', maxWidth: '600px' }}
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
            <h2 className="text-[14px] font-mono tracking-widest uppercase text-[#A07C4F] mb-6">
              Palaeontological Notes
            </h2>
            <div className="flex flex-col gap-4">
              {dinosaur.funFacts.map((fact, i) => (
                <div
                  key={i}
                  className="flex gap-4 p-5 border border-[#A07C4F]/10 bg-[#0a0a0a] hover:border-[#A07C4F]/30 transition-all duration-300"
                >
                  <span
                    className="text-[14px] font-mono tracking-widest text-[#A07C4F] shrink-0 mt-0.5"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-[18px] text-[#D8D1C2] leading-relaxed">{fact}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right — Habitat + Related Species */}
        <div className="md:w-[320px] shrink-0 px-6 md:px-10 py-12 md:py-16 flex flex-col gap-12">
          {/* Habitat */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.5 }}
          >
            <h2 className="text-[14px] font-mono tracking-widest uppercase text-[#A07C4F] mb-4">
              Habitat
            </h2>
            <p className="text-[18px] text-[#D8D1C2] leading-relaxed">{dinosaur.habitat}</p>
          </motion.div>

          {/* Related species */}
          {relatedDinos.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.6 }}
            >
              <h2 className="text-[14px] font-mono tracking-widest uppercase text-[#A07C4F] mb-6">
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
                      className="group flex items-center justify-between border border-[#A07C4F]/10 p-4 bg-[#0a0a0a]
                        hover:border-[#A07C4F]/30 transition-all duration-300 text-left cursor-pointer
                        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={related.image}
                          alt={related.name}
                          loading="lazy"
                          className="w-12 h-12 object-contain mix-blend-lighten opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                        />
                        <div>
                          <p className="text-[16px] font-normal text-[#F5F2EA] group-hover:text-[#A07C4F] transition-colors duration-300">
                            {related.shortName}
                          </p>
                          <p className="text-[13px] font-mono tracking-widest uppercase text-[#A9A295]">
                            {related.era}
                          </p>
                        </div>
                      </div>
                      <ArrowRight
                        size={14}
                        strokeWidth={1}
                        className="text-[#A9A295] group-hover:text-[#F5F2EA] group-hover:translate-x-0.5 transition-all duration-300"
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
      <div className="px-8 py-8 border-t border-[#A07C4F]/15 flex items-center justify-between bg-[#050505]">
        <p className="font-mono tracking-widest text-[#A9A295] uppercase" style={{ fontSize: '12px' }}>
          NATURAL HISTORY MUSEUM — SPECIMEN RECORD
        </p>
        <button
          onClick={() => navigate('/exhibits')}
          className="text-[14px] font-mono tracking-widest uppercase text-[#A9A295] hover:text-[#F5F2EA] transition-colors duration-200 flex items-center gap-2 cursor-pointer"
          aria-label="Return to all exhibits"
        >
          All Exhibits
          <ArrowRight size={12} strokeWidth={1.5} aria-hidden="true" />
        </button>
      </div>
    </main>
  );
}
