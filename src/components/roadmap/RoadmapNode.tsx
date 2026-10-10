import React, { useState, memo } from 'react';
import { Handle, Position, NodeProps, Node } from '@xyflow/react';
import { Check } from 'lucide-react';
import { MCUItem } from '../../types/mcu';

export type RoadmapNodeData = {
  item: MCUItem;
  isWatched: boolean;
  isNexus?: boolean;
  isSpecial?: boolean;
  era: string;
  lane: string;
  isHovered?: boolean;
  isSelected?: boolean;
  isPrerequisite?: boolean;
  isUnlock?: boolean;
  isDimmed?: boolean;
  onToggleWatched: (id: string) => void;
  onOpenDetail?: (item: MCUItem) => void;
  onSelectNode: (id: string) => void;
  [key: string]: unknown;
};

export type RoadmapNodeType = Node<RoadmapNodeData, 'roadmapNode'>;

export const RoadmapNode = memo(
  ({ data }: NodeProps<RoadmapNodeType>) => {
    const {
      item,
      isWatched,
      isNexus,
      isSpecial,
      isSelected,
      isPrerequisite,
      isUnlock,
      isDimmed,
      onToggleWatched,
      onSelectNode,
    } = data;

    const [imageError, setImageError] = useState(false);

    // Bordes y resplandor según estado (seleccionado, prerrequisito, desbloqueo o vista)
    let borderAndGlowClasses = 'border-white/10 shadow-[0_10px_24px_rgba(0,0,0,0.6)]';

    if (isSelected) {
      borderAndGlowClasses =
        'border-[#00A8FF] ring-2 ring-[#00A8FF]/80 shadow-[0_0_24px_rgba(0,168,255,0.7)] scale-[1.03] z-30';
    } else if (isPrerequisite) {
      borderAndGlowClasses =
        'border-amber-400 ring-2 ring-amber-400/80 shadow-[0_0_22px_rgba(245,158,11,0.75)] scale-[1.02] animate-pulse z-20';
    } else if (isUnlock) {
      borderAndGlowClasses =
        'border-purple-400 ring-2 ring-purple-400/80 shadow-[0_0_22px_rgba(168,85,247,0.75)] scale-[1.02] animate-pulse z-20';
    } else if (isWatched) {
      borderAndGlowClasses = isSpecial
        ? 'border-emerald-500/80 border-dashed shadow-[0_0_16px_rgba(16,185,129,0.35)]'
        : 'border-emerald-500/80 shadow-[0_0_16px_rgba(16,185,129,0.35)]';
    } else if (isNexus) {
      borderAndGlowClasses = 'border-rose-500/70 ring-1 ring-rose-500/40 shadow-[0_0_18px_rgba(230,36,41,0.35)]';
    } else if (isSpecial) {
      borderAndGlowClasses = 'border-amber-400/35 border-dashed shadow-[0_6px_20px_rgba(245,158,11,0.18)]';
    }

    return (
      <div
        onClick={() => onSelectNode(item.id)}
        style={{
          contain: 'layout paint',
        }}
        className={`relative w-[172px] sm:w-[180px] aspect-[2/3] rounded-2xl overflow-hidden bg-[#0A0D18] border transition-[opacity,transform,box-shadow,border-color,filter] duration-200 select-none cursor-pointer ${borderAndGlowClasses} ${
          isDimmed
            ? 'opacity-25 filter grayscale-[0.75] scale-95 pointer-events-auto'
            : 'opacity-100'
        }`}
      >
        {/* Handles React Flow para conectar líneas verticales y horizontales */}
        <Handle
          type="target"
          position={Position.Top}
          id="target-top"
          className="!w-2.5 !h-2.5 !-top-1 !bg-zinc-400 !border-2 !border-[#0A0D18]"
        />
        <Handle
          type="source"
          position={Position.Bottom}
          id="source-bottom"
          className="!w-2.5 !h-2.5 !-bottom-1 !bg-[#00A8FF] !border-2 !border-[#0A0D18]"
        />
        <Handle
          type="target"
          position={Position.Left}
          id="target-left"
          className="!w-2.5 !h-2.5 !-left-1 !bg-zinc-400 !border-2 !border-[#0A0D18]"
        />
        <Handle
          type="source"
          position={Position.Right}
          id="source-right"
          className="!w-2.5 !h-2.5 !-right-1 !bg-[#00A8FF] !border-2 !border-[#0A0D18]"
        />
        <Handle
          type="source"
          position={Position.Left}
          id="source-left"
          className="!w-2.5 !h-2.5 !-left-1 !bg-[#00A8FF] !border-2 !border-[#0A0D18]"
        />
        <Handle
          type="target"
          position={Position.Right}
          id="target-right"
          className="!w-2.5 !h-2.5 !-right-1 !bg-zinc-400 !border-2 !border-[#0A0D18]"
        />

        {/* Botón rápido "Marcar como vista" en esquina superior derecha */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleWatched(item.id);
          }}
          className={`absolute top-2 right-2 z-20 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer shadow-md ${
            isWatched
              ? 'bg-emerald-500 text-white border border-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.8)]'
              : 'bg-black/60 text-zinc-300 border border-white/20'
          }`}
          title={isWatched ? 'Marcar como pendiente' : 'Marcar como vista'}
        >
          <Check className={`w-3.5 h-3.5 stroke-[2.5] ${isWatched ? 'scale-100' : 'opacity-70'}`} />
        </button>

        {/* Imagen del Póster con Lazy Loading y dimensiones preasignadas */}
        {!imageError ? (
          <img
            src={item.urlPoster}
            alt={item.titulo}
            width={180}
            height={270}
            loading="lazy"
            decoding="async"
            onError={() => setImageError(true)}
            className={`w-full h-full object-cover ${
              isWatched ? 'opacity-85' : 'opacity-100'
            }`}
          />
        ) : (
          <div className="w-full h-full bg-[#141624] p-3 flex flex-col items-center justify-center text-center">
            <span className="text-[11px] text-zinc-400 font-medium line-clamp-2">{item.titulo}</span>
          </div>
        )}
      </div>
    );
  },
  (prev, next) => {
    return (
      prev.data.item.id === next.data.item.id &&
      prev.data.isWatched === next.data.isWatched &&
      prev.data.isSelected === next.data.isSelected &&
      prev.data.isPrerequisite === next.data.isPrerequisite &&
      prev.data.isUnlock === next.data.isUnlock &&
      prev.data.isDimmed === next.data.isDimmed &&
      prev.data.isNexus === next.data.isNexus &&
      prev.data.isSpecial === next.data.isSpecial &&
      prev.data.item.urlPoster === next.data.item.urlPoster
    );
  }
);

RoadmapNode.displayName = 'RoadmapNode';
