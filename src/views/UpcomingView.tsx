import React from 'react';
import { motion } from 'framer-motion';
import { useMCU } from '../context/MCUContext';

export const UpcomingView: React.FC = () => {
  const { upcomingItems, openDetailModal } = useMCU();

  // Helper to format ISO YYYY-MM-DD to DD/MM/YYYY
  const formatDateDisplay = (dateStr: string) => {
    if (!dateStr) return 'Próximamente';
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return dateStr;
  };

  return (
    <div className="space-y-6">
      
      {/* 6-Column Responsive Grid matching production cards */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, ease: 'easeOut' }}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5"
      >
        {upcomingItems.map((item) => {
          return (
            <div
              key={item.id}
              title={`Aún no estrenada • Disponible el ${formatDateDisplay(item.fechaLanzamiento)}`}
              className="flex flex-col select-none cursor-default"
            >
              {/* Poster Image Container */}
              <div className="relative aspect-[2/3] w-full rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 shadow-lg shadow-black/40">
                <img
                  src={item.urlPoster}
                  alt={item.titulo}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {item.fechaEsExacta === false && (
                  <div className="absolute top-2 right-2 bg-amber-500/90 text-zinc-950 font-bold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full shadow-md backdrop-blur-xs">
                    Estimada
                  </div>
                )}
              </div>

              {/* Title & Metadata Text UNDERNEATH Poster */}
              <div className="mt-2 space-y-0.5 px-0.5">
                <h3 className="text-xs font-bold text-white line-clamp-1">
                  {item.titulo}
                </h3>
                <div className="flex items-center gap-1.5">
                  <p className="text-xs text-white/70 font-semibold truncate">
                    {formatDateDisplay(item.fechaLanzamiento)}
                  </p>
                  {item.fechaEsExacta === false && (
                    <span className="text-[10px] text-amber-400/90 font-medium" title="Fecha de estreno estimada">
                      (Est.)
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </motion.div>

    </div>
  );
};

