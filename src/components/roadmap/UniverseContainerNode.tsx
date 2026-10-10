import { memo } from 'react';
import { NodeProps, Node } from '@xyflow/react';

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
  ({ data }: NodeProps<UniverseContainerNodeType>) => {
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
        className={`relative rounded-3xl border-2 border-dashed bg-[#090b16]/90 p-6 pointer-events-none select-none overflow-hidden transition-[opacity] duration-200 ${
          isDimmed ? 'opacity-25' : 'opacity-100'
        }`}
      >
        {/* Decorative cosmic gradient background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-25"
          style={{
            background: `radial-gradient(ellipse at top left, ${badgeColor}40 0%, transparent 65%)`,
          }}
        />

        {/* Grid pattern watermark overlay */}
        <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

        {/* Header Container - Solo título sin badges */}
        <div className="relative z-10 flex items-center border-b border-white/10 pb-3 mb-4">
          <h3 className="text-base sm:text-lg font-black tracking-wide text-white font-display">
            {title}
          </h3>
        </div>
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
