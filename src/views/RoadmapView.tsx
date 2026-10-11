import React, { useState, useMemo, useCallback, useEffect } from 'react';
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  useReactFlow,
  BackgroundVariant,
  Node,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { useMCU } from '../context/MCUContext';
import { NavView, MCUItem } from '../types/mcu';
import {
  ROADMAP_NODE_LAYOUTS,
  STATIC_EDGE_SPECS,
  UNIVERSE_CONTAINERS,
  getAllPredecessorIds,
  getAllSuccessorIds,
  PHASE_FILTERS,
  PhaseFilter,
} from '../data/roadmapTreeData';
import { RoadmapNode, RoadmapNodeType } from '../components/roadmap/RoadmapNode';
import { UniverseContainerNode } from '../components/roadmap/UniverseContainerNode';
import { RoadmapEdge, RoadmapEdgeType } from '../components/roadmap/RoadmapEdge';
import { RoadmapControls } from '../components/roadmap/RoadmapControls';
import { ArrowLeft, Compass, Filter, ChevronDown, Check } from 'lucide-react';

interface RoadmapViewProps {
  onBackToDashboard: () => void;
  onNavigate: (view: NavView) => void;
}

const nodeTypes = {
  roadmapNode: RoadmapNode,
  universeContainer: UniverseContainerNode,
};

const edgeTypes = {
  roadmapEdge: RoadmapEdge,
};

