import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMCU } from '../context/MCUContext';
import { NavView, MCUItem } from '../types/mcu';
import {
  ArrowLeft,
  BookOpen,
  Clapperboard,
  ExternalLink,
  Flame,
  Globe2,
  Play,
  Sparkles,
  Zap,
} from 'lucide-react';

interface DoomsdayRoadmapViewProps {
  onBackToDashboard: () => void;
  onNavigate: (view: NavView) => void;
}

interface PrepMilestone {
  id: string;
  productionId: string;
  additionalProductionId?: string;
  title: string;
  year: string;
  whyItMatters: string;
  posterUrl?: string;
  isUpcoming?: boolean;
}

interface QuickRecapItem {
  id: string;
  productionId: string;
  title: string;
  year: string;
  keyTakeaway: string;
  posterUrl?: string;
}

export const DoomsdayRoadmapView: React.FC<DoomsdayRoadmapViewProps> = ({
  onBackToDashboard,
}) => {
  const { items } = useMCU();
  const [activeTab, setActiveTab] = useState<'prep' | 'comics' | 'climax'>('prep');

  // Curation: Imprescindibles ordenadas para estar preparado para Avengers: Doomsday
  const prepMilestones: PrepMilestone[] = useMemo(
    () => [
      {
        id: 'prep-x-men-1-2',
        productionId: 'x-men-2000',
        additionalProductionId: 'x-men-2-2003',
        title: 'X-Men 1 y 2',
        year: '2000 — 2003',
        whyItMatters:
          'Recomendadas por la importancia de la pérdida de personajes y la dinámica entre el Profesor X y Magneto.',
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BNzNjZjQwOTAtNWQ3NC00MmJlLThlZDEtZmUyMWQ3NmE4Y2Y5XkEyXkFqcGc@._V1_.jpg',
      },
      {
        id: 'prep-avengers-endgame',
        productionId: 'avengers-endgame-23',
        title: 'Vengadores: Endgame',
        year: '2019',
        whyItMatters:
          'Fundamental para entender las consecuencias narrativas tras la partida de Tony Stark y Steve Rogers.',
      },
      {
        id: 'prep-wakanda-forever',
        productionId: 'black-panther-wakanda-forever-38',
        title: 'Black Panther: Wakanda Forever',
        year: '2022',
        whyItMatters:
          'Establece el estado actual de Wakanda y su tensa relación con Namor.',
      },
      {
        id: 'prep-doctor-strange-mom',
        productionId: 'doctor-strange-2-34',
        title: 'Doctor Strange en el multiverso de la locura',
        year: '2022',
        whyItMatters:
          'Vital para comprender cómo funcionan las incursiones en el multiverso y el destino de Clea.',
      },
      {
        id: 'prep-fantastic-four',
        productionId: 'fantastic-four-first-steps-2025',
        title: 'Los 4 Fantásticos: Primeros Pasos',
        year: '2025',
        whyItMatters:
          'Útil para refrescar la historia, los poderes y la dinámica de los personajes, además de la aparición de Doctor Doom.',
      },
      {
        id: 'prep-loki-s2',
        productionId: 'loki-s2',
        title: 'Loki (Temporada 2)',
        year: '2023',
        whyItMatters:
          'Muy recomendable ver especialmente el final, dado que tendrá una conexión directa con los eventos de Doomsday.',
      },
      {
        id: 'prep-thunderbolts',
        productionId: 'thunderbolts-44',
        title: 'Thunderbolts*',
        year: '2025',
        whyItMatters:
          'Esencial para conocer a este grupo, que se perfila como los nuevos Vengadores, y entender el rol relevante de Yelena.',
      },
    ],
    []
  );

  // Curation: Resumen de lo que no necesitas volver a ver (Recap Clave)
  const quickRecapItems: QuickRecapItem[] = useMemo(
    () => [
      {
        id: 'recap-thor-love-thunder',
        productionId: 'thor-love-and-thunder-35',
        title: 'Thor: Love and Thunder',
        year: '2022',
        keyTakeaway:
          'Solo necesitas saber que Thor adoptó a Love, una niña con poderes vinculados a la Eternidad.',
      },
      {
        id: 'recap-captain-america-4',
        productionId: 'captain-america-brave-new-world-43',
        title: 'Capitán América: Brave New World',
        year: '2025',
        keyTakeaway:
          'Basta saber que Sam Wilson es el nuevo Capitán América.',
      },
      {
        id: 'recap-agatha-all-along',
        productionId: 'agatha-all-along-2024',
        title: 'Agatha All Along',
        year: '2024',
        keyTakeaway:
          'Solo es relevante saber que Billy es la reencarnación del hijo de Wanda Maximoff.',
      },
    ],
    []
  );

  // Helper to get production item from context
  const getProduction = (productionId: string): MCUItem | undefined => {
    return items.find((i) => i.id === productionId);
  };

  // Helper to render the official watch button (matching DetailModal)
  const getWatchButtonData = (prod?: MCUItem) => {
    const watchUrl = prod?.urlOficial || 'https://www.disneyplus.com';
    const isMercadoPlay = Boolean(watchUrl.includes('mercadolibre'));
    const isPrimeVideo = Boolean(watchUrl.includes('primevideo'));
    const isDisney = Boolean(watchUrl.includes('disneyplus'));

    const tooltip = isMercadoPlay
      ? 'Ver en Mercado Play (Sitio oficial)'
      : isPrimeVideo
      ? 'Ver en Prime Video (Sitio oficial)'
      : isDisney
      ? 'Ver en Disney+ (Sitio oficial)'
      : 'Ver en sitio oficial';

    const buttonClasses = isMercadoPlay
      ? 'bg-[#FFE600] hover:bg-[#F2DC00] text-zinc-950 shadow-[0_2px_8px_rgba(255,230,0,0.35)]'
      : isPrimeVideo
      ? 'bg-[#00A8E1] hover:bg-[#0092C5] text-white shadow-[0_2px_8px_rgba(0,168,225,0.35)]'
      : isDisney
      ? 'bg-[#0063e5] hover:bg-[#0051bf] text-white shadow-[0_2px_8px_rgba(0,99,229,0.35)]'
      : 'bg-zinc-900 hover:bg-black text-white shadow-[0_2px_8px_rgba(0,0,0,0.25)]';

    const renderLogo = () => {
      if (isMercadoPlay) {
        return (
          <img
            src="/logos-plataformas/mercado-libre-logo.png"
            alt="Mercado Libre"
            className="w-3.5 h-3.5 object-contain shrink-0 transition-transform group-hover/watch:scale-110"
          />
        );
      }
      if (isPrimeVideo) {
        return (
          <img
            src="/logos-plataformas/amazon-prime-video.png"
            alt="Prime Video"
            className="w-3.5 h-3.5 object-contain rounded-xs shrink-0 shadow-2xs transition-transform group-hover/watch:scale-110"
          />
        );
      }
      if (isDisney) {
        return (
          <span className="w-3.5 h-3.5 rounded-full overflow-hidden shrink-0 flex items-center justify-center transition-transform group-hover/watch:scale-110 shadow-2xs">
            <img
              src="/logos-plataformas/Disney_plus_icon.png"
              alt="Disney+"
              className="w-full h-full object-cover scale-110"
            />
          </span>
        );
      }
      return <ExternalLink className="w-3 h-3 text-white/70 group-hover/watch:text-white transition-colors" />;
    };

    return { watchUrl, tooltip, buttonClasses, renderLogo };
  };

  return (
    <div className="flex-1 flex flex-col space-y-6 animate-fade-in pb-12 max-w-[1580px] mx-auto w-full">
      {/* ─────────────────────────────────────────────────────────────
          TOP NAV BAR (Clean Back Button)
          ───────────────────────────────────────────────────────────── */}
      <div className="flex items-center pt-1">
        <button
          onClick={onBackToDashboard}
          className="tactile-btn-glass text-white font-label text-xs sm:text-sm font-semibold px-3.5 py-2 rounded-full flex items-center gap-2 cursor-pointer shadow-md hover:border-emerald-500/50 hover:text-emerald-300 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Dashboard</span>
        </button>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          HERO BANNER: CLEAN CINEMATIC POSTER WITH DOOMSDAY LOGO
          ───────────────────────────────────────────────────────────── */}
      <div className="relative rounded-3xl overflow-hidden border border-emerald-500/20 shadow-2xl p-6 sm:p-8 xl:p-10 min-h-[190px] sm:min-h-[220px] flex flex-col justify-center bg-black">
        {/* Background Artwork: Official Avengers Doomsday Emblem */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src="/avengersDoomsday-logo.png"
            alt="Avengers: Doomsday"
            className="w-full h-full object-cover object-right select-none opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/75 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
        </div>

        {/* Ambient Subtle Emerald Glow */}
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none z-0" />

        {/* Minimalist Content */}
        <div className="relative z-10 max-w-2xl space-y-2">
          <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black tracking-tight text-white leading-tight drop-shadow-md">
            Camino a <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-green-400">Avengers: Doomsday</span> & <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-200">Secret Wars</span>
          </h1>

          <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed max-w-xl">
            Incursiones multiversales, el tablero de Victor Von Doom y la creación de Battleworld.
          </p>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          NAVIGATION TABS (3 CONCISE CHAPTERS - NO BADGE OVERLOAD)
          ───────────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('prep')}
          className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-label text-xs sm:text-sm font-bold tracking-wide transition-all shrink-0 cursor-pointer ${
            activeTab === 'prep'
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-[0_0_16px_rgba(16,185,129,0.35)] border-t border-emerald-300/40'
              : 'tactile-bento-card text-zinc-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Clapperboard className="w-4 h-4" />
          <span>Qué ver para estar preparado</span>
        </button>

        <button
          onClick={() => setActiveTab('comics')}
          className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-label text-xs sm:text-sm font-bold tracking-wide transition-all shrink-0 cursor-pointer ${
            activeTab === 'comics'
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-[0_0_16px_rgba(16,185,129,0.35)] border-t border-emerald-300/40'
              : 'tactile-bento-card text-zinc-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Origen en Cómics</span>
        </button>

        <button
          onClick={() => setActiveTab('climax')}
          className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-label text-xs sm:text-sm font-bold tracking-wide transition-all shrink-0 cursor-pointer ${
            activeTab === 'climax'
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-[0_0_16px_rgba(16,185,129,0.35)] border-t border-emerald-300/40'
              : 'tactile-bento-card text-zinc-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Clapperboard className="w-4 h-4" />
          <span>El Clímax en Cine</span>
        </button>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          TAB CONTENT AREA
          ───────────────────────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {/* TAB 1: QUÉ VER PARA ESTAR PREPARADO (IMPRESCINDIBLES + RECAP EXPRÉS) */}
        {activeTab === 'prep' && (
          <motion.div
            key="tab-prep"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            {/* Subsection 1: Imprescindibles */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
                <h3 className="font-display text-sm sm:text-base font-bold text-white tracking-tight uppercase">
                  Imprescindibles
                </h3>
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {prepMilestones.map((milestone) => {
                  const prod = getProduction(milestone.productionId);
                  const posterUrl = prod?.urlPoster || milestone.posterUrl;

                  return (
                    <div
                      key={milestone.id}
                      className="tactile-bento-card rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden border-emerald-500/15 hover:border-emerald-500/35 transition-all"
                    >
                      <div>
                        {/* Poster + Title Section */}
                        <div className="flex gap-3.5 items-start mb-2.5">
                          {posterUrl && (
                            <div className="w-16 h-24 rounded-xl overflow-hidden shrink-0 border border-white/10 bg-zinc-900 shadow-md">
                              <img
                                src={posterUrl}
                                alt={milestone.title}
                                className="w-full h-full object-cover"
                                loading="lazy"
                              />
                            </div>
                          )}

                          <div className="min-w-0 flex-1 space-y-1">
                            <h4 className="font-display text-sm font-bold text-white leading-tight line-clamp-2">
                              {milestone.title}
                            </h4>
                            <span className="text-[11px] text-zinc-400 block font-mono">
                              {milestone.year}
                            </span>
                          </div>
                        </div>

                        {/* Motivo por el cual ver */}
                        <p className="text-xs text-zinc-300/85 mb-3.5 leading-relaxed font-sans">
                          {milestone.whyItMatters}
                        </p>
                      </div>

                      {/* Action Button */}
                      <div className="pt-1">
                        {milestone.additionalProductionId ? (
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <a
                              href={getWatchButtonData(prod).watchUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-wide bg-[#0063e5] hover:bg-[#0051bf] text-white shadow-xs transition-all hover:scale-[1.03]"
                              title="Ver X-Men (2000) en Disney+"
                            >
                              <Play className="w-3 h-3 fill-current" />
                              <span>X-Men 1</span>
                              {getWatchButtonData(prod).renderLogo()}
                            </a>
                            {(() => {
                              const prod2 = getProduction(milestone.additionalProductionId);
                              const { watchUrl, renderLogo } = getWatchButtonData(prod2);
                              return (
                                <a
                                  href={watchUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-wide bg-[#0063e5] hover:bg-[#0051bf] text-white shadow-xs transition-all hover:scale-[1.03]"
                                  title="Ver X-Men 2 (2003) en Disney+"
                                >
                                  <Play className="w-3 h-3 fill-current" />
                                  <span>X-Men 2</span>
                                  {renderLogo()}
                                </a>
                              );
                            })()}
                          </div>
                        ) : prod && !milestone.isUpcoming ? (
                          (() => {
                            const { watchUrl, tooltip, buttonClasses, renderLogo } = getWatchButtonData(prod);
                            return (
                              <a
                                href={watchUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                title={tooltip}
                                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-wide transition-all duration-200 hover:scale-[1.03] active:scale-95 cursor-pointer select-none group/watch ${buttonClasses}`}
                              >
                                <Play className="w-3 h-3 fill-current transition-transform group-hover/watch:scale-110" />
                                <span>Ver ahora</span>
                                {renderLogo()}
                              </a>
                            );
                          })()
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] text-amber-400 font-mono py-1">
                            <span>Próximamente en cines</span>
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Subsection 2: Resumen de lo que no necesitas volver a ver */}
            <div className="pt-4 space-y-3">
              <div className="border-t border-white/10 pt-5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_10px_#fbbf24]" />
                  <h3 className="font-display text-sm sm:text-base font-bold text-white tracking-tight uppercase">
                    Resumen de lo que no necesitas volver a ver
                  </h3>
                </div>
                <p className="text-xs text-zinc-400 mt-1">
                  Ahorra tiempo de visionado: únicamente necesitas conocer estos tres puntos narrativos específicos para comprender su contexto en Doomsday:
                </p>
              </div>

              {/* 3 Quick Recap Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {quickRecapItems.map((recap) => {
                  const prod = getProduction(recap.productionId);
                  const posterUrl = prod?.urlPoster || recap.posterUrl;

                  return (
                    <div
                      key={recap.id}
                      className="tactile-bento-card rounded-2xl p-4 flex flex-col justify-between border-amber-500/20 bg-gradient-to-br from-[#13110b]/70 via-zinc-950/60 to-black/80 hover:border-amber-500/40 transition-all shadow-md"
                    >
                      <div>
                        {/* Top: Mini Poster + Title + Year */}
                        <div className="flex items-center gap-3 mb-3">
                          {posterUrl && (
                            <div className="w-12 h-16 rounded-lg overflow-hidden shrink-0 border border-white/15 bg-zinc-900 shadow-sm">
                              <img
                                src={posterUrl}
                                alt={recap.title}
                                className="w-full h-full object-cover"
                                loading="lazy"
                              />
                            </div>
                          )}
                          <div className="min-w-0 flex-1">
                            <h4 className="font-display text-sm font-bold text-white leading-tight truncate">
                              {recap.title}
                            </h4>
                            <span className="text-[10.5px] text-zinc-400 font-mono block mt-0.5">
                              {recap.year}
                            </span>
                          </div>
                        </div>

                        {/* Crucial Takeaway Text */}
                        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-zinc-200 leading-relaxed font-sans">
                          <p>{recap.keyTakeaway}</p>
                        </div>
                      </div>

                      {/* Footer Info / Optional Watch */}
                      {prod && (
                        <div className="pt-3 flex items-center justify-end border-t border-white/5 mt-3">
                          {(() => {
                            const { watchUrl, tooltip, buttonClasses, renderLogo } = getWatchButtonData(prod);
                            return (
                              <a
                                href={watchUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                title={tooltip}
                                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-medium tracking-wide transition-all hover:scale-[1.02] cursor-pointer select-none group/watch ${buttonClasses}`}
                              >
                                <span>Ver</span>
                                {renderLogo()}
                              </a>
                            );
                          })()}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </motion.div>
        )}

        {/* TAB 2: ORIGEN EN CÓMICS (CLEAN & NON-REPETITIVE) */}
        {activeTab === 'comics' && (
          <motion.div
            key="tab-comics"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {/* Card 1: La Regla de las Incursiones */}
            <div className="tactile-bento-card rounded-2xl p-5 sm:p-6 space-y-2.5 border-emerald-500/15">
              <div className="flex items-center gap-2 text-emerald-400">
                <Globe2 className="w-5 h-5" />
                <h3 className="font-display text-base sm:text-lg font-bold text-white">
                  Colapso de Realidades
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-zinc-300/85 leading-relaxed">
                En la etapa de <strong>Jonathan Hickman</strong>, una incursión es el choque frontal de dos Tierras paralelas en un punto focal que dura 8 horas. Si ninguna de las dos es destruida, <strong>ambos universos son aniquilados por completo</strong>.
              </p>
            </div>

            {/* Card 2: Dios Emperador Doom y Battleworld */}
            <div className="tactile-bento-card rounded-2xl p-5 sm:p-6 space-y-2.5 border-emerald-500/15">
              <div className="flex items-center gap-2 text-emerald-400">
                <Flame className="w-5 h-5" />
                <h3 className="font-display text-base sm:text-lg font-bold text-white">
                  Battleworld
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-zinc-300/85 leading-relaxed">
                Ante la extinción inevitable del cosmos provocada por los Todopoderosos, <strong>Victor Von Doom</strong> roba su poder divino para salvar fragmentos de universos destruidos y unirlos en un único planeta mosaico gobernado por su voluntad.
              </p>
            </div>

            {/* Card 3: Doom vs Reed Richards */}
            <div className="tactile-bento-card rounded-2xl p-5 sm:p-6 space-y-2.5 border-amber-500/15">
              <div className="flex items-center gap-2 text-amber-400">
                <Sparkles className="w-5 h-5" />
                <h3 className="font-display text-base sm:text-lg font-bold text-white">
                  Doom vs. Reed Richards
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-zinc-300/85 leading-relaxed">
                El corazón de <em>Secret Wars</em>: Doom salvó la realidad mediante el absolutismo y el miedo, pero reconoce que Reed lo habría hecho mejor, permitiendo a Richards reconstruir un multiverso libre y luminoso.
              </p>
            </div>
          </motion.div>
        )}

        {/* TAB 3: EL CLÍMAX EN CINE (ANUNCIO + DESTINO) */}
        {activeTab === 'climax' && (
          <motion.div
            key="tab-climax"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* Card 1: El Regreso de RDJ */}
            <div className="tactile-bento-card rounded-2xl p-5 sm:p-6 space-y-2.5 border-emerald-500/15">
              <div className="flex items-center gap-2 text-emerald-400">
                <Clapperboard className="w-5 h-5" />
                <h3 className="font-display text-base sm:text-lg font-bold text-white">
                  Robert Downey Jr. es Doom
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-zinc-300/85 leading-relaxed">
                Marvel confirmó que RDJ interpreta al genuino <strong>Victor Von Doom</strong> de Latveria, no a una variante de Tony Stark. <strong>Joe & Anthony Russo</strong> dirigen y <strong>Stephen McFeely</strong> escribe el guion de ambas películas.
              </p>
            </div>

            {/* Card 2: Soft-Reboot */}
            <div className="tactile-bento-card rounded-2xl p-5 sm:p-6 space-y-2.5 border-emerald-500/15">
              <div className="flex items-center gap-2 text-emerald-400">
                <Sparkles className="w-5 h-5" />
                <h3 className="font-display text-base sm:text-lg font-bold text-white">
                  Destino & Soft-Reboot
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-zinc-300/85 leading-relaxed">
                La convergencia multiversal unirá a los Vengadores, los X-Men y los Cuatro Fantásticos. Tras <em>Secret Wars</em> en 2027, el UCM unificará su universo en una sola línea temporal continua, abriendo paso a la <strong>Saga Mutante</strong>.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
