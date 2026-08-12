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
      {/* Poster Image Container with Shared Container Layout Transition */}
      <motion.div
        layoutId={`card-container-${item.id}`}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
        className="relative aspect-[2/3] w-full rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 group-hover:border-white/35 shadow-lg shadow-black/40 group-hover:shadow-2xl group-hover:shadow-black/70 transition-all duration-500 ease-out"
      >
        {/* Top Gradient Blur/Shadow Strip for High Button Visibility */}
        <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-black/55 via-black/20 to-transparent z-10 pointer-events-none" />

        {/* Diagonal Light Sheen Overlay Effect on Hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out z-10 pointer-events-none" />

        {/* Floating Toggle Switch in Top Right Corner */}
        <button
          type="button"
          role="switch"
          aria-checked={isWatched}
          onClick={handleCheckboxClick}
          className={`absolute top-2.5 right-2.5 z-20 w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer flex items-center shadow-md ${isWatched
            ? 'bg-emerald-500 border border-emerald-400'
            : 'bg-black/40 backdrop-blur-md border border-white/30'
            }`}
          title={isWatched ? 'Marcar como no visto' : 'Marcar como visto'}
        >
          <span
            className={`w-3.5 h-3.5 rounded-full bg-white shadow-xs transform transition-transform duration-200 flex items-center justify-center ${isWatched ? 'translate-x-4' : 'translate-x-0'
              }`}
          >
            {isWatched && <Check className="w-2.5 h-2.5 text-emerald-600 stroke-[3]" />}
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
            className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-[#1A1A1A] p-4 flex flex-col justify-center text-center">
            <h4 className="font-display text-white text-xl uppercase tracking-wider leading-none">
              {item.titulo}
            </h4>
          </div>
        )}

      </motion.div>

      {/* Title & Metadata Text UNDERNEATH Poster */}
      <div className="mt-3 px-0.5 space-y-0.5">
        <div className="flex items-start justify-between gap-2 min-h-[2.5rem]">
          <h3 className="font-display text-white text-lg sm:text-xl uppercase tracking-wide leading-tight flex-1">
            {item.titulo}
          </h3>

          {/* Relocated Heart Favorite Button next to Title */}
          <button
            type="button"
            onClick={handleFavoriteClick}
            className="p-1 -mr-1 transition-all hover:scale-115 cursor-pointer shrink-0"
            title={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          >
            <Heart
              className={`w-5 h-5 transition-all stroke-[2] ${isFavorite
                ? 'fill-[#C81D25] text-[#C81D25] drop-shadow-xs'
                : 'text-white/80 hover:text-[#C81D25]'
                }`}
            />
          </button>
        </div>

        <div className="flex items-center gap-2 font-label text-xs text-white/70 font-bold uppercase tracking-wider">
          <span>{item.anioLanzamiento}</span>
          {item.fechaEsExacta === false && (
            <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-1.5 py-0.2 rounded font-label uppercase font-bold" title="Fecha de estreno estimada">
              Estimada
            </span>
          )}
        </div>
      </div>

    </div>
  );
};

