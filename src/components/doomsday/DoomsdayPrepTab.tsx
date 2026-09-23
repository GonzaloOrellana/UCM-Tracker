import React from 'react';
import { motion } from 'framer-motion';
import { Info } from 'lucide-react';
import { MCUItem } from '../../types/mcu';
import { PREP_MILESTONES, QUICK_RECAP_ITEMS } from '../../data/doomsdayData';
import { DoomsdayWatchButton } from './DoomsdayWatchButton';
import { LiteYouTubeEmbed } from '../common/LiteYouTubeEmbed';

interface DoomsdayPrepTabProps {
  getProduction: (id: string) => MCUItem | undefined;
}

export const DoomsdayPrepTab: React.FC<DoomsdayPrepTabProps> = ({ getProduction }) => {
  return (
    <motion.div
      key="tab-prep"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25 }}
      className="space-y-6"
    >
      {/* Sinopsis (Izquierda) + Tráiler Oficial (Derecha) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center px-5 sm:px-6 lg:px-7">
        {/* Sinopsis a la izquierda */}
        <div className="flex flex-col justify-center space-y-3">
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

        {/* Tráiler a la derecha con carga ligera Facade */}
        <div className="w-full">
          <LiteYouTubeEmbed
            videoId="lAr_uspgHm8"
            title="Avengers: Doomsday | Tráiler Oficial"
          />
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PREP_MILESTONES.map((milestone) => {
            const prod = getProduction(milestone.productionId);
            const posterUrl = prod?.urlPoster || milestone.posterUrl;

            return (
              <div
                key={milestone.id}
                className="flex flex-col justify-between group"
              >
                {/* Poster + Content Side by Side */}
                <div className="flex gap-3.5 items-start">
                  {posterUrl && (
                    <div className="w-20 h-28 sm:w-24 sm:h-36 rounded-xl overflow-hidden shrink-0 bg-zinc-950 shadow-md transition-transform duration-300 group-hover:scale-[1.03]">
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
                      <h4 className="font-display text-sm sm:text-base font-bold text-white leading-tight group-hover:text-emerald-300 transition-colors">
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
                          <DoomsdayWatchButton
                            prod={prod}
                            label="X-Men 1"
                            customTitle="Ver X-Men (2000) en Disney+"
                          />
                          <DoomsdayWatchButton
                            prod={getProduction(milestone.additionalProductionId)}
                            label="X-Men 2"
                            customTitle="Ver X-Men 2 (2003) en Disney+"
                          />
                        </div>
                      ) : prod && !milestone.isUpcoming ? (
                        <DoomsdayWatchButton prod={prod} />
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {QUICK_RECAP_ITEMS.map((recap) => {
            const prod = getProduction(recap.productionId);
            const posterUrl = prod?.urlPoster || recap.posterUrl;

            return (
              <div
                key={recap.id}
                className="flex flex-col justify-between group"
              >
                {/* Poster + Content Side by Side */}
                <div className="flex gap-3.5 items-start">
                  {posterUrl && (
                    <div className="w-20 h-28 sm:w-24 sm:h-36 rounded-xl overflow-hidden shrink-0 bg-zinc-950 shadow-md transition-transform duration-300 group-hover:scale-[1.03]">
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
                      <h4 className="font-display text-sm sm:text-base font-bold text-white leading-tight group-hover:text-emerald-300 transition-colors">
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
                        <DoomsdayWatchButton prod={prod} />
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
  );
};
