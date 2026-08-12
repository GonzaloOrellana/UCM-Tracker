import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useMCU } from '../context/MCUContext';
import { MCUPhase } from '../types/mcu';
import { Search, Filter, X, RotateCcw, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const FilterBar: React.FC = () => {
  const { filters, setFilters, resetFilters, stats } = useMCU();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const phaseList: MCUPhase[] = ['Fase 1', 'Fase 2', 'Fase 3', 'Fase 4', 'Fase 5', 'Fase 6'];

  const hasActiveSecondaryFilters =
    filters.status !== 'all' ||
    filters.phase !== 'all' ||
    filters.order !== 'release';

  // Lock body scroll when side drawer is open
  useEffect(() => {
    if (isFiltersOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isFiltersOpen]);

  // Material Motion transition easing curve
  const transitionEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

  return (
    <>
      <div className="relative mb-6">

        {/* Single Horizontal Capsule Bar (Search on Left, Single Filtros Button on Right) */}
        <div className="bg-white/10 backdrop-blur-2xl rounded-full px-4 py-2 sm:px-5 sm:py-2.5 border border-white/20 shadow-2xl flex items-center justify-between gap-3 text-xs text-white">

          {/* Left Side: Search Input */}
          <div className="flex items-center gap-2.5 flex-1 min-w-0">
            <Search className="w-4 h-4 text-zinc-300 shrink-0" />
            <input
              type="text"
              value={filters.search}
              onChange={(e) => setFilters({ search: e.target.value })}
              placeholder="BUSCAR PRODUCCIONES..."
              className="w-full bg-transparent border-none outline-none text-white placeholder:text-zinc-400 font-label font-bold text-xs sm:text-sm uppercase tracking-wider truncate"
            />
          </div>

          {/* Right Side: Single Filters Button */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={() => setIsFiltersOpen(true)}
              className={`px-4 py-1.5 rounded-full border transition-all cursor-pointer flex items-center gap-2 font-label font-bold text-xs uppercase tracking-wider relative ${isFiltersOpen || hasActiveSecondaryFilters
                  ? 'bg-white text-zinc-950 border-white shadow-md'
                  : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
                }`}
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Filtros</span>
              {hasActiveSecondaryFilters && (
                <span className="w-2 h-2 rounded-full bg-violet-500 shadow-[0_0_8px_rgba(139,92,246,0.8)]" />
              )}
            </button>
          </div>

        </div>

      </div>

      {/* Render Backdrop & Right-to-Left Slide Drawer at document.body level via React Portal with AnimatePresence */}
      {createPortal(
        <AnimatePresence>
          {isFiltersOpen && (
            <div className="relative z-[9999]">
              {/* Backdrop Overlay with Smooth Fade Enter/Exit */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: transitionEase }}
                className="fixed inset-0 bg-black/65 backdrop-blur-md z-[9999] cursor-pointer"
                onClick={() => setIsFiltersOpen(false)}
              />

              {/* Right-to-Left Slide-Over Filter Drawer Panel with Smooth Slide Enter/Exit */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: '0%' }}
                exit={{ x: '100%' }}
                transition={{ duration: 0.35, ease: transitionEase }}
                className="fixed top-0 right-0 bottom-0 w-80 sm:w-96 max-w-[88vw] bg-white/10 backdrop-blur-3xl border-l border-white/20 shadow-2xl z-[10000] flex flex-col overflow-hidden text-white"
              >
                {/* Drawer Header */}
                <div className="pt-6 px-6 pb-3 flex items-center justify-between shrink-0">
                  <h2 className="text-base font-medium text-white tracking-tight">Filtros</h2>
                  <button
                    type="button"
                    onClick={() => setIsFiltersOpen(false)}
                    className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-all cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Drawer Content */}
                <div className="p-6 space-y-6 overflow-y-auto flex-1 text-xs text-white">

                  {/* Section 1: Order Mode */}
                  <div>
                    <label className="font-normal block mb-2.5 text-xs uppercase tracking-widest text-zinc-400">
                      Orden
                    </label>
                    <div className="space-y-2">
                      <button
                        type="button"
                        onClick={() => setFilters({ order: 'release' })}
                        className={`w-full p-3 rounded-2xl border text-left font-normal transition-all flex items-center justify-between cursor-pointer ${filters.order === 'release'
                            ? 'bg-gradient-to-r from-violet-700 via-purple-600 to-indigo-600 text-white border-violet-400/40 shadow-lg shadow-violet-950/60'
                            : 'bg-white/5 hover:bg-white/10 text-zinc-300 border-white/10 backdrop-blur-md'
                          }`}
                      >
                        <span>De Estreno</span>
                        {filters.order === 'release' && <Check className="w-4 h-4 text-white" />}
                      </button>

                      <button
                        type="button"
                        onClick={() => setFilters({ order: 'chronological' })}
                        className={`w-full p-3 rounded-2xl border text-left font-normal transition-all flex items-center justify-between cursor-pointer ${filters.order === 'chronological'
                            ? 'bg-gradient-to-r from-violet-700 via-purple-600 to-indigo-600 text-white border-violet-400/40 shadow-lg shadow-violet-950/60'
                            : 'bg-white/5 hover:bg-white/10 text-zinc-300 border-white/10 backdrop-blur-md'
                          }`}
                      >
                        <span>Cronológico</span>
                        {filters.order === 'chronological' && <Check className="w-4 h-4 text-white" />}
                      </button>
                    </div>
                  </div>

                  {/* Section 2: Watched Status */}
                  <div>
                    <label className="font-normal block mb-2.5 text-xs uppercase tracking-widest text-zinc-400">
                      Vista
                    </label>
                    <div className="grid grid-cols-3 gap-1.5 bg-black/40 backdrop-blur-md p-1.5 rounded-2xl border border-white/10 shadow-inner">
                      <button
                        type="button"
                        onClick={() => setFilters({ status: 'all' })}
                        className={`py-2 rounded-xl font-normal transition-all text-center cursor-pointer ${filters.status === 'all'
                            ? 'bg-gradient-to-r from-violet-700 to-indigo-600 text-white shadow-md border border-violet-400/30'
                            : 'text-zinc-400 hover:text-white'
                          }`}
                      >
                        Todas ({stats.total})
                      </button>

                      <button
                        type="button"
                        onClick={() => setFilters({ status: 'watched' })}
                        className={`py-2 rounded-xl font-normal transition-all text-center cursor-pointer ${filters.status === 'watched'
                            ? 'bg-gradient-to-r from-violet-700 to-indigo-600 text-white shadow-md border border-violet-400/30'
                            : 'text-zinc-400 hover:text-white'
                          }`}
                      >
                        Vistas ({stats.watched})
                      </button>

                      <button
                        type="button"
                        onClick={() => setFilters({ status: 'unwatched' })}
                        className={`py-2 rounded-xl font-normal transition-all text-center cursor-pointer ${filters.status === 'unwatched'
                            ? 'bg-gradient-to-r from-violet-700 to-indigo-600 text-white shadow-md border border-violet-400/30'
                            : 'text-zinc-400 hover:text-white'
                          }`}
                      >
                        Pendientes
                      </button>
                    </div>
                  </div>

                  {/* Section 3: MCU Phase Filter */}
                  <div>
                    <label className="font-normal block mb-2.5 text-xs uppercase tracking-widest text-zinc-400">
                      Fase del MCU
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setFilters({ phase: 'all' })}
                        className={`p-2.5 rounded-xl border text-center font-normal transition-all cursor-pointer ${filters.phase === 'all'
                            ? 'bg-gradient-to-r from-violet-700 via-purple-600 to-indigo-600 text-white border-violet-400/40 shadow-md'
                            : 'bg-white/5 hover:bg-white/10 text-zinc-300 border-white/10 backdrop-blur-md'
                          }`}
                      >
                        Todas
                      </button>
                      {phaseList.map((phase) => (
                        <button
                          key={phase}
                          type="button"
                          onClick={() => setFilters({ phase })}
                          className={`p-2.5 rounded-xl border text-center font-normal transition-all cursor-pointer ${filters.phase === phase
                              ? 'bg-gradient-to-r from-violet-700 via-purple-600 to-indigo-600 text-white border-violet-400/40 shadow-md'
                              : 'bg-white/5 hover:bg-white/10 text-zinc-300 border-white/10 backdrop-blur-md'
                            }`}
                        >
                          {phase}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Optional Reset Action Button */}
                  {hasActiveSecondaryFilters && (
                    <div className="pt-2 border-t border-white/10">
                      <button
                        type="button"
                        onClick={resetFilters}
                        className="w-full py-2.5 text-xs text-violet-400 hover:text-violet-300 font-normal flex items-center justify-center gap-1.5 cursor-pointer bg-white/5 hover:bg-violet-500/10 border border-violet-500/20 rounded-xl transition-all"
                      >
                        <RotateCcw className="w-3.5 h-3.5" /> Limpiar todos los filtros
                      </button>
                    </div>
                  )}

                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};
