import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowUpRight, Calendar, Sparkles } from 'lucide-react';
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
      staggerChildren: 0.14,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 15, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
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

const getCountdownLabel = (dateStr: string) => {
  if (!dateStr) return 'Próximamente';
  const target = new Date(dateStr + 'T00:00:00');
  const now = new Date();
  const diff = target.getTime() - now.getTime();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  
  if (isNaN(days)) return 'Próximamente';
  if (days <= 0) return 'Disponible';
  if (days === 1) return '¡Mañana!';
  if (days <= 45) return `En ${days} días`;
  const months = Math.round(days / 30.4);
  if (months <= 12) return `En ${months} meses`;
  const years = (days / 365.25).toFixed(1);
  return `En ~${years} años`;
};

const UpcomingCard: React.FC<{ item: MCUItem; onClick?: () => void }> = ({ item, onClick }) => {
  const [imageError, setImageError] = useState(false);
  const isUnreleased = !item.fechaLanzamiento || item.fechaLanzamiento > new Date().toISOString().split('T')[0];
  const countdownText = getCountdownLabel(item.fechaLanzamiento);
  const tooltipText = isUnreleased
    ? `Aún no estrenada - ${countdownText} (${formatDateDisplay(item.fechaLanzamiento)})`
    : item.titulo;

  return (
    <motion.div
      variants={cardVariants}
      onClick={isUnreleased ? undefined : onClick}
      title={tooltipText}
      className={`flex flex-col select-none shrink-0 w-28 sm:w-32 snap-start group/upcoming ${
        isUnreleased ? 'cursor-not-allowed opacity-90' : 'cursor-pointer'
      }`}
    >
      {/* Poster Image Box with Countdown Badge */}
      <div className={`relative aspect-[2/3] w-full rounded-2xl overflow-hidden bg-zinc-900 border border-white/15 shadow-md shadow-black/50 transition-all duration-300 ${
        isUnreleased ? 'group-hover/upcoming:border-marvel-red/40' : 'group-hover/upcoming:shadow-2xl group-hover/upcoming:border-white/40 group-hover/upcoming:scale-[1.02]'
      }`}>
        {!imageError ? (
          <img
            src={item.urlPoster}
            alt={item.titulo}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover/upcoming:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-[#1A1A1A] p-2 flex flex-col justify-center text-center text-white">
            <h4 className="font-medium text-[11px] leading-snug">
              {item.titulo}
            </h4>
          </div>
        )}

        {/* Dynamic Countdown Floating Chip */}
        <div className="absolute top-2 right-2 z-10 bg-black/75 backdrop-blur-md text-amber-300 font-label text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border border-amber-400/40 shadow-md">
          {countdownText}
        </div>

        {/* Phase Chip Bottom Left */}
        <div className="absolute bottom-2 left-2 z-10 bg-black/70 backdrop-blur-md text-white/90 font-label text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md border border-white/20">
          {item.fase}
        </div>
      </div>

      {/* Title & Release Date Below Poster */}
      <div className="mt-2 space-y-0.5 px-0.5">
        <h4 className="font-display text-xs sm:text-sm uppercase tracking-wide leading-tight text-white line-clamp-1 group-hover/upcoming:text-marvel-red transition-colors">
          {item.titulo}
        </h4>
        <div className="flex items-center gap-1 font-label text-[10px] text-zinc-400 font-semibold uppercase tracking-wider truncate">
          <span>{formatDateDisplay(item.fechaLanzamiento)}</span>
          {item.fechaEsExacta === false && (
            <span className="text-amber-400 font-normal ml-0.5">(Est.)</span>
          )}
        </div>
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
    <div className="crextio-dark-card p-5 sm:p-6 lg:p-7 flex flex-col justify-between border border-white/15 hover:border-white/25 transition-all">
      
      {/* Header Row: Title + Controls & Expand Button */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-marvel-red/20 border border-marvel-red/40 flex items-center justify-center text-marvel-red">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-display text-xl sm:text-2xl uppercase tracking-wider text-white leading-none">
              PRÓXIMOS ESTRENOS DEL MCU
            </h3>
            <p className="font-label text-[10px] sm:text-[11px] text-zinc-300 font-bold uppercase tracking-wider mt-0.5">
              RADAR DEL MULTIVERSO ({upcomingItems.length} PRODUCCIONES PROGRAMADAS)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Scroll Navigation Arrows */}
          <button
            onClick={() => scroll('left')}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer border border-white/15"
            title="Anterior"
          >
            <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer border border-white/15"
            title="Siguiente"
          >
            <ChevronRight className="w-4 h-4 stroke-[2.5]" />
          </button>

          {/* Expand to View All Button */}
          {onNavigateToUpcoming && (
            <button
              onClick={onNavigateToUpcoming}
              className="h-8 px-3 rounded-full bg-gradient-to-r from-[#C81D25] to-[#E62429] hover:brightness-110 text-white flex items-center gap-1.5 transition-all cursor-pointer shadow-md ml-1 font-label text-xs font-bold uppercase tracking-wider"
              title="Ver calendario completo de estrenos"
            >
              <span>VER TODOS</span>
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          )}
        </div>
      </div>

      {/* Uniform Carousel Cards Track (100% Width) */}
      <div className="overflow-hidden rounded-xl pt-1">
        <motion.div
          ref={scrollContainerRef}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-20px' }}
          className="flex gap-4 sm:gap-5 overflow-x-auto snap-x snap-mandatory pb-2 pt-1 scroll-smooth no-scrollbar"
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
