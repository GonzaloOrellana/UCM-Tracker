import React, { useEffect } from 'react';
import { MCUItem } from '../types/mcu';
import { useMCU } from '../context/MCUContext';
import { X, Check, Clock, Film, Tv, Sparkles, Edit2, Heart, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DetailModalProps {
  item: MCUItem | null;
  onClose: () => void;
  onEdit: (item: MCUItem) => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({ item, onClose, onEdit }) => {
  const { watchedIds, favoriteIds, ratings, toggleWatched, toggleFavorite, setRating, activeDetailSource } = useMCU();

  const layoutPrefix = activeDetailSource === 'fav' ? 'fav' : 'card';

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const isWatched = item ? watchedIds.has(item.id) : false;
  const isFavorite = item ? favoriteIds.has(item.id) : false;
  const currentRating = item ? ratings[item.id] : undefined;

  const getTypeText = () => {
    if (!item) return '';
    switch (item.tipo) {
      case 'movie':
        return 'Película';
      case 'series':
        return 'Serie';
      case 'special':
        return 'Especial';
    }
  };

  const getTypeIcon = () => {
    if (!item) return null;
    switch (item.tipo) {
      case 'movie':
        return <Film className="w-4 h-4 text-zinc-700" />;
      case 'series':
        return <Tv className="w-4 h-4 text-amber-600" />;
      case 'special':
        return <Sparkles className="w-4 h-4 text-amber-500" />;
    }
  };

  // Material Motion Cubic Easing Curve (350-450ms)
  const transitionEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

  return (
    <AnimatePresence>
      {item && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none">
          
          {/* Backdrop Blur (8-12px) & Soft Darkening Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: transitionEase }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-0 cursor-pointer"
            onClick={onClose}
          />

          {/* Shared Element Container Transform (Expands smoothly from origin card) */}
          <motion.div
            layoutId={`${layoutPrefix}-container-${item.id}`}
            transition={{ duration: 0.4, ease: transitionEase }}
            className="relative z-10 w-full max-w-2xl bg-white border border-zinc-200 rounded-[24px] shadow-2xl flex flex-col sm:flex-row overflow-hidden text-zinc-900 min-h-[380px] sm:min-h-[420px]"
          >
            
            {/* Left Side: Full-height Poster Container (Occupies entire left zone from top to bottom) */}
            <div className="w-full sm:w-[38%] md:w-[40%] relative bg-zinc-900 shrink-0 border-b sm:border-b-0 sm:border-r border-zinc-100 overflow-hidden min-h-[260px] sm:min-h-full">
              <motion.img
                layoutId={`${layoutPrefix}-poster-${item.id}`}
                transition={{ duration: 0.4, ease: transitionEase }}
                src={item.urlPoster}
                alt={item.titulo}
                className="w-full h-full object-cover absolute inset-0"
              />
            </div>

            {/* Right Side: Details & Action Column */}
            <div className="flex-1 flex flex-col justify-between p-5 sm:p-6 bg-white relative z-10 space-y-4">
              
              {/* Top Row: Action Buttons (Favorite, Edit, Close) */}
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.3, delay: 0.43, ease: transitionEase }}
                className="flex items-center justify-end gap-2 shrink-0"
              >
                <button
                  onClick={() => toggleFavorite(item.id)}
                  className="p-1.5 transition-all hover:scale-110 cursor-pointer text-zinc-600 hover:text-rose-600"
                  title={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                >
                  <Heart className={`w-5 h-5 transition-colors ${isFavorite ? 'fill-[#C81D25] text-[#C81D25]' : ''}`} />
                </button>
                <button
                  onClick={() => onEdit(item)}
                  className="p-1.5 text-zinc-600 hover:text-zinc-900 transition-all hover:scale-110 cursor-pointer"
                  title="Editar información"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
                <button
                  onClick={onClose}
                  className="p-1.5 text-zinc-500 hover:text-zinc-900 transition-all hover:scale-110 cursor-pointer ml-1"
                  title="Cerrar"
                >
                  <X className="w-5 h-5 stroke-[2]" />
                </button>
              </motion.div>

              {/* Middle Section: Staggered Content Details */}
              <div className="space-y-3 sm:space-y-3.5 my-auto">
                
                {/* Stagger 1: Title */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.3, delay: 0.18, ease: transitionEase }}
                >
                  <h2 className="text-xl sm:text-2xl font-normal text-zinc-900 leading-tight tracking-tight">
                    {item.titulo}
                  </h2>
                  {item.tituloOriginal && item.tituloOriginal !== item.titulo && (
                    <p className="text-xs text-zinc-500 italic mt-0.5 font-medium">
                      {item.tituloOriginal}
                    </p>
                  )}
                </motion.div>

                {/* Stagger 2: Phase, Type, Release Year & Duration */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.3, delay: 0.23, ease: transitionEase }}
                  className="flex items-center flex-wrap gap-x-2.5 gap-y-1 text-xs text-zinc-700 font-medium"
                >
                  <span className="font-normal text-zinc-900 uppercase tracking-wider">
                    {item.fase}
                  </span>
                  <span className="text-zinc-300">•</span>
                  <span className="flex items-center gap-1.5 text-zinc-800">
                    {getTypeIcon()}
                    <span>{getTypeText()}</span>
                  </span>
                  <span className="text-zinc-300">•</span>
                  <span className="font-normal text-zinc-800">{item.anioLanzamiento}</span>
                  {item.duracion && (
                    <>
                      <span className="text-zinc-300">•</span>
                      <span className="flex items-center gap-1 font-normal text-zinc-800">
                        <Clock className="w-3.5 h-3.5 text-[#C81D25]" /> {item.duracion}
                      </span>
                    </>
                  )}
                </motion.div>

                {/* Stagger 3: Main Character */}
                {item.personajePrincipal && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.3, delay: 0.28, ease: transitionEase }}
                  >
                    <span className="text-[10px] text-zinc-500 uppercase font-medium tracking-wider block mb-0.5">
                      Personaje Principal:
                    </span>
                    <p className="text-xs font-normal text-zinc-900">
                      {item.personajePrincipal}
                    </p>
                  </motion.div>
                )}

                {/* Stagger 4: Synopsis */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.3, delay: 0.33, ease: transitionEase }}
                >
                  <h3 className="text-[10px] text-zinc-500 uppercase font-medium tracking-wider mb-1">
                    Sinopsis
                  </h3>
                  <p className="text-xs text-zinc-700 leading-relaxed font-normal">
                    {item.resumen || 'Sin descripción disponible.'}
                  </p>
                </motion.div>

                {/* Stagger 5: Rating Selector (1 to 10 inside Parent Pill Container) */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.3, delay: 0.36, ease: transitionEase }}
                  className="space-y-1.5 pt-1"
                >
                  <div className="flex items-center justify-between px-0.5">
                    <span className="text-[10px] text-zinc-500 uppercase font-medium tracking-wider flex items-center gap-1">
                      <span>Tu Puntuación:</span>
                      {currentRating !== undefined && (
                        <span className="text-amber-600 font-bold text-xs flex items-center gap-0.5 ml-1">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                          <span>{currentRating}/10</span>
                        </span>
                      )}
                    </span>
                    {currentRating !== undefined && (
                      <button
                        type="button"
                        onClick={() => setRating(item.id, null)}
                        className="text-[10px] text-zinc-400 hover:text-red-500 font-medium transition-colors cursor-pointer"
                      >
                        Quitar nota
                      </button>
                    )}
                  </div>

                  {/* Parent Pill Container */}
                  <div className="relative bg-zinc-100/90 border border-zinc-200/90 rounded-full p-1 flex items-center justify-between gap-0.5 shadow-inner">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
                      const isSelected = currentRating === num;
                      return (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setRating(item.id, isSelected ? null : num)}
                          className="relative flex-1 h-7 text-xs cursor-pointer flex items-center justify-center transition-colors select-none z-10"
                          title={`Puntuar con ${num}`}
                        >
                          {isSelected && (
                            <motion.div
                              layoutId="activeRatingPill"
                              className="absolute inset-0 bg-amber-400 rounded-full shadow-xs -z-10"
                              transition={{
                                type: 'spring',
                                stiffness: 400,
                                damping: 30,
                                mass: 0.8
                              }}
                            />
                          )}
                          <span className={isSelected ? 'text-zinc-950 font-bold' : 'text-zinc-600 hover:text-zinc-900 font-medium'}>
                            {num}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>

              </div>

              {/* Bottom Row: Stagger 5 - Watched Toggle (Footer) */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.3, delay: 0.38, ease: transitionEase }}
                className="flex items-center justify-end shrink-0 pt-2 border-t border-zinc-100"
              >
                <div
                  onClick={() => toggleWatched(item.id)}
                  className="flex items-center gap-3 cursor-pointer select-none"
                >
                  <span className="text-xs font-normal text-zinc-900">
                    {isWatched ? 'Visto' : 'Marcar como visto'}
                  </span>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={isWatched}
                    className={`w-11 h-6 rounded-full transition-colors p-1 cursor-pointer flex items-center ${
                      isWatched ? 'bg-emerald-500' : 'bg-zinc-200 border border-zinc-300'
                    }`}
                    title={isWatched ? 'Marcar como no visto' : 'Marcar como visto'}
                  >
                    <span
                      className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform duration-200 flex items-center justify-center ${
                        isWatched ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    >
                      {isWatched && <Check className="w-2.5 h-2.5 text-emerald-600 stroke-[3]" />}
                    </span>
                  </button>
                </div>
              </motion.div>

            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
