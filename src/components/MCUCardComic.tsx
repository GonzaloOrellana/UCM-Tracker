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
      className="flex flex-col cursor-pointer select-none group bg-white text-[#1a1c1c] border-2 border-[#1a1c1c] rounded-none p-3 shadow-[4px_4px_0px_#1a1c1c] hover:shadow-[1px_1px_0px_#1a1c1c] hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-150 relative overflow-hidden active:shadow-none active:translate-x-[4px] active:translate-y-[4px]"
    >
      {/* Poster Image Container con Marco de Tinta Negro Estilo Brutalista (Sharp 0) */}
      <div className="relative aspect-[2/3] w-full rounded-none overflow-hidden bg-[#f3f3f3] border-2 border-[#1a1c1c]">
        
        {/* Badge Esquinero Estilo Cómic ("ISSUE #XX") con Efecto Estampado Debossed / Letterpress */}
        <div className="absolute top-2 left-2 z-20 bg-[#bb0013] text-white font-label font-black text-[10px] tracking-widest px-2.5 py-0.5 rounded-none uppercase border-2 border-[#1a1c1c] shadow-[2px_2px_0px_#1a1c1c] comic-letterpress">
          {issueLabel}
        </div>

        {/* Toggle Switch Analógico Mecánico en la esquina superior derecha */}
        <button
          type="button"
          role="switch"
          aria-checked={isWatched}
          onClick={handleCheckboxClick}
          className={`absolute top-2 right-2 z-20 w-9 h-5 rounded-none p-0.5 transition-all cursor-pointer flex items-center shadow-[2px_2px_0px_#1a1c1c] active:shadow-none active:translate-x-[1px] active:translate-y-[1px] ${
            isWatched
              ? 'bg-emerald-600 border-2 border-[#1a1c1c]'
              : 'bg-[#1a1c1c]/70 border-2 border-[#1a1c1c]'
          }`}
          title={isWatched ? 'Marcar como no visto' : 'Marcar como visto'}
        >
          <span
            className={`w-3.5 h-3.5 rounded-none bg-white border border-[#1a1c1c] shadow-[1px_1px_0px_#1a1c1c] transform transition-transform duration-200 flex items-center justify-center ${
              isWatched ? 'translate-x-3.5' : 'translate-x-0'
            }`}
          >
            {isWatched && <Check className="w-2.5 h-2.5 text-emerald-800 stroke-[3.5]" />}
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
            <h4 className="font-display text-[#1a1c1c] text-base sm:text-lg font-bold tracking-tight leading-snug">
              {item.titulo}
            </h4>
          </div>
        )}
      </div>

      {/* Título & Metadata debajo del Poster (Estilo Referencia "CIVIL WAR", "DOCTOR STRANGE") */}
      <div className="mt-3 space-y-1.5">
        <div className="flex items-start justify-between gap-1.5 min-h-[2.4rem]">
          <h3 className="font-display text-[#1a1c1c] text-base sm:text-lg font-bold tracking-tight line-clamp-2 leading-snug flex-1">
            {item.titulo}
          </h3>

          {/* Botón Favorito Heart con Relieve Cómic */}
          <button
            type="button"
            onClick={handleFavoriteClick}
            className="p-1 -mr-1 transition-transform hover:scale-120 active:scale-90 cursor-pointer shrink-0"
            title={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          >
            <Heart
              className={`w-4.5 h-4.5 transition-colors stroke-[2.5] ${
                isFavorite
                  ? 'fill-[#bb0013] text-[#bb0013] drop-shadow-[1px_1px_0px_#1a1c1c]'
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
          <span className="border-2 border-[#1a1c1c] px-2 py-0.5 rounded-none bg-[#f3f3f3] shadow-[1px_1px_0px_#1a1c1c]">
            {item.anioLanzamiento}
          </span>
          <span className="border-2 border-[#1a1c1c] px-2 py-0.5 rounded-none bg-[#f3f3f3] shadow-[1px_1px_0px_#1a1c1c]">
            {item.fase}
          </span>
        </div>
      </div>
    </div>
  );
};
