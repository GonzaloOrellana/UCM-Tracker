import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMCU } from '../context/MCUContext';
import { NavView, MCUItem } from '../types/mcu';
import {
  ArrowLeft,
  BookOpen,
  Clapperboard,
  Play,
  Sparkles,
} from 'lucide-react';
import { getPlatformInfo } from '../utils/platformHelper';

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

  // Lock solid black background for the Doomsday section
  useEffect(() => {
    const prevBg = document.body.style.backgroundColor;
    document.body.style.backgroundColor = '#000000';
    return () => {
      document.body.style.backgroundColor = prevBg;
    };
  }, []);

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
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_#34d399]" />
                <h3 className="font-display text-sm sm:text-base font-bold text-white tracking-tight uppercase">
                  Imprescindibles
                </h3>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-emerald-500/30 via-emerald-500/10 to-transparent ml-2" />
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {prepMilestones.map((milestone) => {
                  const prod = getProduction(milestone.productionId);
                  const posterUrl = prod?.urlPoster || milestone.posterUrl;

                  return (
                    <div
                      key={milestone.id}
                      className="bg-[#050806]/85 backdrop-blur-md rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden border border-emerald-500/20 hover:border-emerald-400/50 hover:shadow-[0_0_25px_rgba(16,185,129,0.14)] transition-all group"
                    >
                      {/* Poster + Content Side by Side */}
                      <div className="flex gap-3.5 items-start">
                        {posterUrl && (
                          <div className="w-16 h-24 sm:w-20 sm:h-28 rounded-xl overflow-hidden shrink-0 border border-emerald-500/25 bg-zinc-950 shadow-md">
                            <img
                              src={posterUrl}
                              alt={milestone.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              loading="lazy"
                            />
                          </div>
                        )}

                        <div className="min-w-0 flex-1 space-y-1.5">
                          <h4 className="font-display text-sm sm:text-base font-bold text-white leading-tight group-hover:text-emerald-300 transition-colors">
                            {milestone.title}
                          </h4>

                          {/* Motivo por el cual ver al lado del poster */}
                          <p className="text-xs text-zinc-300/85 leading-relaxed font-sans">
                            {milestone.whyItMatters}
                          </p>
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="pt-3 sm:pt-3.5 mt-auto">
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
                          <span className="inline-flex items-center gap-1 text-[11px] text-amber-400 font-sans font-medium py-1">
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
              <div className="border-t border-emerald-500/20 pt-5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_10px_#fbbf24]" />
                  <h3 className="font-display text-sm sm:text-base font-bold text-white tracking-tight uppercase">
                    Resumen de lo que no necesitas volver a ver
                  </h3>
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-amber-500/30 via-emerald-500/10 to-transparent ml-2" />
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
                      className="rounded-2xl p-4 flex flex-col justify-between border border-emerald-500/20 bg-gradient-to-br from-[#0c0e0c]/90 via-[#060806]/90 to-black hover:border-amber-500/40 transition-all shadow-md group"
                    >
                      {/* Poster + Content Side by Side */}
                      <div className="flex gap-3.5 items-start">
                        {posterUrl && (
                          <div className="w-16 h-24 sm:w-20 sm:h-28 rounded-xl overflow-hidden shrink-0 border border-emerald-500/25 bg-zinc-950 shadow-md">
                            <img
                              src={posterUrl}
                              alt={recap.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              loading="lazy"
                            />
                          </div>
                        )}

                        <div className="min-w-0 flex-1 space-y-1.5">
                          <h4 className="font-display text-sm sm:text-base font-bold text-white leading-tight group-hover:text-amber-300 transition-colors">
                            {recap.title}
                          </h4>

                          {/* Crucial Takeaway Text */}
                          <p className="text-xs text-zinc-300/85 leading-relaxed font-sans">
                            {recap.keyTakeaway}
                          </p>
                        </div>
                      </div>

                      {/* Footer Info / Optional Watch */}
                      {prod && (
                        <div className="pt-3 sm:pt-3.5 flex items-center justify-end mt-auto">
                          {(() => {
                            const { watchUrl, tooltip, buttonClasses, renderLogo } = getWatchButtonData(prod);
                            return (
                              <a
                                href={watchUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                title={tooltip}
                                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-wide transition-all hover:scale-[1.03] cursor-pointer select-none group/watch ${buttonClasses}`}
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
            {/* Fotos Izquierda */}
            <div className="lg:col-span-3 flex flex-col gap-4 sm:gap-5 self-start justify-center">
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

            {/* Fotos Derecha */}
            <div className="lg:col-span-3 flex flex-col gap-4 sm:gap-5 self-start justify-center">
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
            <div className="bg-[#050806]/85 backdrop-blur-md rounded-2xl p-5 sm:p-6 space-y-3 border border-emerald-500/20 hover:border-emerald-400/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.14)] transition-all">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.2)]">
                  <Clapperboard className="w-5 h-5" />
                </div>
                <h3 className="font-display text-base sm:text-lg font-bold text-white">
                  Robert Downey Jr. es Doom
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-zinc-300/85 leading-relaxed">
                Marvel confirmó que RDJ interpreta al genuino <strong>Victor Von Doom</strong> de Latveria, no a una variante de Tony Stark. <strong>Joe & Anthony Russo</strong> dirigen y <strong>Stephen McFeely</strong> escribe el guion de ambas películas.
              </p>
            </div>

            {/* Card 2: Soft-Reboot */}
            <div className="bg-[#050806]/85 backdrop-blur-md rounded-2xl p-5 sm:p-6 space-y-3 border border-emerald-500/20 hover:border-emerald-400/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.14)] transition-all">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.2)]">
                  <Sparkles className="w-5 h-5" />
                </div>
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