const RoadmapCanvasContent: React.FC<RoadmapViewProps> = ({
  onBackToDashboard,
}) => {
  const { items, watchedIds, toggleWatched } = useMCU();
  const { setCenter, fitView } = useReactFlow();

  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [activePhase, setActivePhase] = useState<PhaseFilter>('all');
  const [showOnlyUnwatched, setShowOnlyUnwatched] = useState<boolean>(false);
  const [isPhaseDropdownOpen, setIsPhaseDropdownOpen] = useState<boolean>(false);

  const currentPhaseMeta = useMemo(() => {
    return PHASE_FILTERS.find((p) => p.id === activePhase) || PHASE_FILTERS[0];
  }, [activePhase]);

  // Mapeo rápido de ID a item completo
  const itemsMap = useMemo(() => {
    const map = new Map<string, MCUItem>();
    items.forEach((item) => map.set(item.id, item));
    return map;
  }, [items]);

  const allPredecessorsSet = useMemo(() => {
    if (!selectedNodeId) return new Set<string>();
    return getAllPredecessorIds(selectedNodeId);
  }, [selectedNodeId]);

  const allSuccessorsSet = useMemo(() => {
    if (!selectedNodeId) return new Set<string>();
    return getAllSuccessorIds(selectedNodeId);
  }, [selectedNodeId]);

  // Viewport inicial calculado dinámicamente según el ancho de pantalla para centrar el origen
  const defaultViewport = useMemo(() => {
    if (typeof window === 'undefined') {
      return { x: 100, y: 80, zoom: 0.75 };
    }
    const isMobile = window.innerWidth < 640;
    const zoom = isMobile ? 0.65 : 0.85;
    // Centrar horizontalmente el nodo inicial (Iron Man 1 en x: 0, ancho: 180 => centro x: 90)
    const screenWidth = window.innerWidth;
    const x = screenWidth / 2 - 90 * zoom;
    const y = isMobile ? 120 : 100;
    return { x, y, zoom };
  }, []);

  // Asegurar centrado en el inicio de la saga (Iron Man 1 / Fase 1) al abrir el mapa en celular o desktop
  useEffect(() => {
    const isMobile = window.innerWidth < 640;
    const zoom = isMobile ? 0.65 : 0.85;
    const timer = setTimeout(() => {
      setCenter(90, isMobile ? 320 : 380, { zoom, duration: 350 });
    }, 60);
    return () => clearTimeout(timer);
  }, [setCenter]);

  // Manejador de selección de nodo
  const handleSelectNode = useCallback((id: string) => {
    setSelectedNodeId((prev) => (prev === id ? null : id));
  }, []);

  const handlePaneClick = useCallback(() => {
    setSelectedNodeId(null);
    setIsPhaseDropdownOpen(false);
  }, []);

  // Manejador del filtro de Fases con vuelo de cámara suave y soporte mobile
  const handleSelectPhase = useCallback(
    (phase: PhaseFilter) => {
      setActivePhase(phase);
      setSelectedNodeId(null);

      const meta = PHASE_FILTERS.find((p) => p.id === phase);
      if (!meta) return;

      const isMobile = window.innerWidth < 640;

      if (phase === 'all') {
        if (isMobile) {
          setCenter(90, 320, { duration: 650, zoom: 0.65 });
        } else {
          fitView({ padding: 0.15, duration: 650 });
        }
      } else {
        const targetZoom = isMobile ? Math.min(meta.zoom, 0.55) : meta.zoom;
        setCenter(meta.centerX, meta.centerY, { duration: 650, zoom: targetZoom });
      }
    },
    [fitView, setCenter]
  );

  // Botón centrar mapa adaptado a pantallas móviles
  const handleResetView = useCallback(() => {
    const isMobile = window.innerWidth < 640;
    if (activePhase === 'all') {
      if (isMobile) {
        setCenter(90, 320, { duration: 600, zoom: 0.65 });
      } else {
        fitView({ padding: 0.15, duration: 600 });
      }
    } else {
      const meta = PHASE_FILTERS.find((p) => p.id === activePhase);
      if (meta) {
        const targetZoom = isMobile ? Math.min(meta.zoom, 0.55) : meta.zoom;
        setCenter(meta.centerX, meta.centerY, { duration: 600, zoom: targetZoom });
      }
    }
  }, [activePhase, fitView, setCenter]);

  // 1. Contenedores de Otros Universos (fondo visual estático memoizado independientemente)
  const containerNodes = useMemo<Node[]>(() => {
    const eraKey = activePhase !== 'all' ? activePhase.toLowerCase().replace(' ', '-') : null;
    const hasSelection = Boolean(selectedNodeId);

    return UNIVERSE_CONTAINERS.map((container) => {
      let isDimmed = false;
      if (hasSelection) {
        const isPredecessor = allPredecessorsSet.has(container.id);
        const isUnlock = allSuccessorsSet.has(container.id);
        isDimmed = !isPredecessor && !isUnlock;
      } else if (eraKey) {
        isDimmed = container.era !== eraKey;
      }

      return {
        id: container.id,
        type: 'universeContainer',
        position: { x: container.x, y: container.y },
        draggable: false,
        selectable: false,
        zIndex: -1,
        data: {
          title: container.title,
          badgeColor: container.badgeColor,
          borderColor: container.borderColor,
          glowColor: container.glowColor,
          width: container.width,
          height: container.height,
          isDimmed,
        },
      };
    });
  }, [activePhase, selectedNodeId, allPredecessorsSet, allSuccessorsSet]);

  // 2. Nodos de producciones interactivas memoizados
  const movieNodes = useMemo<Node[]>(() => {
    const hasSelection = Boolean(selectedNodeId);
    const eraKey = activePhase !== 'all' ? activePhase.toLowerCase().replace(' ', '-') : null;

    return ROADMAP_NODE_LAYOUTS.map((layout) => {
      const item = itemsMap.get(layout.id);
      if (!item) return null;

      const isWatched = watchedIds.has(item.id);
      const isSelected = selectedNodeId === item.id;
      const isPrerequisite = hasSelection ? allPredecessorsSet.has(item.id) : false;
      const isUnlock = hasSelection ? allSuccessorsSet.has(item.id) : false;

      // Atenuación inteligente según fase activa y selección
      let isDimmed = false;
      if (hasSelection) {
        isDimmed = !isSelected && !isPrerequisite && !isUnlock;
      } else if (eraKey) {
        isDimmed = layout.era !== eraKey;
      }

      if (showOnlyUnwatched && isWatched) {
        isDimmed = true;
      }

      return {
        id: item.id,
        type: 'roadmapNode' as const,
        position: { x: layout.x, y: layout.y },
        data: {
          item,
          isWatched,
          isNexus: layout.isNexus,
          isSpecial: layout.isSpecial,
          era: layout.era,
          lane: layout.lane,
          isSelected,
          isPrerequisite,
          isUnlock,
          isDimmed,
          onToggleWatched: toggleWatched,
          onSelectNode: handleSelectNode,
        },
      };
    }).filter(Boolean) as Node[];
  }, [
    itemsMap,
    watchedIds,
    selectedNodeId,
    allPredecessorsSet,
    allSuccessorsSet,
    activePhase,
    showOnlyUnwatched,
    toggleWatched,
    handleSelectNode,
  ]);

  const nodes = useMemo<Node[]>(() => {
    return [...containerNodes, ...movieNodes];
  }, [containerNodes, movieNodes]);

  // Construcción instantánea O(1) de Aristas (Edges) con especificaciones precalculadas
  const edges = useMemo<RoadmapEdgeType[]>(() => {
    const hasSelection = Boolean(selectedNodeId);
    const eraKey = activePhase !== 'all' ? activePhase.toLowerCase().replace(' ', '-') : null;

    return STATIC_EDGE_SPECS.map((spec) => {
      let isPrerequisitePath = false;
      let isUnlockPath = false;
      let isDimmed = false;

      if (hasSelection) {
        isPrerequisitePath =
          spec.target === selectedNodeId ||
          (allPredecessorsSet.has(spec.target) && allPredecessorsSet.has(spec.source));

        isUnlockPath =
          spec.source === selectedNodeId ||
          (allSuccessorsSet.has(spec.source) && allSuccessorsSet.has(spec.target));

        isDimmed = !isPrerequisitePath && !isUnlockPath;
      } else if (eraKey) {
        const sourceMatch = spec.sourceEra === eraKey;
        const targetMatch = spec.targetEra === eraKey;
        isDimmed = !sourceMatch && !targetMatch;
      }

      return {
        id: spec.id,
        source: spec.source,
        target: spec.target,
        sourceHandle: spec.sourceHandle,
        targetHandle: spec.targetHandle,
        type: 'roadmapEdge' as const,
        data: {
          arc: spec.arc,
          priority: spec.priority,
          isEssential: spec.isEssential,
          label: spec.label,
          isHighlighted: isPrerequisitePath || isUnlockPath,
          isPrerequisitePath,
          isUnlockPath,
          isDimmed,
          isPostEndgame: spec.isPostEndgame,
          isMergedTarget: spec.isMergedTarget,
          isPrimaryIncoming: spec.isPrimaryIncoming,
          targetJunctionOffset: spec.targetJunctionOffset,
          isEndgameBranch: spec.isEndgameBranch,
        },
      };
    });
  }, [selectedNodeId, allPredecessorsSet, allSuccessorsSet, activePhase]);

  return (
    <div className="relative w-full h-[calc(100vh-80px)] sm:h-[calc(100vh-100px)] min-h-[580px] rounded-3xl overflow-hidden border border-white/10 shadow-[0_24px_60px_rgba(0,0,0,0.85)] bg-[#07080F] flex flex-col">
      {/* ─────────────────────────────────────────────────────────────
          TOP FLOATING BAR: VOLVER AL DASHBOARD + FILTROS DE FASES + CENTRAR MAPA
          ───────────────────────────────────────────────────────────── */}
      <div className="absolute top-3 inset-x-3 sm:inset-x-6 z-40 flex items-center justify-between gap-2.5 sm:gap-3 pointer-events-auto">
        {/* Botón Volver al Dashboard */}
        <button
          onClick={onBackToDashboard}
          className="bg-[#0B0D19]/90 hover:bg-[#14172B] border border-white/15 text-zinc-200 hover:text-white font-display text-xs sm:text-sm font-semibold px-3.5 sm:px-4 py-2 rounded-full flex items-center gap-2 cursor-pointer shadow-lg transition-all active:scale-95 shrink-0"
        >
          <ArrowLeft className="w-4 h-4 text-[#00A8FF]" />
          <span className="hidden sm:inline">Volver al Dashboard</span>
          <span className="sm:hidden">Volver</span>
        </button>

        {/* Desktop: Filtros de Fases (Barra horizontal con píldoras) */}
        <div className="hidden sm:flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar bg-[#0A0B14]/92 backdrop-blur-xl border border-white/10 px-2 py-1.5 rounded-full shadow-2xl shrink min-w-0">
          {PHASE_FILTERS.map((phase) => {
            const isActive = activePhase === phase.id;
            return (
              <button
                key={phase.id}
                onClick={() => handleSelectPhase(phase.id)}
                className={`px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
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

        {/* Móvil: Selector desplegable de Fases */}
        <div className="relative sm:hidden">
          <button
            type="button"
            onClick={() => setIsPhaseDropdownOpen((prev) => !prev)}
            className="bg-[#0A0B14]/95 hover:bg-[#121424] active:scale-95 border border-white/20 text-white text-xs font-semibold px-3 py-2 rounded-full flex items-center gap-1.5 cursor-pointer shadow-xl transition-all"
            aria-expanded={isPhaseDropdownOpen}
          >
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{
                backgroundColor: currentPhaseMeta.color,
                boxShadow: `0 0 6px ${currentPhaseMeta.color}`,
              }}
            />
            <span className="truncate max-w-[105px]">{currentPhaseMeta.label}</span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-zinc-400 transition-transform duration-200 shrink-0 ${
                isPhaseDropdownOpen ? 'rotate-180 text-white' : ''
              }`}
            />
          </button>

          {/* Menú desplegable */}
          {isPhaseDropdownOpen && (
            <>
              {/* Capa invisible para cerrar al hacer clic afuera (sin oscurecer ni crear cartel) */}
              <div
                className="fixed inset-0 z-40 bg-transparent"
                onClick={() => setIsPhaseDropdownOpen(false)}
              />

              <div className="absolute top-full mt-1.5 left-0 min-w-[145px] w-full bg-[#0A0B14]/98 backdrop-blur-xl border border-white/15 rounded-2xl shadow-[0_16px_36px_rgba(0,0,0,0.9)] p-1 z-50 flex flex-col gap-0.5 animate-in fade-in slide-in-from-top-1 duration-150">
                {PHASE_FILTERS.map((phase) => {
                  const isActive = activePhase === phase.id;
                  return (
                    <button
                      key={phase.id}
                      type="button"
                      onClick={() => {
                        handleSelectPhase(phase.id);
                        setIsPhaseDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-2 cursor-pointer ${
                        isActive
                          ? 'bg-white/15 text-white font-semibold'
                          : 'text-zinc-300 hover:text-white hover:bg-white/5 active:bg-white/10'
                      }`}
                    >
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{
                          backgroundColor: phase.color,
                          boxShadow: isActive ? `0 0 6px ${phase.color}` : undefined,
                        }}
                      />
                      <span className="truncate flex-1">{phase.label}</span>
                      {isActive && (
                        <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 ml-1" />
                      )}
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* Controles del Lado Derecho: Solo Pendientes + Centrar Mapa */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setShowOnlyUnwatched((prev) => !prev)}
            className={`px-3 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all border ${
              showOnlyUnwatched
                ? 'bg-amber-500/20 text-amber-300 border-amber-400/50 shadow-[0_0_12px_rgba(245,158,11,0.25)]'
                : 'text-zinc-400 hover:text-zinc-200 bg-[#0B0D19]/90 border-white/15'
            }`}
            title="Ocultar producciones ya vistas"
          >
            <Filter className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">Solo pendientes</span>
          </button>

          <button
            onClick={handleResetView}
            className="bg-[#0B0D19]/90 hover:bg-[#14172B] border border-white/15 text-zinc-300 hover:text-white text-xs font-semibold px-3.5 py-2 rounded-full flex items-center gap-1.5 cursor-pointer shadow-lg transition-all active:scale-95"
            title="Centrar todo el mapa"
          >
            <Compass className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">Centrar Mapa</span>
          </button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          CANVAS INTERACTIVO DE GRAFO (REACT FLOW)
          ───────────────────────────────────────────────────────────── */}
      <div className="flex-1 w-full h-full">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onPaneClick={handlePaneClick}
          defaultViewport={defaultViewport}
          minZoom={0.08}
          maxZoom={1.75}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
          elevateNodesOnSelect={false}
          elevateEdgesOnSelect={false}
          onlyRenderVisibleElements={true}
          proOptions={{ hideAttribution: true }}
          fitViewOptions={{ padding: 0.2 }}
        >
          {/* Fondo Cósmico Estrellado / Cuadrícula Sutil */}
          <Background
            color="#1F2338"
            gap={44}
            size={1.6}
            variant={BackgroundVariant.Dots}
            className="opacity-70"
          />
        </ReactFlow>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          CONTROLES FLOTANTES HUD (MINIMALISTAS)
          ───────────────────────────────────────────────────────────── */}
      <RoadmapControls />
    </div>
  );
};

export const RoadmapView: React.FC<RoadmapViewProps> = (props) => {
  return (
    <ReactFlowProvider>
      <RoadmapCanvasContent {...props} />
    </ReactFlowProvider>
  );
};
