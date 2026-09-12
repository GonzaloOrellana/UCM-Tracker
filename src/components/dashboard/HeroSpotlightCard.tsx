import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Trophy, Sparkles, Play } from 'lucide-react';
import { MCUItem } from '../../types/mcu';
import { getPlatformInfo } from '../../utils/platformHelper';

interface HeroSpotlightCardProps {
  availableItems: MCUItem[];
  watchedIds: Set<string>;
  onOpenDetail: (item: MCUItem) => void;
  onNavigateUpcoming: () => void;
}

// Allowed specials for the Spotlight Hero Card
const ALLOWED_SPOTLIGHT_SPECIAL_IDS = new Set([
  'guardians-galaxy-holiday-special',
  'punisher-one-last-kill',
]);

export const HeroSpotlightCard: React.FC<HeroSpotlightCardProps> = ({
  availableItems,
  watchedIds,
  onOpenDetail,
  onNavigateUpcoming,
}) => {
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 1, 0.3, 1] }}
      className="lg:col-span-4 flex flex-col h-full"
    >
      {currentSpotlightItem ? (
        <div
          onClick={() => onOpenDetail(currentSpotlightItem)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onOpenDetail(currentSpotlightItem);
            }
          }}
          className="relative tactile-bento-card rounded-2xl sm:rounded-3xl p-3.5 sm:p-4.5 lg:p-4 xl:p-5 flex flex-col justify-between h-[180px] sm:h-[195px] lg:h-full overflow-hidden group/spotlight cursor-pointer hover:border-white/30 hover:shadow-[0_16px_40px_-8px_rgba(0,0,0,0.8),0_0_24px_rgba(255,255,255,0.06)] transition-all duration-300"
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
                  {currentSpotlightItem.prioridad === 'esencial'
                    ? '🔥'
                    : currentSpotlightItem.prioridad === 'recomendada'
                    ? '🟢'
                    : currentSpotlightItem.prioridad === 'complementaria'
                    ? '🟡'
                    : '⚪'}
                </span>
                <span>
                  {currentSpotlightItem.prioridad === 'esencial'
                    ? 'Esencial'
                    : currentSpotlightItem.prioridad === 'recomendada'
                    ? 'Recomendada'
                    : currentSpotlightItem.prioridad === 'complementaria'
                    ? 'Complementaria'
                    : 'Opcional'}
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
                className="font-display text-sm sm:text-lg lg:text-lg xl:text-2xl font-bold tracking-tight text-white leading-tight line-clamp-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] select-none"
              >
                {currentSpotlightItem.titulo}
              </motion.h2>
            </AnimatePresence>
          </div>

          {/* Spotlight Footer: Official Watch Link (Left) + Mode Toggle & Chevrons (Right) */}
          <div className="relative z-10 flex items-center justify-between gap-1.5 sm:gap-2 pt-1 flex-wrap sm:flex-nowrap">
            {(() => {
              const platformInfo = getPlatformInfo(currentSpotlightItem.urlOficial, currentSpotlightItem);

              return (
                <a
                  href={platformInfo.watchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  title={platformInfo.tooltip}
                  className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 lg:px-3.5 lg:py-1.5 xl:px-4 xl:py-2 rounded-full text-[11px] sm:text-xs font-semibold tracking-wide transition-all duration-200 hover:scale-[1.03] active:scale-95 cursor-pointer select-none group/watch shrink-0 ${platformInfo.buttonClasses}`}
                >
                  <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current transition-transform group-hover/watch:scale-110" />
                  <span>Ver ahora</span>
                  {platformInfo.renderLogo()}
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
        <div className="tactile-bento-card rounded-2xl sm:rounded-3xl p-3.5 sm:p-4.5 lg:p-4 xl:p-5 flex flex-col justify-between h-[180px] sm:h-[195px] lg:h-full text-center border-emerald-500/40">
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
        <div className="tactile-bento-card rounded-2xl sm:rounded-3xl p-3.5 sm:p-4.5 lg:p-4 xl:p-5 flex flex-col justify-between h-[180px] sm:h-[195px] lg:h-full text-center border-amber-500/40">
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
            onClick={onNavigateUpcoming}
            className="bg-[#C81D25] hover:bg-[#E62429] active:translate-y-0.5 text-white font-label text-xs font-bold py-1.5 px-4 rounded-full shadow-lg border-t border-white/30 transition-all cursor-pointer"
          >
            Ver próximos estrenos →
          </button>
        </div>
      )}
    </motion.div>
  );
};
