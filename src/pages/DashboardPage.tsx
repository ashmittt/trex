import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Activity, Trash2, ArrowLeft, Download, 
  Compass, BookOpen, Clock, MousePointer, Flame, Layers 
} from 'lucide-react';
import { useAnalytics } from '../context/AnalyticsContext';

const stages = [
  { id: 'hero', num: '01', name: 'Arrival' },
  { id: 'timeline', num: '02', name: 'Strata Spine' },
  { id: 'triassic', num: '03', name: 'Triassic Era' },
  { id: 'jurassic', num: '04', name: 'Jurassic Era' },
  { id: 'cretaceous', num: '05', name: 'Cretaceous Era' },
  { id: 'archive', num: '08', name: 'Museum Cabinets' },
  { id: 'extinction', num: '09', name: 'Extinction Event' },
  { id: 'legacy', num: '10', name: 'Deep Legacy' },
];

export default function DashboardPage() {
  const { 
    data, 
    clearAnalytics, 
    injectSimulatorData, 
    trackClick 
  } = useAnalytics();
  
  const [filterType, setFilterType] = useState<string>('all');
  const [hoveredClick, setHoveredClick] = useState<any | null>(null);
  const tickerEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll the live event feed ticker
  useEffect(() => {
    if (tickerEndRef.current) {
      tickerEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [data.events]);

  // Download logs as JSON
  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `nhm_telemetry_session_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Click handler on mockup map to log coordinates
  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    trackClick(x, y, 'Simulated Map Inspect Click', 'heatmap-mockup');
  };

  // Calculations for charts
  const totalDwellTime = Object.values(data.dwellTimes).reduce((a, b) => a + b, 0);
  
  // Find primary focus era
  const focusSection = Object.entries(data.dwellTimes).reduce((max, entry) => 
    entry[1] > max[1] ? entry : max
  , ['None', 0]);

  // Format timestamp helper
  const formatTime = (ts: number) => {
    const date = new Date(ts);
    return date.toTimeString().split(' ')[0];
  };

  const filteredEvents = data.events.filter(e => {
    if (filterType === 'all') return true;
    return e.type === filterType;
  });

  // Funnel calculations
  const funnelStages = [
    { label: 'Hero (Arrival)', depth: 0, count: data.scrollDepth >= 0 ? 1 : 0 },
    { label: 'Timeline (Strata)', depth: 15, count: data.scrollDepth >= 15 ? 1 : 0 },
    { label: 'Triassic Era', depth: 30, count: data.scrollDepth >= 30 ? 1 : 0 },
    { label: 'Jurassic Era', depth: 45, count: data.scrollDepth >= 45 ? 1 : 0 },
    { label: 'Cretaceous Era', depth: 60, count: data.scrollDepth >= 60 ? 1 : 0 },
    { label: 'Museum Cabinets', depth: 75, count: data.scrollDepth >= 75 ? 1 : 0 },
    { label: 'Extinction Event', depth: 90, count: data.scrollDepth >= 90 ? 1 : 0 },
    { label: 'Deep Legacy', depth: 98, count: data.scrollDepth >= 98 ? 1 : 0 },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F2EA] py-12 px-6 md:px-16 selection:bg-[#C4903A]/30 selection:text-[#F5F2EA]">
      {/* Background radial accent glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-amber-950/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col gap-8 relative z-10">
        
        {/* ── HEADER BLOCK ── */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#9E8E78] mb-2">
              <Link to="/" className="hover:text-[#F5F2EA] transition-colors flex items-center gap-1">
                <ArrowLeft size={12} /> HOME
              </Link>
              <span>/</span>
              <span className="text-[#C4903A]">TELEMETRY CONSOLE</span>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl font-light uppercase tracking-wide flex items-center gap-3">
              Behavioral <span className="italic text-[#C4903A]">Analytics</span>
            </h1>
          </div>

          {/* Action buttons & simulation console */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Simulation triggers */}
            <div className="bg-white/5 border border-white/10 rounded-full p-1 flex items-center gap-1">
              <span className="font-mono text-[9px] text-[#9E8E78] uppercase px-3">Simulate:</span>
              <button 
                onClick={() => injectSimulatorData('explorer')}
                className="flex items-center gap-1 font-mono text-[9px] tracking-wider uppercase px-3 py-1.5 rounded-full bg-purple-950/45 border border-purple-500/20 text-purple-300 hover:bg-purple-900/40 cursor-pointer active:scale-95 transition-all"
              >
                <Compass size={10} /> Explorer
              </button>
              <button 
                onClick={() => injectSimulatorData('scholar')}
                className="flex items-center gap-1 font-mono text-[9px] tracking-wider uppercase px-3 py-1.5 rounded-full bg-amber-950/45 border border-[#C4903A]/20 text-[#C4903A] hover:bg-amber-900/40 cursor-pointer active:scale-95 transition-all"
              >
                <BookOpen size={10} /> Scholar
              </button>
            </div>

            {/* System controls */}
            <button 
              onClick={handleExportJSON}
              className="flex items-center gap-2 font-mono text-[10px] tracking-wider uppercase px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all cursor-pointer active:scale-95"
            >
              <Download size={12} /> Export JSON
            </button>
            <button 
              onClick={clearAnalytics}
              className="flex items-center gap-2 font-mono text-[10px] tracking-wider uppercase px-4 py-2.5 rounded-full bg-red-950/20 hover:bg-red-950/40 border border-red-900/30 text-red-400 transition-all cursor-pointer active:scale-95"
            >
              <Trash2 size={12} /> Clear Session
            </button>
          </div>
        </div>

        {/* ── BENTO TELEMETRY GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          
          {/* Card 1: Event Ticker Terminal (span 7) */}
          <div className="md:col-span-7 p-1 bg-white/5 border border-white/10 rounded-[1.5rem] flex flex-col h-[400px]">
            <div className="bg-[#0D0B08] rounded-[calc(1.5rem-4px)] p-6 flex-1 flex flex-col h-full overflow-hidden border border-white/5">
              <div className="flex justify-between items-center border-b border-white/10 pb-3 mb-4 shrink-0">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="font-mono text-xs text-[#F5F2EA] uppercase tracking-wider font-semibold">
                    Live Event Ticker
                  </span>
                </div>
                
                {/* Ticker filters */}
                <div className="flex gap-2 font-mono text-[9px] uppercase">
                  {['all', 'click', 'drawer_open', 'scroll_threshold'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setFilterType(type)}
                      className={`px-2 py-0.5 rounded border transition-colors cursor-pointer ${filterType === type ? 'bg-[#C4903A]/20 border-[#C4903A] text-[#C4903A]' : 'bg-transparent border-white/10 text-[#9E8E78]'}`}
                    >
                      {type.replace('scroll_threshold', 'scroll').replace('drawer_open', 'drawer')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Event Feed List */}
              <div className="flex-1 overflow-y-auto font-mono text-xs leading-relaxed space-y-2.5 pr-2 custom-scrollbar scroll-smooth">
                {filteredEvents.length === 0 ? (
                  <div className="text-[#9E8E78]/55 flex items-center justify-center h-full italic">
                    No matching interactions recorded in this window.
                  </div>
                ) : (
                  filteredEvents.map((event, idx) => {
                    const isClick = event.type === 'click';
                    const isDrawer = event.type === 'drawer_open';
                    const isScroll = event.type === 'scroll_threshold';
                    
                    let tagColor = 'bg-white/10 text-[#F5F2EA]';
                    if (isClick) tagColor = 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20';
                    if (isDrawer) tagColor = 'bg-[#C4903A]/10 text-[#C4903A] border border-[#C4903A]/20';
                    if (isScroll) tagColor = 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';

                    return (
                      <motion.div
                        key={event.timestamp + '-' + idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-start gap-4 border-b border-white/[0.03] pb-2 last:border-b-0"
                      >
                        <span className="text-[#9E8E78] shrink-0">{formatTime(event.timestamp)}</span>
                        <span className={`px-1.5 py-0.5 rounded text-[9px] uppercase tracking-wider font-bold shrink-0 ${tagColor}`}>
                          {event.type.replace('_', ' ')}
                        </span>
                        <span className="text-[#D8D1C2] break-words flex-1">{event.description}</span>
                      </motion.div>
                    );
                  })
                )}
                <div ref={tickerEndRef} />
              </div>
            </div>
          </div>

          {/* Card 2: Summary Stats (span 5) */}
          <div className="md:col-span-5 grid grid-cols-2 gap-4 h-[400px]">
            {/* Tile 1: Session Duration */}
            <div className="p-1 bg-white/5 border border-white/10 rounded-[1.2rem] flex">
              <div className="bg-[#0A0A0A] rounded-[calc(1.2rem-4px)] p-6 flex-1 flex flex-col justify-between border border-white/5">
                <Clock size={16} className="text-[#C4903A]" />
                <div>
                  <span className="font-mono text-[9px] text-[#9E8E78] uppercase tracking-wider">Session Time</span>
                  <div className="font-serif text-3xl font-light text-[#F5F2EA] mt-1">
                    {data.sessionDuration}s
                  </div>
                </div>
              </div>
            </div>

            {/* Tile 2: Total Interaction Count */}
            <div className="p-1 bg-white/5 border border-white/10 rounded-[1.2rem] flex">
              <div className="bg-[#0A0A0A] rounded-[calc(1.2rem-4px)] p-6 flex-1 flex flex-col justify-between border border-white/5">
                <Activity size={16} className="text-indigo-400" />
                <div>
                  <span className="font-mono text-[9px] text-[#9E8E78] uppercase tracking-wider">Total Actions</span>
                  <div className="font-serif text-3xl font-light text-[#F5F2EA] mt-1">
                    {data.events.length}
                  </div>
                </div>
              </div>
            </div>

            {/* Tile 3: Total Clicks */}
            <div className="p-1 bg-white/5 border border-white/10 rounded-[1.2rem] flex">
              <div className="bg-[#0A0A0A] rounded-[calc(1.2rem-4px)] p-6 flex-1 flex flex-col justify-between border border-white/5">
                <MousePointer size={16} className="text-emerald-400" />
                <div>
                  <span className="font-mono text-[9px] text-[#9E8E78] uppercase tracking-wider">Mouse Clicks</span>
                  <div className="font-serif text-3xl font-light text-[#F5F2EA] mt-1">
                    {data.clicks.length}
                  </div>
                </div>
              </div>
            </div>

            {/* Tile 4: Primary Focus Era */}
            <div className="p-1 bg-white/5 border border-white/10 rounded-[1.2rem] flex">
              <div className="bg-[#0A0A0A] rounded-[calc(1.2rem-4px)] p-6 flex-1 flex flex-col justify-between border border-white/5 overflow-hidden">
                <Flame size={16} className="text-purple-400" />
                <div>
                  <span className="font-mono text-[9px] text-[#9E8E78] uppercase tracking-wider">Focus Epoch</span>
                  <div className="font-serif text-lg font-light text-[#C4903A] truncate mt-1 uppercase">
                    {focusSection[1] > 0 ? focusSection[0] : 'Scanning...'}
                  </div>
                  <span className="font-mono text-[9px] text-[#9E8E78] block mt-0.5">
                    {focusSection[1]}s spent
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Era Dwell Time Bar Chart (span 6) */}
          <div className="md:col-span-6 p-1 bg-white/5 border border-white/10 rounded-[1.5rem] flex h-[350px]">
            <div className="bg-[#0D0B08] rounded-[calc(1.5rem-4px)] p-6 flex-1 flex flex-col justify-between border border-white/5">
              <div className="border-b border-white/10 pb-3 mb-4 flex justify-between items-center">
                <span className="font-mono text-xs text-[#F5F2EA] uppercase tracking-wider font-semibold">
                  Epoch Focus Dwell Time (sec)
                </span>
                <span className="font-mono text-[10px] text-[#C4903A]">
                  Total: {totalDwellTime}s
                </span>
              </div>

              {/* Horizontal Bar Chart */}
              <div className="flex-1 flex flex-col justify-between gap-2.5">
                {Object.entries(data.dwellTimes).map(([section, time]) => {
                  const pct = totalDwellTime > 0 ? (time / totalDwellTime) * 100 : 0;
                  return (
                    <div key={section} className="flex items-center gap-4 text-xs font-mono">
                      {/* Section label */}
                      <span className="w-24 text-[#9E8E78] uppercase text-[9.5px] truncate">{section}</span>
                      
                      {/* Bar wrapper */}
                      <div className="flex-1 h-3.5 bg-white/[0.03] border border-white/5 rounded-full overflow-hidden relative">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                          className="h-full bg-gradient-to-r from-[#C4903A]/70 to-[#C4903A] rounded-full shadow-[0_0_12px_rgba(196,144,58,0.2)]"
                        />
                      </div>
                      
                      {/* Time text */}
                      <span className="w-10 text-right text-[#F5F2EA] text-[10px] font-bold">{time}s</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Card 4: Funnel Conversion Drop-off (span 6) */}
          <div className="md:col-span-6 p-1 bg-white/5 border border-white/10 rounded-[1.5rem] flex h-[350px]">
            <div className="bg-[#0D0B08] rounded-[calc(1.5rem-4px)] p-6 flex-1 flex flex-col justify-between border border-white/5">
              <div className="border-b border-white/10 pb-3 mb-4 flex justify-between items-center">
                <span className="font-mono text-xs text-[#F5F2EA] uppercase tracking-wider font-semibold">
                  Chronology Descent Funnel
                </span>
                <span className="font-mono text-[10px] text-[#C4903A]">
                  Completion Depth: {data.scrollDepth}%
                </span>
              </div>

              {/* Funnel SVG mockup layout */}
              <div className="flex-1 flex items-center justify-center relative py-2">
                <svg viewBox="0 0 400 180" className="w-full h-full">
                  {/* Outer funnel boundary */}
                  <polygon points="40,20 360,20 280,160 120,160" className="fill-none stroke-white/5 stroke-[0.5]" />
                  
                  {/* Dynamic Funnel Segments */}
                  {funnelStages.map((stage, idx) => {
                    // Coordinates logic for funnel boxes
                    const topY = 20 + idx * 17.5;
                    const botY = topY + 14;
                    
                    // Width values linearly mapping down the funnel
                    const wTopLeft = 40 + idx * 10;
                    const wTopRight = 360 - idx * 10;
                    
                    const wBotLeft = 40 + (idx + 1) * 10;
                    const wBotRight = 360 - (idx + 1) * 10;

                    const active = data.scrollDepth >= stage.depth;

                    return (
                      <g key={stage.label} className="group/funnel">
                        <polygon
                          points={`${wTopLeft},${topY} ${wTopRight},${topY} ${wBotRight},${botY} ${wBotLeft},${botY}`}
                          className={`transition-all duration-500 stroke-black/40 stroke-[0.5] ${
                            active
                              ? 'fill-[#C4903A]/25 hover:fill-[#C4903A]/45 cursor-help'
                              : 'fill-white/[0.02] hover:fill-white/[0.05]'
                          }`}
                        />
                        {/* Stage text overlay */}
                        <text
                          x="200"
                          y={topY + 10}
                          textAnchor="middle"
                          className={`font-mono text-[8.5px] font-bold tracking-wider select-none ${
                            active ? 'fill-[#F5F2EA]' : 'fill-[#9E8E78]/30'
                          }`}
                        >
                          {stage.label.toUpperCase()} {active ? '• 100%' : '• 0%'}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              <span className="font-mono text-[9px] text-[#9E8E78]/60 text-center uppercase">
                Stage progression triggers as user scrolls and intersects deep geologic boundaries.
              </span>
            </div>
          </div>

          {/* Card 5: Scroll Depth radial gauge (span 4) */}
          <div className="md:col-span-4 p-1 bg-white/5 border border-white/10 rounded-[1.5rem] flex h-[360px]">
            <div className="bg-[#0D0B08] rounded-[calc(1.5rem-4px)] p-6 flex-1 flex flex-col justify-between items-stretch border border-white/5">
              <div className="border-b border-white/10 pb-3 mb-2 flex justify-between items-center">
                <span className="font-mono text-xs text-[#F5F2EA] uppercase tracking-wider font-semibold">
                  Max Scroll Depth
                </span>
                <Layers size={14} className="text-emerald-400" />
              </div>

              {/* Radial Progress Ring */}
              <div className="flex-1 flex items-center justify-center relative">
                {/* SVG circular track */}
                <svg className="w-40 h-40 transform -rotate-90">
                  <circle
                    cx="80"
                    cy="80"
                    r="60"
                    className="stroke-white/[0.03] fill-none"
                    strokeWidth="12"
                  />
                  <motion.circle
                    cx="80"
                    cy="80"
                    r="60"
                    className="stroke-[#C4903A] fill-none"
                    strokeWidth="12"
                    strokeDasharray={2 * Math.PI * 60}
                    initial={{ strokeDashoffset: 2 * Math.PI * 60 }}
                    animate={{ strokeDashoffset: 2 * Math.PI * 60 * (1 - data.scrollDepth / 100) }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-serif text-4xl font-light text-[#F5F2EA]">{data.scrollDepth}%</span>
                  <span className="font-mono text-[9px] text-[#9E8E78] uppercase tracking-widest mt-1">Descended</span>
                </div>
              </div>

              <div className="font-mono text-[9px] text-[#9E8E78]/60 text-center uppercase">
                Geological spine traversal index.
              </div>
            </div>
          </div>

          {/* Card 6: Spatial Mouse Click Heatmap (span 8) */}
          <div className="md:col-span-8 p-1 bg-white/5 border border-white/10 rounded-[1.5rem] flex h-[360px]">
            <div className="bg-[#0D0B08] rounded-[calc(1.5rem-4px)] p-6 flex-1 flex flex-col justify-between border border-white/5 overflow-hidden">
              <div className="border-b border-white/10 pb-3 mb-4 flex justify-between items-center">
                <span className="font-mono text-xs text-[#F5F2EA] uppercase tracking-wider font-semibold">
                  Spatial Click Heatmap Canvas
                </span>
                <span className="font-mono text-[9px] text-[#9E8E78] uppercase">
                  Click mockup to simulate event logging
                </span>
              </div>

              {/* Heatmap Canvas container mockup */}
              <div 
                onClick={handleMapClick}
                className="flex-1 bg-black/40 border border-white/5 rounded-lg relative overflow-hidden flex items-stretch select-none cursor-crosshair group/map shadow-inner"
              >
                {/* Horizontal sections markings representing the timeline */}
                <div className="absolute inset-0 flex divide-x divide-white/[0.03] font-mono text-[8px] text-[#9E8E78]/35 uppercase">
                  {stages.map((st) => (
                    <div key={st.id} className="flex-1 p-2 pt-4 flex flex-col justify-between">
                      <span>{st.num}</span>
                      <span className="rotate-90 origin-left translate-x-1 translate-y-6 text-[7px] tracking-widest whitespace-nowrap">{st.name}</span>
                    </div>
                  ))}
                </div>

                {/* Plot Click coordinates as glowing orange nodes */}
                {data.clicks.map((click, idx) => (
                  <div
                    key={click.timestamp + '-' + idx}
                    onMouseEnter={() => setHoveredClick(click)}
                    onMouseLeave={() => setHoveredClick(null)}
                    style={{
                      left: `${click.x}%`,
                      top: `${click.y}%`,
                    }}
                    className="absolute w-2 h-2 rounded-full bg-[#C4903A] border border-white/20 transform -translate-x-1/2 -translate-y-1/2 shadow-[0_0_8px_#C4903A] cursor-pointer hover:scale-150 active:scale-100 transition-transform duration-200 z-20"
                  />
                ))}

                {/* Tooltip popup */}
                <AnimatePresence>
                  {hoveredClick && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      style={{
                        left: `${hoveredClick.x}%`,
                        top: `${hoveredClick.y - 12}%`,
                      }}
                      className="absolute transform -translate-x-1/2 -translate-y-full bg-[#0D0B08] border border-[#C4903A]/40 p-2.5 rounded shadow-2xl font-mono text-[9px] text-[#C4903A] z-30 pointer-events-none whitespace-nowrap"
                    >
                      <div className="font-bold text-white mb-0.5">{hoveredClick.label}</div>
                      <div>POS: [{hoveredClick.x.toFixed(0)}%, {hoveredClick.y.toFixed(0)}%]</div>
                      <div className="text-[8px] text-[#9E8E78] mt-1">{formatTime(hoveredClick.timestamp)}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex justify-between items-center mt-3 font-mono text-[9px] text-[#9E8E78]/60 uppercase">
                <span>Viewport width (0% - 100%)</span>
                <span>Active nodes: {data.clicks.length} points plotted</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
