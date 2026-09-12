import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MCUItem } from '../../types/mcu';
import { getCountdownLabel } from '../../utils/dateUtils';

interface UpcomingCarouselCardProps {
  upcomingItems: MCUItem[];
}

export const UpcomingCarouselCard: React.FC<UpcomingCarouselCardProps> = ({ upcomingItems }) => {
  const scrollUpcomingRef = useRef<HTMLDivElement>(null);

  const scrollContainer = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = direction === 'left' ? -ref.current.clientWidth : ref.current.clientWidth;
      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.35, ease: [0.25, 1, 0.3, 1] }}
      className="md:col-span-1 lg:col-span-6 flex flex-col min-h-0 h-full"
    >
      <div className="tactile-bento-card rounded-2xl sm:rounded-3xl p-3 sm:p-3.5 xl:p-4.5 flex flex-col justify-between h-full min-h-0">
        <div className="flex items-center justify-between shrink-0">
          <h3 className="font-display text-sm sm:text-base xl:text-xl font-bold tracking-tight text-white leading-none">
            Próximos Estrenos
          </h3>

          {upcomingItems.length > 2 && (
            <div className="flex items-center gap-1">
              <button
                onClick={() => scrollContainer(scrollUpcomingRef, 'left')}
                className="w-5 h-5 xl:w-6 xl:h-6 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white flex items-center justify-center cursor-pointer border border-white/10"
                title="Anterior"
              >
                <ChevronLeft className="w-3 h-3 xl:w-3.5 xl:h-3.5 stroke-[2.5]" />
              </button>
              <button
                onClick={() => scrollContainer(scrollUpcomingRef, 'right')}
                className="w-5 h-5 xl:w-6 xl:h-6 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white flex items-center justify-center cursor-pointer border border-white/10"
                title="Siguiente"
              >
                <ChevronRight className="w-3 h-3 xl:w-3.5 xl:h-3.5 stroke-[2.5]" />
              </button>
            </div>
          )}
        </div>

        {/* Posters Track with guaranteed fixed item dimensions preventing WebKit aspect-ratio stretching */}
        <div className="w-full flex items-center overflow-hidden my-auto py-1">
          <div
            ref={scrollUpcomingRef}
            className="flex items-center gap-2 sm:gap-2.5 xl:gap-3 overflow-x-auto no-scrollbar scroll-smooth w-full py-1 snap-x snap-mandatory"
          >
            {upcomingItems.map((item) => (
              <div
                key={item.id}
                className="relative w-[96px] h-[144px] sm:w-[115px] sm:h-[172px] lg:w-[126px] lg:h-[189px] xl:w-[140px] xl:h-[210px] rounded-xl overflow-hidden bg-zinc-900 border border-white/15 shadow-lg shrink-0 cursor-default select-none tactile-poster-frame snap-start"
                title={`Próximo estreno: ${item.titulo} (${getCountdownLabel(item.fechaLanzamiento)})`}
              >
                <img
                  src={item.urlPoster}
                  alt={item.titulo}
                  className="w-full h-full object-cover select-none pointer-events-none"
                  loading="lazy"
                />

                {/* Top Countdown Pill Badge directly on poster */}
                <div className="absolute top-1 inset-x-1 bg-black/85 backdrop-blur-md text-white font-label text-[7px] sm:text-[7.5px] xl:text-[8px] font-bold uppercase tracking-wider py-0.5 px-0.5 rounded-full text-center border border-white/20 shadow truncate pointer-events-none z-10">
                  {getCountdownLabel(item.fechaLanzamiento)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
