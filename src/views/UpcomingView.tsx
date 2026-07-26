import React from 'react';
import { motion } from 'framer-motion';
import { INITIAL_UPCOMING_RELEASES } from '../data/upcomingData';

export const UpcomingView: React.FC = () => {
  return (
    <div className="space-y-6">
      
      {/* 6-Column Responsive Grid matching production cards */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, ease: 'easeOut' }}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5"
      >
        {INITIAL_UPCOMING_RELEASES.map((item) => (
          <div
            key={item.id}
            className="flex flex-col select-none group cursor-pointer"
          >
            {/* Poster Image Container matching production card size */}
            <div className="relative aspect-[2/3] w-full rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 shadow-lg shadow-black/40 group-hover:shadow-2xl group-hover:shadow-black/60 transition-all duration-300">
              <img
                src={item.urlPoster}
                alt={item.titulo}
                className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
                loading="lazy"
              />
            </div>

            {/* Title & Metadata Text UNDERNEATH Poster */}
            <div className="mt-2 space-y-0.5 px-0.5">
              <h3 className="text-xs font-bold text-white line-clamp-1">
                {item.titulo}
              </h3>
              <p className="text-xs text-white/70 font-semibold truncate">
                {item.fechaLanzamiento ? item.fechaLanzamiento : 'Próximamente'}
              </p>
            </div>

          </div>
        ))}
      </motion.div>

    </div>
  );
};
