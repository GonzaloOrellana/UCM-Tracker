import React from 'react';
import { motion } from 'framer-motion';
import { useMCU } from '../context/MCUContext';
import { FavoritesSection } from '../components/FavoritesSection';
import { UpcomingSection } from '../components/UpcomingSection';
import { NavView } from '../types/mcu';
import { ArrowUpRight, Check, Film, Sparkles } from 'lucide-react';

interface DashboardViewProps {
  onNavigate: (view: NavView) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onNavigate }) => {
  const { stats, settings, openDetailModal } = useMCU();

  const phaseList = ['Fase 1', 'Fase 2', 'Fase 3', 'Fase 4', 'Fase 5', 'Fase 6'];

  const moviesPct = Math.round((stats.movies.total / stats.total) * 100);
  const seriesPct = Math.round((stats.series.total / stats.total) * 100);
  const specialsPct = 100 - moviesPct - seriesPct;

  return (
    <div className="space-y-6 sm:space-y-7 animate-fade-in relative pb-2">

      {/* Top Header Section (Greeting + KPIs + Single Progress Bar) */}
      <div className="space-y-4">

        {/* Row 1: Greeting on Left & 3 Standalone KPIs on Far Right */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">

          {/* Left Side: Greeting with Curtain Reveal Animation (clip-path horizontal curtain) */}
          <div>
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 1 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.35,
                    delayChildren: 0.1,
                  },
                },
              }}
              className="text-3xl sm:text-4xl lg:text-[44px] font-light text-white tracking-tight leading-none flex items-center gap-2 flex-wrap drop-shadow-md"
            >
              <motion.span
                variants={{
                  hidden: { clipPath: 'polygon(0 0, 0% 0, 0% 100%, 0 100%)', opacity: 0.1, x: -10 },
                  visible: { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', opacity: 1, x: 0 },
                }}
                transition={{ duration: 1.3, ease: [0.25, 1, 0.3, 1] }}
                className="inline-block"
              >
                Hola,
              </motion.span>
              <motion.span
                variants={{
                  hidden: { clipPath: 'polygon(0 0, 0% 0, 0% 100%, 0 100%)', opacity: 0.1, x: -10 },
                  visible: { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', opacity: 1, x: 0 },
                }}
                transition={{ duration: 1.3, ease: [0.25, 1, 0.3, 1] }}
                className="font-normal inline-block"
              >
                {settings.userName}
              </motion.span>
            </motion.h1>
          </div>

          {/* Right Side: 3 Standalone KPIs with Slow Staggered Entry Animation */}
          <div className="flex items-center gap-3 sm:gap-6 lg:gap-8 self-start lg:self-auto shrink-0">

            {/* KPI 1: Total / Producciones */}
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.4, delay: 0.2, ease: [0.25, 1, 0.4, 1] }}
              className="flex items-center gap-2 sm:gap-3 group/kpi cursor-default"
            >
              <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/25 backdrop-blur-xl border border-white/40 shadow-[0_4px_16px_rgba(0,0,0,0.12),inset_0_1px_2px_rgba(255,255,255,0.7)] flex items-center justify-center shrink-0 relative overflow-hidden group-hover/kpi:scale-105 group-hover/kpi:border-white/60 transition-all duration-300">
                <img src="/Movie-rollo.png" alt="Total" className="w-6.5 h-6.5 sm:w-9 sm:h-9 object-contain drop-shadow-md group-hover/kpi:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-b from-white/35 via-transparent to-transparent pointer-events-none rounded-xl sm:rounded-2xl" />
              </div>
              <div>
                <span className="text-2xl sm:text-4xl font-light text-white tracking-tight block leading-none">
                  {stats.total}
                </span>
                <span className="text-[10px] sm:text-[11px] text-white/80 font-medium block mt-0.5">
                  Producciones
                </span>
              </div>
            </motion.div>

            {/* KPI 2: Vistas */}
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.4, delay: 0.5, ease: [0.25, 1, 0.4, 1] }}
              className="flex items-center gap-2 sm:gap-3 group/kpi cursor-default"
            >
              <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/25 backdrop-blur-xl border border-white/40 shadow-[0_4px_16px_rgba(0,0,0,0.12),inset_0_1px_2px_rgba(255,255,255,0.7)] flex items-center justify-center shrink-0 relative overflow-hidden group-hover/kpi:scale-105 group-hover/kpi:border-white/60 transition-all duration-300">
                <img src="/Check.png" alt="Vistas" className="w-6.5 h-6.5 sm:w-9 sm:h-9 object-contain drop-shadow-md group-hover/kpi:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-b from-white/35 via-transparent to-transparent pointer-events-none rounded-xl sm:rounded-2xl" />
              </div>
              <div>
                <span className="text-2xl sm:text-4xl font-light text-white tracking-tight block leading-none">
                  {stats.watched}
                </span>
                <span className="text-[10px] sm:text-[11px] text-white/80 font-medium block mt-0.5">
                  Vistas
                </span>
              </div>
            </motion.div>

            {/* KPI 3: Pendientes */}
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.4, delay: 0.8, ease: [0.25, 1, 0.4, 1] }}
              className="flex items-center gap-2 sm:gap-3 group/kpi cursor-default"
            >
              <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/25 backdrop-blur-xl border border-white/40 shadow-[0_4px_16px_rgba(0,0,0,0.12),inset_0_1px_2px_rgba(255,255,255,0.7)] flex items-center justify-center shrink-0 relative overflow-hidden group-hover/kpi:scale-105 group-hover/kpi:border-white/60 transition-all duration-300">
                <img src="/Popcorn.png" alt="Pendientes" className="w-6.5 h-6.5 sm:w-9 sm:h-9 object-contain drop-shadow-md group-hover/kpi:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-b from-white/35 via-transparent to-transparent pointer-events-none rounded-xl sm:rounded-2xl" />
              </div>
              <div>
                <span className="text-2xl sm:text-4xl font-light text-white tracking-tight block leading-none">
                  {stats.total - stats.watched}
                </span>
                <span className="text-[10px] sm:text-[11px] text-white/80 font-medium block mt-0.5">
                  Pendientes
                </span>
              </div>
            </motion.div>

          </div>

        </div>

        {/* Row 2: Unified Main Progress Bar & Clean Format Indicators */}
        <div className="space-y-2 pt-1">

          {/* Clean Inline Format Legend Above Progress Bar (with Infinity Gems Icons) */}
          <div className="flex items-center gap-3 sm:gap-5 text-xs font-normal text-zinc-300 px-1 tracking-wide flex-wrap">
            <div className="flex items-center gap-1.5">
              <img src="/gema-de-realidad.png" alt="Gema de la Realidad" className="w-4 h-4 object-contain shrink-0 drop-shadow-[0_0_6px_rgba(239,68,68,0.8)]" />
              <span>Películas</span>
              <span className="font-semibold text-white ml-0.5">({stats.movies.watched}/{stats.movies.total})</span>
            </div>

            <span className="text-white/30 hidden sm:inline">•</span>

            <div className="flex items-center gap-1.5">
              <img src="/gema-de-la-mente.png" alt="Gema de la Mente" className="w-4 h-4 object-contain shrink-0 drop-shadow-[0_0_6px_rgba(251,191,36,0.8)]" />
              <span>Series</span>
              <span className="font-semibold text-white ml-0.5">({stats.series.watched}/{stats.series.total})</span>
            </div>

            <span className="text-white/30 hidden sm:inline">•</span>

            <div className="flex items-center gap-1.5">
              <img src="/gema-del-espacio.png" alt="Gema del Espacio" className="w-4 h-4 object-contain shrink-0 drop-shadow-[0_0_6px_rgba(56,189,248,0.8)]" />
              <span>Especiales</span>
              <span className="font-semibold text-white ml-0.5">({stats.specials.watched}/{stats.specials.total})</span>
            </div>
          </div>

          {/* Progress Bar Container & Percentage Counter */}
          <div className="flex items-center gap-4 sm:gap-5">

            {/* Continuous Unified Progress Bar */}
            <div className="w-full max-w-[480px] sm:max-w-[580px] h-8 sm:h-9 rounded-full relative bg-black/50 shadow-[inset_0_2px_6px_rgba(0,0,0,0.7),0_1px_2px_rgba(255,255,255,0.2)] border border-white/20 overflow-hidden backdrop-blur-md">
              
              {/* Smooth Animated Fill Bar (Marvel Red Gradient) */}
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: `${stats.percentage}%` }}
                transition={{ duration: 2.2, ease: [0.25, 1, 0.4, 1] }}
                className="h-full bg-gradient-to-r from-[#800A10] via-[#C81D25] to-[#E62429] rounded-full relative flex items-center justify-end shadow-[0_0_18px_rgba(230,36,41,0.7)]"
              >
                {/* Glowing Leading Edge Marker */}
                {stats.percentage > 0 && (
                  <div className="w-2.5 h-full bg-white/90 rounded-full shadow-[0_0_12px_#FFF] shrink-0" />
                )}

                {/* Specular Gloss Reflection Overlay */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/30 via-transparent to-black/30 rounded-full" />
              </motion.div>

            </div>

            {/* Standalone Percentage Text */}
            <div
              className="flex items-center shrink-0 cursor-default"
              title={`Progreso Total Visto: ${stats.watched} de ${stats.total} (${stats.percentage}%)`}
            >
              <span className="text-3xl sm:text-4xl font-semibold text-white tracking-tight drop-shadow-lg">
                {stats.percentage}%
              </span>
            </div>

          </div>

        </div>

      </div>

      {/* Bento Grid Row 1: Symmetrical Layout - Estado por Fases (50% width) & Favoritos Card (50% width) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">

        {/* Left Column (50% width): Estado por Fases Light Bento Card */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.2, ease: [0.25, 1, 0.4, 1] }}
          className="h-full"
        >
          <div className="crextio-card p-5 sm:p-6 space-y-3.5 flex flex-col h-full overflow-hidden">

            {/* Card Header */}
            <div>
              <h3 className="font-semibold text-white text-base sm:text-lg tracking-tight">
                Estado por Fases
              </h3>
            </div>

            {/* List of Phase Progress Bars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-3.5 py-1">
              {phaseList.map((phaseName) => {
                const phaseData = stats.phases[phaseName] || { total: 0, watched: 0, percentage: 0 };
                const pct = phaseData.percentage;
                const isComplete = pct === 100 && phaseData.total > 0;
                const isInProgress = pct > 0 && !isComplete;

                // White / Silver Metallic Progress Bar Fill
                const barStyle = isComplete
                  ? 'bg-gradient-to-r from-zinc-300 via-white to-slate-200 shadow-[0_0_10px_rgba(255,255,255,0.8)]'
                  : isInProgress
                    ? 'bg-gradient-to-r from-slate-400 via-zinc-200 to-white shadow-[0_0_8px_rgba(255,255,255,0.5)]'
                    : 'bg-transparent';

                return (
                  <div key={phaseName} className="space-y-1.5 group/phase">

                    <div className="flex items-center justify-between text-xs">
                      <span className={`font-medium truncate ${isComplete ? 'text-white font-semibold' : 'text-zinc-200'}`}>
                        {phaseName}
                      </span>

                      <span className={`font-semibold text-[11px] shrink-0 ml-1 flex items-center gap-1 ${isComplete ? 'text-white font-bold' : isInProgress ? 'text-white' : 'text-zinc-400'
                        }`}>
                        {isComplete && (
                          <svg className="w-3 h-3 text-white inline" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                        {phaseData.watched}/{phaseData.total}
                      </span>
                    </div>

                    {/* Progress Line - Flush Borderless Track with Slow Fill Animation */}
                    <div className="w-full h-2 rounded-full bg-black/40 border border-white/10 overflow-hidden relative">
                      <motion.div
                        initial={{ width: '0%' }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 2.0, delay: 0.35, ease: [0.25, 1, 0.4, 1] }}
                        className={`h-full rounded-full ${barStyle}`}
                      />
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        </motion.div>

        {/* Right Column (50% width): Favoritos Card */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.35, ease: [0.25, 1, 0.4, 1] }}
          className="h-full"
        >
          <FavoritesSection onOpenDetail={(item) => openDetailModal(item, 'fav')} />
        </motion.div>

      </div>

      {/* Bento Grid Row 2: Próximos Estrenos del UCM (Scroll-triggered In-View Animation) */}
      <motion.div
        initial={{ opacity: 0, y: 36, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 1.2, ease: [0.25, 1, 0.4, 1] }}
      >
        <UpcomingSection onNavigateToUpcoming={() => onNavigate('upcoming')} />
      </motion.div>

    </div>
  );
};
