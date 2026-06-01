import { useEffect, useRef, useId } from 'react';
import { usePresence } from 'motion/react';

interface SandTransitionImageProps {
  src: string;
  alt: string;
  className?: string;
}

/**
 * SandTransitionImage
 *
 * Creates a sand/particle dissolve effect using SVG filters.
 * Uses usePresence() from motion/react for AnimatePresence awareness.
 *
 * Performance optimizations applied vs raw spec:
 * - Uses requestAnimationFrame with early cancellation
 * - SVG filter element is stable; only attributes are mutated (no re-render)
 * - GPU-promoted via translate3d(0,0,0) wrapper
 * - baseFrequency kept low (1.8) per spec — tuned for performance
 * - numOctaves capped at 4 per spec
 * - feColorMatrix opacity clamp prevents overdraw artifacts
 */
export default function SandTransitionImage({
  src,
  alt,
  className = '',
}: SandTransitionImageProps) {
  const rawId = useId();
  // Convert useId output to a valid XML ID (no colons)
  const filterId = useRef(`sand-${rawId.replace(/:/g, '')}${Math.random().toString(36).slice(2, 7)}`);

  const [isPresent, safeToRemove] = usePresence();
  const rafRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const DURATION = 900;

  // Refs to SVG filter primitives for direct DOM mutation (avoids React re-render)
  const turbRef = useRef<SVGFETurbulenceElement>(null);
  const dispRef = useRef<SVGFEDisplacementMapElement>(null);
  const offsetRef = useRef<SVGFEOffsetElement>(null);
  const blurRef = useRef<SVGFEGaussianBlurElement>(null);
  const colorRef = useRef<SVGFEColorMatrixElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const entering = isPresent;
    startTimeRef.current = performance.now();

    function animate(now: number) {
      const elapsed = now - startTimeRef.current;
      const raw = Math.min(elapsed / DURATION, 1);

      // Easing
      const t = entering
        ? 1 - Math.pow(1 - raw, 4) // quartic ease-out (enter)
        : Math.pow(raw, 3); // cubic (exit)

      const progress = entering ? t : t;

      if (entering) {
        // Entering: progress goes 0→1 (image appears)
        const invP = 1 - progress;
        turbRef.current?.setAttribute('baseFrequency', '1.8');
        dispRef.current?.setAttribute('scale', String(invP * 150));
        offsetRef.current?.setAttribute('dy', String(invP * -80));
        offsetRef.current?.setAttribute('dx', String(invP * -30));
        blurRef.current?.setAttribute('stdDeviation', String(invP * 6));
        const opacity = Math.min(progress * 1.5, 1);
        if (colorRef.current) {
          colorRef.current.setAttribute(
            'values',
            `1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${opacity} 0`
          );
        }
      } else {
        // Exiting: progress goes 0→1 (image dissolves away)
        turbRef.current?.setAttribute('baseFrequency', '1.8');
        dispRef.current?.setAttribute('scale', String(progress * 150));
        offsetRef.current?.setAttribute('dy', String(progress * 120));
        offsetRef.current?.setAttribute('dx', String(progress * 30));
        blurRef.current?.setAttribute('stdDeviation', String(progress * 6));
        const opacity = Math.max(1 - progress * 1.2, 0);
        if (colorRef.current) {
          colorRef.current.setAttribute(
            'values',
            `1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${opacity} 0`
          );
        }
      }

      if (raw < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else if (!entering) {
        safeToRemove?.();
      }
    }

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isPresent, safeToRemove]);

  const fId = filterId.current;

  return (
    <div
      className={`absolute inset-0 flex items-center justify-center ${className}`}
      style={{ transform: 'translate3d(0,0,0)', willChange: 'transform' }}
    >
      {/* Hidden SVG filter definition */}
      <svg
        width="0"
        height="0"
        style={{ position: 'absolute', overflow: 'hidden' }}
        aria-hidden="true"
      >
        <defs>
          <filter
            id={fId}
            x="-30%"
            y="-30%"
            width="160%"
            height="160%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              ref={turbRef}
              type="fractalNoise"
              baseFrequency="1.8"
              numOctaves={4}
              result="noise"
              seed={Math.floor(Math.random() * 100)}
            />
            <feDisplacementMap
              ref={dispRef}
              in="SourceGraphic"
              in2="noise"
              scale={150}
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />
            <feOffset
              ref={offsetRef}
              in="displaced"
              dx={-30}
              dy={-80}
              result="offset"
            />
            <feGaussianBlur
              ref={blurRef}
              in="offset"
              stdDeviation={6}
              result="blurred"
            />
            <feColorMatrix
              ref={colorRef}
              in="blurred"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0 0"
              result="colored"
            />
          </filter>
        </defs>
      </svg>

      {/* Filtered image */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
        className="w-[80%] h-[80%] object-contain mix-blend-lighten"
        style={{ filter: `url(#${fId})` }}
      />
    </div>
  );
}
