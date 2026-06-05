import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

export interface ClickEvent {
  x: number; // percentage from left (0 - 100)
  y: number; // percentage from top of page (0 - 100)
  label: string;
  elementId?: string;
  timestamp: number;
}

export interface SystemEvent {
  type: string;
  description: string;
  timestamp: number;
}

export interface AnalyticsData {
  sessionStartTime: number;
  sessionDuration: number; // in seconds
  scrollDepth: number; // max percentage reached (0 - 100)
  dwellTimes: Record<string, number>; // sectionId -> seconds
  clicks: ClickEvent[];
  events: SystemEvent[];
  drawersOpened: Record<string, number>; // drawerId -> count
  ctasClicked: Record<string, number>; // ctaId -> count
}

interface AnalyticsContextType {
  data: AnalyticsData;
  trackClick: (x: number, y: number, label: string, elementId?: string) => void;
  trackCustomEvent: (type: string, description: string) => void;
  updateDwellTime: (sectionId: string, seconds: number) => void;
  updateScrollDepth: (depth: number) => void;
  incrementDrawer: (drawerId: string) => void;
  incrementCta: (ctaId: string) => void;
  clearAnalytics: () => void;
  injectSimulatorData: (profile: 'explorer' | 'scholar') => void;
}

const LOCAL_STORAGE_KEY = 'nhm_analytics_data_v1';

const initialData: AnalyticsData = {
  sessionStartTime: Date.now(),
  sessionDuration: 0,
  scrollDepth: 0,
  dwellTimes: {
    hero: 0,
    timeline: 0,
    triassic: 0,
    jurassic: 0,
    cretaceous: 0,
    archive: 0,
    extinction: 0,
    legacy: 0,
  },
  clicks: [],
  events: [],
  drawersOpened: {
    theropoda: 0,
    sauropoda: 0,
    avialae: 0,
  },
  ctasClicked: {
    start_journey: 0,
    explore_archive: 0,
    timeline_jump: 0,
    mobile_menu: 0,
  },
};

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
};

