import React from 'react';
import { motion } from 'framer-motion';
import { MCUItem } from '../types/mcu';
import { MCUCard } from './MCUCard';
import { SearchX } from 'lucide-react';
import { useMCU } from '../context/MCUContext';

interface MCUGridProps {
  items: MCUItem[];
  onOpenDetail: (item: MCUItem) => void;
}

export const MCUGrid: React.FC<MCUGridProps> = ({ items, onOpenDetail }) => {
  const { resetFilters } = useMCU();

  if (items.length === 0) {
    return (
      <div className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-3xl p-8 sm:p-10 text-center my-10 max-w-md mx-auto space-y-5 shadow-xl animate-fade-in text-zinc-900">
        <div className="w-14 h-14 bg-[#C81D25]/10 border border-[#C81D25]/20 rounded-full flex items-center justify-center mx-auto text-[#C81D25] shadow-xs">
          <SearchX className="w-6 h-6 stroke-[1.75]" />
        </div>

        <div className="space-y-1">
          <h3 className="font-medium text-lg text-zinc-900 tracking-tight">
            No se encontraron producciones
          </h3>
          <p className="text-zinc-600 text-xs font-normal leading-relaxed max-w-xs mx-auto">
            No hay películas o series que coincidan con los filtros aplicados.
          </p>
        </div>

        <div className="flex justify-center pt-1">
          <button
            type="button"
            onClick={resetFilters}
            className="px-6 py-2.5 bg-white/80 hover:bg-white text-zinc-900 border border-white/80 text-xs font-medium rounded-full shadow-xs transition-all cursor-pointer"
          >
            Limpiar Filtros
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.4, ease: 'easeOut' }}
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5"
    >
      {items.map((item) => (
        <MCUCard key={item.id} item={item} onOpenDetail={onOpenDetail} />
      ))}
    </motion.div>
  );
};
