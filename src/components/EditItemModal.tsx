import React, { useState, useEffect } from 'react';
import { MCUItem, MCUPhase, MediaType } from '../types/mcu';
import { useMCU } from '../context/MCUContext';
import { X, Edit2, Upload } from 'lucide-react';

interface EditItemModalProps {
  item: MCUItem | null;
  onClose: () => void;
}

export const EditItemModal: React.FC<EditItemModalProps> = ({ item, onClose }) => {
  const { updateItem } = useMCU();

  const [title, setTitle] = useState('');
  const [originalTitle, setOriginalTitle] = useState('');
  const [type, setType] = useState<MediaType>('movie');
  const [releaseYear, setReleaseYear] = useState<number>(2020);
  const [phase, setPhase] = useState<MCUPhase>('Fase 1');
  const [overview, setOverview] = useState('');
  const [heroCharacter, setHeroCharacter] = useState('');
  const [posterUrl, setPosterUrl] = useState('');

  useEffect(() => {
    if (item) {
      setTitle(item.titulo);
      setOriginalTitle(item.tituloOriginal || item.titulo);
      setType(item.tipo);
      setReleaseYear(item.anioLanzamiento);
      setPhase(item.fase);
      setOverview(item.resumen || '');
      setHeroCharacter(item.personajePrincipal || '');
      setPosterUrl(item.urlPoster || '');
    }
  }, [item]);

  // Handle Escape key to close edit modal without closing detail modal underneath
  useEffect(() => {
    if (!item) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopImmediatePropagation();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [item, onClose]);

  if (!item) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPosterUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateItem(item.id, {
      titulo: title,
      tituloOriginal: originalTitle,
      tipo: type,
      anioLanzamiento: Number(releaseYear),
      fase: phase,
      resumen: overview,
      personajePrincipal: heroCharacter || undefined,
      urlPoster: posterUrl,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-xl bg-white border border-zinc-200 rounded-[24px] shadow-2xl flex flex-col max-h-[88vh] overflow-hidden text-zinc-900">
        
        {/* Fixed Header */}
        <div className="p-5 border-b border-zinc-100 flex items-center justify-between shrink-0 bg-white z-10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-zinc-100 text-zinc-900 rounded-xl border border-zinc-200">
              <Edit2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-medium text-zinc-900 tracking-tight">Editar Producción</h2>
              <p className="text-xs text-zinc-500 font-normal mt-0.5">Modifica los detalles de "{item.titulo}"</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 rounded-xl transition-colors cursor-pointer"
            title="Cerrar"
          >
            <X className="w-5 h-5 stroke-[2]" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4 bg-white">
          <form id="edit-item-form" onSubmit={handleSubmit} className="space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-zinc-800 block mb-1">
                  Título <span className="text-[#C81D25]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 focus:border-zinc-900 rounded-xl text-xs text-zinc-900 outline-none font-medium transition-all shadow-xs focus:ring-1 focus:ring-zinc-900"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-zinc-800 block mb-1">
                  Año <span className="text-[#C81D25]">*</span>
                </label>
                <input
                  type="number"
                  value={releaseYear}
                  onChange={(e) => setReleaseYear(parseInt(e.target.value) || 2024)}
                  className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 focus:border-zinc-900 rounded-xl text-xs text-zinc-900 outline-none font-medium transition-all shadow-xs focus:ring-1 focus:ring-zinc-900"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-zinc-800 block mb-1">
                  Fase del MCU <span className="text-[#C81D25]">*</span>
                </label>
                <select
                  value={phase}
                  onChange={(e) => setPhase(e.target.value as MCUPhase)}
                  className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 focus:border-zinc-900 rounded-xl text-xs text-zinc-900 outline-none font-normal transition-all shadow-xs focus:ring-1 focus:ring-zinc-900"
                >
                  <option value="Fase 1">Fase 1</option>
                  <option value="Fase 2">Fase 2</option>
                  <option value="Fase 3">Fase 3</option>
                  <option value="Fase 4">Fase 4</option>
                  <option value="Fase 5">Fase 5</option>
                  <option value="Fase 6">Fase 6</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-zinc-800 block mb-1">Héroe Principal</label>
                <input
                  type="text"
                  value={heroCharacter}
                  onChange={(e) => setHeroCharacter(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 focus:border-zinc-900 rounded-xl text-xs text-zinc-900 outline-none font-medium transition-all shadow-xs focus:ring-1 focus:ring-zinc-900"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-zinc-800 block mb-1">Poster URL / Archivo</label>
              <div className="flex gap-3 items-center">
                <input
                  type="text"
                  value={posterUrl}
                  onChange={(e) => setPosterUrl(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 bg-white border border-zinc-200 focus:border-zinc-900 rounded-xl text-xs text-zinc-900 outline-none font-medium transition-all shadow-xs focus:ring-1 focus:ring-zinc-900"
                />
                <label className="px-4 py-2.5 bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 text-xs text-zinc-900 font-medium rounded-full cursor-pointer flex items-center gap-1.5 transition-all shadow-xs">
                  <Upload className="w-4 h-4 text-zinc-700" />
                  <span>Subir</span>
                  <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                </label>
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-zinc-800 block mb-1">Sinopsis</label>
              <textarea
                rows={3}
                value={overview}
                onChange={(e) => setOverview(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 focus:border-zinc-900 rounded-xl text-xs text-zinc-900 outline-none font-medium transition-all shadow-xs focus:ring-1 focus:ring-zinc-900"
              />
            </div>

          </form>
        </div>

        {/* Fixed Footer */}
        <div className="p-4 sm:p-5 border-t border-zinc-100 flex items-center justify-between shrink-0 bg-white z-10">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 text-xs font-medium rounded-full transition-colors cursor-pointer"
          >
            Cancelar
          </button>
          <button
            form="edit-item-form"
            type="submit"
            className="px-6 py-2.5 bg-[#1A1A1A] hover:bg-zinc-800 text-white text-xs font-medium rounded-full shadow-xs transition-all cursor-pointer"
          >
            Guardar Cambios
          </button>
        </div>

      </div>
    </div>
  );
};