export const AnalyticsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<AnalyticsData>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Exclude sessions older than 3 hours to refresh for testing, but preserve fresh ones
        if (Date.now() - parsed.sessionStartTime < 3 * 60 * 60 * 1000) {
          return parsed;
        }
      } catch (e) {
        console.error('Failed to parse analytics data', e);
      }
    }
    return {
      ...initialData,
      sessionStartTime: Date.now(),
      events: [
        {
          type: 'session_start',
          description: 'New interactive museum session initialized.',
          timestamp: Date.now(),
        },
      ],
    };
  });

  const dataRef = useRef(data);
  useEffect(() => {
    dataRef.current = data;
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  // Session Duration Counter
  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => ({
        ...prev,
        sessionDuration: prev.sessionDuration + 1,
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const trackClick = useCallback((x: number, y: number, label: string, elementId?: string) => {
    const newClick: ClickEvent = {
      x,
      y,
      label,
      elementId,
      timestamp: Date.now(),
    };

    const newEvent: SystemEvent = {
      type: 'click',
      description: `Clicked "${label}"${elementId ? ` (ID: ${elementId})` : ''} at viewport grid [${x.toFixed(0)}%, ${y.toFixed(0)}%]`,
      timestamp: Date.now(),
    };

    setData((prev) => ({
      ...prev,
      clicks: [...prev.clicks.slice(-150), newClick], // Keep last 150 clicks
      events: [...prev.events.slice(-99), newEvent], // Keep last 100 events
    }));
  }, []);

  const trackCustomEvent = useCallback((type: string, description: string) => {
    const newEvent: SystemEvent = {
      type,
      description,
      timestamp: Date.now(),
    };

    setData((prev) => ({
      ...prev,
      events: [...prev.events.slice(-99), newEvent],
    }));
  }, []);

  const updateDwellTime = useCallback((sectionId: string, seconds: number) => {
    setData((prev) => {
      const dwellTimes = { ...prev.dwellTimes };
      dwellTimes[sectionId] = (dwellTimes[sectionId] || 0) + seconds;
      return { ...prev, dwellTimes };
    });
  }, []);

  const updateScrollDepth = useCallback((depth: number) => {
    setData((prev) => {
      if (depth <= prev.scrollDepth) return prev;
      
      const newEvent: SystemEvent = {
        type: 'scroll_threshold',
        description: `Reached ${depth}% of total timeline depth`,
        timestamp: Date.now(),
      };

      return {
        ...prev,
        scrollDepth: depth,
        events: [...prev.events.slice(-99), newEvent],
      };
    });
  }, []);

  const incrementDrawer = useCallback((drawerId: string) => {
    setData((prev) => {
      const drawersOpened = { ...prev.drawersOpened };
      drawersOpened[drawerId] = (drawersOpened[drawerId] || 0) + 1;

      const newEvent: SystemEvent = {
        type: 'drawer_open',
        description: `Extracted fossil record ledger from ${drawerId.toUpperCase()} drawer`,
        timestamp: Date.now(),
      };

      return {
        ...prev,
        drawersOpened,
        events: [...prev.events.slice(-99), newEvent],
      };
    });
  }, []);

  const incrementCta = useCallback((ctaId: string) => {
    setData((prev) => {
      const ctasClicked = { ...prev.ctasClicked };
      ctasClicked[ctaId] = (ctasClicked[ctaId] || 0) + 1;

      const labels: Record<string, string> = {
        start_journey: 'Start Descent Into Deep Time',
        explore_archive: 'Explore Specimen Archive Button',
        timeline_jump: 'Stratum Chronology Jump',
        mobile_menu: 'Mobile Navigation Toggle',
      };

      const newEvent: SystemEvent = {
        type: 'cta_click',
        description: `Triggered major action: "${labels[ctaId] || ctaId}"`,
        timestamp: Date.now(),
      };

      return {
        ...prev,
        ctasClicked,
        events: [...prev.events.slice(-99), newEvent],
      };
    });
  }, []);

  const clearAnalytics = useCallback(() => {
    const freshData = {
      ...initialData,
      sessionStartTime: Date.now(),
      events: [
        {
          type: 'session_reset',
          description: 'Analytics session reset. New tracking instance initialized.',
          timestamp: Date.now(),
        },
      ],
    };
    setData(freshData);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(freshData));
  }, []);

  const injectSimulatorData = useCallback((profile: 'explorer' | 'scholar') => {
    const baseTime = Date.now() - 450 * 1000; // 7.5 mins ago
    
    if (profile === 'explorer') {
      const simulated: AnalyticsData = {
        sessionStartTime: baseTime,
        sessionDuration: 450, // 7.5 minutes
        scrollDepth: 100, // Complete journey
        dwellTimes: {
          hero: 32,
          timeline: 55,
          triassic: 44,
          jurassic: 87,
          cretaceous: 112,
          archive: 94,
          extinction: 48,
          legacy: 38,
        },
        drawersOpened: {
          theropoda: 3,
          sauropoda: 2,
          avialae: 1,
        },
        ctasClicked: {
          start_journey: 1,
          explore_archive: 2,
          timeline_jump: 5,
          mobile_menu: 0,
        },
        clicks: [
          { x: 50, y: 88, label: 'Scroll to descend into deep time', elementId: 'scroll-prompt', timestamp: baseTime + 15 * 1000 },
          { x: 80, y: 200, label: 'Morrison Formation', elementId: 'strata-Morrison', timestamp: baseTime + 45 * 1000 },
          { x: 25, y: 350, label: 'Triassic Volcanic Fissures', timestamp: baseTime + 110 * 1000 },
          { x: 70, y: 450, label: 'Allosaurus Height block', timestamp: baseTime + 210 * 1000 },
          { x: 75, y: 460, label: 'Brachiosaurus Height block', timestamp: baseTime + 215 * 1000 },
          { x: 92, y: 640, label: 'THEROPODA CABINET', elementId: 'drawer-theropoda', timestamp: baseTime + 320 * 1000 },
          { x: 92, y: 690, label: 'SAUROPODA CABINET', elementId: 'drawer-sauropoda', timestamp: baseTime + 335 * 1000 },
          { x: 92, y: 740, label: 'AVIALAE CABINET', elementId: 'drawer-avialae', timestamp: baseTime + 350 * 1000 },
          { x: 50, y: 950, label: 'Explore Specimen Archive Button', elementId: 'archive-cta', timestamp: baseTime + 430 * 1000 },
        ],
        events: [
          { type: 'session_start', description: 'Simulated Explorer Session started.', timestamp: baseTime },
          { type: 'cta_click', description: 'Triggered major action: "Start Descent Into Deep Time"', timestamp: baseTime + 15 * 1000 },
          { type: 'scroll_threshold', description: 'Reached 25% of total timeline depth', timestamp: baseTime + 35 * 1000 },
          { type: 'click', description: 'Clicked "Morrison Formation" Stratum Layer', timestamp: baseTime + 45 * 1000 },
          { type: 'scroll_threshold', description: 'Reached 50% of total timeline depth', timestamp: baseTime + 95 * 1000 },
          { type: 'scroll_threshold', description: 'Reached 75% of total timeline depth', timestamp: baseTime + 280 * 1000 },
          { type: 'drawer_open', description: 'Extracted fossil record ledger from THEROPODA drawer', timestamp: baseTime + 320 * 1000 },
          { type: 'drawer_open', description: 'Extracted fossil record ledger from SAUROPODA drawer', timestamp: baseTime + 335 * 1000 },
          { type: 'drawer_open', description: 'Extracted fossil record ledger from AVIALAE drawer', timestamp: baseTime + 350 * 1000 },
          { type: 'scroll_threshold', description: 'Reached 100% of total timeline depth', timestamp: baseTime + 400 * 1000 },
          { type: 'cta_click', description: 'Triggered major action: "Explore Specimen Archive Button"', timestamp: baseTime + 430 * 1000 },
        ],
      };
      setData(simulated);
    } else if (profile === 'scholar') {
      const simulated: AnalyticsData = {
        sessionStartTime: baseTime + 150 * 1000,
        sessionDuration: 300, // 5 minutes
        scrollDepth: 45, // Focuses only on early layers (Hero, Timeline, Triassic)
        dwellTimes: {
          hero: 65,
          timeline: 145,
          triassic: 90,
          jurassic: 0,
          cretaceous: 0,
          archive: 0,
          extinction: 0,
          legacy: 0,
        },
        drawersOpened: {
          theropoda: 0,
          sauropoda: 0,
          avialae: 0,
        },
        ctasClicked: {
          start_journey: 1,
          explore_archive: 0,
          timeline_jump: 2,
          mobile_menu: 2,
        },
        clicks: [
          { x: 50, y: 88, label: 'Scroll to descend into deep time', elementId: 'scroll-prompt', timestamp: baseTime + 175 * 1000 },
          { x: 80, y: 210, label: 'Triassic Stratum layer', elementId: 'strata-Triassic', timestamp: baseTime + 220 * 1000 },
          { x: 80, y: 190, label: 'Jurassic Stratum layer', elementId: 'strata-Jurassic', timestamp: baseTime + 280 * 1000 },
          { x: 95, y: 8, label: 'Mobile Menu Open', elementId: 'menu-toggle', timestamp: baseTime + 340 * 1000 },
          { x: 95, y: 8, label: 'Mobile Menu Close', elementId: 'menu-toggle', timestamp: baseTime + 390 * 1000 },
        ],
        events: [
          { type: 'session_start', description: 'Simulated Scholar Session started.', timestamp: baseTime + 150 * 1000 },
          { type: 'scroll_threshold', description: 'Reached 15% of total timeline depth', timestamp: baseTime + 160 * 1000 },
          { type: 'cta_click', description: 'Triggered major action: "Start Descent Into Deep Time"', timestamp: baseTime + 175 * 1000 },
          { type: 'click', description: 'Clicked "Triassic Stratum" Layer to review lithology details', timestamp: baseTime + 220 * 1000 },
          { type: 'scroll_threshold', description: 'Reached 30% of total timeline depth', timestamp: baseTime + 250 * 1000 },
          { type: 'click', description: 'Clicked "Jurassic Stratum" Layer', timestamp: baseTime + 280 * 1000 },
          { type: 'cta_click', description: 'Triggered major action: "Mobile Navigation Toggle"', timestamp: baseTime + 340 * 1000 },
          { type: 'cta_click', description: 'Triggered major action: "Mobile Navigation Toggle"', timestamp: baseTime + 390 * 1000 },
          { type: 'scroll_threshold', description: 'Reached 45% of total timeline depth', timestamp: baseTime + 410 * 1000 },
        ],
      };
      setData(simulated);
    }
  }, []);

  return (
    <AnalyticsContext.Provider
      value={{
        data,
        trackClick,
        trackCustomEvent,
        updateDwellTime,
        updateScrollDepth,
        incrementDrawer,
        incrementCta,
        clearAnalytics,
        injectSimulatorData,
      }}
    >
      {children}
    </AnalyticsContext.Provider>
  );
};
