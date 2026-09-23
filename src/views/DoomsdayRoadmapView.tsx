import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useMCU } from '../context/MCUContext';
import { NavView, MCUItem } from '../types/mcu';
import {
  ArrowLeft,
  BookOpen,
  Clapperboard,
} from 'lucide-react';
import { DoomsdayCountdown } from '../components/DoomsdayCountdown';
import { DoomsdayPrepTab } from '../components/doomsday/DoomsdayPrepTab';
import { DoomsdayComicsTab } from '../components/doomsday/DoomsdayComicsTab';
import { DoomsdayClimaxTab } from '../components/doomsday/DoomsdayClimaxTab';

interface DoomsdayRoadmapViewProps {
  onBackToDashboard: () => void;
  onNavigate: (view: NavView) => void;
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

  // Helper to get production item from context
  const getProduction = (productionId: string): MCUItem | undefined => {
    return items.find((i) => i.id === productionId);
  };

  return (
    <div className="flex-1 flex flex-col space-y-6 animate-fade-in pb-12 max-w-[1580px] mx-auto w-full relative">
      {/* Doctor Doom Ambient Aura & Mystic Green Glows */}
      <div className="fixed top-12 right-1/4 w-[260px] h-[260px] sm:w-[500px] sm:h-[500px] bg-emerald-500/[0.02] rounded-full blur-[60px] sm:blur-[140px] pointer-events-none -z-10" />
      <div className="fixed bottom-1/4 left-10 w-[220px] h-[220px] sm:w-[420px] sm:h-[420px] bg-teal-600/[0.02] rounded-full blur-[50px] sm:blur-[130px] pointer-events-none -z-10" />
      <div className="fixed top-0 left-0 right-0 h-48 bg-gradient-to-b from-emerald-950/10 via-transparent to-transparent pointer-events-none -z-10" />

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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[480px] md:w-[650px] lg:w-[800px] h-[120px] sm:h-[160px] md:h-[200px] bg-emerald-500/[0.02] rounded-full blur-[70px] sm:blur-[100px] pointer-events-none -z-10" />

        <h1 className="sr-only">Marvel Studios Avengers: Doomsday</h1>

        <div className="relative flex items-center justify-center w-full h-[140px] sm:h-[190px] md:h-[250px] lg:h-[310px] xl:h-[360px] overflow-hidden">
          <img
            src="/logoAvengersDoomsday.png"
            alt="Marvel Studios Avengers: Doomsday"
            className="w-auto h-[240px] sm:h-[330px] md:h-[430px] lg:h-[530px] xl:h-[620px] max-w-none object-contain select-none pointer-events-none drop-shadow-[0_0_8px_rgba(16,185,129,0.05)]"
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
          className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-display text-xs sm:text-sm font-bold tracking-wide transition-all shrink-0 cursor-pointer ${
            activeTab === 'prep'
              ? 'bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)] border-t border-emerald-300/50'
              : 'bg-zinc-950/70 border border-emerald-900/40 text-zinc-400 hover:text-emerald-300 hover:border-emerald-500/40 hover:bg-emerald-950/20 hover:shadow-[0_0_12px_rgba(16,185,129,0.15)]'
          }`}
        >
          <Clapperboard className="w-4 h-4" />
          <span>Qué ver para estar preparado</span>
        </button>

        <button
          onClick={() => setActiveTab('comics')}
          className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-display text-xs sm:text-sm font-bold tracking-wide transition-all shrink-0 cursor-pointer ${
            activeTab === 'comics'
              ? 'bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)] border-t border-emerald-300/50'
              : 'bg-zinc-950/70 border border-emerald-900/40 text-zinc-400 hover:text-emerald-300 hover:border-emerald-500/40 hover:bg-emerald-950/20 hover:shadow-[0_0_12px_rgba(16,185,129,0.15)]'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Origen en Cómics</span>
        </button>

        <button
          onClick={() => setActiveTab('climax')}
          className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-display text-xs sm:text-sm font-bold tracking-wide transition-all shrink-0 cursor-pointer ${
            activeTab === 'climax'
              ? 'bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)] border-t border-emerald-300/50'
              : 'bg-zinc-950/70 border border-emerald-900/40 text-zinc-400 hover:text-emerald-300 hover:border-emerald-500/40 hover:bg-emerald-950/20 hover:shadow-[0_0_12px_rgba(16,185,129,0.15)]'
          }`}
        >
          <Clapperboard className="w-4 h-4" />
          <span>Doomsday y Secret Wars</span>
        </button>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          TAB CONTENT AREA (MODULAR TABS)
          ───────────────────────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {activeTab === 'prep' && (
          <DoomsdayPrepTab key="tab-prep" getProduction={getProduction} />
        )}

        {activeTab === 'comics' && (
          <DoomsdayComicsTab key="tab-comics" />
        )}

        {activeTab === 'climax' && (
          <DoomsdayClimaxTab key="tab-doomsday-secret-wars" />
        )}
      </AnimatePresence>
    </div>
  );
};
