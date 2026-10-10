import React, { memo } from 'react';
import {
  BaseEdge,
  EdgeProps,
  Edge,
  getBezierPath,
  getSmoothStepPath,
  Position,
  EdgeLabelRenderer,
  getEdgeCenter,
} from '@xyflow/react';
import { getArcColor } from '../../data/roadmapTreeData';
import { StorylineArc } from '../../types/mcu';

export type RoadmapEdgeData = {
  arc: Exclude<StorylineArc, 'all'>;
  isEssential?: boolean;
  label?: string;
  isHighlighted?: boolean;
  isPrerequisitePath?: boolean;
  isUnlockPath?: boolean;
  isDimmed?: boolean;
  [key: string]: unknown;
};

export type RoadmapEdgeType = Edge<RoadmapEdgeData, 'roadmapEdge'>;

export const RoadmapEdge = memo(({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  style = {},
}: EdgeProps<RoadmapEdgeType>) => {
  const deltaY = Math.abs(targetY - sourceY);
  const deltaX = Math.abs(targetX - sourceX);
  const isLongDistance = deltaY > 550;
  const isSameSideVertical =
    (sourcePosition === Position.Left && targetPosition === Position.Left) ||
    (sourcePosition === Position.Right && targetPosition === Position.Right);

  // Generación de ruta inteligente: bypass por canal lateral o bezier adaptativo
  let edgePath = '';
  if (isSameSideVertical) {
    const gutterOffset = Math.min(60, Math.max(35, 25 + deltaY / 400));
    [edgePath] = getSmoothStepPath({
      sourceX,
      sourceY,
      sourcePosition,
      targetX,
      targetY,
      targetPosition,
      borderRadius: 24,
      offset: gutterOffset,
    });
  } else if (isLongDistance) {
    // Curvatura adaptativa amortiguada para evitar bucles gigantes
    const curvature = Math.min(0.2, Math.max(0.04, 240 / (deltaY || 1)));
    [edgePath] = getBezierPath({
      sourceX,
      sourceY,
      sourcePosition,
      targetX,
      targetY,
      targetPosition,
      curvature,
    });
  } else {
    [edgePath] = getBezierPath({
      sourceX,
      sourceY,
      sourcePosition,
      targetX,
      targetY,
      targetPosition,
    });
  }

  const arc = data?.arc || 'core-avengers';
  const arcColor = getArcColor(arc);
  const isEssential = data?.isEssential !== false;
  const isHighlighted = !!data?.isHighlighted;
  const isPrerequisitePath = !!data?.isPrerequisitePath;
  const isUnlockPath = !!data?.isUnlockPath;
  const isDimmed = !!data?.isDimmed;
  const isActive = isHighlighted || isPrerequisitePath || isUnlockPath;

  // Color de acento, grosor y opacidad según estado para máxima visibilidad estética
  let strokeColor = arcColor;
  let strokeWidth = isLongDistance ? 2.8 : (isEssential ? 3.8 : 3.0);
  let opacity = isLongDistance ? 0.65 : (isEssential ? 0.90 : 0.75);
  let dashArray: string | undefined = isLongDistance ? '7 5' : (isEssential ? undefined : '6 4');

  if (isPrerequisitePath) {
    if (isEssential) {
      strokeColor = '#F59E0B'; // Amber oro para prerrequisitos esenciales
      strokeWidth = 5.2;
      opacity = 1;
      dashArray = isLongDistance ? '8 5' : undefined;
    } else {
      strokeColor = '#38BDF8'; // Sky Blue para prerrequisitos opcionales
      strokeWidth = 4.4;
      opacity = 0.96;
      dashArray = '6 4';
    }
  } else if (isUnlockPath) {
    strokeColor = '#C084FC'; // Púrpura cósmico para desbloqueos posteriores
    strokeWidth = 5.2;
    opacity = 1;
    dashArray = isLongDistance ? '8 5' : undefined;
  } else if (isHighlighted) {
    strokeColor = '#00B4FF'; // Cyan eléctrico para ruta activa
    strokeWidth = 5.2;
    opacity = 1;
    dashArray = isLongDistance ? '8 5' : undefined;
  } else if (isDimmed) {
    opacity = 0.08;
    strokeWidth = 1.2;
    dashArray = undefined;
  }

  const markerId = `arrow-${id}`;

  // Cálculo de centro para etiqueta opcional cuando la conexión está activa
  const [edgeCenterX, edgeCenterY] = getEdgeCenter({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <>
      {!isDimmed && (
        <defs>
          <marker
            id={markerId}
            viewBox="0 0 12 12"
            refX="8"
            refY="6"
            markerWidth={isActive ? 8 : 6.5}
            markerHeight={isActive ? 8 : 6.5}
            orient="auto-start-reverse"
          >
            <path
              d="M 2 2 L 10 6 L 2 10 L 4 6 Z"
              fill={strokeColor}
              fillOpacity={opacity}
            />
          </marker>
        </defs>
      )}

      {/* Halo ambiental / Resplandor de neón luminoso para que resalte sobre el fondo oscuro */}
      {!isDimmed && (
        <path
          d={edgePath}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth + (isActive ? 8 : 4)}
          strokeOpacity={isActive ? 0.45 : 0.22}
          className={isActive ? 'animate-pulse' : undefined}
          style={{
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Línea principal de la conexión con grosor y contraste reforzado */}
      <BaseEdge
        id={id}
        path={edgePath}
        markerEnd={!isDimmed ? `url(#${markerId})` : undefined}
        style={{
          ...style,
          stroke: strokeColor,
          strokeWidth,
          strokeOpacity: opacity,
          strokeDasharray: dashArray,
          transition: 'stroke 0.2s ease, stroke-opacity 0.2s ease, stroke-width 0.2s ease',
        }}
      />

      {/* Etiqueta contextual en la arista cuando está activa y tiene descripción */}
      {isActive && data?.label && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${edgeCenterX}px,${edgeCenterY}px)`,
              pointerEvents: 'none',
            }}
            className="px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide bg-[#0B0E1B]/95 text-white border border-white/20 shadow-[0_4px_16px_rgba(0,0,0,0.8)] z-40 whitespace-nowrap animate-fade-in"
          >
            {data.label}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
}, (prev, next) => {
  return (
    prev.sourceX === next.sourceX &&
    prev.sourceY === next.sourceY &&
    prev.targetX === next.targetX &&
    prev.targetY === next.targetY &&
    prev.sourcePosition === next.sourcePosition &&
    prev.targetPosition === next.targetPosition &&
    prev.data?.isHighlighted === next.data?.isHighlighted &&
    prev.data?.isPrerequisitePath === next.data?.isPrerequisitePath &&
    prev.data?.isUnlockPath === next.data?.isUnlockPath &&
    prev.data?.isDimmed === next.data?.isDimmed &&
    prev.data?.arc === next.data?.arc
  );
});

RoadmapEdge.displayName = 'RoadmapEdge';

