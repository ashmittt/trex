import { useEffect, useRef } from 'react';
import { useAnalytics } from '../context/AnalyticsContext';

export default function useBehavioralAnalytics() {
  const { trackClick, updateDwellTime, updateScrollDepth } = useAnalytics();
  const activeSectionRef = useRef<string | null>(null);
  const activeIntervalRef = useRef<number | null>(null);

  // 1. Click coordinate tracking
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Get closest button, link, drawer handle, or click target
      const interactiveEl = target.closest('button, a, [role="button"], [onClick], input, select');
      
      // Determine click label
      let label = '';
      if (interactiveEl) {
        label = interactiveEl.getAttribute('aria-label') || 
                interactiveEl.getAttribute('placeholder') || 
                (interactiveEl as HTMLElement).innerText?.trim().slice(0, 40) ||
                interactiveEl.id ||
                interactiveEl.tagName;
      } else {
        label = target.innerText?.trim().slice(0, 30) || target.id || target.tagName || 'Background Area';
      }

      if (!label) {
        label = 'Interactive Element';
      }

      // Calculate absolute position on the document
      const docHeight = Math.max(1, document.documentElement.scrollHeight);
      const docWidth = Math.max(1, document.documentElement.scrollWidth);
      const clickX = ((e.clientX + window.scrollX) / docWidth) * 100;
      const clickY = ((e.clientY + window.scrollY) / docHeight) * 100;

      trackClick(clickX, clickY, label, interactiveEl?.id || target.id);
    };

    window.addEventListener('click', handleGlobalClick, { capture: true, passive: true });
    return () => window.removeEventListener('click', handleGlobalClick, { capture: true });
  }, [trackClick]);

  // 2. Scroll Depth tracking (throttled)
  useEffect(() => {
    let lastScrollY = 0;
    let ticking = false;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (Math.abs(scrollY - lastScrollY) < 30) return; // Ignore micro-scrolls
      
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          if (docHeight > 0) {
            const progress = Math.round((scrollY / docHeight) * 100);
            updateScrollDepth(Math.min(100, Math.max(0, progress)));
          }
          ticking = false;
        });
        ticking = true;
      }
      lastScrollY = scrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [updateScrollDepth]);

  // 3. Section Dwell Time tracking using IntersectionObserver
  useEffect(() => {
    const sectionIds = ['hero', 'story', 'timeline', 'triassic', 'jurassic', 'cretaceous', 'archive', 'extinction', 'legacy'];
    
    // Clear existing interval
    const stopDwellTimer = () => {
      if (activeIntervalRef.current !== null) {
        window.clearInterval(activeIntervalRef.current);
        activeIntervalRef.current = null;
      }
    };

    // Start running a dwell timer for the active section
    const startDwellTimer = (sectionId: string) => {
      stopDwellTimer();
      activeSectionRef.current = sectionId;
      
      activeIntervalRef.current = window.setInterval(() => {
        // Only track if tab is active/focused
        if (document.visibilityState === 'visible') {
          updateDwellTime(sectionId, 1);
        }
      }, 1000);
    };

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -20% 0px', // Center viewport focus
      threshold: 0.2, // At least 20% in view
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      // Find the entry that has the highest intersection ratio
      const visibleEntries = entries.filter((e) => e.isIntersecting);
      if (visibleEntries.length === 0) return;

      const primaryEntry = visibleEntries.reduce((max, entry) => 
        entry.intersectionRatio > max.intersectionRatio ? entry : max
      , visibleEntries[0]);

      const sectionId = primaryEntry.target.id;
      if (sectionId && sectionId !== activeSectionRef.current) {
        startDwellTimer(sectionId);
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
      stopDwellTimer();
    };
  }, [updateDwellTime]);
}
