import React, { useState } from 'react';
import { MCUItem } from '../types/mcu';
import { useMCU } from '../context/MCUContext';
import { Check, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

interface MCUCardProps {
  item: MCUItem;
  onOpenDetail: (item: MCUItem) => void;
}

export const MCUCard: React.FC<MCUCardProps> = ({ item, onOpenDetail }) => {
  const { watchedIds, favoriteIds, toggleWatched, toggleFavorite } = useMCU();
  const [imageError, setImageError] = useState(false);
  const [, setIsBouncing] = useState(false);

  const isWatched = watchedIds.has(item.id);
  const isFavorite = favoriteIds.has(item.id);

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsBouncing(true);
    toggleWatched(item.id);
    setTimeout(() => setIsBouncing(false), 300);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(item.id);
  };

  return (
    <div
      onClick={() => onOpenDetail(item)}
      className="flex flex-col cursor-pointer select-none group"
    >
      {/* Poster Image Container with Shared Container Layout Transition & Tactile Frame */}
      <motion.div
        layoutId={`card-container-${item.id}`}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
        className="relative aspect-[2/3] w-full rounded-2xl overflow-hidden tactile-poster-frame transition-all duration-500 ease-out"
      >
        {/* Top Gradient Blur/Shadow Strip for High Button Visibility */}
        <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-black/65 via-black/25 to-transparent z-10 pointer-events-none" />

        {/* Holo-Foil Trading Card Sheen on Hover */}
        <div className="absolute inset-0 card-holo-foil opacity-0 group-hover:opacity-100 pointer-events-none z-10 -translate-x-full group-hover:translate-x-full duration-1000 ease-out" />

        {/* Tactile Mechanical Toggle Switch in Top Right Corner */}
        <button
          type="button"
          role="switch"
          aria-checked={isWatched}
          onClick={handleCheckboxClick}
          className={`absolute top-2.5 right-2.5 z-20 w-9 h-5 rounded-full p-0.5 transition-all duration-200 cursor-pointer flex items-center active:scale-90 ${
            isWatched
              ? 'tactile-switch-active'
              : 'tactile-switch-well'
          }`}
          title={isWatched ? 'Marcar como no visto' : 'Marcar como visto'}
        >
          <span
            className={`w-3.5 h-3.5 rounded-full tactile-switch-thumb transform transition-transform duration-200 flex items-center justify-center ${
              isWatched ? 'translate-x-4' : 'translate-x-0'
            }`}
          >
            {isWatched && <Check className="w-2.5 h-2.5 text-emerald-800 stroke-[3.5]" />}
          </span>
        </button>

        {/* Clean Poster Image with Shared Poster Layout Transition */}
        {!imageError ? (
          <motion.img
            layoutId={`card-poster-${item.id}`}
            initial={false}
            animate={{ opacity: isWatched ? 0.6 : 1 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
            src={item.urlPoster}
            alt={item.titulo}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-108"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-[#1A1A1A] p-4 flex flex-col justify-center text-center">
            <h4 className="font-display text-white text-base sm:text-lg font-bold tracking-tight leading-snug">
              {item.titulo}
            </h4>
          </div>
        )}

      </motion.div>

      {/* Title & Metadata Text UNDERNEATH Poster */}
      <div className="mt-3 px-0.5 space-y-0.5">
        <div className="flex items-start justify-between gap-2 min-h-[2.5rem]">
          <h3 className="font-display text-white text-sm sm:text-base font-bold tracking-tight leading-snug flex-1 group-hover:text-zinc-100 transition-colors">
            {item.titulo}
          </h3>

          {/* Tactile Heart Favorite Button with Ruby Glow */}
          <button
            type="button"
            onClick={handleFavoriteClick}
            className="p-1 -mr-1 transition-all duration-200 hover:scale-120 active:scale-90 cursor-pointer shrink-0"
            title={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          >
            <Heart
              className={`w-5 h-5 transition-all stroke-[2] ${
                isFavorite
                  ? 'fill-[#C81D25] text-[#C81D25] drop-shadow-[0_0_8px_rgba(200,29,37,0.7)]'
                  : 'text-white/70 hover:text-[#C81D25]'
              }`}
            />
          </button>
        </div>

        <div className="flex items-center gap-2 font-label text-xs text-white/70 font-bold uppercase tracking-wider">
          <span>{item.anioLanzamiento}</span>
          {item.fechaEsExacta === false && (
            <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-1.5 py-0.2 rounded font-label uppercase font-bold shadow-xs" title="Fecha de estreno estimada">
              Estimada
            </span>
          )}
        </div>
      </div>

    </div>
  );
};

