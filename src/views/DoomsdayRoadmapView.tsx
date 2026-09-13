import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMCU } from '../context/MCUContext';
import { NavView, MCUItem } from '../types/mcu';
import {
  ArrowLeft,
  BookOpen,
  Clapperboard,
  Info,
  Play,
  Sparkles,
} from 'lucide-react';
import { getPlatformInfo } from '../utils/platformHelper';
import { DoomsdayCountdown } from '../components/DoomsdayCountdown';

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

  // Resetear scroll al tope y fijar fondo negro para la sección de Doomsday
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    const rId = requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    });

    const prevBg = document.body.style.backgroundColor;
    document.body.style.backgroundColor = '#000000';
    return () => {
      cancelAnimationFrame(rId);
      document.body.style.backgroundColor = prevBg;
    };
  }, []);

  // Al cambiar entre pestañas internas del evento, volver suavemente arriba
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [activeTab]);

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
        id: 'prep-spider-man-no-way-home',
        productionId: 'spider-man-no-way-home-33',
        title: 'Spider-Man: Sin camino a casa',
        year: '2021',
        whyItMatters:
          'Se produce la primera gran colisión de universos dentro del UCM, dejando posibles consecuencias para Doomsday.',
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
          'Útil para refrescar la historia, los poderes y la dinámica de los personajes, además de la aparición de Doctor Doom. Además la escena post-créditos conecta directamente con la película.',
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
        id: 'prep-deadpool-wolverine',
        productionId: 'deadpool-wolverine-42',
        title: 'Deadpool & Wolverine',
        year: '2024',
        whyItMatters:
          'Se rumorea que la película iniciaría con estos personajes luchando contra el Spider-Man de Tobey Maguire en el mundo de este Spider-Man.',
      },
      {
        id: 'prep-thunderbolts',
        productionId: 'thunderbolts-44',
        title: 'Thunderbolts*',
        year: '2025',
        whyItMatters:
          'Esencial para conocer a este grupo, que se perfila como los nuevos Vengadores, y entender el rol relevante de Yelena. Ademas la escena post-creditos conecta directamente con la pelicula. Aclaracion importante: esta pelicula se recomienda ver despues haber visto Black Widow, Ant-man 2, Falcon y el soldado del invierno y Hawkeye. ',
      },
    ],
    []
  );

  // Curation: Resumen de lo que no necesitas volver a ver (Recap Clave)
  const quickRecapItems: QuickRecapItem[] = useMemo(
    () => [
      {
        id: 'recap-shang-chi',
        productionId: 'shang-chi-and-the-legend-of-the-ten-rings-30',
        title: 'Shang-Chi y la leyenda de los Diez Anillos',
        year: '2021',
        keyTakeaway:
          'Basta con conocer quién es el personaje y el poder de los Diez Anillos, ya que aparece en el tráiler de Avengers: Doomsday.',
      },
      {
        id: 'recap-thor-love-thunder',
        productionId: 'thor-love-and-thunder-35',
        title: 'Thor: Love and Thunder',
        year: '2022',
        keyTakeaway:
          'Solo necesitas saber que Thor adoptó a Love, una niña con poderes vinculados a la Eternidad.',
      },
      {
        id: 'recap-the-marvels',
        productionId: 'the-marvels-41',
        title: 'The Marvels',
        year: '2023',
        keyTakeaway:
          'Su final y escena post-créditos conectan con el multiverso y los X-Men: Monica Rambeau despierta en un universo paralelo tras cerrar la brecha espacial, encontrándose con Binary (variante de su madre, Maria Rambeau) y el mutante Bestia.',
      },
      {
        id: 'recap-agatha-all-along',
        productionId: 'agatha-all-along-2024',
        title: 'Agatha All Along',
        year: '2024',
        keyTakeaway:
          'Solo es relevante saber que Billy es la reencarnación del hijo de Wanda Maximoff.',
      },
      {
        id: 'recap-captain-america-4',
        productionId: 'captain-america-brave-new-world-43',
        title: 'Capitán América: Brave New World',
        year: '2025',
        keyTakeaway:
          'Basta saber que Sam Wilson es el nuevo Capitán América.',
      },
    ],
    []
  );

  // Helper to get production item from context
  const getProduction = (productionId: string): MCUItem | undefined => {
    return items.find((i) => i.id === productionId);
  };

  // Helper to render the official watch button (matching DetailModal)
  const getWatchButtonData = (prod?: MCUItem) => getPlatformInfo(prod?.urlOficial, prod);

  return (
    <div className="flex-1 flex flex-col space-y-6 animate-fade-in pb-12 max-w-[1580px] mx-auto w-full relative">
      {/* Doctor Doom Ambient Aura & Mystic Green Glows */}
      <div className="fixed top-12 right-1/4 w-[500px] h-[500px] bg-emerald-500/[0.07] rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="fixed bottom-1/4 left-10 w-[420px] h-[420px] bg-teal-600/[0.04] rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="fixed top-0 left-0 right-0 h-48 bg-gradient-to-b from-emerald-950/20 via-transparent to-transparent pointer-events-none -z-10" />

      {/* ─────────────────────────────────────────────────────────────
          TOP NAV BAR (Clean Back Button with Doom emerald accent)
          ───────────────────────────────────────────────────────────── */}
      <div className="flex items-center pt-1">
        <button
          onClick={onBackToDashboard}
          className="bg-black/70 border border-emerald-500/30 text-emerald-300 font-display text-xs sm:text-sm font-semibold px-4 py-2 rounded-full flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.12)] hover:border-emerald-400 hover:bg-emerald-950/40 hover:text-emerald-200 hover:shadow-[0_0_22px_rgba(16,185,129,0.3)] transition-all"
        >
          <ArrowLeft className="w-4 h-4 text-emerald-400" />
          <span>Volver al Dashboard</span>
        </button>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          HERO BANNER: OFFICIAL MARVEL STUDIOS AVENGERS DOOMSDAY LOGO (AS TITLE)
          ───────────────────────────────────────────────────────────── */}
      <div className="relative w-full flex items-center justify-center overflow-hidden py-1 sm:py-2 select-none">
        {/* Subtle, refined Ambient Emerald Aura */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[480px] md:w-[650px] lg:w-[800px] h-[120px] sm:h-[160px] md:h-[200px] bg-emerald-500/[0.08] rounded-full blur-[70px] sm:blur-[100px] pointer-events-none -z-10" />

        <h1 className="sr-only">Marvel Studios Avengers: Doomsday</h1>

        <div className="relative flex items-center justify-center w-full h-[140px] sm:h-[190px] md:h-[250px] lg:h-[310px] xl:h-[360px] overflow-hidden">
          <img
            src="/logoAvengersDoomsday.png"
            alt="Marvel Studios Avengers: Doomsday"
            className="w-auto h-[240px] sm:h-[330px] md:h-[430px] lg:h-[530px] xl:h-[620px] max-w-none object-contain select-none pointer-events-none drop-shadow-[0_0_15px_rgba(16,185,129,0.15)]"
          />
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          CINEMATIC COUNTDOWN: AVENGERS DOOMSDAY (MATCHING MARVEL TRAILER)
          ───────────────────────────────────────────────────────────── */}
      <DoomsdayCountdown />

      {/* ─────────────────────────────────────────────────────────────
          NAVIGATION TABS (3 CONCISE CHAPTERS WITH DOOM ACCENTS)
          ───────────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('prep')}
          className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-display text-xs sm:text-sm font-bold tracking-wide transition-all shrink-0 cursor-pointer ${activeTab === 'prep'
            ? 'bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)] border-t border-emerald-300/50'
            : 'bg-zinc-950/70 border border-emerald-900/40 text-zinc-400 hover:text-emerald-300 hover:border-emerald-500/40 hover:bg-emerald-950/20 hover:shadow-[0_0_12px_rgba(16,185,129,0.15)]'
            }`}
        >
          <Clapperboard className="w-4 h-4" />
          <span>Qué ver para estar preparado</span>
        </button>

        <button
          onClick={() => setActiveTab('comics')}
          className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-display text-xs sm:text-sm font-bold tracking-wide transition-all shrink-0 cursor-pointer ${activeTab === 'comics'
            ? 'bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)] border-t border-emerald-300/50'
            : 'bg-zinc-950/70 border border-emerald-900/40 text-zinc-400 hover:text-emerald-300 hover:border-emerald-500/40 hover:bg-emerald-950/20 hover:shadow-[0_0_12px_rgba(16,185,129,0.15)]'
            }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Origen en Cómics</span>
        </button>

        <button
          onClick={() => setActiveTab('climax')}
          className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-display text-xs sm:text-sm font-bold tracking-wide transition-all shrink-0 cursor-pointer ${activeTab === 'climax'
            ? 'bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)] border-t border-emerald-300/50'
            : 'bg-zinc-950/70 border border-emerald-900/40 text-zinc-400 hover:text-emerald-300 hover:border-emerald-500/40 hover:bg-emerald-950/20 hover:shadow-[0_0_12px_rgba(16,185,129,0.15)]'
            }`}
        >
          <Clapperboard className="w-4 h-4" />
          <span>Doomsday y Secret Wars</span>
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
            {/* Sinopsis (Izquierda) + Tráiler Oficial (Derecha) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 items-center">
              {/* Sinopsis a la izquierda */}
              <div className="bg-[#050806]/60 backdrop-blur-md rounded-2xl p-5 sm:p-6 lg:p-7 flex flex-col justify-center space-y-3 shadow-xl">
                <h3 className="font-display text-lg sm:text-xl lg:text-2xl font-bold text-white tracking-tight">
                  Sinopsis
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300/90 leading-relaxed font-sans">
                  Tras el colapso inminente de múltiples realidades desatado por las constantes incursiones multiversales, los Vengadores, los Cuatro Fantásticos y héroes provenientes de distintas líneas temporales deberán unir fuerzas ante una crisis de proporciones cósmicas. Frente a ellos emerge el temible y brillante <strong>Victor von Doom</strong> (Robert Downey Jr.), quien buscará remodelar el tejido mismo de la existencia bajo su propia voluntad suprema.
                </p>
                <div className="pt-1 flex items-center gap-3 text-xs text-zinc-400 font-sans flex-wrap">
                  <span>Dirección: <strong className="text-white">Anthony y Joe Russo</strong></span>
                </div>
              </div>

              {/* Tráiler a la derecha */}
              <div className="w-full">
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(16,185,129,0.12)] bg-black">
                  <iframe
                    src="https://www.youtube-nocookie.com/embed/lAr_uspgHm8"
                    title="Avengers: Doomsday | Tráiler Oficial"
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* Subsection 1: Imprescindibles */}
            <div className="space-y-3 px-5 sm:px-6 lg:px-7">
              <div>
                <h3 className="font-display text-base sm:text-lg md:text-xl font-bold text-white tracking-tight uppercase">
                  Imprescindibles
                </h3>
              </div>

              {/* Advertencia / Nota: se asume haber visto la Saga del Infinito */}
              <div className="flex justify-start">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-300 text-xs sm:text-sm font-medium">
                  <Info className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>
                    Se da por sentado que ya viste o tuviste que haber visto <strong className="text-emerald-200 font-semibold">toda la Saga del Infinito</strong>.
                  </span>
                </div>
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {prepMilestones.map((milestone) => {
                  const prod = getProduction(milestone.productionId);
                  const posterUrl = prod?.urlPoster || milestone.posterUrl;

                  return (
                    <div
                      key={milestone.id}
                      className="bg-[#050806]/85 backdrop-blur-md rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden shadow-lg"
                    >
                      {/* Poster + Content Side by Side */}
                      <div className="flex gap-3.5 items-start">
                        {posterUrl && (
                          <div className="w-20 h-28 sm:w-24 sm:h-36 rounded-xl overflow-hidden shrink-0 bg-zinc-950 shadow-md">
                            <img
                              src={posterUrl}
                              alt={milestone.title}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          </div>
                        )}

                        <div className="min-w-0 flex-1 space-y-2.5">
                          <div>
                            <h4 className="font-display text-sm sm:text-base font-bold text-white leading-tight">
                              {milestone.title}
                            </h4>

                            {/* Motivo por el cual ver al lado del poster */}
                            <p className="text-xs text-zinc-300/85 leading-relaxed font-sans mt-1">
                              {milestone.whyItMatters}
                            </p>
                          </div>

                          {/* Botón de ver ahora debajo del texto explicativo al lado del poster */}
                          <div className="pt-0.5">
                            {milestone.additionalProductionId ? (
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <a
                                  href={getWatchButtonData(prod).watchUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-wide transition-all duration-200 hover:scale-[1.03] active:scale-95 cursor-pointer select-none group/watch ${getWatchButtonData(prod).buttonClasses}`}
                                  title="Ver X-Men (2000) en Disney+"
                                >
                                  <Play className="w-3 h-3 fill-current" />
                                  <span>X-Men 1</span>
                                  {getWatchButtonData(prod).renderLogo()}
                                </a>
                                {(() => {
                                  const prod2 = getProduction(milestone.additionalProductionId);
                                  const { watchUrl, buttonClasses, renderLogo } = getWatchButtonData(prod2);
                                  return (
                                    <a
                                      href={watchUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      onClick={(e) => e.stopPropagation()}
                                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-wide transition-all duration-200 hover:scale-[1.03] active:scale-95 cursor-pointer select-none group/watch ${buttonClasses}`}
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
                              <span className="inline-flex items-center gap-1 text-[11px] text-amber-400 font-sans font-medium py-1">
                                <span>Próximamente en cines</span>
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Subsection 2: Resumen de lo que no necesitas volver a ver */}
            <div className="pt-2 space-y-3 px-5 sm:px-6 lg:px-7">
              <div>
                <h3 className="font-display text-base sm:text-lg md:text-xl font-bold text-white tracking-tight uppercase">
                  Resumen de lo que no necesitas volver a ver
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Ahorra tiempo: únicamente necesitas conocer estos puntos narrativos específicos para comprender su contexto en Doomsday:
                </p>
              </div>

              {/* Quick Recap Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {quickRecapItems.map((recap) => {
                  const prod = getProduction(recap.productionId);
                  const posterUrl = prod?.urlPoster || recap.posterUrl;

                  return (
                    <div
                      key={recap.id}
                      className="rounded-2xl p-4 flex flex-col justify-between bg-gradient-to-br from-[#0c0e0c]/90 via-[#060806]/90 to-black shadow-md"
                    >
                      {/* Poster + Content Side by Side */}
                      <div className="flex gap-3.5 items-start">
                        {posterUrl && (
                          <div className="w-20 h-28 sm:w-24 sm:h-36 rounded-xl overflow-hidden shrink-0 bg-zinc-950 shadow-md">
                            <img
                              src={posterUrl}
                              alt={recap.title}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          </div>
                        )}

                        <div className="min-w-0 flex-1 space-y-2.5">
                          <div>
                            <h4 className="font-display text-sm sm:text-base font-bold text-white leading-tight">
                              {recap.title}
                            </h4>

                            {/* Crucial Takeaway Text */}
                            <p className="text-xs text-zinc-300/85 leading-relaxed font-sans mt-1">
                              {recap.keyTakeaway}
                            </p>
                          </div>

                          {/* Footer Info / Optional Watch debajo del texto explicativo al lado del poster */}
                          {prod && (
                            <div className="pt-0.5 flex items-center justify-start">
                              {(() => {
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
                              })()}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </motion.div>
        )}

        {/* TAB 2: ORIGEN EN CÓMICS */}
        {activeTab === 'comics' && (
          <motion.div
            key="tab-comics"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-start"
          >
            {/* Vista Celular: Primer par de imágenes al principio (Primera Izquierda + Primera Derecha) */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:hidden items-start">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsodUOhTbuVHNpAZSmCEKYeyfw_ZQwLH7mcjTH0ZvGr4n1wlNm9hMXWOo&s=10"
                alt="Doctor Doom - Cómics"
                className="w-full h-auto object-contain rounded-2xl shadow-xl select-none"
                loading="lazy"
              />
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaYcKfNhjDSbwgM3sVRVjf8OhBrHiAdA5ihxa_lYaqpX7egL1xLMP1Q3E&s=10"
                alt="Avengers Doomsday"
                className="w-full h-auto object-contain rounded-2xl shadow-xl select-none"
                loading="lazy"
              />
            </div>

            {/* Fotos Columna Izquierda (Sólo Desktop / lg) */}
            <div className="hidden lg:flex lg:col-span-3 flex-col gap-4 sm:gap-5 self-start justify-center">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsodUOhTbuVHNpAZSmCEKYeyfw_ZQwLH7mcjTH0ZvGr4n1wlNm9hMXWOo&s=10"
                alt="Doctor Doom - Cómics"
                className="w-full h-auto object-contain rounded-2xl shadow-xl select-none"
                loading="lazy"
              />
              <img
                src="https://i.pinimg.com/736x/27/2d/28/272d28337e6aa0cd45ed83572245cb5d.jpg"
                alt="Doctor Doom - Segunda ilustración cómic"
                className="w-full h-auto object-contain rounded-2xl shadow-xl select-none"
                loading="lazy"
              />
            </div>

            {/* Texto Explicativo Central */}
            <div className="lg:col-span-6 bg-[#050806]/60 backdrop-blur-md rounded-2xl p-5 sm:p-6 lg:p-7 flex flex-col justify-start">
              <div className="space-y-3.5 text-xs sm:text-sm text-zinc-300/90 leading-relaxed font-sans">
                <p>
                  Victor von Doom nació en Latveria, un pequeño país ficticio de Europa del Este, dentro de una familia romaní. Desde muy joven estuvo marcado por la tragedia: su madre, Cynthia von Doom, era una poderosa hechicera que murió al intentar obtener poderes sobrenaturales, mientras que su padre, Werner, era un médico que falleció después de intentar salvar a la esposa de un gobernante de Latveria.
                </p>
                <p>
                  Victor desarrolló una enorme inteligencia y una obsesión por superar los límites de la ciencia. Gracias a su talento, consiguió una beca para estudiar en Estados Unidos, donde conoció a Reed Richards, quien posteriormente se convertiría en Mr. Fantastic. Ambos eran brillantes científicos, pero también extremadamente competitivos.
                </p>
                <p>
                  Mientras estudiaba, Victor construyó una máquina destinada a contactar con el mundo de los muertos para intentar recuperar el alma de su madre. Reed Richards descubrió que los cálculos de Victor contenían un error y trató de advertirle, pero Victor ignoró la advertencia. El experimento salió mal y una explosión desfiguró su rostro.
                </p>
                <p>
                  Victor culpó a Reed por el accidente y abandonó Estados Unidos. Viajó por el mundo hasta terminar en el Himalaya, donde fue acogido por monjes que lo ayudaron a desarrollar sus conocimientos científicos y místicos. Allí construyó una armadura y una máscara de metal que se convertirían en su identidad característica: Doctor Doom.
                </p>
                <p>
                  Después de regresar a Latveria, Victor derrocó a su gobernante y tomó el control del país, convirtiéndose en su soberano. Desde entonces, gobierna Latveria con una combinación de tecnología avanzada, ciencia y magia.
                </p>
                <p>
                  Doctor Doom se convirtió así en uno de los grandes enemigos de los Fantastic Four, especialmente de Reed Richards. Sin embargo, su ambición va mucho más allá de derrotar a los Cuatro Fantásticos: Doom está convencido de que es la única persona capaz de llevar al mundo hacia un futuro mejor. Su problema es que considera que para conseguirlo debe tener un control absoluto.
                </p>
                <p>
                  A diferencia de muchos villanos, Doom no se considera malvado. Se ve a sí mismo como un genio incomprendido y como el único hombre capaz de salvar a la humanidad. Su orgullo, su necesidad de demostrar su superioridad sobre Reed Richards y su obsesión con el poder terminan convirtiéndose en sus mayores debilidades.
                </p>
                <p className="text-emerald-300/90 font-medium pt-1">
                  Doctor Doom fue creado por Stan Lee y Jack Kirby y apareció por primera vez en The Fantastic Four #5, publicado en 1962. Desde entonces, se convirtió en uno de los villanos más importantes y complejos del universo Marvel.
                </p>
              </div>

              {/* Video de YouTube: Historia de Doctor Doom */}
              <div className="mt-5 sm:mt-6 w-full">
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-[0_0_25px_rgba(16,185,129,0.15)] border border-emerald-500/25 bg-black">
                  <iframe
                    src="https://www.youtube-nocookie.com/embed/I_-qgFqUvlo"
                    title="Doctor Doom | La historia completa en 80 minutos"
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* Vista Celular: Segundo par de imágenes al final (Segunda Izquierda + Segunda Derecha) */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:hidden items-start">
              <img
                src="https://i.pinimg.com/736x/27/2d/28/272d28337e6aa0cd45ed83572245cb5d.jpg"
                alt="Doctor Doom - Segunda ilustración cómic"
                className="w-full h-auto object-contain rounded-2xl shadow-xl select-none"
                loading="lazy"
              />
              <img
                src="https://i.pinimg.com/736x/75/f2/c2/75f2c28c0510fc26f5dd7013da065c5b.jpg"
                alt="Doctor Doom - Portada cómic"
                className="w-full h-auto object-contain rounded-2xl shadow-xl select-none"
                loading="lazy"
              />
            </div>

            {/* Fotos Columna Derecha (Sólo Desktop / lg) */}
            <div className="hidden lg:flex lg:col-span-3 flex-col gap-4 sm:gap-5 self-start justify-center">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaYcKfNhjDSbwgM3sVRVjf8OhBrHiAdA5ihxa_lYaqpX7egL1xLMP1Q3E&s=10"
                alt="Avengers Doomsday"
                className="w-full h-auto object-contain rounded-2xl shadow-xl select-none"
                loading="lazy"
              />
              <img
                src="https://i.pinimg.com/736x/75/f2/c2/75f2c28c0510fc26f5dd7013da065c5b.jpg"
                alt="Doctor Doom - Portada cómic"
                className="w-full h-auto object-contain rounded-2xl shadow-xl select-none"
                loading="lazy"
              />
            </div>
          </motion.div>
        )}

        {/* TAB 3: DOOMSDAY Y SECRET WARS */}
        {activeTab === 'climax' && (
          <motion.div
            key="tab-doomsday-secret-wars"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-start"
          >
            {/* Fotos Izquierda */}
            <div className="lg:col-span-3 grid grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4 lg:gap-5 self-start justify-center items-start">
              <img
                src="https://www.cinemascomics.com/wp-content/uploads/2024/09/Secret-Wars_4_dr-doom.jpg"
                alt="Doctor Doom - Secret Wars"
                className="w-full h-auto object-contain rounded-2xl shadow-xl select-none"
                loading="lazy"
              />
              <img
                src="https://http2.mlstatic.com/D_NQ_NP_640198-MLA100013270382_122025-F.jpg"
                alt="Doctor Doom vs Mister Fantástico - Secret Wars"
                className="w-full h-auto object-contain rounded-2xl shadow-xl select-none"
                loading="lazy"
              />
            </div>

            {/* Texto Explicativo Central */}
            <div className="lg:col-span-6 bg-[#050806]/60 backdrop-blur-md rounded-2xl p-5 sm:p-6 lg:p-7 flex flex-col justify-start">
              <div className="text-center mb-5">
                <h3 className="font-display text-base sm:text-lg md:text-xl font-bold text-white tracking-tight uppercase">
                  El evento que puede redefinir el multiverso de Marvel
                </h3>
              </div>

              <div className="space-y-3.5 text-xs sm:text-sm text-zinc-300/90 leading-relaxed font-sans">
                <p>
                  Para entender la conexión entre Avengers: Doomsday y Avengers: Secret Wars hay que entender primero el concepto de Multiverso. Marvel plantea la existencia de múltiples realidades que pueden coexistir, pero que también pueden entrar en conflicto entre sí. Una de las amenazas más importantes de este sistema son las incursiones: situaciones en las que dos universos comienzan a colisionar y, si el proceso llega a completarse, ambas realidades pueden ser destruidas. Esta idea es fundamental en Secret Wars (2015), el evento de los cómics escrito por Jonathan Hickman que sirve como una de las principales inspiraciones para lo que Marvel está construyendo en el cine.
                </p>
                <p>
                  En aquella historia, el Multiverso comienza a morir debido a una serie de incursiones que provocan la destrucción progresiva de diferentes universos. Detrás de esta crisis están los Beyonders, entidades de un poder extraordinario. Mientras las distintas realidades desaparecen, Doctor Doom consigue intervenir en el conflicto y obtiene un poder suficiente para reconstruir la realidad. Sin embargo, Doom no simplemente restaura el universo tal como era: utiliza fragmentos de las realidades destruidas para crear una nueva existencia llamada Battleworld, convirtiéndose en su gobernante absoluto, conocido como God Emperor Doom.
                </p>
                <p>
                  Esta historia es especialmente importante porque explica por qué Doctor Doom puede ser mucho más que un villano tradicional. Victor von Doom es un científico, hechicero, gobernante y uno de los mayores rivales de Reed Richards. Doom cree que su inteligencia y voluntad están por encima de las de cualquier otra persona y, en determinadas circunstancias, puede llegar a convencerse de que sus acciones son necesarias para salvar a la humanidad. Su problema es que, cuando intenta salvar la realidad, también quiere decidir quién puede vivir dentro de ella y bajo qué reglas.
                </p>
                <p>
                  El concepto de Doom como alguien que destruye y reconstruye la realidad encaja directamente con la dirección que parece estar tomando el MCU. Avengers: Doomsday, cuyo estreno está previsto para el 18 de diciembre de 2026, reúne a personajes de diferentes partes del universo Marvel, incluyendo a los Avengers, Fantastic Four y personajes de las antiguas películas de X-Men. Esta combinación es especialmente significativa porque muchos de estos personajes originalmente pertenecían a continuidades diferentes. La película parece utilizar precisamente esa diversidad de universos y generaciones para llevar la historia hacia una crisis de escala multiversal.
                </p>
                <p>
                  Los Fantastic Four tienen una importancia especial debido a la relación entre Reed Richards y Doctor Doom. En los cómics, Reed es uno de los pocos personajes capaces de enfrentarse intelectualmente a Doom y comprender las consecuencias de sus decisiones. Por otro lado, la presencia de los antiguos X-Men demuestra hasta qué punto el MCU puede comenzar a mezclar personajes provenientes de diferentes continuidades. Los Avengers representan el núcleo del universo que conocemos, mientras que Fantastic Four y X-Men amplían el conflicto hacia una escala mucho mayor.
                </p>
                <p>
                  La trama exacta de Doomsday todavía no está completamente revelada, por lo que no puede afirmarse que la película vaya a terminar exactamente como Secret Wars (2015). Sin embargo, una posible interpretación es que las incursiones se vuelvan incontrolables, las diferentes realidades comiencen a desaparecer y Doctor Doom encuentre una manera de intervenir en el colapso. Si consigue reconstruir la existencia utilizando fragmentos de distintos universos, podría aparecer una versión cinematográfica de Battleworld y Doom podría convertirse en el gobernante de esa nueva realidad.
                </p>
                <p>
                  En ese escenario, Avengers: Doomsday funcionaría como el momento en el que el Multiverso llega a su límite, mientras que Avengers: Secret Wars, prevista para el 17 de diciembre de 2027, sería la historia que determine qué sucede después. Los héroes tendrían que enfrentarse a Doom y decidir qué realidad merece sobrevivir cuando todo lo que conocían ha desaparecido. Por eso Secret Wars podría ser mucho más que una simple batalla entre superhéroes: podría tratarse de una historia sobre poder, identidad, sacrificio y la reconstrucción de la realidad.
                </p>
                <p>
                  Uno de los mayores rumores alrededor del evento es que Marvel podría utilizar Secret Wars para realizar un llamado &quot;soft reboot&quot; del MCU. Esto no necesariamente significaría borrar todo lo ocurrido, sino utilizar la destrucción y reconstrucción del Multiverso para reorganizar las diferentes continuidades y crear una nueva realidad en la que personajes como Avengers, X-Men, Fantastic Four y Spider-Man puedan coexistir de una manera más sencilla. El cómic de 2015 ofrece un precedente para esta idea, aunque Marvel no ha confirmado que vaya a hacer exactamente lo mismo en el cine.
                </p>
                <p>
                  También existen numerosas teorías sobre qué personajes podrían regresar, qué universos podrían aparecer y si veremos una versión cinematográfica de God Emperor Doom o Battleworld. Sin embargo, estas posibilidades deben diferenciarse de la información oficial. La presencia de personajes de distintas generaciones de X-Men, Fantastic Four y Avengers en Doomsday está confirmada, pero no lo están muchos de los detalles sobre Secret Wars. Por eso, cualquier explicación del evento debería separar claramente lo confirmado por Marvel de lo inspirado en los cómics y de las teorías y rumores.
                </p>
                <p>
                  En términos simples, la historia puede entenderse de esta manera: el Multiverso está formado por muchas realidades; esas realidades comienzan a chocar mediante incursiones; la crisis amenaza con destruirlo todo; Doctor Doom intenta controlar el resultado; Avengers: Doomsday podría mostrar el punto máximo de esa crisis; y Avengers: Secret Wars podría contar la lucha por decidir qué queda después del colapso. Si Marvel sigue parcialmente el camino de los cómics, el resultado podría ser una nueva realidad capaz de redefinir el futuro del MCU.
                </p>
                <p className="text-emerald-300 font-medium pt-2 bg-emerald-500/10 p-3.5 rounded-xl leading-relaxed">
                  En una sola frase, la idea central sería: Doomsday podría ser la historia en la que el Multiverso llega al límite, mientras que Secret Wars podría ser la historia en la que Marvel decide qué universo nace después de su destrucción.
                </p>
              </div>
            </div>

            {/* Fotos Derecha */}
            <div className="lg:col-span-3 flex flex-col gap-4 sm:gap-5 self-start justify-center">
              <img
                src="https://www.carnivorecomics.com/cdn/shop/files/IMG_1999.jpg?v=1699460585&width=823"
                alt="Avengers Secret Wars - Battleworld"
                className="w-full h-auto object-contain rounded-2xl shadow-xl select-none"
                loading="lazy"
              />
              <img
                src="https://i.pinimg.com/1200x/da/64/0a/da640ad25e6cace3889e26960fd55762.jpg"
                alt="Portada cómic Avengers Secret Wars"
                className="w-full h-auto object-contain rounded-2xl shadow-xl select-none"
                loading="lazy"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
