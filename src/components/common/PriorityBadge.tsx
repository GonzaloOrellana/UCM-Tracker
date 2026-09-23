import React from 'react';
import { MCUPriority } from '../../types/mcu';

export interface PriorityInfo {
  icon: string;
  label: string;
  tooltip: string;
  pillClasses: string;
  textClasses: string;
}

export const PRIORITY_CONFIG: Record<MCUPriority, PriorityInfo> = {
  esencial: {
    icon: '🔥',
    label: 'Esencial',
    tooltip: '🔥 Esencial: Sin esto perdés una parte importante de la experiencia.',
    pillClasses: 'tactile-priority-esencial',
    textClasses: 'text-red-700',
  },
  recomendada: {
    icon: '🟢',
    label: 'Recomendada',
    tooltip: '🟢 Recomendada: Importante para personajes o historia.',
    pillClasses: 'tactile-priority-recomendada',
    textClasses: 'text-emerald-700',
  },
  complementaria: {
    icon: '🟡',
    label: 'Complementaria',
    tooltip: '🟡 Complementaria: Aporta contexto, pero no es fundamental.',
    pillClasses: 'tactile-priority-complementaria',
    textClasses: 'text-amber-700',
  },
  opcional: {
    icon: '⚪',
    label: 'Opcional',
    tooltip: '⚪ Opcional: Principalmente para completar el universo.',
    pillClasses: 'tactile-priority-opcional',
    textClasses: 'text-zinc-700',
  },
};

interface PriorityBadgeProps {
  priority?: MCUPriority;
  variant?: 'card' | 'modal';
  className?: string;
}

export const PriorityBadge: React.FC<PriorityBadgeProps> = React.memo(({
  priority,
  variant = 'card',
  className = '',
}) => {
  if (!priority) return null;

  const config = PRIORITY_CONFIG[priority];
  if (!config) return null;

  if (variant === 'modal') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 text-[10.5px] font-sans font-bold tracking-wider uppercase ${config.textClasses} ${className}`}
        title={config.tooltip}
      >
        <span>{config.icon}</span>
        <span>{config.label}</span>
      </span>
    );
  }

  // Default 'card' variant: compact icon, expands on hover
  return (
    <div
      title={config.tooltip}
      className={`absolute top-2.5 left-2.5 z-20 h-[22px] w-[22px] sm:group-hover:w-auto p-0 sm:group-hover:px-2 flex items-center justify-center gap-1 rounded-full text-[8.5px] font-sans font-bold tracking-tight uppercase tactile-priority-pill transition-all duration-300 max-w-[calc(100%-3rem)] ${config.pillClasses} ${className}`}
    >
      <span className="text-[11px] leading-none flex items-center justify-center shrink-0">
        {config.icon}
      </span>
      <span className="hidden sm:group-hover:inline transition-all duration-200 truncate">
        {config.label}
      </span>
    </div>
  );
});
