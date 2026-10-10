import React from 'react';
import { PHASE_FILTERS, PhaseFilter } from '../../data/roadmapTreeData';
import { CheckCircle2, Filter } from 'lucide-react';

interface RoadmapFilterBarProps {
  activePhase: PhaseFilter;
  onSelectPhase: (phase: PhaseFilter) => void;
  showOnlyUnwatched: boolean;
  onToggleOnlyUnwatched: () => void;
  watchedCount: number;
  totalCount: number;
}

export const RoadmapFilterBar: React.FC<RoadmapFilterBarProps> = ({
  activePhase,
  onSelectPhase,
  showOnlyUnwatched,
  onToggleOnlyUnwatched,
  watchedCount,
  totalCount,
}) => {
  const percentage = Math.round((watchedCount / (totalCount || 1)) * 100);

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-2.5 w-full bg-[#0A0B14]/92 backdrop-blur-xl border border-white/10 p-2 sm:p-2.5 rounded-2xl sm:rounded-full shadow-2xl">
      {/* Selector Exclusivo de Fases del UCM */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar max-w-full w-full md:w-auto px-1">
        {PHASE_FILTERS.map((phase) => {
          const isActive = activePhase === phase.id;
          return (
            <button
              key={phase.id}
              onClick={() => onSelectPhase(phase.id)}
              className={`px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                isActive
                  ? 'bg-white/20 text-white border border-white/40 shadow-[0_0_14px_rgba(255,255,255,0.25)]'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
              title={phase.saga}
            >
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: phase.color }}
              />
              <span>{phase.label}</span>
            </button>
          );
        })}
      </div>

      {/* Acciones Secundarias: Filtro Pendientes + Progreso General */}
      <div className="flex items-center justify-between md:justify-end gap-3 w-full md:w-auto px-1 shrink-0">
        {/* Toggle Solo Pendientes */}
        <button
          onClick={onToggleOnlyUnwatched}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all border ${
            showOnlyUnwatched
              ? 'bg-amber-500/20 text-amber-300 border-amber-400/50 shadow-[0_0_12px_rgba(245,158,11,0.25)]'
              : 'text-zinc-400 hover:text-zinc-200 bg-white/5 border-white/10'
          }`}
          title="Ocultar las que ya viste para ver qué te falta"
        >
          <Filter className="w-3 h-3" />
          <span>Solo pendientes</span>
        </button>

        {/* Indicador de Progreso en el Skill Tree */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-xs font-medium">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span className="font-semibold">{watchedCount}/{totalCount}</span>
          <span className="text-emerald-400/80">({percentage}%)</span>
        </div>
      </div>
    </div>
  );
};
