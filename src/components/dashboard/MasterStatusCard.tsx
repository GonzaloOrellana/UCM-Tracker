import React from 'react';
import { motion } from 'framer-motion';
import { ProgressStats } from '../../types/mcu';

interface MasterStatusCardProps {
  userName: string;
  stats: ProgressStats;
}

export const MasterStatusCard: React.FC<MasterStatusCardProps> = ({
  userName,
  stats,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 1, 0.3, 1] }}
      className="lg:col-span-4 flex flex-col h-full"
    >
      <div className="relative tactile-bento-card rounded-2xl sm:rounded-3xl p-5 sm:p-5 lg:p-4.5 xl:p-6 flex flex-col justify-between h-full overflow-hidden min-h-[165px] lg:min-h-0">

        {/* Glowing Marvel Ambient Orbs */}
        <div className="absolute -top-10 -right-10 w-36 h-36 bg-red-600/12 rounded-full blur-2xl pointer-events-none z-0" />
        <div className="absolute -bottom-8 -left-8 w-28 h-28 bg-rose-500/8 rounded-full blur-xl pointer-events-none z-0" />

        {/* Header: Title */}
        <div className="relative z-10 pb-1.5 sm:pb-1 lg:pb-1.5">
          <h1 className="font-display text-xl sm:text-2xl lg:text-2xl xl:text-3xl font-bold tracking-tight text-white leading-tight">
            Hola, {userName}
          </h1>
        </div>

        {/* Main Stats Row: Big Impact Figures & Clean Columns */}
        <div className="relative z-10 my-auto py-2 sm:py-2 lg:py-2.5 xl:py-3 flex items-center justify-between gap-3 sm:gap-3 lg:gap-3 xl:gap-4">
          
          {/* Left Main Percentage Display */}
          <div className="flex items-baseline shrink-0">
            <span className="font-display text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-extrabold text-white tracking-tight leading-none drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              {stats.percentage}%
            </span>
          </div>

          {/* Vertical Separator */}
          <div className="w-[1px] h-11 sm:h-10 lg:h-11 xl:h-12 bg-gradient-to-b from-transparent via-white/20 to-transparent shrink-0" />

          {/* 3 Metric Columns */}
          <div className="grid grid-cols-3 gap-2 sm:gap-2 lg:gap-2 xl:gap-3.5 w-full flex-1 text-center">
            
            {/* Col 1: Total */}
            <div className="space-y-1 sm:space-y-1">
              <span className="font-display text-lg sm:text-lg lg:text-xl xl:text-2xl font-bold text-white tracking-tight leading-none block">
                {stats.total}
              </span>
              <span className="font-label text-[10px] sm:text-[9.5px] lg:text-[10px] xl:text-[10.5px] text-zinc-400 font-semibold uppercase tracking-wider block truncate">
                Total
              </span>
            </div>

            {/* Col 2: Vistas */}
            <div className="space-y-1 sm:space-y-1">
              <span className="font-display text-lg sm:text-lg lg:text-xl xl:text-2xl font-bold text-emerald-400 tracking-tight leading-none block drop-shadow-[0_0_12px_rgba(52,211,153,0.35)]">
                {stats.watched}
              </span>
              <span className="font-label text-[10px] sm:text-[9.5px] lg:text-[10px] xl:text-[10.5px] text-zinc-400 font-semibold uppercase tracking-wider block truncate">
                Vistas
              </span>
            </div>

            {/* Col 3: Pendientes */}
            <div className="space-y-1 sm:space-y-1">
              <span className="font-display text-lg sm:text-lg lg:text-xl xl:text-2xl font-bold text-amber-400 tracking-tight leading-none block drop-shadow-[0_0_12px_rgba(251,191,36,0.35)]">
                {stats.total - stats.watched}
              </span>
              <span className="font-label text-[10px] sm:text-[9.5px] lg:text-[10px] xl:text-[10.5px] text-zinc-400 font-semibold uppercase tracking-wider block truncate">
                Faltan
              </span>
            </div>

          </div>

        </div>

        {/* Bottom: Continuous Laser Energy Trench */}
        <div className="relative z-10 pt-2 sm:pt-1 lg:pt-1.5 xl:pt-2">
          <div className="w-full h-2 sm:h-2 lg:h-2 xl:h-2.5 rounded-full neu-energy-trench p-[1px] relative overflow-hidden">
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
  );
};
