import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Eye, ChevronRight, ArrowLeftCircle, Sparkles, Film, Tv } from 'lucide-react';
import { MCUItem } from '../../types/mcu';

interface RoadmapInspectorPanelProps {
  item: MCUItem | null;
  isWatched: boolean;
  prerequisites: MCUItem[];
  unlocks: MCUItem[];
  watchedIds: Set<string>;
  onClose: () => void;
  onToggleWatched: (id: string) => void;
  onOpenDetail: (item: MCUItem) => void;
  onFocusNode: (id: string) => void;
}

export const RoadmapInspectorPanel: React.FC<RoadmapInspectorPanelProps> = ({
  item,
  isWatched,
  prerequisites,
  unlocks,
  watchedIds,
  onClose,
  onToggleWatched,
  onOpenDetail,
  onFocusNode,
}) => {
  if (!item) return null;

  const TypeIcon = item.tipo === 'movie' ? Film : item.tipo === 'series' ? Tv : Sparkles;

  return (
    <AnimatePresence>
      <motion.aside
        initial={{ opacity: 0, x: -30, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
        exit={{ opacity: 0, x: -30, y: 10, scale: 0.95 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="fixed bottom-4 left-4 z-40 w-[340px] sm:w-[410px] max-h-[82vh] overflow-y-auto custom-scrollbar rounded-3xl p-4 sm:p-5 bg-[#090A14]/95 backdrop-blur-2xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.85)] text-white select-none"
      >
        {/* Header con botón de cerrar */}
        <div className="flex items-start justify-between gap-3 pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#00A8FF]/20 text-[#00A8FF] border border-[#00A8FF]/40">
              {item.fase}
            </span>
            <span className="text-xs text-zinc-400 font-medium">{item.anioLanzamiento}</span>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-zinc-300 hover:text-white transition-colors cursor-pointer"
            title="Cerrar panel"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Ficha Principal: Póster + Título + Status */}
        <div className="flex gap-3.5 my-3.5 items-start">
          <div className="relative w-20 aspect-[2/3] shrink-0 rounded-xl overflow-hidden tactile-poster-frame">
            <img
              src={item.urlPoster}
              alt={item.titulo}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-display text-base font-bold text-white tracking-tight leading-snug line-clamp-2">
              {item.titulo}
            </h4>
            <div className="flex items-center gap-2 mt-1 text-xs text-zinc-400">
              <span className="flex items-center gap-1">
                <TypeIcon className="w-3.5 h-3.5" />
                <span>{item.tipo === 'movie' ? 'Película' : item.tipo === 'series' ? 'Serie' : 'Especial'}</span>
              </span>
              <span>•</span>
              <span>{item.duracion || `${item.anioLanzamiento}`}</span>
            </div>

            {/* Switch de Visto / Pendiente */}
            <div className="mt-2.5">
              <button
                onClick={() => onToggleWatched(item.id)}
                className={`w-full py-1.5 px-3 rounded-xl flex items-center justify-center gap-2 text-xs font-semibold cursor-pointer transition-all ${
                  isWatched
                    ? 'bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                    : 'bg-white/5 border border-white/15 text-zinc-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Check className={`w-3.5 h-3.5 ${isWatched ? 'text-emerald-400' : 'text-zinc-400'}`} />
                <span>{isWatched ? 'Producción Vista' : 'Marcar como Vista'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Sinopsis Rápida */}
        <p className="text-xs text-zinc-300/85 leading-relaxed line-clamp-3 mb-4">
          {item.resumen}
        </p>

        {/* Sección: Qué ver antes (Prerrequisitos) */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#F59E0B]" />
              Qué ver antes ({prerequisites.length})
            </span>
            <span className="text-[10px] text-zinc-500">Prerrequisitos</span>
          </div>

          {prerequisites.length > 0 ? (
            <div className="space-y-1.5 max-h-[140px] overflow-y-auto custom-scrollbar pr-1">
              {prerequisites.map((p) => {
                const pWatched = watchedIds.has(p.id);
                return (
                  <div
                    key={p.id}
                    onClick={() => onFocusNode(p.id)}
                    className="flex items-center justify-between p-2 rounded-xl bg-white/5 hover:bg-amber-500/10 border border-white/8 hover:border-amber-400/30 cursor-pointer transition-all group"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-6 h-8 rounded shrink-0 overflow-hidden bg-black/40">
                        <img src={p.urlPoster} alt={p.titulo} className="w-full h-full object-cover" />
                      </div>
                      <span className="text-xs text-zinc-200 group-hover:text-amber-200 truncate font-medium">
                        {p.titulo}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0 ml-2">
                      {pWatched && (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      )}
                      <ChevronRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-amber-300 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-[11px] text-zinc-500 italic p-2 rounded-xl bg-white/5 border border-white/5">
              Punto de partida autónomo. No requiere producciones previas obligatorias.
            </p>
          )}
        </div>

        {/* Sección: Qué desbloquea a continuación */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_8px_#A855F7]" />
              Qué desbloquea ({unlocks.length})
            </span>
            <span className="text-[10px] text-zinc-500">Próximas rutas</span>
          </div>

          {unlocks.length > 0 ? (
            <div className="space-y-1.5 max-h-[140px] overflow-y-auto custom-scrollbar pr-1">
              {unlocks.map((u) => {
                const uWatched = watchedIds.has(u.id);
                return (
                  <div
                    key={u.id}
                    onClick={() => onFocusNode(u.id)}
                    className="flex items-center justify-between p-2 rounded-xl bg-white/5 hover:bg-purple-500/10 border border-white/8 hover:border-purple-400/30 cursor-pointer transition-all group"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-6 h-8 rounded shrink-0 overflow-hidden bg-black/40">
                        <img src={u.urlPoster} alt={u.titulo} className="w-full h-full object-cover" />
                      </div>
                      <span className="text-xs text-zinc-200 group-hover:text-purple-200 truncate font-medium">
                        {u.titulo}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0 ml-2">
                      {uWatched && (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      )}
                      <ChevronRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-purple-300 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-[11px] text-zinc-500 italic p-2 rounded-xl bg-white/5 border border-white/5">
              Hito actual de la saga. No tiene continuaciones directas registradas aún.
            </p>
          )}
        </div>

        {/* Botón Ver Ficha Completa */}
        <button
          onClick={() => onOpenDetail(item)}
          className="w-full py-2.5 rounded-2xl bg-gradient-to-r from-[#C81D25] to-[#A0161C] hover:from-[#E62429] hover:to-[#C81D25] text-white text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_16px_rgba(200,29,37,0.4)] transition-all"
        >
          <Eye className="w-4 h-4" />
          <span>Abrir Ficha Completa con Tráiler y Detalles</span>
        </button>
      </motion.aside>
    </AnimatePresence>
  );
};
