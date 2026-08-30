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

        {/* Single Horizontal Capsule Bar with Sunken Well Neumorphic Depth */}
        <div className="neu-sunken-well rounded-full px-4 py-2 sm:px-5 sm:py-2.5 flex items-center justify-between gap-3 text-xs text-white">

          {/* Left Side: Search Input */}
          <div className="flex items-center gap-2.5 flex-1 min-w-0">
            <Search className="w-4 h-4 text-zinc-400 shrink-0" />
            <input
              type="text"
              value={filters.search}
              onChange={(e) => setFilters({ search: e.target.value })}
              placeholder="BUSCAR PRODUCCIONES..."
              className="w-full bg-transparent border-none outline-none text-white placeholder:text-zinc-500 font-label font-bold text-xs sm:text-sm uppercase tracking-wider truncate"
            />
          </div>

          {/* Right Side: Single Tactile Extruded Filters Button */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={() => setIsFiltersOpen(true)}
              className={`px-4 py-1.5 rounded-full cursor-pointer flex items-center gap-2 font-label font-bold text-xs uppercase tracking-wider relative transition-all ${
                isFiltersOpen || hasActiveSecondaryFilters
                  ? 'neu-pill-button-active'
                  : 'neu-pill-button text-white'
              }`}
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Filtros</span>
              {hasActiveSecondaryFilters && (
                <span className="w-2 h-2 rounded-full bg-marvel-red shadow-[0_0_6px_rgba(200,29,37,0.8)]" />
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
                className="fixed inset-0 bg-black/70 backdrop-blur-md z-[9999] cursor-pointer"
                onClick={() => setIsFiltersOpen(false)}
              />

              {/* Right-to-Left Slide-Over Filter Drawer Panel with Smooth Slide Enter/Exit */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: '0%' }}
                exit={{ x: '100%' }}
                transition={{ duration: 0.35, ease: transitionEase }}
                className="fixed top-0 right-0 bottom-0 w-80 sm:w-96 max-w-[88vw] tactile-bento-card border-l border-white/20 shadow-2xl z-[10000] flex flex-col overflow-hidden text-white rounded-none sm:rounded-l-3xl"
              >
                {/* Drawer Header */}
                <div className="pt-6 px-6 pb-3 flex items-center justify-between shrink-0 border-b border-white/10">
                  <h2 className="text-base font-display text-white uppercase tracking-wider">Filtros de Búsqueda</h2>
                  <button
                    type="button"
                    onClick={() => setIsFiltersOpen(false)}
                    className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-all cursor-pointer active:scale-95"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Drawer Content */}
                <div className="p-6 space-y-6 overflow-y-auto flex-1 text-xs text-white">

                  {/* Section 1: Order Mode */}
                  <div>
                    <label className="font-label font-bold block mb-2.5 text-[11px] uppercase tracking-wider text-zinc-400">
                      Orden
                    </label>
                    <div className="space-y-2">
                      <button
                        type="button"
                        onClick={() => setFilters({ order: 'release' })}
                        className={`w-full p-3 rounded-2xl border text-left font-medium transition-all flex items-center justify-between cursor-pointer ${
                          filters.order === 'release'
                            ? 'bg-gradient-to-r from-red-700 via-rose-600 to-red-800 text-white border-red-400/40 shadow-lg shadow-red-950/60 border-t-white/40'
                            : 'bg-white/5 hover:bg-white/10 text-zinc-300 border-white/10 backdrop-blur-md'
                        }`}
                      >
                        <span>De Estreno</span>
                        {filters.order === 'release' && <Check className="w-4 h-4 text-white stroke-[2.5]" />}
                      </button>

                      <button
                        type="button"
                        onClick={() => setFilters({ order: 'chronological' })}
                        className={`w-full p-3 rounded-2xl border text-left font-medium transition-all flex items-center justify-between cursor-pointer ${
                          filters.order === 'chronological'
                            ? 'bg-gradient-to-r from-red-700 via-rose-600 to-red-800 text-white border-red-400/40 shadow-lg shadow-red-950/60 border-t-white/40'
                            : 'bg-white/5 hover:bg-white/10 text-zinc-300 border-white/10 backdrop-blur-md'
                        }`}
                      >
                        <span>Cronológico</span>
                        {filters.order === 'chronological' && <Check className="w-4 h-4 text-white stroke-[2.5]" />}
                      </button>
                    </div>
                  </div>

                  {/* Section 2: Watched Status */}
                  <div>
                    <label className="font-label font-bold block mb-2.5 text-[11px] uppercase tracking-wider text-zinc-400">
                      Vista
                    </label>
                    <div className="grid grid-cols-3 gap-1.5 bg-[#080911] p-1.5 rounded-2xl border border-white/10 shadow-inner">
                      <button
                        type="button"
                        onClick={() => setFilters({ status: 'all' })}
                        className={`py-2 rounded-xl font-bold font-label uppercase tracking-wider text-[10px] transition-all text-center cursor-pointer ${
                          filters.status === 'all'
                            ? 'bg-gradient-to-b from-white to-zinc-200 text-zinc-950 shadow-md border-t border-white'
                            : 'text-zinc-400 hover:text-white'
                        }`}
                      >
                        Todas ({stats.total})
                      </button>

                      <button
                        type="button"
                        onClick={() => setFilters({ status: 'watched' })}
                        className={`py-2 rounded-xl font-bold font-label uppercase tracking-wider text-[10px] transition-all text-center cursor-pointer ${
                          filters.status === 'watched'
                            ? 'bg-gradient-to-b from-white to-zinc-200 text-zinc-950 shadow-md border-t border-white'
                            : 'text-zinc-400 hover:text-white'
                        }`}
                      >
                        Vistas ({stats.watched})
                      </button>

                      <button
                        type="button"
                        onClick={() => setFilters({ status: 'unwatched' })}
                        className={`py-2 rounded-xl font-bold font-label uppercase tracking-wider text-[10px] transition-all text-center cursor-pointer ${
                          filters.status === 'unwatched'
                            ? 'bg-gradient-to-b from-white to-zinc-200 text-zinc-950 shadow-md border-t border-white'
                            : 'text-zinc-400 hover:text-white'
                        }`}
                      >
                        Pendientes
                      </button>
                    </div>
                  </div>

                  {/* Section 3: MCU Phase Filter */}
                  <div>
                    <label className="font-label font-bold block mb-2.5 text-[11px] uppercase tracking-wider text-zinc-400">
                      Fase del MCU
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setFilters({ phase: 'all' })}
                        className={`p-2.5 rounded-xl border text-center font-label font-bold uppercase tracking-wider text-xs transition-all cursor-pointer ${
                          filters.phase === 'all'
                            ? 'bg-gradient-to-r from-red-700 via-rose-600 to-red-800 text-white border-red-400/40 shadow-md border-t-white/40'
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
                          className={`p-2.5 rounded-xl border text-center font-label font-bold uppercase tracking-wider text-xs transition-all cursor-pointer ${
                            filters.phase === phase
                              ? 'bg-gradient-to-r from-red-700 via-rose-600 to-red-800 text-white border-red-400/40 shadow-md border-t-white/40'
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
                        className="w-full py-2.5 text-xs text-red-400 hover:text-red-300 font-label font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer bg-red-950/30 hover:bg-red-900/40 border border-red-500/30 rounded-xl transition-all"
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
