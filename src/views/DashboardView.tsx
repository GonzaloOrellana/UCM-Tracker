import React, { useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { useMCU } from '../context/MCUContext';
import { NavView, MCUItem } from '../types/mcu';
import { ArrowUpRight, Heart, ChevronLeft, ChevronRight, Trophy } from 'lucide-react';

interface DashboardViewProps {
  onNavigate: (view: NavView) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onNavigate }) => {
  const {
    stats,
    settings,
    openDetailModal,
    availableItems,
    upcomingItems,
    watchedIds,
    favoriteIds,
    toggleFavorite,
    items,
  } = useMCU();

  const scrollUpcomingRef = useRef<HTMLDivElement>(null);
  const scrollFavoritesRef = useRef<HTMLDivElement>(null);

  // Next unwatched production in chronological order for the Spotlight Hero Card
  const nextUnwatchedItem = useMemo<MCUItem | null>(() => {
    const unwatched = availableItems.filter((item) => !watchedIds.has(item.id));
    if (unwatched.length === 0) return null;
    return [...unwatched].sort((a, b) => a.ordenCronologico - b.ordenCronologico)[0];
  }, [availableItems, watchedIds]);

  // Favorite items
  const favoriteItems = useMemo(() => {
    return items.filter((item) => favoriteIds.has(item.id));
  }, [items, favoriteIds]);

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
      <div className="flex flex-col items-end gap-1.5 w-28 sm:w-40 shrink-0">
        {/* Top Metric Header: Status / Percent */}
        <div className="flex items-center justify-between w-full text-[11px] font-label font-bold tracking-wider leading-none">
          <span className="text-[9px] sm:text-[10px] text-zinc-400 uppercase">
            {pct === 100 ? 'COMPLETO' : 'PROGRESO'}
          </span>
          <span className={`text-[11px] sm:text-xs font-mono font-bold ${colorTheme.text}`}>
            {pct}%
          </span>
        </div>

        {/* Continuous Sunken Laser Energy Trench */}
        <div className="w-full h-2 sm:h-2.5 rounded-full neu-energy-trench p-[1px] relative overflow-hidden">
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

  const completedPhasesCount = ['Fase 1', 'Fase 2', 'Fase 3', 'Fase 4', 'Fase 5', 'Fase 6'].filter(
    (p) => (stats.phases[p]?.percentage || 0) === 100 && (stats.phases[p]?.total || 0) > 0
  ).length;

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
    <div className="space-y-5 sm:space-y-6 animate-fade-in relative pb-6 select-none">

      {/* ─────────────────────────────────────────────────────────────
          ROW 1: TOP BENTO HERO (MASTER STATUS + HERO SPOTLIGHT)
          ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

        {/* Card 1: Master Status (approx 58% - 7 cols on lg) */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col"
        >
          <div className="tactile-bento-card rounded-3xl p-6 sm:p-7 flex flex-col justify-between h-full">

            {/* Header: Title */}
            <div className="pb-2">
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl uppercase tracking-wider text-white leading-none">
                HOLA, {settings.userName}
              </h1>
            </div>

            {/* Main Stats Row: Big Impact Figures & Clean Columns */}
            <div className="my-auto py-4 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
              
              {/* Left Main Percentage Display */}
              <div className="flex items-baseline gap-2 shrink-0">
                <span className="font-display text-6xl sm:text-7xl lg:text-8xl text-white tracking-tight leading-none drop-shadow-md">
                  {stats.percentage}%
                </span>
                <span className="font-label font-bold text-[10px] text-zinc-400 uppercase tracking-widest">
                  GLOBAL
                </span>
              </div>

              {/* Vertical Separator on Desktop */}
              <div className="hidden md:block w-[1px] h-16 bg-gradient-to-b from-transparent via-white/20 to-transparent" />

              {/* 3 Minimalist Metric Columns */}
              <div className="grid grid-cols-3 gap-4 sm:gap-8 w-full md:w-auto flex-1 text-center sm:text-left">
                
                {/* Col 1: Total */}
                <div className="space-y-1">
                  <span className="font-display text-3xl sm:text-4xl lg:text-5xl text-white tracking-wide leading-none block">
                    {stats.total}
                  </span>
                  <span className="font-label text-[9px] sm:text-[10px] text-zinc-400 font-bold uppercase tracking-widest block">
                    Producciones
                  </span>
                </div>

                {/* Col 2: Vistas */}
                <div className="space-y-1">
                  <span className="font-display text-3xl sm:text-4xl lg:text-5xl text-emerald-400 tracking-wide leading-none block drop-shadow-[0_0_12px_rgba(52,211,153,0.3)]">
                    {stats.watched}
                  </span>
                  <span className="font-label text-[9px] sm:text-[10px] text-zinc-400 font-bold uppercase tracking-widest block">
                    Vistas
                  </span>
                </div>

                {/* Col 3: Pendientes */}
                <div className="space-y-1">
                  <span className="font-display text-3xl sm:text-4xl lg:text-5xl text-amber-400 tracking-wide leading-none block drop-shadow-[0_0_12px_rgba(251,191,36,0.3)]">
                    {stats.total - stats.watched}
                  </span>
                  <span className="font-label text-[9px] sm:text-[10px] text-zinc-400 font-bold uppercase tracking-widest block">
                    Pendientes
                  </span>
                </div>

              </div>

            </div>

            {/* Bottom: Continuous Laser Energy Trench */}
            <div className="pt-2">
              <div className="w-full h-3 rounded-full neu-energy-trench p-[1px] relative overflow-hidden">
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

        {/* Card 2: Hero Spotlight: Tu Próxima Misión (approx 42% - 5 cols on lg) */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 1, 0.3, 1] }}
          className="lg:col-span-5 flex flex-col"
        >
          {nextUnwatchedItem ? (
            <div className="relative tactile-bento-card rounded-3xl p-6 sm:p-7 flex flex-col justify-between h-full overflow-hidden group/spotlight">

              {/* Vibrant Background Scene with High Poster Visibility */}
              <div className="absolute inset-0 z-0 pointer-events-none opacity-80 group-hover/spotlight:opacity-95 transition-all duration-500">
                <img
                  src={nextUnwatchedItem.urlPoster}
                  alt={nextUnwatchedItem.titulo}
                  className="w-full h-full object-cover object-center group-hover/spotlight:scale-105 transition-transform duration-700 ease-out"
                />
                {/* Directional Soft Scrim to Guarantee Pristine Text Contrast */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#090A12]/95 via-[#090A12]/60 to-black/20" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090A12]/75 via-transparent to-black/20" />
              </div>

              {/* Spotlight Content */}
              <div className="relative z-10 my-auto py-2">
                <span className="font-label text-[10px] sm:text-[11px] font-bold text-zinc-200 uppercase tracking-widest block mb-1 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                  SIGUIENTE EN TU LISTA:
                </span>
                <h2
                  onClick={() => openDetailModal(nextUnwatchedItem)}
                  className="font-display text-2xl sm:text-3xl lg:text-[34px] uppercase tracking-wide text-white leading-tight cursor-pointer hover:text-marvel-red transition-colors line-clamp-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
                >
                  {nextUnwatchedItem.titulo}
                </h2>
              </div>

              {/* Spotlight Footer: Tactile Glass Action Button */}
              <div className="relative z-10 flex items-center justify-start pt-1">
                <button
                  onClick={() => openDetailModal(nextUnwatchedItem)}
                  className="tactile-btn-glass text-white font-label text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full flex items-center gap-1.5 cursor-pointer shadow-lg"
                >
                  <span>VER DETALLES</span>
                  <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>

            </div>
          ) : (
            <div className="tactile-bento-card rounded-3xl p-6 sm:p-7 flex flex-col justify-between h-full text-center border-amber-500/40">
              <div className="flex flex-col items-center justify-center flex-1 py-4">
                <Trophy className="w-10 h-10 text-amber-400 mb-2 drop-shadow-[0_0_10px_rgba(245,200,66,0.5)]" />
                <h3 className="font-display text-2xl sm:text-3xl uppercase tracking-wider text-white">
                  ¡MULTIVERSO AL 100%!
                </h3>
                <p className="text-xs text-zinc-300 mt-1 max-w-xs">
                  Has completado todas las producciones disponibles.
                </p>
              </div>
              <button
                onClick={() => onNavigate('upcoming')}
                className="bg-[#C81D25] hover:bg-[#E62429] active:translate-y-0.5 text-white font-label text-xs font-bold uppercase tracking-wider py-2.5 rounded-full shadow-lg border-t border-white/30 transition-all cursor-pointer"
              >
                VER PRÓXIMOS ESTRENOS →
              </button>
            </div>
          )}
        </motion.div>

      </div>

      {/* ─────────────────────────────────────────────────────────────
          ROW 2 & 3: MAIN GRID (LEFT: SAGA ROADMAP, RIGHT: VAULT + FAVS + UPCOMING)
          ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

        {/* Left Tall Card: Saga Roadmap (4 cols on lg / full height) */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 1, 0.3, 1] }}
          className="lg:col-span-4 flex flex-col"
        >
          <div className="tactile-bento-card rounded-3xl p-6 sm:p-7 flex flex-col justify-between h-full">

            {/* Header */}
            <div>
              <h3 className="font-display text-2xl sm:text-3xl uppercase tracking-wider text-white leading-none">
                Saga Roadmap
              </h3>
            </div>

            {/* Continuous SVG Circuit Diagram with Glow Defs */}
            <div className="my-auto py-2">
              <svg viewBox="0 0 320 250" className="w-full h-auto overflow-visible select-none">
                <defs>
                  <radialGradient id="node-lens-gradient" cx="30%" cy="30%" r="70%">
                    <stop offset="0%" stopColor="#2D304A" />
                    <stop offset="50%" stopColor="#141626" />
                    <stop offset="100%" stopColor="#080911" />
                  </radialGradient>
                  <filter id="glow-red" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="0" stdDeviation="1.5" floodColor="#E62429" floodOpacity="0.75" />
                  </filter>
                  <filter id="glow-blue" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="0" stdDeviation="1.5" floodColor="#00A8FF" floodOpacity="0.75" />
                  </filter>
                  <filter id="glow-yellow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="0" stdDeviation="1.5" floodColor="#F5C842" floodOpacity="0.75" />
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

                {/* 1. Straight Red Line from Phase 1 to Phase 2 */}
                <line x1="50" y1="62" x2="160" y2="62" stroke="#E62429" strokeWidth="2.5" strokeOpacity="0.85" />

                {/* 2. Straight Red Line from Phase 2 to Phase 3 */}
                <line x1="160" y1="62" x2="270" y2="62" stroke="#E62429" strokeWidth="2.5" strokeOpacity="0.85" />

                {/* 3. Rectangular Pipeline Connecting Line (Electric Blue #00A8FF) from Phase 3 to Phase 4 */}
                <path
                  d="M 270 62 L 298 62 A 10 10 0 0 1 308 72 L 308 120 A 10 10 0 0 1 298 130 L 22 130 A 10 10 0 0 0 12 140 L 12 188 A 10 10 0 0 0 22 198 L 50 198"
                  stroke="#00A8FF"
                  strokeWidth="3"
                  strokeOpacity="0.85"
                  fill="none"
                />

                {/* Section 2 Title: The Multiverse Saga (placed under horizontal blue line) */}
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

                {/* 4. Straight Yellow Line from Phase 4 to Phase 5 */}
                <line x1="50" y1="198" x2="160" y2="198" stroke="#F5C842" strokeWidth="2.5" strokeOpacity="0.85" />

                {/* 5. Straight Yellow Line from Phase 5 to Phase 6 */}
                <line x1="160" y1="198" x2="270" y2="198" stroke="#F5C842" strokeWidth="2.5" strokeOpacity="0.85" />

                {/* Nodes Row 1 (Infinity Saga) */}
                {renderRoadmapNode(50, 62, p1, '#E62429', 'Fase 1', 'glow-red')}
                {renderRoadmapNode(160, 62, p2, '#E62429', 'Fase 2', 'glow-red')}
                {renderRoadmapNode(270, 62, p3, '#E62429', 'Fase 3', 'glow-red')}

                {/* Nodes Row 2 (Multiverse Saga) */}
                {renderRoadmapNode(50, 198, p4, '#00A8FF', 'Fase 4', 'glow-blue')}
                {renderRoadmapNode(160, 198, p5, '#F5C842', 'Fase 5', 'glow-yellow')}
                {renderRoadmapNode(270, 198, p6, '#F5C842', 'Fase 6', 'glow-yellow')}
              </svg>
            </div>

            {/* Bottom summary */}
            <div className="pt-3 border-t border-white/10 text-center font-label text-xs text-zinc-400 font-bold uppercase tracking-wider">
              {completedPhasesCount} DE 6 FASES COMPLETADAS
            </div>

          </div>
        </motion.div>

        {/* Right Section: Subgrid with Infinity Vault, Favoritos VIP, and Próximos Estrenos (8 cols on lg) */}
        <div className="lg:col-span-8 flex flex-col gap-5">

          {/* Sub-row: Infinity Vault & Favoritos VIP */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-5">

            {/* Infinity Vault (6 cols on sm) */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.25, 1, 0.3, 1] }}
              className="sm:col-span-6 flex flex-col"
            >
              <div className="tactile-bento-card rounded-3xl p-6 flex flex-col justify-between h-full">
                <h3 className="font-display text-2xl uppercase tracking-wider text-white leading-none mb-4">
                  Infinity Vault
                </h3>

                <div className="space-y-4 my-auto">
                  {/* Películas */}
                  <div className="flex items-center justify-between gap-3 py-1">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full neu-gem-socket p-1.5 flex items-center justify-center shrink-0 relative">
                        <div className="absolute inset-1 rounded-full bg-red-500/15 blur-xs pointer-events-none" />
                        <img
                          src="/gema-de-realidad.png"
                          alt="Películas"
                          className="w-full h-full object-contain relative z-10 drop-shadow-[0_3px_5px_rgba(0,0,0,0.8)]"
                        />
                      </div>
                      <div>
                        <span className="font-bold text-white text-xs sm:text-sm block leading-tight">
                          Películas
                        </span>
                        <span className="text-[10px] text-zinc-400 font-medium">
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
                  <div className="flex items-center justify-between gap-3 py-1">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full neu-gem-socket p-1.5 flex items-center justify-center shrink-0 relative">
                        <div className="absolute inset-1 rounded-full bg-amber-400/15 blur-xs pointer-events-none" />
                        <img
                          src="/gema-de-la-mente.png"
                          alt="Series"
                          className="w-full h-full object-contain relative z-10 drop-shadow-[0_3px_5px_rgba(0,0,0,0.8)]"
                        />
                      </div>
                      <div>
                        <span className="font-bold text-white text-xs sm:text-sm block leading-tight">
                          Series
                        </span>
                        <span className="text-[10px] text-zinc-400 font-medium">
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
                  <div className="flex items-center justify-between gap-3 py-1">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full neu-gem-socket p-1.5 flex items-center justify-center shrink-0 relative">
                        <div className="absolute inset-1 rounded-full bg-sky-400/15 blur-xs pointer-events-none" />
                        <img
                          src="/gema-del-espacio.png"
                          alt="Especiales"
                          className="w-full h-full object-contain relative z-10 drop-shadow-[0_3px_5px_rgba(0,0,0,0.8)]"
                        />
                      </div>
                      <div>
                        <span className="font-bold text-white text-xs sm:text-sm block leading-tight">
                          Especiales
                        </span>
                        <span className="text-[10px] text-zinc-400 font-medium">
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

            {/* Favoritos VIP (6 cols on sm) */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 1, 0.3, 1] }}
              className="sm:col-span-6 flex flex-col"
            >
              <div className="tactile-bento-card rounded-3xl p-6 flex flex-col justify-between h-full">

                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-display text-2xl uppercase tracking-wider text-white leading-none">
                    Favoritos
                  </h3>
                  {favoriteItems.length > 3 && (
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => scrollContainer(scrollFavoritesRef, 'left')}
                        className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white flex items-center justify-center cursor-pointer border border-white/10"
                        title="Anterior"
                      >
                        <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
                      </button>
                      <button
                        onClick={() => scrollContainer(scrollFavoritesRef, 'right')}
                        className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white flex items-center justify-center cursor-pointer border border-white/10"
                        title="Siguiente"
                      >
                        <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex-1 flex items-center overflow-hidden">
                  {favoriteItems.length > 0 ? (
                    <div
                      ref={scrollFavoritesRef}
                      className="flex gap-3 overflow-x-auto no-scrollbar scroll-smooth w-full py-1.5 snap-x snap-mandatory"
                    >
                      {favoriteItems.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => openDetailModal(item, 'fav')}
                          className="relative w-[calc((100%-0.75rem)/2)] sm:w-[calc((100%-1.5rem)/3)] aspect-[2/3] rounded-2xl overflow-hidden bg-zinc-900 border border-white/20 shadow-lg shrink-0 cursor-pointer group/fav hover:scale-[1.03] hover:border-marvel-red transition-all tactile-poster-frame snap-start"
                        >
                          <img
                            src={item.urlPoster}
                            alt={item.titulo}
                            className="w-full h-full object-cover"
                          />
                          <div className="card-holo-foil opacity-0 group-hover/fav:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 w-full text-xs text-zinc-400">
                      Tus producciones favoritas aparecerán aquí.
                    </div>
                  )}
                </div>

              </div>
            </motion.div>

          </div>

          {/* Sub-row: Próximos Estrenos del MCU (Bottom Full Width of Right Section) */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.25, 1, 0.3, 1] }}
            className="w-full"
          >
            <div className="tactile-bento-card rounded-3xl p-6">

              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-2xl uppercase tracking-wider text-white leading-none">
                  Próximos Estrenos del MCU
                </h3>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => scrollContainer(scrollUpcomingRef, 'left')}
                    className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white flex items-center justify-center cursor-pointer border border-white/10"
                    title="Anterior"
                  >
                    <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
                  </button>
                  <button
                    onClick={() => scrollContainer(scrollUpcomingRef, 'right')}
                    className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white flex items-center justify-center cursor-pointer border border-white/10"
                    title="Siguiente"
                  >
                    <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>
              </div>

              {/* Posters Carousel with Top Countdown Pills (Display only until released) */}
              <div className="overflow-hidden w-full">
                <div
                  ref={scrollUpcomingRef}
                  className="flex gap-3 overflow-x-auto no-scrollbar scroll-smooth py-1 snap-x snap-mandatory"
                >
                  {upcomingItems.map((item) => (
                    <div
                      key={item.id}
                      className="relative w-[calc((100%-0.75rem)/2)] sm:w-[calc((100%-2.25rem)/4)] lg:w-[calc((100%-3.75rem)/6)] aspect-[2/3] rounded-2xl overflow-hidden bg-zinc-900 border border-white/15 shadow-lg shrink-0 select-none cursor-default tactile-poster-frame snap-start"
                      title={`Próximo estreno: ${item.titulo} (${getCountdownLabel(item.fechaLanzamiento)})`}
                    >
                      <img
                        src={item.urlPoster}
                        alt={item.titulo}
                        className="w-full h-full object-cover"
                      />

                      {/* Top Countdown Pill Badge directly on poster */}
                      <div className="absolute top-2 inset-x-2 bg-black/75 backdrop-blur-md text-white font-label text-[9px] font-bold uppercase tracking-wider py-0.5 px-1 rounded-full text-center border border-white/20 shadow">
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

    </div>
  );
};
