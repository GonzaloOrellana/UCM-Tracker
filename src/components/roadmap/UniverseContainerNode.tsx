import { memo } from 'react';
import { NodeProps, Node, Handle, Position } from '@xyflow/react';

export interface UniverseContainerData {
  title: string;
  badgeColor?: string;
  borderColor?: string;
  glowColor?: string;
  width: number;
  height: number;
  isDimmed?: boolean;
  [key: string]: unknown;
}

export type UniverseContainerNodeType = Node<UniverseContainerData, 'universeContainer'>;

export const UniverseContainerNode = memo(
  ({ id, data }: NodeProps<UniverseContainerNodeType>) => {
    const {
      title,
      badgeColor = '#A855F7',
      borderColor,
      glowColor,
      width,
      height,
      isDimmed,
    } = data;

    return (
      <div
        style={{
          width,
          height,
          borderColor: borderColor || 'rgba(168, 85, 247, 0.45)',
          boxShadow: `0 20px 50px rgba(0,0,0,0.65), 0 0 35px ${glowColor || 'rgba(168, 85, 247, 0.12)'}`,
          contain: 'layout paint',
        }}
        className={`relative rounded-3xl border-2 border-dashed bg-[#090b16]/90 p-6 pointer-events-none select-none transition-[opacity] duration-200 ${
          isDimmed ? 'opacity-25' : 'opacity-100'
        }`}
      >
        {/* Decorative cosmic gradient background con recorte redondeado */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
          <div
            className="absolute inset-0 opacity-25"
            style={{
              background: `radial-gradient(ellipse at top left, ${badgeColor}40 0%, transparent 65%)`,
            }}
          />
          <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
        </div>

        {/* Header Container - Solo título sin badges */}
        <div className="relative z-10 flex items-center border-b border-white/10 pb-3 mb-4">
          <h3 className="text-base sm:text-lg font-black tracking-wide text-white font-display">
            {title}
          </h3>
        </div>

        {/* Handles de salida lateral hacia el UCM principal para cada contenedor */}
        {id === 'container-defenders' && (
          <Handle
            type="source"
            position={Position.Right}
            id="source-right"
            className="!w-3 !h-3 !-right-1.5 !bg-[#DC2626] !border-2 !border-[#090B16] !shadow-[0_0_12px_rgba(220,38,38,0.9)] !pointer-events-auto"
            style={{
              top: '255px', // Coincide exactamente con la altura de Daredevil Born Again S1 (y: 8155)
            }}
          />
        )}

        {id === 'container-spiderman-multiverse' && (
          <Handle
            type="source"
            position={Position.Right}
            id="source-right"
            className="!w-3 !h-3 !-right-1.5 !bg-[#E11D48] !border-2 !border-[#090B16] !shadow-[0_0_12px_rgba(225,29,72,0.9)] !pointer-events-auto"
            style={{
              top: '875px', // Coincide exactamente con la altura de Spider-Man: No Way Home (y: 7775)
            }}
          />
        )}

        {id === 'container-xmen-multiverse' && (
          <Handle
            type="source"
            position={Position.Bottom}
            id="source-bottom"
            className="!w-3 !h-3 !-bottom-1.5 !bg-[#EF4444] !border-2 !border-[#090B16] !shadow-[0_0_12px_rgba(239,68,68,0.9)] !pointer-events-auto"
            style={{
              left: '140px', // Directamente debajo de la columna de Logan (x: 1550 + 90 = 1640 -> 1640 - 1500 = 140px)
            }}
          />
        )}
      </div>
    );
  },
  (prev, next) => {
    return (
      prev.data.isDimmed === next.data.isDimmed &&
      prev.data.width === next.data.width &&
      prev.data.height === next.data.height &&
      prev.data.title === next.data.title
    );
  }
);
