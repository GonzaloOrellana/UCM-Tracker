import React from 'react';
import { ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import { useReactFlow } from '@xyflow/react';

export const RoadmapControls: React.FC = () => {
  const { zoomIn, zoomOut, fitView } = useReactFlow();

  return (
    <div className="fixed bottom-4 right-4 z-40 flex items-center gap-1 p-1.5 rounded-2xl bg-[#090A14]/90 backdrop-blur-xl border border-white/12 shadow-[0_12px_32px_rgba(0,0,0,0.7)] text-zinc-300 select-none">
      <button
        onClick={() => zoomIn({ duration: 300 })}
        className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
        title="Acercar (Zoom In)"
      >
        <ZoomIn className="w-4 h-4" />
      </button>
      <button
        onClick={() => zoomOut({ duration: 300 })}
        className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
        title="Alejar (Zoom Out)"
      >
        <ZoomOut className="w-4 h-4" />
      </button>
      <div className="w-[1px] h-4 bg-white/10 mx-0.5" />
      <button
        onClick={() => fitView({ padding: 0.15, duration: 600 })}
        className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
        title="Centrar y Ver Todo el Mapa"
      >
        <Maximize2 className="w-4 h-4" />
      </button>
    </div>
  );
};
