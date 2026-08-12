import React from 'react';
import { ComicButton } from './ComicButton';
import { MCUCardComic } from './MCUCardComic';
import { MCUItem } from '../types/mcu';
import { PRODUCTIONS } from '../data/productions';
import { useMCU } from '../context/MCUContext';
import { Sparkles, ArrowRight } from 'lucide-react';

export const ComicPilotPreview: React.FC = () => {
  const { openDetailModal } = useMCU();

  // Obtener ítems reales del dataset PRODUCTIONS
  const ironMan = PRODUCTIONS.find((p) => p.id === 'iron-man-1');
  const avengers = PRODUCTIONS.find((p) => p.id === 'the-avengers-6');
  const spiderMan = PRODUCTIONS.find((p) => p.id === 'spider-man-no-way-home-27');

  const sampleItems: MCUItem[] = [ironMan, avengers, spiderMan].filter(
    (item): item is MCUItem => item !== undefined
  );

  return (
    <div className="bg-comic-dots border-2 border-marvel-divider rounded-xl p-5 sm:p-6 shadow-xl mb-8 font-body text-marvel-ink relative overflow-hidden">
      {/* Esquina decorativa tipo aviso editorial */}
      <div className="absolute top-0 right-0 bg-marvel-red text-white font-label text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-bl-lg shadow-xs">
        PILOTO FASE 2
      </div>

      {/* Header del Preview */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-marvel-red" />
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl uppercase tracking-wider text-marvel-ink leading-none">
            VISTA PREVIA: ESTILO CÓMIC EDITORIAL
          </h2>
        </div>
        <p className="font-body text-xs sm:text-sm text-marvel-ink-muted font-normal leading-relaxed">
          Contenedor de prueba aislado — Demostración de las 3 fuentes de la guía "Vivid Narrative" (Bebas Neue en Display/Titulares, Hanken Grotesk en Cuerpo, Space Grotesk en Metadata/Badges) sobre papel de imprenta (#F7F4EE).
        </p>
      </div>

      {/* Línea divisoria roja fina */}
      <div className="w-full h-[2px] bg-marvel-divider my-5" />

      {/* Muestra de Botones */}
      <div className="space-y-3 mb-8">
        <h3 className="font-display text-xl sm:text-2xl uppercase tracking-wider text-marvel-ink border-b-2 border-marvel-divider/40 pb-1">
          1. BOTONES (PRIMARY, SECONDARY, GHOST)
        </h3>
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <ComicButton variant="primary">
            Explorar Fase <ArrowRight className="w-4 h-4" />
          </ComicButton>
          <ComicButton variant="secondary">
            Filtrar Lista
          </ComicButton>
          <ComicButton variant="ghost">
            Ver Detalles →
          </ComicButton>
        </div>
      </div>

      {/* Muestra de Cards con Badge ISSUE #XX */}
      <div className="space-y-3">
        <h3 className="font-display text-xl sm:text-2xl uppercase tracking-wider text-marvel-ink border-b-2 border-marvel-divider/40 pb-1">
          2. CARDS DE PRODUCCIÓN (ESTILO REFERENCIA VIVID NARRATIVE)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-1">
          {sampleItems.map((item) => (
            <MCUCardComic
              key={item.id}
              item={item}
              onOpenDetail={(selectedItem) => openDetailModal(selectedItem, 'grid')}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
