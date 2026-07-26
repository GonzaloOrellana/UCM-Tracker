import React, { useRef } from 'react';
import { useMCU } from '../context/MCUContext';
import { MCUItem } from '../types/mcu';
import { Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface FavoritesSectionProps {
  onOpenDetail?: (item: MCUItem) => void;
}

export const FavoritesSection: React.FC<FavoritesSectionProps> = ({ onOpenDetail }) => {
  const { items, favoriteIds, toggleFavorite, openDetailModal } = useMCU();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const favoriteItems = items.filter((item) => favoriteIds.has(item.id));

  const handleCardClick = (item: MCUItem) => {
    if (onOpenDetail) {
      onOpenDetail(item);
    } else {
      openDetailModal(item, 'fav');
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const containerWidth = scrollContainerRef.current.clientWidth;
      const scrollAmount = direction === 'left' ? -containerWidth * 0.75 : containerWidth * 0.75;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="crextio-card p-5 sm:p-6 space-y-4 flex flex-col justify-between h-full overflow-hidden">
      {/* Header (Title + Carousel Scroll Navigation Arrows) */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="font-semibold text-white text-base sm:text-lg tracking-tight">
            Favoritos
          </h3>
        </div>

        {/* Scroll Navigation Arrows (Only shown when items exist) */}
        {favoriteItems.length > 0 && (
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => scroll('left')}
              className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer border border-white/20 shadow-2xs"
              title="Anterior"
            >
              <ChevronLeft className="w-4 h-4 stroke-[2]" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer border border-white/20 shadow-2xs"
              title="Siguiente"
            >
              <ChevronRight className="w-4 h-4 stroke-[2]" />
            </button>
          </div>
        )}
      </div>

      {/* Grid / Carousel of Favorites Posters */}
      <div className="flex-1 overflow-hidden">
        {favoriteItems.length > 0 ? (
          <div
            ref={scrollContainerRef}
            className="flex gap-2.5 sm:gap-3 overflow-x-auto pb-2 pt-1 no-scrollbar snap-x snap-mandatory scroll-smooth"
          >
            {favoriteItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ scale: 0.3, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  duration: 0.9,
                  delay: index * 0.12,
                  ease: [0.25, 1, 0.4, 1],
                }}
                onClick={() => handleCardClick(item)}
                className="group/fav shrink-0 w-[calc((100%-3*0.625rem)/4)] sm:w-[calc((100%-4*0.75rem)/5)] min-w-[70px] cursor-pointer relative snap-start"
              >
                {/* Poster Box */}
                <motion.div
                  layoutId={`fav-container-${item.id}`}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
                  className="relative aspect-[2/3] w-full rounded-xl overflow-hidden bg-zinc-900 border border-zinc-200/80 shadow-md shadow-black/30 group-hover/fav:shadow-lg transition-shadow duration-300"
                >
                  <motion.img
                    layoutId={`fav-poster-${item.id}`}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
                    src={item.urlPoster}
                    alt={item.titulo}
                    className="w-full h-full object-cover group-hover/fav:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  {/* Remove Favorite Quick Icon */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(item.id);
                    }}
                    className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/60 text-rose-400 flex items-center justify-center backdrop-blur-xs opacity-0 group-hover/fav:opacity-100 transition-opacity"
                    title="Quitar de favoritos"
                  >
                    <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
                  </button>
                </motion.div>

                {/* Title Below */}
                <h4 className="mt-1.5 text-[11px] font-medium text-white truncate">
                  {item.titulo}
                </h4>
                <p className="text-[10px] text-white/80 font-medium">
                  {item.anioLanzamiento}
                </p>
              </motion.div>
            ))}
          </div>
        ) : (
          /* Clean Glass Empty State text */
          <div className="py-6 px-2 text-center flex flex-col items-center justify-center h-full">
            <p className="text-xs sm:text-sm text-zinc-300 font-normal leading-relaxed">
              Aún no tienes producciones en favoritos. Haz clic en el corazón (❤️) de cualquier película o serie para marcarla aquí.
            </p>
          </div>
        )}
      </div>

    </div>
  );
};
