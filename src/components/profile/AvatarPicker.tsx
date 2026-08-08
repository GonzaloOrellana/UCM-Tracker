import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AVAILABLE_AVATARS } from '../../data/avatars';
import { Check, ShieldCheck, X } from 'lucide-react';

interface AvatarPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentAvatarId?: string;
  onSelectAvatar: (avatarId: string) => void;
  isLoggedIn?: boolean;
}

export const AvatarPickerModal: React.FC<AvatarPickerModalProps> = ({
  isOpen,
  onClose,
  currentAvatarId,
  onSelectAvatar,
  isLoggedIn,
}) => {
  if (!isOpen) return null;

  // Mouse Drag-to-Scroll State References
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const hasDraggedRef = useRef(false);

  // Extract unique category names in order of appearance
  const categories = Array.from(new Set(AVAILABLE_AVATARS.map((a) => a.category)));

  // Intercept vertical mouse wheel over horizontal scroll rows
  const handleCategoryWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    if (!container) return;

    const hasHorizontalOverflow = container.scrollWidth > container.clientWidth;
    if (!hasHorizontalOverflow) return;

    if (e.deltaY !== 0) {
      const isScrollEnd =
        e.deltaY > 0
          ? container.scrollLeft + container.clientWidth >= container.scrollWidth - 2
          : container.scrollLeft <= 2;

      if (!isScrollEnd) {
        container.scrollLeft += e.deltaY * 0.8;
      }
    }
  };

  // Mouse Drag Handlers for Netflix-Style Horizontal Rows
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    startXRef.current = e.pageX - container.offsetLeft;
    scrollLeftRef.current = container.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDraggingRef.current = false;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const container = e.currentTarget;
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    if (Math.abs(walk) > 5) {
      hasDraggedRef.current = true;
    }
    container.scrollLeft = scrollLeftRef.current - walk;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto pointer-events-auto">
          {/* Backdrop Click to Close */}
          <div
            className="absolute inset-0 cursor-pointer"
            onClick={onClose}
            aria-label="Cerrar modal"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative z-10 w-full max-w-3xl max-h-[85vh] flex flex-col bg-[#1e2238] border border-white/20 rounded-3xl p-5 sm:p-6 shadow-2xl text-left"
          >
            {/* Header */}
            <div className="flex items-start justify-between border-b border-white/15 pb-3 mb-4 shrink-0">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <span>Elegí tu Personaje de Marvel</span>
                </h2>
                <p className="text-xs text-zinc-300 mt-0.5 font-normal">
                  Hacé click en un personaje para actualizar tu avatar.
                  {isLoggedIn && (
                    <span className="text-emerald-400 font-medium inline-flex items-center gap-1 ml-2">
                      <ShieldCheck className="w-3.5 h-3.5" /> Se sincronizará en todos tus dispositivos
                    </span>
                  )}
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-1.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl transition-all cursor-pointer"
                title="Cerrar"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Categorized Avatar Rows (Netflix Style without visible scrollbars) */}
            <div className="flex-1 overflow-y-auto space-y-6 pr-1 select-none">
              {categories.map((category) => {
                const categoryAvatars = AVAILABLE_AVATARS.filter((a) => a.category === category);
                return (
                  <div key={category} className="space-y-2 w-full min-w-0">
                    {/* Category Title (Netflix Style Uppercase Header) */}
                    <h3 className="text-xs font-bold tracking-wider text-zinc-300 uppercase flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C81D25]" />
                      <span>{category}</span>
                    </h3>

                    {/* Horizontal Scrollable Row with Mouse Drag-to-Scroll */}
                    <div
                      onWheel={handleCategoryWheel}
                      onMouseDown={handleMouseDown}
                      onMouseLeave={handleMouseLeave}
                      onMouseUp={handleMouseUp}
                      onMouseMove={handleMouseMove}
                      className="flex items-center gap-3 overflow-x-auto flex-nowrap w-full min-w-0 py-1.5 px-1 touch-pan-x cursor-grab active:cursor-grabbing"
                    >
                      {categoryAvatars.map((avatar) => {
                        const isSelected = currentAvatarId === avatar.id;
                        return (
                          <button
                            key={avatar.id}
                            type="button"
                            onClick={(e) => {
                              if (hasDraggedRef.current) {
                                e.stopPropagation();
                                return;
                              }
                              onSelectAvatar(avatar.id);
                              onClose();
                            }}
                            title={avatar.name}
                            className={`relative group shrink-0 w-14 h-14 sm:w-16 sm:h-16 aspect-square rounded-full overflow-hidden cursor-pointer transition-all duration-200 focus:outline-none ${
                              isSelected
                                ? 'ring-2 ring-red-500 ring-offset-2 ring-offset-[#1b1e32] scale-105 shadow-xl z-10'
                                : 'opacity-70 hover:opacity-100 hover:scale-105 border border-white/10 hover:border-white/30'
                            }`}
                          >
                            <img
                              src={avatar.url}
                              alt={avatar.name}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 rounded-full pointer-events-none"
                              loading="lazy"
                            />

                            {/* Overlay with hero name on hover */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-1 px-1 rounded-full pointer-events-none">
                              <span className="text-[8px] sm:text-[9px] font-medium text-white text-center leading-tight truncate w-full px-0.5">
                                {avatar.name}
                              </span>
                            </div>

                            {/* Check badge when selected */}
                            {isSelected && (
                              <div className="absolute top-0 right-0 w-4 h-4 rounded-full bg-[#C81D25] text-white flex items-center justify-center shadow-md border border-[#1b1e32] z-20 pointer-events-none">
                                <Check className="w-2.5 h-2.5 stroke-[3]" />
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
