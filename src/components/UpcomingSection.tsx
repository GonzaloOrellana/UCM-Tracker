import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import { MCUItem } from '../types/mcu';
import { useMCU } from '../context/MCUContext';

interface UpcomingSectionProps {
  onNavigateToUpcoming?: () => void;
}

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 1.1,
      ease: [0.25, 1, 0.3, 1] as const,
    },
  },
};

const formatDateDisplay = (dateStr: string) => {
  if (!dateStr) return 'Próximamente';
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }
  return dateStr;
};

const UpcomingCard: React.FC<{ item: MCUItem; onClick?: () => void }> = ({ item, onClick }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      variants={cardVariants}
      onClick={onClick}
      className="flex flex-col select-none shrink-0 w-24 sm:w-28 snap-start group/upcoming cursor-pointer"
    >
      {/* Clean Poster Image Box */}
      <div className="relative aspect-[2/3] w-full rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 shadow-md shadow-black/40 group-hover/upcoming:shadow-xl group-hover/upcoming:border-white/30 transition-all duration-300">
        {!imageError ? (
          <img
            src={item.urlPoster}
            alt={item.titulo}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover/upcoming:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-[#1A1A1A] p-2 flex flex-col justify-center text-center text-white">
            <h4 className="font-medium text-[11px] leading-snug">
              {item.titulo}
            </h4>
          </div>
        )}
      </div>

      {/* Title & Release Date Below Poster */}
      <div className="mt-2 space-y-0.5 px-0.5">
        <h4 className="text-[11px] font-medium text-white line-clamp-2 leading-snug group-hover/upcoming:text-red-400 transition-colors">
          {item.titulo}
        </h4>
        <p className="text-[10px] text-zinc-300 font-medium truncate">
          <span className="truncate">{formatDateDisplay(item.fechaLanzamiento)}</span>
          {item.fechaEsExacta === false && (
            <span className="text-[9px] text-amber-400 font-normal ml-1">(Est.)</span>
          )}
        </p>
      </div>
    </motion.div>
  );
};

export const UpcomingSection: React.FC<UpcomingSectionProps> = ({ onNavigateToUpcoming }) => {
  const { upcomingItems, openDetailModal } = useMCU();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const containerWidth = scrollContainerRef.current.clientWidth;
      const scrollAmount = direction === 'left' ? -containerWidth * 0.75 : containerWidth * 0.75;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="crextio-dark-card p-5 sm:p-6 flex flex-col justify-between">
      
      {/* Header Row: Title + Controls & Expand Button */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-medium text-white text-base sm:text-lg tracking-tight">
            Próximos Estrenos del UCM
          </h3>
        </div>

        <div className="flex items-center gap-2">
          {/* Scroll Navigation Arrows */}
          <button
            onClick={() => scroll('left')}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer border border-white/10"
            title="Anterior"
          >
            <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer border border-white/10"
            title="Siguiente"
          >
            <ChevronRight className="w-4 h-4 stroke-[2.5]" />
          </button>

          {/* Expand to View All Button */}
          {onNavigateToUpcoming && (
            <button
              onClick={onNavigateToUpcoming}
              className="w-8 h-8 rounded-full bg-[#C81D25] hover:bg-[#b0171e] text-white flex items-center justify-center transition-all cursor-pointer shadow-xs ml-1 font-medium"
              title="Ver todos los estrenos"
            >
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          )}
        </div>
      </div>

      {/* Uniform Carousel Cards Track (100% Width) */}
      <div className="overflow-hidden rounded-xl">
        <motion.div
          ref={scrollContainerRef}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-20px' }}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-1 pt-0.5 scroll-smooth no-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {upcomingItems.map((item) => (
            <UpcomingCard key={item.id} item={item} onClick={() => openDetailModal(item)} />
          ))}
        </motion.div>
      </div>

    </div>
  );
};


