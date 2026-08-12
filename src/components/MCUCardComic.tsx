import React, { useState } from 'react';
import { MCUItem } from '../types/mcu';
import { useMCU } from '../context/MCUContext';
import { Check, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

interface MCUCardComicProps {
  item: MCUItem;
  onOpenDetail: (item: MCUItem) => void;
}

export const MCUCardComic: React.FC<MCUCardComicProps> = ({ item, onOpenDetail }) => {
  const { watchedIds, favoriteIds, toggleWatched, toggleFavorite } = useMCU();
  const [imageError, setImageError] = useState(false);

  const isWatched = watchedIds.has(item.id);
  const isFavorite = favoriteIds.has(item.id);

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWatched(item.id);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(item.id);
  };

  // Formato de número de Issue (ej: ISSUE #01)
  const issueNum = Math.max(1, Math.floor(item.ordenEstreno || 1));
  const issueLabel = `ISSUE #${String(issueNum).padStart(2, '0')}`;

  return (
    <div
      onClick={() => onOpenDetail(item)}
      className="flex flex-col cursor-pointer select-none group bg-white text-[#1a1c1c] border-2 border-[#1a1c1c] rounded-none p-3 shadow-[4px_4px_0px_#1a1c1c] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-200 relative overflow-hidden"
    >
      {/* Poster Image Container con Marco de Tinta Negro Estilo Brutalista (Sharp 0) */}
      <div className="relative aspect-[2/3] w-full rounded-none overflow-hidden bg-[#f3f3f3] border-2 border-[#1a1c1c]">
        
        {/* Badge Esquinero Estilo Cómic ("ISSUE #XX") en Rojo Marvel y Esquinas Rectas */}
        <div className="absolute top-2 left-2 z-20 bg-[#bb0013] text-white font-label font-bold text-[10px] tracking-widest px-2 py-0.5 rounded-none uppercase border border-[#1a1c1c] shadow-xs">
          {issueLabel}
        </div>

        {/* Toggle Switch en la esquina superior derecha */}
        <button
          type="button"
          role="switch"
          aria-checked={isWatched}
          onClick={handleCheckboxClick}
          className={`absolute top-2 right-2 z-20 w-8 h-5 rounded-none p-0.5 transition-colors cursor-pointer flex items-center shadow-xs ${
            isWatched
              ? 'bg-emerald-600 border border-emerald-900'
              : 'bg-[#1a1c1c]/60 border border-[#1a1c1c]'
          }`}
          title={isWatched ? 'Marcar como no visto' : 'Marcar como visto'}
        >
          <span
            className={`w-3.5 h-3.5 rounded-none bg-white border border-[#1a1c1c] shadow-xs transform transition-transform duration-200 flex items-center justify-center ${
              isWatched ? 'translate-x-3' : 'translate-x-0'
            }`}
          >
            {isWatched && <Check className="w-2.5 h-2.5 text-emerald-700 stroke-[3]" />}
          </span>
        </button>

        {/* Poster Image */}
        {!imageError ? (
          <motion.img
            initial={false}
            animate={{ opacity: isWatched ? 0.65 : 1 }}
            transition={{ duration: 0.3 }}
            src={item.urlPoster}
            alt={item.titulo}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-[#f3f3f3] p-4 flex flex-col justify-center text-center">
            <h4 className="font-display text-[#1a1c1c] text-xl leading-none uppercase tracking-wider">
              {item.titulo}
            </h4>
          </div>
        )}
      </div>

      {/* Título & Metadata debajo del Poster (Estilo Referencia "CIVIL WAR", "DOCTOR STRANGE") */}
      <div className="mt-3 space-y-1.5">
        <div className="flex items-start justify-between gap-1.5 min-h-[2.4rem]">
          <h3 className="font-display text-[#1a1c1c] text-xl sm:text-2xl uppercase tracking-wider line-clamp-2 leading-none flex-1">
            {item.titulo}
          </h3>

          {/* Botón Favorito Heart */}
          <button
            type="button"
            onClick={handleFavoriteClick}
            className="p-1 -mr-1 transition-transform hover:scale-110 cursor-pointer shrink-0"
            title={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          >
            <Heart
              className={`w-4 h-4 transition-colors stroke-[2] ${
                isFavorite
                  ? 'fill-[#bb0013] text-[#bb0013]'
                  : 'text-[#5e5e5e] hover:text-[#bb0013]'
              }`}
            />
          </button>
        </div>

        {/* ISSUE #XX Subtitle */}
        <p className="font-label text-[11px] font-bold text-[#5e5e5e] uppercase tracking-wider">
          {issueLabel}
        </p>

        {/* Metadata Badges en Recuadros Negros Rectos */}
        <div className="flex items-center gap-2 pt-1 font-label text-[10px] text-[#1a1c1c] font-bold uppercase tracking-wider">
          <span className="border border-[#1a1c1c] px-2 py-0.5 rounded-none bg-[#f3f3f3]">
            {item.anioLanzamiento}
          </span>
          <span className="border border-[#1a1c1c] px-2 py-0.5 rounded-none bg-[#f3f3f3]">
            {item.fase}
          </span>
        </div>
      </div>
    </div>
  );
};
