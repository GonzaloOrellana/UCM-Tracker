import React, { useEffect, useRef, useState, useCallback } from 'react';
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

  const synopsisRef = useRef<HTMLDivElement>(null);
  const [hasMoreContent, setHasMoreContent] = useState(false);

  const checkSynopsisScroll = useCallback(() => {
    const el = synopsisRef.current;
    if (!el) return;
    const hasScrollableOverflow = el.scrollHeight > el.clientHeight;
    const isScrolledToBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 2;
    setHasMoreContent(hasScrollableOverflow && !isScrolledToBottom);
  }, []);

  // Recalculate scroll and fade when item changes or modal mounts
  useEffect(() => {
    if (item && synopsisRef.current) {
      synopsisRef.current.scrollTop = 0;
      checkSynopsisScroll();
      const timer1 = setTimeout(checkSynopsisScroll, 50);
      const timer2 = setTimeout(checkSynopsisScroll, 450);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [item, checkSynopsisScroll]);

  // Recalculate on window resize
  useEffect(() => {
    window.addEventListener('resize', checkSynopsisScroll);
    return () => window.removeEventListener('resize', checkSynopsisScroll);
  }, [checkSynopsisScroll]);

  // Body scroll lock with exact scroll position preservation (prevents background touch/wheel scrolling)
  useEffect(() => {
    if (!item) return;

    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    const originalOverflow = document.body.style.overflow;
    const originalPosition = document.body.style.position;
    const originalTop = document.body.style.top;
    const originalWidth = document.body.style.width;
    const originalPaddingRight = document.body.style.paddingRight;

    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.position = originalPosition;
      document.body.style.top = originalTop;
      document.body.style.width = originalWidth;
      document.body.style.paddingRight = originalPaddingRight;
      window.scrollTo(0, scrollY);
    };
  }, [item]);

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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 select-none overflow-hidden">
          
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
            className="relative z-10 w-full max-w-2xl bg-white border border-zinc-200 rounded-[24px] shadow-2xl flex flex-col sm:flex-row overflow-hidden text-zinc-900 min-h-0 sm:min-h-[380px] max-h-[min(92vh,560px)] sm:max-h-[min(85vh,500px)] my-auto"
          >
            
            {/* Left Side: Full-height Poster Container (Occupies entire left zone from top to bottom) */}
            <div className="w-full sm:w-[38%] md:w-[40%] relative bg-zinc-900 shrink-0 border-b sm:border-b-0 sm:border-r border-zinc-100 overflow-hidden h-[135px] max-h-[140px] sm:h-auto sm:min-h-full sm:max-h-none">
              <motion.img
                layoutId={`${layoutPrefix}-poster-${item.id}`}
                transition={{ duration: 0.4, ease: transitionEase }}
                src={item.urlPoster}
                alt={item.titulo}
                className="w-full h-full object-cover absolute inset-0"
              />
            </div>

            {/* Right Side: Details & Action Column */}
            <div className="flex-1 flex flex-col justify-between p-3.5 sm:p-5 md:p-6 bg-white relative z-10 space-y-2 sm:space-y-3 overflow-y-auto custom-scrollbar">
              
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
              <div className="space-y-2 sm:space-y-2.5 my-auto">
                
                {/* Stagger 1: Title */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.3, delay: 0.18, ease: transitionEase }}
                >
                  <h2 className="font-display text-xl sm:text-3xl uppercase tracking-wider text-zinc-900 leading-none">
                    {item.titulo}
                  </h2>
                  {item.tituloOriginal && item.tituloOriginal !== item.titulo && (
                    <p className="font-body text-[11px] sm:text-xs text-zinc-500 italic mt-0.5 sm:mt-1 font-medium">
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
                  className="flex items-center flex-wrap gap-x-2.5 gap-y-1 font-label text-xs text-zinc-700 font-bold uppercase tracking-wider"
                >
                  <span className="text-[#C81D25] uppercase tracking-wider font-bold">
                    {item.fase}
                  </span>
                  <span className="text-zinc-300">•</span>
                  <span className="flex items-center gap-1.5 text-zinc-800">
                    {getTypeIcon()}
                    <span>{getTypeText()}</span>
                  </span>
                  <span className="text-zinc-300">•</span>
                  <span className="font-bold text-zinc-800">{item.anioLanzamiento}</span>
                  {item.duracion && (
                    <>
                      <span className="text-zinc-300">•</span>
                      <span className="flex items-center gap-1 font-bold text-zinc-800">
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
                  <div className="relative">
                    <div
                      ref={synopsisRef}
                      onScroll={checkSynopsisScroll}
                      className="max-h-[65px] sm:max-h-[90px] overflow-y-auto pr-1.5 text-xs text-zinc-700 leading-relaxed font-normal custom-scrollbar select-text"
                    >
                      {item.resumen || 'Sin descripción disponible.'}
                    </div>
                    <div
                      className={`pointer-events-none absolute bottom-0 left-0 right-0 h-3.5 bg-gradient-to-t from-white via-white/80 to-transparent transition-opacity duration-200 ${
                        hasMoreContent ? 'opacity-100' : 'opacity-0'
                      }`}
                      aria-hidden="true"
                    />
                  </div>
                </motion.div>

                {/* Stagger 5: Rating Selector (1 to 10 inside Parent Pill Container) */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.3, delay: 0.36, ease: transitionEase }}
                  className="space-y-1 sm:space-y-1.5 pt-0.5 sm:pt-1"
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
                  <div className="relative bg-zinc-100 border border-zinc-200/90 rounded-full p-1 flex items-center justify-between gap-0.5 shadow-[inset_0_2px_4px_rgba(0,0,0,0.12)]">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
                      const isSelected = currentRating === num;
                      return (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setRating(item.id, isSelected ? null : num)}
                          className="relative flex-1 h-6 sm:h-7 text-[11px] sm:text-xs cursor-pointer flex items-center justify-center transition-colors select-none z-10"
                          title={`Puntuar con ${num}`}
                        >
                          {isSelected && (
                            <motion.div
                              layoutId="activeRatingPill"
                              className="absolute inset-0 rating-pill-crystal rounded-full -z-10"
                              transition={{
                                type: 'spring',
                                stiffness: 400,
                                damping: 30,
                                mass: 0.8
                              }}
                            />
                          )}
                          <span className={isSelected ? 'text-zinc-950 font-bold drop-shadow-2xs' : 'text-zinc-600 hover:text-zinc-900 font-medium'}>
                            {num}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>

              </div>

              {/* Bottom Row: Stagger 5 - Watched Toggle with Mechanical Hardware Switch (Footer) */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.3, delay: 0.38, ease: transitionEase }}
                className="flex items-center justify-end shrink-0 pt-1.5 sm:pt-2 border-t border-zinc-100"
              >
                <div
                  onClick={() => toggleWatched(item.id)}
                  className="flex items-center gap-3 cursor-pointer select-none group/toggle"
                >
                  <span className="text-xs font-semibold text-zinc-900 group-hover/toggle:text-[#C81D25] transition-colors">
                    {isWatched ? 'Visto' : 'Marcar como visto'}
                  </span>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={isWatched}
                    className={`w-11 h-6 rounded-full p-0.5 transition-all duration-200 cursor-pointer flex items-center active:scale-90 ${
                      isWatched
                        ? 'tactile-switch-active'
                        : 'tactile-switch-well'
                    }`}
                    title={isWatched ? 'Marcar como no visto' : 'Marcar como visto'}
                  >
                    <span
                      className={`w-5 h-5 rounded-full tactile-switch-thumb transform transition-transform duration-200 flex items-center justify-center ${
                        isWatched ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    >
                      {isWatched && <Check className="w-3 h-3 text-emerald-800 stroke-[3.5]" />}
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
