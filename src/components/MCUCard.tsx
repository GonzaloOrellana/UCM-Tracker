import React, { useState } from 'react';
import { MCUItem } from '../types/mcu';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

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

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleWatched(item.id);
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

        {/* Priority Badge in Top Left Corner */}
        {item.prioridad && (
          <div
            title={
              item.prioridad === 'esencial'
                ? '🔥 Esencial: Sin esto perdés una parte importante de la experiencia.'
                : item.prioridad === 'recomendada'
                ? '🟢 Recomendada: Importante para personajes o historia.'
                : item.prioridad === 'complementaria'
                ? '🟡 Complementaria: Aporta contexto, pero no es fundamental.'
                : '⚪ Opcional: Principalmente para completar el universo.'
            }
            className={`absolute top-2.5 left-2.5 z-20 h-[22px] w-[22px] sm:group-hover:w-auto p-0 sm:group-hover:px-2 flex items-center justify-center gap-1 rounded-full text-[8.5px] font-sans font-bold tracking-tight uppercase tactile-priority-pill transition-all duration-300 max-w-[calc(100%-3rem)] ${
              item.prioridad === 'esencial'
                ? 'tactile-priority-esencial'
                : item.prioridad === 'recomendada'
                ? 'tactile-priority-recomendada'
                : item.prioridad === 'complementaria'
                ? 'tactile-priority-complementaria'
                : 'tactile-priority-opcional'
            }`}
          >
            <span className="text-[11px] leading-none flex items-center justify-center shrink-0">
              {item.prioridad === 'esencial' ? '🔥' : item.prioridad === 'recomendada' ? '🟢' : item.prioridad === 'complementaria' ? '🟡' : '⚪'}
            </span>
            <span className="hidden sm:group-hover:inline transition-all duration-200 truncate">
              {item.prioridad === 'esencial' ? 'Esencial' : item.prioridad === 'recomendada' ? 'Recomendada' : item.prioridad === 'complementaria' ? 'Complementaria' : 'Opcional'}
            </span>
          </div>
        )}

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

