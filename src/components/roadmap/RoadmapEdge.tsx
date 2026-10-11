import React, { memo } from 'react';
import {
  BaseEdge,
  EdgeProps,
  Edge,
  getSmoothStepPath,
  Position,
  EdgeLabelRenderer,
  getEdgeCenter,
} from '@xyflow/react';
import { getArcColor, getPriorityColor } from '../../data/roadmapTreeData';
import { StorylineArc, MCUPriority } from '../../types/mcu';

export type RoadmapEdgeData = {
  arc: Exclude<StorylineArc, 'all'>;
  priority?: MCUPriority;
  isEssential?: boolean;
  label?: string;
  isHighlighted?: boolean;
  isPrerequisitePath?: boolean;
  isUnlockPath?: boolean;
  isDimmed?: boolean;
  isPostEndgame?: boolean;
  isMergedTarget?: boolean;
  isPrimaryIncoming?: boolean;
  targetJunctionOffset?: number;
  isEndgameBranch?: boolean;
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
  const isLongDistance = deltaY > 550;
  const isSameSideVertical =
    (sourcePosition === Position.Left && targetPosition === Position.Left) ||
    (sourcePosition === Position.Right && targetPosition === Position.Right);

  const isPostEndgame = !!data?.isPostEndgame;
  const isMergedTarget = !!data?.isMergedTarget;
  const isPrimaryIncoming = !!data?.isPrimaryIncoming;
  const isEndgameBranch = !!data?.isEndgameBranch;
  const targetJunctionOffset = (data?.targetJunctionOffset as number) || 50;

  // Generación de ruta: líneas rectas/ortogonales y unificación de troncos convergentes
  let edgePath = '';
  const radius = 14;

  if (isEndgameBranch && targetY > sourceY + 40) {
    // Ramificación limpia desde Endgame: un solo tronco vertical que alimenta el riel horizontal a y: 6940
    const busY = 6940;
    if (Math.abs(sourceX - targetX) < 4) {
      edgePath = `M ${sourceX} ${sourceY} L ${targetX} ${targetY}`;
    } else {
      const dir = sourceX < targetX ? 1 : -1;
      edgePath = `M ${sourceX} ${sourceY} L ${sourceX} ${busY - radius} Q ${sourceX} ${busY} ${sourceX + dir * radius} ${busY} L ${targetX - dir * radius} ${busY} Q ${targetX} ${busY} ${targetX} ${busY + radius} L ${targetX} ${targetY}`;
    }
  } else if (isMergedTarget && targetPosition === Position.Top) {
    // Unificación de múltiples producciones hacia un único destino con tronco común y flecha única
    const junctionY = targetY - targetJunctionOffset;
    if (sourceY < junctionY - 16) {
      if (Math.abs(sourceX - targetX) < 4) {
        // En la misma columna vertical: línea recta directa de inicio a fin
        edgePath = `M ${sourceX} ${sourceY} L ${targetX} ${targetY}`;
      } else {
        const dir = sourceX < targetX ? 1 : -1;
        edgePath = `M ${sourceX} ${sourceY} L ${sourceX} ${junctionY - radius} Q ${sourceX} ${junctionY} ${sourceX + dir * radius} ${junctionY} L ${targetX - dir * radius} ${junctionY} Q ${targetX} ${junctionY} ${targetX} ${junctionY + radius} L ${targetX} ${targetY}`;
      }
    } else {
      // Si la fuente está en cota cercana o lateral
      [edgePath] = getSmoothStepPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
        borderRadius: radius,
      });
    }
  } else if (isSameSideVertical) {
    const gutterOffset = Math.min(60, Math.max(35, 25 + deltaY / 400));
    [edgePath] = getSmoothStepPath({
      sourceX,
      sourceY,
      sourcePosition,
      targetX,
      targetY,
      targetPosition,
      borderRadius: 20,
      offset: gutterOffset,
    });
  } else {
    // 100% Rectas u ortogonales en todo el mapa (incluyendo antes de Avengers: Endgame)
    if (Math.abs(sourceX - targetX) < 4) {
      edgePath = `M ${sourceX} ${sourceY} L ${targetX} ${targetY}`;
    } else if (Math.abs(sourceY - targetY) < 4) {
      edgePath = `M ${sourceX} ${sourceY} L ${targetX} ${targetY}`;
    } else {
      [edgePath] = getSmoothStepPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
        borderRadius: radius,
      });
    }
  }

  const priority = (data?.priority as MCUPriority) || (data?.isEssential !== false ? 'esencial' : 'opcional');
  const priorityColor = getPriorityColor(priority);
  const isEssential = priority === 'esencial' || data?.isEssential !== false;
  const isHighlighted = !!data?.isHighlighted;
  const isPrerequisitePath = !!data?.isPrerequisitePath;
  const isUnlockPath = !!data?.isUnlockPath;
  const isDimmed = !!data?.isDimmed;
  const isActive = isHighlighted || isPrerequisitePath || isUnlockPath;

  // En conexiones unificadas, solo se dibuja la punta de flecha en el destino una sola vez
  const shouldRenderMarker = !isMergedTarget || isPrimaryIncoming || isActive;

  // Color de acento, grosor y opacidad según la prioridad de la producción
  let strokeColor = priorityColor;
  let strokeWidth = isLongDistance
    ? 2.8
    : priority === 'esencial'
    ? 3.8
    : priority === 'recomendada'
    ? 3.4
    : 3.0;
  let opacity = isLongDistance
    ? 0.70
    : priority === 'esencial'
    ? 0.95
    : priority === 'opcional'
    ? 0.65
    : 0.85;
  let dashArray: string | undefined =
    priority === 'opcional' ? '6 4' : isLongDistance ? '7 5' : undefined;

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
      {!isDimmed && shouldRenderMarker && (
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

      {/* Punto de unión sutil en el riel colector donde convergen las flechas */}
      {isMergedTarget && isPrimaryIncoming && !isDimmed && (
        <g style={{ pointerEvents: 'none' }}>
          <circle
            cx={targetX}
            cy={targetY - targetJunctionOffset}
            r={5}
            fill={strokeColor}
            fillOpacity={0.3}
          />
          <circle
            cx={targetX}
            cy={targetY - targetJunctionOffset}
            r={3}
            fill={strokeColor}
            fillOpacity={opacity}
          />
        </g>
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
        markerEnd={!isDimmed && shouldRenderMarker ? `url(#${markerId})` : undefined}
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
    prev.data?.arc === next.data?.arc &&
    prev.data?.isMergedTarget === next.data?.isMergedTarget &&
    prev.data?.isPrimaryIncoming === next.data?.isPrimaryIncoming &&
    prev.data?.isPostEndgame === next.data?.isPostEndgame &&
    prev.data?.isEndgameBranch === next.data?.isEndgameBranch
  );
});

RoadmapEdge.displayName = 'RoadmapEdge';

