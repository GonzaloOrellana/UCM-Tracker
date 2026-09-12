import React from 'react';
import { motion } from 'framer-motion';
import { NavView, ProgressStats } from '../../types/mcu';

interface InfinityVaultCardProps {
  stats: ProgressStats;
  onNavigate: (view: NavView) => void;
}

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

export const InfinityVaultCard: React.FC<InfinityVaultCardProps> = ({ stats, onNavigate }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.25, ease: [0.25, 1, 0.3, 1] }}
      className="md:col-span-1 lg:col-span-3 flex flex-col min-h-0 h-full"
    >
      <div className="tactile-bento-card rounded-2xl sm:rounded-3xl p-4 sm:p-4.5 lg:p-3.5 xl:p-4.5 flex flex-col justify-between h-full min-h-0">
        {/* Header */}
        <div className="mb-2 sm:mb-2.5 lg:mb-1 xl:mb-2 shrink-0">
          <h3 className="font-display text-sm sm:text-base xl:text-xl font-bold tracking-tight text-white leading-tight">
            Infinity Vault
          </h3>
        </div>

        {/* 3 Categories centered with rich tactile styling */}
        <div className="space-y-2 sm:space-y-2.5 xl:space-y-3.5 my-auto py-0.5 flex-1 flex flex-col justify-center min-h-0">
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
  );
};
