import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { getDinosaurBySlug, dinosaursData } from '../data/dinosaurs';

const dietColors: Record<string, { bg: string; text: string; border: string }> = {
  carnivore: { bg: 'bg-red-950/30', text: 'text-red-300', border: 'border-red-800/40' },
  herbivore: { bg: 'bg-emerald-950/30', text: 'text-emerald-300', border: 'border-emerald-800/40' },
  omnivore: { bg: 'bg-amber-950/30', text: 'text-amber-300', border: 'border-amber-800/40' },
};

export default function ExhibitDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const dinosaur = getDinosaurBySlug(slug ?? '');

  if (!dinosaur) {
    return (
      <main className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
        <title>Specimen Not Found — Natural History Museum</title>
        <PageHeader backLabel="All Exhibits" backTo="/exhibits" />
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <p className="text-[10px] font-mono tracking-widest uppercase text-gray-500 mb-4">
            Specimen Not Found
          </p>
          <h1
            className="font-medium tracking-tight text-white mb-8"
            style={{ fontSize: 'clamp(2rem, 4vw, 4rem)', lineHeight: 1.1 }}
          >
            This fossil<br />has gone missing.
          </h1>
          <button
            onClick={() => navigate('/exhibits')}
            className="text-[10px] font-mono tracking-widest uppercase text-gray-400 hover:text-white transition-colors duration-200 underline"
          >
            Return to Exhibits
          </button>
        </div>
      </main>
    );
  }

  const dc = dietColors[dinosaur.diet];
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
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <title>{dinosaur.name} — Natural History Museum</title>

      <PageHeader backLabel="All Exhibits" backTo="/exhibits" />

      {/* Hero section */}
      <section className="relative border-b border-gray-800 overflow-hidden">
        <div className="flex flex-col md:flex-row min-h-[60vh]">
          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
            className="flex-1 flex flex-col justify-end px-6 md:px-16 py-12 md:py-16 border-b md:border-b-0 md:border-r border-gray-800"
          >
            {/* Era + diet */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[9px] font-mono tracking-widest uppercase text-gray-500 border border-gray-700 px-2 py-1">
                {dinosaur.era}
              </span>
              <span className={`text-[9px] font-mono tracking-widest uppercase px-2 py-1 border ${dc.bg} ${dc.text} ${dc.border}`}>
                {dinosaur.diet}
              </span>
            </div>

            {/* Name */}
            <h1
              className="font-medium tracking-tight text-white mb-2"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 5.5rem)', lineHeight: 1.0 }}
            >
              {dinosaur.name.split(' ').map((word, i) => (
                <span key={i} className="block">{word}</span>
              ))}
            </h1>
            <p className="text-[11px] font-mono tracking-widest text-gray-500 uppercase mt-2">
              {dinosaur.periodRange}
            </p>
          </motion.div>

          {/* Right — hero image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
            className="md:w-[45%] min-h-[350px] bg-[#060606] flex items-center justify-center p-8 md:p-16"
          >
            <img
              src={dinosaur.heroImage}
              alt={`${dinosaur.name} specimen`}
              className="w-full h-full object-contain mix-blend-lighten max-h-[400px]"
            />
          </motion.div>
        </div>
      </section>

      {/* Stats row */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.35 }}
        className="border-b border-gray-800"
        aria-label="Specimen statistics"
      >
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {stats.map(({ label, value }, i) => (
            <div
              key={label}
              className={`px-6 py-6 flex flex-col gap-2 ${i < stats.length - 1 ? 'border-b md:border-b-0 md:border-r border-gray-800' : ''}`}
            >
              <p className="text-[9px] font-mono tracking-widest uppercase text-gray-600">{label}</p>
              <p className="text-[13px] font-medium text-white">{value}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Body — two columns */}
      <div className="flex flex-col md:flex-row">
        {/* Left — Description + Fun Facts */}
        <div className="flex-1 px-6 md:px-16 py-12 md:py-16 border-b md:border-b-0 md:border-r border-gray-800">
          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.45 }}
          >
            <h2 className="text-[10px] font-mono tracking-widest uppercase text-gray-500 mb-6">
              About this Specimen
            </h2>
            <p
              className="text-gray-300 leading-[1.8] mb-16"
              style={{ fontSize: '14px', maxWidth: '600px' }}
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
            <h2 className="text-[10px] font-mono tracking-widest uppercase text-gray-500 mb-6">
              Palaeontological Notes
            </h2>
            <div className="flex flex-col gap-4">
              {dinosaur.funFacts.map((fact, i) => (
                <div
                  key={i}
                  className="flex gap-4 p-5 border border-gray-800 bg-[#111] hover:border-gray-600 transition-colors duration-300"
                >
                  <span
                    className="text-[10px] font-mono tracking-widest text-gray-600 shrink-0 mt-0.5"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-[12px] text-gray-400 leading-relaxed">{fact}</p>
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
            <h2 className="text-[10px] font-mono tracking-widest uppercase text-gray-500 mb-4">
              Habitat
            </h2>
            <p className="text-[12px] text-gray-400 leading-relaxed">{dinosaur.habitat}</p>
          </motion.div>

          {/* Related species */}
          {relatedDinos.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.6 }}
            >
              <h2 className="text-[10px] font-mono tracking-widest uppercase text-gray-500 mb-6">
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
                      className="group flex items-center justify-between border border-gray-800 p-4 bg-[#111]
                        hover:border-gray-600 transition-all duration-300 text-left
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
                          <p className="text-[11px] font-medium text-white group-hover:text-gray-300 transition-colors duration-300">
                            {related.shortName}
                          </p>
                          <p className="text-[9px] font-mono tracking-widest uppercase text-gray-600">
                            {related.era}
                          </p>
                        </div>
                      </div>
                      <ArrowRight
                        size={14}
                        strokeWidth={1}
                        className="text-gray-600 group-hover:text-gray-300 group-hover:translate-x-0.5 transition-all duration-300"
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
      <div className="px-8 py-8 border-t border-gray-800 flex items-center justify-between">
        <p className="font-mono tracking-widest text-gray-600 uppercase" style={{ fontSize: '10px' }}>
          NATURAL HISTORY MUSEUM — SPECIMEN RECORD
        </p>
        <button
          onClick={() => navigate('/exhibits')}
          className="text-[10px] font-mono tracking-widest uppercase text-gray-500 hover:text-white transition-colors duration-200 flex items-center gap-2"
          aria-label="Return to all exhibits"
        >
          All Exhibits
          <ArrowRight size={10} strokeWidth={1.5} aria-hidden="true" />
        </button>
      </div>
    </main>
  );
}
