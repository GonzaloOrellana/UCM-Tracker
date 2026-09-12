import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { NavView } from '../../types/mcu';

interface DoomsdayBentoCardProps {
  onNavigate: (view: NavView) => void;
}

export const DoomsdayBentoCard: React.FC<DoomsdayBentoCardProps> = ({ onNavigate }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 1, 0.3, 1] }}
      className="lg:col-span-4 flex flex-col h-full cursor-pointer group/doomsday"
      onClick={() => onNavigate('doomsday')}
    >
      <div className="relative tactile-bento-card rounded-2xl sm:rounded-3xl p-3.5 sm:p-4.5 lg:p-3.5 xl:p-5 flex flex-col justify-between h-[180px] sm:h-[195px] lg:h-full overflow-hidden border-emerald-500/30 hover:border-emerald-400/60 hover:shadow-[0_0_28px_rgba(16,185,129,0.22)] transition-all duration-500 bg-gradient-to-br from-[#07130F]/90 via-[#0B0D18]/90 to-[#120817]/90">
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

        {/* Body / Title & Description (Clean & Spacious Top Placement) */}
        <div className="relative z-10 pt-1 sm:pt-1.5 xl:pt-2">
          <h3 className="font-display text-base sm:text-lg lg:text-lg xl:text-2xl font-bold tracking-tight text-white leading-tight group-hover/doomsday:text-emerald-300 transition-colors drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] line-clamp-2">
            Camino a Doomsday & Secret Wars
          </h3>
          <p className="text-[11px] lg:text-[11.5px] xl:text-[12px] text-zinc-300/85 mt-1 sm:mt-1.5 leading-relaxed font-sans max-w-sm line-clamp-2">
            Incursiones, el ascenso de Victor Von Doom y la colisión total hacia Battleworld.
          </p>
        </div>

        {/* Footer Action: Tactile Glass CTA aligned with row baseline */}
        <div className="relative z-10 flex items-center justify-start pt-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate('doomsday');
            }}
            className="tactile-btn-glass text-white text-[10px] sm:text-[11px] xl:text-xs font-semibold px-3 sm:px-3.5 xl:px-4.5 py-1.5 xl:py-2 rounded-full flex items-center gap-1.5 cursor-pointer group-hover/doomsday:border-emerald-400/80 group-hover/doomsday:text-emerald-300 transition-all shadow-lg"
          >
            <span>Explorar evento</span>
            <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
