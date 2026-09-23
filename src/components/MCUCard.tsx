import React, { useState } from 'react';
import { MCUItem } from '../types/mcu';
import { PriorityBadge } from './common/PriorityBadge';
import { TactileSwitch } from './common/TactileSwitch';

interface MCUCardProps {
  item: MCUItem;
  isWatched: boolean;
  onOpenDetail: (item: MCUItem) => void;
  onToggleWatched: (id: string) => void;
}

export const MCUCard = React.memo<MCUCardProps>(({
  item,
  isWatched,
  onOpenDetail,
  onToggleWatched,
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      onClick={() => onOpenDetail(item)}
      className="flex flex-col cursor-pointer select-none group"
    >
      {/* Poster Image Container with Tactile Frame */}
      <div
        className="relative aspect-[2/3] w-full rounded-2xl overflow-hidden tactile-poster-frame transition-all duration-500 ease-out"
      >
        {/* Top Gradient Blur/Shadow Strip for High Button Visibility */}
        <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-black/65 via-black/25 to-transparent z-10 pointer-events-none" />

        {/* Holo-Foil Trading Card Sheen on Hover */}
        <div className="absolute inset-0 card-holo-foil opacity-0 group-hover:opacity-100 pointer-events-none z-10 -translate-x-full group-hover:translate-x-full duration-1000 ease-out" />

        {/* Priority Badge in Top Left Corner */}
        <PriorityBadge priority={item.prioridad} variant="card" />

        {/* Tactile Mechanical Toggle Switch in Top Right Corner */}
        <TactileSwitch
          checked={isWatched}
          onChange={() => onToggleWatched(item.id)}
          size="sm"
          className="absolute top-2.5 right-2.5 z-20"
        />

        {/* Clean Poster Image with Hardware-Accelerated CSS Transitions */}
        {!imageError ? (
          <img
            src={item.urlPoster}
            alt={item.titulo}
            onError={() => setImageError(true)}
            className={`w-full h-full object-cover transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-108 ${
              isWatched ? 'opacity-60' : 'opacity-100'
            }`}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-[#1A1A1A] p-4 flex flex-col justify-center text-center">
            <h4 className="font-display text-white text-base sm:text-lg font-bold tracking-tight leading-snug">
              {item.titulo}
            </h4>
          </div>
        )}

      </div>

      {/* Title & Metadata Text UNDERNEATH Poster */}
      <div className="mt-3 px-0.5 space-y-0.5">
        <div className="min-h-[2.5rem]">
          <h3 className="font-display text-white text-sm sm:text-base font-bold tracking-tight leading-snug group-hover:text-zinc-100 transition-colors">
            {item.titulo}
          </h3>
        </div>

        <div className="flex items-center gap-2 font-display text-xs text-white/70 font-bold uppercase tracking-wider">
          <span>{item.anioLanzamiento}</span>
          {item.fechaEsExacta === false && (
            <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-1.5 py-0.2 rounded font-sans uppercase font-bold shadow-xs" title="Fecha de estreno estimada">
              Estimada
            </span>
          )}
        </div>
      </div>

    </div>
  );
});

