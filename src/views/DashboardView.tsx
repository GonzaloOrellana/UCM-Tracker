import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMCU } from '../context/MCUContext';
import { NavView, MCUItem } from '../types/mcu';
import { ArrowUpRight, ChevronLeft, ChevronRight, Trophy, Sparkles, Play, ExternalLink } from 'lucide-react';

interface DashboardViewProps {
  onNavigate: (view: NavView) => void;
}

// Allowed specials for the Spotlight Hero Card
const ALLOWED_SPOTLIGHT_SPECIAL_IDS = new Set([
  'guardians-galaxy-holiday-special',
  'punisher-one-last-kill',
]);

export const DashboardView: React.FC<DashboardViewProps> = ({ onNavigate }) => {
  const {
    stats,
    settings,
    openDetailModal,
    availableItems,
    upcomingItems,
    watchedIds,
    items,
  } = useMCU();

  const scrollUpcomingRef = useRef<HTMLDivElement>(null);

  // Spotlight Filter Mode: 'all' (Todas) vs 'main' (Trama Principal: Esenciales + Recomendadas)
  const [spotlightFilter, setSpotlightFilter] = useState<'all' | 'main'>(() => {
    try {
      const saved = localStorage.getItem('mcu_spotlight_filter_mode');
      if (saved === 'all' || saved === 'main') return saved;
    } catch {}
    return 'all';
  });

  // Index of current item in the spotlight list
  const [spotlightIndex, setSpotlightIndex] = useState(0);

  // Persist spotlight filter mode in localStorage
  useEffect(() => {
    try {
      localStorage.setItem('mcu_spotlight_filter_mode', spotlightFilter);
    } catch {}
  }, [spotlightFilter]);

  // Full list of unwatched productions sorted chronologically, filtered by spotlight mode
  const spotlightList = useMemo<MCUItem[]>(() => {
    const unwatched = availableItems.filter((item) => {
      if (watchedIds.has(item.id)) return false;
      if (item.tipo === 'special' && !ALLOWED_SPOTLIGHT_SPECIAL_IDS.has(item.id)) {
        return false;
      }
      if (spotlightFilter === 'main') {
        return item.prioridad === 'esencial' || item.prioridad === 'recomendada';
      }
      return true;
    });
    return unwatched.sort((a, b) => a.ordenCronologico - b.ordenCronologico);
  }, [availableItems, watchedIds, spotlightFilter]);

  // Ensure spotlightIndex stays valid when list changes
  useEffect(() => {
    if (spotlightIndex >= spotlightList.length && spotlightList.length > 0) {
      setSpotlightIndex(spotlightList.length - 1);
    }
  }, [spotlightList.length, spotlightIndex]);

  // Handler for switching filter mode and resetting index
  const handleFilterChange = (mode: 'all' | 'main') => {
    setSpotlightFilter(mode);
    setSpotlightIndex(0);
  };

  // Current item being displayed in the Spotlight Card
  const currentSpotlightItem = spotlightList[spotlightIndex] || null;


  // Helper for scroll navigation
  const scrollContainer = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = direction === 'left' ? -ref.current.clientWidth : ref.current.clientWidth;
      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Helper to format countdown label
  const getCountdownLabel = (dateStr: string) => {
    if (!dateStr) return 'Próximamente';
    const target = new Date(dateStr + 'T00:00:00');
    const now = new Date();
    const diff = target.getTime() - now.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

    if (isNaN(days)) return 'Próximamente';
    if (days <= 0) return 'Disponible';
    if (days === 1) return 'Mañana';
    if (days <= 45) return `En ${days} días`;

    const parts = dateStr.split('-');
    if (parts.length >= 2) {
      const monthsMap = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
      const monthIdx = parseInt(parts[1], 10) - 1;
      const monthName = monthsMap[monthIdx] || parts[1];
      return `${monthName} ${parts[0]}`;
    }
    return dateStr;
  };

  // Helper for Continuous Laser Energy Trench with exact percentage badge
  const renderEnergyBeam = (
    watched: number,
    total: number,
    colorTheme: {
      gradient: string;
      glow: string;
      text: string;
    }
  ) => {
    const pct = total > 0 ? Math.round((watched / total) * 100) : 0;

    return (
      <div className="flex flex-col items-end gap-0.5 sm:gap-1 w-20 sm:w-22 xl:w-28 shrink-0">
        {/* Top Metric Header: Status / Percent */}
        <div className="flex items-center justify-between w-full text-[9px] sm:text-[10px] xl:text-[11px] font-label font-bold tracking-wider leading-none">
          <span className="text-[8.5px] sm:text-[9.5px] text-zinc-400 uppercase">
            {pct === 100 ? 'COMPLETO' : 'PROGRESO'}
          </span>
          <span className={`text-[10.5px] sm:text-[11px] xl:text-xs font-mono font-bold ${colorTheme.text}`}>
            {pct}%
          </span>
        </div>

        {/* Continuous Sunken Laser Energy Trench */}
        <div className="w-full h-1.5 sm:h-2 xl:h-2.5 rounded-full neu-energy-trench p-[1px] relative overflow-hidden">
          <div
            className={`h-full rounded-full ${colorTheme.gradient} neu-energy-beam ${colorTheme.glow} relative flex items-center justify-end`}
            style={{ width: `${Math.max(pct, pct > 0 ? 5 : 0)}%` }}
          >
            {/* Pulsing Laser Edge Spark */}
            {pct > 0 && pct < 100 && (
              <span className="absolute right-0 top-0 bottom-0 w-1.5 rounded-full bg-white shadow-[0_0_6px_#FFFFFF,0_0_10px_currentColor] opacity-95" />
            )}
          </div>
        </div>
      </div>
    );
  };


  // Phase percentages
  const p1 = stats.phases['Fase 1']?.percentage || 0;
  const p2 = stats.phases['Fase 2']?.percentage || 0;
  const p3 = stats.phases['Fase 3']?.percentage || 0;
  const p4 = stats.phases['Fase 4']?.percentage || 0;
  const p5 = stats.phases['Fase 5']?.percentage || 0;
  const p6 = stats.phases['Fase 6']?.percentage || 0;

  // SVG Node Helper for Roadmap with Tactile Convex Lens Diode Styling
  const renderRoadmapNode = (
    cx: number,
    cy: number,
    pct: number,
    color: string,
    labelBottom: string,
    filterId: string
  ) => {
    const r = 17;
    const circ = 2 * Math.PI * r; // ~106.8
    const offset = circ - (circ * pct) / 100;

    return (
      <g key={labelBottom} className="cursor-default group/node">
        {/* Outer Beveled Metallic Socket Ring */}
        <circle cx={cx} cy={cy} r={r + 3.5} fill="#080911" stroke="#25283E" strokeWidth="1.5" />
        <circle cx={cx} cy={cy} r={r} fill="#141625" stroke="#1D2033" strokeWidth="1" />

        {/* Inner Core Lens with Convex Reflection */}
        <circle cx={cx} cy={cy} r={r - 3.5} fill="url(#node-lens-gradient)" stroke="rgba(255,255,255,0.14)" strokeWidth="0.5" />

        {/* Specular Micro Reflection Spot */}
        <circle cx={cx - 4.5} cy={cy - 4.5} r="1.5" fill="rgba(255,255,255,0.4)" />

        {/* Progress Arc with Glowing Emission */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          filter={`url(#${filterId})`}
          transform={`rotate(-90 ${cx} ${cy})`}
        />

        {/* Percentage Number in Center */}
        <text
          x={cx}
          y={cy + 3.5}
          textAnchor="middle"
          fill="#FFFFFF"
          fontSize={pct >= 100 ? "9.5" : "10.5"}
          fontWeight="700"
          fontFamily="Space Grotesk, sans-serif"
        >
          {pct}%
        </text>

        {/* Label Bottom */}
        <text
          x={cx}
          y={cy + 33}
          textAnchor="middle"
          fill="#A1A1AA"
          fontSize="11"
          fontWeight="600"
          fontFamily="Space Grotesk, sans-serif"
        >
          {labelBottom}
        </text>
      </g>
    );
  };

  return (
    <div className="h-full flex-1 min-h-0 flex flex-col justify-between gap-2.5 lg:gap-3 xl:gap-3.5 animate-fade-in relative pb-10 lg:pb-0 select-none">

      {/* ─────────────────────────────────────────────────────────────
          ROW 1: TOP BENTO HERO (3 EQUAL COLUMNS: MASTER STATUS + SPOTLIGHT HERO + DOOMSDAY)
          ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-2.5 lg:gap-3 xl:gap-3.5 shrink-0 lg:h-[35%] xl:h-[37%] min-h-0">

        {/* Card 1: Master Status (lg:col-span-4) */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.3, 1] }}
          className="lg:col-span-4 flex flex-col h-full"
        >
          <div className="relative tactile-bento-card rounded-2xl sm:rounded-3xl p-5 sm:p-5 xl:p-6 flex flex-col justify-between h-full overflow-hidden min-h-[165px] sm:min-h-0">

            {/* Glowing Marvel Ambient Orbs */}
            <div className="absolute -top-10 -right-10 w-36 h-36 bg-red-600/12 rounded-full blur-2xl pointer-events-none z-0" />
            <div className="absolute -bottom-8 -left-8 w-28 h-28 bg-rose-500/8 rounded-full blur-xl pointer-events-none z-0" />

            {/* Header: Title */}
            <div className="relative z-10 pb-1.5 sm:pb-1">
              <h1 className="font-display text-xl sm:text-2xl xl:text-3xl font-bold tracking-tight text-white leading-tight">
                Hola, {settings.userName}
              </h1>
            </div>

            {/* Main Stats Row: Big Impact Figures & Clean Columns */}
            <div className="relative z-10 my-auto py-2 sm:py-2 flex items-center justify-between gap-3 sm:gap-3 xl:gap-4">
              
              {/* Left Main Percentage Display */}
              <div className="flex items-baseline shrink-0">
                <span className="font-display text-4xl sm:text-5xl xl:text-6xl font-extrabold text-white tracking-tight leading-none drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                  {stats.percentage}%
                </span>
              </div>

              {/* Vertical Separator */}
              <div className="w-[1px] h-11 sm:h-10 xl:h-12 bg-gradient-to-b from-transparent via-white/20 to-transparent shrink-0" />

              {/* 3 Metric Columns */}
              <div className="grid grid-cols-3 gap-2 sm:gap-2 xl:gap-3.5 w-full flex-1 text-center">
                
                {/* Col 1: Total */}
                <div className="space-y-1 sm:space-y-1">
                  <span className="font-display text-lg sm:text-lg xl:text-2xl font-bold text-white tracking-tight leading-none block">
                    {stats.total}
                  </span>
                  <span className="font-label text-[10px] sm:text-[9.5px] xl:text-[10.5px] text-zinc-400 font-semibold uppercase tracking-wider block truncate">
                    Total
                  </span>
                </div>

                {/* Col 2: Vistas */}
                <div className="space-y-1 sm:space-y-1">
                  <span className="font-display text-lg sm:text-lg xl:text-2xl font-bold text-emerald-400 tracking-tight leading-none block drop-shadow-[0_0_12px_rgba(52,211,153,0.35)]">
                    {stats.watched}
                  </span>
                  <span className="font-label text-[10px] sm:text-[9.5px] xl:text-[10.5px] text-zinc-400 font-semibold uppercase tracking-wider block truncate">
                    Vistas
                  </span>
                </div>

                {/* Col 3: Pendientes */}
                <div className="space-y-1 sm:space-y-1">
                  <span className="font-display text-lg sm:text-lg xl:text-2xl font-bold text-amber-400 tracking-tight leading-none block drop-shadow-[0_0_12px_rgba(251,191,36,0.35)]">
                    {stats.total - stats.watched}
                  </span>
                  <span className="font-label text-[10px] sm:text-[9.5px] xl:text-[10.5px] text-zinc-400 font-semibold uppercase tracking-wider block truncate">
                    Faltan
                  </span>
                </div>

              </div>

            </div>

            {/* Bottom: Continuous Laser Energy Trench */}
            <div className="relative z-10 pt-2 sm:pt-1">
              <div className="w-full h-2 sm:h-2 xl:h-2.5 rounded-full neu-energy-trench p-[1px] relative overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-red-700 via-rose-500 to-red-400 neu-energy-beam shadow-[0_0_14px_rgba(225,29,72,0.7)] relative flex items-center justify-end"
                  style={{ width: `${Math.max(stats.percentage, stats.percentage > 0 ? 4 : 0)}%` }}
                >
                  {stats.percentage > 0 && stats.percentage < 100 && (
                    <span className="absolute right-0 top-0 bottom-0 w-2 rounded-full bg-white shadow-[0_0_8px_#FFFFFF,0_0_12px_#E62429] opacity-95" />
                  )}
                </div>
              </div>
            </div>

          </div>
        </motion.div>

        {/* Card 2: Hero Spotlight: Tu Próxima Misión (lg:col-span-4) */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 1, 0.3, 1] }}
          className="lg:col-span-4 flex flex-col h-full"
        >
          {currentSpotlightItem ? (
            <div
              onClick={() => openDetailModal(currentSpotlightItem)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openDetailModal(currentSpotlightItem);
                }
              }}
              className="relative tactile-bento-card rounded-2xl sm:rounded-3xl p-3.5 sm:p-4.5 xl:p-5 flex flex-col justify-between h-[180px] sm:h-[195px] lg:h-full overflow-hidden group/spotlight cursor-pointer hover:border-white/30 hover:shadow-[0_16px_40px_-8px_rgba(0,0,0,0.8),0_0_24px_rgba(255,255,255,0.06)] transition-all duration-300"
            >

              {/* Vibrant Background Scene with Smooth Animated Crossfade */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSpotlightItem.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="absolute inset-0 z-0 pointer-events-none"
                >
                  <img
                    src={currentSpotlightItem.urlPoster}
                    alt={currentSpotlightItem.titulo}
                    className="w-full h-full object-cover object-center group-hover/spotlight:scale-105 transition-transform duration-700 ease-out opacity-80 group-hover/spotlight:opacity-95"
                  />
                  {/* Directional Soft Scrim to Guarantee Pristine Text Contrast */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#090A12]/95 via-[#090A12]/65 to-black/25" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090A12]/80 via-transparent to-black/20" />
                </motion.div>
              </AnimatePresence>

              {/* Top Header: Section / Priority Badge */}
              <div className="relative z-10 flex items-center gap-2 shrink-0">
                <span className="font-label text-[9px] sm:text-[10.5px] font-semibold text-zinc-300 shrink-0 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                  Siguiente en tu lista:
                </span>
                {currentSpotlightItem.prioridad && (
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[8px] sm:text-[9px] font-sans font-bold uppercase tracking-wider tactile-priority-pill shrink-0 ${
                      currentSpotlightItem.prioridad === 'esencial'
                        ? 'tactile-priority-esencial'
                        : currentSpotlightItem.prioridad === 'recomendada'
                        ? 'tactile-priority-recomendada'
                        : currentSpotlightItem.prioridad === 'complementaria'
                        ? 'tactile-priority-complementaria'
                        : 'tactile-priority-opcional'
                    }`}
                  >
                    <span className="text-[8.5px] leading-none">
                      {currentSpotlightItem.prioridad === 'esencial' ? '🔥' : currentSpotlightItem.prioridad === 'recomendada' ? '🟢' : currentSpotlightItem.prioridad === 'complementaria' ? '🟡' : '⚪'}
                    </span>
                    <span>
                      {currentSpotlightItem.prioridad === 'esencial' ? 'Esencial' : currentSpotlightItem.prioridad === 'recomendada' ? 'Recomendada' : currentSpotlightItem.prioridad === 'complementaria' ? 'Complementaria' : 'Opcional'}
                    </span>
                  </span>
                )}
              </div>

              {/* Spotlight Content: Animated Title */}
              <div className="relative z-10 my-auto py-1 sm:py-2 pointer-events-none">
                <AnimatePresence mode="wait">
                  <motion.h2
                    key={currentSpotlightItem.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                    className="font-display text-sm sm:text-lg xl:text-2xl font-bold tracking-tight text-white leading-tight line-clamp-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] select-none"
                  >
                    {currentSpotlightItem.titulo}
                  </motion.h2>
                </AnimatePresence>
              </div>

              {/* Spotlight Footer: Official Watch Link (Left) + Mode Toggle & Chevrons (Right) */}
              <div className="relative z-10 flex items-center justify-between gap-1.5 sm:gap-2 pt-1 flex-wrap sm:flex-nowrap">
                {(() => {
                  const watchUrl = currentSpotlightItem.urlOficial || 'https://www.disneyplus.com';
                  const isMercadoPlay = Boolean(watchUrl.includes('mercadolibre'));
                  const isPrimeVideo = Boolean(watchUrl.includes('primevideo'));
                  const isDisney = Boolean(watchUrl.includes('disneyplus'));

                  const buttonClasses = isMercadoPlay
                    ? 'bg-[#FFE600] hover:bg-[#F2DC00] text-zinc-950 shadow-[0_2px_8px_rgba(255,230,0,0.35)]'
                    : isPrimeVideo
                    ? 'bg-[#00A8E1] hover:bg-[#0092C5] text-white shadow-[0_2px_8px_rgba(0,168,225,0.35)]'
                    : isDisney
                    ? 'bg-[#0063e5] hover:bg-[#0051bf] text-white shadow-[0_2px_8px_rgba(0,99,229,0.35)]'
                    : 'bg-zinc-900 hover:bg-black text-white shadow-[0_2px_8px_rgba(0,0,0,0.25)]';

                  const tooltip = isMercadoPlay
                    ? 'Ver en Mercado Play (Sitio oficial)'
                    : isPrimeVideo
                    ? 'Ver en Prime Video (Sitio oficial)'
                    : isDisney
                    ? 'Ver en Disney+ (Sitio oficial)'
                    : 'Ver en sitio oficial';

                  return (
                    <a
                      href={watchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      title={tooltip}
                      className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-[11px] sm:text-xs font-semibold tracking-wide transition-all duration-200 hover:scale-[1.03] active:scale-95 cursor-pointer select-none group/watch shrink-0 ${buttonClasses}`}
                    >
                      <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current transition-transform group-hover/watch:scale-110" />
                      <span>Ver ahora</span>
                      {isMercadoPlay ? (
                        <img
                          src="/logos-plataformas/mercado-libre-logo.png"
                          alt="Mercado Libre"
                          className="w-3.5 h-3.5 sm:w-4 sm:h-4 object-contain shrink-0 transition-transform group-hover/watch:scale-110"
                        />
                      ) : isPrimeVideo ? (
                        <img
                          src="/logos-plataformas/amazon-prime-video.png"
                          alt="Prime Video"
                          className="w-3.5 h-3.5 sm:w-4 sm:h-4 object-contain rounded-xs shrink-0 shadow-2xs transition-transform group-hover/watch:scale-110"
                        />
                      ) : isDisney ? (
                        <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full overflow-hidden shrink-0 flex items-center justify-center transition-transform group-hover/watch:scale-110 shadow-2xs">
                          <img
                            src="/logos-plataformas/Disney_plus_icon.png"
                            alt="Disney+"
                            className="w-full h-full object-cover scale-110"
                          />
                        </span>
                      ) : (
                        <ExternalLink className="w-3 h-3 text-white/70 group-hover/watch:text-white transition-colors" />
                      )}
                    </a>
                  );
                })()}

                {/* Right Controls: Mode Toggle Pill + Navigation Chevrons */}
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-1.5 sm:gap-2 shrink-0"
                >
                  {/* Segmented Mode Selector: Todas vs Trama Principal */}
                  <div className="flex items-center bg-black/60 border border-white/15 rounded-full p-0.5 sm:p-1 shadow-inner backdrop-blur-md">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFilterChange('all');
                      }}
                      className={`px-2.5 py-1 sm:px-3 sm:py-1 rounded-full text-[9.5px] sm:text-[10.5px] xl:text-[11px] font-semibold tracking-wide transition-all cursor-pointer ${
                        spotlightFilter === 'all'
                          ? 'bg-white/25 text-white shadow-xs font-bold border-t border-white/40'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                      title="Mostrar todas las producciones pendientes en orden cronológico"
                    >
                      Todas
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFilterChange('main');
                      }}
                      className={`px-2.5 py-1 sm:px-3 sm:py-1 rounded-full text-[9.5px] sm:text-[10.5px] xl:text-[11px] font-semibold tracking-wide transition-all cursor-pointer flex items-center gap-1 sm:gap-1.5 ${
                        spotlightFilter === 'main'
                          ? 'bg-gradient-to-r from-red-600/90 to-amber-600/90 text-white shadow-xs font-bold border-t border-white/40'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                      title="Filtrar solo producciones Esenciales y Recomendadas (Trama Principal)"
                    >
                      <span className="text-[10px] sm:text-[11px]">🔥</span>
                      <span className="hidden md:inline">Trama Principal</span>
                      <span className="md:hidden">Principal</span>
                    </button>
                  </div>

                  {/* Chevrons Navigation with Counter */}
                  {spotlightList.length > 1 && (
                    <div className="flex items-center gap-1 sm:gap-1.5">
                      <span className="text-[9.5px] sm:text-[10.5px] xl:text-[11px] font-mono font-bold text-zinc-300 ml-0.5 select-none">
                        {spotlightIndex + 1}/{spotlightList.length}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSpotlightIndex((prev) => Math.max(0, prev - 1));
                        }}
                        disabled={spotlightIndex === 0}
                        className="w-6 h-6 sm:w-6.5 sm:h-6.5 xl:w-7 xl:h-7 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white flex items-center justify-center disabled:opacity-25 disabled:cursor-not-allowed cursor-pointer border border-white/10 transition-all shadow-xs"
                        title="Producción anterior"
                      >
                        <ChevronLeft className="w-3.5 h-3.5 xl:w-4 xl:h-4 stroke-[2.5]" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSpotlightIndex((prev) => Math.min(spotlightList.length - 1, prev + 1));
                        }}
                        disabled={spotlightIndex >= spotlightList.length - 1}
                        className="w-6 h-6 sm:w-6.5 sm:h-6.5 xl:w-7 xl:h-7 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white flex items-center justify-center disabled:opacity-25 disabled:cursor-not-allowed cursor-pointer border border-white/10 transition-all shadow-xs"
                        title="Siguiente producción"
                      >
                        <ChevronRight className="w-3.5 h-3.5 xl:w-4 xl:h-4 stroke-[2.5]" />
                      </button>
                    </div>
                  )}
                </div>

              </div>

            </div>
          ) : spotlightFilter === 'main' && availableItems.some((item) => !watchedIds.has(item.id)) ? (
            <div className="tactile-bento-card rounded-2xl sm:rounded-3xl p-3.5 sm:p-4.5 xl:p-5 flex flex-col justify-between h-[180px] sm:h-[195px] lg:h-full text-center border-emerald-500/40">
              <div className="flex items-center justify-between gap-1.5 shrink-0">
                <span className="font-label text-[9px] sm:text-[10.5px] font-semibold text-emerald-300">
                  Trama Principal:
                </span>
                <button
                  onClick={() => handleFilterChange('all')}
                  className="px-2.5 py-1 rounded-full text-[9.5px] sm:text-[10.5px] font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-all cursor-pointer"
                >
                  Ver Todas
                </button>
              </div>
              <div className="flex flex-col items-center justify-center flex-1 py-1">
                <Sparkles className="w-7 h-7 text-emerald-400 mb-1 drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                <h3 className="font-display text-sm sm:text-base font-bold tracking-tight text-white">
                  ¡Trama Principal al Día!
                </h3>
                <p className="text-[9.5px] sm:text-[10px] text-zinc-300 mt-0.5 max-w-xs">
                  Has visto todas las producciones esenciales y recomendadas.
                </p>
              </div>
              <button
                onClick={() => handleFilterChange('all')}
                className="bg-emerald-600 hover:bg-emerald-500 active:translate-y-0.5 text-white font-label text-[10.5px] sm:text-xs font-bold py-1.5 px-4 rounded-full shadow-lg border-t border-white/30 transition-all cursor-pointer mx-auto"
              >
                Ver producciones complementarias →
              </button>
            </div>
          ) : (
            <div className="tactile-bento-card rounded-2xl sm:rounded-3xl p-3.5 sm:p-4.5 xl:p-5 flex flex-col justify-between h-[180px] sm:h-[195px] lg:h-full text-center border-amber-500/40">
              <div className="flex flex-col items-center justify-center flex-1 py-2">
                <Trophy className="w-8 h-8 text-amber-400 mb-1 drop-shadow-[0_0_10px_rgba(245,200,66,0.5)]" />
                <h3 className="font-display text-base sm:text-lg font-bold tracking-tight text-white">
                  ¡Multiverso al 100%!
                </h3>
                <p className="text-[10px] text-zinc-300 mt-0.5 max-w-xs">
                  Has completado todas las producciones disponibles.
                </p>
              </div>
              <button
                onClick={() => onNavigate('upcoming')}
                className="bg-[#C81D25] hover:bg-[#E62429] active:translate-y-0.5 text-white font-label text-xs font-bold py-1.5 px-4 rounded-full shadow-lg border-t border-white/30 transition-all cursor-pointer"
              >
                Ver próximos estrenos →
              </button>
            </div>
          )}
        </motion.div>

        {/* Card 3: Bento Card: Camino a Doomsday & Secret Wars (lg:col-span-4) */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 1, 0.3, 1] }}
          className="lg:col-span-4 flex flex-col h-full cursor-pointer group/doomsday"
          onClick={() => onNavigate('doomsday')}
        >
          <div className="relative tactile-bento-card rounded-2xl sm:rounded-3xl p-3.5 sm:p-4.5 xl:p-5 flex flex-col justify-between h-[180px] sm:h-[195px] lg:h-full overflow-hidden border-emerald-500/30 hover:border-emerald-400/60 hover:shadow-[0_0_28px_rgba(16,185,129,0.22)] transition-all duration-500 bg-gradient-to-br from-[#07130F]/90 via-[#0B0D18]/90 to-[#120817]/90">

            {/* Doctor Doom The Supreme Background Artwork */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-60 group-hover/doomsday:opacity-85 transition-all duration-500">
              <img
                src="https://images.hdqwalls.com/wallpapers/bthumb/doctor-doom-the-supreme-4k-l1.jpg"
                alt="Doctor Doom The Supreme"
                className="w-full h-full object-cover object-right group-hover/doomsday:scale-105 transition-transform duration-700 ease-out"
              />
              {/* Directional Scrim to guarantee pristine text contrast */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#07130F]/95 via-[#07130F]/80 to-[#07130F]/30" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06100D]/90 via-transparent to-black/25" />
            </div>

            {/* Glowing Accent Orbs */}
            <div className="absolute -top-10 -right-10 w-36 h-36 bg-emerald-500/15 rounded-full blur-2xl group-hover/doomsday:bg-emerald-400/25 transition-all duration-700 pointer-events-none z-0" />
            <div className="absolute -bottom-8 -left-8 w-28 h-28 bg-amber-500/10 rounded-full blur-xl pointer-events-none z-0" />

            {/* Top Header: Clean Minimalist Badge & Date */}
            <div className="relative z-10 flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[8.5px] sm:text-[9.5px] font-mono font-medium tracking-wider uppercase bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                <Sparkles className="w-2.5 h-2.5 text-emerald-400" />
                <span>Evento Multiversal</span>
              </span>

              <span className="text-[9px] sm:text-[10px] font-mono text-zinc-400/80 font-medium tracking-wider">
                2026 — 2027
              </span>
            </div>

            {/* Body / Title & Description (Clean & Spacious) */}
            <div className="relative z-10 my-auto py-1 sm:py-2">
              <h3 className="font-display text-sm sm:text-base xl:text-2xl font-bold tracking-tight text-white leading-tight group-hover/doomsday:text-emerald-300 transition-colors drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] line-clamp-2">
                Camino a Doomsday & Secret Wars
              </h3>
              <p className="text-[11px] xl:text-[12px] text-zinc-300/80 mt-1 sm:mt-1.5 leading-relaxed font-sans max-w-sm line-clamp-2">
                Incursiones, el ascenso de Victor Von Doom y la colisión total hacia Battleworld.
              </p>
            </div>

            {/* Footer Action: Tactile Glass CTA aligned with row baseline */}
            <div className="relative z-10 flex items-center justify-start pt-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate('doomsday');
                }}
                className="tactile-btn-glass text-white font-label text-[10.5px] sm:text-[11px] xl:text-xs font-semibold px-3.5 sm:px-4 xl:px-4.5 py-1.5 xl:py-2 rounded-full flex items-center gap-1.5 cursor-pointer group-hover/doomsday:border-emerald-400/80 group-hover/doomsday:text-emerald-300 transition-all shadow-lg"
              >
                <span>Explorar evento</span>
                <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </div>

          </div>
        </motion.div>

      </div>

      {/* ─────────────────────────────────────────────────────────────
          ROW 2: MAIN GRID (3 SYMMETRICAL COLUMNS: ROADMAP + VAULT + UPCOMING)
          ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-2.5 lg:gap-3 xl:gap-3.5 flex-1 min-h-0">

        {/* Card 1: Saga Roadmap (lg:col-span-3) */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 1, 0.3, 1] }}
          className="md:col-span-1 lg:col-span-3 flex flex-col min-h-0 h-full"
        >
          <div className="tactile-bento-card rounded-2xl sm:rounded-3xl p-3 sm:p-3.5 xl:p-4.5 flex flex-col justify-between h-full min-h-0">

            {/* Header */}
            <div>
              <h3 className="font-display text-sm sm:text-base xl:text-xl font-bold tracking-tight text-white leading-none">
                Saga Roadmap
              </h3>
            </div>

            {/* Continuous SVG Circuit Diagram with Glow Defs */}
            <div className="my-auto py-0.5 flex-1 min-h-0 flex items-center justify-center overflow-hidden">
              <svg viewBox="0 0 320 250" className="w-full h-full max-h-[145px] sm:max-h-[195px] xl:max-h-[235px] object-contain select-none">
                <defs>
                  <radialGradient id="node-lens-gradient" cx="30%" cy="30%" r="70%">
                    <stop offset="0%" stopColor="#2D304A" />
                    <stop offset="50%" stopColor="#141626" />
                    <stop offset="100%" stopColor="#080911" />
                  </radialGradient>
                  <filter id="glow-blue" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="0" stdDeviation="1.5" floodColor="#00A8FF" floodOpacity="0.75" />
                  </filter>
                  <filter id="glow-red" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="0" stdDeviation="1.5" floodColor="#E62429" floodOpacity="0.75" />
                  </filter>
                  <filter id="glow-green" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="0" stdDeviation="1.5" floodColor="#10B981" floodOpacity="0.75" />
                  </filter>
                </defs>

                {/* Section 1 Title: The Infinity Saga */}
                <text
                  x="8"
                  y="20"
                  fill="#FFFFFF"
                  fontSize="13"
                  fontWeight="bold"
                  fontFamily="Space Grotesk, sans-serif"
                >
                  The Infinity Saga
                </text>

                {/* 1. Straight Blue Line from Phase 1 to Phase 2 */}
                <line x1="50" y1="62" x2="160" y2="62" stroke="#00A8FF" strokeWidth="2.5" strokeOpacity="0.85" />

                {/* 2. Straight Blue Line from Phase 2 to Phase 3 */}
                <line x1="160" y1="62" x2="270" y2="62" stroke="#00A8FF" strokeWidth="2.5" strokeOpacity="0.85" />

                {/* 3. Rectangular Pipeline Connecting Line (Marvel Red #E62429) from Phase 3 to Phase 4 */}
                <path
                  d="M 270 62 L 298 62 A 10 10 0 0 1 308 72 L 308 120 A 10 10 0 0 1 298 130 L 22 130 A 10 10 0 0 0 12 140 L 12 188 A 10 10 0 0 0 22 198 L 50 198"
                  stroke="#E62429"
                  strokeWidth="3"
                  strokeOpacity="0.85"
                  fill="none"
                />

                {/* Section 2 Title: The Multiverse Saga (placed under horizontal connecting line) */}
                <text
                  x="24"
                  y="154"
                  fill="#FFFFFF"
                  fontSize="13"
                  fontWeight="bold"
                  fontFamily="Space Grotesk, sans-serif"
                >
                  The Multiverse Saga
                </text>

                {/* 4. Straight Green Line from Phase 4 to Phase 5 */}
                <line x1="50" y1="198" x2="160" y2="198" stroke="#10B981" strokeWidth="2.5" strokeOpacity="0.85" />

                {/* 5. Straight Green Line from Phase 5 to Phase 6 */}
                <line x1="160" y1="198" x2="270" y2="198" stroke="#10B981" strokeWidth="2.5" strokeOpacity="0.85" />

                {/* Nodes Row 1 (Infinity Saga - Blue) */}
                {renderRoadmapNode(50, 62, p1, '#00A8FF', 'Fase 1', 'glow-blue')}
                {renderRoadmapNode(160, 62, p2, '#00A8FF', 'Fase 2', 'glow-blue')}
                {renderRoadmapNode(270, 62, p3, '#00A8FF', 'Fase 3', 'glow-blue')}

                {/* Nodes Row 2 (Multiverse Saga - Red & Green) */}
                {renderRoadmapNode(50, 198, p4, '#E62429', 'Fase 4', 'glow-red')}
                {renderRoadmapNode(160, 198, p5, '#10B981', 'Fase 5', 'glow-green')}
                {renderRoadmapNode(270, 198, p6, '#10B981', 'Fase 6', 'glow-green')}
              </svg>
            </div>

          </div>
        </motion.div>

        {/* Card 2: Infinity Vault (lg:col-span-3) */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.25, 1, 0.3, 1] }}
          className="md:col-span-1 lg:col-span-3 flex flex-col min-h-0 h-full"
        >
          <div className="tactile-bento-card rounded-2xl sm:rounded-3xl p-3 sm:p-3.5 xl:p-4.5 flex flex-col justify-between h-full min-h-0">
            {/* Header */}
            <div>
              <h3 className="font-display text-sm sm:text-base xl:text-xl font-bold tracking-tight text-white leading-none">
                Infinity Vault
              </h3>
            </div>

            {/* 3 Categories centered with rich tactile styling */}
            <div className="space-y-1.5 sm:space-y-2.5 xl:space-y-3.5 my-auto py-1 flex-1 flex flex-col justify-center min-h-0">
              {/* Películas */}
              <div
                onClick={() => onNavigate('movies')}
                className="flex items-center justify-between gap-1.5 p-1 -mx-1 rounded-xl hover:bg-white/[0.04] transition-colors cursor-pointer group/row"
                title="Ver Películas"
              >
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 xl:w-8 xl:h-8 rounded-full neu-gem-socket p-1 flex items-center justify-center shrink-0 relative">
                    <div className="absolute inset-1 rounded-full bg-red-500/20 blur-xs pointer-events-none group-hover/row:scale-110 transition-transform" />
                    <img
                      src="/gema-de-realidad.png"
                      alt="Películas"
                      className="w-full h-full object-contain relative z-10 drop-shadow-[0_3px_5px_rgba(0,0,0,0.8)] group-hover/row:scale-105 transition-transform"
                    />
                  </div>
                  <div>
                    <span className="font-bold text-white text-xs xl:text-sm block leading-tight group-hover/row:text-red-400 transition-colors">
                      Películas
                    </span>
                    <span className="text-[8.5px] sm:text-[9px] xl:text-[10px] text-zinc-400 font-medium">
                      {stats.movies.watched} / {stats.movies.total}
                    </span>
                  </div>
                </div>
                {renderEnergyBeam(stats.movies.watched, stats.movies.total, {
                  gradient: 'bg-gradient-to-r from-red-700 via-rose-500 to-red-400',
                  glow: 'shadow-[0_0_10px_rgba(225,29,72,0.6)]',
                  text: 'text-rose-400',
                })}
              </div>

              {/* Series */}
              <div
                onClick={() => onNavigate('series')}
                className="flex items-center justify-between gap-1.5 p-1 -mx-1 rounded-xl hover:bg-white/[0.04] transition-colors cursor-pointer group/row"
                title="Ver Series"
              >
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 xl:w-8 xl:h-8 rounded-full neu-gem-socket p-1 flex items-center justify-center shrink-0 relative">
                    <div className="absolute inset-1 rounded-full bg-amber-400/20 blur-xs pointer-events-none group-hover/row:scale-110 transition-transform" />
                    <img
                      src="/gema-de-la-mente.png"
                      alt="Series"
                      className="w-full h-full object-contain relative z-10 drop-shadow-[0_3px_5px_rgba(0,0,0,0.8)] group-hover/row:scale-105 transition-transform"
                    />
                  </div>
                  <div>
                    <span className="font-bold text-white text-xs xl:text-sm block leading-tight group-hover/row:text-amber-400 transition-colors">
                      Series
                    </span>
                    <span className="text-[8.5px] sm:text-[9px] xl:text-[10px] text-zinc-400 font-medium">
                      {stats.series.watched} / {stats.series.total}
                    </span>
                  </div>
                </div>
                {renderEnergyBeam(stats.series.watched, stats.series.total, {
                  gradient: 'bg-gradient-to-r from-amber-600 via-amber-400 to-yellow-300',
                  glow: 'shadow-[0_0_10px_rgba(245,158,11,0.6)]',
                  text: 'text-amber-400',
                })}
              </div>

              {/* Especiales */}
              <div
                onClick={() => onNavigate('specials')}
                className="flex items-center justify-between gap-1.5 p-1 -mx-1 rounded-xl hover:bg-white/[0.04] transition-colors cursor-pointer group/row"
                title="Ver Especiales"
              >
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 xl:w-8 xl:h-8 rounded-full neu-gem-socket p-1 flex items-center justify-center shrink-0 relative">
                    <div className="absolute inset-1 rounded-full bg-sky-400/20 blur-xs pointer-events-none group-hover/row:scale-110 transition-transform" />
                    <img
                      src="/gema-del-espacio.png"
                      alt="Especiales"
                      className="w-full h-full object-contain relative z-10 drop-shadow-[0_3px_5px_rgba(0,0,0,0.8)] group-hover/row:scale-105 transition-transform"
                    />
                  </div>
                  <div>
                    <span className="font-bold text-white text-xs xl:text-sm block leading-tight group-hover/row:text-sky-400 transition-colors">
                      Especiales
                    </span>
                    <span className="text-[8.5px] sm:text-[9px] xl:text-[10px] text-zinc-400 font-medium">
                      {stats.specials.watched} / {stats.specials.total}
                    </span>
                  </div>
                </div>
                {renderEnergyBeam(stats.specials.watched, stats.specials.total, {
                  gradient: 'bg-gradient-to-r from-blue-600 via-sky-400 to-cyan-300',
                  glow: 'shadow-[0_0_10px_rgba(14,165,233,0.6)]',
                  text: 'text-sky-400',
                })}
              </div>
            </div>

          </div>
        </motion.div>

        {/* Card 3: Próximos Estrenos del MCU (lg:col-span-6 - 50% de la fila en Desktop) */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.25, 1, 0.3, 1] }}
          className="md:col-span-1 lg:col-span-6 flex flex-col min-h-0 h-full"
        >
          <div className="tactile-bento-card rounded-2xl sm:rounded-3xl p-3 sm:p-3.5 xl:p-4.5 flex flex-col justify-between h-full min-h-0">

            <div className="flex items-center justify-between shrink-0">
              <h3 className="font-display text-sm sm:text-base xl:text-xl font-bold tracking-tight text-white leading-none">
                Próximos Estrenos
              </h3>

              {upcomingItems.length > 2 && (
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => scrollContainer(scrollUpcomingRef, 'left')}
                    className="w-5 h-5 xl:w-6 xl:h-6 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white flex items-center justify-center cursor-pointer border border-white/10"
                    title="Anterior"
                  >
                    <ChevronLeft className="w-3 h-3 xl:w-3.5 xl:h-3.5 stroke-[2.5]" />
                  </button>
                  <button
                    onClick={() => scrollContainer(scrollUpcomingRef, 'right')}
                    className="w-5 h-5 xl:w-6 xl:h-6 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white flex items-center justify-center cursor-pointer border border-white/10"
                    title="Siguiente"
                  >
                    <ChevronRight className="w-3 h-3 xl:w-3.5 xl:h-3.5 stroke-[2.5]" />
                  </button>
                </div>
              )}
            </div>

            {/* Posters Track with guaranteed fixed item dimensions preventing WebKit aspect-ratio stretching */}
            <div className="w-full flex items-center overflow-hidden my-auto py-1">
              <div
                ref={scrollUpcomingRef}
                className="flex items-center gap-2 sm:gap-2.5 xl:gap-3 overflow-x-auto no-scrollbar scroll-smooth w-full py-1 snap-x snap-mandatory"
              >
                {upcomingItems.map((item) => (
                  <div
                    key={item.id}
                    className="relative w-[96px] h-[144px] sm:w-[115px] sm:h-[172px] lg:w-[126px] lg:h-[189px] xl:w-[140px] xl:h-[210px] rounded-xl overflow-hidden bg-zinc-900 border border-white/15 shadow-lg shrink-0 cursor-default select-none tactile-poster-frame snap-start"
                    title={`Próximo estreno: ${item.titulo} (${getCountdownLabel(item.fechaLanzamiento)})`}
                  >
                    <img
                      src={item.urlPoster}
                      alt={item.titulo}
                      className="w-full h-full object-cover select-none pointer-events-none"
                      loading="lazy"
                    />

                    {/* Top Countdown Pill Badge directly on poster */}
                    <div className="absolute top-1 inset-x-1 bg-black/85 backdrop-blur-md text-white font-label text-[7px] sm:text-[7.5px] xl:text-[8px] font-bold uppercase tracking-wider py-0.5 px-0.5 rounded-full text-center border border-white/20 shadow truncate pointer-events-none z-10">
                      {getCountdownLabel(item.fechaLanzamiento)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </motion.div>

      </div>

    </div>
  );
};
